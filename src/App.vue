<template>
  <div id="app">
    <the-header></the-header>
    <div class="container">
      <to-do @sendTasks="sendData"></to-do>
      <board :backlog="data"></board>
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import ToDo from "./components/blocks/ToDo.vue";
import Board from "./components/blocks/Board.vue";

export default {
  components: {
    TheHeader,
    ToDo,
    Board,
  },
  data() {
    return {
      data: null,
    };
  },
  methods: {
    sendData(tasks) {
      this.data = tasks;
    },
  },
};
</script>

<style>
.container {
  max-width: 1110px;
  margin: 0 auto;
}

/* Стиль drop-placeholder */
.card-placeholder {
  margin: .5rem 0;
  opacity: 20%;
  border: 1px dashed #000;
  border-radius: 5px;
  background: #ccc;
}
</style>
