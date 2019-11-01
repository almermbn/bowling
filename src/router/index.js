import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Statistics from '@/components/Statistics'
import PlayingArea from '@/components/PlayingArea'
import Oils from '@/components/Oils'
import RegisterMatch from '@/components/RegisterMatch'
import Ranking from '@/components/Ranking'
import Events from '@/components/Events'
import EventsList from '@/components/EventsList'

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/',
        name: 'Home',
        component: Home,
        mode: 'abstract'
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: Statistics,
        mode: 'abstract'
    },
    {
        path: '/playingArea',
        name: 'PlayingArea',
        component: PlayingArea,
        mode: 'abstract'
    },
    {
        path: '/oils',
        name: 'Oils',
        component: Oils,
        mode: 'abstract'
    }
    ,
    {
        path: '/registerMatch',
        name: 'RegisterMatch',
        component: RegisterMatch,
        mode: 'abstract'
    },
    {
        path: '/ranking',
        name: 'Ranking',
        component: Ranking,
        mode: 'abstract'
    },
    {
        path: '/events',
        name: 'Events',
        component: Events,
        mode: 'abstract'
    },
    {
        path: '/eventsList',
        name: 'EventsList',
        component: EventsList,
        mode: 'abstract'
    }
    ]
})
