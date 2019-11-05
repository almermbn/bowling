<template>
    <div id="app">
        <div class="header">
            <ul>
                <li><a href="#"><i class="fab fa-facebook-square"></i></a></li>
                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                <li><a href="#"><i class="fab fa-instagram"></i></a></li>
            </ul>
            <ul>
                <li class="contacts"><i class="fas fa-phone"></i> <a href="#">031-93235-1253</a> </li>
                <li class="contacts"><i class="fas fa-envelope"></i> <a href="#">contact@maktub.com</a></li>
            </ul>
        </div>
        <div>
            <b-navbar mobile-burger wrapper-class="wrapper-nav">
                <template slot="brand">
                    <b-navbar-item tag="router-link" :to="{ path: '/' }">
                        <img
                        src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                        >
                    </b-navbar-item>
                </template>
                <template slot="end">
                    <b-navbar-item href="#">
                        Empresa
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Missão
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Instalações
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Unidades
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Tecnologia
                    </b-navbar-item>
                </template>
            </b-navbar>
        </div>
        
        <!-- renders current route node-->
        <router-view/></router-view>

    </div>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return { 
            }
        },       
        methods: {
        }
    }
</script>

<style lang="scss">
    @import url('../node_modules/animate.css/animate.min.css');
    @import url('../node_modules/@fortawesome//fontawesome-free/css/all.css');
    @import url('../node_modules/vue-animate-transitions/dist/vue-animate-transitions.min.css');

    /* override bulma css here */
    $primary: #363636;

     /* end override */

    @import "~bulma";
    @import "~buefy/src/scss/buefy";
    body {
        font-family: "Roboto Condensed", sans-serif;
        font-weight: 700;
    }
    .header {
        height: 60px;
        width: 100%;
        background-color: #262533;
        display: flex;
        padding: 18px 0;
        justify-content: space-evenly;
        flex-wrap: wrap;
        ul li {
            display: inline-block;
            margin-left: 15px;
        }
        ul li a {
            color: #ffffff;
        }
        ul li.contacts i {
            color: red;
            padding: 0 5px;
        }
    }

    a.navbar-item:focus, a.navbar-item:focus-within, a.navbar-item:hover, a.navbar-item.is-active, .navbar-link:focus, .navbar-link:focus-within, .navbar-link:hover, .navbar-link.is-active {
        color: #e72727;
    }

    @media (min-width: 1281px) { 
        .wrapper-nav {
            display: flex;
            justify-content: space-around !important;
            padding: 0 10%;
            width: 100%
        }
    }

    /* Medium screens */
    @media all and (max-width: 800px) {
        .header {
            background-color: #fafafa;
            color: #3273dc;
        }
    }

    /* Small screens */
    @media all and (max-width: 500px) {
        .header {
            display: none;
        }
    }

    
</style>
