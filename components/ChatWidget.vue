<script setup>

</script>

<template>
  <div>
    <h1>testing!</h1>
  </div>
</template>
<script>
export default {
  setup() {
    
  },
  mounted() {
    const nuxtApp = useNuxtApp()
    console.log(nuxtApp.$footy)
  }
}
</script>