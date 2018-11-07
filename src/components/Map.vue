<template>
    <div class="container">
        <div class="columns is-centered is-1 is-variable">
            <div class="column is-narrow">
                <button class="button is-primary" @click="addRabbits()">Добавить кроликов</button>
            </div>
            <div class="column is-narrow">
                <button class="button is-primary" @click="addHunters()">Добавить охотников</button>
            </div>
        </div>

        <div class="columns is-centered is-1 is-variable">
            <div class="column is-narrow">
                <button class="button is-info" @click="previousTick()">
                    <span class="icon is-medium">
                        <i class="fa fa-angle-left"></i>
                    </span>
                </button>
            </div>
            <div class="column is-narrow">
                <!-- Старт -->
                <button class="button is-success" @click="autoLife()">
                    <span class="icon is-medium">
                        <i class="fa fa-play"></i>
                    </span>
                </button>
            </div>
            <div class="column is-narrow">
                <!-- Стоп  -->
                <button class="button is-danger" @click="stopLife()">
                    <span class="icon is-medium">
                        <i class="fa fa-stop"></i>
                    </span>
                </button>
            </div>

            <div class="column is-narrow">
                <button class="button is-info" @click="nextTick()">
                    <span class="icon is-medium">
                        <i class="fa fa-angle-right"></i>
                    </span>
                </button>
            </div>
        </div>
        <p>ВСЕГО ТАКТОВ: {{tacts.length}}</p>
        <p v-if="tacts.length > 0">Текущий такт: {{ tact + 1 }}</p>
        <div v-for="(row, indexRow) in tacts[tact]" :key="indexRow" class="row " :style="{padding: (tacts[tact].length > 5) ? '0px 100px 0px 0px' : '0'}">
            <div v-for="(cell, indexCell) in row" :key="indexCell" class="cell item-wrapper__item" :class="cell.type" @contextmenu.prevent.stop="handleClick($event, [indexRow, indexCell])">
                <img :src="'./src/assets/rain' + cell.rain + '.png'" alt="" srcset="" class="img-rain" v-if="cell.rain > 0">
                <img :src="'./src/assets/sun' + cell.sun + '.png'" alt="" srcset="" class="img-sun" v-if="cell.sun > 0">
                <img :src="'./src/assets/grass' + cell.grass + '.png'" alt="" srcset="" class="img-grass" v-if="cell.grass > 0">
                <img :src="'./src/assets/rabbit' + cell.rabbits + '.png'" alt="" srcset="" class="img-rabbits" v-if="cell.rabbits > 0">
                <img :src="'./src/assets/hunter' + cell.hunters + '.png'" alt="" srcset="" class="img-hunters" v-if="cell.hunters > 0">
                <br>
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
                life: 0,
                rabbitsLive: false,
                huntersLive: false,
                options: [
                    {
                        name: 'Увеличить сочность',
                        slug: 'increaseJuiciness'
                    },

                    {
                        name: 'Уменьшить сочность',
                        slug: 'reduceJuiciness'
                    },

                    // {
                    //     name: 'Увеличить кол-во кроликов',
                    //     slug: 'increaseRabbits'
                    // },

                    // {
                    //     name: 'Уменьшить кол-во кроликов',
                    //     slug: 'reduceRabbits'
                    // },

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
            handleClick (event, item) {  
                if(this.tact === this.tacts.length - 1) { 
                    this.$refs.vueSimpleContextMenu.showMenu(event, item);
                    document.getElementById('myUniqueId').style.top = `${event.screenY}px`
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
                this.tact = (this.tact > 0) ? this.tact - 1 : 0;
                this.array = JSON.parse(JSON.stringify(this.tacts[this.tact]));
            },

            nextTick() {
                // TODO: Перенести в функцию
                
                if (this.tact === this.tacts.length - 1) {
                    this.array = JSON.parse(JSON.stringify(this.tacts[this.tact]));
                    this.calcCells();
                }
                else {
                    this.array = JSON.parse(JSON.stringify(this.tacts[this.tact + 1]));
                }
                this.tact++;
                // console.log(this.tacts[this.tact]);
                
            },

            calcCells() {
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array[i].length; j++) {

                        let currentCell = this.array[i][j];
                        let rightCell = this.array[i][j + 1];
                        let leftCell = this.array[i][j - 1];
                        let topCell = typeof this.array[i - 1] !== 'undefined' ? this.array[i - 1][j] : undefined;
                        let bottomCell =  typeof this.array[i + 1] !== 'undefined' ? this.array[i + 1][j] : undefined;

                        // Если данная ячейка является полем
                        if (currentCell['type'] === 'Field') {
                            this.processingGrass(currentCell, rightCell, leftCell, topCell, bottomCell);
                            this.proccessingRabbits(currentCell, rightCell, leftCell, topCell, bottomCell)
                            this.proccessingHunters(currentCell, rightCell, leftCell, topCell, bottomCell)
                        }
                        this.generationWeather(currentCell);
                    
                    }
                }
                this.tacts.push(this.array)
            },

            addRabbits() {
                this.array = this.tacts[this.tact];
                this.rabbitsLive = true;
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array[i].length; j++) {
                        let currentCell = this.array[i][j];
                        // Если данная ячейка является полем
                        if (currentCell['type'] === 'Field') {
                            currentCell['rabbits'] = this.getRandomInt(0, 3);
                        }
                    }
                }
            },

            addHunters() {
                this.array = this.tacts[this.tact];
                this.huntersLive = true;
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array[i].length; j++) {
                        let currentCell = this.array[i][j];
                        // Если данная ячейка является полем
                        if (currentCell['type'] === 'Field') {
                            currentCell['hunters'] = this.getRandomInt(0, 3);
                        }
                    }
                }
            },

            proccessingRabbits(cell, rightCell, leftCell, topCell, bottomCell) {
                if (this.rabbitsLive && cell.rabbits > 0) {
                    if(cell.rabbits == 2) {
                        cell.rabbits++;
                    }

                    if (cell.rabbits > cell.grass) {
                        let hungryRabbits = (cell.rabbits - cell.grass > 0) ? cell.rabbits - cell.grass : 0;
                        console.log('Зашел!', cell, hungryRabbits);
                        while(hungryRabbits != 0)
                        {
                            console.log('ммммм');
                            if (this.checkNeighbour(leftCell, 'Field') && leftCell.rabbits != 3 && leftCell.rabbits + 1 <= leftCell.grass) {
                                console.log('Левая,', cell, leftCell);
                                console.log(leftCell.rabbits + 1 <= leftCell.grass);
                                leftCell.rabbits += 1;
                                leftCell.grass -= 1;
                                hungryRabbits -= 1;
                                cell.rabbits -= 1;
                            }

                            else if (this.checkNeighbour(rightCell, 'Field') && rightCell.rabbits != 3 && rightCell.rabbits + 1 <= rightCell.grass) {
                                console.log('Правая,', cell, rightCell);
                                console.log(rightCell.rabbits + 1 <= rightCell.grass);
                                rightCell.rabbits += 1;
                                hungryRabbits -= 1;
                                cell.rabbits -= 1;
                            }

                            else if (this.checkNeighbour(topCell, 'Field') && topCell.rabbits != 3 && topCell.rabbits + 1 <= topCell.grass) {
                                console.log('Верхняя', cell, topCell);
                                console.log(topCell.rabbits + 1 <= topCell.grass, );
                                topCell.rabbits += 1;
                                topCell.grass -= 1;
                                hungryRabbits -= 1;
                                cell.rabbits -= 1;
                            }

                            else if (this.checkNeighbour(bottomCell, 'Field') && bottomCell.rabbits != 3 && bottomCell.rabbits + 1 <= bottomCell.grass) {
                                console.log('Нижняя', cell, bottomCell);
                                console.log(bottomCell.rabbits + 1 <= bottomCell.grass);
                                bottomCell.rabbits += 1;
                                hungryRabbits -= 1;
                                cell.rabbits -= 1;
                            }
                            else {
                                hungryRabbits -= 1;
                                cell.rabbits -= 1;
                            }
                        }
                    }
                    cell['grass'] -= cell['rabbits']
                }
            },

            proccessingHunters(cell, rightCell, leftCell, topCell, bottomCell) {
                if (this.huntersLive && cell.hunters > 0) {
                    if (cell.hunters > cell.rabbits) {
                        let freeHunters = (cell.hunters - cell.rabbits > 0) ? cell.hunters - cell.rabbits : 0;
                        while(freeHunters != 0)
                        {
                            if (this.checkNeighbour(leftCell, 'Field') && leftCell.hunters != 3 && leftCell.hunters + 1 <= leftCell.rabbits) {
                                // console.log('Левая,', cell, leftCell);
                                // console.log(leftCell.rabbits + 1 <= leftCell.grass);
                                leftCell.hunters += 1;
                                cell.hunters -= 1;
                                leftCell.rabbits -= 1;
                                freeHunters -= 1;
                            }

                            else if (this.checkNeighbour(rightCell, 'Field') && rightCell.hunters != 3 && rightCell.hunters + 1 <= rightCell.rabbits) {
                                // console.log('Правая,', cell, rightCell);
                                // console.log(rightCell.rabbits + 1 <= rightCell.grass);
                                rightCell.hunters += 1;
                                cell.hunters -= 1;
                                freeHunters -= 1;
                            }

                            else if (this.checkNeighbour(topCell, 'Field') && topCell.hunters != 3 && topCell.hunters + 1 <= topCell.rabbits) {
                                // console.log('Верхняя', cell, topCell);
                                // console.log(topCell.rabbits + 1 <= topCell.grass, );
                                topCell.hunters += 1;
                                cell.hunters -= 1;
                                topCell.rabbits -= 1;
                                freeHunters -= 1;
                                
                            }

                            else if (this.checkNeighbour(bottomCell, 'Field') && bottomCell.hunters != 3 && bottomCell.hunters + 1 <= bottomCell.rabbits) {
                                // console.log('Нижняя', cell, bottomCell);
                                // console.log(bottomCell.rabbits + 1 <= bottomCell.grass);
                                bottomCell.hunters += 1;
                                cell.hunters -= 1;
                                freeHunters -= 1;
                            }
                            else {
                                freeHunters -= 1;
                            }
                        }
                    }
                    cell.rabbits = (cell.hunters > cell.rabbits) ? 0 : cell.rabbits - cell.hunters;
                }
            },

            // В зависимости от соседней ячейке появляется трава или нет
            processingGrass(currentCell, rightCell, leftCell, topCell, bottomCell) {
                // Если ячейка справа существует и соседняя ячейка справа явялется водой
                if (this.checkNeighbour(rightCell, 'Water')) {
                    // Если у текущей ячейке существует солнце
                    if (currentCell['sun'] > 0) {
                        this.increaseJuiciness(currentCell);
                    }
                    else {
                        this.liveGrass(currentCell);
                    }
                }

                // Если ячейка слева существует и соседняя ячейка слева явялется водой
                else if (this.checkNeighbour(leftCell, 'Water')) {
                    // Если у текущей ячейке существует солнце
                    if (currentCell['sun'] > 0) {
                         this.increaseJuiciness(currentCell);
                    }
                    else {
                        this.liveGrass(currentCell);
                    }
                }

                // Если ячейка сверху существует и соседняя ячейка сверху явялется водой
                else if (this.checkNeighbour(topCell, 'Water')) {
                    // Если у текущей ячейке существует солнце
                    if ( currentCell['sun'] > 0) {
                         this.increaseJuiciness(currentCell);
                    }
                    else {
                        this.liveGrass(currentCell);
                    }
                }

                // Если ячейка снизу существует и соседняя ячейка снизу явялется водой
                else if (this.checkNeighbour(bottomCell, 'Water')) {
                    // Если у текущей ячейке существует солнце
                    if ( currentCell['sun'] > 0) {
                         this.increaseJuiciness(currentCell);
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

            autoLife() {
                this.life = setInterval(this.nextTick, 1000);
            },

            stopLife() {
                clearInterval(this.life);
            },

            checkNeighbour(cell, type) {
                if (typeof cell !== 'undefined' && cell.type === type) {
                    return true
                }
                else {
                    return false
                }
            },
            
            generationWeather(currentCell) {
                currentCell['sun'] = this.getRandomInt(0, 3);
                currentCell['rain'] = this.getRandomInt(0, 3);
            },

            getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            increaseJuiciness(cell) {
                cell.grass = (cell.grass != 5) ? cell.grass + 1 : cell['grass'];
            },

            reduceJuiciness(cell) {
                cell.grass = (cell.grass != 0) ? cell.grass - 1 : cell['grass'];
            },

            increaseRain(cell) {
                cell.rain = (cell.rain != 3) ? cell.rain + 1 : cell.rain
            },

            reduceRain(cell) {
                cell.rain = (cell.rain != 0) ? cell.rain - 1 : cell.rain
            },

            increaseSun(cell) {
                cell.sun = (cell.sun != 3) ? cell.sun + 1 : cell.sun
            }, 

            reduceSun(cell) {
                cell.sun = (cell.sun != 0) ? cell.sun - 1 : cell.sun
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


    .img-grass, .img-rabbits, .img-hunters {
        position: absolute;
        bottom: 0;
        left: 10px;
        z-index: 3;
    }

    .img-rabbits {
        z-index: 2;
    }

    .img-hunters {
        z-index: 1;
        bottom: 30px;
        left: 45px;
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
