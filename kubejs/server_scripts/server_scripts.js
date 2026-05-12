ServerEvents.tags('item', event => {
    event.add('neoforge:cobblestone', 'minecraft:end_stone')
    event.add('quark:stone_tool_materials', 'minecraft:end_stone')
    event.add('minecraft:stone_crafting_materials', 'minecraft:end_stone')
    event.add('minecraft:stone_tool_materials', 'minecraft:end_stone')

    event.add('neoforge:ingots/iron', 'betterend:thallasium_ingot')
    event.add('ae2:metal_ingots', 'betterend:thallasium_ingot')
    event.add('c:ingots/iron', 'betterend:thallasium_ingot')
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

    event.shapeless(
        Item.of('minecraft:glow_ink_sac', 1), [
        Item.of('betterend:neon_cactus', 1)
    ])
    event.shapeless(
        Item.of('minecraft:glow_ink_sac', 1), [
        Item.of('betterend:neon_cactus', 1)
    ])
    event.shapeless(
        Item.of('minecraft:iron_ingot', 1), [
        Item.of('betterend:thallasium_ingot', 2)
    ])
})

//Надо этот кал на разные файлы раскидать