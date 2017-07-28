<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click='toCategory'>category</button>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Hello Vue-cli'
    }
  },
  methods:{
    toCategory(){
      router.push({
          name: 'Category'
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
