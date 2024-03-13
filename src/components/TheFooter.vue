<template>
  <div class="footer">
    <div class="firstrow">
      <img src="@/assets/images/logo.webp" style="width: 200px" alt="" />
      <p>
        {{ $t("footer.sec1") }}
      </p>
      <div
        class="cont"
        style="
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          color: var(--surface-400);
        ">
        <i class="pi pi-envelope ic"></i>
        support@come2win.com
      </div>
      <div
        class="cont"
        style="
          display: flex;
          color: var(--surface-400);
          gap: 20px;
          margin-bottom: 30px;
        ">
        <i class="pi pi-phone ic"></i>
        094471559441
      </div>

      <span class="cp1"> {{ $t("footer.copyright") }}</span>
    </div>
    <div class="rightFooter">
      <div class="secondrow">
        <h4>{{ $t("footer.Information.title") }}</h4>
        <router-link to="/infopage/about">{{
          $t("footer.Information.about")
        }}</router-link>
        <router-link to="/infopage/faq">{{
          $t("footer.Information.faq")
        }}</router-link>
        <a href="">{{ $t("footer.Information.toc") }}</a>
        <a href="">{{ $t("footer.Information.privacy") }}</a>
        <a href="">{{ $t("footer.Information.legal") }}</a>
        <router-link to="/infopage/contact">{{
          $t("footer.Information.contact")
        }}</router-link>
      </div>

      <div class="secondrow">
        <h4>{{ $t("footer.games.title") }}</h4>
        <a href="javascript:void(0)">{{ $t("footer.games.slot") }}</a>
        <a href="javascript:void(0)">{{ $t("footer.games.fishing") }}</a>
        <a href="javascript:void(0)">{{ $t("footer.games.bingo") }}</a>
        <a href="javascript:void(0)">{{ $t("footer.games.liveCasino") }}</a>
        <a href="javascript:void(0)">{{ $t("footer.games.sabong") }}</a>
        <a href="javascript:void(0)">{{ $t("footer.games.poker") }}</a>
      </div>
      <div class="secondrow">
        <h4>{{ $t("footer.social.title") }}</h4>
        <a href="https://www.facebook.com/come2win/" target="_blank"
          >Facebook</a
        >
        <a href="javascript:void(0)">Twitter</a>
        <a href="javascript:void(0)">YouTube</a>
      </div>
      <div class="secondrow lisc">
        <div class="liscence">
          <img src="@/assets/images/21.png" alt="" />
          <img src="@/assets/images/pagcor.png" alt="" />
        </div>
        <p>
          {{ $t("footer.sec2.manage") }}<br /><br />

          {{ $t("footer.sec2.textManage") }}
        </p>
      </div>
      <span class="cp2">{{ $t("footer.copyright") }}</span>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.footer {
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.firstrow {
  width: 490px;
}

.secondrow a {
  display: block;
  text-decoration: none;
  color: #fff;
  margin: 5px;
  transition: 0.3s ease-in-out;
}
.secondrow a:hover {
  text-decoration: underline;
  color: #ff1354;
}
.liscence {
  display: flex;
  gap: 20px;
}
.liscence img {
  width: 70px;
}
.information {
  width: 100px;
}
.lisc {
  width: 350px;
}

.ic {
  font-size: 1.5rem;
}

.rightFooter {
  display: flex;
  gap: 50px;
}
</style>
