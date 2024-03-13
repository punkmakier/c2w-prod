<template>
  <div class="winner-info">
    <img
      :src="`/src/assets/random_images/${imgsrc}`"
      :alt="name"
      style="width: 100px; height: 100px; border-radius: 5px" />
    <p style="color: #fff; text-align: center; font-size: 0.7rem">
      {{ randomReplace(name) }} {{ $t("scwithdrawn") }}
      <span class="fw-700" style="color: #fff314">{{ money }}</span>
      {{ $t("via") }}
      <b>{{ via }}</b>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    imgsrc: {
      type: String,
      required: true,
      default: "default.png",
    },
    name: {
      type: String,
      required: true,
      default: "default",
    },
    money: {
      type: String,
      required: true,
    },
    via: {
      type: String,
      required: true,
      default: "default",
    },
  },
  setup() {
    const randomReplace = (name) => {
      let replacedName = name;
      const indexes = [];

      let count = 3;
      if (replacedName.length <= 4) {
        count = 2;
      } else if (replacedName.length >= 5 && replacedName.length <= 7) {
        count = 3;
      } else if (replacedName.length >= 7 && replacedName.length <= 10) {
        count = 4;
      } else {
        count = 5;
      }

      // Generate 3 random unique indexes to replace characters
      while (indexes.length < count) {
        const index = Math.floor(Math.random() * replacedName.length);
        if (!indexes.includes(index)) {
          indexes.push(index);
        }
      }

      // Replace characters at the random indexes with "*"
      indexes.forEach((index) => {
        replacedName =
          replacedName.substring(0, index) +
          "*" +
          replacedName.substring(index + 1);
      });

      return replacedName;
    };

    return {
      randomReplace,
    };
  },
};
</script>
<style></style>
