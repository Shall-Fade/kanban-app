<template>
  <div class="board">
    <div class="block">
      <h3 class="title backlog">Бэклог</h3>
      <Container
        orientation="vertical"
        group-name="trello"
        :animation-duration="250"
        drag-class="card-animation"
        drop-class="card-drop-animation"
        :drop-placeholder="{
          className: `card-placeholder`,
          animationDuration: '250',
          showOnTop: true,
        }"
        :get-child-payload="getChildPayload"
        @drag-start="onDragStart('backlogTasks', $event)"
        @drop="onDrop('backlogTasks', $event)"
      >
        <Draggable
          v-for="(backlogTask, index) in tasksData.backlogTasks"
          :key="index"
        >
          <base-card class="task">
            <p class="task-item backlog-shadow">{{ backlogTask }}</p>
          </base-card>
        </Draggable>
      </Container>
    </div>
    <div class="block">
      <h3 class="title progress">В процессе</h3>
      <Container
        orientation="vertical"
        group-name="trello"
        :animation-duration="250"
        drag-class="card-animation"
        drop-class="card-drop-animation"
        :drop-placeholder="{
          className: `card-placeholder`,
          animationDuration: '250',
          showOnTop: true,
        }"
        :get-child-payload="getChildPayload"
        @drag-start="onDragStart('progressTasks', $event)"
        @drop="onDrop('progressTasks', $event)"
      >
        <Draggable
          v-for="progressTask in tasksData.progressTasks"
          :key="progressTask"
        >
          <base-card class="task">
            <p class="task-item progress-shadow">{{ progressTask }}</p>
          </base-card>
        </Draggable>
      </Container>
    </div>
    <div class="block">
      <h3 class="title ready">Готово</h3>
      <Container
        orientation="vertical"
        group-name="trello"
        :animation-duration="250"
        drag-class="card-animation"
        drop-class="card-drop-animation"
        :drop-placeholder="{
          className: `card-placeholder`,
          animationDuration: '250',
          showOnTop: true,
        }"
        :get-child-payload="getChildPayload"
        @drag-start="onDragStart('readyTasks', $event)"
        @drop="onDrop('readyTasks', $event)"
      >
        <Draggable v-for="readyTask in tasksData.readyTasks" :key="readyTask">
          <base-card class="task">
            <p class="task-item ready-shadow">{{ readyTask }}</p>
          </base-card>
        </Draggable>
      </Container>
    </div>
    <div class="block">
      <h3 class="title basket">Корзина</h3>
      <Container
        orientation="vertical"
        group-name="trello"
        :animation-duration="250"
        drag-class="card-animation"
        drop-class="card-drop-animation"
        :drop-placeholder="{
          className: `card-placeholder`,
          animationDuration: '250',
          showOnTop: true,
        }"
        :get-child-payload="getChildPayload"
        @drag-start="onDragStart('basketTasks', $event)"
        @drop="onDrop('basketTasks', $event)"
      >
        <Draggable
          v-for="basketTask in tasksData.basketTasks"
          :key="basketTask"
        >
          <base-card class="task">
            <p class="task-item basket-shadow">{{ basketTask }}</p>
          </base-card>
        </Draggable>
      </Container>
      <base-button
        @click="removeBasket"
        v-if="tasksData.basketTasks.length !== 0"
        class="remove-btn"
        >Очистить</base-button
      >
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
export default {
  components: {
    Container,
    Draggable,
  },
  props: ["backlog"],
  data() {
    return {
      tasksData: {
        backlogTasks: this.backlog,
        progressTasks: ["Сдать курсовую работу"],
        readyTasks: ["Сделать канбан-доску", "Уборка", "Написать курсовую"],
        basketTasks: ["Покормить кота", "Сходить на тренировку"],
      },
      draggableCard: {
        block: "",
        index: null,
        cardData: null,
      },
      basketIsFull: true,
    };
  },
  methods: {
    getChildPayload(index) {
      return { index };
    },
    onDragStart(block, dragResult) {
      const { payload, isSource } = dragResult;
      if (isSource) {
        this.draggableCard = {
          block: block,
          index: payload.index,
          cardData: this.tasksData[block][payload.index],
        };
      }
    },
    onDrop(block, dropResult) {
      const { removedIndex, addedIndex } = dropResult;
      if (block === this.draggableCard.block && removedIndex === addedIndex) {
        return;
      }

      if (removedIndex !== null) {
        this.tasksData[block].splice(removedIndex, 1);
      }

      if (addedIndex !== null) {
        this.tasksData[block].splice(
          addedIndex,
          0,
          this.draggableCard.cardData
        );
      }
    },
    removeBasket() {
      this.tasksData.basketTasks.splice(0, this.tasksData.basketTasks.length);
    },
  },
  watch: {
    backlog() {
      this.tasksData.backlogTasks = this.backlog;
    },
  },
};
</script>

<style scoped>
.board {
  display: flex;
  justify-content: space-between;
}

/* .block {
  max-width: 300px;
} */

.task {
  margin-bottom: 0.7rem;
  cursor: pointer;
}

.task-item {
  font-size: 1rem;
  font-weight: 700;
  padding: 15px 20px 15px 15px;
}

.title {
  display: inline-block;
  font-size: 0.8rem;
  padding: 0.5rem;
  border-radius: 7px;
  margin-bottom: 15px;
}
.backlog {
  color: #898989;
  background: #e3e3e3;
}

.backlog-shadow {
  box-shadow: inset 6px 0 #e3e3e3;
  border-radius: 4px;
}

.progress {
  color: #6da5f3;
  background: #d6e7ff;
}

.progress-shadow {
  box-shadow: inset 6px 0 #d6e7ff;
  border-radius: 4px;
}
.ready {
  color: #99d5a4;
  background: #d6f9e0;
}

.ready-shadow {
  box-shadow: inset 6px 0 #d6f9e0;
  border-radius: 4px;
}
.basket {
  color: #d88d92;
  background: #fbe3e3;
}

.basket-shadow {
  box-shadow: inset 6px 0 #fbe3e3;
  border-radius: 4px;
}
.remove-btn {
  background: #c9666c;
  padding: 0.9rem;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
  transition: 0.5s ease;
}

.card-animation {
  transform: rotate(3deg) scale(105%);
  transition: 0.5s ease;
}

.card-drop-animation {
  transform: rotate(0deg) scale(100%);
  transition: 0.5s ease-in-out;
}

.list-complete-item {
  transition: all 1s;
  margin-right: 10px;
}

.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
