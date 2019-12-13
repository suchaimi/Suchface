import Vue from 'vue'
import Vuex from 'vuex'
import { STATUS_OPTIONS } from './utils/config'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        room: undefined,
        username: undefined,
        status: STATUS_OPTIONS.available,
        rooms: []
    },
    mutations: {

    },
    actions: {

    }
})
