ServerEvents.tags('item', event => {
    event.add('neoforge:cobblestone', 'minecraft:end_stone')
    event.add('quark:stone_tool_materials', 'minecraft:end_stone')
    event.add('minecraft:stone_crafting_materials', 'minecraft:end_stone')
    event.add('minecraft:stone_tool_materials', 'minecraft:end_stone')

    event.add('neoforge:cobblestone', 'betterend:umbralith')
    event.add('quark:stone_tool_materials', 'betterend:umbralith')
    event.add('minecraft:stone_crafting_materials', 'betterend:umbralith')
    event.add('minecraft:stone_tool_materials', 'betterend:umbralith')

    event.add('neoforge:ingots/iron', 'betterend:thallasium_ingot')
    event.add('ae2:metal_ingots', 'betterend:thallasium_ingot')
    event.add('c:ingots/iron', 'betterend:thallasium_ingot')
    event.add('c:sands', 'betterend:endstone_dust')
    event.add('c:sands/colorless', 'betterend:endstone_dust')
    event.add('minecraft:sand', 'betterend:endstone_dust')

    event.add('minecraft:ice', 'betterend:ancient_emerald_ice')
    event.add('sable:slippery', 'betterend:ancient_emerald_ice')
    event.add('minecraft:ice', 'betterend:dense_emerald_ice')
    event.add('sable:slippery', 'betterend:dense_emerald_ice')
    event.add('minecraft:ice', 'betterend:emerald_ice')
    event.add('sable:slippery', 'betterend:emerald_ice')
})

ServerEvents.recipes(event => {
    event.remove({ id: 'minecraft:smoker' })
    event.shaped(
    Item.of('minecraft:smoker', 1),
    [
        ' L ',
        'LFL',
        ' L '
    ],
    {
        F: '#c:player_workstations/furnaces',
        L: '#minecraft:logs'
    })

    event.remove({ id: 'betterend:bolux_mushroom_smoker' })
    event.smoking('betterend:bolux_mushroom_cooked', 'betterend:bolux_mushroom').xp(0.35)

    event.remove({ id: 'betterend:end_berry_smoker' })
    event.smoking('betterend:shadow_berry_cooked', 'betterend:shadow_berry_raw').xp(0.35)

    event.remove({ id: 'betterend:end_fish_smoker' })
    event.smoking('betterend:end_fish_cooked', 'betterend:end_fish_raw').xp(0.35)

    event.remove({ id: 'betterend:chorus_mushroom_smoker' })
    event.smoking('betterend:chorus_mushroom_cooked', 'betterend:chorus_mushroom_raw').xp(0.35)

    event.shapeless(
        Item.of('minecraft:ender_pearl', 2), [
        Item.of('betterend:ender_shard', 4)
    ])

    event.shapeless(
        Item.of('minecraft:ender_pearl', 2), [
        Item.of('betterend:ender_shard', 4)
    ])
    event.shapeless(
        Item.of('minecraft:light_blue_dye', 1), [
        Item.of('betterend:lumecorn_seed', 1)
    ])
    event.shapeless(
        Item.of('minecraft:glow_ink_sac', 1), [
        Item.of('betterend:neon_cactus', 1)
    ])
    event.shapeless(
        Item.of('minecraft:string', 1), [
        Item.of('betterend:inflexia', 2)
    ])
    event.shapeless(
        Item.of('minecraft:cobblestone', 4), [
        Item.of('betterend:violecite', 2),
        Item.of('minecraft:end_stone', 2)
    ])
    event.shapeless(
        Item.of('minecraft:cobblestone', 4), [
        Item.of('betterend:umbralith', 2),
        Item.of('minecraft:end_stone', 2)
    ])
    event.custom({
        type: "create:crushing",
        ingredients: [
        {
            item: 'betterend:azure_jadestone'
        }
        ],
        processing_time: 250,
        results: [
        {
            chance: 0.8,
            id: "create:crushed_raw_copper"
        },
        {
            chance: 0.8,
            id: "create:copper_nugget"
        }
        ]
    })
    event.custom({
        type: "create:crushing",
        ingredients: [
        {
            item: 'betterend:sandy_jadestone'
        }
        ],
        processing_time: 250,
        results: [
        {
            id: 'minecraft:sand'
        },
        {
            chance: 0.2,
            id: 'create:crushed_raw_gold'
        },
        {
            chance: 0.2,
            id: 'minecraft:gold_nugget'
        }
        ]
    })
    event.custom({
        type: "create:crushing",
        ingredients: [
        {
            item: 'betterend:flavolite'
        }
        ],
        processing_time: 250,
        results: [
        {
            id: 'minecraft:bone_meal',
            count: 2
        },
        {
            chance: 0.5,
            id: 'minecraft:bone_meal'
        }
        ]
    })
    event.custom({
        type: "create:crushing",
        ingredients: [
        {
            item: 'betterend:brimstone'
        }
        ],
        processing_time: 250,
        results: [
        {
            chance: 0.5,
            id: 'betterend:crystalline_sulphur'
        }
        ]
    })
})