<template>
  <div class="modal-error" v-if="isError">
    <div class="modal-error__head">
      error
      <div class="modal-error__close" @click="closeModal">
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="modal-error__info">
      Failed to load data
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isError() {
      return this.$store.getters["store/getIsError"];
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("store/setIsError", false);
    }
  }
};
</script>

<style lang="scss">
.modal-error {
  border: 1px solid tomato;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;

  &__head {
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
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
}
</style>
