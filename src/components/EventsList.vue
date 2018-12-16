<template>
<div id="wrapper">
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-white old-sports-text">Eventos</h3>

                     <div class="box list-item" v-show="events.length == 0">
                        <p class="is-danger old-sports-text" >Não há nada programado no momento.</p> 
                    </div>

                    <div class="box list-item" v-for="event in events">
                        
                        <div class="card">
                            <header class="card-header old-sports-text">
                                <p class="card-header-title">
                                    {{ event.name }}
                                </p>
                            </header>
                            <div class="card-content">
                                <div class="content align-left">
                                    <span><b>Local: </b> {{ event.local }}</span><br>
                                    <span><b>Data: </b> {{ event.date }}</span><br>
                                    <span><b>Hora: </b> {{ event.time }}</span><br>
                                    <span v-if="event.price"><b>Valor: </b>{{ event.price }} <br></span>
                                    <span v-if="event.min"><b>Mínimo pessoas: </b>{{ event.min }} <br></span>
                                    <span v-if="event.max"><b>Máximo pessoas: </b>{{ event.max }} <br></span>
                                    <span v-if="event.description">{{ event.description }} <br></span>
                                </div>
                            </div>
                            <footer class="card-footer old-sports-text">
                                <a href="#" class="card-footer-item">Confirmados</a>
                                <a href="#" class="card-footer-item">Participar</a>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
</div>  
</template>

<script>

    var dateFormat = require('dateformat');

    export default {
        components: {
            dateFormat: dateFormat
        },
        name: 'Oils',
        data () {
            return {
                loadingComponent: '',
                events: []
            }
        },
        mounted(){
            this.fetchEvents();
        },
        methods: {
            async fetchEvents(){
                this.loading();
                this.$http.post(this.$remoteUrl + 'api/listEvents').then(response => {
                    this.events = response.data.object;

                    dateFormat.masks.eventTime = 'd/m/yy';
                    this.events.forEach( event => event.date = dateFormat(event.date, "eventTime"))
                    this.stopLoading();
                },function (response) {
                    this.stopLoading();
                });
            },
            loading(){
                this.loadingComponent = this.$loading.open();
            },
            stopLoading(){
                this.loadingComponent.close();
            },
            
        }
    }
</script>

<style scoped>
    .box {
        background-image: -webkit-gradient(linear, 0 100%, 0 0, from(orange), to(gold));
    }
    .align-left {
        text-align: left;
    }
</style>
