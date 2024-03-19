<template>
  <div>
    <form @submit.prevent="sendMessage">
      <input v-model="message" placeholder="Type your message here" />
      <button type="submit">Send</button>
    </form>
    <div v-for="(msg, index) in messages" :key="index">{{ msg }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
import { socketState, socket } from "@/socket";

export default {
  setup() {
    const message = ref("");
    const connected = socketState.connected;
    const messages = socketState.messages;

    const sendMessage = () => {
      if (message.value.trim() !== "") {
        socket.emit("chat-message", message.value);
        console.log("Sending message:" + message.value); // Debug statement
        message.value = ""; // Clear input after sending message
      }
    };

    return { message, connected, messages, sendMessage };
  },
};
</script>
