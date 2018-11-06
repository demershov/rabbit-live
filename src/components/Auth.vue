<template>
  <div class="container">
    <div class="columns is-centered">
        <div class="column is-narrow">
          <h1 class="is-size-1 has-text-weight-semibold has-text-white is-capitalized">Кролик живи!</h1>
        </div>
      </div>
    <div class="columns is-centered">
      <div class="column is-narrow">
        <div class="box ">
          <div class="columns is-centered">
            <div class="column is-narrow">
              <figure class="image is-256x256">
                <img class="is-rounded" src="../assets/image.png" style="background-size: cover; background-position: center center;">
              </figure>
            </div>
          </div>

          <div class="columns is-centered">
            <div class="column is-narrow">
              <div class="field">
                <label class="label is-size-6">Введите разрешение карты</label>
                <div class="control has-icons-left">
                  <input class="input is-medium " type="number" placeholder="Введите размерность карты" minlength="1" maxlength="3" v-model="size"
                    min="1" max="100">
                  <span class="icon is-medium is-left">
                    <i class="fa fa-th"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <button class="button is-success has-text-centered has-text-weight-semibold is-size-5" @click="generation()">Поехали</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    
</div>
</template>

<script>
  export default {
    data() {
      return {
        size: 0,
      }
    },
    methods: {
        generation() {
          this.size = (this.size > 100) ? 100 : this.size;
            for (let i = 0; i < this.size; i++) {
                this.map.push([])
                for (let j = 0; j < this.size; j++) {
                    let types = ['Water', 'Hill', 'Field']
                    let cell = {
                        type: types[this.getRandomInt(0, 2)],
                        rain: this.getRandomInt(0, 3),
                        sun: this.getRandomInt(0, 3),
                        grass: 0,
                        rabbits: 0,
                        hunters: 0,
                    }
                    if (cell['rain'] === 3) {
                        cell['sun'] = 0;
                    }
                    this.map[i].push(cell)
                }
            }
            this.track.push(this.map);
            this.$emit('display-none')
            

        },

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },


    },
    props: ['map', 'track', 'viewAuth']
  }

</script>

<style scoped>
  .content {
    display: grid;
  }
</style>
