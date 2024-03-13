<template></template>
<script>
export default {
  props: {
    username: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    errorMessage: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit }) {
    const submitForgotPassword = () => {
      alert("ASD");
    };

    return {
      submitForgotPassword,
    };
  },
};
</script>
<style lang=""></style>
