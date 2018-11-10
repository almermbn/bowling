<template>
<div id="wrapper">
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Estatísticas</h3>                    
                    <div class="box">
                    	<b-field>
	                    	<b-select 
	                    	placeholder="Select a character" 
	                    	v-model="matchDay" 
	                    	icon="calendar"
	                    	icon-pack="fas" expanded>
	                    		<option value="12/11/2018 12:00">12/11/2018 12:00</option>
	                    		<option value="12/11/2018 10:30">12/11/2018 10:30</option>
	                    		<option value="11/11/2018 13:00">11/11/2018 13:00</option>
	                    	</b-select>
	                    </b-field>
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

	import {Chart} from 'highcharts-vue'

    export default {
    	components: {
		    highcharts: Chart 
		},
        name: 'Home',
        data () {
            return {
            	matchArgs: [],
                credentials: '',
                matchDay: '12/11/2018 12:00',
                chartMatchOptions: {
                	title: {
                		text: 'Partida do dia 12/11/2018 12:00'
					},
                	yAxis: {
                		title: {
                			text: ''
                		},
                		plotLines: [{
                			value: 0,
                			width: 1,
                			color: '#808080'
                		}]
                	},
            	 	credits: {
						enabled: false
					},
                	series: [
	                	{
	                		name: 'Pinos',
	                		marker: {
	                			symbol: 'circle'
	                		},
	                		data: [9, 10, 7, 10, 9, 10, 10, 7, 10, 10, 8]
	                	},
	                	{
	                		name: 'Strikes',
	                		marker: {
	                			symbol: 'circle'
	                		},
	                		data: [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0]
	                	},
	                	{
	                		name: 'Spares',
	                		marker: {
	                			symbol: 'circle'
	                		},
	                		data: [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0]
	                	}
					]
				},
				chartGamesOptions: {
                	title: {
                		text: 'Partida do dia 12/11/2018'
					},
                	yAxis: {
                		title: {
                			text: ''
                		},
                		plotLines: [{
                			value: 0,
                			width: 1,
                			color: '#808080'
                		}]
                	},
                	credits: {
						enabled: false
					},
                	series: [
	                	{
	                		name: 'Pinos',
	                		marker: {
	                			symbol: 'circle'
	                		},
	                		data: [9, 10, 7, 10, 9, 10, 10, 7, 10, 10, 8]
	                	},
	                	{
	                		name: 'Strikes',
	                		marker: {
	                			symbol: 'circle'
	                		},
	                		data: [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0]
	                	},
	                	{
	                		name: 'Spares',
	                		marker: {
	                			symbol: 'circle'
	                		},
	                		data: [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0]
	                	}
					]
				}
            }
        },
        watch: {
        	matchDay(){
        		this.updateMatchArgs();
        	}
        },
        methods: {
        	updateMatchArgs(){
        		this.chartMatchOptions.title.text = 'Partida do dia ' + this.matchDay;
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
