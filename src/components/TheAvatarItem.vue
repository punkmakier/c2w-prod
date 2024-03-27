<template>
  <img
    :src="`/src/assets/avatars/${imgsrc}`"
    class="avatarsImg"
    :class="{ 'selected-avatar-img': imgsrc === selectedAvatarImgC }"
    @click="selectedAvatar(imgsrc)" />
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    imgsrc: {
      type: String,
      required: true,
      default: "default.png",
    },
    selectedAvatarImg: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit }) {
    const selectedAvatarImgC = ref(props.selectedAvatarImg);
    const selectedAvatar = (val) => {
      emit("selectedAvatar", val);
    };

    return { selectedAvatar, selectedAvatarImgC };
  },
};
</script>
<style>
.cdivider {
  width: 100%;
  height: 3px;
  background-color: rgba(157, 157, 157, 0.315);
  margin-top: 50px;
}
.avatarsImg {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  cursor: pointer;
}
.selected-avatar-img {
  border: 2px solid red;
}
</style>
