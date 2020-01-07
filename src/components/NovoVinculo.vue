<template>
  <v-layout row fill-height>
    <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
       <p class="headline mt-3">{{this.discipulo.nome}}</p>

      <v-text-field
        class="mt-3"
        append-icon="search"
        v-model='query'
        solo></v-text-field>

    </v-flex>
  </v-layout>
</template>
<script>
const fb = require('../firebaseConfig.js')

export default {
  created () {
    let uid = this.$route.params.uid
    fb.db.collection('discipulos').doc(uid)
      .get().then(snapshot => {
        this.discipulo = snapshot.data()
        console.log(this.discipulo)
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
