console.info('Hello, World! (Loaded server scripts)')

ServerEvents.recipes(event => {
    event.remove({ output: 'createdieselgenerators:hammer' })
    event.shaped(
        Item.of('createdieselgenerators:hammer', 1),
        [
            ' AC',
            ' BA',
            'B  '
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:stick',
            C: 'create:andesite_alloy'
        }
    )

    event.remove({ output: 'minecraft:shield' })
    event.shaped(
        Item.of('minecraft:shield', 1),
        [
            'ABA',
            'ABA',
            ' A '
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:oak_planks'
        }
    )

//iron

    event.remove({ output: 'minecraft:iron_helmet' })
    event.shaped(
        Item.of('minecraft:iron_helmet', 1),
        [
            'AAA',
            'ABA',
            '   '
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:leather_helmet'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(4)
        return Item.of('minecraft:iron_helmet').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:iron_chestplate' })
    event.shaped(
        Item.of('minecraft:iron_chestplate', 1),
        [
            'ABA',
            'AAA',
            'AAA'
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:leather_chestplate'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(1)
        return Item.of('minecraft:iron_chestplate').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:iron_leggings' })
    event.shaped(
        Item.of('minecraft:iron_leggings', 1),
        [
            'AAA',
            'ABA',
            'A A'
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:leather_leggings'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(4)
        return Item.of('minecraft:iron_leggings').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:iron_boots' })
    event.shaped(
        Item.of('minecraft:iron_boots', 1),
        [
            'ABA',
            'A A',
            '   '
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:leather_boots'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(1)
        return Item.of('minecraft:iron_boots').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:iron_sword' })
    event.shaped(
        Item.of('minecraft:iron_sword', 1),
        [
            ' A ',
            ' A ',
            ' B '
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:stick'
        }
    )

    event.remove({ output: 'minecraft:iron_shovel' })
    event.shaped(
        Item.of('minecraft:iron_shovel', 1),
        [
            ' A ',
            ' B ',
            ' B '
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:stick'
        }
    )

    event.remove({ output: 'minecraft:iron_hoe' })
    event.shaped(
        Item.of('minecraft:iron_hoe', 1),
        [
            'AA ',
            ' B ',
            ' B '
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:stick'
        }
    )

    event.remove({ output: 'minecraft:iron_pickaxe' })
    event.shaped(
        Item.of('minecraft:iron_pickaxe', 1),
        [
            'AAA',
            ' B ',
            ' B '
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:stick'
        }
    )

    event.remove({ output: 'minecraft:iron_axe' })
    event.shaped(
        Item.of('minecraft:iron_axe', 1),
        [
            'AA ',
            'AB ',
            ' B '
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:stick'
        }
    )

//golden

    event.remove({ output: 'minecraft:golden_helmet' })
    event.shaped(
        Item.of('minecraft:golden_helmet', 1),
        [
            'AAA',
            'ABA',
            '   '
        ],
        {
            A: 'create:golden_sheet',
            B: 'minecraft:leather_helmet'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(4)
        return Item.of('minecraft:golden_helmet').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:golden_chestplate' })
    event.shaped(
        Item.of('minecraft:golden_chestplate', 1),
        [
            'ABA',
            'AAA',
            'AAA'
        ],
        {
            A: 'create:golden_sheet',
            B: 'minecraft:leather_chestplate'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(1)
        return Item.of('minecraft:golden_chestplate').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:golden_leggings' })
    event.shaped(
        Item.of('minecraft:golden_leggings', 1),
        [
            'AAA',
            'ABA',
            'A A'
        ],
        {
            A: 'create:golden_sheet',
            B: 'minecraft:leather_leggings'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(4)
        return Item.of('minecraft:golden_leggings').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:golden_boots' })
    event.shaped(
        Item.of('minecraft:golden_boots', 1),
        [
            'ABA',
            'A A',
            '   '
        ],
        {
            A: 'create:golden_sheet',
            B: 'minecraft:leather_boots'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(1)
        return Item.of('minecraft:golden_boots').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:golden_sword' })
    event.shaped(
        Item.of('minecraft:golden_sword', 1),
        [
            ' A ',
            ' A ',
            ' B '
        ],
        {
            A: 'create:golden_sheet',
            B: 'minecraft:stick'
        }
    )

    event.remove({ output: 'minecraft:golden_shovel' })
    event.shaped(
        Item.of('minecraft:golden_shovel', 1),
        [
            ' A ',
            ' B ',
            ' B '
        ],
        {
            A: 'create:golden_sheet',
            B: 'minecraft:stick'
        }
    )

    event.remove({ output: 'minecraft:golden_hoe' })
    event.shaped(
        Item.of('minecraft:golden_hoe', 1),
        [
            'AA ',
            ' B ',
            ' B '
        ],
        {
            A: 'create:golden_sheet',
            B: 'minecraft:stick'
        }
    )

    event.remove({ output: 'minecraft:golden_pickaxe' })
    event.shaped(
        Item.of('minecraft:golden_pickaxe', 1),
        [
            'AAA',
            ' B ',
            ' B '
        ],
        {
            A: 'create:golden_sheet',
            B: 'minecraft:stick'
        }
    )

    event.remove({ output: 'minecraft:golden_axe' })


//diamond


    event.remove({ output: 'minecraft:diamond_helmet' })
    event.shaped(
        Item.of('minecraft:diamond_helmet', 1),
        [
            'AAA',
            'ABA',
            '   '
        ],
        {
            A: 'minecraft:diamond',
            B: 'minecraft:iron_helmet'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(4)
        return Item.of('minecraft:diamond_helmet').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:diamond_chestplate' })
    event.shaped(
        Item.of('minecraft:diamond_chestplate', 1),
        [
            'ABA',
            'AAA',
            'AAA'
        ],
        {
            A: 'minecraft:diamond',
            B: 'minecraft:iron_chestplate'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(1)
        return Item.of('minecraft:diamond_chestplate').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:diamond_leggings' })
    event.shaped(
        Item.of('minecraft:diamond_leggings', 1),
        [
            'AAA',
            'ABA',
            'A A'
        ],
        {
            A: 'minecraft:diamond',
            B: 'minecraft:iron_leggings'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(4)
        return Item.of('minecraft:diamond_leggings').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:diamond_boots' })
    event.shaped(
        Item.of('minecraft:diamond_boots', 1),
        [
            'ABA',
            'A A',
            '   '
        ],
        {
            A: 'minecraft:diamond',
            B: 'minecraft:iron_boots'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(1)
        return Item.of('minecraft:diamond_boots').withNBT(item1.nbt)
        return result
    })

//neherit

    event.remove({ output: 'minecraft:netherite_helmet' })
    event.shaped(
        Item.of('minecraft:netherite_helmet', 1),
        [
            'ABA',
            'CDC',
            '   '
        ],
        {
            A: 'create:sturdy_sheet',
            B: 'minecraft:netherite_ingot',
            C: 'tfmg:rubber_sheet',
            D: 'minecraft:diamond_helmet'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(4)
        return Item.of('minecraft:netherite_helmet').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:netherite_chestplate' })
    event.shaped(
        Item.of('minecraft:netherite_chestplate', 1),
        [
            'ABA',
            'CDC',
            '   '
        ],
        {
            A: 'create:sturdy_sheet',
            B: 'minecraft:netherite_ingot',
            C: 'tfmg:rubber_sheet',
            D: 'minecraft:diamond_chestplate'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(4)
        return Item.of('minecraft:netherite_chestplate').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:netherite_leggings' })
    event.shaped(
        Item.of('minecraft:netherite_leggings', 1),
        [
            'ABA',
            'CDC',
            '   '
        ],
        {
            A: 'create:sturdy_sheet',
            B: 'minecraft:netherite_ingot',
            C: 'tfmg:rubber_sheet',
            D: 'minecraft:diamond_leggings'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(4)
        return Item.of('minecraft:netherite_leggings').withNBT(item1.nbt)
        return result
    })

    event.remove({ output: 'minecraft:netherite_boots' })
    event.shaped(
        Item.of('minecraft:netherite_boots', 1),
        [
            'ABA',
            'CDC',
            '   '
        ],
        {
            A: 'create:sturdy_sheet',
            B: 'minecraft:netherite_ingot',
            C: 'tfmg:rubber_sheet',
            D: 'minecraft:diamond_boots'
        }
    ).modifyResult((grid, result) => {
        let item1 = grid.get(4)
        return Item.of('minecraft:netherite_boots').withNBT(item1.nbt)
        return result
    })

//drill

    event.remove({ output: 'create:mechanical_drill' })
    event.shaped(
        Item.of('create:mechanical_drill', 1),
        [
            ' C ',
            'CAC',
            ' B '
        ],
        {
            A: 'minecraft:iron_block',
            B: 'create:andesite_casing',
            C: 'create:andesite_alloy'
        }
    )

//БОРД

    event.remove({ output: 'alexsmobs:straddleboard' })
    event.shaped(
        Item.of('alexsmobs:straddleboard', 1),
        [
            ' BA',
            'BAB',
            'AB '
        ],
        {
            A: 'create:sturdy_sheet',
            B: 'alexsmobs:straddlite',
        }
    )

// bakpaki

    event.remove({ output: "sophisticatedbackpacks:copper_backpack" })
    event.custom({
    type: "sophisticatedbackpacks:backpack_upgrade",
    category: "misc",
   "neoforge:conditions": [
        {
        "type": "sophisticatedcore:item_enabled",
        "itemRegistryName": "sophisticatedbackpacks:copper_backpack"
        } 
    ],
    key: {
        B: {
        item: "sophisticatedbackpacks:backpack"
        },
        C: {
        tag: "c:ingots/copper"
        },
        D: {
        item: 'minecraft:leather'
        },
        E: {
        item: "minecraft:string"
        },
        F: {
        item: "minecraft:flint"
        },
        G: {
        item: "minecraft:copper_block"
        },
    },
    pattern: [
        "EFE",
        "DBD",
        "CGC"
    ],
    result: { 
        count: "1",
        id: "sophisticatedbackpacks:copper_backpack" }
    })

    event.remove({ output: 'sophisticatedbackpacks:iron_backpack' })
    event.custom({
    type: "sophisticatedbackpacks:backpack_upgrade",
    category: "misc",
    "neoforge:conditions": [
        {
        "type": "sophisticatedcore:item_enabled",
        "itemRegistryName": 'sophisticatedbackpacks:iron_backpack'
        } 
    ],
    key: {
        B: {
        item: 'sophisticatedbackpacks:copper_backpack'
        },
        C: {
        item: 'create:iron_sheet'
        },
        D: {
        item: 'minecraft:leather'
        },
        E: {
        item: "minecraft:string"
        },
        F: {
        item: 'minecraft:diamond'
        },
        G: {
        item: 'minecraft:iron_block'
        },
    },
    pattern: [
        "EFE",
        "DBD",
        "CGC"
    ],
    result: { 
        count: "1",
        id: 'sophisticatedbackpacks:iron_backpack' }
    })

    event.remove({ output: 'sophisticatedbackpacks:gold_backpack' })
    event.custom({
    type: "sophisticatedbackpacks:backpack_upgrade",
    category: "misc",
    "neoforge:conditions": [
        {
        "type": "sophisticatedcore:item_enabled",
        "itemRegistryName": 'sophisticatedbackpacks:gold_backpack'
        } 
    ],
    key: {
        B: {
        item: 'sophisticatedbackpacks:iron_backpack'
        },
        C: {
        item: 'create:brass_sheet'
        },
        D: {
        item: 'minecraft:leather'
        },
        E: {
        item: "minecraft:string"
        },
        F: {
        tag: 'create:toolboxes'
        },
        G: {
        item: 'create:brass_block'
        },
    },
    pattern: [
        "EFE",
        "DBD",
        "CGC"
    ],
    result: { 
        count: "1",
        id: 'sophisticatedbackpacks:gold_backpack' }
    })

    event.remove({ output: 'sophisticatedbackpacks:diamond_backpack' })
    event.custom({
    type: "sophisticatedbackpacks:backpack_upgrade",
    category: "misc",
    "neoforge:conditions": [
        {
        "type": "sophisticatedcore:item_enabled",
        "itemRegistryName": 'sophisticatedbackpacks:diamond_backpack'
        } 
    ],
    key: {
        B: {
        item: 'sophisticatedbackpacks:gold_backpack'
        },
        C: {
        item: 'minecraft:diamond'
        },
        D: {
        item: 'tfmg:rubber_sheet'
        },
        E: {
        item: 'tfmg:synthetic_string'
        },
        F: {
        item: 'create:sturdy_sheet'
        },
        G: {
        item: 'minecraft:diamond_block'
        },
    },
    pattern: [
        "EFE",
        "DBD",
        "CGC"
    ],
    result: { 
        count: "1",
        id: 'sophisticatedbackpacks:diamond_backpack' }
    })

    event.remove({ output: 'sophisticatedbackpacks:netherite_backpack' })
    event.custom({
    type: "sophisticatedbackpacks:backpack_upgrade",
    category: "misc",
    "neoforge:conditions": [
        {
        "type": "sophisticatedcore:item_enabled",
        "itemRegistryName": 'sophisticatedbackpacks:netherite_backpack'
        } 
    ],
    key: {
        B: {
        item: 'sophisticatedbackpacks:diamond_backpack'
        },
        C: {
        item: 'minecraft:netherite_scrap'
        },
        D: {
        item: 'tfmg:rubber_sheet'
        },
        E: {
        item: 'tfmg:aluminum_wire'
        },
        F: {
        item: 'tfmg:steel_mechanism'
        },
        G: {
        item: 'minecraft:netherite_ingot'
        },
    },
    pattern: [
        "EFE",
        "DBD",
        "CGC"
    ],
    result: { 
        count: "1",
        id: 'sophisticatedbackpacks:netherite_backpack' }
    })

// ваксед лайгтли везеред кат коппер стеирс

    event.remove({ output: "create:brass_ingot" })
    event.custom({
    type: "create:mixing",
    heat_requirement: "heated",
    ingredients: [
        {
        item: 'minecraft:waxed_exposed_cut_copper_stairs'
        },
        {
        count: 3,
        item: 'create:zinc_ingot'
        }
    ],
    results: [{
      count: 6,
      id: "create:brass_ingot"
    }]
    })

    event.shaped(
        Item.of("create:brass_ingot", 1),
        [
            'AAA',
            'AAA',
            'AAA'
        ],
        {
            A: 'create:brass_nugget'
        }
    )

//faer!

    event.remove({ output: 'burnt:extinguisher' })
    event.shaped(
        Item.of('burnt:extinguisher', 1),
        [
            'AC ',
            'BC ',
            '   '
        ],
        {
            A: 'minecraft:iron_nugget',
            B: 'minecraft:water_bucket',
            C: 'minecraft:iron_ingot'
        }
    )
    event.shapeless(
        Item.of('burnt:extinguisher', 1), [
        Item.of('burnt:extinguisher'),
        'minecraft:water_bucket'
    ]).replaceIngredient('minecraft:water_bucket', 'minecraft:bucket')

//hubbl

    // event.shaped(
    //     Item.of('drivebywire:controller_hub', 1),
    //     [
    //         ' A ',
    //         ' B ',
    //         ' C '
    //     ],
    //     {
    //         A: 'create:transmitter',
    //         B: 'create:brass_casing',
    //         C: 'create:linked_controller'
    //     }
    // ).keepIngredient('create:linked_controller')

    // event.shaped(
    //     Item.of('drivebywire:tweaked_controller_hub', 1),
    //     [
    //         ' A ',
    //         ' B ',
    //         ' C '
    //     ],
    //     {
    //         A: 'create:transmitter',
    //         B: 'create:brass_casing',
    //         C: 'create_tweaked_controllers:tweaked_linked_controller'
    //     }
    // ).keepIngredient('create_tweaked_controllers:tweaked_linked_controller')

    // event.shaped(
    //     Item.of('drivebywire:wire', 1),
    //     [
    //         '   ',
    //         'BAB',
    //         '   '
    //     ],
    //     {
    //         A: 'minecraft:redstone',
    //         B: 'create:copper_nugget'
    //     }
    // )

    // event.shaped(
    //     Item.of('drivebywire:wire_cutter', 1),
    //     [
    //         '   ',
    //         ' A ',
    //         '   '
    //     ],
    //     {
    //         A: 'createdieselgenerators:wire_cutters'
    //     }
    // )

    event.shaped(
        Item.of('minecraft:chain', 1),
        [
            ' A ',
            ' A ',
            ' A '
        ],
        {
            A: 'minecraft:iron_nugget'
        }
    )
    event.shaped(
        Item.of('minecraft:chain', 1),
        [
            ' A ',
            ' A ',
            ' A '
        ],
        {
            A: 'create:zinc_nugget'
        }
    )

    event.shaped(
        Item.of('minecraft:lantern', 1),
        [
            ' A ',
            ' B ',
            ' A '
        ],
        {
            A: 'create:zinc_nugget',
            B: 'minecraft:torch'
        }
    )

    event.shaped(
        Item.of('minecraft:lantern', 1),
        [
            ' A ',
            ' B ',
            ' A '
        ],
        {
            A: 'minecraft:iron_nugget',
            B: 'minecraft:torch'
        }
    )

    event.shaped(
        Item.of('minecraft:player_head', 1),
        [
            'ACA',
            'BAB',
            'AAA'
        ],
        {
            A: 'minecraft:leather',
            B: 'minecraft:spider_eye',
            C: 'minecraft:rotten_flesh',
        }
    )

    //ass guns
    event.remove({ id: 'create_armorer:create_workbench' })
    event.remove({ id: 'immersive_armorer:workbench' })
    event.remove({ id: 'immersive_armorer:gun/standard_rail_pistol_mk3' })
    event.remove({ id: 'immersive_armorer:gun/standard_rail_pistol_mk2' })
    event.remove({ id: 'immersive_armorer:gun/standard_rail_smg_mk1' })
    event.remove({ id: 'immersive_armorer:gun/plasma_gun' })
    event.remove({ id: 'create_armorer:gun/special_melee_wrench' })
    event.remove({ id: 'createimmersivetacz:guns/melee_wrench' })

    //good guns need crafts
    event.remove({ id: 'immersive_armorer:gun/revolver' })
    event.remove({ id: 'immersive_armorer:gun/pistol_9mm' })
    event.remove({ id: 'immersive_armorer:gun/railgun' })
    event.remove({ id: 'immersive_armorer:gun/assult_rifle' })
    event.remove({ id: 'immersive_armorer:gun/pump_shotgun' })
    event.remove({ id: 'immersive_armorer:gun/double_shotgun' })
    event.remove({ id: 'immersive_armorer:gun/short_smg' })
    event.remove({ id: 'immersive_armorer:gun/chemical_thrower' })
    event.remove({ id: 'immersive_armorer:gun/dual_barrel_cannon' })

    //create guns dont need crafts
    event.remove({ id: 'create_armorer:gun/pistol_revolver_torque' })
    event.remove({ id: 'create_armorer:gun/pistol_auto_stress' })
    event.remove({ id: 'create_armorer:gun/sniper_semi_clockwork' })
    event.remove({ id: 'create_armorer:gun/sniper_semi_m1' })
    event.remove({ id: 'create_armorer:gun/rifle_assult_crane' })
    event.remove({ id: 'create_armorer:gun/rifle_assult_roller' })
    event.remove({ id: 'create_armorer:gun/shotgun_db_stone' })
    event.remove({ id: 'create_armorer:gun/shotgun_pump_bearing' })
    event.remove({ id: 'create_armorer:gun/smg_auto_crank' })
    event.remove({ id: 'create_armorer:gun/gl_revolver_devastator' })
    event.remove({ id: 'create_armorer:gun/cannon_40mm_salamander' })
    event.remove({ id: 'create_armorer:gun/mg_platemag_flywheel' })


    console.log('Hello! The recipe event has fired!')
})
