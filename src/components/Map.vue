<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <button class="button is-primary" @click="previousTick()">Предыдущий Такс</button>
                <button class="button is-primary" @click="nextTick()">Следующий Такт</button>
                <button class="button is-primary">Добавить кроликов</button>
            </div>
        </div>

        <div v-for="(row, indexRow) in tacts[tact]" :key="indexRow" class="row">
            <div v-for="(cell, indexCell) in tacts[tact][indexRow]" :key="indexCell" class="cell" :class="tacts[tact][indexRow][indexCell]['type']">
                <!-- <div class="field" v-if="tacts[tact][indexRow][indexCell]['type'] === 'Field'">
                </div>
                <div class="water" v-else-if="tacts[tact][indexRow][indexCell]['type'] === 'Water'">
                </div>
                <div class="hill" v-else>
                </div> -->
                <img :src="'./src/assets/rain' + tacts[tact][indexRow][indexCell].rain + '.png'" alt="" srcset="" class="img-rain">
                <img :src="'./src/assets/sun' + tacts[tact][indexRow][indexCell].sun + '.png'" alt="" srcset="" class="img-sun">
                <img :src="'./src/assets/grass' + tacts[tact][indexRow][indexCell].grass + '.png'" alt="" srcset="" class="img-sun">
                <br>
               Дождь = {{ tacts[tact][indexRow][indexCell]['rain'] }}
               Солнце = {{ tacts[tact][indexRow][indexCell]['sun'] }}
               Тип = {{ tacts[tact][indexRow][indexCell]['type'] }}
               Трава = {{ tacts[tact][indexRow][indexCell]['grass'] }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tact: 0,
                array: []
            }
        },
        props: ['tacts'],
        methods: {

            previousTick() {
                this.tact -= 1 ? this.tact > 0 : 0;
            },

            nextTick() {
                console.log(this.tact === this.tacts.length - 1)
                if (this.tact === this.tacts.length - 1) {
                    this.calcCells();
                }
                else {
                    this.tact++;
                }
            },

            calcCells() {

                this.array = JSON.parse(JSON.stringify(this.tacts[this.tact]));
                
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array[i].length; j++) {

                        let currentCell = this.array[i][j];
                        let rightCell = this.array[i][j + 1];
                        let leftCell = this.array[i][j - 1];
                        let topCell = typeof this.array[i + 1] !== 'undefined' ? this.array[i + 1][j] : undefined;
                        let bottomCell =  typeof this.array[i - 1] !== 'undefined' ? this.array[i - 1][j] : undefined;

                        // Если данная ячейка является полем
                        if (currentCell['type'] === 'Field') {
                            // this.liveGrass(currentCell)
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
                if (typeof rightCell !== 'undefined') {
                    // Если соседняя ячейка справа явялется водой и у текущей ячейке существует солнце
                    if (this.checkNeighbour(rightCell) && currentCell['sun'] > 0) {
                        currentCell['grass'] += 1 ? currentCell['grass'] != 5 && currentCell['grass'] == 0 : currentCell['grass'];
                        return 1;
                    }

                    else {
                        this.liveGrass(currentCell);
                        return 1;
                    }
                }

                // Если ячейка слева существует
                if (typeof leftCell !== 'undefined') {
                    // Если соседняя ячейка слева явялется водой и у текущей ячейке существует солнце
                    if (this.checkNeighbour(leftCell) && currentCell['sun'] > 5) {
                        currentCell['grass'] += 1 ? currentCell['grass'] != 5 && currentCell['grass'] == 0 : currentCell['grass'];
                        return 1;
                    }

                    else {
                        this.liveGrass(currentCell);
                        return 1;
                    }
                }

                // Если ячейка сверху существует
                if (typeof topCell !== 'undefined') {
                    // Если соседняя ячейка сверху явялется водой и у текущей ячейке существует солнце
                    if (this.checkNeighbour(topCell) && currentCell['sun'] > 5) {
                        currentCell['grass'] += 1 ? currentCell['grass'] != 5 && currentCell['grass'] == 0 : currentCell['grass'];
                        return 1;
                    }

                    else {
                        this.liveGrass(currentCell);
                        return 1;
                    }
                }

                // Если ячейка снизу существует
                if (typeof topCell !== 'undefined') {
                    // Если соседняя ячейка снизу явялется водой и у текущей ячейке существует солнце
                    if (this.checkNeighbour(topCell) && currentCell['sun'] > 5) {
                        currentCell['grass'] += 1 ? currentCell['grass'] != 5 && currentCell['grass'] == 0 : currentCell['grass'];
                        return 1;
                    }

                    else {
                        this.liveGrass(currentCell);
                        return 1;
                    }
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
                    currentCell['grass'] += 1 ? currentCell['grass'] != 5 : currentCell['grass'];
                }

                // 2 (Средний дождь) 1 (Слабое солнце)
                else if (currentCell['rain'] === 2 && currentCell['sun'] === 1) {
                    currentCell['grass'] += 1 ? currentCell['grass'] != 5 : currentCell['grass'];
                }

                // 1 (Слабый дождик) 2 (Сильное солнце) Растет трава
                else if (currentCell['rain'] === 1 && currentCell['sun'] === 2) {
                    currentCell['grass'] += 1 ? currentCell['grass'] != 5 : currentCell['grass'];
                }

                // 2 (Средний дождь) 2 (Сильное солнце) Растет трава
                else if (currentCell['rain'] === 2 && currentCell['sun'] === 2) {
                    currentCell['grass'] += 1 ? currentCell['grass'] != 5 : currentCell['grass'];
                }

                // 3 (Ливень) 2 (Сильное солнце) Растет трава
                else if (currentCell['rain'] === 3 && currentCell['sun'] === 2) {
                    currentCell['grass'] += 1 ? currentCell['grass'] != 5 : currentCell['grass'];
                }

                // 0 (Нет дождя) 3 (Жгучее солнце) Высыхает трава
                else if (currentCell['rain'] === 0 && currentCell['sun'] === 3) {
                    currentCell['grass'] -= 1 ? currentCell['grass'] != 0 : currentCell['grass'];
                }

                // 2 (Средний дождь) 3 (Жгучее солнце) Растет трава
                else if (currentCell['rain'] === 2 && currentCell['sun'] === 3) {
                    currentCell['grass'] += 1 ? currentCell['grass'] != 5 : currentCell['grass'];
                }

                // 3 (Ливень) 3 (Жгучее солнце) Растет трава
                else if (currentCell['rain'] === 3 && currentCell['sun'] === 3) {
                    currentCell['grass'] += 1 ? currentCell['grass'] != 5 : currentCell['grass'];
                }
            },
            
            generationWWeather(currentCell) {
                currentCell['sun'] = this.getRandomInt(0, 3);
                currentCell['rain'] = this.getRandomInt(0, 3);

            },

            getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

        }
    }
</script>

<style>
    .row {
        background-color: #f32563;
        width: 100%;
        height: 100%;
        display: inline-grid;
        grid-column: 1/span 1;
        /* grid-gap: 5px; */
    }

    .cell {
        background-color: #81c1f5;
        width: 220px;
        height: 200px;
        border: 1px solid #000;
        grid-row: 1/span 1;
        padding: 0;
        background-image: url();
        /* grid-gap: 5px; */
    }
    .img-sun, .img-rain {   
        width: 30%;
        position: ;
        right: 0;
    }
    .img-rain {
        position: relative;
        right: -20%;
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
