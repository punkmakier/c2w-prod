<template>
    <div
          style="
            border-radius: 12px;
            background-image: radial-gradient(
              circle at left top,
              #ffa0a0,
              #f94646
            );
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 30rem;
            padding: 2rem;
          ">
          <svg
            style="width: 100px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 96 96"
            fill="none"
            class="css-1axk06m">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M88 48c0 22.091-17.909 40-40 40S8 70.091 8 48 25.909 8 48 8s40 17.909 40 40z"
              fill="url(#general-warning_svg__paint0_linear_22059_28207)"></path>
            <path
              d="M48 19c16.016 0 29 12.984 29 29S64.016 77 48 77 19 64.016 19 48s12.984-29 29-29z"
              fill="url(#general-warning_svg__paint1_linear_22059_28207)"></path>
            <path d="M45 66h6v-6h-6v6zM51 54V30h-6v24h6z" fill="#14151A"></path>
            <defs>
              <linearGradient
                id="general-warning_svg__paint0_linear_22059_28207"
                x1="8"
                y1="48"
                x2="102.5"
                y2="48"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#F0B90B" stop-opacity="0"></stop>
                <stop offset="1" stop-color="#F0B90B"></stop>
              </linearGradient>
              <linearGradient
                id="general-warning_svg__paint1_linear_22059_28207"
                x1="77"
                y1="48"
                x2="19"
                y2="48"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#F0B90B"></stop>
                <stop offset="1" stop-color="#F8D33A"></stop>
              </linearGradient>
            </defs>
          </svg>
          <h2>Important Notice</h2>
          <p>
            Please update your email or phone on your profile. <br />This is to:
            <ul>
              <li>Secure your credentials</li>
              <li>Use for forgot password</li>
            </ul>
          </p>
          <div style="display: flex; gap: 20px">
            <Button label="Close" @click="$emit('closeCallback')" outlined style="border: 1px solid #fff;color: #fff;"/>
            <router-link to="/profile" style="border: 1px solid #fff314;background-color: #fff314;color: rgb(18, 18, 18);border-radius: 5px;text-decoration: none;font-size: 1rem; font-weight: 600; display:flex; justify-content: center; align-items: center;padding: 0 30px;" > <span>Proceed to profile</span></router-link>
          </div>
        </div>
</template>
