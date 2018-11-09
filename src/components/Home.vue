<template>
<div id="wrapper">
teste
    <!-- LOGIN -->
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Menu</h3>
                    <div class="box">
                        <form>
                            <button class="button is-block is-info is-large is-fullwidth" @click="doLogin">Registrar partida</button>
                            <button class="button is-block is-info is-large is-fullwidth" @click="doLogin">Grafico de jogos</button>
                            <button class="button is-block is-info is-large is-fullwidth" @click="doLogin">Sair</button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a @click="toggleRegister">Cadastrar</a>
                    </p>
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
                login: '',
                pwd: '',
                isLogin: true,
                userRegister: '',
                userPwd: '',
                loggedIn: false
            }
        },
        mounted(){
            alert('')
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
            checkExistentUser(){
                var user = localStorage.getItem('userLogin');
                if(user){
                    var obj = JSON.parse(user);
                    this.login = obj.user;
                    this.pwd = obj.pwd;
                    this.doLogin();
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    a {
        color: #42b983;
    }
</style>
