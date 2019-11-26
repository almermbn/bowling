<template>
<div id="wrapper-company">

    <Banner :title="title"></Banner>

   <!--================ Feature Area =================-->
   <section class="feature-area section_gap_top">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-lg-7">
                    <div class="row">
                        <div class="col-lg-6 col-md-6">
                            <div class="single-feature">
                                <img src="../assets/img/feature/f1.png" alt="">
                                <h4>RASTREIO</h4>
                                <p>
                                    EM BREVE - Faça o Rastreio de suas encomendas aqui.
                                </p>
                                <a href="#">Rastrei sua Encomenda</a>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="single-feature">
                                <img src="../assets/img/feature/f2.png" alt="">
                                <h4>Have a Question?</h4>
                                <p>
                                    The French Revolutioncons tituted for the conscience of the dominant the French Revolutioncons.
                                </p>
                                <a href="#">Fale Conosco</a>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="single-feature">
                                <img src="../assets/img/feature/f3.png" alt="">
                                <h4>Get a Quote</h4>
                                <p>
                                    The French Revolutioncons tituted for the conscience of the dominant the French Revolutioncons.
                                </p>
                                <a href="#">Start a quote</a>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="single-feature">
                                <img src="../assets/img/feature/f4.png" alt="">
                                <h4>Simule a Cotação do Frete</h4>
                                <p>
                                    EM BREVE - Faça aqui sua cotação de frete.
                                </p>
                                <a href="#">Simular Cotação</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-5 offset-md-0 col-md-12 text-left section-title-wrap">
                    <h5>About Our Company</h5>
                    <h2>
                        We’re Carefully <br>
                        Delivering your <br>
                        happiness.
                    </h2>

                    <h4>f you are looking at blank cassettes on the web lorem ipsum dolor sit consectetur adipisicing elit,
                    eiusmod tempor incididunt.</h4>
                    <p>
                        If you are looking at blank cassettes on the web lorem ipsum dolor sit amet, consectetur adipisicing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Eiusmod tempor
                        incididunt ut labore et dolore magna aliqua consectetur adipisicing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua.
                    </p>
                    <a href="#" class="main_btn">Learn More About Us</a>
                </div>
            </div>
        </div>
    </section>
    <!--================ End Feature Area =================-->
</div>  
</template>

<script>

    import Banner from './Banner.vue';

    export default {
        name: 'Company',
        components: { Banner },
        data () {
            return {
                title: 'Empresa'
            }
        },
        methods: {
            
        }
    }
</script>

<style scoped lang="scss">
   
</style>
