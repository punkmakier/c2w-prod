<template>
  <div class="money-bag">
    <img src="@/assets/images/cashbag.png" alt="" />
    <div class="mb-info" style="width: 50%">
      <span
        >WIN <b class="text-yellow">{{ money }}</b> PESOS</span
      >
      <div class="wr-participants">
        <p style="color: var(--surface-300)">Participants</p>
        <p>
          <b>{{ participants }}</b>
        </p>
      </div>
      <ProgressBar :value="percentage" style="height: 8px"></ProgressBar>
      <p style="color: var(--surface-300); font-size: 0.8rem">
        Countdown: <b>{{ countdown }}</b>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    money: {
      type: String,
      required: true,
      default: "0",
    },
    participants: {
      type: Number,
      required: true,
      default: 0,
    },
    countdown: {
      type: String,
      required: true,
      default: "123:32:43",
    },
    maxParticipants: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  setup(props) {
    const maxValue = ref(props.maxParticipants);
    const currentValue = ref(props.participants);

    // Calculate the percentage
    const percentage = computed(() => {
      return (currentValue.value / maxValue.value) * 100;
    });

    return {
      maxValue,
      currentValue,
      percentage,
    };
  },
};
</script>

<style></style>
