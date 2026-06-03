const DataComponents = Java.loadClass('net.minecraft.core.component.DataComponents')
const BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')

const n = 2

function changeFood(event, id, nutrition, saturationModifier) {
  event.modify(id, item => {
    item.modifyFood(food => {
      food.nutrition(nutrition)
      food.saturation(saturationModifier)
    })
  })
}

ItemEvents.modification(event => {
  const iterator = BuiltInRegistries.ITEM.iterator()

  let mcItem
  let oldFood
  let id
  let newNutrition
  let newSaturation
  let newSaturationModifier

  while (iterator.hasNext()) {
    mcItem = iterator.next()
    oldFood = mcItem.components().get(DataComponents.FOOD)

    if (oldFood == null) {
      continue
    }

    id = BuiltInRegistries.ITEM.getKey(mcItem).toString()

    newNutrition = oldFood.nutrition() == 0
      ? 0
      : Math.max(1, Math.floor(oldFood.nutrition() / n))

    newSaturation = Math.floor(oldFood.saturation() / n)

    newSaturationModifier = newNutrition > 0
      ? newSaturation / (newNutrition * 2)
      : 0

    changeFood(event, id, newNutrition, newSaturationModifier)
  }
})