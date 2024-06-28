import { createStore } from 'vuex';
import _ from 'lodash'
import axios from 'axios'

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
      state.isDraggable = payload
    },
    async save(state) {
      try {
        const response = await axios.post(`http://localhost/api/v1/save`, { menu: state.selectedMenu, data: state.foods})
      } catch (error) {
        console.log(error.message)
      } finally {

      }
      localStorage.setItem(`menu${state.selectedMenu}`, JSON.stringify(state.foods))
    },
    load(state) {
      let data = localStorage.getItem(`menu${state.selectedMenu}`)
      state.foods = data ? JSON.parse(data) : [];
    },
    saveFood(state, payload) {
      state.foods = [...state.foods, payload]
      payload.callback()
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
    },
    SET_MENUS(state, payload) {
      state.menus = payload
    },
    ADD_MENU(state, payload) {
      state.menus.push(payload)
    },
    DELETE_MENUS(state, payload) {
      state.menus = state.menus.filter(item => item != payload)
    },
    UPDATE_MENU(state, payload) {
      state.menus = state.menus.map(item => item == payload.old ? payload.new : item)
    },
    CHANGE_SEL_MENU(state, payload) {
      state.selectedMenu = payload
    },
    GET_FOOD(state, payload) {
      state.foods = payload
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
    },
    async changeSelMenu({ commit }, payload) {
      commit('CHANGE_SEL_MENU', payload)
      try {
        const response = await axios.get(`http://localhost/api/v1/menus/${payload}`);
        commit('GET_FOOD', response.data);
      } catch (error) {
        console.log(error.message)
        commit('GET_FOOD', []);
      } finally {

      }
    },
    async addMenu({ commit }, payload) {
      try {
        const response = await axios.post('http://localhost/api/v1/menus', { menu: payload });
        commit('ADD_MENU', payload);
      } catch (error) {
        console.log(error.message)
      } finally {

      }
    },
    async getMenus({ commit }, payload) {
      try {
        const response = await axios.get('http://localhost/api/v1/menus');
        commit('SET_MENUS', response.data);
      } catch (error) {
        console.log(error.message)
      } finally {

      }
    },
    async deleteMenu({ commit }, payload) {
      try {
        const response = await axios.delete('http://localhost/api/v1/menus/' + payload);
        commit('DELETE_MENUS', payload);
      } catch (error) {
        console.log(error.message)
      } finally {

      }
    },
    async updateMenu({ commit }, payload) {
      try {
        const response = await axios.patch('http://localhost/api/v1/menus/' + payload.old);
        commit('UPDATE_MENUS', payload);
      } catch (error) {
        console.log(error.message)
      } finally {

      }
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
    },
    getMenus(state) {
      return state.menus
    }
  },
});

export default store;
