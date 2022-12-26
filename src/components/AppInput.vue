<template>
  <div class="app-input" @click="handleClick">
    <input class="control" :placeholder="placeholder" ref="control"
           @input="$emit('update:modelValue', $event.target.value)"
           :value="modelValue"/>
    <img v-if="type === 'search'" src="/icons/loupe.svg"/>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'search'].includes(value),
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    focus() {
      this.$refs.control?.focus();
    },
    handleClick() {
      this.focus();
    },
  },
};
</script>

<style lang="scss">
.app-input {
  display: inline-flex;
  align-items: center;
  box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid $color-border;
  padding: 12px;
  gap: 8px;
  cursor: text;

  width: 100%;
  height: 40px;

  img {
    pointer-events: none;
  }

  color: $color-black;

  .control {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;

    background: transparent;
    border: none;
    height: 100%;
    flex: 1;
    outline: none;
    padding: 0;

    &::placeholder {
      color: $color-gray;
    }
  }
}
</style>
