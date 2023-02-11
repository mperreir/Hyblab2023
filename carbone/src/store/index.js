
import { createStore } from "vuex";

 
 
export default createStore({
namespaced: true,
 state: {
    selectedFestival : '',
    map : null,
 },
 getters: {
    changeSelectedFestival (state, payload){
        state.selectedFestival = payload
    },
    
 },
 mutations: {
    setMap(state, map) {
        state.map = map;
        }
 },
 actions: {
    initMap(context,payload){
        context.commit("setMap",payload)
    },
    setMap({ commit }, map) {
        commit('setMap', map);
    }
 }
});