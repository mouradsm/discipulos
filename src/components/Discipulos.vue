<template>
  <v-layout row>
    <v-flex>
     <v-text-field
        class="mt-3"
        append-icon="search"
        v-model="query"
        solo></v-text-field>

        <ListaDiscipulos :filter="query" detalhe />
    </v-flex>
  </v-layout>
</template>

<script>
import router from '../router'
import ListaDiscipulos from './ListaDiscipulos'

// const fb = require('../firebaseConfig.js')

export default {
  components: {
    ListaDiscipulos
  },
  data () {
    return {
      router: router,
      query: ''
      // discipulos: []
    }
  }
}
</script>
<style scope>

</style>
