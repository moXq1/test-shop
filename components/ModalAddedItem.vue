<template>
  <div class="modal">
    <div class="modal__mark"></div>
    Item added to cart
  </div>
</template>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 50%;
  opacity: 0;
  transform: translate(-50%, -50%);
  background: white;
  padding: 1rem;
  border: 1px solid green;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: anim 1s cubic-bezier(0.49, 0.89, 0.86, 0.8);
  &__mark {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: green;
    position: relative;

    &:before {
      content: "✔";
      position: absolute;
      color: white;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

@keyframes anim {
  5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    top: 25%;
  }
}
</style>
