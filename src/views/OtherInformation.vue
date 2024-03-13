<template>
  <div class="info-body-otherinfo">
    <div class="left-content-body" style="padding-top: 40px">
      <div
        v-if="showBurger"
        @click="toggleSideMenu = true"
        class="burger"
        style="
          position: absolute;
          right: 3%;
          top: 3%;
          display: none;
          z-index: 2;
        ">
        <i
          class="pi pi-align-right"
          style="font-size: 2rem; cursor: pointer"></i>
      </div>
      <div class="aboutus" v-if="routeInfo === 'about'">
        <img src="@/assets/images/logo.webp" alt="" />
        <h2>About Come2Win</h2>
        <p>
          Welcome to Come2Win, the epitome of online gaming sophistication! At
          Come2Win, our commitment to excellence shines through in every aspect
          of your gaming adventure. We passionately blend innovation,
          excitement, and responsible gaming to create an unparalleled
          experience. With a diverse range of games spanning from classic
          favorites to cutting-edge releases, coupled with state-of-the-art
          technology and top-notch security measures, we ensure a seamless and
          enjoyable journey for our players. Our 24/7 customer support team is
          always ready to assist, reflecting our dedication to your
          satisfaction. From fair play principles to rewarding promotions,
          Come2Win sets the standard for a premium online gaming destination.
          What truly sets Come2Win apart is our unwavering dedication to
          responsible gaming. We believe in creating an environment where the
          thrill of winning is accompanied by a commitment to safe and
          responsible play. Join us at Come2Win, where every click opens the
          door to an exhilarating adventure, promising not just wins but an
          unparalleled gaming experience.
        </p>

        <h3 class="mt-5">Guaranteed</h3>
        <div class="stack-cards">
          <div class="c-cards cw">
            <h4>Cash In and Withdrawals</h4>
            <p>
              Experience the ease of fast deposits and withdrawals, ensuring
              your transactions are quick and efficient.
            </p>
          </div>
          <div class="c-cards tth">
            <h4>Transaction transparency history</h4>
            <p>
              Empower your decisions with our transparent transaction history
              for financial clarity
            </p>
          </div>
          <div class="c-cards csr">
            <h4>Customer Support 24 / 7</h4>
            <p>
              Reliable assistance whenever you need it – our 24/7 Customer
              Support is here for you, day and night.
            </p>
          </div>
        </div>
      </div>
      <div v-if="routeInfo === 'faq'" class="faq">
        <h2>Frequently Ask Question (FAQ)</h2>
        <Accordion :activeIndex="0">
          <AccordionTab header="How do I register for an account?">
            <p class="m-0">
              To create an account on Come2Win, simply visit our website and
              click on the "Register" button. Follow the registration process,
              providing accurate information, and choose a secure password.
            </p>
          </AccordionTab>
          <AccordionTab header="What games are available on Come2Win?">
            <p class="m-0">
              Come2Win offers a wide range of games, including but not limited
              to slots, table games (such as blackjack, roulette, and poker),
              and live dealer games. Explore our platform to discover the
              variety of gaming options available.
            </p>
          </AccordionTab>
          <AccordionTab header="Is my personal information safe?">
            <p class="m-0">
              Yes, we prioritize the security and confidentiality of your
              personal information. Come2Win employs advanced encryption
              technologies to safeguard your data and ensure a secure gaming
              experience.
            </p>
          </AccordionTab>
          <AccordionTab
            header="How can I deposit money into my Come2Win account?">
            <p class="m-0">
              You can fund your Come2Win account through various methods,
              including credit/debit cards, bank transfers, and e-wallets.
            </p>
          </AccordionTab>
          <AccordionTab header="Are there any bonuses or promotions?">
            <p class="m-0">
              Yes, Come2Win offers a range of bonuses and promotions for both
              new and existing players. Keep an eye on our promotions page for
              the latest offers, including welcome bonuses, free spins, and
              loyalty rewards.
            </p>
          </AccordionTab>
          <AccordionTab header="How can I withdraw my winnings?">
            <p class="m-0">
              To withdraw your winnings, navigate to the "Withdrawal" section in
              your account. Choose your preferred withdrawal method and follow
              the instructions. Note that withdrawal options may vary, and some
              methods may have specific requirements.
            </p>
          </AccordionTab>
          <AccordionTab header="Is Come2Win fair and transparent?">
            <p class="m-0">
              Absolutely. Come2Win employs certified Random Number Generators
              (RNGs) to ensure fair gameplay. We are committed to transparency
              and provide detailed information on game rules, odds, and payout
              percentages.
            </p>
          </AccordionTab>
          <AccordionTab header="What responsible gaming measures are in place?">
            <p class="m-0">
              Come2Win promotes responsible gaming and provides tools such as
              deposit limits, self-exclusion options, and reality checks. We
              encourage players to gamble responsibly and seek help if they feel
              their gaming habits are becoming problematic.
            </p>
          </AccordionTab>
          <AccordionTab header="How can I contact Come2Win's customer support?">
            <p class="m-0">
              Our customer support team is available 24/7. You can reach us
              through live chat, email, or phone. Visit the "Contact Us" section
              on our website for detailed contact information.
            </p>
          </AccordionTab>
        </Accordion>
        <p>
          Remember, responsible gaming is essential for a positive online
          gambling experience. Please gamble responsibly.
        </p>
      </div>
      <div v-if="routeInfo === 'contact'" class="contact">
        <img
          src="/src/assets/images/maintenance_game.svg"
          style="width: 450px" />
        <h1>Sorry, this page is under maintenance</h1>
      </div>

      <div style="margin-top: 200px"><Divider /></div>
      <TheFooter />
      <Sidebar
        v-model:visible="toggleSideMenu"
        header=" "
        position="right"
        style="background-color: #1a1c1e">
        <div><TheSidebar /></div>
      </Sidebar>
    </div>
    <div class="right-content-body"><TheSidebar /></div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import TheSidebar from "@/components/TheSidebar.vue";
import { ref, watch, onMounted, watchEffect } from "vue";
import TheFooter from "@/components/TheFooter.vue";
import { useAuthStore } from "@/stores/user.js";
export default {
  components: { TheSidebar, TheFooter },
  setup() {
    const route = useRoute();
    const routeInfo = ref(route.params.info || "");
    const showBurger = ref(false);
    const store = useAuthStore();
    const toggleSideMenu = ref(false);
    onMounted(() => {
      if (store.user) {
        showBurger.value = true;
      } else {
        showBurger.value = false;
        toggleSideMenu.value = false;
      }
    });

    watch(
      () => route.params.info,
      (newInfo) => {
        routeInfo.value = newInfo;
      }
    );
    watchEffect(() => {
      if (store.user) {
        showBurger.value = true;
      } else {
        showBurger.value = false;
        toggleSideMenu.value = false;
      }
    });
    return {
      routeInfo,
      showBurger,
      toggleSideMenu,
    };
  },
};
</script>
<style>
/* Contact */
.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

/* FAQ */
.faq .p-accordion .p-accordion-content {
  background-color: #1a1c1e;
  color: #fff;
  font-weight: 300;
  border-color: #5f5f5f;
}
.faq
  .p-accordion
  .p-accordion-header:not(.p-disabled).p-highlight
  .p-accordion-header-link {
  background-color: #5f5f5f;
  border-color: #5f5f5f;
  color: #fff;
}

.faq .p-accordion .p-accordion-header .p-accordion-header-link {
  background-color: #5f5f5f;
  border-color: #5f5f5f;
  color: #fff;
}

/* ABOUT */
.aboutus,
.faq {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
}
.aboutus img {
  width: 250px;
}

.info-body-otherinfo {
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-color: #1a1c1e;
  display: flex;
}
.left-content-body {
  width: 80%;
}
.right-content-body {
  width: 21.5%;
}

.stack-cards {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.c-cards {
  width: 400px;
  height: 150px;
  color: #fff;
  padding: 0.1px 30px;
  border-radius: 10px;
}

.c-cards p {
  font-size: 1rem;
  margin-top: 3px;
  text-shadow: 0 7px 5px #1a1c1e;
}
.cw {
  background: url("@/assets/images/customCard.png");
}
.tth {
  background: url("@/assets/images/customCard2.png");
}
.csr {
  background: url("@/assets/images/customCard3.png");
}
</style>
