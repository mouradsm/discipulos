<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Cadastro de Discipulo</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="userSignIn">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex>
              <v-text-field

                name="nome"
                label="Nome"
                id="nome"
                type="text"
                v-model="nome"
                required></v-text-field>
              <v-text-field

                name="cobertura"
                label="Cobertura"
                id="cobertura"
                type="text"
                v-model="cobertura"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      nome: '',
      email: '',
      cobertura: '',
      error: null,
      alert: false
    }
  }
}
</script>
