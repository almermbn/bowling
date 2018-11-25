<template>
<div id="wrapper">
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-white old-sports-text">Menu</h3>
                    <div class="box list-item">
                        <form>
                            <b-field>
                                <a class="button is-large  is-fullwidth" @click="goTo('/registerMatch')">
                                    <span class="icon">
                                        <i class="fas fa-bowling-ball"></i>
                                    </span>
                                    <span class="old-sports-text menu-sized">Registrar partida</span>
                                </a>
                            </b-field>
                            <b-field>
                                <a class="button is-large  is-fullwidth" @click="goTo('/statistics')">
                                    <span class="icon">
                                        <i class="fas fa-chart-line"></i>
                                    </span>
                                    <span class="old-sports-text menu-sized">Estatísticas</span>
                                </a>
                            </b-field>
                            <b-field>
                                <a class="button is-large  is-fullwidth" @click="goTo('/oils')">
                                    <span class="icon">
                                        <i class="fas fa-oil-can"></i>
                                    </span>
                                    <span class="old-sports-text menu-sized">Padrões de óleo</span>
                                </a>
                            </b-field>
                            <b-field>
                                <a class="button is-large  is-fullwidth" @click="goTo('/playingArea')">
                                    <span class="icon">
                                        <i class="fas fa-calculator"></i>
                                    </span>
                                    <span class="old-sports-text menu-sized">Lançamento</span>
                                </a>
                            </b-field>
                            <b-field>
                                <a class="button is-large  is-fullwidth" @click="goTo('/events')" v-if="credentials.level > 0 ">
                                    <span class="icon">
                                        <i class="fas fa-bullhorn"></i>
                                    </span>
                                    <span class="old-sports-text menu-sized">Criar Eventos</span>
                                    &nbsp;
                                    <b-tag type="is-danger" v-show="false">1</b-tag>
                                </a>
                            </b-field>
                            <b-field>
                                <a class="button is-large  is-fullwidth">
                                    <span class="icon">
                                        <i class="fas fa-list"></i>
                                    </span>
                                    <span class="old-sports-text menu-sized">Eventos</span>
                                    &nbsp;
                                    <b-tag type="is-danger" v-show="false">1</b-tag>
                                </a>
                            </b-field>
                            <b-field>
                                <a class="button is-large  is-fullwidth" @click="goTo('/ranking')">
                                    <span class="icon">
                                        <i class="fas fa-trophy"></i>
                                    </span>
                                    <span class="old-sports-text menu-sized">Ranking</span>
                                </a>
                            </b-field>
                            <b-field>
                                <a class="button is-large  is-fullwidth" @click="leave">
                                    <span class="icon">
                                        <i class="fas fa-power-off"></i>
                                    </span>
                                    <span class="old-sports-text menu-sized">Sair</span>
                                </a>
                            </b-field>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>  
</template>

<script>
    export default {
        name: 'Home',
        data () {
            return {
                credentials: '',
            }
        },
        mounted(){
            this.credentials = this.getCurrentUser();
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
            success() {
                this.$toast.open({
                    message: 'Cadastro efetuado com sucesso!',
                    type: 'is-success'
                })
            },
            getCurrentUser(){
                var user = localStorage.getItem('userLogin');
                if(user){
                    return JSON.parse(user);
                }
            },
            goTo(_route){
                this.$router.push(_route);
            },
            leave(){
                localStorage.setItem('userLogin', '');
                this.goTo('/');
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
