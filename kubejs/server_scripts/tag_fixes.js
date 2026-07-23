// Create Tracks+ 1.0.5 adds these legacy item IDs to a block tag.
// They are not registered as blocks, so remove only the invalid references.
ServerEvents.tags('block', event => {
    event.remove('create:safe_nbt', [
        'tracks:suspension_track',
        'tracks:track_drive_wheel'
    ])
})

// Restore the legacy entity tag requested by one of the installed mods.
ServerEvents.tags('entity_type', event => {
    event.add('minecraft:fishes', [
        'minecraft:cod',
        'minecraft:pufferfish',
        'minecraft:salmon',
        'minecraft:tropical_fish'
    ])
})
