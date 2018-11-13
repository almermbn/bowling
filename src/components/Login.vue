<template>

<div id="wrapper">
    <!-- LOGIN -->
    <transition :name="transitionLogin">
        <section class="hero is-fullheight animated" :class="transitionLogin" v-show="isLogin">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-4 is-offset-4">
                        <h3 class="title has-text-grey">Login</h3>
                        <p class="subtitle has-text-grey">Efetue seu login e senha para continuar.</p>
                        <div class="box">
                            <figure class="avatar">
                                <img src="./../assets/logo.png">
                            </figure>
                            <form>
                                <div class="field">
                                    <div class="control">
                                        <b-input placeholder="Usuário"
                                            type="text"
                                            icon-pack="fas"
                                            icon="user"
                                            size="is-large"
                                            ref="login" 
                                            v-model="login">
                                        </b-input>
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="control">
                                        <b-input placeholder="Senha"
                                            type="password"
                                            icon-pack="fas"
                                            icon="key"
                                            size="is-large"
                                            ref="pwd" 
                                            v-model="pwd"
                                            password-reveal>
                                        </b-input>
                                    </div>
                                </div>

                                <button class="button is-block is-dark is-large is-fullwidth" @click="doLogin" :disabled="loading">
                                    <b-icon
                                        pack="fas"
                                        icon="sync-alt"
                                        custom-class="fa-spin" 
                                        v-show="loading">
                                    </b-icon>
                                    <span v-show="!loading">Login</span>
                                </button>
                            </form>
                        </div>
                        <p class="button is-text">
                            <a @click="toggleRegister">Cadastrar</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </transition>
    
    <!-- CADASTRO -->
    <transition :name="transitionRegister">
        <section class="hero is-fullheight animated" :class="transitionRegister" v-show="!isLogin" >
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-4 is-offset-4">
                        <h3 class="title has-text-grey">Cadastrar</h3>
                        <p class="subtitle has-text-grey">Informe seus dados para o cadastro.</p>
                        <div class="box">
                            <figure class="avatar">
                                <img src="./../assets/logo.png">
                            </figure>
                            <form>
                                <div class="field">
                                    <div class="control">
                                        <b-input placeholder="Usuário"
                                            type="text"
                                            icon-pack="fas"
                                            icon="user"
                                            size="is-large"
                                            ref="userRegister" 
                                            v-model="userRegister">
                                        </b-input>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <b-input placeholder="Senha"
                                            type="password"
                                            icon-pack="fas"
                                            icon="key"
                                            size="is-large"
                                            ref="userPwd"
                                            v-model="userPwd"
                                            password-reveal>
                                        </b-input>
                                    </div>
                                </div>
                                <button class="button is-block is-dark is-large is-fullwidth" @click="doRegister" :disabled="loading">
                                    <b-icon
                                        pack="fas"
                                        icon="sync-alt"
                                        custom-class="fa-spin" 
                                        v-show="loading">
                                    </b-icon>
                                    <span v-show="!loading">Cadastrar</span>
                                </button>
                            </form>
                        </div>
                        <p class="button is-text">
                            <a @click="toggleRegister">Voltar</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </transition>
</div>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                login: '',
                pwd: '',
                isLogin: true,
                userRegister: '',
                userPwd: '',
                loggedIn: false,
                loading: false,
                transitionLogin: 'flipInY',
                transitionRegister: 'flipOutY'
            }
        },
        mounted(){
            this.checkExistentUser();
        },
        methods: {
            toggleRegister(){
                var vm = this;

                this.isLogin = !this.isLogin;
                if(this.isLogin){
                    this.transitionRegister = 'flipOutY';
                    setTimeout(function() {
                        vm.transitionLogin = 'flipInY';
                    }, 700);
                } else {
                    this.transitionLogin = 'flipOutY';
                    setTimeout(function() {
                        vm.transitionRegister = 'flipInY';
                    }, 700);
                }
            },
            doLogin(){
                
                if(this.isValidLogin()){
                    this.loading = false;

                    this.loading = true;

                    var credentials = {
                        user: this.login,
                        pwd: this.pwd
                    }

                    this.$http.post(this.$remoteUrl + 'api/login', credentials).then(response => {
                        var result = response.data;

                        if(result.saveOk){
                            localStorage.setItem('userLogin', JSON.stringify(credentials));
                            this.loading = false;
                            this.success(result.message);
                            this.loggedIn = true;

                            this.$router.push('/home');
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
            doRegister(){

                var vm = this;

                if(this.isValidRegister()){

                    var credentials = {
                        user: this.userRegister,
                        pwd: this.userPwd
                    }
                    this.loading = true;

                    this.$http.post(this.$remoteUrl + 'api/register', credentials).then(response => {
                        var result = response.data;

                        if(result.saveOk){

                            this.toggleRegister();
                            this.login = credentials.user;
                            this.pwd = credentials.pwd;

                            localStorage.setItem('userLogin', JSON.stringify(credentials));
                            this.loading = false;
                            this.success('Cadastro efetuado com sucesso!');
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
            isValidLogin(){
                if(!this.login){
                    this.$refs.login.focus();
                    this.danger("Insira um usuário");
                    return false;
                } else {
                    if(!this.pwd){
                        this.$refs.pwd.focus();
                        this.danger("Insira uma senha");
                        return false;
                    }
                }

                return true;
            },
            isValidRegister(){
                if(!this.userRegister){
                    this.$refs.userRegister.focus();
                    this.danger("Insira um usuário");
                    return false;
                } else if(this.userRegister.length < 4){
                    this.$refs.userRegister.focus();
                    this.danger("O nome do usuário deve conter pelo menos 4 caracteres");
                    return false;
                }

                if(this.userRegister && this.userRegister.length >= 4){
                    if(!this.userPwd){
                        this.$refs.userPwd.focus();
                        this.danger("Insira uma senha");
                        return false;
                    } else if(this.userPwd.length < 6){
                        this.$refs.userPwd.focus();
                        this.danger("A senha deve conter pelo menos 6 caracteres");
                        return false;
                    }
                }

                return true;
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
<style scoped lang="scss">
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
    figure img {
        width: 40%;
        height: 40%;
    }
    .box {
        background-image: -webkit-gradient(linear, 0 100%, 0 0, from(orange), to(gold));
    }
    .input:focus {
        border-color: #167df0 !important;
    }
</style>
