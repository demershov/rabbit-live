<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <button class="button is-primary" @click="previousTick()">Предыдущий Такс</button>
                <button class="button is-primary" @click="nextTick()">Следующий Такт</button>
                <button class="button is-primary">Добавить кроликов</button>
            </div>
        </div>
        <p>ВСЕГО ТАКТОВ: {{tacts.length}}</p>
        <p>Текущий такт: {{ tact + 1 }}</p>
        <div v-for="(row, indexRow) in tacts[tact]" :key="indexRow" class="row">
            <div v-for="(cell, indexCell) in row" :key="indexCell" class="cell item-wrapper__item" :class="cell.type" @contextmenu.prevent.stop="handleClick($event, [indexRow, indexCell])">

                <img :src="'./src/assets/rain' + cell.rain + '.png'" alt="" srcset="" class="img-rain" v-if="cell.rain != 0">
                <img :src="'./src/assets/sun' + cell.sun + '.png'" alt="" srcset="" class="img-sun" v-if="cell.sun != 0">
                <img :src="'./src/assets/grass' + cell.grass + '.png'" alt="" srcset="" class="img-grass" v-if="cell.grass != 0">
                <br>
                Трава = {{ tacts[tact][indexRow][indexCell]['grass'] }}
               <!-- Дождь = {{ tacts[tact][indexRow][indexCell]['rain'] }}
               Солнце = {{ tacts[tact][indexRow][indexCell]['sun'] }}
               Тип = {{ tacts[tact][indexRow][indexCell]['type'] }}
                -->
               <!-- <div class="item-wrapper">
                    <div v-for="(item, index) in tacts[tact][indexRow][indexCell]" @click.prevent.stop="handleClick($event, item)" class="item-wrapper__item" :key="index">
                        {{item.name}}
                    </div>
                </div> -->
            </div>
        </div>
        
        <vue-simple-context-menu
            :id="'myUniqueId'"
            :options="options"
            :ref="'vueSimpleContextMenu'"
            @optionClicked="optionClicked">
        </vue-simple-context-menu>

        
    </div>
</template>

<script>
    
    
    export default {
        data () {
            return {
                tact: 0,
                array: [],
                options: [
                    {
                        name: 'Увеличить сочность',
                        slug: 'increaseJuiciness'
                    },

                    {
                        name: 'Уменьшить сочность',
                        slug: 'reduceJuiciness'
                    },

                    {
                        name: 'Добавить интенсивность дождя',
                        slug: 'increaseRain'
                    },

                    {
                        name: 'Уменьшить интенсивность дождя',
                        slug: 'reduceRain'
                    },

                    {
                        name: 'Увеличить температуру',
                        slug: 'increaseSun',
                    },

                    {
                        name: 'Уменьшить температуру',
                        slug: 'reduceSun',
                    },
                ]
            }
        },
        props: ['tacts'],
        methods: {

            handleClick (event, item, indexRow, indexCell) {
                if(this.tact === this.tacts.length - 1) {
                    this.$refs.vueSimpleContextMenu.showMenu(event, item);
                }
            },

            optionClicked (event) {
                let cell = this.tacts[this.tact][event.item[0]][event.item[1]];
                let method = event.option.slug;
                
                if(cell.type === 'Field') {
                    if (method === 'increaseJuiciness') {
                        this.increaseJuiciness(cell);
                    }

                    else if (method === 'reduceJuiciness') {
                        this.reduceJuiciness(cell);
                    }
                }

                if (method === 'increaseRain') {
                    this.increaseRain(cell);
                } 

                else if (method === 'reduceRain') {
                    this.reduceRain(cell);
                }

                else if (method === 'increaseSun') {
                    this.increaseSun(cell);
                }

                else if(method === 'reduceSun') {
                    this.reduceSun(cell);
                }
            },

            previousTick() {
                this.array = JSON.parse(JSON.stringify(this.tacts[this.tact]));
                this.tact -= 1 ? this.tact > 0 : 0;
            },

            nextTick() {
                console.log(this.tacts[this.tact]);
                
                this.array = JSON.parse(JSON.stringify(this.tacts[this.tact]));
                console.log(this.array);
                
                if (this.tact === this.tacts.length - 1) {
                    this.calcCells();
                }
                else {
                    this.tact++;
                }
            },

            calcCells() {

                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array[i].length; j++) {

                        let currentCell = this.array[i][j];
                        let rightCell = this.array[i][j + 1];
                        let leftCell = this.array[i][j - 1];
                        let topCell = typeof this.array[i + 1] !== 'undefined' ? this.array[i + 1][j] : undefined;
                        let bottomCell =  typeof this.array[i - 1] !== 'undefined' ? this.array[i - 1][j] : undefined;

                        // Если данная ячейка является полем
                        if (currentCell['type'] === 'Field') {
                            // this.liveGrass(currentCell);
                            this.processingCell(currentCell, rightCell, leftCell, topCell, bottomCell);
                        }

                        this.generationWWeather(currentCell);
                    
                    }
                }
                this.tacts.push(JSON.parse(JSON.stringify(this.array)))
                this.tact++;
            },

            checkNeighbour(cell) {
                if (cell.type === 'Water') {
                    return true
                }
                else {
                    return false
                }
            },

            // В зависимости от соседней ячейке появляется трава или нет
            processingCell(currentCell, rightCell, leftCell, topCell, bottomCell) {
                // Если ячейка справа существует
                console.log(currentCell);
                
                if (typeof rightCell !== 'undefined' && this.checkNeighbour(rightCell)) {
                    // Если соседняя ячейка справа явялется водой и у текущей ячейке существует солнце
                    if (currentCell['sun'] > 0) {
                        increaseJuiciness(currentCell);
                    }
                    else {
                        this.liveGrass(currentCell);
                    }
                }

                // Если ячейка слева существует
                else if (typeof leftCell !== 'undefined' && this.checkNeighbour(leftCell)) {
                    // Если соседняя ячейка слева явялется водой и у текущей ячейке существует солнце
                    if (currentCell['sun'] > 0) {
                         increaseJuiciness(currentCell);
                    }
                    else {
                        this.liveGrass(currentCell);
                    }
                }

                // Если ячейка сверху существует
                else if (typeof topCell !== 'undefined' && this.checkNeighbour(topCell)) {
                    // Если соседняя ячейка сверху явялется водой и у текущей ячейке существует солнце
                    if ( currentCell['sun'] > 0) {
                         increaseJuiciness(currentCell);
                    }
                    else {
                        this.liveGrass(currentCell);
                    }
                }

                // Если ячейка снизу существует
                else if (typeof bottomCell !== 'undefined' && this.checkNeighbour(bottomCell)) {
                    // Если соседняя ячейка снизу явялется водой и у текущей ячейке существует солнце
                    if ( currentCell['sun'] > 0) {
                         increaseJuiciness(currentCell);
                    }
                    else {
                        this.liveGrass(currentCell);
                    }
                }
                else {
                    this.liveGrass(currentCell);
                }

                
            },

            // Обработка ячейки в зависимости от погоды
            liveGrass(currentCell) {
                // 3 (Ливень) 0 (Нет солнца) Трава умирает
                if (currentCell['rain'] === 3 && currentCell['sun'] === 0) {
                    currentCell['grass'] = 0;
                }

                // 1 (Слабый дождик) 1 (Слабое солнце) Растет трава
                else if (currentCell['rain'] === 1 && currentCell['sun'] === 1) {
                    this.increaseJuiciness(currentCell);
                }

                // 2 (Средний дождь) 1 (Слабое солнце)
                else if (currentCell['rain'] === 2 && currentCell['sun'] === 1) {
                    this.increaseJuiciness(currentCell);
                }

                // 1 (Слабый дождик) 2 (Сильное солнце) Растет трава
                else if (currentCell['rain'] === 1 && currentCell['sun'] === 2) {
                    this.increaseJuiciness(currentCell);
                }

                // 2 (Средний дождь) 2 (Сильное солнце) Растет трава
                else if (currentCell['rain'] === 2 && currentCell['sun'] === 2) {
                    this.increaseJuiciness(currentCell);
                }

                // 3 (Ливень) 2 (Сильное солнце) Растет трава
                else if (currentCell['rain'] === 3 && currentCell['sun'] === 2) {
                    this.increaseJuiciness(currentCell);
                }

                // 0 (Нет дождя) 3 (Жгучее солнце) Высыхает трава
                else if (currentCell['rain'] === 0 && currentCell['sun'] === 3) {
                    this.reduceJuiciness(currentCell)
                }

                // 2 (Средний дождь) 3 (Жгучее солнце) Растет трава
                else if (currentCell['rain'] === 2 && currentCell['sun'] === 3) {
                    this.increaseJuiciness(currentCell);
                }

                // 3 (Ливень) 3 (Жгучее солнце) Растет трава
                else if (currentCell['rain'] === 3 && currentCell['sun'] === 3) {
                    this.increaseJuiciness(currentCell);
                }
            },
            
            generationWWeather(currentCell) {
                currentCell['sun'] = this.getRandomInt(0, 3);
                currentCell['rain'] = this.getRandomInt(0, 3);

            },

            getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            increaseJuiciness(cell) {
                cell['grass'] += 1 ? cell['grass'] != 5 : cell['grass'];
            },

            reduceJuiciness(cell) {
                cell['grass'] -= 1 ? cell['grass'] != 0 : cell['grass'];
            },

            increaseRain(cell) {
                cell['rain'] += 1 ? cell['rain'] != 3 : cell['rain'];
            },

            reduceRain(cell) {
                cell['rain'] -= 1 ? cell['rain'] != 0 : cell['rain'];
            },

            increaseSun(cell) {
                cell['sun'] += 1 ? cell['sun'] != 3 : cell['sun'];
            }, 

            reduceSun(cell) {
                cell['sun'] -= 1 ? cell['sun'] != 0 : cell['sun'];
            }

        }
    }
</script>

<style>
    .container {
        margin-bottom: 15px;
    }
    .row {
        /* background-color: #f32563; */
        /* width: 100%; */
        height: 100%;
        /* padding: 10px 0px 5px; */
        display: inline-grid;
        grid-column: 1/span 1;
        /* grid-gap: 5px; */
    }

    .cell {
        /* background-color: #81c1f5; */
        width: 220px;
        height: 200px;
        /* border: 1px solid #000; */
        grid-row: 1/span 1;
        padding: 0;
        /* background-image: url(); */
        position: relative;
        /* grid-gap: 5px; */
    }
    .img-sun, .img-rain {   
        width: 30%;
        right: 0;
    }
    .img-rain {
        position: relative;
        right: -20%;
    }
    .img-grass {
        position: absolute;
        bottom: 0;
        left: 10px;
    }
    .Water {
        background-color: #1fc8db;
    }
    /* .Field {
        background-color: #;
    } */
    .Hill, .Water, .Field {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }

    .Hill {
        background-image: url('../assets/mountain.png');
    }

    .Field {
        background-image: url('../assets/field.png');
    }

    .Water {
        background-image: url('../assets/water.png');
    }
    


</style>
