<template>
<v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
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
              </v-list-tile>
              <v-divider v-if="!(index == discipulos.length - 1)" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import router from '../router'

const fb = require('../firebaseConfig.js')

export default {
  name: 'ListaDiscipulos',
  computed: {
    filteredItens () {
      const search = this.filter.toLowerCase().trim()

      if (!search) return this.discipulos

      return this.discipulos.filter(d => d.nome.toLowerCase().indexOf(search) > -1)
    }
  },
  mounted () {
    fb.db.collection('discipulos').get().then(spanshot => {
      spanshot.forEach(doc => {
        let discipulo = doc.data()
        this.discipulos.push({'uid': doc.id, ...discipulo})
      })
    })
  },
  data () {
    return {
      router: router,
      discipulos: []
    }
  },
  props: ['filter']
}
</script>
