import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

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

    module: {}
});