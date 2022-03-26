<template>
  <div class="container">
    <BeforeAfter
      :value="50"
      :step="0.01"
      beforeImage="https://d6xkme6dcvajw.cloudfront.net/images/Cases/godee/png/application-before.png"
      afterImage="https://d6xkme6dcvajw.cloudfront.net/images/Cases/godee/png/application-after.png"
    />
  </div>
</template>

<script>
import BeforeAfter from './components/BeforeAfter.vue'

export default {
  name: 'App',

  components: {
    BeforeAfter
  }
}
</script>

<style scoped>
.container {
  max-width: 980px;
  margin: 0 auto;
  height: 100vh;
}
</style>