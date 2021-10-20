<template>
  <section class="products">
    <ul class="products__list">
      <product-item
        v-for="product in products"
        :key="product.id"
        :product="product"
      ></product-item>
    </ul>
    <ModalAddedItem v-if="addedItem"></ModalAddedItem>
  </section>
</template>

<script>
import ProductItem from "./ProductItem.vue";
export default {
  components: { ProductItem },
  data() {
    return {};
  },
  computed: {
    addedItem() {
      return this.$store.getters["store/addedItem"];
    }
  },
  props: ["products"]
};
</script>

<style lang="scss">
.products {
  width: 100%;
  position: relative;
  &__list {
    margin: 0 auto;
    margin-top: 2rem;
    max-width: 1300px;
    display: grid;
    place-content: center;
    grid-template-columns: repeat(auto-fill, 300px);
    gap: 1rem;
  }
}
</style>
