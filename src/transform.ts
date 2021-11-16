import { ComponentDoc } from "vue-docgen-api"
import { paramCase } from "param-case"
import { VeturAttributeCollection, VeturTagCollection } from "./types"

export function transformTags(components: ComponentDoc[]): VeturTagCollection {
  return components.reduce(
    (acc: VeturTagCollection, component) => ({
      ...acc,
      [paramCase(component.displayName)]: {
        attributes: component.props?.map((it) => paramCase(it.name)) || [],
        description: component.description || "",
      },
    }),
    {}
  )
}

export function transformAttributes(components: ComponentDoc[]): VeturAttributeCollection {
  return components.reduce((acc: VeturAttributeCollection, component) => {
    const attributes: VeturAttributeCollection =
      component.props?.reduce(
        (accProp: VeturAttributeCollection, prop) => ({
          ...accProp,
          [`${paramCase(component.displayName)}/${paramCase(prop.name)}`]: {
            type: prop.type?.name ?? "any",
            description: prop.description || "",
          },
        }),
        {}
      ) || {}

    return {
      ...acc,
      ...attributes,
    }
  }, {})
}
