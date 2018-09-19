<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
          <v-list-tile @click="userSignOut">
            <v-list-tile-action>
             <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Sign Out</v-list-tile-content>
          </v-list-tile>
       </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn v-if="isAuthenticated" flat @click="userSignOut">
          <v-icon left>exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
    <v-content>
      <router-view/>
    </v-content>
    <!-- <div id="app">
      <div id="nav">
      </div>
    </div> -->
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        // appTitle: 'Shop',
        sidebar: false,
      }
    },
    computed: {
      appTitle() {
        return this.$store.state.appTitle
      },
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      },
      menuItems() {
        if (this.isAuthenticated) {
          return [
            { title: 'Home', path: '/home', icon: 'home' }
          ]
        } else {
          return [
            { title: 'Sign Up', path: '/signup', icon: 'face' },
            { title: 'Sign In', path: '/signin', icon: 'lock_open' }
          ]
        }
      } 
    },
    methods: {
      userSignOut () {
        this.$store.dispatch('userSignOut')
      }
    }
  }
</script>
<style>
@import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
