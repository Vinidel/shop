<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex>
        <v-alert type="error" dismissible v-model="alert">
          {{ error }}
        </v-alert>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign Up</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form v-on:submit.prevent="register">
          <v-layout column>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                v-model="confirmPassword"
                :rules="[comparePasswords]"
                required
                ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit" :disabled="loading">Sign Up</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      alert: false,
      err: '',
    };
  },
  computed: {
    comparePasswords () {
      return this.password === this.confirmPassword || 'Password dont match';
    },
    error () {
      return this.$store.state.error;
    },
    loading () {
      return this.$store.state.loading;
    }
  },
  methods: {
    register() {
         if (this.comparePasswords !== true) {
             return;
          }
        return this.$store.dispatch('userSignUp', { email: this.email, password: this.password });
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.custom-error {
  color: red
}
</style>
