<template>
  <section class="product">
    <img :src="product.image" :alt="product.title" />

    <div class="product__info">
      <div class="product__title">{{ product.title }}</div>
      <div class="product__description">
        <div class="b">Description:</div>
        <div class="product__text">
          {{ product.description }}
        </div>
      </div>
      <div class="product__price">
        <span class="b">Price:</span> ${{ product.price }}
      </div>

      <div class="product__amount">
        <input v-model="amount" type="number" min="1" max="10" />
      </div>
      <button @click="addItem" class="product__btn">Add to cart</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      amount: 1
    };
  },

  computed: {
    title() {
      return this.$route.query.title;
    }
  },

  head() {
    return {
      title: this.product.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.product.description}`
        }
      ]
    };
  },

  methods: {
    addItem() {
      const item = { ...this.product, amount: +this.amount };
      console.log(item);
      this.$store.dispatch("store/addItem", item);
    }
  },

  async fetch() {
    try {
      const id = this.$route.params.id;

      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      this.product = await res.json();
    } catch (e) {
      this.$store.commit("store/setIsError", true);
      console.log(e);
    }
  }
};
</script>

<style lang="scss">
.product {
  display: grid;
  grid-template-columns: minmax(250px, 450px) 355px;
  position: relative;
  place-content: center;
  gap: 3rem;
  height: 100vh;
  margin: 0 1rem;

  &__btn {
    background: green;
    color: white;
    padding: 0.7rem 2rem;
    width: max-content;
    text-align: center;
    align-self: start;
    border-radius: 13px;
    font-size: 1rem;
    position: relative;

    &:hover::after {
      transform: scale(1.1);
    }
    &:after {
      content: "";
      position: absolute;
      inset: 0;
      background: green;
      transition: transform 0.5s ease-out;
      z-index: -1;
      border-radius: 13px;
    }
  }

  &__amount {
    & input {
      padding: 0.5rem 0;
      font-size: 1rem;
      max-width: 4rem;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__text {
    margin-top: 0.5rem;

    font-size: 14px;
    line-height: 26px;
    color: #656565;
  }

  &__title {
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  &__img-wrap {
    position: relative;
    width: 100%;
  }

  & img {
    width: 100%;

    object-fit: cover;
    justify-self: center;
    align-self: center;
  }
}

.b {
  font-weight: bold;
}

@media (max-width: 700px) {
  .product {
    grid-template-columns: minmax(250px, 1fr);
    grid-template-rows: 200px 1fr;
    margin-top: 4rem;
    height: initial;

    &__info {
      padding-bottom: 2rem;
    }

    & img {
      width: auto;
      height: 100%;
    }
  }
}
</style>
