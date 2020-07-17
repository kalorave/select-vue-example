<template>
  <div id="app">
    <div class="wrap">
      <Select />
    </div>
  </div>
</template>

<script>
import Select from "@/components/Select.vue";

export default {
  name: 'App',
  components: {
    Select
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: $font-stack;
  color: $color-primary;
  font-size: $html-font-size;
  .wrap {
    margin-top: 3rem;
    margin-left: 3rem;
    width: 25rem;
  }
}
</style>
