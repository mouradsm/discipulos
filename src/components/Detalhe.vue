<template>
  <v-layout column fill-height>

    <v-flex xs12 sm6 offset-sm3>
      <v-card class="fill-height">
        <v-img
          src="https://cdn.vuetifyjs.com/images/lists/ali.png"
          height="300px"
        >
          <v-layout
            column
            fill-height
          >
            <v-card-title>
              <v-btn dark icon @click="$router.go(-1)">
                <v-icon>chevron_left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn dark icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>

              <!-- <v-btn dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn> -->
              <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn dark icon v-on="on"              >
                <v-icon>more_vert</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-tile
                v-for="(item, i) in menuItems"
                :key="i"
                :to="item.link"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text">
              <v-layout column align-center>
                <div class="display-1">{{discipulo.nome}}</div>
                <div class="">({{discipulo.cobertura}})</div>
              </v-layout>
            </v-card-title>
          </v-layout>
        </v-img>

        <v-list two-line>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>people</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{discipulo.estadoCivil}}</v-list-tile-title>
              <v-list-tile-sub-title>Estado Civil</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{discipulo.telefone}}</v-list-tile-title>
              <v-list-tile-sub-title>Celular</v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{discipulo.email}}</v-list-tile-title>
              <v-list-tile-sub-title>Email</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>person_add</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{discipulo.situacao}}</v-list-tile-title>
              <v-list-tile-sub-title>Situação</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>calendar_today</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{discipulo.nascimento | moment("DD/MM/YYYY")}}</v-list-tile-title>
              <v-list-tile-sub-title>Nascimento</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>emoji_people</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Vínculos</v-list-tile-title>
              <v-list-tile-sub-title>Todos os vínculos do discípulo</v-list-tile-sub-title>
            </v-list-tile-content>
             <v-list-tile-action>
                  <v-btn icon @click="router.push({path: '/vinculos/' + discipulo.uid})">
                      <v-icon>chevron_right</v-icon>
                  </v-btn>
                </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex class="digalog-container">
      <v-dialog v-model="dialog" persistent max-width="290" class="cc1">
        <template v-slot:activator="{ on }">
          <v-btn color="error" block v-on="on">Remover</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Tem certeza?</v-card-title>
          <v-card-text>A remoção de um registro é permante e impossível de ser desfeita.
            Deseja realmente continuar?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click="dialog = false">Cancelar</v-btn>
            <v-btn color="green darken-1" flat @click="removerDiscipulo(discipulo.uid)">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>
<script>
const fb = require('../firebaseConfig.js')

import router from '../router'
export default {

  created () {
    let uid = this.$route.params.uid
    fb.db.collection('discipulos').doc(uid)
      .get().then(snapshot => {
        this.discipulo = {'uid': uid, ...snapshot.data()}
        this.menuItems.push({title: 'Adicionar Vinculo', 'link': `/add-vinculo/${uid}`})
      })
  },
  computed: {
    uid: () => this.discipulo.uid
  },
  methods: {
    format_date (value) {
      if (value) { return value }
    },
    removerDiscipulo (uid) {
      fb.db.collection('discipulos').doc(uid).delete()
        .then(() => {
          router.go(-1)
        }).catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.dialog = false
        })
    }
  },
  data: () => ({
    router: router,
    dialog: false,
    menuItems: [],
    discipulo: ''
  })

}

</script>
<style scoped>
.digalog-container {
  height: 45px;
  overflow: hidden;
}
</style>
