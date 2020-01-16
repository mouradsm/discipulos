import Vue from 'vue'
import Vuex from 'vuex'
// import { router } from 'sw-toolbox'
import router from '@/router'
const fb = require('../firebaseConfig.js')

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appTitle: 'Gestão de Discipulos',
    discipulo: null,
    user: null,
    error: null,
    loading: false,
    discipulos: []
  },
  mutations: {
    setAppTitle (state, payload) {
      state.appTitle = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    salvarDiscipulo (state, payload) {
      state.discipulo = payload
    }
  },
  actions: {
    setAppTitle ({commit}, payload) {
      commit('setAppTitle', payload)
    },
    userSignIn ({ commit }, payload) {
      commit('setLoading', true)
      fb.auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then((firebaseUser) => {
          commit('setUser', { uid: firebaseUser.user.uid, email: firebaseUser.user.email })
          commit('setError', null)
          router.push('/')
        })
        .catch((error) => {
          commit('setError', error.message)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', {
        uid: payload.uid,
        email: payload.email
      })
    },
    userSignOut ({ commit }) {
      fb.auth.signOut()
      commit('setUser', null)
      router.push('/signin')
    },
    salvarDiscipulo ({ commit }, payload) {
      payload.uid = store.state.user.uid
      const discipulo = {
        nome: payload.nome,
        email: payload.email,
        cobertura: payload.cobertura,
        estado_civil: payload.estadoCivilSelecionado,
        telefone: payload.telefone,
        idade: payload.idade,
        situacao: payload.situacaoSelecionada,
        nascimento: payload.nascimento,
        parent_id: payload.uid,
        inclusao: new Date()

      }

      commit('setLoading', true)
      fb.db.collection('discipulos').add(discipulo)
        .then((docRef) => {
          commit('salvarDiscipulo', discipulo)
          commit('setError', null)
          console.log('Documento criado: ',
            docRef.id)
        })
        .catch((error) => {
          commit('setError', error.message)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    discipulos (state) {
      return state.discipulos
    }
  }
})
