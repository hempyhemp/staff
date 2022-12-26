<template>
  <button class="company-profile" type="button">
    <img v-if="logo" :src="logo" :alt="name" />
    <span>{{ name }}</span>
  </button>
</template>

<script>
export default {
  name: `CompanyProfile`,
  props: {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
.company-profile {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;

  transition: all ease-in-out 1s;

  &:active {
    transform: scale(10.97) translate(-50px, 50px) rotateZ(360deg);
  }

  img {
    margin-right: 8px;
  }
}
</style>
