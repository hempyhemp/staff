<template>
  <button class="app-button" :class="`app-button--${type}`" type="button">
    <img :class="{ 'has-content': !!$slots.default }" :src="icon" v-if="icon"/>
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },
    type: {
      type: String,
      default: 'primary',
      validator: (value) =>
          ['primary', 'secondary', 'tertiary', 'actions'].includes(value),
    },
  },
};
</script>

<style lang="scss">
.app-button {
  height: 40px;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  user-select: none;

  font-size: 14px;
  line-height: 24px;

  cursor: pointer;

  transition: all 0.15s ease-out;

  img {
    margin-right: 0;

    &.has-content {
      margin-right: 8px;
    }
  }

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.97);
  }

  &--primary {
    background: $button-red-background;
    color: $color-white;
  }

  &--secondary {
    background: $color-blue;
    color: $color-white;
  }

  &--tertiary {
    background: transparent;
    color: $color-red;
    border: 1px solid $color-red;
  }

  &--actions {
    color: blue;
    padding: 0px;
    height: 12px;
    width: 12px;
    margin-right: 0px;

    &:hover {
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.97);
    }
  }
}
</style>
