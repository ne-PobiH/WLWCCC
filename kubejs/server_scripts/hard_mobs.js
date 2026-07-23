const Attributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes')

const APPLIED_TAG = 'mob_stats_modified'

const mobStats = [
  {
    id: 'minecraft:zombie',
    health: 40,
    speed: 1.5,
    strength: 2.5,

    explode_damage: null,
    explode_radius: null,
    shoot_strength: null
  },
  {
    id: 'minecraft:creeper',
    health: 22,
    speed: 1,
    strength: null,

    explode_damage: 2,
    explode_radius: 1.5,
    shoot_strength: null
  },
  {
    id: 'minecraft:skeleton',
    health: 20,
    speed: 1.5,
    strength: null,

    explode_damage: null,
    explode_radius: null,
    shoot_strength: 2
  }
]

const mobStatsById = {}

mobStats.forEach(stats => {
  mobStatsById[stats.id] = stats
})

const projectileTypes = {
  'minecraft:arrow': true,
  'minecraft:spectral_arrow': true,
  'minecraft:firework_rocket': true
}

function multiplyAttribute(entity, attribute, multiplier) {
  if (multiplier == null) {
    return
  }

  const instance = entity.getAttribute(attribute)

  if (instance == null) {
    return
  }

  instance.setBaseValue(instance.getBaseValue() * multiplier)
}

function getEntityId(entity) {
  if (entity == null) {
    return null
  }

  return String(entity.type)
}

function getCreeperExplosionRadius(entity) {
  const nbt = entity.nbt

  if (nbt != null && nbt.contains('ExplosionRadius')) {
    return nbt.getByte('ExplosionRadius')
  }

  return 3
}

mobStats.forEach(stats => {
  EntityEvents.spawned(stats.id, event => {
    const entity = event.entity

    if (entity.getTags().contains(APPLIED_TAG)) {
      return
    }

    if (stats.health != null) {
      entity.setAttributeBaseValue(Attributes.MAX_HEALTH, stats.health)
      entity.setHealth(stats.health)
    }

    multiplyAttribute(entity, Attributes.MOVEMENT_SPEED, stats.speed)
    multiplyAttribute(entity, Attributes.ATTACK_DAMAGE, stats.strength)

    if (stats.explode_radius != null && stats.id == 'minecraft:creeper') {
      const oldRadius = getCreeperExplosionRadius(entity)
      const newRadius = Math.max(0, Math.floor(oldRadius * stats.explode_radius))

      entity.mergeNbt({
        ExplosionRadius: newRadius
      })
    }

    entity.addTag(APPLIED_TAG)
  })
})

EntityEvents.beforeHurt(event => {
  const source = event.source
  const attacker = source.getActual()

  if (attacker == null) {
    return
  }

  const attackerId = getEntityId(attacker)
  const stats = mobStatsById[attackerId]

  if (stats == null) {
    return
  }

  if (attackerId == 'minecraft:creeper' && stats.explode_damage != null) {
    event.setDamage(event.damage * stats.explode_damage)
    return
  }

  const directEntity = source.getImmediate()
  const directId = getEntityId(directEntity)

  if (stats.shoot_strength != null && projectileTypes[directId]) {
    event.setDamage(event.damage * stats.shoot_strength)
  }
})
