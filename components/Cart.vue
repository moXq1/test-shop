<template>
  <div>
    <div
      class="backdrop"
      v-if="cartIsOpen && getTotalItems > 0"
      @click="closeCart"
    ></div>

    <aside class="cart" v-if="cartIsOpen && getTotalItems > 0">
      <div class="cart__header">
        <div class="cart__head">Your order</div>
        <div class="cart__close" @click="closeCart">
          <span></span><span></span>
        </div>
      </div>

      <ul class="cart__list">
        <li
          class="cart__item"
          v-for="(item, index) in getItems"
          :key="item.id"
          :data-id="index"
        >
          <div class="cart__item--info">
            <div class="name">{{ item.title }}</div>
            <div class="cart__ctrl">
              <button class="inc" @click="inc(index)"></button>
              <div class="amount">{{ item.amount }}</div>
              <button class="dec" @click="dec(index)"></button>
              <div class="price">{{ item.price * item.amount }} $</div>
            </div>
          </div>
          <img :src="item.image" :alt="item.title" />
          <span class="cart__delete" @click="deleteFromCart(index)">
            <span></span><span></span>
          </span>
        </li>
      </ul>

      <div class="cart__total">
        <div class="total">
          <span>Total:</span>
          {{ getTotalPrice }} $
        </div>
        <button class="cart__buy" @click="buy()">Checkout</button>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  computed: {
    getTotalItems() {
      return this.$store.getters["store/getTotalItems"];
    },
    cartIsOpen() {
      return this.$store.getters["store/getCartIsOpen"];
    },
    getCart() {
      return this.$store.getters["store/getItems"];
    },
    getItems() {
      return this.getCart.filter(el => el.amount > 0);
    },
    getTotalPrice() {
      return this.$store.getters["store/getTotalPrice"];
    }
  },
  watch: {
    getTotalItems(newVal) {
      if (newVal === 0) {
        this.$store.dispatch("store/mutateCartIsOpen", false);
      }
    }
  },
  methods: {
    closeCart() {
      if (this.cartIsOpen) {
      }

      this.$store.dispatch("store/mutateCartIsOpen", !this.cartIsOpen);
    },
    inc(index) {
      const item = { ...this.getCart[index] };

      item.amount = 1;
      this.$store.dispatch("store/addItem", item);
    },
    dec(index) {
      const item = { ...this.getCart[index] };
      item.amount = -1;
      this.$store.dispatch("store/addItem", item);
    },
    deleteFromCart(index) {
      const item = { ...this.getCart[index] };

      item.amount = 0;
      this.$store.dispatch("store/updateItem", item);
    },
    buy() {
      this.$store.commit("store/emptyCart");
    }
  }
};
</script>

<style lang="scss">
.cart {
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  z-index: 21;
  padding: 24px;
  width: 400px;

  &__buy {
    font-size: 1.1rem;
    padding: 0.5rem 1.5rem;
    background: green;
    color: white;
    border-radius: 13px;
    transition: background 0.5s ease-in-out;
    &:hover {
      background: rgb(18, 190, 18);
    }
  }

  &__total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    border: 1px solid #eee;

    & .total {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 0.3rem;
      font-weight: bold;
      font-size: 1.1rem;

      & span {
        font-size: 0.9rem;
        opacity: 0.8;
        font-weight: normal;
      }
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
    font-size: 1.2rem;
  }

  &__close {
    width: 24px;
    height: 24px;
    position: relative;
    cursor: pointer;

    & span {
      position: absolute;
      inset: 0;
      margin: auto;
      background: #212529;
      transform: rotate(45deg);
    }

    & span:nth-of-type(1) {
      width: 2px;
      height: 100%;
    }
    & span:nth-of-type(2) {
      width: 100%;
      height: 2px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0.5rem 1rem 1rem;
    border: 1px solid #eee;

    &--info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    & .name {
      font-size: 14px;
      line-height: 1.43;
      padding-right: 0.5rem;
      font-weight: bold;
    }

    & img {
      width: 80px;
      height: 80px;
      object-fit: contain;
    }
  }

  &__ctrl {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    gap: 0.5rem;

    & .inc,
    & .dec {
      width: 24px;
      height: 24px;
      border-radius: 50%;

      position: relative;
    }

    & .inc:after,
    & .inc:before,
    & .dec:after {
      position: absolute;
      content: "";
      background: black;
      width: 10px;
      height: 2px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }

    & .inc:after {
      width: 2px;
      height: 10px;
    }
  }

  &__delete {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    cursor: pointer;

    & span {
      position: absolute;
      inset: 0;
      margin: auto;
      background: #fff;
      transform: rotate(45deg);
    }

    & span:nth-of-type(1) {
      width: 2px;
      height: 50%;
    }
    & span:nth-of-type(2) {
      width: 50%;
      height: 2px;
    }
  }
}

.backdrop {
  width: 100vw;
  height: 100vh;
  z-index: 20;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  cursor: pointer;
}

@media (max-width: 600px) {
  .cart {
    width: 100%;
  }
}

@media (max-width: 400px) {
  .cart {
    padding: 24px 12px;
  }
}
</style>
