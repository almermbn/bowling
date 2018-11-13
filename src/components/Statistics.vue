<template>
<div id="wrapper">
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Estatísticas</h3>                    
                    <div class="box" v-if="chartMatchOptions.series.length">
                    	<!-- <b-field>
	                    	<b-select 
	                    	placeholder="Select a character" 
	                    	v-model="matchDay" 
	                    	icon="calendar"
	                    	icon-pack="fas" expanded>
	                    		<option value="12/11/2018 12:00">12/11/2018 12:00</option>
	                    		<option value="12/11/2018 10:30">12/11/2018 10:30</option>
	                    		<option value="11/11/2018 13:00">11/11/2018 13:00</option>
	                    	</b-select>
	                    </b-field> -->
                        <highcharts :options="chartMatchOptions" :updateArgs="matchArgs"></highcharts>
                    </div>

                    <div class="box">
                        <highcharts :options="chartGamesOptions"></highcharts>
                    </div>
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
                chartMatchOptions: {
                	title: {
                		text: 'Pinos por partida'
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
                		text: 'Placar final'
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

                dateFormat.masks.matchTime = 'd/m/yy HH:MM';

                var seriesPins = _games.map( ( game, index ) => {
                    return { name: dateFormat(game.date, "matchTime"), marker: { symbol: 'circle' }, data: game.rolls }
                });

                var seriesTotal =  { name: "Total", marker: { symbol: 'circle' }, data: _games.map( map => { return map.total}) }

                this.chartMatchOptions.series = seriesPins;
                this.chartGamesOptions.series = seriesTotal;

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
                    
                    var credentials = JSON.parse(userStore);

                    return this.$http.post(this.$remoteUrl + 'api/getMatches', credentials).then(response => {
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
    .sticky {
    	position: -webkit-sticky;
    	position: sticky;
    	bottom: 0;
    	z-index: 100;
    }
</style>
