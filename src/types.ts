export type VeturTagCollection = {
  [key: string]: VeturTag
}

export type VeturTag = {
  attributes: string[]
  description: string
}

export type VeturAttributeCollection = {
  [key: string]: VeturAttribute
}

export type VeturAttribute = {
  type: string
  description: string
}
