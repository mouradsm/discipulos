<template>
<v-layout row class="cc" fill-height>
    <v-flex xs12 sm6 offset-sm3>
      <span v-show="!filteredItens.length" class="subheading">Nenhum discipulo encontrado</span>

      <v-card v-if="filteredItens.length">
        <v-list two-line sub-header>
          <template v-for="(item, index) in filteredItens">
              <v-list-tile :key="item.nome">
                <v-list-tile-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{item.nome}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{item.cobertura}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action v-show="detalhe">
                  <v-btn icon @click="router.push({path: '/detalhe/' + item.uid})">
                      <v-icon>arrow_forward</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action v-show="vinculo">
                  <v-flex>
                    <v-btn icon v-if="!isVinculo(item.uid)" @click="addVinculo(item.uid)" key="add">
                      <v-icon color="green lighten-1">add</v-icon>
                    </v-btn>
                    <v-btn icon v-else @click="removeVinculo(item.uid)" key="remove">
                      <v-icon color="red">clear</v-icon>
                    </v-btn>
                  </v-flex>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="!(index == filteredItens.length - 1)" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
      <div class="counter elevation-3">
        <p class="">{{filteredItens.length}}</p>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import router from '../router'
const fb = require('../firebaseConfig.js')

export default {
  name: 'ListaDiscipulos',
  props: {
    filter: String,
    vinculo: Boolean,
    detalhe: Boolean
  },
  mounted () {
    fb.db.collection('discipulos').get().then(spanshot => {
      spanshot.forEach(doc => {
        let discipulo = doc.data()
        this.discipulos.push({'uid': doc.id, ...discipulo})
      })
    })
  },
  computed: {
    filteredItens () {
      const search = this.filter.toLowerCase().trim()

      if (!search) return this.discipulos

      return this.discipulos.filter(d => d.nome.toLowerCase().indexOf(search) > -1)
    }
  },
  data () {
    return {
      router: router,
      discipulos: [],
      listaVinculos: [],
      objVinculo: {}

    }
  },
  methods: {
    addVinculo (uid) {
      this.listaVinculos.push(uid)
    },
    removeVinculo (uid) {
      this.listaVinculos.splice(this.listaVinculos.indexOf(uid), 1)
    },
    isVinculo (uid) {
      return this.listaVinculos.indexOf(uid) > -1
    },
    saveVinculo (uid) {
    }
  }
}
</script>
<style scoped>

  .counter {
    background-color: gainsboro;
    position: fixed;
    bottom: 0px;
    text-align: center;
    font: 1.5em sans-serif;
    width: 100%;
  }

  .counter p {
    padding-top: 15px;
    opacity: 50%;
  }

</style>
