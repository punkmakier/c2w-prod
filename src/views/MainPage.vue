<template>
  <main>
    <Toast position="top-center" />

    <div class="csr-button" @click="openChatBoxFunc">
      <Tag
        severity="danger"
        :value="countUnreadChat"
        style="background-color: red; margin-top: -50px; margin-right: -20px"
        v-if="countUnreadChat"></Tag>
      <svg
        height="25px"
        width="25px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xml:space="preserve"
        fill="#ffffff"
        stroke="#ffffff">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="#CCCCCC"
          stroke-width="14.336000000000002"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            style="fill: #ffffff"
            d="M256,0C129.763,0,27.429,102.335,27.429,228.571v118.857c0,10.098,8.187,18.286,18.286,18.286H64 v-91.429H45.714v-45.714c0-115.952,94.334-210.286,210.286-210.286s210.286,94.334,210.286,210.286v45.714H448v91.429h9.143 c0,65.536-53.321,118.857-118.857,118.857H320v18.286h18.286c75.625,0,137.143-61.518,137.143-137.143v-2.466 c5.461-3.163,9.143-9.055,9.143-15.819V228.571C484.571,102.335,382.237,0,256,0z"></path>
          <path
            style="fill: #ffffff"
            d="M100.571,393.143H82.286c-10.099,0-18.286-8.186-18.286-18.286V265.143 c0-10.099,8.186-18.286,18.286-18.286h18.286c10.099,0,18.286,8.186,18.286,18.286v109.714 C118.857,384.957,110.671,393.143,100.571,393.143z"></path>
          <path
            style="fill: #ffffff"
            d="M118.857,374.857V265.143c0-10.099-8.187-18.286-18.286-18.286h-9.143v146.286h9.143 C110.67,393.143,118.857,384.955,118.857,374.857z"></path>
          <path
            style="fill: #ffffff"
            d="M411.429,246.857h18.286c10.099,0,18.286,8.186,18.286,18.286v109.714 c0,10.099-8.186,18.286-18.286,18.286h-18.286c-10.099,0-18.286-8.186-18.286-18.286V265.143 C393.143,255.043,401.329,246.857,411.429,246.857z"></path>
          <g>
            <path
              style="fill: #ffffff"
              d="M393.143,265.143v109.714c0,10.099,8.187,18.286,18.286,18.286h9.143V246.857h-9.143 C401.33,246.857,393.143,255.045,393.143,265.143z"></path>
            <path
              style="fill: #ffffff"
              d="M320,512h-27.429c-5.049,0-9.143-4.094-9.143-9.143v-18.286c0-5.049,4.094-9.143,9.143-9.143H320 c10.099,0,18.286,8.186,18.286,18.286l0,0C338.286,503.814,330.099,512,320,512z"></path>
          </g>
          <path
            style="fill: #ffffff"
            d="M329.143,237.714H182.857c-15.149,0-27.429,12.28-27.429,27.429v109.714 c0,15.149,12.28,27.429,27.429,27.429h91.429V432.4c0,5.742,6.942,8.617,11.001,4.557l34.671-34.671h9.185 c15.149,0,27.429-12.28,27.429-27.429V265.143C356.571,249.994,344.291,237.714,329.143,237.714z M201.143,338.286 c-10.098,0-18.286-8.187-18.286-18.286c0-10.099,8.187-18.286,18.286-18.286s18.286,8.186,18.286,18.286 C219.429,330.098,211.241,338.286,201.143,338.286z M256,338.286c-10.098,0-18.286-8.187-18.286-18.286 c0-10.099,8.187-18.286,18.286-18.286c10.098,0,18.286,8.186,18.286,18.286C274.286,330.098,266.098,338.286,256,338.286z M310.857,338.286c-10.098,0-18.286-8.187-18.286-18.286c0-10.099,8.187-18.286,18.286-18.286c10.098,0,18.286,8.186,18.286,18.286 C329.143,330.098,320.955,338.286,310.857,338.286z"></path>
        </g>
      </svg>
    </div>

    <SplashScreen v-if="showSplashScreen" />
    <Loaders v-if="showLoaders" />
    <div class="left-sidebar">
      <div class="left-sidebar-inner">
        <TheHeroSection @gameTypeFunc="gameTypeSelected" />
        <div class="main-games">
          <div ref="inHouseRef"></div>
          <div class="games mt-4"></div>
          <div class="favorites">
            <h3>
              <i
                class="pi pi-star-fill"
                style="font-size: 1rem; color: #fff314"></i>
              {{ $t("homepage.liveGames") }}
              <!-- <small style="color: var(--surface-500); font-size: 0.8rem"
                >(Max 5 list only)</small
              > -->
            </h3>
            <div class="game-list recommended">
              <LotteryCards
                v-for="(data, index) in receiveInhouseGame2"
                :key="index"
                :id="data.id"
                :bgimage="data.image"
                :url="data.url"
                :title="data.title"
                @playInHouseGame="playInhouseGame" />

              <LiveGamesCard
                v-for="(data, index) in receiveInhouseGame1"
                :key="index"
                :id="data.id"
                :providerName="data.name"
                :bgimage="data.image"
                :url="data.url"
                :title="data.title"
                :providerImage="data.providerImage"
                @showLiveGameModal="showLiveGameModalFunc" />
            </div>
          </div>
        </div>
        <div
          class="main-games mt-2"
          v-if="showFavorites && favoriteHandler.length > 0">
          <div class="games"></div>
          <div class="favorites">
            <h3>
              <i
                class="pi pi-star-fill"
                style="font-size: 1rem; color: #fff314"></i>
              Favorites
              <small style="color: var(--surface-500); font-size: 0.8rem"
                >(Max 5 list only)</small
              >
            </h3>
            <div class="game-list recommended">
              <GameCards
                v-for="(data, index) in favoriteHandler"
                :key="data.id"
                :title="data.title"
                :bgimage="data.bgimg"
                :provider="data.provider"
                :providerLogo="data.prologo"
                :favorite="data.favorite"
                :url="data.url"
                :id="data.id"
                @playGame="playGame"
                @addRemoveFavoriteList="
                  addRemoveFaveList(data.id, data.favorite)
                " />
            </div>
          </div>
        </div>
      </div>
      <TheSidebar />
    </div>
    <div class="main-section mt-5">
      <div ref="gamesListRef"></div>
      <div class="games-list-parent" style="padding: 20px">
        <TheProviders @selectProvider="selectedProvider" />

        <span class="p-input-icon-left w-100 mt-3 mb-2">
          <i class="pi pi-search" />
          <InputText
            v-model="searchTerm"
            class="searchField"
            :placeholder="$t('searchGame')" />
        </span>
        <!-- <Chip
          removable
          v-if="searchedItemStore"
          v-for="data in searchedItemStore"
          :label="data"
          :key="data.id"
          @remove="removeGameType(data)" /> -->
        <h2 class="providerNameSpan" style="display: flex; gap: 10px">
          <img
            src="@/assets/images/game_controller.png"
            style="width: 30px"
            alt="" />
          {{ $t("homepage.all") }}
          <span style="color: #ff1354" v-if="providerHolder != ''"
            >{{ providerHolder }}'s</span
          >
          {{ $t("homepage.games") }}
        </h2>
        <div class="game-list">
          <div style="width: 100%" v-if="receivedGameDataList.length == 0">
            <h1 style="text-align: center">
              {{ $t("homepage.noGamesFound") }}
            </h1>
          </div>

          <GameCards
            v-for="(data, index) in receivedGameDataList"
            :key="data.id"
            :title="data.title"
            :bgimage="data.bgimg"
            :providerLogo="data.prologo"
            :provider="data.provider"
            :favorite="data.favorite"
            :id="data.id"
            :url="data.url"
            :badgeText="data.badgeText"
            :gameType="data.gameType"
            @playGame="playGame"
            @addRemoveFavoriteList="
              addRemoveFaveList(data.id, data.favorite)
            " />
        </div>
      </div>

      <divider
        class="customDivider"
        v-if="totalShowGames <= totalGames"
        @click="loadMore"
        >{{ $t("loadMore") }}
        <i
          class="pi pi-arrow-circle-down loadMoreIcon"
          style="font-size: 0.9rem"></i>
        <small style="margin-left: 5px"
          >({{ totalShowGames }} / {{ totalGames }})</small
        ></divider
      >
      <div class="mb-5" v-if="totalShowGames >= totalGames"></div>

      <Lotto @playInhouseGame="playInhouseGame" />
      <ThePaymentGateway />
      <div class="separator"><Divider /></div>

      <TheFooter />
    </div>

    <Dialog
      :draggable="false"
      v-model:visible="loginModal"
      modal
      header=" "
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <TheLoginForm
        @submit="submitLogin"
        :errorMessage="errorMessage"
        :loading="isLoading" />
    </Dialog>

    <Dialog
      v-model:visible="isNotice"
      modal
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)',
        },
      }">
      <template #container="{ closeCallback }">
        <ImportantNotice @closeCallback="closeCallback"
      /></template>
    </Dialog>

    <TheGameFrame
      :showGame="showGameModal"
      @exitGame="exitGame"
      :url="gameUrl"
      :htmlType="htmlVal" />

    <PaymentProcess
      :url="state.url"
      :qr="state.qr"
      :amount="state.amount"
      @closeQRPayment="closeQRPayment"
      v-if="state.url" />

    <div class="chat-box chat-box-parent" v-if="openChatBox">
      <div class="chat-header">
        <div style="display: flex; gap: 10px; flex-direction: column">
          <div style="display: flex; align-items: center; gap: 10px">
            <svg
              height="25px"
              width="25px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xml:space="preserve"
              fill="#ffffff"
              stroke="#ffffff">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#CCCCCC"
                stroke-width="14.336000000000002"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  style="fill: #ffffff"
                  d="M256,0C129.763,0,27.429,102.335,27.429,228.571v118.857c0,10.098,8.187,18.286,18.286,18.286H64 v-91.429H45.714v-45.714c0-115.952,94.334-210.286,210.286-210.286s210.286,94.334,210.286,210.286v45.714H448v91.429h9.143 c0,65.536-53.321,118.857-118.857,118.857H320v18.286h18.286c75.625,0,137.143-61.518,137.143-137.143v-2.466 c5.461-3.163,9.143-9.055,9.143-15.819V228.571C484.571,102.335,382.237,0,256,0z"></path>
                <path
                  style="fill: #ffffff"
                  d="M100.571,393.143H82.286c-10.099,0-18.286-8.186-18.286-18.286V265.143 c0-10.099,8.186-18.286,18.286-18.286h18.286c10.099,0,18.286,8.186,18.286,18.286v109.714 C118.857,384.957,110.671,393.143,100.571,393.143z"></path>
                <path
                  style="fill: #ffffff"
                  d="M118.857,374.857V265.143c0-10.099-8.187-18.286-18.286-18.286h-9.143v146.286h9.143 C110.67,393.143,118.857,384.955,118.857,374.857z"></path>
                <path
                  style="fill: #ffffff"
                  d="M411.429,246.857h18.286c10.099,0,18.286,8.186,18.286,18.286v109.714 c0,10.099-8.186,18.286-18.286,18.286h-18.286c-10.099,0-18.286-8.186-18.286-18.286V265.143 C393.143,255.043,401.329,246.857,411.429,246.857z"></path>
                <g>
                  <path
                    style="fill: #ffffff"
                    d="M393.143,265.143v109.714c0,10.099,8.187,18.286,18.286,18.286h9.143V246.857h-9.143 C401.33,246.857,393.143,255.045,393.143,265.143z"></path>
                  <path
                    style="fill: #ffffff"
                    d="M320,512h-27.429c-5.049,0-9.143-4.094-9.143-9.143v-18.286c0-5.049,4.094-9.143,9.143-9.143H320 c10.099,0,18.286,8.186,18.286,18.286l0,0C338.286,503.814,330.099,512,320,512z"></path>
                </g>
                <path
                  style="fill: #ffffff"
                  d="M329.143,237.714H182.857c-15.149,0-27.429,12.28-27.429,27.429v109.714 c0,15.149,12.28,27.429,27.429,27.429h91.429V432.4c0,5.742,6.942,8.617,11.001,4.557l34.671-34.671h9.185 c15.149,0,27.429-12.28,27.429-27.429V265.143C356.571,249.994,344.291,237.714,329.143,237.714z M201.143,338.286 c-10.098,0-18.286-8.187-18.286-18.286c0-10.099,8.187-18.286,18.286-18.286s18.286,8.186,18.286,18.286 C219.429,330.098,211.241,338.286,201.143,338.286z M256,338.286c-10.098,0-18.286-8.187-18.286-18.286 c0-10.099,8.187-18.286,18.286-18.286c10.098,0,18.286,8.186,18.286,18.286C274.286,330.098,266.098,338.286,256,338.286z M310.857,338.286c-10.098,0-18.286-8.187-18.286-18.286c0-10.099,8.187-18.286,18.286-18.286c10.098,0,18.286,8.186,18.286,18.286 C329.143,330.098,320.955,338.286,310.857,338.286z"></path>
              </g>
            </svg>
            <span>{{ $t("chats.header") }}</span>
          </div>

          <div
            style="display: flex; gap: 10px"
            v-if="finalGuestName || myUsername">
            <span style="font-size: 0.9rem">
              {{
                !myUsername
                  ? $t("chats.guestName") + ": "
                  : $t("chats.playerName") + ": "
              }}
              {{ finalGuestName }} {{ myUsername }}</span
            >
            <a
              href="javascript:void(0);"
              style="color: #fff; font-size: 0.8rem"
              @click="logoutChatGuestName"
              v-if="!myUsername"
              >{{ $t("chats.logout") }}</a
            >
          </div>
        </div>

        <div
          style="cursor: pointer; padding: 10px; margin-top: 10px"
          @click="openChatBox = false">
          <i class="pi pi-angle-down" style="font-size: 1.5rem"></i>
        </div>
      </div>
      <div
        class="intro-guest"
        style="
          background-color: #fcd248;
          width: 70%;
          margin: 50px auto;
          border-radius: 7px;
          padding: 10px 15px;
          text-align: center;
        "
        v-if="!isGuestChat && !finalGuestName && !myUsername">
        <br />
        <span style="margin-top: 20px; color: #1d1d1d; font-weight: 600">{{
          $t("chats.guestTitle")
        }}</span>
        <p style="font-size: 0.8rem; color: #1d1d1dc9">
          {{ $t("chats.desc") }}
        </p>
        <form @submit.prevent="createGuestChat">
          <div style="display: flex; flex-direction: column">
            <label style="color: #1d1d1dc9; font-weight: 600; text-align: start"
              >{{ $t("chats.name") }}
              <small style="color: red">({{ $t("chats.max") }})</small></label
            >
            <div
              style="
                text-align: start;
                display: flex;
                align-items: center;
                background-color: #fff;
                padding: 10px 15px;
                border-radius: 8px;
              ">
              <input
                v-model="guestChatName"
                @input="handleSlicedChange"
                type="text"
                :placeholder="$t('chats.enterName')"
                style="border: none; outline: none" />
              <button
                style="
                  padding: 10px 15px;
                  margin-top: 7px;
                  border-radius: 5px;
                  border: none;
                  outline: none;
                  cursor: pointer;
                  background-color: #ff1354;
                  color: #fff;
                  font-weight: 600;
                "
                type="submit">
                {{ $t("chats.submit") }}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        style="
          padding: 15px;
          height: 480px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        ">
        <div
          class="chatClass"
          v-for="(val, index) in messages"
          :key="index"
          :class="{
            replied:
              val.username === finalGuestName || val.username === myUsername,
          }"
          v-if="finalGuestName || myUsername">
          <div
            style="
              display: flex;
              gap: 10px;
              align-items: start;
              text-align: start;
            "
            v-if="
              (val.username !== finalGuestName && finalGuestName) ||
              (val.username !== myUsername && myUsername)
            ">
            <img
              :src="
                val.user_type === 'user'
                  ? 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'
                  : 'https://icons.veryicon.com/png/o/system/ued_v10-of-shengye-group/general-contact-customer-service-icon.png'
              "
              style="
                width: 35px;
                border-radius: 50px;
                top: 0;
                padding: 3px;
                border: 2px solid #ededed78;
              " />
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: end;
              ">
              <span
                style="
                  padding: 0;
                  margin: 0;
                  font-size: 1rem;
                  text-shadow: 0 2px 3px #000000;
                "
                >{{ evalIsGuest(val.isGuest) }}{{ val.username }}
              </span>

              <div class="" v-if="val.type === 'image'">
                <img
                  :src="checkMessageFile(val.message)"
                  alt=""
                  style="width: 70px" />
              </div>
              <p style="font-size: 0.8rem; margin-top: 0px" v-else>
                {{ val.message }}
              </p>
              <small style="font-size: 0.7rem">{{ val.date }}</small>
            </div>
          </div>
          <div
            style="
              display: flex;
              gap: 10px;
              align-items: center;
              text-align: end;
            "
            v-else>
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: end;
              ">
              <span
                style="
                  padding: 0;
                  margin: 0;
                  font-size: 1rem;
                  text-shadow: 0 2px 3px #000000;
                "
                >{{ val.username }}
              </span>
              <div class="" v-if="val.type === 'image'">
                <img
                  :src="val.message"
                  style="width: 100px; cursor: zoom-in"
                  @click="showBigImage(index, 'base64')"
                  class="zoomable"
                  v-if="val.imageVal" />
                <img
                  :src="`https://macwin.live/images/${val.message}`"
                  @click="showBigImage(index, '')"
                  class="zoomable"
                  style="width: 100px; cursor: zoom-in"
                  v-else />
              </div>
              <p style="font-size: 0.8rem; margin-top: 0px" v-else>
                {{ val.message }}
              </p>

              <small style="font-size: 0.7rem">{{ val.date }}</small>
            </div>
            <img
              :src="
                val.user_type === 'user'
                  ? 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'
                  : 'https://icons.veryicon.com/png/o/system/ued_v10-of-shengye-group/general-contact-customer-service-icon.png'
              "
              style="
                width: 35px;
                border-radius: 50px;
                top: 0;
                padding: 3px;
                border: 2px solid #ededed78;
              " />
          </div>
        </div>
        <div ref="bottomChat"></div>
      </div>
      <form
        @submit.prevent="sendMessage"
        v-if="finalGuestName || showFavorites">
        <div
          style="
            display: flex;
            position: absolute;
            bottom: 0;
            width: 100%;
            background-color: #fff;
            padding: 10px;
            align-items: center;
            justify-content: center;
            gap: 10px;
          ">
          <div>
            <input
              type="file"
              id="fileupload"
              ref="fileInput"
              style="display: none"
              @change="handleFileChange" />
            <Button
              icon="pi pi-paperclip"
              v-if="myUsername"
              @click="openFileUpload" />
          </div>

          <input
            type="text"
            v-model="msg"
            @input="handleMessageSliced"
            :placeholder="$t('chats.typeMessage')"
            style="
              width: 65%;
              border: none;
              outline: none;
              background-color: #fff;
            " />
          <span style="color: #000; font-weight: 500" v-if="countDownChat">{{
            countDownChat
          }}</span>
          <Button type="submit" :label="$t('chats.send')" icon="pi pi-send" />
        </div>
      </form>
    </div>
  </main>
</template>
<script>
import PaymentProcess from "@/components/PaymentProcess.vue";
import TheHeroSection from "@/components/TheHeroSection.vue";
import TheProviders from "@/components/TheProviders.vue";
import GameCards from "@/components/GameCards.vue";
import LotteryCards from "@/components/LotteryCards.vue";
import LiveGamesCard from "@/components/LiveGamesCard.vue";
import Loaders from "@/components/Loaders.vue";
import Lotto from "./Lotto.vue";
import ThePaymentGateway from "@/components/ThePaymentGateway.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import TheGameFrame from "@/components/TheGameFrame.vue";
import ImportantNotice from "@/components/ImportantNotice.vue";
import LiveGamesModal from "@/components/LiveGamesModal.vue";
import { socket } from "@/socket";
import { ref, watch, onMounted, watchEffect, nextTick, computed } from "vue";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";
import { useAuthStore } from "@/stores/user.js";
import { useActivityCheck } from "@/stores/activity_check.js";
import { usePaymentProcess } from "@/stores/payment_process";
import TheLoginForm from "@/components/TheLoginForm.vue";
import SplashScreen from "@/components/SplashScreen.vue";
import { useToast } from "primevue/usetoast";
import InHouseGame from "@/data/InhouseGames.json";
import LiveGames from "@/data/LiveGames.json";
import AllGames from "@/data/AllGames.json";
import { useAccountBalance } from "@/stores/user_balance";
import { useI18n } from "vue-i18n";

export default {
  components: {
    TheHeroSection,
    TheProviders,
    GameCards,
    LotteryCards,
    Loaders,
    Lotto,
    ThePaymentGateway,
    TheFooter,
    TheSidebar,
    TheGameFrame,
    TheLoginForm,
    SplashScreen,
    PaymentProcess,
    ImportantNotice,
    LiveGamesCard,
    LiveGamesModal,
  },

  setup() {
    const { t } = useI18n();
    const openChatBox = ref(false);
    const showSplashScreen = ref(false);
    const showLoaders = ref(false);
    const originalGameDataList = ref([]);
    const receivedGameDataList = ref([]);
    const countGameCards = ref(27);
    const totalShowGames = ref(0);
    const totalGames = ref(0);
    const gameUrl = ref("");
    const htmlVal = ref("");
    const isLoading = ref(false);
    const showGameModal = ref(false);
    const isNotice = ref(false);
    const toast = useToast();
    const loginModal = ref(false);
    const errorMessage = ref("");
    const store = useAuthStore();
    const { state } = usePaymentProcess();
    const { balance } = useAccountBalance();
    const { activityState } = useActivityCheck();
    const favoriteHandler = ref([]);
    const guestChatName = ref("");
    const isGuestChat = ref();
    const finalGuestName = ref("");
    const showFavorites = ref(false);
    const msg = ref("");
    const connection = ref(null);
    const bottomChat = ref(null);
    const myUsername = ref("");
    const countUnreadChat = ref(0);
    const liveGameList = ref();
    const countDownChat = ref();
    const fileInput = ref();
    const imageSrc = ref([]);
    const gamesListRef = ref(null);
    const inHouseRef = ref(null);
    const originalInHouseGame1 = ref();
    const originalInHouseGame2 = ref();
    const receiveInhouseGame1 = ref();
    const receiveInhouseGame2 = ref();
    // const searchedItemStore = ref([]);
    const messages = ref();
    const initToken = ref();
    const showLiveGameModalFunc = async (data) => {
      if (!store.user) {
        loginModal.value = true;
        errorMessage.value = t("error_messages.loginFirstGame");
        return;
      }
      const res = await axios.getliveGames();
      liveGameList.value = res
        .filter((game) => game.provider === data.name)
        .map((game) => ({
          ...game,
          prov_logo: data.prov_logo,
        }));

      receivedGameDataList.value = liveGameList.value;

      resultAllSearch.value = liveGameList.value;
      totalGames.value = liveGameList.value.length;
      countGameCards.value = liveGameList.value.length + 1;
      totalShowGames.value = liveGameList.value.length + 1;

      nextTick(() => {
        gamesListRef.value?.scrollIntoView({ behavior: "smooth" });
      });
      // }

      // document.body.style.overflow = "hidden";
      // showLoaders.value = false;
    };

    watch(
      () => messages.value,

      () => {
        if (finalGuestName.value || store.user) {
          nextTick(() => {
            bottomChat.value?.scrollIntoView({ behavior: "smooth" });
          });
        }
      },
      { deep: true, immediate: true }
    );

    watch(
      () => store.user,
      (newVal) => {
        showFavorites.value = Boolean(newVal);
        if (store.user) {
          checkFavorites();
          if (
            store.user[0].email === "default@email.com" ||
            store.user[0].email === "" ||
            store.user[0].mobile == 0 ||
            store.user[0].mobile === ""
          ) {
            isNotice.value = true;
          }
        }
      }
    );

    watch(
      () => isGuestChat.value,
      (newVal) => {
        if (newVal) {
          const guestChat1 = JSON.parse(localStorage.getItem("chat_guest"));
          if (guestChat1) {
            finalGuestName.value = guestChat1.guest_name;
          }
        }
      }
    );

    const sendMessage = async () => {
      if (countDownChat.value) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please wait for a while before sending another message.",
          life: 3000,
        });
        return;
      }
      if (msg.value.trim() === "" || msg.value.trim() === null) {
        return;
      }
      countDownChat.value = 7;
      let user_type = "";
      const guestChat1 = JSON.parse(localStorage.getItem("chat_guest"));
      if (guestChat1) {
        user_type = "guest";
      } else {
        user_type = "user";
      }
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      if (user_type === "guest") {
        const data = {
          username: guestChat1.guest_name,
          token: guestChat1.guest_token,
          user_type: "guest",
          message: msg.value.trim(),
          date: formattedDate,
          isGuest: 1,
          isDeleted: 0,
          type: "text",
        };
        console.log(data);
        socket.emit("chat-message", JSON.stringify(data));
        await axios.addMessageChat(data);
        msg.value = "";
      } else {
        const data = {
          username: store.user[0].username,
          token: store.user[0].chatToken,
          user_type: "user",
          message: msg.value.trim(),
          date: formattedDate,
          isGuest: 0,
          isDeleted: 0,
          type: "text",
        };
        console.log(data);
        socket.emit("chat-message", JSON.stringify(data));
        await axios.addMessageChat(data);
        msg.value = "";
      }

      let count = 7;
      const intervalId = setInterval(() => {
        count--;
        countDownChat.value = count;
        if (countDownChat.value <= 0) {
          clearInterval(intervalId);
          return;
        }
      }, 1200);
    };

    const handleIncomingMessage = (event) => {
      const data = event;
      const storedData = JSON.parse(localStorage.getItem("chat_guest"));
      if (storedData != null && data.token === storedData.guest_token) {
        if (
          !openChatBox.value &&
          data.user_type === "csr" &&
          storedData.guest_token === data.token
        ) {
          countUnreadChat.value = countUnreadChat.value += 1;
        }
        messages.value.push(data);
      } else {
        const dataUser = JSON.parse(localStorage.getItem("auth.user"));
        if (dataUser != null && data.token === dataUser[0].chatToken) {
          if (
            !openChatBox.value &&
            data.user_type === "csr" &&
            dataUser[0].chatToken === data.token
          ) {
            countUnreadChat.value = countUnreadChat.value += 1;
          }
          messages.value.push(data);
        }
      }
    };
    const setupWebSocket = () => {
      if (socket) {
        socket.on("chat-message", (data) => {
          const getVal = JSON.parse(data);
          handleIncomingMessage(getVal);
        });

        socket.on("connect", () => {
          console.log("Connected to WebSocket server.");
          // Your open event handling logic
        });
      } else {
        console.error("Socket is not initialized properly.");
      }
    };

    const createGuestChat = () => {
      const currentDate = new Date();
      const randomString = generateRandomString(10);
      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")} ${currentDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;

      const storeGuest = {
        guest_name: guestChatName.value.trim(),
        guest_token: randomString,
        guest_date: formattedDate,
      };
      localStorage.setItem("chat_guest", JSON.stringify(storeGuest));
      isGuestChat.value = {
        g_name: storeGuest.guest_name,
        g_token: storeGuest.guest_token,
        g_date: storeGuest.guest_date,
      };
    };
    const logoutChatGuestName = async () => {
      const dataP = JSON.parse(localStorage.getItem("chat_guest"));
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const data = {
        username: dataP.guest_name,
        token: dataP.guest_token,
        user_type: "guest",
        message:
          dataP.guest_name +
          " leaving the chat. All of his message will be deleted. Please delete the entire conversation. Thank you!",
        date: formattedDate,
        isGuest: 1,
        isDeleted: 1,
        type: "text",
      };
      messages.value.push(data);

      const res = await axios.flushGuestChat({
        username: dataP.guest_name,
        token: dataP.guest_token,
      });

      if (res.resStatus == 0) {
        localStorage.removeItem("chat_guest");
        isGuestChat.value = false;
        finalGuestName.value = "";
        guestChatName.value = "";
        messages.value = [];
      }
    };
    function generateRandomString(length) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let randomString = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
      return randomString;
    }

    const evalIsGuest = (val) => {
      switch (val) {
        case 2:
          return "🤖 CSR - ";
        case 3:
          return "🥸 Admin - ";
        case 4:
          return "😍 The Boss - ";
        default:
          return "";
      }
    };

    const checkFavorites = async () => {
      if (store.user) {
        showFavorites.value = true;
        const res = await axios.getFav({ username: store.user[0].username });
        if (res.resMsg !== "Unable to find your favorites.") {
          await fetchMessage();
          res.forEach((element) => {
            const result = originalGameDataList.value.find(
              (item) => item.id === element.gameID
            );
            if (result && !result.username) {
              favoriteHandler.value.push({ ...result, favorite: true });
            }
          });
        }
      } else {
        showFavorites.value = false;
      }
    };
    const handleSlicedChange = () => {
      guestChatName.value = guestChatName.value.slice(0, 7);
    };

    watch(guestChatName, handleSlicedChange);

    const handleMessageSliced = () => {
      msg.value = msg.value.slice(0, 150);
    };

    watch(msg, handleMessageSliced);

    const fetchMessage = async () => {
      const dataUser = JSON.parse(localStorage.getItem("auth.user"));
      if (dataUser) {
        myUsername.value = dataUser[0].username;
        const resGuest = await axios.fetchMessageGuest({
          username: myUsername.value,
          token: dataUser[0].chatToken,
          user: "registered",
        });
        console.log();
        if (resGuest.data != null || resGuest.data != undefined) {
          resGuest.data.forEach((element) => {
            messages.value.push(element);
            // socket.emit("chat-message", element);
          });
          nextTick(() => {
            bottomChat.value?.scrollIntoView({ behavior: "smooth" });
          });
        }
      }
    };

    onMounted(async () => {
      setupWebSocket();
      originalInHouseGame1.value = LiveGames;
      originalInHouseGame2.value = InHouseGame;
      receiveInhouseGame1.value = LiveGames;
      receiveInhouseGame2.value = InHouseGame;
      const guestChat = JSON.parse(localStorage.getItem("chat_guest"));
      if (guestChat) {
        finalGuestName.value = guestChat.guest_name;
        const resGuest = await axios.fetchMessageGuest({
          username: finalGuestName.value,
          token: guestChat.guest_token,
          user: "guest",
        });
        console.log(resGuest);
        const sortedMessagesByDate = resGuest.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        if (resGuest.data != null || resGuest.data != undefined) {
          sortedMessagesByDate.forEach((element) => {
            handleIncomingMessage(element);
          });
        }
        nextTick(() => {
          bottomChat.value?.scrollIntoView({ behavior: "smooth" });
        });
      }

      if (window.screen.width <= 834) {
        showSplashScreen.value = true;
        setTimeout(() => {
          showSplashScreen.value = false;
        }, 4000);
      }
      try {
        // const response = await axios.getGames();
        originalGameDataList.value = AllGames;
        receivedGameDataList.value = [...originalGameDataList.value];
        receivedGameDataList.value = originalGameDataList.value.slice(
          0,
          countGameCards.value
        );
        totalGames.value = originalGameDataList.value.length;
        totalShowGames.value = receivedGameDataList.value.length;
      } catch (error) {
        console.error("Error fetching games:", error);
      }
      checkFavorites();
    });
    watchEffect(async () => {
      if (showFavorites.value) {
        myUsername.value = store.user[0].username;
        const dataP = JSON.parse(localStorage.getItem("chat_guest"));
        if (dataP) {
          const res = await axios.flushGuestChat({
            username: dataP.guest_name,
            token: dataP.guest_token,
          });
          if (res.resStatus == 0) {
            localStorage.removeItem("chat_guest");
            isGuestChat.value = false;
            finalGuestName.value = "";
            guestChatName.value = "";
            messages.value = [];
          }
        }
      } else {
        messages.value = [];
        myUsername.value = "";
      }
    });

    const providerHolder = ref("");
    const searchTerm = ref("");
    const gameTypeSelectedHolder = ref("");
    const resultAllSearch = ref();
    const addRemoveFaveList = async (id, fave) => {
      if (fave === undefined || fave === false) {
        if (favoriteHandler.value.length > 4) {
          toast.add({
            severity: "error",
            summary: "Failed",
            detail: "Maximum 5 favorites only.",
            life: 3000,
          });
          return;
        }
      }

      const user = store.user[0].username;
      const favData = { username: user, gameID: id };
      const datass = receivedGameDataList.value.filter((item) => item.id == id);
      if (fave === undefined) {
        const existingFavorite = favoriteHandler.value.find(
          (favorite) => favorite.id === id
        );
        if (!existingFavorite) {
          const addF = await axios.addFav(favData);
          favoriteHandler.value.push({ ...datass[0], favorite: true });
          toast.add({
            severity: "success",
            summary: "Success",
            detail: datass[0].title + " has been added to your favorite list",
            life: 3000,
          });
          return;
        }
      } else if (fave === false) {
        const addF = await axios.addFav(favData);
        const existingFavorite = favoriteHandler.value.find(
          (favorite) => favorite.id === id
        );
        if (!existingFavorite || existingFavorite == undefined) {
          const addF = await axios.addFav(favData);
          favoriteHandler.value.push({ ...datass[0], favorite: true });
          toast.add({
            severity: "success",
            summary: "Success",
            detail: datass[0].title + " has been added to your favorite list",
            life: 3000,
          });
          return;
        } else {
        }
      } else {
        const removeFav = await axios.removeFav(favData);
        favoriteHandler.value = favoriteHandler.value.filter(
          (item) => item.id != id
        );
        toast.add({
          severity: "success",
          summary: "Success",
          detail:
            "You successfully removed " +
            datass[0].title +
            " on your favorite list.",
          life: 3000,
        });
        return;
      }

      const faveHolder = !fave;
      const updatedGameDataList = receivedGameDataList.value.map((item) => {
        if (item.id === id) {
          return { ...item, favorite: faveHolder };
        }
        return item;
      });

      receivedGameDataList.value = updatedGameDataList;
      return updatedGameDataList;
    };

    // Use a watcher to trigger searchGames when searchTerm changes
    watch(searchTerm, () => {
      handleSearching();
    });

    const selectedProvider = (provider) => {
      providerHolder.value = provider;
      handleSearching();
    };

    const gameTypeSelected = (game) => {
      gameTypeSelectedHolder.value = game;
      const selectedInhouseRef = ["Sabong", "Sports", "Live Casino", "Lotto"];
      if (game.some((item) => selectedInhouseRef.includes(item))) {
        const res = originalInHouseGame2.value.filter(
          (data) => data.type === game[0]
        );
        const res1 = originalInHouseGame1.value.filter(
          (data) => data.type === game[0]
        );
        receiveInhouseGame2.value = res;
        receiveInhouseGame1.value = res1;
      } else {
        if (game[0] === "All") {
          receiveInhouseGame2.value = originalInHouseGame2.value;
          receiveInhouseGame1.value = originalInHouseGame1.value;
        }
        handleSearching();
        nextTick(() => {
          gamesListRef.value?.scrollIntoView({ behavior: "smooth" });
        });
      }
    };

    const playGame = async (game) => {
      if (!store.user) {
        loginModal.value = true;
        errorMessage.value = t("error_messages.loginFirstGame");
      } else {
        const isMobile = screen.width <= 782 ? "true" : "false";
        showLoaders.value = true;
        const token = store.user[0].token;
        const user = store.user[0].username;
        const updatedObject = {
          ...game,
          username: user,
          token: token,
          mobile: isMobile,
        };
        const res = await axios.gameLogin(updatedObject);
        if (res.html) {
          htmlVal.value = res.html;
        }
        showGameModal.value = true;
        document.body.style.overflow = "hidden";

        if (res.resMsg === "Session expired please relogin.") {
          localStorage.removeItem("auth.user");
          store.resetUser();
          showLoaders.value = false;
        } else {
          showLoaders.value = false;
          gameUrl.value = res.resUrl;
          activityState.url = res.resUrl;
        }
      }
    };

    const playInhouseGame = async (game) => {
      if (!store.user) {
        showLoginModal();
      } else {
        showLoaders.value = true;

        const { token, username } = store.user[0];
        const updatedObject = { ...game, username, token };
        console.log(updatedObject);
        try {
          if (game.gameID == 5) {
            handlePokerGame(token);
          } else if (game.gameID == "1081") {
            await handleGameInhouseLaunch(game.gameID, 3, username, token);
          } else if (game.gameID == "1017") {
            await handleGameInhouseLaunch(game.gameID, 13, username, token);
          } else if (["26", "15", "12", "27"].includes(game.gameID)) {
            await handleLiveGameLaunch(game.gameID, 3, username, token);
          } else if (["1005", "1006"].includes(game.gameID)) {
            const arenaT =
              game.gameID === "1005" ? "Short Knife" : "Long Knife";
            const passD = {
              username: username,
              token: token,
              arenaType: arenaT,
            };
            const res = await handleSabongLaunch(passD);
            if (res?.error === 0) {
              showLoaders.value = false;
              window.open(game.urlGame, "_blank");
            }
          } else if (["1", "2", "3"].includes(game.gameID)) {
            window.location.href = game.urlGame;
          } else {
            await handleDefaultGameLaunch(updatedObject);
          }
        } catch (error) {
          handleError(error);
        }
      }
    };

    const showLoginModal = () => {
      loginModal.value = true;
      errorMessage.value =
        "Please log in to your account before accessing the game.";
      showLoaders.value = false;
    };

    const handlePokerGame = async (token) => {
      const isMobile = screen.width <= 782 ? "true" : "false";
      const dataPassObj = { token, mobile: isMobile };

      try {
        const res = await axios.gameInHouseLoginPoker(dataPassObj);

        if (res.resMsg === "No token") {
          handleSessionExpired();
        } else {
          handleGameUrl(res.url);
        }
      } catch (error) {
        handleError(error);
      }
    };

    const handleGameInhouseLaunch = async (
      gameID,
      gameType,
      username,
      token
    ) => {
      const passD = {
        ProductID: gameID,
        GameType: gameType,
        username,
        token,
      };

      try {
        const res = await axios.postlaunchGameInhouse(passD);

        if (res.resMsg === "Session expired please relogin.") {
          handleSessionExpired();
        } else {
          handleGameUrl(res.resUrl);
        }
      } catch (error) {
        handleError(error);
      }
    };

    const handleLiveGameLaunch = async (gameID, gameType, username, token) => {
      const passD = { ProductID: gameID, GameType: gameType, username, token };

      try {
        const res = await axios.postlaunchGameliveLogin(passD);
        if (res.resMsg === "Session expired please relogin.") {
          handleSessionExpired();
        } else {
          handleGameUrl(res.resUrl);
        }
      } catch (error) {
        handleError(error);
      }
    };

    const handleDefaultGameLaunch = async (updatedObject) => {
      try {
        const res = await axios.gameInHouseLogin(updatedObject);
        if (res.resMsg === "Session expired please relogin.") {
          handleSessionExpired();
        } else {
          handleGameUrl(res.resUrl);
        }
      } catch (error) {
        handleError(error);
      }
    };

    const handleSabongLaunch = async (updatedObject) => {
      try {
        const res = await axios.sabonggetGame(updatedObject);
        console.log(res);
        if (res.error === 0) {
          return res;
        }
        if (res.resMsg === "Session expired please relogin.") {
          handleSessionExpired();
        } else {
          handleGameUrl(res.resUrl);
        }
      } catch (error) {
        handleError(error);
      }
    };

    const handleGameUrl = (url) => {
      showLoaders.value = false;
      gameUrl.value = url;
      activityState.url = url;
      showGameModal.value = true;
    };

    const handleError = (error) => {
      console.error(error);
      showLoaders.value = false;
    };

    const handleSessionExpired = () => {
      localStorage.removeItem("auth.user");
      store.resetUser();
      showLoaders.value = false;
    };

    const submitLogin = async (creds) => {
      isLoading.value = true;
      const res = await store.login(creds);
      if (res === "Success") {
        loginModal.value = false;
        isLoading.value = false;
      } else {
        errorMessage.value = res;
        isLoading.value = false;
      }
    };

    const loadMore = async () => {
      countGameCards.value += 18;
      totalShowGames.value += 18;

      if (
        providerHolder.value === "" &&
        searchTerm.value === "" &&
        (gameTypeSelectedHolder.value === "" ||
          gameTypeSelectedHolder.value === null)
      ) {
        const original = originalGameDataList.value;
        receivedGameDataList.value = original.slice(0, countGameCards.value);
      } else {
        receivedGameDataList.value = resultAllSearch.value.slice(
          0,
          countGameCards.value
        );
      }
    };
    const closeQRPayment = () => {
      state.url = "";
      state.amount = "";
      state.url = "";
    };

    const exitGame = async () => {
      document.body.style.overflow = "";

      showGameModal.value = false;
      if (store.user) {
        const uname = store.user[0].username;
        const token = store.user[0].token;
        const getResult = await axios.postBalance({
          username: uname,
          token: token,
        });
        balance.current_balance = getResult.balance;
      }
    };

    const openChatBoxFunc = () => {
      openChatBox.value = true;
      if (store.user || finalGuestName.value) {
        nextTick(() => {
          bottomChat.value?.scrollIntoView();
        });
      }

      countUnreadChat.value = 0;
    };

    // SEARCHING
    const handleSearching = () => {
      const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
      const lowerCaseProvider = providerHolder.value.toLowerCase();
      const lowerCaseGameType = gameTypeSelectedHolder.value;
      const filteredResult = originalGameDataList.value.filter((item) => {
        const lowerCaseTitle = item.title.toLowerCase();
        return (
          (lowerCaseSearchTerm === "" ||
            lowerCaseTitle.includes(lowerCaseSearchTerm)) &&
          (lowerCaseProvider === "" ||
            item.provider.toLowerCase() === lowerCaseProvider) &&
          (lowerCaseGameType === "" ||
            lowerCaseGameType.includes("All") ||
            lowerCaseGameType.some(
              (type) => type.toLowerCase() === item.gameType.toLowerCase()
            ))
          // item.gameType.toLowerCase() === lowerCaseGameType)
        );
      });

      // receivedGameDataList.value = filteredResult;
      receivedGameDataList.value = filteredResult.slice(0, 27);
      countGameCards.value = 27;
      totalShowGames.value = 27;
      resultAllSearch.value = filteredResult;
      totalGames.value = filteredResult.length;
    };

    const openFileUpload = () => {
      // Trigger the click event of the hidden file input
      fileInput.value.click();
    };
    const checkMessageFile = (val) => {
      if (val.includes("data:image/jpeg;base64,")) {
        return "data:image/jpeg;base64," + val;
      } else {
        return val;
      }
    };
    const handleFileChange = (event) => {
      const file = event.target.files[0];

      if (!file) {
        console.warn("No file selected.");
        return;
      }
      const maxSizeInKB = 1574;
      const maxSizeInBytes = maxSizeInKB * 1024;
      if (file.size >= maxSizeInBytes) {
        // File is within the allowed size limit (below 1574 KB)
        toast.add({
          severity: "error",
          summary: "Failed",
          detail: "The fileData size must not exceed 1574 kilobytes.",
          life: 3000,
        });
        event.target.value = null;
        return;
      }
      try {
        const guestChat1 = JSON.parse(localStorage.getItem("chat_guest"));
        const dataUser = JSON.parse(localStorage.getItem("auth.user"));
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        const reader = new FileReader();
        reader.onload = async () => {
          const base64Image = reader.result.split(",")[1];

          const data = {
            username: dataUser ? dataUser[0].username : guestChat1.guest_name,
            token: dataUser ? dataUser[0].chatToken : guestChat1.guest_token,
            user_type: dataUser ? "user" : "guest",
            message: "data:image/jpeg;base64," + base64Image,
            date: formattedDate,
            isGuest: 0,
            isDeleted: 0,
            type: "image",
            imageVal: "data:image/jpeg;base64," + base64Image,
          };
          socket.emit("chat-message", JSON.stringify(data));

          const formData = new FormData();
          formData.append("fileData", file);
          formData.append("username", dataUser[0].username);
          formData.append("token", dataUser[0].chatToken);
          formData.append("userType", "user");
          formData.append("date", formattedDate);
          formData.append("isGuest", 0);
          formData.append("isDeleted", 0);
          formData.append("type", "image");
          fetch("https://macwin.live/api/chat/uploadImageChat", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.resStatus === 1) {
                // Toast Message
                toast.add({
                  severity: "error",
                  summary: "Failed",
                  detail: data.resMsg.fileData,
                  life: 5000,
                });
                return;
              }
            })
            .catch((error) => {
              console.error("Error uploading file:", error);
            });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error handling file change:", error);
      }
    };

    const showBigImage = (index, type) => {
      const img = messages.value[index];
      const bigImg = document.createElement("img");
      bigImg.style.width = "auto";
      bigImg.style.height = "80vh";
      bigImg.style.display = "inline";
      if (type === "base64") {
        bigImg.src = `${img.message}`;
      } else {
        bigImg.src = `https://macwin.live/images/${img.message}`;
      }

      const over = document.createElement("div");
      document.body.style.overflow = "hidden";
      over.style.height = "100vh";
      over.style.width = "100%";
      bigImg.style.margin = "0 auto";
      over.style.background = "rgba(0,0,0,.82)";
      over.style.position = "fixed";
      over.style.top = "0";
      over.style.left = "0";
      over.style.opacity = "0.0";
      over.style.cursor = "pointer";
      over.style.zIndex = "9999";
      over.style.textAlign = "center";

      over.appendChild(bigImg);

      over.addEventListener("click", () => {
        document.body.style.overflow = "";
        over.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(over);
        }, 300);
      });

      document.body.appendChild(over);

      setTimeout(() => {
        over.style.opacity = "1";
      }, 0);
    };
    return {
      initToken,
      fileInput,
      // searchedItemStore,
      isLoading,
      receivedGameDataList,
      searchTerm,
      finalGuestName,
      guestChatName,
      providerHolder,
      InHouseGame,
      totalGames,
      totalShowGames,
      loginModal,
      errorMessage,
      showGameModal,
      gameUrl,
      htmlVal,
      gameTypeSelectedHolder,
      receiveInhouseGame1,
      receiveInhouseGame2,
      showFavorites,
      showLoaders,
      showSplashScreen,
      state,
      isNotice,
      favoriteHandler,
      openChatBox,
      isGuestChat,
      msg,
      gamesListRef,
      connection,
      messages,
      bottomChat,
      myUsername,
      countUnreadChat,
      LiveGames,
      originalInHouseGame1,
      originalInHouseGame2,
      inHouseRef,
      liveGameList,
      countDownChat,
      imageSrc,
      openFileUpload,
      handleFileChange,
      playGame,
      selectedProvider,
      gameTypeSelected,
      addRemoveFaveList,
      playInhouseGame,
      closeQRPayment,
      loadMore,
      submitLogin,
      createGuestChat,
      logoutChatGuestName,
      sendMessage,
      handleIncomingMessage,
      setupWebSocket,
      evalIsGuest,
      exitGame,
      openChatBoxFunc,
      showLiveGameModalFunc,
      checkMessageFile,
      showBigImage,
      // removeGameType,
    };
  },
};
</script>

<style>
.separator {
  position: relative;
  overflow: hidden;
}
.left-sidebar {
  width: 100%;
  display: flex;
}
.left-sidebar-inner {
  width: 78%;
}

main {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.main-games {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
  padding: 0px 30px;
}
section {
  width: 80%;
}
/* .main-section {
  padding: 20px;
} */

.customDivider {
  margin-top: 60px;
  font-size: 1.5rem;
}
.p-divider-content {
  background: rgb(255, 19, 84);
  background: -moz-linear-gradient(
    228deg,
    rgba(255, 19, 84, 1) 0%,
    rgba(71, 21, 35, 1) 100%
  );
  background: -webkit-linear-gradient(
    228deg,
    rgba(255, 19, 84, 1) 0%,
    rgba(71, 21, 35, 1) 100%
  );
  background: linear-gradient(
    228deg,
    rgba(255, 19, 84, 1) 0%,
    rgba(71, 21, 35, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff1354",endColorstr="#471523",GradientType=1);
  border: 1px solid rgb(134, 134, 134, 30%);
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.p-divider-content:hover {
  background-color: #2f3235;
}
.p-divider.p-divider-horizontal {
  margin: 0.6rem 0 !important;
}
.loadMoreIcon {
  animation: InfiniteSlowBounce 2s ease-in-out infinite;
}

.searchField {
  border-radius: 50px;
  background-color: rgb(134, 134, 134, 10%);
  border: 1px solid rgb(134, 134, 134, 30%);
  color: #fefefe;
}

.game-list {
  display: flex;
  gap: 23px;
  flex-wrap: wrap;
}

.chatClass {
  width: 270px;
  position: relative;
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 10px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-bottom: 10px;
  background: rgb(255, 182, 32);
  background: -moz-linear-gradient(
    228deg,
    rgba(255, 182, 32, 1) 0%,
    rgba(128, 97, 0, 1) 100%
  );
  background: -webkit-linear-gradient(
    228deg,
    rgba(255, 182, 32, 1) 0%,
    rgba(128, 97, 0, 1) 100%
  );
  background: linear-gradient(
    228deg,
    rgba(255, 182, 32, 1) 0%,
    rgba(128, 97, 0, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffb620",endColorstr="#806100",GradientType=1);
}
.chatClass::before {
  content: "";
  position: absolute;
  bottom: -5%;
  right: 0;
  width: 20px;
  height: 30px;
  z-index: -1;
  border-bottom-right-radius: 40px;
  background: rgb(255, 182, 32);
  background: -moz-linear-gradient(
    228deg,
    rgba(255, 182, 32, 1) 0%,
    rgba(128, 97, 0, 1) 100%
  );
  background: -webkit-linear-gradient(
    228deg,
    rgba(255, 182, 32, 1) 0%,
    rgba(128, 97, 0, 1) 100%
  );
  background: linear-gradient(
    228deg,
    rgba(255, 182, 32, 1) 0%,
    rgba(128, 97, 0, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffb620",endColorstr="#806100",GradientType=1);
}
.replied::before {
  content: "" !important;
  position: absolute !important;
  bottom: -5% !important;
  left: 0 !important;
  width: 20px !important;
  height: 30px !important;
  z-index: -1 !important;
  border-bottom-right-radius: 40px !important;
  background: rgba(71, 21, 35, 1) !important;
}
.chat-box {
  width: 450px;
  height: 600px;
  background-color: rgb(49, 49, 49);
  position: fixed;
  bottom: 3%;
  right: 1%;
  z-index: 99;
  border-radius: 10px;
  overflow: hidden;
  background: url("/src/assets/images/chat-background.webp") no-repeat center /
    cover;
}

.chat-header {
  position: relative;
  height: 70px;
  background: rgb(255, 19, 84);
  background: -moz-linear-gradient(
    228deg,
    rgba(255, 19, 84, 1) 0%,
    rgba(71, 21, 35, 1) 100%
  );
  background: -webkit-linear-gradient(
    228deg,
    rgba(255, 19, 84, 1) 0%,
    rgba(71, 21, 35, 1) 100%
  );
  background: linear-gradient(
    228deg,
    rgba(255, 19, 84, 1) 0%,
    rgba(71, 21, 35, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff1354",endColorstr="#471523",GradientType=1);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.replied {
  margin-left: auto;
  justify-content: end;
  background: rgb(255, 19, 84);
  background: -moz-linear-gradient(
    228deg,
    rgba(255, 19, 84, 1) 0%,
    rgba(71, 21, 35, 1) 100%
  );
  background: -webkit-linear-gradient(
    228deg,
    rgba(255, 19, 84, 1) 0%,
    rgba(71, 21, 35, 1) 100%
  );
  background: linear-gradient(
    228deg,
    rgba(255, 19, 84, 1) 0%,
    rgba(71, 21, 35, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff1354",endColorstr="#471523",GradientType=1);
}
@keyframes bounce {
  0% {
    transform: translateY(-40px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes InfiniteSlowBounce {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(7px);
  }
  100% {
    transform: translateY(-5px);
  }
}

.csr-button {
  position: fixed;
  right: 0%;
  bottom: 5%;
  z-index: 9;
  width: 50px;
  height: 50px;
  background-color: #ff1354;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}
.csr-button:hover {
  background-color: #d6154b;
}

.chat-box-parent {
  animation: slideleftModal 0.3s ease-in-out;
}

@keyframes slideleftModal {
  from {
    opacity: 0;
    transform: translateX(20%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
