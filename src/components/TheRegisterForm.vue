<template lang="">
  <div>
    <h1 style="text-align: center; margin-top: -10px">
      {{ $t("homepage.register") }}
    </h1>
    <Message severity="error" v-if="errorMessage" :closable="false">{{
      errorMessage
    }}</Message>
    <Message severity="success" v-if="successMessage" :closable="false">{{
      successMessage
    }}</Message>
    <div class="flex flex-column gap-2">
      <label for="username" class="fw-500"
        ><i class="pi pi-user" style="font-size: 1rem"></i>
        {{ $t("profile.username") }}</label
      >
      <InputText
        id="username"
        v-model="state.username"
        aria-describedby="username-help"
        style="margin-top: 5px"
        :class="{ 'p-invalid': v$.username.$error }"
        autofocus />
      <small style="color: var(--red-400)" v-if="v$.username.$error">{{
        changeErrorMessage(v$.username.$errors[0].$message, "Username")
      }}</small>
    </div>
    <div class="flex flex-column gap-2 mt-2">
      <label for="username" class="fw-500"
        ><i class="pi pi-lock" style="font-size: 1rem"></i>
        {{ $t("profile.password") }}</label
      >
      <Password
        v-model="state.password"
        toggleMask
        class="w-100"
        :feedback="false"
        style="margin-top: 5px"
        :class="{ 'p-invalid': v$.password.$error }" />

      <small style="color: var(--red-400)" v-if="v$.password.$error">{{
        changeErrorMessage(v$.password.$errors[0].$message, "Password")
      }}</small>
    </div>
    <div class="flex flex-column gap-2 mt-2">
      <label for="username" class="fw-500"
        ><i class="pi pi-lock" style="font-size: 1rem"></i>
        {{ $t("profile.confirmPass") }}</label
      >
      <Password
        v-model="state.confirm_password"
        toggleMask
        class="w-100"
        :class="{ 'p-invalid': v$.confirm_password.$error }"
        :feedback="false"
        style="margin-top: 5px" />

      <small style="color: var(--red-400)" v-if="v$.confirm_password.$error">{{
        changeErrorMessage(
          v$.confirm_password.$errors[0].$message,
          "Confirm Password"
        )
      }}</small>
    </div>
    <div class="flex flex-column gap-2 mt-2" v-if="state.referral">
      <label for="username" class="fw-500"
        ><i class="pi pi-user" style="font-size: 1rem"></i> Referrer</label
      >
      <InputText
        id="username"
        v-model="state.referral"
        style="margin-top: 5px"
        disabled />
    </div>
    <div class="field-checkbox mt-2">
      <Checkbox v-model="state.oldCheck" value="Approved" />
      <label for="accept"> {{ $t("homepage.iam21") }} </label><br /><small
        style="color: var(--red-400)"
        v-if="checkOldHandler"
        >You must confirm that you are 21 years or older to proceed.</small
      >
    </div>
    <div class="field-checkbox mt-1">
      <Checkbox v-model="state.toc" value="Approved" />
      <label for="accept">
        {{ $t("homepage.iagree") }}
        <a href="javascript:void(0)" style="color: #ff1354" @click="toc = true"
          >{{ $t("homepage.toc") }}.
        </a> </label
      ><br /><small style="color: var(--red-400)" v-if="tocHandler"
        >Please accept the terms and conditions to proceed.</small
      >
    </div>
    <Button
      :label="$t('homepage.register')"
      class="w-100 mt-3"
      :loading="loading"
      @click="submit" />
    <Dialog
      v-model:visible="toc"
      modal
      header="Terms and Condition"
      :style="{ width: '40rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <TheTermsAndCondition />
    </Dialog>
  </div>
</template>
<script>
import TheTermsAndCondition from "@/components/TheTermsAndCondition.vue";
import useValidate from "@vuelidate/core";
import { useRoute } from "vue-router";
import {
  required,
  sameAs,
  helpers,
  maxLength,
  minLength,
} from "@vuelidate/validators";
import { ref, reactive, computed, onMounted } from "vue";
export default {
  components: {
    TheTermsAndCondition,
  },
  props: {
    username: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    confirm_password: {
      type: String,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
    errorMessage: {
      type: String,
      required: false,
    },
    successMessage: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      username: props.username,
      password: props.password,
      referral: "",
      confirm_password: props.confirm_password,
      oldCheck: false,
      toc: false,
    });
    onMounted(() => {
      const route = useRoute();
      const refValue = ref(route.query.ref || "");
      state.referral = refValue.value;
    });

    const specialCharacterChecking = (value) => /^[a-zA-Z0-9]+$/.test(value);

    const rules = computed(() => {
      return {
        username: {
          required,
          specialCharacterChecking: helpers.withMessage(
            "This field does not allow special characters",
            specialCharacterChecking
          ),
          minLengthValue: minLength(3),
          maxLengthValue: maxLength(15),
        },
        password: {
          required,
          minLengthValue: minLength(8),
          maxLengthValue: maxLength(30),
        },
        confirm_password: { required, sameAs: sameAs(state.password) },
      };
    });

    const v$ = useValidate(rules, state);

    const tocHandler = ref(false);
    const checkOldHandler = ref(false);

    const submit = () => {
      v$.value.$validate();

      if (!v$.value.$error) {
        console.log();
        if (state.toc[0] == "Approved" && state.oldCheck[0] == "Approved") {
          emit("submit", {
            username: state.username.trim(),
            password: state.password.trim(),
            referral: state.referral.trim(),
          });
          checkOldHandler.value = false;
          tocHandler.value = false;
        } else {
          if (!state.oldCheck || state.oldCheck[0] == undefined) {
            checkOldHandler.value = true;
          } else {
            checkOldHandler.value = false;
          }
          if (!state.toc || state.toc[0] == undefined) {
            tocHandler.value = true;
          } else {
            tocHandler.value = false;
          }
        }
      } else {
        if (!state.oldCheck || state.oldCheck[0] == undefined) {
          checkOldHandler.value = true;
        } else {
          checkOldHandler.value = false;
        }
        if (!state.toc || state.toc[0] == undefined) {
          tocHandler.value = true;
        } else {
          tocHandler.value = false;
        }
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
      submit,
      changeErrorMessage,
      checkOldHandler,
      tocHandler,
    };
  },

  data() {
    return {
      value: "",
      pizza: false,
      accept: false,
      toc: false,
    };
  },
};
</script>
<style>
.forgot_rememberme {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.forgotPass {
  text-decoration: underline;
  color: #fff;
}
.signup {
  text-decoration: underline;
  color: #ff1354;
}
</style>
