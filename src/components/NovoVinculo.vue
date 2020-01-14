<template>
  <v-layout column fill-height>
    <v-flex class="text-xs-center">
       <p class="headline mt-3">{{this.discipulo.nome}}</p>
      <v-text-field
        class="mt-3"
        append-icon="search"
        v-model="query"
        solo></v-text-field>
    </v-flex>
    <v-flex xs12>
      <ListaDiscipulos :filter="query" vinculo/>
    </v-flex>

    <v-btn color="success" type="submit">Salvar</v-btn>
  </v-layout>
</template>
<script>
const fb = require('../firebaseConfig.js')
import ListaDiscipulos from './ListaDiscipulos'

export default {
  components: {
    ListaDiscipulos
  },
  created () {
    let uid = this.$route.params.uid
    fb.db.collection('discipulos').doc(uid)
      .get().then(snapshot => {
        this.discipulo = snapshot.data()
      })
  },
  data () {
    return {
      discipulo: '',
      query: ''
    }
  }
}

</script>
