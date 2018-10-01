<template>
  <v-container fluid class="login">
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <img src="@/assets/people-icon.png" />
        <!-- <h1>LOGIN</h1> -->
      </v-flex>
      </v-layout>
      <!-- <v-flex xs12 sm6 offset-sm3 mt-3> -->
        <v-layout>
        <v-flex xs12 sm6 offset-sm3 mt-3 lg4 offset-lg4>
        <form @submit.prevent="userSignIn">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex>
              <v-text-field
                solo
                append-icon="email"
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                solo
                append-icon="lock"
                name="password"
                label="Senha"
                id="password"
                type="password"
                v-model="password"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center">
              <v-btn color="primary" type="submit">Entrar</v-btn>
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
      email: '',
      password: '',
      alert: false
    }
  },
  methods: {
    userSignIn () {
      this.$store.dispatch('userSignIn', {
        email: this.email,
        password: this.password
      })
    }
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>
<style scoped>
.login {
  height: 100%;
}

.login img {
  width: 15em;
  height: auto;
}
</style>
