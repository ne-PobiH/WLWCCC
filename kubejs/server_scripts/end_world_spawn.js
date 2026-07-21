const EndSpawnBlockPos = Java.loadClass('net.minecraft.core.BlockPos')
const EndSpawnDirection = Java.loadClass('net.minecraft.core.Direction')
const EndSpawnComponent = Java.loadClass('net.minecraft.network.chat.Component')
const EndSpawnResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const EndSpawnHeightmapTypes = Java.loadClass('net.minecraft.world.level.levelgen.Heightmap$Types')

const END_SPAWN_DIMENSION_ID = EndSpawnResourceLocation.parse('minecraft:the_end')
const OVERWORLD_DIMENSION_ID = EndSpawnResourceLocation.parse('minecraft:overworld')
const END_SPAWN_ALLOWED_BIOMES_ID = EndSpawnResourceLocation.parse(
  'wlwccc:end_spawn_allowed'
)

const END_SPAWN_WORLD_PHASE = 'wlw_spawn_phase'
const END_SPAWN_PLAYER_PHASE = 'wlw_spawn_phase_applied'
const END_SPAWN_READY = 'wlw_end_spawn_ready'
const END_SPAWN_X = 'wlw_end_spawn_x'
const END_SPAWN_Y = 'wlw_end_spawn_y'
const END_SPAWN_Z = 'wlw_end_spawn_z'
const END_SPAWN_BIOME = 'wlw_end_spawn_biome'
const OVERWORLD_ORIGIN_SPAWN_READY = 'wlw_overworld_origin_spawn_ready'

const END_PHASE = 0
const OVERWORLD_PHASE = 1

// Vanilla's outer End terrain starts roughly 1000 blocks from the origin.
// Keeping an additional margin guarantees that the shared spawn cannot be on
// the dragon's central island even with BetterEnd's modified terrain.
const END_SPAWN_MIN_RADIUS = 1536
const END_SPAWN_MAX_RADIUS = 8192
const END_SPAWN_BIOME_SEARCH_RADIUS = 1024
const END_SPAWN_SEARCH_ATTEMPTS = 48
const END_SPAWN_SAFE_COLUMN_RADIUS = 64
const END_SPAWN_SAFE_COLUMN_STEP = 4
const END_SPAWN_VERTICAL_SCAN = 32
const OVERWORLD_SPAWN_X = 0
const OVERWORLD_SPAWN_Z = 0

function endSpawnDebug(server, message) {
  const fullMessage = `[WLW End Spawn Debug] ${message}`

  console.info(fullMessage)

  if (server == null) {
    return
  }

  try {
    server.tell(EndSpawnComponent.literal(fullMessage))
  } catch (error) {
    console.error(`[WLW End Spawn Debug] Could not send chat message: ${error}`)
  }
}

function endSpawnDebugError(server, message) {
  const fullMessage = `[WLW End Spawn Debug] ERROR: ${message}`

  console.error(fullMessage)

  if (server == null) {
    return
  }

  try {
    server.tell(EndSpawnComponent.literal(fullMessage))
  } catch (error) {
    console.error(`[WLW End Spawn Debug] Could not send error to chat: ${error}`)
  }
}

function runEndSpawnEvent(server, eventName, action) {
  try {
    return action()
  } catch (error) {
    endSpawnDebugError(server, `${eventName} failed: ${error}`)
    throw error
  }
}

function isEndSpawnBiome(holder) {
  if (holder == null) {
    return false
  }

  // Calling Holder.is(...) from Rhino selects the ResourceLocation overload,
  // while its explicit TagKey signature is not exposed on Holder.Reference.
  // Reading the holder's assigned tags avoids both overload paths and still
  // keeps the datapack biome tag as the source of truth.
  var tags = holder.tags().iterator()

  while (tags.hasNext()) {
    var tag = tags.next()

    if (tag.location().toString() == END_SPAWN_ALLOWED_BIOMES_ID.toString()) {
      return true
    }
  }

  return false
}

function getEndSpawnLevel(server) {
  // Rhino's explicit overload syntax bypasses the ambiguous ResourceKey
  // overload and calls the ResourceLocation helper added by KubeJS directly.
  return server['getLevel(net.minecraft.resources.ResourceLocation)'](
    END_SPAWN_DIMENSION_ID
  )
}

function isOutsideCentralEndIsland(pos) {
  const x = pos.getX()
  const z = pos.getZ()
  const distanceSquared = x * x + z * z

  return distanceSquared >= END_SPAWN_MIN_RADIUS * END_SPAWN_MIN_RADIUS &&
    distanceSquared <= END_SPAWN_MAX_RADIUS * END_SPAWN_MAX_RADIUS
}

function isClearForEndSpawn(level, pos) {
  const state = level.getBlockState(pos)

  return state.getFluidState().isEmpty() &&
    state.getCollisionShape(level, pos).isEmpty()
}

function findSafeEndSpawnInColumn(level, x, z) {
  // Level.getHeight(...) only reads already loaded chunks and returns the
  // dimension's minimum Y for an unloaded one. Force this remote End chunk to
  // FULL first so a brand-new world gets real terrain and heightmap data.
  level.getChunk(Math.floor(x / 16), Math.floor(z / 16))

  const topY = Math.min(
    level.getHeight(EndSpawnHeightmapTypes.MOTION_BLOCKING_NO_LEAVES, x, z),
    level.getMaxBuildHeight() - 2
  )
  const minY = Math.max(level.getMinBuildHeight() + 1, topY - END_SPAWN_VERTICAL_SCAN)

  for (var y = topY; y >= minY; y--) {
    var spawnPos = new EndSpawnBlockPos(x, y, z)

    if (!isEndSpawnBiome(level.getBiome(spawnPos))) {
      continue
    }

    var floorPos = spawnPos.below()
    var floorState = level.getBlockState(floorPos)

    if (!floorState.getFluidState().isEmpty() ||
        !floorState.isFaceSturdy(level, floorPos, EndSpawnDirection.UP)) {
      continue
    }

    if (!isClearForEndSpawn(level, spawnPos) ||
        !isClearForEndSpawn(level, spawnPos.above())) {
      continue
    }

    return spawnPos
  }

  return null
}

function findSafeEndSpawnNear(level, biomePos) {
  const centerX = biomePos.getX()
  const centerZ = biomePos.getZ()

  let safePos = findSafeEndSpawnInColumn(level, centerX, centerZ)

  if (safePos != null && isOutsideCentralEndIsland(safePos)) {
    return safePos
  }

  for (var radius = END_SPAWN_SAFE_COLUMN_STEP;
       radius <= END_SPAWN_SAFE_COLUMN_RADIUS;
       radius += END_SPAWN_SAFE_COLUMN_STEP) {
    for (var offset = -radius; offset <= radius; offset += END_SPAWN_SAFE_COLUMN_STEP) {
      safePos = findSafeEndSpawnInColumn(level, centerX + offset, centerZ - radius)

      if (safePos != null && isOutsideCentralEndIsland(safePos)) {
        return safePos
      }

      safePos = findSafeEndSpawnInColumn(level, centerX + offset, centerZ + radius)

      if (safePos != null && isOutsideCentralEndIsland(safePos)) {
        return safePos
      }
    }

    for (var offset = -radius + END_SPAWN_SAFE_COLUMN_STEP;
         offset <= radius - END_SPAWN_SAFE_COLUMN_STEP;
         offset += END_SPAWN_SAFE_COLUMN_STEP) {
      safePos = findSafeEndSpawnInColumn(level, centerX - radius, centerZ + offset)

      if (safePos != null && isOutsideCentralEndIsland(safePos)) {
        return safePos
      }

      safePos = findSafeEndSpawnInColumn(level, centerX + radius, centerZ + offset)

      if (safePos != null && isOutsideCentralEndIsland(safePos)) {
        return safePos
      }
    }
  }

  return null
}

function getEndSpawnBiomeId(level, pos) {
  const key = level.getBiome(pos).unwrapKey()

  return key.isPresent()
    ? key.get().location().toString()
    : 'unknown'
}

function findEndSpawn(level, server) {
  const minimumSearchCenterRadius = END_SPAWN_MIN_RADIUS + END_SPAWN_BIOME_SEARCH_RADIUS
  const searchCenterRange = END_SPAWN_MAX_RADIUS -
    minimumSearchCenterRadius - END_SPAWN_BIOME_SEARCH_RADIUS

  endSpawnDebug(
    server,
    `Starting biome search: ${END_SPAWN_SEARCH_ATTEMPTS} attempts, ` +
    `radius ${END_SPAWN_MIN_RADIUS}-${END_SPAWN_MAX_RADIUS}`
  )

  for (var attempt = 0; attempt < END_SPAWN_SEARCH_ATTEMPTS; attempt++) {
    var angle = Math.random() * Math.PI * 2
    var radius = minimumSearchCenterRadius + Math.random() * searchCenterRange
    var centerX = Math.floor(Math.cos(angle) * radius)
    var centerZ = Math.floor(Math.sin(angle) * radius)
    var searchCenter = new EndSpawnBlockPos(centerX, 64, centerZ)

    if (attempt == 0 || (attempt + 1) % 8 == 0) {
      endSpawnDebug(
        server,
        `Biome search attempt ${attempt + 1}/${END_SPAWN_SEARCH_ATTEMPTS} ` +
        `around ${centerX} 64 ${centerZ}`
      )
    }

    var result = level.findClosestBiome3d(
      holder => isEndSpawnBiome(holder),
      searchCenter,
      END_SPAWN_BIOME_SEARCH_RADIUS,
      32,
      64
    )

    if (result == null) {
      continue
    }

    var biomePos = result.getFirst()

    if (biomePos == null || !isOutsideCentralEndIsland(biomePos)) {
      continue
    }

    endSpawnDebug(
      server,
      `Allowed biome candidate found at ` +
      `${biomePos.getX()} ${biomePos.getY()} ${biomePos.getZ()}; ` +
      `generating nearby chunks and checking surface`
    )

    var safePos = findSafeEndSpawnNear(level, biomePos)

    if (safePos != null) {
      endSpawnDebug(
        server,
        `Safe End position found at ` +
        `${safePos.getX()} ${safePos.getY()} ${safePos.getZ()}`
      )
      return safePos
    }
  }

  endSpawnDebugError(server, 'All biome search attempts were exhausted')
  return null
}

function ensureEndSpawn(server) {
  const data = server.persistentData

  endSpawnDebug(server, 'Checking persistent shared End spawn data')

  if (data.getBoolean(END_SPAWN_READY)) {
    endSpawnDebug(
      server,
      `Saved End spawn is ready at ` +
      `${data.getInt(END_SPAWN_X)} ${data.getInt(END_SPAWN_Y)} ${data.getInt(END_SPAWN_Z)} ` +
      `in ${data.getString(END_SPAWN_BIOME)}`
    )
    return true
  }

  endSpawnDebug(server, 'Requesting minecraft:the_end from the integrated server')
  const end = getEndSpawnLevel(server)

  if (end == null) {
    endSpawnDebugError(server, 'The End level is not available')
    return false
  }

  endSpawnDebug(server, 'The End level was obtained successfully')
  const spawnPos = findEndSpawn(end, server)

  if (spawnPos == null) {
    endSpawnDebugError(server, 'Could not find a safe allowed BetterEnd biome')
    return false
  }

  data.putInt(END_SPAWN_X, spawnPos.getX())
  data.putInt(END_SPAWN_Y, spawnPos.getY())
  data.putInt(END_SPAWN_Z, spawnPos.getZ())
  data.putString(END_SPAWN_BIOME, getEndSpawnBiomeId(end, spawnPos))
  data.putBoolean(END_SPAWN_READY, true)

  endSpawnDebug(
    server,
    `Shared End spawn created at ` +
    `${spawnPos.getX()} ${spawnPos.getY()} ${spawnPos.getZ()} in ` +
    `${data.getString(END_SPAWN_BIOME)}`
  )

  return true
}

function setPlayerEndSpawn(player, teleportPlayer) {
  const server = player.server
  const data = server.persistentData

  endSpawnDebug(server, `Preparing End spawn for player ${player.username}`)

  if (!ensureEndSpawn(server)) {
    endSpawnDebugError(server, `End spawn is unavailable for ${player.username}`)
    return false
  }

  const end = getEndSpawnLevel(server)
  const x = data.getInt(END_SPAWN_X)
  const y = data.getInt(END_SPAWN_Y)
  const z = data.getInt(END_SPAWN_Z)

  endSpawnDebug(server, `Setting forced respawn position to ${x} ${y} ${z}`)
  player.setSpawnLocation(end.getBlock(x, y, z))

  if (teleportPlayer) {
    endSpawnDebug(server, 'Calling cross-dimension teleportTo(minecraft:the_end)')
    const teleportResult = player.teleportTo(
      END_SPAWN_DIMENSION_ID,
      x + 0.5,
      y,
      z + 0.5,
      0,
      0
    )

    endSpawnDebug(server, `teleportTo returned: ${teleportResult}`)

    if (!teleportResult) {
      endSpawnDebugError(server, `Teleport failed for ${player.username}`)
      return false
    }
  }

  return true
}

function findOverworldOriginSpawnY(overworld) {
  overworld.getChunk(
    Math.floor(OVERWORLD_SPAWN_X / 16),
    Math.floor(OVERWORLD_SPAWN_Z / 16)
  )

  const topY = Math.min(
    overworld.getHeight(
      EndSpawnHeightmapTypes.MOTION_BLOCKING_NO_LEAVES,
      OVERWORLD_SPAWN_X,
      OVERWORLD_SPAWN_Z
    ),
    overworld.getMaxBuildHeight() - 2
  )
  const minY = Math.max(
    overworld.getMinBuildHeight() + 1,
    topY - END_SPAWN_VERTICAL_SCAN
  )

  for (var y = topY; y >= minY; y--) {
    var spawnPos = new EndSpawnBlockPos(OVERWORLD_SPAWN_X, y, OVERWORLD_SPAWN_Z)
    var floorPos = spawnPos.below()
    var floorState = overworld.getBlockState(floorPos)

    if (!floorState.getFluidState().isEmpty() ||
        !floorState.isFaceSturdy(overworld, floorPos, EndSpawnDirection.UP)) {
      continue
    }

    if (isClearForEndSpawn(overworld, spawnPos) &&
        isClearForEndSpawn(overworld, spawnPos.above())) {
      return y
    }
  }

  // This is still a better fallback than literal Y=0, which may be inside
  // terrain. Vanilla can safely resolve the final world-spawn position nearby.
  return topY
}

function setOverworldWorldSpawnAtOrigin(server) {
  const overworld = server.overworld()
  const y = findOverworldOriginSpawnY(overworld)
  const spawnPos = new EndSpawnBlockPos(OVERWORLD_SPAWN_X, y, OVERWORLD_SPAWN_Z)

  overworld.setDefaultSpawnPos(spawnPos, 0)
  server.persistentData.putBoolean(OVERWORLD_ORIGIN_SPAWN_READY, true)

  console.info(
    `[WLW End Spawn] Overworld world spawn set to ` +
    `${spawnPos.getX()} ${spawnPos.getY()} ${spawnPos.getZ()}`
  )
}

function ensureOverworldWorldSpawnAtOrigin(server) {
  if (!server.persistentData.getBoolean(OVERWORLD_ORIGIN_SPAWN_READY)) {
    setOverworldWorldSpawnAtOrigin(server)
  }
}

function teleportPlayerToOverworldWorldSpawn(player) {
  ensureOverworldWorldSpawnAtOrigin(player.server)

  const overworld = player.server.overworld()
  const spawnPos = overworld.getSharedSpawnPos()

  endSpawnDebug(
    player.server,
    `Teleporting ${player.username} from the End exit portal to ` +
    `${spawnPos.getX()} ${spawnPos.getY()} ${spawnPos.getZ()} in the Overworld`
  )

  return player.teleportTo(
    OVERWORLD_DIMENSION_ID,
    spawnPos.getX() + 0.5,
    spawnPos.getY(),
    spawnPos.getZ() + 0.5,
    0,
    0
  )
}

function switchWorldSpawnToOverworld(server) {
  const data = server.persistentData

  if (data.getInt(END_SPAWN_WORLD_PHASE) == OVERWORLD_PHASE) {
    ensureOverworldWorldSpawnAtOrigin(server)
    return
  }

  setOverworldWorldSpawnAtOrigin(server)
  data.putInt(END_SPAWN_WORLD_PHASE, OVERWORLD_PHASE)

  // Do not call player.setSpawnLocation here. That method replaces a bed or
  // respawn-anchor binding. The shared world spawn and a player's personal
  // respawn point are intentionally kept independent.
  console.info('[WLW End Spawn] World spawn phase switched after the dragon died')
}

ServerEvents.loaded(event => {
  runEndSpawnEvent(event.server, 'ServerEvents.loaded', () => {
    const worldPhase = event.server.persistentData.getInt(END_SPAWN_WORLD_PHASE)

    endSpawnDebug(event.server, `ServerEvents.loaded fired; world phase=${worldPhase}`)

    if (worldPhase == END_PHASE) {
      ensureEndSpawn(event.server)
    } else {
      // Migrates worlds which had already switched phase with the old script.
      ensureOverworldWorldSpawnAtOrigin(event.server)
    }
  })
})

EntityEvents.death('minecraft:ender_dragon', event => {
  const server = event.entity.server

  runEndSpawnEvent(server, 'EntityEvents.death(minecraft:ender_dragon)', () => {
    endSpawnDebug(server, 'Ender Dragon died; switching the shared world spawn')
    switchWorldSpawnToOverworld(server)
  })
})

PlayerEvents.loggedIn(event => {
  const player = event.player
  const server = player.server

  runEndSpawnEvent(server, 'PlayerEvents.loggedIn', () => {
    const worldPhase = server.persistentData.getInt(END_SPAWN_WORLD_PHASE)
    const playerData = player.persistentData
    const hasPlayerPhase = playerData.contains(END_SPAWN_PLAYER_PHASE)

    endSpawnDebug(
      server,
      `PlayerEvents.loggedIn fired for ${player.username}; ` +
      `world phase=${worldPhase}; player phase present=${hasPlayerPhase}`
    )

    if (worldPhase == END_PHASE && !hasPlayerPhase) {
      if (setPlayerEndSpawn(player, true)) {
        playerData.putInt(END_SPAWN_PLAYER_PHASE, END_PHASE)
        endSpawnDebug(server, `End phase saved for ${player.username}`)
      }
      return
    }

    // In the Overworld phase, leave the personal respawn point untouched so
    // a valid bed or respawn anchor remains bound to the player.
  })
})

PlayerEvents.respawned(event => {
  runEndSpawnEvent(event.player.server, 'PlayerEvents.respawned', () => {
    endSpawnDebug(
      event.player.server,
      `PlayerEvents.respawned fired for ${event.player.username}; ` +
      `endConquered=${event.isEndConquered()}`
    )

    if (event.isEndConquered()) {
      // Some dragon-fight implementations do not emit EntityEvents.death for
      // the dragon. Reaching the exit portal with endConquered=true is an
      // authoritative fallback, so switch the phase here as well. This keeps
      // a BetterEnd respawn obelisk as the player's personal death-respawn
      // point without allowing it to override the destination of this portal.
      switchWorldSpawnToOverworld(event.player.server)

      const teleportResult = teleportPlayerToOverworldWorldSpawn(event.player)
      endSpawnDebug(event.player.server, `Exit portal teleport returned: ${teleportResult}`)
    }
  })
})
