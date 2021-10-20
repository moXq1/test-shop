<template>
  <div>
    <div class="backdrop" v-if="navIsOpen" @click="toggleNav"></div>

    <nav class="navigation">
      <div class="navigation__wrap">
        <nuxt-link to="/" class="navigation__logo">Meclee Test</nuxt-link>
        <ul class="navigation__list" :class="{ show: navIsOpen }">
          <li class="nav__close" @click="toggleNav" v-if="navIsOpen">
            <span></span><span></span>
          </li>
          <li v-for="item in navItems" :key="item" @click="closeNav()">
            <nuxt-link class="navigation__link" :to="'/categories/' + item">{{
              item
            }}</nuxt-link>
          </li>
        </ul>
      </div>

      <div class="wrp">
        <div class="hamb-box" @click="toggleNav">
          <div class="hamb-inner"></div>
        </div>
        <button class="navigation__cart" @click="openCart">
          <img src="~/assets/cart-outline.svg" alt="" />
          <div v-if="getTotalItems > 0" class="navigation__items-amount">
            ({{ getTotalItems }})
          </div>
        </button>
        <div class="navigation__cart--empty" v-if="getTotalItems < 1">
          Your cart is currently empty
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navItems: []
    };
  },
  methods: {
    openCart() {
      if (this.getTotalItems === 0) {
        return;
      }
      this.$store.dispatch("store/mutateCartIsOpen", !this.cartIsOpen);
    },
    toggleNav() {
      this.$store.commit("store/setNavIsOpen", !this.navIsOpen);
    },
    closeNav() {
      this.$store.commit("store/setNavIsOpen", false);
    }
  },

  computed: {
    getTotalItems() {
      return this.$store.getters["store/getTotalItems"];
    },
    cartIsOpen() {
      return this.$store.getters["store/getCartIsOpen"];
    },
    navIsOpen() {
      return this.$store.getters["store/getNavIsOpen"];
    }
  },

  async fetch() {
    try {
      const res = await fetch("https://fakestoreapi.com/products/categories");

      this.navItems = await res.json();
    } catch (e) {
      this.$store.commit("store/setIsError", true);
      console.log(e);
    }
  }
};
</script>

<style lang="scss">
.wrp {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav__close {
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

.hamb-box {
  display: none;
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
}

.hamb-inner {
  position: absolute;
  width: 100%;
  height: 2px;
  border-radius: 4px;
  top: 50%;
  margin-top: -1px;
  background: #000;

  &:after,
  &:before {
    background: #000;
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    border-radius: 4px;
  }

  &:before {
    top: -7px;
  }
  &:after {
    bottom: -7px;
  }
}

.navigation {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: #f9f9f9;

  &__cart {
    position: relative;

    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.5s ease;

    &--empty {
      display: none;
      position: absolute;
      right: 0;
      bottom: -100%;
      width: max-content;
      z-index: 2;
      padding: 1rem;
      border: 1px solid #000;
    }

    &:hover {
      background-color: rgb(118 112 112 / 25%);
    }

    &:hover + &--empty {
      display: block;
    }

    & img {
      object-fit: cover;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &__items-amount {
    font-size: 11px;
    line-height: 1.454545454;
    letter-spacing: 0.5px;

    border-radius: 50%;
    width: 14px;
    height: 14px;
  }

  &__logo {
    font-size: 1.2rem;
    font-weight: bold;
    color: black;
  }

  &__wrap {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  &__list {
    display: flex;
    gap: 1rem;
  }

  &__link {
    color: #00000085;
    transition: color 0.3s ease;
    display: block;

    &:first-letter {
      text-transform: uppercase;
    }

    &:hover {
      color: #000;
    }
  }
}

@media (max-width: 720px) {
  .hamb-box {
    display: block;
  }
  .navigation__list {
    position: fixed;
    padding: 24px;
    top: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 20;
    flex-direction: column;
    display: none;
    width: 300px;
  }
  .show {
    display: flex;
  }
}

@media (max-width: 500px) {
  .nav__close {
    align-self: start;
  }
  .navigation__list {
    width: 100%;
    align-items: center;
  }
}
</style>
