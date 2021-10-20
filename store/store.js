export const state = () => ({
  cart: [],
  cartIsOpen: false,
  addedItem: false,
  navIsOpen: false,
  isError: false
});

export const mutations = {
  setIsError: (state, value) => {
    state.isError = value;
  },

  addItem: (state, item) => {
    state.cart.push(item);
  },
  emptyCart: state => {
    state.cart = [];
  },

  setAddedItem: (state, value) => {
    state.addedItem = value;
  },
  setNavIsOpen: (state, value) => {
    state.navIsOpen = value;
  },

  mutateItem: (state, { item, index }) => {
    state.cart[index].amount += item.amount;
    if (state.cart[index].amount === 0) {
      state.cart.splice(index, 1);
    }
  },

  mutateCartIsOpen: (state, value) => {
    state.cartIsOpen = value;
  },
  updateItem: (state, index) => {
    state.cart.splice(index, 1);
  }
};

export const actions = {
  addItem: (context, item) => {
    const index = context.getters["getItems"].findIndex(
      el => el.id === item.id
    );

    if (index !== -1) {
      context.commit("mutateItem", { item, index });
    } else {
      context.commit("addItem", item);
    }
  },
  mutateCartIsOpen: (context, value) => {
    if (value) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
    context.commit("mutateCartIsOpen", value);
  },
  updateItem: (context, item) => {
    const index = context.getters["getItems"].findIndex(
      el => el.id === item.id
    );
    context.commit("updateItem", index);
  }
};

export const getters = {
  getIsError: state => {
    return state.isError;
  },

  getTotalItems: state => {
    return state.cart.reduce((acc, cur) => {
      acc += cur.amount;
      return acc;
    }, 0);
  },
  getItems: state => {
    return state.cart;
  },
  addedItem: state => {
    return state.addedItem;
  },
  getCartIsOpen: state => {
    return state.cartIsOpen;
  },
  getNavIsOpen: state => {
    return state.navIsOpen;
  },
  getTotalPrice: state => {
    return state.cart.reduce((acc, cur) => {
      acc += cur.price * cur.amount;
      return acc;
    }, 0);
  }
};
