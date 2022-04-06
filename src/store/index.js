import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export default new Vuex.Store({
    state: {
        user: null,
    },
    actions: {
        setCurrentUser(context, user) {
            context.commit("currentUser", user);
        }
    },

    mutations: {
        currentUser(state, user) {
            state.user = user;
        }
    },

    getters: {
        getCurrentUser: state => {
          return state.user
        }
    },
    plugins: [vuexLocal.plugin],
    module: {}
});
