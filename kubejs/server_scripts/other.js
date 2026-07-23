// List of items that count towards carry weight
const heavy_item_list = [
    "sophisticatedbackpacks:backpack",
    'sophisticatedbackpacks:copper_backpack',
    "sophisticatedbackpacks:iron_backpack",
    "sophisticatedbackpacks:gold_backpack",
    "sophisticatedbackpacks:diamond_backpack",
    "sophisticatedbackpacks:netherite_backpack"
]
const CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')
let weightCheckTicks = 0

ServerEvents.tags('item', event => {event.add("forge:heavy_items", heavy_item_list) })

ServerEvents.tick(event => {
    // Inventory and Curios scans do not need to run on every server tick.
    weightCheckTicks++

    if (weightCheckTicks < 20) {
        return
    }

    weightCheckTicks = 0

    event.server.players.forEach(player => {
        let heavyItemCount = 0
        
        for (let slot = 0; slot < player.inventory.getContainerSize(); slot++) {
            let itemStack = player.inventory.getItem(slot)
            
            if (!itemStack.isEmpty()) {
                if (itemStack.hasTag('forge:heavy_items')) {
                    heavyItemCount += itemStack.getCount()
                }
            }
        }

        let curiosInventory = CuriosApi.getCuriosInventory(player)

        if (curiosInventory.isPresent()) {
            let equippedCurios = curiosInventory.get().getEquippedCurios()

            for (let slot = 0; slot < equippedCurios.getSlots(); slot++) {
                let itemStack = equippedCurios.getStackInSlot(slot)

                if (!itemStack.isEmpty() && itemStack.hasTag('forge:heavy_items')) {
                    heavyItemCount += itemStack.getCount()
                }
            }
        }
        
        if (heavyItemCount > 1) {
            player.potionEffects.add('minecraft:slowness', 40, 100, true, false)
        }
    })
})
