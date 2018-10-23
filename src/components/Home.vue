<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a user's home page</p>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-card v-for="(product) in products" :key="product._id">
          <v-img
            src="https://SetBeyond.TV/wp-content/uploads/Travelers_S1.jpg"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{product.name}}</h3>
              <div></div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    getProducts() {
      return this.$store.dispatch('getProducts');
    }
  },
  computed: {
   products() {
     return this.$store.state.products.list;
   } 
  },
  beforeMount() {
    this.getProducts();
  }
};
</script>