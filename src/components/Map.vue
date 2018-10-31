<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <button class="button is-primary" @click="Tick()">Следующий Такт</button>
            </div>
        </div>
        <div v-for="(row, indexRow) in array" :key="indexRow" class="row">
            <div v-for="(cell, indexCell) in array[indexRow]" :key="indexCell" class="cell">
               Дождь = {{ array[indexRow][indexCell]['rain'] }}
               Солнце = {{ array[indexRow][indexCell]['sun'] }}
               Тип = {{ array[indexRow][indexCell]['type'] }}
               Трава = {{ array[indexRow][indexCell]['grass'] }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tacts: []
            }
        },
        props: ['array'],
        methods: {
            Tick() {
                this.calcCells();
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

                            // Если ячейка справа существует
                            if (typeof rightCell !== 'undefined') {
                                // Если соседняя ячейка справа явялется водой и у текущей ячейке существует солнце
                                if (this.checkNeighbour(rightCell) && currentCell['sun'] > 0) {
                                    currentCell['grass'] += 1 ? currentCell['grass'] != 5 : currentCell['grass'];
                                }
                            }

                            // Если ячейка слева существует
                            if (typeof leftCell !== 'undefined') {
                                // Если соседняя ячейка слева явялется водой и у текущей ячейке существует солнце
                                if (this.checkNeighbour(leftCell) && currentCell['sun'] > 5) {
                                    currentCell['grass'] += 1 ? currentCell['grass'] != 5 : currentCell['grass'];
                                }
                            }

                            // Если ячейка сверху существует
                            if (typeof topCell !== 'undefined') {
                                // Если соседняя ячейка сверху явялется водой и у текущей ячейке существует солнце
                                if (this.checkNeighbour(topCell) && currentCell['sun'] > 5) {
                                    currentCell['grass'] += 1 ? currentCell['grass'] != 5 : currentCell['grass'];
                                }
                            }

                            // Если ячейка снизу существует
                            if (typeof topCell !== 'undefined') {
                                // Если соседняя ячейка снизу явялется водой и у текущей ячейке существует солнце
                                if (this.checkNeighbour(topCell) && currentCell['sun'] > 5) {
                                    currentCell['grass'] += 1 ? currentCell['grass'] != 5 : currentCell['grass'];
                                }
                            }

                        }
                        
                    }
                }

                this.tacts.push(this.array)
            },

            checkNeighbour(cell) {
                if (cell.type === 'Water') {
                    // console.log(cell)
                    return true
                }
                else {
                    return false
                }
            }

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
        grid-gap: 5px;
    }

    .cell {
        background-color: #f636ff;
        width: 100%;
        border: 1px solid #000;
        grid-row: 1/span 1;
        /* grid-gap: 5px; */
    }
    
</style>
