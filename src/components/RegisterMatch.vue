<template>
<div id="wrapper">
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Registrar partida</h3>

                    <div class="box list-item">
                        <b-field>
                            <transition name="fadeInDown" mode="out-in">
                                <p class="old-sports" :key="frameTable">{{ frameTable }}</p>
                            </transition>
                        </b-field>

                        <b-field>
                            <p class="control">
                                <button class="button is-dark" @click="confirmDialog(true)" :disabled="matchComplete">Strike</button>
                            </p>                            
                            <p class="control">
                                <b-input type="number" placeholder="5"  v-model="scoreOne" :disabled="matchComplete"></b-input>
                            </p>
                            <p class="control">
                                <b-input type="number" placeholder="5"  v-model="scoreTwo" :disabled="frameTable == 12 || tenSpare || matchComplete"></b-input>
                            </p>
                             <p class="control">
                                <button class="button is-dark" @click="confirmDialog()" :disabled="matchComplete">Ok</button>
                            </p>
                        </b-field>
                        <b-field>
                            <b-switch v-model="askConfirmation"
                            type="is-dark" @input="saveUserConfirmOption">
                                Solicitar confirmação ?
                            </b-switch>
                        </b-field>                        
                        <b-field>
                            <a class="button is-large is-dark is-fullwidth" @click="confirmResetGame">
                                <span class="icon">
                                    <i class="fas fa-times-circle"></i>
                                </span>
                                <span>Resetar partida</span>
                            </a>
                        </b-field>
                        <transition name="slideInLeft" mode="out-in">
                            <b-field v-show="matchComplete && tailedResults">
                                <b-table :data="firstData" :columns="firstColumns"></b-table>
                            </b-field>
                        </transition>
                        <transition name="slideInLeft" mode="out-in">
                            <b-field v-show="matchComplete && tailedResults">
                                <b-table :data="secondData" :columns="secondColumns"></b-table>
                            </b-field>
                        </transition>     
                        <transition name="slideInLeft" mode="out-in">
                            <b-field v-show="matchComplete && tailedResults">
                                <h1 class="title">
                                    <h1 class="title">   
                                        <a class="button is-success is-large is-inverted">{{ matchScore }}</a>
                                    </h1>
                                    
                                </h1>
                            </b-field>
                        </transition> 
                        <transition name="slideInLeft" mode="out-in">   
                            <b-field v-if="matchComplete && tailedResults">
                                <button class="button is-block is-dark is-large is-fullwidth" @click="registerMatch" :disabled="loading">
                                    <b-icon
                                        pack="fas"
                                        icon="sync-alt"
                                        custom-class="fa-spin" 
                                        v-show="loading">
                                    </b-icon>
                                    <span v-show="!loading">Salvar partida</span>
                                </button>
                            </b-field>
                        </transition>    
                    </div>
                </div>
            </div>
            
        </div>
    </section>
</div>  
</template>

<script>
    export default {
        name: 'RegisterMatch',
        data () {
            return {
                firstData: [],
                firstColumns: [
                    {
                        field: 'name',
                        label: 'Nome',
                        width: '40'
                    },
                    {
                        field: 'frame_1',
                        label: '1',
                    },
                    {
                        field: 'frame_2',
                        label: '2',
                    },
                    {
                        field: 'frame_3',
                        label: '3',
                    },
                    {
                        field: 'frame_4',
                        label: '4',
                    },
                    {
                        field: 'frame_5',
                        label: '5',
                    },
                ],
                secondData: [],
                secondColumns: [
                    {
                        field: 'name',
                        label: 'Nome',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'frame_6',
                        label: '6',
                    },
                    {
                        field: 'frame_7',
                        label: '7',
                    },
                    {
                        field: 'frame_8',
                        label: '8',
                    },
                    {
                        field: 'frame_9',
                        label: '9',
                    },
                    {
                        field: 'frame_10',
                        label: '10',
                    },
                ],
                loadingComponent: '',
                askConfirmation: 'initial',
                rolls: [],
                rollIndex: 0,
                currentRoll: 0,
                frameIndex: 0,
                frameTable: 1,
                scoreOne: '',
                scoreTwo: '',
                matchComplete: false,
                tailedResults : false,
                loading: false,
                matchScore: 0,
                tenSpare: false,
                credentials: '',
                actualScore: 0
            }
        },
        watch: {
            scoreOne: function(_val){
                if(_val && parseInt(_val) == 10){
                    this.scoreTwo = "0";
                }
            },
        },
        beforeMount(){
            this.credentials = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;
            if(this.credentials && this.credentials.preferences){
                this.askConfirmation = this.credentials.preferences.askConfirmation;
            }
        },
        methods: {
            showLoading(){
                this.loadingComponent = this.$loading.open();
            },
            stopLoading(){
                this.loadingComponent.close();
            },
            saveUserConfirmOption(_val){
                this.showLoading();
                this.$http.post(this.$remoteUrl + 'api/saveConfirmPreference', { user: this.credentials.user, askConfirmation: this.askConfirmation }).then(response => {
                    localStorage.setItem('userLogin', JSON.stringify(response.data.object));
                    this.stopLoading();
                },function (response) {
                    this.stopLoading();
                });
            },
            registerMatch(){
 
                if(this.credentials){

                    var match = {
                        user: this.credentials.user,
                        rolls: this.rolls,
                        total: this.matchScore,
                        date: new Date()
                    }

                    this.loading = true;
                    this.$http.post(this.$remoteUrl + 'api/registerMatch', match).then(response => {
                        var result = response.data;

                        if(result.saveOk){
                            this.success(result.message);
                            this.loading = false;
                            this.resetGame();
                        } else {
                            this.danger(result.message);
                            this.loading = false;
                        }
                    },function (response) {
                        console.log(response.data.message);
                        this.loading = false;
                    });
                }
                

            },
            resetGame(){
                this.rolls = [];
                this.currentRoll = 0;
                this.matchComplete = false;
                this.tailedResults = false;
                this.frameTable = 1;
                this.scoreOne = 0;
                this.scoreTwo = 0;
                this.matchScore = 0;
                this.firstData = [];
                this.secondData = [];
                this.tenSpare = false;
                this.rollIndex = 0;
            },
            roll(pins) {
                this.rolls[this.currentRoll++] = pins;
            },
            sumOfBallsInFrame(_frame) {
                return this.rolls[_frame] + this.rolls[_frame + 1];
            },
            spareBonus(_frame) {
                return this.rolls[_frame + 2];
            },
            strikeBonus(_frame) {
                return this.rolls[_frame + 1] + this.rolls[_frame + 2];
            },
            isStrike(_frame) {
                return this.rolls[_frame] === 10;
            },
            isSpare(_frame) {
                return this.rolls[_frame] + this.rolls[_frame + 1] === 10;
            },
            score() {
                var score = 0;
                var frameIndex = 0;
 
                for (var frame = 0; frame < 10; frame++) {
                    if (this.isStrike(frameIndex)) {
                        score += 10 + this.strikeBonus(frameIndex);
                        frameIndex++;
                    } else if (this.isSpare(frameIndex)) {
                        score += 10 + this.spareBonus(frameIndex);
                        frameIndex += 2;
                    } else {
                        score += this.sumOfBallsInFrame(frameIndex);
                        frameIndex += 2;
                    }
                }

                return score;
            },
            confirmDialog(_isStrike) {

                if(this.frameTable != 12){
                    //usuario deve preencher os 2 campos com numeros que nao excedam 10.
                    if(this.scoreOne && this.scoreTwo && ( parseInt(this.scoreOne) + parseInt(this.scoreTwo) > 10 )){
                        this.danger('A soma dos campos não pode ser maior a 10.');
                        return false;
                    }

                    //usuario nao pode deixar o segundo campos vazios a não ser que seja o frame 11 ou 12, quando há spare ou strike no frame 10.
                    if( (!this.scoreOne || !this.scoreTwo) && !_isStrike && !this.tenSpare){
                        this.verifyFieldsMessage();
                        return false;
                    }

                    if(this.tenSpare && !this.scoreOne){
                        this.verifyFieldsMessage();
                        return false;
                    }
                } else {
                    if(!this.scoreOne && !_isStrike){
                        this.verifyFieldsMessage();
                        return false;
                    }
                }
                    

                //caso o usuario digite 10 e 0
                if(parseInt(this.scoreOne) == 10 && parseInt(this.scoreTwo) == 0){
                    this.doConfirm(true);
                } else {
                    this.doConfirm(_isStrike);
                } 
            },
            doConfirm(_isStrike){
                var vm = this;

                if(this.askConfirmation){
                   this.$dialog.confirm({
                        message: _isStrike ? 'Confirmar frame <b>' + this.frameTable + '</b> com <b>STRIKE</b> ?' : 'Confirmar frame <b>' + this.frameTable + '</b>  ?',
                        confirmText: 'Sim',
                        cancelText: 'Cancelar',
                        type: 'is-dark',
                        onConfirm: () => { 
                            if(_isStrike){
                                vm.confirmFrame([10]);
                            } else {
                                vm.confirmFrame([parseInt(vm.scoreOne), parseInt(vm.scoreTwo)]);
                            }

                            vm.$toast.open({ message: 'Frame ' + vm.frameTable + ' confirmado.', duration: 800, });
                            this.verifyGameComplete(_isStrike);
                        }
                    }) 
                } else {
                    if(_isStrike){
                        vm.confirmFrame([10]);
                    } else {
                        vm.confirmFrame([parseInt(vm.scoreOne), parseInt(vm.scoreTwo)]);
                    }

                    vm.$toast.open({ message: 'Frame ' + vm.frameTable + ' confirmado.', duration: 800, });
                    this.verifyGameComplete(_isStrike);
                }
            
            },
            tailResults(){
                
                var frame = 1;
                
                if(this.credentials.user){

                    var tempFirst = {};
                    var tempI = 0;
                    
                
                    for (var i = 0; i < this.rolls.length && frame <= 5; i++) {

                        var currentRoll = this.rolls[i].toString();
                        var nextRoll = this.rolls[i + 1] != undefined ? this.rolls[i + 1].toString() : '';
                        var finalRoll = this.rolls[i + 2] != undefined ? this.rolls[i + 2].toString() : '';

                        if(this.rolls[i] == 10){
                            tempFirst['frame_' + frame] = currentRoll;
                        } else {
                            tempFirst['frame_' + frame] = currentRoll + ' ' + nextRoll;
                            i++;
                        }
                        frame++;
                        tempI = i + 1;
                    }
                    tempFirst.name = this.credentials.user;
                    this.firstData.push(tempFirst);


                    frame = 6;
                    var tempSecond = {}
                    for (var i = tempI; i < this.rolls.length && frame <= 10; i++) {

                        var currentRoll = this.rolls[i].toString();
                        var nextRoll = this.rolls[i + 1] != undefined ? this.rolls[i + 1].toString() : '';
                        var finalRoll = this.rolls[i + 2] != undefined ? this.rolls[i + 2].toString() : '';

                        if(frame == 10 && this.rolls[i] == 10){
                            tempSecond['frame_' + frame] = currentRoll + ' ' + nextRoll  + ' ' + finalRoll;
                        } else {
                            if(this.rolls[i] == 10){
                                tempSecond['frame_' + frame] = currentRoll;
                            } else {
                                tempSecond['frame_' + frame] = frame == 10 ? 
                                    currentRoll + ' ' + nextRoll  + ' ' + finalRoll : 
                                    currentRoll + ' ' + nextRoll;
                                i++;
                            }
                        }
                        frame++;
                    }
                    tempSecond.name = this.credentials.user;
                    this.secondData.push(tempSecond);

                    this.tailedResults = true;
                }
            },
            verifyFieldsMessage(){
                this.danger('Selecione "Srike" ou preencha os campos.');
            },
            verifyGameComplete(_isStrike){

                if(this.frameTable == 10 && this.isSpare(this.rollIndex)){
                    this.tenSpare = true;
                }

                // se nao for strike ou spare no frame 10, fim de jogo
                if(this.frameTable == 10 && !this.isSpare(this.rollIndex) && !this.isStrike(this.rollIndex)){
                    this.matchComplete = true;
                }

                //se frame 11 for um spare e nao houver strike, fim de jogo.
                if(this.frameTable == 11 && !this.isStrike(this.rollIndex)){
                    this.matchComplete = true;
                }

                //se for frame 12, fim de jogo
                 if(this.frameTable == 12){
                    this.matchComplete = true;
                }

                if(this.isStrike(this.rollIndex)){
                    this.rollIndex++;
                } else {
                    this.rollIndex += 2;
                }

                if(!this.matchComplete){
                    this.frameTable++;
                } else {

                    for(var i = 0; i < this.rolls.length; i++ ){
                        this.roll(this.rolls[i]);
                    }

                    this.matchScore = this.score();
                    this.tailResults();
                }
            },
            confirmResetGame(){
                this.$dialog.confirm({
                        message: 'Confirma reiniciar partida ?',
                        confirmText: 'Sim',
                        cancelText: 'Cancelar',
                        type: 'is-danger',
                        hasIcon: true,
                        icon: 'times-circle',
                        iconPack: 'fas',
                        onConfirm: () => {
                            this.resetGame();
                            this.success('Partida reiniciada com sucesso');
                        }
                    })
            },
            danger(_msg) {
                this.$toast.open({
                    duration: 1000,
                    message: _msg,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            },
            success(_msg) {
                this.$toast.open({
                    message: _msg,
                    type: 'is-success'
                })
            },
            confirmFrame(_score){
                //se strike
                if(_score.length == 1){
                    this.rolls.push(10);
                } else {
                    this.rolls.push(_score[0]);

                    //valida pontuacao do ultimo frame.
                    if(_score[1] != null){
                        this.rolls.push(_score[1]);
                    }
                }

                this.scoreOne = '';
                this.scoreTwo = '';
            }   
        }
    }
</script>

<style scoped>
    .old-sports {
        font-family: 'OldSports';
        font-size: 40px;
    }
    .box {
        background-image: -webkit-gradient(linear, 0 100%, 0 0, from(orange), to(gold));
    }
</style>


