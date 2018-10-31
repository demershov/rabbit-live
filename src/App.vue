<template>
  <div id="app">
    <auth :map="array"></auth>
    <mapa :array="array"/>
  </div>
</template>

<script>
import Auth from './components/Auth.vue'
import Mapa from './components/Map.vue'

export default {
  name: 'app',
  data () {
    return {
      array: [],
    }
  },
  components: {
    Auth,
    Mapa,
  }
}
</script>

<style>
@import '../node_modules/bulma/css/bulma.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
