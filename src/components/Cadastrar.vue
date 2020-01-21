<template>
  <v-container fluid>
    <v-layout row wrap>
        <!-- <v-flex xs12 class="text-xs-center" mt-5>
          <h1>Cadastro de Discipulo</h1>
        </v-flex> -->
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-snackbar
          v-model="snackbar"
          absolute
          top
          right
          color="success"
          >
          <span>Cadastro realizado com sucesso!</span>
          <v-icon dark>check_circle</v-icon>
        </v-snackbar>
        <v-form @submit.prevent="submit" ref="form">
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
                v-model="form.nome"
                :rules="rules.nome"
                required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                solo
                name="email"
                label="Email"
                id="email"
                v-model="form.email"
                :rules="rules.email"
                required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                solo
                name="cobertura"
                label="Cobertura"
                id="cobertura"
                :rules="rules.cobertura"
                type="text"
                v-model="form.cobertura"
                required></v-text-field>
            </v-flex>
            <v-flex xs7>
              <v-text-field
                solo
                label="Celular"
                id="cel"
                type="text"
                v-model="form.telefone"
                :rules="rules.telefone"
                mask="(##) #####-#### "
                required
            ></v-text-field>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <v-select
                  solo
                  v-model="form.estadoCivilSelecionado"
                  :rules="rules.estadoCivil"
                  label="E. Civil"
                  :items="estadoCivil">
              </v-select>
            </v-flex>
            <v-flex d-flex xs12>
              <v-layout row wrap>
                <v-flex d-flex xs5>
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="form.nascimento"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-text-field
                      solo
                      slot="activator"
                      :value="dataFormatada"
                      label="D. Nascimento"
                      readonly
                      :rules="rules.nascimento"
                    ></v-text-field>
                    <v-date-picker v-model="form.nascimento" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(form.nascimento)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>

                </v-flex>
                <v-flex d-flex xs6 offset-xs1>
                  <v-text-field
                    solo
                    label="Idade"
                    id="idade"
                    type="number"
                    v-model="idade"
                    disabled
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-select
                  solo
                  v-model="form.situacaoSelecionada"
                  :rules="rules.situacao"
                  label="Situação"
                  :items="situacao">
              </v-select>
            </v-flex>
            <v-flex class="text-xs-center" mt-3>
              <!-- <v-btn :disabled="!formIsValid" color="primary" type="submit">Cadastrar</v-btn> -->
              <v-btn color="primary" type="submit">Cadastrar</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// TODO: REFATORAR VALIDAÇÃO DO FORMULÁRIO... PQ ASSIM TÁ RUIM
import moment from 'moment'

export default {
  data () {
    const defaultForm = Object.freeze({
      nome: '',
      email: '',
      cobertura: '',
      telefone: '',
      estadoCivilSelecionado: '',
      situacaoSelecionada: '',
      inclusao: null,
      nascimento: null
    })

    return {
      form: Object.assign({}, defaultForm),
      rules: {
        nome: [val => (val || '').length > 0 || 'Informe o nome do discípulo!'],
        idade: [val => val > 1 || 'Informe a idade do discipulo!'],
        cobertura: [(v) => !!v || 'Informe uma cobertura'],
        nascimento: [(v) => !!v || 'Informe a Data de Nascimento!'],
        email: [
          (v) => !!v || 'Informe um email!',
          (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Informe um email válido!'
        ],
        telefone: [
          val => (val || '').length === 11 || 'Informe um número de celular'
        ],
        estadoCivil: [
          (v) => !!v || 'Campo obrigatório!'
        ],
        situacao: [val => (val || '').length > 0 || 'Informe a situação do discipulo!']
      },
      estadoCivil: ['Casado', 'Solteiro', 'Divorciado', 'Criança'],
      situacao: ['Vinculado', 'Novo na Fé', 'Aguardando Confirmação'],
      error: null,
      alert: false,
      snackbar: false,
      date: null,
      modal: null,
      defaultForm
    }
  },

  computed: {
    formIsValid () {
      return (
        this.form.nome &&
        this.form.email &&
        this.form.telefone &&
        this.form.estadoCivilSelecionado &&
        this.form.situacaoSelecionada &&
        this.form.nascimento &&
        true
      )
    },
    dataFormatada () {
      return this.form.nascimento
        ? moment(this.form.nascimento).format('DD/MM/YYYY') : ''
    },
    idade () {
      let birthday = +new Date(this.form.nascimento)
      return ~~((Date.now() - birthday) / (31557600000))
    }
  },

  methods: {
    resetForm () {
      this.form = Object.assign({}, this.defaultForm)
      this.$refs.form.reset()
    },
    submit () {
      if (!this.$refs.form.validate()) { return }
      this.form.idade = this.idade
      this.form.inclusao = new Date()
      this.$store.dispatch('salvarDiscipulo', this.form)
      this.snackbar = true
      this.resetForm()
    }
  }
}
</script>
