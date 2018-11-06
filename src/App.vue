<template>
  <div id="app">
    <div class="hero auth is-fullheight" :style="{display: viewAuth}">
      <div class="hero-body">
        <div class="container">
          <auth :map="[]" :track="track" :viewAuth.sync="viewAuth" @display-none="viewAuth = 'none'; viewMap = 'block'"></auth>  
        </div>
        
      </div>
      
    </div>
    <div class="section" :style="{display: viewMap}">
      <mapa :tacts="track" />
    </div>
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
      track: [],
      viewAuth: 'flex',
      viewMap: 'none'
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
  text-align: center;
  /* background: linear-gradient(to bottom,#5a4ba3 0%,#7b3795 100%); */
}

.auth {
  background: linear-gradient(to bottom,#5a4ba3 0%,#7b3795 100%);
}

.viewMap {
  display: none;
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

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1; 
}

::-webkit-scrollbar-thumb {
    background: #7957d5; 
}


::-webkit-scrollbar-thumb:hover {
    background: #634A99; 
}

.fa-chevron-circle-up {
  color: #7957d5;
}
</style>
