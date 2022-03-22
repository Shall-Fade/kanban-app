<template>
  <base-card class="todo-block">
    <h2>Новая задача</h2>
    <div>
      <input
        class="todo-input"
        type="text"
        v-model="inputValue"
        placeholder="Название задачи"
        @keypress.enter="addTask"
      />
      <base-button class="todo-btn" @click="addTask">Добавить</base-button>
      <p v-if="errorIsVisible" class="error">{{ error }}</p>
    </div>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      tasks: [],
      errorIsVisible: false,
      error: "",
    };
  },
  methods: {
    addTask() {
      if (this.inputValue !== "") {
        this.tasks.unshift(this.inputValue);
        this.inputValue = "";
        this.$emit("sendTasks", this.tasks);
        this.errorIsVisible = false;
      } else {
        this.error = "*Введите задачу";
        this.errorIsVisible = true;
      }
    },
  },
};
</script>

<style scoped>
.todo-block {
  display: inline-block;
  padding: 20px;
  margin: 50px 0;
}
h2 {
  font-size: 1.5rem;
  padding-bottom: 10px;
}
.todo-input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  margin-right: 10px;
}

.todo-btn {
  background: var(--color-blue);
  padding: 0.9rem;
  border-radius: 5px;
}

.error {
  font-size: 14px;
  color: #fc0011;
  padding-top: 10px;
  font-weight: 700;
  animation: spawn 1s ease;
}

@keyframes spawn {
  0% {
    opacity: 0%;
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    opacity: 100%;
    transform: scale(1);
  }
}
</style>
