<template>
<div id="wrapper">
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Registrar partida</h3>

                    <div class="box list-item">
                        <p class="is-danger">Frame atual da partida : {{ frameTable }}</p> 

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
                            <a class="button is-large is-dark is-fullwidth" @click="confirmResetGame">
                                <span class="icon">
                                    <i class="fas fa-times-circle"></i>
                                </span>
                                <span>Resetar partida</span>
                            </a>
                        </b-field>
                        <b-field v-show="matchComplete && tailedResults">
                            <b-table :data="firstData" :columns="firstColumns"></b-table>
                        </b-field>
                        <b-field v-show="matchComplete && tailedResults">
                            <b-table :data="secondData" :columns="secondColumns"></b-table>
                        </b-field>
                        <b-field v-show="matchComplete && tailedResults">
                            <h1 class="title">
                                <h1 class="title">   
                                    <a class="button is-success is-large is-inverted">{{ matchScore }}</a>
                                </h1>
                                
                            </h1>
                        </b-field>
                        <b-field v-if="matchComplete && tailedResults">
                            <button class="button is-block is-dark is-large is-fullwidth" @click="registerMatch" >
                                <b-icon
                                    pack="fas"
                                    icon="sync-alt"
                                    custom-class="fa-spin" 
                                    v-show="loading">
                                </b-icon>
                                <span v-show="!loading">Salvar partida</span>
                            </button>
                        </b-field>
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
                        width: '40',
                        numeric: true
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
                rolls: [],
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
            }
        },
        mounted(){
            this.credentials = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;
        },
        methods: {
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
                this.frameIndex = 0;
                this.matchComplete = false;
                this.tailedResults = false;
                this.frameTable = 1;
                this.scoreOne = 0;
                this.scoreTwo = 0;
                this.matchScore = 0;
                this.firstData = [];
                this.secondData = [];
                this.tenSpare = false;
            },
            roll(pins) {
                this.rolls[this.currentRoll++] = pins;
            },
            rollMany (n, pins) {
                for (var i = 0; i < n; i++) {
                    this.roll(pins);            
                }
            },
            sumOfBallsInFrame() {
                return this.rolls[this.frameIndex] + this.rolls[this.frameIndex + 1];
            },
            spareBonus() {
                return this.rolls[this.frameIndex + 2];
            },
            strikeBonus() {
                return this.rolls[this.frameIndex + 1] + this.rolls[this.frameIndex + 2];
            },
            isStrike() {
                return this.rolls[this.frameIndex] === 10;
            },
            isSpare() {
                return this.rolls[this.frameIndex] + this.rolls[this.frameIndex + 1] === 10;
            },
            score() {
                var score = 0;
 
                for (var frame = 0; frame < 10; frame++) {
                    if (this.isStrike()) {
                        score += 10 + this.strikeBonus();
                        this.frameIndex++;
                    } else if (this.isSpare()) {
                        score += 10 + this.spareBonus();
                        this.frameIndex += 2;
                    } else {
                        score += this.sumOfBallsInFrame();
                        this.frameIndex += 2;
                    }
                }

                return score;
            },
            confirmDialog(_isStrike) {

                if(this.frameTable == 12){
                    this.scoreTwo = 0;
                }

                if(this.scoreOne && this.scoreTwo && ( parseInt(this.scoreOne) + parseInt(this.scoreTwo) > 10 )){
                    this.danger('A soma dos campos não pode ser maior a 10.');
                    return false;
                }

                if(parseInt(this.scoreOne) == 10 && parseInt(this.scoreTwo) == 0){
                    this.doConfirm(true);
                } else if( (!this.scoreOne || !this.scoreTwo) && !_isStrike && this.frameTable != 12){
                    if(this.frameTable == 11 && this.rolls[this.rolls.length -1] != 10){
                        this.doConfirm(_isStrike);
                    } else {
                        this.danger('Selecione "Srike" ou preencha os campos.');
                    }
                } else {
                    this.doConfirm(_isStrike);
                }
            },
            doConfirm(_isStrike){
                var vm = this;

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
                        vm.$toast.open('Frame ' + vm.frameTable + ' confirmado.');

                        if((vm.frameTable == 10 || vm.frameTable == 11) && vm.rolls[vm.rolls.length -1] != 10 && vm.rolls[vm.rolls.length - 1] + vm.rolls[vm.rolls.length - 2] != 10){
                            vm.matchComplete = true;
                        }

                        if(vm.frameTable == 10 && vm.rolls[vm.rolls.length -1] != 10){
                           vm.tenSpare = true;
                           vm.scoreTwo = 0;
                        }

                        if((vm.frameTable == 12 && vm.rolls[vm.rolls.length -2] != 10) || (vm.frameTable == 12 && vm.rolls[vm.rolls.length -2] == 10 && vm.rolls[vm.rolls.length -1] == 10)){
                            vm.matchComplete = true;
                        }

                        if(!vm.matchComplete){
                            vm.frameTable++;
                        } else {

                            if(vm.tenSpare){
                                vm.rolls.pop();
                            }

                            for(var i = 0; i < vm.rolls.length; i++ ){
                                vm.roll(vm.rolls[i]);
                            }

                            vm.matchScore = vm.score();
                            vm.tailResults();
                        }

                    }
                })
            },
            tailResults(){
                
                var frame = 1;
                
                if(this.credentials.user){

                    var tempFirst = {};
                    var tempI = 0;
                
                    for (var i = 0; i < this.rolls.length && frame <= 5; i++) {
                        if(this.rolls[i] == 10){
                            tempFirst['frame_' + frame] = this.rolls[i].toString();
                        } else {
                            tempFirst['frame_' + frame] = this.rolls[i].toString() + ' ' + this.rolls[i + 1].toString();
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
                        if(frame == 10 && this.rolls[i] == 10){
                            tempSecond['frame_' + frame] = this.rolls[i].toString() + ' ' + this.rolls[i + 1].toString()  + ' ' + this.rolls[i + 2].toString();
                        } else {
                            if(this.rolls[i] == 10){
                                tempSecond['frame_' + frame] = this.rolls[i].toString();
                            } else {
                                tempSecond['frame_' + frame] = frame == 10 ? 
                                    this.rolls[i].toString() + ' ' + this.rolls[i + 1].toString()  + ' ' + this.rolls[i + 2].toString() : 
                                    this.rolls[i].toString() + ' ' + this.rolls[i + 1].toString();
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
                    duration: 3000,
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
                    this.rolls.push(_score[1]);
                }

                this.scoreOne = '';
                this.scoreTwo = '';
            }   
        }
    }
</script>

<style scoped>
    .box {
        background-image: -webkit-gradient(linear, 0 100%, 0 0, from(orange), to(gold));
    }
</style>


