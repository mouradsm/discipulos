<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line sub-header>
          <v-subheader >Discipulos</v-subheader>
          <v-divider></v-divider>
          <template v-for="(item, index) in discipulos">
              <v-list-tile :key="item.nome" @click="router.push({path: '/detalhe/' + item.uid})">
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
const fb = require('../firebaseConfig.js')
import router from '../router'
export default {
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
  }
}
</script>
<style scope>

</style>
