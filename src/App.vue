<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    @import url('../node_modules/@fortawesome//fontawesome-free/css/all.css');

    body {
        font-family: 'Open Sans'
    }
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px white inset;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
    }
    -webkit-box-shadow: 0 0 0px 1000px white inset;
</style>
