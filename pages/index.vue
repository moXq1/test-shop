<template>
  <product-list :products="products"></product-list>
</template>

<script>
import ProductList from "~/components/ProductList.vue";
export default {
  components: { ProductList },
  data() {
    return {
      products: []
    };
  },

  head: {
    title: "Homepage",
    meta: [
      { hid: "description", name: "description", content: "All the products" }
    ]
  },

  async fetch() {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      this.products = await res.json();
    } catch (e) {
      this.$store.commit("store/setIsError", true);
      console.log(e);
    }
  }
};
</script>
