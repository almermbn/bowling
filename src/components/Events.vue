<template>
<div id="wrapper" transition="fade">
    <b-modal :active.sync="mapModalActive" :width="'100%'" scroll="keep">
        <div class="card">
            <div class="card-image">
                
            </div>
            <div class="card-content">
                <gmap-map
                    :center="center"
                    :zoom="16"
                    style="width:100%;  height: 400px;"
                    >
                    <gmap-marker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        @click="center=m.position">
                    </gmap-marker>
                </gmap-map>

                <div class="content">
                    <br>
                    <p class="old-sports-text"><small>{{ ePlace }}</small></p>
                </div>
            </div>
        </div>
    </b-modal>

    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-white old-sports-text">Criar Evento</h3>
                    <div class="box">
                        <form>
                            <b-field>
                                <p><small class="old-sports-text">* Campos obrigatórios</small></p>
                            </b-field>
                            <div class="field">
                                <b-datepicker
                                    v-model="eData"
                                    icon-pack="fas"
                                    placeholder="Data do evento *"
                                    :day-names="daysOptions"
                                    :month-names="monthOptions"
                                    :min-date="minDate"
                                    indicators="bars"
                                    ref="eventDateRef"
                                    size="is-medium">
                                </b-datepicker>
                            </div>

                            <div class="field">
                                <b-timepicker
                                    v-model="eTime"
                                    ref="eventTimeRef"
                                    size="is-medium"
                                    :increment-minutes="10"
                                    placeholder="Hora do evento *">
                                </b-timepicker>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <b-input placeholder="Nome do evento *"
                                        type="text"
                                        size="is-medium"
                                        v-model="eName">
                                    </b-input>
                                </div>
                            </div>
                            <b-field>     
                                <gmap-autocomplete
                                    placeholder="Digite um local *"
                                    class="input is-medium is-fullwidth"
                                    @place_changed="setPlace">
                                </gmap-autocomplete>
                                
                                <p class="control">
                                    <button class="button is-medium is-dark old-sports-text" @click="" type="button" @click="mapModalActive = true; currentPlace = null">
                                        <b-icon
                                            pack="fas"
                                            icon="map">
                                        </b-icon>
                                    </button>
                                    <i :class="[ currentPlace ? 'shiny' : '' ]"></i>
                                </p>

                            </b-field>

                             <div class="field">
                                <div class="control">
                                     <input placeholder="Valor do evento (opcional)" v-model="ePrice" v-money="moneyFormat" class="input is-medium" maxlength="8"/>
                                </div>
                            </div>
                            
                            <b-field>
                                <p class="control">
                                    <b-input type="number" size="is-medium" placeholder="Min pessoas"  v-model="eMinLimit"></b-input>
                                </p>
                                <p class="control">
                                    <b-input type="number" size="is-medium" placeholder="Máx pessoas"  v-model="eMaxLimit"></b-input>
                                </p>
                            </b-field>

                             <div class="field">
                                <div class="control">
                                    <b-input placeholder="Descrição do evento"
                                        type="textarea"
                                        maxlength="200"
                                        size="is-medium"
                                        v-model="eDesc">
                                    </b-input>
                                </div>
                            </div>

                            <button class="button is-block is-dark is-large is-fullwidth" type="button" :disabled="!createReady" @click="createEvent">
                                <span class="old-sports-text">Criar</span>
                                <i :class="[ createReady ? 'shiny' : '' ]"></i>
                            </button>
                            <br>
                        </form>
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
        name: 'Events',
        components: { dateFormat },
        data () {
            return {
                eData: null,
                eTime: null,
                eName: '',
                eDesc: '',
                ePrice: 0.0,
                ePlace: '',
                eMinLimit: '',
                eMaxLimit: '',
                mapModalActive: false,
                moneyFormat: {
                    decimal  : '.',
                    thousands: ',',
                    prefix   : 'R$ ',
                    suffix   : '',
                    precision: 2,
                    masked   : false 
                },
                daysOptions: ["D", "S", "T", "Q", "Q", "S", "S"],
                monthOptions: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                minDate: new Date(),
                currentPlace: null,
                center: {},
                markers: [],
                loadingComponent: '',
            }
        },
        computed:{
            createReady : function(){
                return this.eName.trim().length && this.eData && this.eTime && this.ePlace;
            }
        },
        mounted(){
            this.geolocate();
        },
        methods: {
            setPlace(_place){
                this.markers = [];
                this.currentPlace = _place;
                if (this.currentPlace) {
                    const marker = {
                      lat: this.currentPlace.geometry.location.lat(),
                      lng: this.currentPlace.geometry.location.lng()
                    };
                    this.ePlace = this.currentPlace.formatted_address;
                    this.markers.push({ position: marker });
                    this.center = marker;
                  }
            },
            geolocate(){
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.markers.push({ position: this.center });
                });
            },
            fullLoading(){
                this.loadingComponent = this.$loading.open();
            },
            stopLoading(){
                this.loadingComponent.close();
            },
            success(_msg) {
                this.$toast.open({
                    message: _msg,
                    type: 'is-success'
                })
            },
            getCurrentUser(){
                var user = localStorage.getItem('userLogin');
                if(user){
                    var obj = JSON.parse(user);
                    return obj;
                }
                return 'Admin';
            },
            createEvent(){
                if(this.createReady){

                    dateFormat.masks.hoursFormat = 'HH:MM';

                    var event = {
                        name: this.eName,
                        time: dateFormat(this.eTime, "hoursFormat"),
                        date: this.$refs.eventTimeRef.dateSelected,
                        local: this.ePlace,
                        localCoordinates: this.markers[0].position,
                        price: this.ePrice,
                        min: this.eMinLimit == '' ? 0 : this.eMinLimit,
                        max: this.eMaxLimit  == '' ? 0 : this.eMaxLimit,
                        description: this.eDesc,
                        owner: this.getCurrentUser().name
                    }
                    
                    this.fullLoading();

                    this.$http.post(this.$remoteUrl + 'api/createEvent', event).then(response => {
                        var result = response.data;
                        this.success(result.message);
                        this.stopLoading();

                        this.$router.push('/home');

                    },function (response) {
                        this.stopLoading();
                    });

                }
            }
        }
    }
</script>

<style scoped>
    .box {
        background-image: -webkit-gradient(linear, 0 100%, 0 0, from(orange), to(gold));
    }
</style>
