<template>
  <form @submit.prevent="handleSubmit">
    <Message severity="error" :closable="false" v-if="errorMessage">{{
      errorMessage
    }}</Message>
    <div class="flex flex-column gap-2 mt-2">
      <label for="password" class="fw-500"
        ><i class="pi pi-lock" style="font-size: 1rem"></i> Old Password</label
      >
      <Password
        v-model="state.oldpassword"
        toggleMask
        class="w-100"
        :feedback="false"
        style="margin-top: 5px"
        autocomplete="false" />
      <small
        id="oldpassword"
        style="color: var(--red-400)"
        v-if="v$.oldpassword.$error"
        >{{
          changeErrorMessage(v$.oldpassword.$errors[0].$message, "Old Password")
        }}</small
      >

      <div class="flex flex-column gap-2 mt-2">
        <label for="newpassword" class="fw-500"
          ><i class="pi pi-lock" style="font-size: 1rem"></i> New
          Password</label
        >
        <Password
          v-model="state.newpassword"
          toggleMask
          class="w-100"
          style="margin-top: 5px"
          autocomplete="false" />

        <small
          id="newpassword"
          style="color: var(--red-400)"
          v-if="v$.newpassword.$error"
          >{{
            changeErrorMessage(v$.newpassword.$errors[0].$message, "Password")
          }}</small
        >
      </div>
    </div>
    <div class="flex flex-column gap-2 mt-2">
      <label for="confirmpass" class="fw-500"
        ><i class="pi pi-lock" style="font-size: 1rem"></i> Confirm
        Password</label
      >
      <Password
        v-model="state.confirm_password"
        toggleMask
        class="w-100"
        :feedback="false"
        style="margin-top: 5px"
        autocomplete="false" />

      <small
        id="confirmpass"
        style="color: var(--red-400)"
        v-if="v$.confirm_password.$error"
        >{{
          changeErrorMessage(
            v$.confirm_password.$errors[0].$message,
            "Confirm Password"
          )
        }}</small
      >
    </div>
    <Button
      label="Confirm"
      class="w-100 mt-3"
      type="submit"
      :loading="isLoading" />
  </form>
</template>
<script>
import { reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import { required, sameAs, maxLength, minLength } from "@vuelidate/validators";
export default {
  props: {
    oldpassword: {
      type: String,
      required: false,
    },
    newpassword: {
      type: String,
      required: false,
    },
    confirm_password: {
      type: String,
      required: false,
    },
    errorMessage: {
      type: String,
      required: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      oldpassword: props.oldpassword,
      newpassword: props.newpassword,
      confirm_password: props.confirm_password,
    });

    const rules = computed(() => {
      return {
        oldpassword: {
          required,
          minLengthValue: minLength(1),
        },
        newpassword: {
          required,
          minLengthValue: minLength(8),
          maxLengthValue: maxLength(40),
        },
        confirm_password: { required, sameAs: sameAs(state.newpassword) },
      };
    });

    const v$ = useValidate(rules, state);

    const handleSubmit = () => {
      v$.value.$validate();

      if (!v$.value.$error) {
        emit("changePassword", {
          oldpassword: state.oldpassword,
          newpassword: state.newpassword,
        });
      }
    };
    const changeErrorMessage = (value, handleValue) => {
      if (value.includes("Value")) {
        return value.replace("Value", handleValue);
      } else {
        if (value === "The value must be equal to the other value") {
          return value.replace(
            "The value must be equal to the other value",
            "Confirm password must be equal to the password"
          );
        }
        return value;
      }
    };
    return {
      state,
      v$,
      handleSubmit,
      changeErrorMessage,
    };
  },
};
</script>
<style></style>
