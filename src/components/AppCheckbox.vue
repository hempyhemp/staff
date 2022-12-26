<template>
  <div
      class="app-checkbox"
      :class="{ checked: modelValue }"
      @click="$emit('update:modelValue', !modelValue)"
  />
  <!--    <input class="app-input" type="checkbox" :value="value" @change="OnChange($event.target.value)">-->
  <!--    <slot class="text"/>-->
  <!--  </div>-->
</template>

<script>
export default {
  name: 'AppCheckbox',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
  },
};
</script>

<style lang="scss">

.text {
  display: flex;

}

.app-checkbox {
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid $color-red;
  cursor: pointer;

  transition: all 0.18s ease-out;

  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.9);
  }

  &::after {
    content: '';
    position: absolute;
    top: calc(50% - 3px);
    left: calc(50% - 3px);
    width: 6px;
    height: 6px;
    background: $color-red;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease-out;
  }

  input {
    width: 16px;
    height: 16px;
    opacity: 0;
  }

  &.checked {
    &::after {
      opacity: 1;
    }
  }
}


</style>