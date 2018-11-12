<template>
<div id="wrapper">
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Menu</h3>
                    <div class="box">
                        <form>
                            <b-field>
                                <a class="button is-large  is-fullwidth" @click="goTo('/registerMatch')">
                                    <span class="icon">
                                        <i class="fas fa-bowling-ball"></i>
                                    </span>
                                    <span>Registrar partida</span>
                                </a>
                            </b-field>
                            <b-field>
                                <a class="button is-large  is-fullwidth" @click="goTo('/statistics')">
                                    <span class="icon">
                                        <i class="fas fa-chart-line"></i>
                                    </span>
                                    <span>Estatísticas</span>
                                </a>
                            </b-field>
                            <b-field>
                                <a class="button is-large  is-fullwidth" @click="goTo('/oils')">
                                    <span class="icon">
                                        <i class="fas fa-oil-can"></i>
                                    </span>
                                    <span>Padrões de óleo</span>
                                </a>
                            </b-field>
                            <b-field>
                                <a class="button is-large  is-fullwidth" @click="goTo('/playingArea')">
                                    <span class="icon">
                                        <i class="fas fa-calculator"></i>
                                    </span>
                                    <span>Estimar Lançamento</span>
                                </a>
                            </b-field>
                            <b-field>
                                <a class="button is-large  is-fullwidth" @click="leave">
                                    <span class="icon">
                                        <i class="fas fa-power-off"></i>
                                    </span>
                                    <span>Sair</span>
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
