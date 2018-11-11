<template>
    <div>
        <div class="columns is-centered left-menu">
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
                <h2 class='is-size-4'> {{ tact + 1 }}/{{tacts.length}}</h2>
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
        
        <div class="container">
            <div class="columns is-centered is-1 is-variable settings">
                <div class="column is-narrow">
                    <button class="button is-primary" @click="addRabbits()">Добавить кроликов</button>
                </div>
                <div class="column is-narrow">
                    <button class="button is-primary" @click="addHunters()">Добавить охотников</button>
                </div>
                <div class="column is-narrow">
                    <button class="button is-primary" @click="addWolves()">Добавить волков</button>
                </div>
            </div>
            <div v-for="(row, indexRow) in tacts[tact]" :key="indexRow" class="row">
                <div v-for="(cell, indexCell) in row" :key="indexCell" class="cell item-wrapper__item" :class="cell.type" @contextmenu.prevent.stop="handleClick($event, [indexRow, indexCell])">
                    <img :src="'./src/assets/rain' + cell.rain + '.png'" alt="" srcset="" class="img-rain" v-if="cell.rain > 0">
                    <img :src="'./src/assets/sun' + cell.sun + '.png'" alt="" srcset="" class="img-sun" v-if="cell.sun > 0">
                    <img :src="'./src/assets/grass' + cell.grass + '.png'" alt="" srcset="" class="img-grass" v-if="cell.grass > 0">
                    <img :src="'./src/assets/rabbit' + cell.rabbits + '.png'" alt="" srcset="" class="img-rabbits" v-if="cell.rabbits > 0">
                    <img :src="'./src/assets/hunter' + cell.hunters + '.png'" alt="" srcset="" class="img-hunters" v-if="cell.hunters > 0">
                    <img :src="'./src/assets/wolf' + cell.wolves + '.png'" alt="" srcset="" class="img-wolves" v-if="cell.wolves > 0">
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
                wolvesLive: false,
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
                        name: 'Добавить дождя',
                        slug: 'increaseRain'
                    },

                    {
                        name: 'Уменьшить дождь',
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

                    {
                        name: 'Добавить кролика',
                        slug: 'increaseRabbits',
                    },

                    {
                        name: 'Убрать кролика',
                        slug: 'reduceRabbits',
                    },
                    
                    {
                        name: 'Добавить охотника',
                        slug: 'increaseHunters',
                    },

                    {
                        name: 'Убрать охотника',
                        slug: 'reduceHunters',
                    },

                    {
                        name: 'Добавить волка',
                        slug: 'increaseWolves',
                    },

                    {
                        name: 'Убрать волка',
                        slug: 'reduceWolves',
                    }
                ]
            }
        },
        props: ['tacts'],
        methods: {
            handleClick (event, item) {
                console.log(event);
                
                if(this.tact === this.tacts.length - 1) { 
                    this.$refs.vueSimpleContextMenu.showMenu(event, item);
                    let offsetY = document.getElementById('myUniqueId').style.top;
                    let offsetX = document.getElementById('myUniqueId').style.left;
                    document.getElementById('myUniqueId').style.top = `${event.pageY - 50}px`;
                    document.getElementById('myUniqueId').style.left = `${event.pageX - 150}px`;

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

                    else if (method === 'increaseRabbits') {
                        this.rabbitsLive = this.rabbitsLive ? this.rabbitsLive : true
                        this.increaseRabbits(cell);
                    }

                    else if (method === 'reduceRabbits') {
                        this.rabbitsLive = this.rabbitsLive ? this.rabbitsLive : true
                        this.reduceRabbits(cell);
                    }

                    else if(method === 'increaseHunters') {
                        this.huntersLive = this.huntersLive ? this.huntersLive : true
                        this.increaseHunters(cell);
                    }

                    else if(method === 'reduceHunters') {
                        this.huntersLive = this.huntersLive ? this.huntersLive : true
                        this.reduceHunters(cell);
                    }

                    else if(method === 'increaseWolves') {
                        this.wolvesLive = this.wolvesLive ? this.wolvesLive : true
                        this.increaseWolves(cell);
                    }

                    else if(method === 'reduceWolves') {
                        this.wolvesLive = this.wolvesLive ? this.wolvesLive : true
                        this.reduceWolves(cell);
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
                    this.processClampUnitsOnInvalidCell();
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
                            this.proccessingRabbits(currentCell, rightCell, leftCell, topCell, bottomCell);
                            this.proccessingHunters(currentCell, rightCell, leftCell, topCell, bottomCell);
                            this.processingWolves(currentCell, rightCell, leftCell, topCell, bottomCell);
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

            addWolves() {
                this.array = this.tacts[this.tact];
                this.wolvesLive = true;
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array[i].length; j++) {
                        let currentCell = this.array[i][j];
                        // Если данная ячейка является полем
                        if (currentCell['type'] === 'Field') {
                            currentCell['wolves'] = this.getRandomInt(0, 3);
                        }
                    }
                }
            },

            proccessingRabbits(cell, rightCell, leftCell, topCell, bottomCell) {
                if (this.rabbitsLive && cell.rabbits > 0) {
                    if(cell.rabbits == 2) {
                        cell.rabbits += 1;
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
                                hungryRabbits--;
                                cell.rabbits -= 1;
                            }

                            else if (this.checkNeighbour(rightCell, 'Field') && rightCell.rabbits != 3 && rightCell.rabbits + 1 <= rightCell.grass) {
                                console.log('Правая,', cell, rightCell);
                                console.log(rightCell.rabbits + 1 <= rightCell.grass);
                                rightCell.rabbits += 1;
                                hungryRabbits--;
                                cell.rabbits -= 1;
                            }

                            else if (this.checkNeighbour(topCell, 'Field') && topCell.rabbits != 3 && topCell.rabbits + 1 <= topCell.grass) {
                                console.log('Верхняя', cell, topCell);
                                console.log(topCell.rabbits + 1 <= topCell.grass, );
                                topCell.rabbits += 1;
                                topCell.grass -= 1;
                                hungryRabbits--;
                                cell.rabbits -= 1;
                            }

                            else if (this.checkNeighbour(bottomCell, 'Field') && bottomCell.rabbits != 3 && bottomCell.rabbits + 1 <= bottomCell.grass) {
                                console.log('Нижняя', cell, bottomCell);
                                console.log(bottomCell.rabbits + 1 <= bottomCell.grass);
                                bottomCell.rabbits += 1;
                                hungryRabbits--;
                                cell.rabbits -= 1;
                            }
                            else {
                                hungryRabbits--;
                                cell.rabbits -= 1;
                            }
                        }
                    }
                    cell['grass'] -= cell['rabbits']
                }
            },

            proccessingHunters(cell, rightCell, leftCell, topCell, bottomCell) {
                if (this.huntersLive && cell.hunters > 0) {
                    if (cell.wolves == 0) {
                        if (cell.hunters > cell.rabbits) {
                            let freeHunters = (cell.hunters - cell.rabbits > 0) ? cell.hunters - cell.rabbits : 0;
                            while(freeHunters != 0)
                            {
                                if (this.checkNeighbour(leftCell, 'Field') && leftCell.hunters != 3 && leftCell.hunters + 1 <= leftCell.rabbits) {
                                    // console.log('Левая,', cell, leftCell);
                                    // console.log(leftCell.rabbits + 1 <= leftCell.grass);
                                    leftCell.hunters += 1;
                                    leftCell.rabbits -= 1;
                                    freeHunters--;
                                    cell.hunters -= 1;
                                }
    
                                else if (this.checkNeighbour(rightCell, 'Field') && rightCell.hunters != 3 && rightCell.hunters + 1 <= rightCell.rabbits) {
                                    // console.log('Правая,', cell, rightCell);
                                    // console.log(rightCell.rabbits + 1 <= rightCell.grass);
                                    rightCell.hunters += 1;
                                    freeHunters--;
                                    cell.hunters -= 1;
                                }
    
                                else if (this.checkNeighbour(topCell, 'Field') && topCell.hunters != 3 && topCell.hunters + 1 <= topCell.rabbits) {
                                    // console.log('Верхняя', cell, topCell);
                                    // console.log(topCell.rabbits + 1 <= topCell.grass, );
                                    topCell.hunters += 1;
                                    topCell.rabbits -= 1;
                                    freeHunters--;
                                    cell.hunters -= 1;
                                }
    
                                else if (this.checkNeighbour(bottomCell, 'Field') && bottomCell.hunters != 3 && bottomCell.hunters + 1 <= bottomCell.rabbits) {
                                    // console.log('Нижняя', cell, bottomCell);
                                    // console.log(bottomCell.rabbits + 1 <= bottomCell.grass);
                                    bottomCell.hunters += 1;
                                    freeHunters--;
                                    cell.hunters -= 1;
                                }
                                else {
                                    freeHunters--;
                                }
                            }
                        }
                        cell['rabbits'] = (cell.hunters > cell.rabbits) ? 0 : cell.rabbits - cell.hunters;
                    }
                }
            },

            processingWolves(cell, rightCell, leftCell, topCell, bottomCell) {
                if (this.wolvesLive && cell.wolves > 0) {
                    if (this.huntersLive) {
                        // Если охотники заспаунены, сначала все терки с ними
                        if (cell.wolves == cell.hunters) {
                            // Разбегаются по клеткам, если это возможно в принципе (бывает, что некоторых придется оставить на месте)
                            this.moveHuntersToCell(cell, rightCell, leftCell, topCell, bottomCell);
                            this.moveWolvesToCell(cell, rightCell, leftCell, topCell, bottomCell);
                            if (cell.wolves == cell.hunters) {
                                // Если после разброса по клеткам друг от друга, в клетке снова остаются
                                // клиенты, причем в равном количестве, я их уничтожаю,
                                // ибо девать их просто некуда.
                                // Условия такого в задаче нет, это личные соображения.
                                cell.wolves = 0;
                                cell.hunters = 0;
                            }
                        }

                        // --------------------------------------------------------------------------- //
                        // В зависимости от того, кого больше, убиваем / перемещаем
                        else if (cell.wolves > cell.hunters) {
                            cell.hunters--;
                            if (cell.hunters > 0) {
                                this.moveHuntersToCell(cell, rightCell, leftCell, topCell, bottomCell);
                            }
                        }

                        else if (cell.wolves < cell.hunters) {
                            cell.wolves--;
                            if (cell.wolves > 0) {
                                this.moveWolvesToCell(cell, rightCell, leftCell, topCell, bottomCell);
                            }
                        }
                        // --------------------------------------------------------------------------- /
                    }

                    if (this.rabbitsLive) {
                        // Если в текущей клетке встретились кролики, волки их жрут за тик от 1 до 3 (по условию).
                        // С остающимися кроликами не придумал, что сделать. Либо рассовывать их так же, как
                        // волков и охотников вообще по любым ячейкам, либо оставлять на месте?
                        cell.rabbits -= this.getRandomInt(1, cell.rabbits < 3 ? cell.rabbits : 2);
                        if (cell.rabbits > 0) {
                            this.moveRabbitsToCell(cell, rightCell, leftCell, topCell, bottomCell);
                        }
                    }
                }
            },

            moveHuntersToCell(cell, rightCell, leftCell, topCell, bottomCell) {
                let huntersLeft = cell.hunters;
                while (huntersLeft != 0) {
                    if (typeof leftCell !== 'undefined' && leftCell.hunters != 3 && leftCell.wolves == 0) {
                        leftCell.hunters++;
                        huntersLeft--;
                        cell.hunters--;
                    }
                    else if (typeof rightCell !== 'undefined' && rightCell.hunters != 3 && rightCell.wolves == 0) {
                        rightCell.hunters++;
                        huntersLeft--;
                        cell.hunters--;
                    }
                    else if (typeof topCell !== 'undefined' && topCell.hunters != 3 && topCell.wolves == 0) {
                        topCell.hunters++;
                        huntersLeft--;
                        cell.hunters--;
                    }
                    else if (typeof bottomCell !== 'undefined' && bottomCell.hunters != 3 && bottomCell.wolves == 0) {
                        bottomCell.hunters++;
                        huntersLeft--;
                        cell.hunters--;
                    } else {
                        huntersLeft--;
                    }
                }
            },

            moveWolvesToCell(cell, rightCell, leftCell, topCell, bottomCell) {
                let wolvesLeft = cell.wolves;
                while (wolvesLeft != 0) {
                    if (typeof leftCell !== 'undefined' && leftCell.wolves != 3 && leftCell.hunters == 0) {
                        leftCell.wolves++;
                        wolvesLeft--;
                        cell.wolves--;
                    }
                    else if (typeof rightCell !== 'undefined' && rightCell.wolves != 3 && rightCell.hunters == 0) {
                        rightCell.wolves++;
                        wolvesLeft--;
                        cell.wolves--;
                    }
                    else if (typeof topCell !== 'undefined' && topCell.wolves != 3 && topCell.hunters == 0) {
                        topCell.wolves++;
                        wolvesLeft--;
                        cell.wolves--;
                    }
                    else if (typeof bottomCell !== 'undefined' && bottomCell.wolves != 3 && bottomCell.hunters == 0) {
                        bottomCell.wolves++;
                        wolvesLeft--;
                        cell.wolves--;
                    } else {
                        wolvesLeft--;
                    }
                }
            },

            moveRabbitsToCell(cell, rightCell, leftCell, topCell, bottomCell) {
                let rabbitsLeft = cell.rabbits;
                while (rabbitsLeft != 0) {
                    if (typeof leftCell !== 'undefined' && leftCell.wolves == 0 && leftCell.hunters == 0) {
                        leftCell.rabbits++;
                        rabbitsLeft--;
                        cell.rabbits--;
                    }
                    else if (typeof rightCell !== 'undefined' && rightCell.wolves == 0 && rightCell.hunters == 0) {
                        rightCell.rabbits++;
                        rabbitsLeft--;
                        cell.rabbits--;
                    }
                    else if (typeof topCell !== 'undefined' && topCell.wolves == 0 && topCell.hunters == 0) {
                        topCell.rabbits++;
                        rabbitsLeft--;
                        cell.rabbits--;
                    }
                    else if (typeof bottomCell !== 'undefined' && bottomCell.wolves == 0 && bottomCell.hunters == 0) {
                        bottomCell.rabbits++;
                        rabbitsLeft--;
                        cell.rabbits--;
                    } else {
                        rabbitsLeft--;
                    }
                }
            },

            processClampUnitsOnInvalidCell() {
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array[i].length; j++) {
                        let cell = this.array[i][j];
                        if (typeof cell !== 'undefined' && cell.type !== 'Field') {
                            if (cell.hunters > 0) {
                                cell.hunters = 0;
                            }
                            if (cell.wolves > 0) {
                                cell.wolves = 0;
                            }
                            if (cell.rabbits > 0) {
                                cell.rabbits = 0;
                            }
                        }
                    }
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
                
                // Правило если солцне дождь
                // if (currentCell['sun'] === 3) {
                //     currentCell['rain'] = 0
                // }

                // if (currentCell['rain'] === 3) {
                //     currentCell['sun'] = 0
                // }

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
            },

            increaseRabbits(cell) {
                cell.rabbits = (cell.rabbits != 3) ? cell.rabbits + 1 : cell.rabbits
            },

            reduceRabbits(cell) {
                cell.rabbits = (cell.rabbits != 0) ? cell.rabbits - 1 : cell.rabbits
            },

            increaseHunters(cell) {
                cell.hunters = (cell.hunters != 3) ? cell.hunters + 1 : cell.hunters
            },

            reduceHunters(cell) {
                cell.hunters = (cell.hunters != 0) ? cell.hunters - 1 : cell.hunters
            },

            increaseWolves(cell) {
                cell.wolves = (cell.wolves != 3) ? cell.wolves + 1 : cell.wolves
            },
            
            reduceWolves(cell) {
                cell.wolves = (cell.wolves != 0) ? cell.wolves - 1 : cell.wolves
            },

        }
    }
</script>

<style>
    .container {
        display:flex;
        flex-direction: column;
    }

    .settings {
        padding-top: 15px;
    }

    .left-menu {
        display: flex; 
        flex-direction: column; 
        position: fixed; 
        z-index: 2; 
        height: 100vh; 
        background-color: #f1f1f1;
        margin: 0;
    }
    
    .row {
        height: 100%;
        display: flex;
        margin: 0 auto;
    }

    .cell {
        min-width: 218px;
        height: 200px;
        padding: 0;
        position: relative;
        /* border: 1px solid red; */
    }

    .img-sun, .img-rain {   
        width: 30%;
        right: 0;
    }

    .img-rain {
        position: relative;
        right: -20%;
    }

    .img-grass, .img-rabbits, .img-hunters, .img-wolves {
        position: absolute;
        bottom: 0;
        left: 10px;
        z-index: 4;
    }

    .img-rabbits {
        z-index: 3;
    }

    .img-hunters {
        z-index: 2;
        bottom: 30px;
        left: 45px;
    }

    .img-wolves {
        width: 65%;
        z-index: 1;
        top: 55px;
        left: 40px;
        opacity: 0.8;
    }

    .Water {
        background-color: #1fc8db;
    }

    .Hill, .Water, .Field {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        /* background-size: 100.75%; */
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
