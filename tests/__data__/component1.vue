<template>
  <div>{{ prop1 }}</div>
  <div>{{ prop2.value }}</div>
</template>

<script>
/**
 * Component 1
 */
export default {
  props: {
    prop1: {
      type: String,
      default: "Hello",
    },
    /**
     * Prop 2
     */
    prop2: {
      type: Object,
      required: true,
    },
    /**
     * Prop 3
     */
    prop3: {},
  },
}
</script>
