<template>

<div id="wrapper">
    <!-- LOGIN -->
    <transition :name="transitionLogin">
        <section class="hero is-fullheight animated" :class="transitionLogin" v-show="isLogin">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-4 is-offset-4">
                        <h3 class="title has-text-grey old-sports-text">Login</h3>
                        <p class="subtitle has-text-grey old-sports-text"><small>Efetue seu login continuar.</small></p>
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

                                <button class="button is-block is-dark is-large is-fullwidth" type="button" @click="doLogin" :disabled="loading">
                                    <b-icon
                                        pack="fas"
                                        icon="sync-alt"
                                        custom-class="fa-spin" 
                                        v-show="loading">
                                    </b-icon>
                                    <span v-show="!loading" class="old-sports-text">Login</span>
                                </button>
                            </form>
                        </div>
                        <div class="field" @click="fullLoading">
                            <g-signin-button
                                :params="googleSignInParams"
                                @success="onSignInSuccess"
                                @error="onSignInError">
                                <i class="fab fa-google-plus-square"></i> &nbsp;Login com o Google
                            </g-signin-button>
                        </div>
                        <p class="button is-text">
                            <a @click="toggleRegister" class="old-sports-text">Cadastrar</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </transition>
    
    <!-- CADASTRO -->
    <transition :name="transitionRegister">
        <section class="hero is-fullheight animated" :class="transitionRegister" v-show="isRegister" >
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-4 is-offset-4">
                        <h3 class="title has-text-grey old-sports-text">Cadastrar</h3>
                        <p class="subtitle has-text-grey old-sports-text"><small>Informe seus dados para o cadastro.</small></p>
                        <div class="box">
                            <figure class="avatar">
                                <img src="./../assets/logo.png">
                            </figure>
                            <form>
                                <div class="field">
                                    <div class="control">
                                        <b-input placeholder="Nome"
                                            type="text"
                                            icon-pack="fas"
                                            size="is-large"
                                            ref="userName"
                                            icon="user"
                                            v-model="userName">
                                        </b-input>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <b-input placeholder="Sobrenome"
                                            type="text"
                                            icon-pack="fas"
                                            icon="user"
                                            size="is-large"
                                            ref="userLastName"
                                            v-model="userLastName">
                                        </b-input>
                                    </div>
                                </div>
                                <b-field>
                                    <b-input placeholder="Email"
                                        type="email"
                                        icon-pack="fas"
                                        icon="envelope"
                                        size="is-large"
                                        ref="userEmail"
                                        v-model="userEmail">
                                    </b-input>                                   
                                </b-field>
                                <div class="field">
                                    <div class="control">
                                        <b-input placeholder="Usuário *"
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
                                        <b-input placeholder="Senha *"
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
                                <div class="field">
                                    <small>* Campos obrigatórios</small>
                                </div>

                                <button class="button is-block is-dark is-large is-fullwidth" type="button" @click="doRegister" :disabled="loading">
                                    <b-icon
                                        pack="fas"
                                        icon="sync-alt"
                                        custom-class="fa-spin" 
                                        v-show="loading">
                                    </b-icon>
                                    <span v-show="!loading" class="old-sports-text">Cadastrar</span>
                                </button>
                            </form>
                        </div>
                        <p class="button is-text">
                            <a @click="toggleRegister" class="old-sports-text">Voltar</a>
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
                googleSignInParams: {
                    client_id: '1053328724849-brrrvs33linuvotf20rc2bkvkikj2npq.apps.googleusercontent.com'
                },
                login: '',
                pwd: '',
                isLogin: true,
                isRegister: false,
                userRegister: '',
                loadingComponent: '',
                userPwd: '',
                loggedIn: false,
                loading: false,
                transitionLogin: 'flipInY',
                transitionRegister: 'flipInY',
                userName: '',
                userEmail: '',
                userLastName: '',
                googleProfile: '',
            }
        },
        mounted(){
            this.checkExistentUser();
        },
        methods: {
            onSignInSuccess (googleUser) {
                this.googleProfile = googleUser.getBasicProfile();
                this.doGoogleRegister();
            },
            onSignInError (error) {
                this.stopLoading();
                this.danger('Falha na autenticação com a google.');
            },
            clearRegisterData(){
                this.userName = '';
                this.userLastName = '';
                this.userEmail = '';
                this.userRegister = '';
                this.userPwd = '';
            },
            toggleRegister(){
                var vm = this;

                if(this.isLogin){
                    this.isLogin = !this.isLogin;
                    setTimeout(function() {
                        vm.isRegister = !vm.isRegister;
                    }, 900);
                }   

                if(this.isRegister){
                    this.isRegister = !this.isRegister;
                    setTimeout(function() {
                        vm.isLogin = !vm.isLogin;
                    }, 900);
                }
            },
            doLogin(){
                
                if(this.isValidLogin()){

                    this.loading = true;

                    var credentials = {
                        user: this.login.toLowerCase(),
                        pwd: this.pwd
                    }

                    this.$http.post(this.$remoteUrl + 'api/login', credentials).then(response => {
                        var result = response.data;

                        if(result.saveOk){
                            localStorage.setItem('userLogin', JSON.stringify(response.data.object));
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
                        pwd: this.userPwd,
                        name: this.userName,
                        lastName: this.userLastName,
                        email: this.userEmail
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
                            this.clearRegisterData();
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
            doGoogleLogin(_credentials){

                this.$http.post(this.$remoteUrl + 'api/login', _credentials).then(response => {
                        var result = response.data;

                        if(result.saveOk){
                            localStorage.setItem('userLogin', JSON.stringify(response.data.object));
                            this.success(result.message);
                            this.stopLoading();

                            this.$router.push('/home');
                        } else {
                            this.danger(result.message);
                            this.stopLoading();
                        }
                    },function (response) {
                        console.log(response.data.message);
                        this.stopLoading();
                    });
            },
            doGoogleRegister(){

                var credentials = {
                    user: this.googleProfile.getEmail(),
                    pwd: this.googleProfile.getGivenName().toLowerCase() + '123',
                    name: this.googleProfile.getGivenName(),
                    lastName: this.googleProfile.getFamilyName(),
                    email: this.googleProfile.getEmail()
                }

                this.$http.post(this.$remoteUrl + 'api/register', credentials).then(response => {
                        var result = response.data;
                        this.doGoogleLogin(credentials);

                    },function (response) {
                        this.stopLoading();
                    });
            },
            fullLoading(){
                this.loadingComponent = this.$loading.open();
            },
            stopLoading(){
                this.loadingComponent.close();
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
    .g-signin-button {
        font-family: 'OldSports';
        display: flex;
        width: 100%;
        font-size: 1.5rem;
        background-color: white;
        border-width: 1px;
        color: #363636;
        cursor: pointer;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding-bottom: calc(0.375em - 1px);
        padding-left: 0.75em;
        padding-right: 0.75em;
        padding-top: calc(0.375em - 1px);
        text-align: center;
        white-space: nowrap;
        -webkit-appearance: none;
        -webkit-box-align: center;
        align-items: center;
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        box-shadow: none;
        height: 2.25em;
        line-height: 1.5;
        position: relative;
        vertical-align: top;
    }
    .g-signin-button:hover {
        border-color: #b5b5b5;
        color: #363636;
    }
</style>
