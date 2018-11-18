<template>
<div id="wrapper">
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey old-sports-text">Estatísticas</h3>                    
                    <div class="box" v-if="chartMatchOptions.series.length">
                        <highcharts :options="chartMatchOptions" :updateArgs="matchArgs"></highcharts>
                    </div>

                    <div class="box" v-if="chartGamesOptions.series.length">
                        <highcharts :options="chartGamesOptions"></highcharts>
                    </div> 
                    <div class="box" v-if="generalTableData.length">
                        <b-table
                            :data="generalTableData"
                            :striped="true"
                            :hoverable="true"
                            class="old-sports-text"
                            :mobile-cards="true">

                                <template slot-scope="props" >
                                    <b-table-column field="strikes" label="Strikes" centered>
                                        {{ props.row.strikes }}
                                    </b-table-column>

                                    <b-table-column field="spares" label="Spares" centered>
                                        {{ props.row.spares }}
                                    </b-table-column>

                                    <b-table-column field="gutter" label="Canaletas" centered>
                                        <span class="tag is-danger">
                                            {{ props.row.gutter }}
                                        </span>
                                    </b-table-column>

                                    <b-table-column field="average" label="Média" centered>
                                        <span class="tag is-success">
                                            {{ props.row.average }}
                                        </span>
                                    </b-table-column>
                                </template>
                        </b-table>
                    </div>
                    <p class="heading" v-if="!chartGamesOptions.series.length && !chartMatchOptions.series.length">Você ainda não possui partidas registradas, comece a marcar :) !</p>
                </div>
            </div>
        </div>
    </section>
</div>  
</template>

<script>

	import {Chart} from 'highcharts-vue';
    var dateFormat = require('dateformat');
    
    export default {
    	components: {
		    highcharts: Chart,
            dateFormat: dateFormat
		},
        name: 'Home',
        data () {
            return {
                loadingComponent: '',
            	matchArgs: [],
                credentials: '',
                strikes: 0,
                spares: 0,
                gutters: 0,
                generalTableData: [],
                chartMatchOptions: {
                	title: {
                		text: 'Pinos por partida',
                        style : {"font-family": 'OldSports'}
					},
                	yAxis: {
                		title: {
                			text: ''
                		}
                	},

            	 	credits: {
						enabled: false
					},
                	series: []
				},
				chartGamesOptions: {
                	title: {
                		text: 'Placar final',
                        style : {"font-family": 'OldSports'}
					},
                	yAxis: {
                		title: {
                			text: 'Porcentagem'
                		}
                	},
                	credits: {
						enabled: false
					},
                	series: []
				}
            }
        },
        mounted(){
            this.fetchData();
        },
        methods: {
            async fetchData(){
                this.userMatches = await this.getMatches();
                this.mountMatchesGraphs(this.userMatches);
            },
            async mountMatchesGraphs(_games){

                var vm = this;

                dateFormat.masks.matchTime = 'd/m/yy HH:MM';
                if(_games.length){
                    var seriesPins = _games.map( ( game, index ) => {
                        return { name: dateFormat(game.date, "matchTime"), marker: { symbol: 'circle' }, data: game.rolls }
                    });


                    this.chartMatchOptions.series = seriesPins;

                    var add = function(a, b) {
                        return a + b;
                    }

                    _games.forEach( (game) => {
                        vm.tailScoreData(game);
                    });
                    
                    var gamesData = _games.map( map => { return map.total});
                    if(gamesData.length){
                        var seriesTotal =  [{ name: "Total", marker: { symbol: 'circle' }, data: gamesData }]
                        this.chartGamesOptions.series = seriesTotal;

                        this.generalTableData.push(
                            { 
                                'strikes': vm.strikes, 
                                'spares': vm.spares, 
                                'average': (gamesData.reduce(add, 0) / _games.length).toFixed(0), 
                                'gutter': vm.gutters
                            }
                        );
                    }
                }
            },
            tailScoreData(_game){
                var score = 0;
                var frameIndex = 0;

                for (var frame = 0; frame < 10; frame++) {
                    if (this.isStrike(_game, frameIndex)) {
                        if(frame == 9 && _game.rolls[frameIndex] == 10){
                            _game.rolls[frameIndex + 1] == 10 ?  this.strikes++ : null;
                            _game.rolls[frameIndex + 2] == 10 ?  this.strikes++ : null;
                        }
                        frameIndex++;
                        this.strikes++;
                    } else if (this.isSpare(_game, frameIndex)) {
                        this.spares++;
                        frameIndex += 2;
                    } else {
                        if(_game.rolls[frameIndex] == 0 || _game.rolls[frameIndex + 1] == 0){
                            this.gutters++;
                        }
                        frameIndex += 2;
                    }
                }
            },
            strikeBonus(_game, _frame) {
                return _game.rolls[_frame + 1] + _game.rolls[_frame + 2];
            },
            isStrike(_game, _frame) {
                return _game.rolls[_frame] === 10;
            },
            isSpare(_game, _frame) {
                if(_game.rolls[_frame] == 0 || _game.rolls[_frame + 1] == 0){
                    this.gutters++;
                }
                return _game.rolls[_frame] + _game.rolls[_frame + 1] === 10;
            },
            loading(){
                this.loadingComponent = this.$loading.open();
            },
            stopLoading(){
                this.loadingComponent.close();
            },
            async getMatches(){
                
                var vm = this;
                var userStore = localStorage.getItem('userLogin');
                if(userStore){
                    this.loading();
                    
                    this.credentials = JSON.parse(userStore);

                    return this.$http.post(this.$remoteUrl + 'api/getMatches', this.credentials).then(response => {
                            vm.stopLoading();
                            return response.data.object;
                    }, function (response) {
                        vm.stopLoading();
                    });
                }
               
            },
            danger(_msg) {
                this.$toast.open({
                    duration: 3000,
                    message: _msg,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            },
            success() {
                this.$toast.open({
                    message: 'Cadastro efetuado com sucesso!',
                    type: 'is-success'
                })
            }
        }
    }
</script>

<style scoped>
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
    .box {
        background-image: -webkit-gradient(linear, 0 100%, 0 0, from(orange), to(gold));
    }
</style>
