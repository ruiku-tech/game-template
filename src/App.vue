<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import globalData from "./lib/globalData";
import Utils from "./lib/Utils";
import lang from "./language/lang";
import conn from "./lib/conn";
import CallProxy from "./lib/CallProxy";
import LocalStore from "./lib/LocalStore";

let theme = Utils.getQuery("theme");

let lg = Utils.getQuery("lang");
if (lg) {
  lang.setLanguage(lg);
}

LocalStore.init("yywh-<%=name%>");

let isFirstLogin = true;
export default {
  name: "App",
  data() {
    return {
      theme,
    };
  },
  created() {
    let id = parseInt(Utils.getQuery("id"));
    let password = Utils.getQuery("password");
    let plat = parseInt(Utils.getQuery("plat"));
    let host = Utils.getQuery("host");
    let port = Utils.getQuery("port");
    let roomid = Utils.getQuery("roomid");
    if (roomid) globalData.roomid = parseInt(roomid);
    else roomid = 0;

    if (!id) id = LocalStore.gget("id");
    else LocalStore.gset("id", id);
    if (!password) password = LocalStore.gget("password");
    else LocalStore.gset("password", password);
    if (!plat) plat = LocalStore.gget("plat");
    else LocalStore.gset("plat", plat);
    if (!host) host = LocalStore.gget("host");
    else LocalStore.gset("host", host);
    if (!port) port = LocalStore.gget("port");
    else LocalStore.gset("port", port);
    if (!roomid) roomid = LocalStore.gget("roomid");
    else LocalStore.gset("roomid", roomid);
    if (!lg) lg = LocalStore.gget("lang");
    else LocalStore.gset("lang", lg);
    if (lg) {
      lang.setLanguage(lg);
    }

    if (!port) port = 9091;
    globalData.net.state = lang.get().connecting;
    let server =
      (window.location.protocol == "https:" ? "wss" : "ws") +
      "://" +
      host +
      ":" +
      port;
    conn.init(
      server,
      id,
      password,
      plat,
      function () {
        globalData.net.state = "";
      },
      function () {
        globalData.net.state = lang.get().reconnecting;
      },
      function () {
        if (isFirstLogin) {
          isFirstLogin = false;
        }
      }
    );
  },
  mounted() {
    CallProxy.registerRouter(this.$router);
  },
};
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
html,
body {
  overflow: hidden;
}
</style>
