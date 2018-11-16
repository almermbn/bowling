<template>
    <div id="app">

       <!--  <nav class="navbar is-fixed-top"></nav> -->
        <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation" v-show="showBottomNavBar">
            <div class="navbar-end">
                <div class="navbar-item navbar-center">
                    <div class="buttons">
                        <a class="button is-danger">
                            <span class="icon">
                                <i class="fas fa-user"></i>
                            </span>
                            <span>{{ credentials.user }}</span>
                        </a>                   
                    </div>
                </div>
            </div>
        </nav>
        <transition name="fade">
            <router-view/></router-view>
        </transition>
        <nav class="navbar is-dark is-fixed-bottom" role="navigation" aria-label="main navigation" v-show="showBottomNavBar">
            <div class="navbar-end">
                <div class="navbar-item navbar-center">
                    <div class="buttons">
                        
                        <button class="button" @click="back" :disabled="backDisabled">
                            <b-icon
                                pack="fas"
                                icon="arrow-left">
                            </b-icon>
                            <span >Voltar</span>
                        </button>

                        <button class="button is-danger" @click="confirmDeleteData" v-show="showDeleteStatistics">
                            <b-icon
                                pack="fas"
                                icon="trash-alt">
                            </b-icon>
                            <span>Apagar</span>
                        </button>

                        <button class="button is-danger" @click="leave">
                            <b-icon
                                pack="fas"
                                icon="power-off">
                            </b-icon>
                            <span>Sair</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

    </div>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return { 
                backDisabled: '',
                showBottomNavBar: '',
                showDeleteStatistics: '',
                credentials: '',
            }
        },
        mounted(){
            this.backDisabled = (this.$route.path == '/home' || this.$route.path == '/');
            this.showBottomNavBar = this.$route.path != '/';
            this.$route.path == '/statistics' ? this.showDeleteStatistics = true : this.showDeleteStatistics = false;

            var user = localStorage.getItem('userLogin');
            if(!user){
                this.$router.replace('/');
            } else {
                var obj = JSON.parse(user);
                this.credentials = obj;
            }
        },
        watch: {
            '$route.path': function(_val){
                this.backDisabled = (_val == '/home' || _val == '/');
                this.showBottomNavBar = _val != '/';
                this.$route.path == '/statistics' ? this.showDeleteStatistics = true : this.showDeleteStatistics = false;
                var user = localStorage.getItem('userLogin');
                if(!user && _val != '/'){
                    this.danger('Houve um problema ao recuperar os dados do usuário. Efetue o login novamente.');
                    this.$router.replace('/');
                } else {
                    if(user){
                        var obj = JSON.parse(user);   
                        this.credentials = obj;
                    }  
                }
            }
        },
        methods: {
            danger(_msg) {
                this.$toast.open({
                    duration: 3000,
                    message: _msg,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            },
            success(_ms){
                 this.$toast.open({
                    duration: 3000,
                    message: _msg,
                    position: 'is-bottom',
                    type: 'is-success'
                });
            },
            back(){
                if(this.$route.path != '/home' && this.$route.path != '/'){
                    this.$router.go(-1);
                }
            },
            leave(){
                localStorage.setItem('userLogin', '');
                this.$router.replace('/');
            },
            loading(){
                this.loadingComponent = this.$loading.open();
            },
            stopLoading(){
                this.loadingComponent.close();
            },
            confirmDeleteData() {
                this.$dialog.confirm({
                    title: 'Exlusão de estatísticas ?',
                    message: 'Deseja <b>apagar</b> as <b>estatísticas</b> ? Esta ação <b>não</b> poderá ser desfeita.',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fas',
                    confirmText: 'Apagar',
                    cancelText: 'Cancelar',
                    onConfirm: () => {

                        var userStore = localStorage.getItem('userLogin');
                        if(userStore){
                            this.loading();

                            var credentials = JSON.parse(userStore);
                            this.$http.post(this.$remoteUrl + 'api/deleteMatches', credentials).then(response => {
                                this.stopLoading();
                                this.back();
                                this.success('Dados apagados com sucesso!');
                            },function (response) {
                                this.danger('Falha ao apagar dados.')
                                this.stopLoading();
                            });
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import url('../node_modules/animate.css/animate.min.css');
    @import url('../node_modules/@fortawesome//fontawesome-free/css/all.css');
    @import url('../node_modules/vue-animate-transitions/dist/vue-animate-transitions.min.css');

    @import "~bulma";
    @import "~buefy/src/scss/buefy";
    @font-face {
        font-family: 'OldSports';
        src: url('assets/old_sport.ttf');
        src: url('assets/old_sport_2.ttf') 
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }

    body {
        font-family: 'Open Sans';
    }
</style>
