<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" absolute app dark>
        <v-list class="pa-1">
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <!-- TODO: Pegar, do banco de dados, nome do usuário logado baseado no email -->
            <v-list-tile-content>
              <v-list-tile-title>Diego Moura</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

      <v-list>
        <v-divider light></v-divider>

        <!-- <v-list-tile to="/home">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Home</v-list-tile-content>
        </v-list-tile> -->

        <v-list-group  prepend-icon="account_circle" no-action v-if="this.isAuthenticated">
          <v-list-tile slot="activator">
            <v-list-tile-title>Discipulos</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-for="item in menuDiscipulos"
            :key="item.title"
            :to="item.path">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile v-if="isAuthenticated" @click="userSignOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

   <v-toolbar app v-if="this.isAuthenticated">
      <span>
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">
           {{ appTitle }}
          </router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="isAuthenticated" @click="userSignOut">
          <v-icon left>exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items> -->
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sidebar: false
    }
  },
  methods: {
    userSignOut () {
      this.$store.dispatch('userSignOut')
    }
  },
  computed: {
    appTitle () {
      return this.$store.state.appTitle
    },
    activeUser () {
      return this.$store.state.user
    },
    menuDiscipulos () {
      if (this.isAuthenticated) {
        return [
          { title: 'Visualisar', path: '/discipulos', icon: 'people' },
          { title: 'Cadastrar', path: '/cadastrar', icon: 'person' }
        ]
      }
    },
    menuItems () {
      if (this.isAuthenticated) {
        return [{ title: 'Home', path: '/home', icon: 'home' }]
      }

      return [{ title: 'Sign In', path: '/signin', icon: 'lock_open' }]
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
