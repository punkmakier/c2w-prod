<template>
  <div>
    <input v-model="message" @keyup.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
    <ul>
      <li v-for="msg in messages">{{ msg }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      messages: [],
      socket: null,
    };
  },
  mounted() {
    this.socket = new WebSocket("ws://localhost:3000");
    this.socket.onmessage = (event) => {
      this.messages.push(event.data);
    };
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== "") {
        this.socket.send(this.message);
        this.message = "";
      }
    },
  },
};
</script>
