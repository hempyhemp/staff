<template>
  <div class="app-toolbar">
    <div class="left">
      <slot name="left"/>
    </div>

    <div class="right">
      <slot name="right"/>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.app-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @include to-desktop {
    flex-direction: column;
  }

  @include mobile {
    align-items: stretch;
  }

  @include tablet {
    align-items: flex-start;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 20px;

    @include mobile {
      flex-direction: column;
      align-items: stretch;
    }
  }
}
</style>
