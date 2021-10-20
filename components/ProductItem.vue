<template>
  <li>
    <div class="card">
      <img :src="product.image" :alt="product.title" />
      <div class="card__content">
        <div class="card__price">${{ product.price }}</div>
        <div class="card__title">
          {{ product.title }}
        </div>
        <div class="card__description">
          {{ getTruncDesc }}
        </div>
      </div>
      <div class="card__btns">
        <nuxt-link
          :to="{
            path: '/product/' + product.id
          }"
          class="card__btn card__info"
          >Подробнее</nuxt-link
        >
        <button class="card__btn card__add" @click="addItem()">
          В корзину
        </button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["product"],

  computed: {
    getTruncDesc() {
      const desc = this.product.description;
      const l = desc.split("").length;
      if (l > 185) {
        const d = desc.split("").slice(0, 185);
        d.push("…");
        return d.join("");
      }
      return desc;
    }
  },
  methods: {
    addItem() {
      const item = { ...this.product, amount: 1 };
      this.$store.dispatch("store/addItem", item);
      this.$store.commit("store/setAddedItem", true);
      setTimeout(() => {
        this.$store.commit("store/setAddedItem", false);
      }, 1100);
    }
  }
};
</script>

<style lang="scss">
.card {
  width: 300px;
  position: relative;
  height: 470px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  border: 1px solid #ddd;

  & img {
    height: 150px;
    max-width: 240px;
    object-fit: cover;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    height: 100%;
  }

  &__price {
    font-size: 0.9rem;
    opacity: 0.8;
  }

  &__title {
    font-weight: bold;
    font-size: 1.1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  &__description {
    font-size: 0.8rem;
  }

  &__btns {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    width: 100%;
  }

  &__info {
    --txt-color: cornflowerblue;
    border: 1px solid var(--txt-color);
    color: var(--txt-color);
    background: white;

    &:hover {
      background: var(--txt-color);
      color: white;
    }
  }

  &__add {
    --add-color: green;
    border: 1px solid var(--add-color);
    background-color: var(--add-color);
    color: white;

    &:hover {
      background: white;
      color: var(--add-color);
    }
  }

  &__btn {
    padding: 0.5rem 1rem;
    max-width: 50%;
    flex: 1;
    position: relative;
    transition: all 0.3s ease-in;
    font-size: 0.8rem;
    text-align: center;
  }
}
</style>
