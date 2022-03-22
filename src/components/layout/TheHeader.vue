<template>
  <header class="header">
      <h1 class="title">Канбан-доска</h1>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5rem;
    background: var(--color-blue);
}
.title {
    font-size: 2.5rem;
    color: var(--color-white);
}
</style>
