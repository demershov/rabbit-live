<template>
  <div class="content">
    <div class="columns">
      <div class="column">
        <div class="control">
          <input class="input" type="text" placeholder="Введите размерность карты" minlength="1" maxlength="3" v-model="size"
            min="1" max="100">
          <button class="button is-primary" @click="generation()">Начать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        size: 0
      }
    },
    methods: {
        generation() {
            for (let i = 0; i < this.size; i++) {
                this.map.push([])
                for (let j = 0; j < this.size; j++) {
                    let types = ['Water', 'Field', 'Hill']
                    let cell = {
                        type: types[this.getRandomInt(0, 2)],
                        rain: this.getRandomInt(0, 3),
                        sun: this.getRandomInt(0, 3),
                        grass: 0,
                    }
                    if (cell['rain'] === 3) {
                        cell['sun'] = 0;
                    }
                    this.map[i].push(cell)
                }
            }


        },

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },


    },
    props: ['map']
  }

</script>

<style scoped>
  .content {
    display: grid;

  }

</style>
