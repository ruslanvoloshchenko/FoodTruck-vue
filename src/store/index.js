import { createStore } from 'vuex';
import _ from 'lodash'

const logo = {
  "id": 0,
  "phonenumber": "443-979-0589",
  "type": "logo",
  "initPos": {
    "x": 0,
    "y": 0
  },
  "initSize": {
    "w": 350,
    "h": 380
  }
};

const store = createStore({
  state: {
    isDraggable: true,
    isDark: false,
    selectedMenu: 1,
    menus: [],
    foods: [logo],
    isEdit: null,
  },
  mutations: {
    setDark(state, payload) {
      state.isDark = payload
    },
    setDraggable(state, payload) {
      console.log("m", payload)
      state.isDraggable = payload
    },
    save(state) {
      localStorage.setItem(`menu${state.selectedMenu}`, JSON.stringify(state.foods))
    },
    load(state) {
      let data = localStorage.getItem(`menu${state.selectedMenu}`)
      state.foods = data ? JSON.parse(data) : [];
    },
    saveFood(state, payload) {
      state.foods = [...state.foods, payload]
      localStorage.setItem(`menu${state.selectedMenu}`, JSON.stringify(state.foods))
    },
    deleteFood(state, payload) {
      state.foods = state.foods.filter(item => item.id != payload.id)
      localStorage.setItem(`menu${state.selectedMenu}`, JSON.stringify(state.foods))
    },
    edit(state, payload) {
      state.isEdit = payload
    },
    updateFood(state, payload) {
      state.foods = state.foods.map(item => item.id != payload.id ? item: payload )
      localStorage.setItem(`menu${state.selectedMenu}`, JSON.stringify(state.foods))
    }
  },
  actions: {
    setDraggable({ commit }, payload) {
      commit('setDraggable', payload)
    },
    setDart({ commit }, payload) {
      commit('setDart', payload)
    },
    save({ commit }) {
      commit('save')
    },
    load({ commit }) {
      commit('load')
    },
    saveFood({ commit }, payload) {
      commit('saveFood', payload)
    },
    deleteFood({ commit }, payload) {
      commit('deleteFood', payload)
    },
    edit({ commit }, payload) {
      commit('edit', payload)
    },
    updateFood({ commit }, payload) {
      commit('updateFood', payload)
    }
  },
  getters: {
    getDraggable(state) {
      return state.isDraggable
    },
    getDark(state) {
      return state.isDark
    },
    getEdit(state) {
      return state.isEdit
    }
  },
});

export default store;
