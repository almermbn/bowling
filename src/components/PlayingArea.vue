<template>
<div id="wrapper">
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey old-sports-text">Estimar Lançamento</h3>
                    
                    <div class="box list-item">
                        <b-field label="" type="">
                            <b-input placeholder="Comprimento do óleo" 
                                icon-pack="fas" 
                                icon="calculator" 
                                type="number" 
                                min="32" 
                                max="44"
                                @input="calculate"
                                v-model="oil">
                            </b-input>
                        </b-field>     
                    </div>
                    <transition-group name="list" tag="p">
                        <div class="box" v-show="showData" v-for="n in 4" v-bind:key="n">
                            <img src="https://via.placeholder.com/350x150">
                        </div>
                    </transition-group>

                    <div class="box">
                    	<iframe width="100%" 
                            height="260" 
                            src="https://www.youtube.com/embed/lHIpf_09ZAc" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
</div>  
</template>

<script>
    export default {
        name: 'PlayingArea',
        data () {
            return {
            	oil: '',
                showData: ''
            }
        },
        methods: {
            calculate(_val){
                if(_val >= 32 && _val <= 44){
                    this.showData = true;
                    this.success();
                } else {
                    this.showData = false;
                }
            },
            success() {
                this.$toast.open({
                    message: 'Lançamento calculado',
                    type: 'is-success'
                })
            },
        }
    }
</script>


<style scoped>
    .box {
        background-image: -webkit-gradient(linear, 0 100%, 0 0, from(orange), to(gold));
    }
    .help.is-danger {
        color: #7a7a7a !important;
    }
    .list-item {
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
</style>
