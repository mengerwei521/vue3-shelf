
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"
import app from './module/app'


export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        app
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
});
