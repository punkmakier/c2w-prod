<template lang="">
  <div>
    <form @submit.prevent="submit">
      <h1 style="text-align: center; margin-top: -10px">
        {{ $t("homepage.login") }}
      </h1>
      <Message severity="error" v-if="errorMessage" :closable="false">{{
        errorMessage
      }}</Message>
      <div class="flex flex-column gap-2">
        <label class="fw-500"
          ><i class="pi pi-user" style="font-size: 1rem"></i>
          {{ $t("profile.username") }}</label
        >
        <InputText
          id="username"
          v-model="state.username"
          aria-describedby="username-help"
          style="margin-top: 5px"
          autofocus
          :class="{ 'p-invalid': v$.username.$error }" />
        <small style="color: var(--red-400)" v-if="v$.username.$error">{{
          changeErrorMessage(v$.username.$errors[0].$message, "Username")
        }}</small>
      </div>
      <div class="flex flex-column gap-2 mt-2">
        <div style="display: flex; justify-content: space-between">
          <label class="fw-500"
            ><i class="pi pi-lock" style="font-size: 1rem"></i>
            {{ $t("profile.password") }}</label
          >
          <a
            href="javascript:void(0);"
            class="forgotPass fw-500"
            style="color: var(--surface-400)"
            @click="state.forgotPass = true"
            >{{ $t("profile.forgotPass") }}</a
          >
        </div>

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
        <div class="forgot_rememberme">
          <div class="flex align-items-center">
            <!-- <Checkbox
              v-model="state.rememberMe"
              inputId="ingredient1"
              name="pizza"
              value="rememberMe" />
            <label for="ingredient1" class="ml-2"> Remember me </label> -->
          </div>
        </div>
        <Button
          :label="$t('homepage.login')"
          class="w-100 mt-3"
          type="submit"
          :loading="loading" />
      </div>
      <Dialog
        :draggable="false"
        v-model:visible="state.forgotPass"
        modal
        :header="$t('profile.password')"
        :style="{ width: '40rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="card">
          <Message
            :severity="fpasssev"
            v-if="forgotPasswordMessage"
            :closable="false"
            >{{ forgotPasswordMessage }}</Message
          >
          <TabView class="tabview-custom" v-if="!showChangePasswordField">
            <TabPanel>
              <template #header>
                <div class="flex align-items-center">
                  <i class="pi pi-envelope me-1" style="font-size: 1rem"></i>
                  <span class="font-bold white-space-nowrap">Email</span>
                </div>
              </template>
              <div class="flex flex-column gap-2 mb-1">
                <label class="fw-500"
                  >{{ $t("profile.username") }}
                  <span style="color: var(--red-300)">*</span></label
                >
                <InputText
                  v-model="fusername"
                  style="margin-top: 5px"
                  autofocus />
              </div>
              <div class="flex flex-column gap-2">
                <label class="fw-500"
                  >{{ $t("profile.enterEmail") }}
                  <span style="color: var(--red-300)">*</span></label
                >
                <InputText v-model="email" style="margin-top: 5px" autofocus />
              </div>
              <Button
                label="Submit"
                class="w-100 mt-2"
                @click="submitEmailpassword('email', email)"
                :loading="btnLoading" />
            </TabPanel>
            <TabPanel>
              <template #header>
                <div class="flex align-items-center gap-2">
                  <i class="pi pi-phone me-1" style="font-size: 1rem"></i>
                  <span class="font-bold white-space-nowrap"
                    >{{ $t("profile.mobileNumber") }}
                  </span>
                </div>
              </template>
              <div class="flex flex-column gap-2 mb-1">
                <label class="fw-500"
                  >{{ $t("profile.username") }}
                  <span style="color: var(--red-300)">*</span></label
                >
                <InputText
                  v-model="fusername"
                  style="margin-top: 5px"
                  autofocus />
              </div>
              <div class="flex flex-column gap-2">
                <label class="fw-500">
                  {{ $t("profile.enterMobileNum") }}
                  <span style="color: var(--red-300)">*</span>
                </label>
                <InputMask
                  id="phone"
                  v-model="mobile"
                  mask="9999-999-9999"
                  placeholder="09**-***-****" />
                <small
                  id="username-help"
                  style="color: var(--red-400); display: none"
                  >Enter your username to reset your password.</small
                >
              </div>
              <Button
                label="Submit"
                class="w-100 mt-2"
                @click="submitForgotPassword('mobile', mobile)"
                :loading="btnLoading" />
            </TabPanel>
          </TabView>
          <div class="" v-else>
            <div class="flex flex-column gap-2">
              <label class="fw-500"
                >Verification Code
                <span style="color: var(--red-400)">*</span></label
              >
              <InputText
                v-model="stateP.vcode"
                style="margin-top: 5px"
                autofocus
                :class="{ 'p-invalid': c$.vcode.$error }" />
              <small style="color: var(--red-400)" v-if="c$.vcode.$error">{{
                changeErrorMessage(
                  c$.vcode.$errors[0].$message,
                  "Verification code"
                )
              }}</small>
            </div>
            <div class="flex flex-column gap-2 mt-2">
              <label class="fw-500"
                >New Password
                <span style="color: var(--red-400)">*</span></label
              >
              <Password
                v-model="stateP.newpass"
                toggleMask
                class="w-100"
                :feedback="false"
                style="margin-top: 5px"
                :class="{ 'p-invalid': c$.newpass.$error }" />

              <small style="color: var(--red-400)" v-if="c$.newpass.$error">{{
                changeErrorMessage(
                  c$.newpass.$errors[0].$message,
                  "New password"
                )
              }}</small>
            </div>
            <div class="flex flex-column gap-2 mt-2">
              <label class="fw-500"
                >Confirm New Password
                <span style="color: var(--red-400)">*</span></label
              >
              <Password
                v-model="stateP.conpass"
                toggleMask
                class="w-100"
                :feedback="false"
                style="margin-top: 5px"
                :class="{ 'p-invalid': c$.conpass.$error }" />

              <small style="color: var(--red-400)" v-if="c$.conpass.$error">{{
                changeErrorMessage(
                  c$.conpass.$errors[0].$message,
                  "Confirm password"
                )
              }}</small>
            </div>
            <Button
              label="Submit"
              class="w-100 mt-2"
              @click="submitSuccessPassword"
              :loading="btnLoading" />
          </div>
        </div>
      </Dialog>
    </form>
  </div>
</template>
<script>
import TheForgotPassword from "@/components/TheForgotPassword.vue";
import { ref, reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import {
  required,
  sameAs,
  helpers,
  maxLength,
  minLength,
} from "@vuelidate/validators";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";
export default {
  components: {
    TheForgotPassword,
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
    rememberMe: {
      type: Boolean,
      required: false,
    },
    forgotPass: {
      type: Boolean,
      required: false,
    },
    errorMessage: {
      type: String,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      username: props.username,
      password: props.password,
      rememberMe: props.rememberMe,
      forgotPass: props.forgotPass,
    });

    const stateP = reactive({
      vcode: "",
      newpass: "",
      conpass: "",
    });

    const email = ref("");
    const mobile = ref("");
    const forgotPasswordMessage = ref("");
    const fpasssev = ref();
    const showChangePasswordField = ref(false);
    const fusername = ref("");
    const btnLoading = ref(false);
    const specialCharacterChecking = (value) => /^[a-zA-Z0-9]+$/.test(value);

    const rules = computed(() => {
      return {
        username: {
          required,
          specialCharacterChecking: helpers.withMessage(
            "This field does not allow special characters",
            specialCharacterChecking
          ),
        },
        password: { required },
      };
    });

    const v$ = useValidate(rules, state);

    const submit = () => {
      v$.value.$validate();

      if (!v$.value.$error) {
        emit("submit", {
          username: state.username.trim(),
          password: state.password.trim(),
        });
      }
    };

    const submitEmailpassword = async (type, val) => {
      forgotPasswordMessage.value = "";
      btnLoading.value = true;
      if ((type === "email" && val === "") || fusername.value === "") {
        forgotPasswordMessage.value = "Please fill the required fields.";
        fpasssev.value = "error";
        btnLoading.value = false;
        return;
      }

      if (type === "email" && val !== "" && fusername.value !== "") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          forgotPasswordMessage.value = "Invalid email format";
          fpasssev.value = "error";
          btnLoading.value = false;
          return;
        }
      }

      const res = await axios.forgotPassword({
        recovery_type: type,
        info: val.trim(),
        username: fusername.value.trim(),
      });
      if (res.resStatus === 0) {
        forgotPasswordMessage.value =
          "We will send you a verification code to change your password.";
        fpasssev.value = "success";
        showChangePasswordField.value = true;
      } else {
        if (res.resStatus === 1) {
          forgotPasswordMessage.value = res.resMsg;
          fpasssev.value = "error";
        } else {
          forgotPasswordMessage.value =
            "Something went wrong... Please try again.";
          fpasssev.value = "error";
        }
      }
      btnLoading.value = false;
      console.log(res);
    };

    const submitForgotPassword = async (type, val) => {
      btnLoading.value = true;
      forgotPasswordMessage.value = "";

      if (type === "mobile" && val !== "" && fusername.value !== "") {
        const res = val.toString().slice(0, 2);
        if (res !== "09") {
          forgotPasswordMessage.value =
            "Invalid mobile format. It should start with '09xx-xxx-xxxx'";
          fpasssev.value = "error";
          btnLoading.value = false;
          return;
        }
      }

      if (
        (type === "mobile" && val === "" && val.length != 11) ||
        fusername.value === ""
      ) {
        forgotPasswordMessage.value = "Please fill the required fields.";
        fpasssev.value = "error";
        btnLoading.value = false;
        return;
      }
      let numb = val.replace(/-/g, "");

      const res = await axios.forgotPassword({
        recovery_type: type,
        info: numb.trim(),
        username: fusername.value.trim(),
      });
      console.log(res);
      if (res.resStatus === 0) {
        forgotPasswordMessage.value = res.resMsg;
        fpasssev.value = "success";
        showChangePasswordField.value = true;
      } else {
        if (res.resStatus === 1) {
          forgotPasswordMessage.value = res.resMsg;
          fpasssev.value = "error";
        } else {
          forgotPasswordMessage.value =
            "Something went wrong... Please try again.";
          fpasssev.value = "error";
        }
      }
      btnLoading.value = false;
      console.log(res);
    };

    const changeErrorMessage = (value, handleValue) => {
      if (value.includes("Value")) {
        return value.replace("Value", handleValue);
      } else {
        return value;
      }
    };

    const sPassRules = computed(() => {
      return {
        vcode: { required, minLengthValue: minLength(4) },
        newpass: {
          required,
          minLengthValue: minLength(8),
          maxLengthValue: maxLength(30),
        },
        conpass: { required, sameAs: sameAs(stateP.newpass) },
      };
    });

    const c$ = useValidate(sPassRules, stateP);

    const submitSuccessPassword = async () => {
      forgotPasswordMessage.value = "";
      btnLoading.value = true;
      c$.value.$validate();

      if (!c$.value.$error) {
        emit("submitReqChangePass", stateP);
        try {
          const res = await axios.resetPassword(stateP);
          if (res.resStatus === 1) {
            forgotPasswordMessage.value = res.resMsg;
            fpasssev.value = "error";
            btnLoading.value = false;
          } else {
            if (res.resStatus === 0) {
              let count = 7;
              setInterval(() => {
                count -= 1;
                forgotPasswordMessage.value = `Password has been changed successfully. This will be close in ${count}.`;
                fpasssev.value = "success";
                if (count <= 0) {
                  state.forgotPass = false;
                  btnLoading.value = false;
                  return;
                }
              }, 1500);
            } else {
              forgotPasswordMessage.value = "Something went wrong...";
              fpasssev.value = "error";
              btnLoading.value = false;
            }
            btnLoading.value = false;
          }
        } catch (e) {
          console.log(e);
          btnLoading.value = false;
        }
      } else {
        btnLoading.value = false;
        console.log(c$.value.$error);
      }
    };

    return {
      state,
      email,
      mobile,
      v$,
      c$,
      forgotPasswordMessage,
      fpasssev,
      showChangePasswordField,
      stateP,
      fusername,
      btnLoading,
      submit,
      changeErrorMessage,
      submitForgotPassword,
      submitSuccessPassword,
      submitEmailpassword,
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
  color: var(--primary-color);
}
</style>
