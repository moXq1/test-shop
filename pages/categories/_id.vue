<template>
  <product-list :products="products"></product-list>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },

  head() {
    return {
      title: this.$route.params.id,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `This page contain items of category ${this.$route.params.id}`
        }
      ]
    };
  },

  async fetch() {
    try {
      const category = this.$route.params.id;
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );

      this.products = await res.json();
    } catch (e) {
      this.$store.commit("store/setIsError", true);
      console.log(e);
    }
  }
};
</script>
