<template>
    <div id="wrapper-header">
        <!--================Header Menu Area =================-->
        <header class="header_area" :class="navFixed ? 'navbar_fixed' : ''">
            <div class="top_menu d-lg-block d-none">
                <div class="container">
                    <div class="float-left">
                        <ul class="left_side">
                            <li>
                                <a href="#">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fab fa-dribbble"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fab fa-behance"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="float-right">
                        <ul class="right_side">
                            <li>
                                <a href="#">
                                    <i class="fas fa-phone"></i>
                                    012-6532-568-9746
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fas fa-envelope"></i>
                                    contato@maktub.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="main_menu">
                <nav class="navbar navbar-expand-lg w-100">
                    <div class="container">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <a class="navbar-brand logo_h" href="index.html">
                            <img src="../assets/img/logo.png" alt="" />
                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <div class="row w-100">
                                <div class="col-lg-12 pr-lg-0">
                                    <ul class="nav navbar-nav ml-auto justify-content-end">
                                        <li class="nav-item">
                                            <a class="nav-link" @click="goTo('/')">Início</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" @click="goTo('/company')">Empresa</a>
                                        </li>
                                        <li class="nav-item ">
                                            <a class="nav-link" href="about.html">Missão</a>
                                        </li>
                                        <li class="nav-item ">
                                            <a class="nav-link" href="services.html">Unidades</a>
                                        </li>
                                        <!-- <li class="nav-item submenu dropdown">
                                            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                            aria-expanded="false">Pages</a>
                                            <ul class="dropdown-menu">
                                                <li class="nav-item">
                                                    <a class="nav-link" href="elements.html">Elements</a>
                                                </li>
                                            </ul>
                                        </li> -->
                                        <li class="nav-item">
                                            <a class="nav-link" href="contact.html">Instalações</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="contact.html">Tecnologia</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="contact.html">Serviços</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#toHere" v-smooth-scroll>Central De Relacionamento</a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        <!--================Header Menu Area =================-->
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data () {
            return {
                navFixed: false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.updateScroll);
        },
        methods: {
            goTo(_route){
                if(this.$router.currentRoute.path != _route){
                    this.$router.push(_route);
                }
            },
            updateScroll(){
                var scroll = window.scrollY;
                var headerHeight = 125;
                this.scrollPosition = window.scrollY;

                if (scroll >= headerHeight) {
                    this.navFixed = true;
                } else {
                    this.navFixed = false;
                }
            }    
        }
    }
</script>

<style>
</style>

