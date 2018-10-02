<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Cadastro de Discipulo</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-form @submit.prevent="userSignIn" ref="form">
          <v-layout row wrap>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex xs12>
              <v-text-field
               solo
                name="nome"
                label="Nome"
                id="nome"
                type="text"
                v-model="nome"
                required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
               solo
                name="email"
                label="Email"
                id="email"                
                v-model="email"
                required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                solo
                name="cobertura"
                label="Cobertura"
                id="cobertura"
                type="text"
                v-model="cobertura"
                required></v-text-field>
            </v-flex>
            <v-flex xs7>
              <v-text-field
                solo
                label="Celular"
                id="cel"
                type="text"
                v-model="cel"
                mask="(##) #####-#### "
                required
            ></v-text-field>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <v-select
                  solo
                  label="E. Civil"
                  :items="estadoCivil">
              </v-select>
            </v-flex>
            <v-flex>
              <v-slider
                label="Idade"
                color="green"
                min="10"
                max="60"
                thumb-label
              ></v-slider>
            </v-flex>
            <v-flex xs12>
              <v-select
                  solo
                  label="Situação"
                  :items="situacao">
              </v-select>
            </v-flex>
            <v-flex class="text-xs-center" mt-3>
              <v-btn color="primary" type="submit">Cadastrar</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    const defaultForm = Object.freeze({
      nome: '',
      email: '',
      cobertura: '',
      telefone: '',
      idade: null,
      error: null
    })

    return {
      form: Object.assign({}, defaultForm),
      defaultForm,

      nome: '',
      email: '',
      cobertura: '',
      telefone: '',
      estadoCivilSelecionado: '',
      situacaoSelecionada: '',
      idade: null,
      error: null,
      alert: false,
      estadoCivil: ['Casado', 'Solteiro', 'Divorciado', 'Criança'],
      situacao: ['Vinculado', 'Novo na Fé', 'Aguardando Confirmação']
    }
  }
}
</script>
