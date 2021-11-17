# vue-docgen-vetur ![npm](https://img.shields.io/npm/v/vue-docgen-vetur) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/SmartsquareGmbH/vue-docgen-vetur/CI)

Generate vetur component data for your vue component library.

### Installation

`yarn add --dev vue-docgen-vetur`

### Usage

Run the generator from your project: `vue-docgen-vetur`.

The resulting files are generated into the current directory per default. The input and output directory can be
customized by passing them as arguments:

`vue-docgen-vetur -o dist/json src/components/**/*.vue`

The input supports the glob syntax. See [`fast-glob`](https://www.npmjs.com/package/fast-glob) for details.

For convenience, this call can be added to the `scripts` in the `package.json`:

```json
{
  "scripts": {
    "build:meta": "vue-docgen-vetur -o dist/json"
  }
}
```

For Vetur to detect the generated files, add another section to the `package.json`:

```json
{
  "vetur": {
    "tags": "dist/json/tags.json",
    "attributes": "dist/json/attributes.json"
  }
}
```

### Example

Relevant data is parsed from the documentation of your components. Given this component:

```vue
<template>
  <div>{{ text }}</div>
</template>

<script>
/**
 * My component
 */
export default {
  props: {
    /**
     * The text to display
     */
    text: {
      type: String,
      default: "Hello",
    },
  },
}
</script>
```

Vetur shows autocompletion:

| Component                                                                                                                     | Prop                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ![component-completion](https://user-images.githubusercontent.com/8021265/142169577-7d8b2c8c-01e7-4bec-a32e-f02a6e729ace.png) | ![prop-completion](https://user-images.githubusercontent.com/8021265/142169590-cca078b7-af11-4596-8802-2a0e8c54e621.png) |
