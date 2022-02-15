import setting from '../game/mini_setting'
let _gameDict = {};
let _rootRouter = null;

window.NATIVE_CALL_FOLLOW = function (gameid, id) {
  let gamer = _gameDict[gameid];
  if (gamer) gamer.followBet(id);
}
window.NATIVE_SHOW_MINI = function (gameid) {
  let gamer = _gameDict[gameid];
  if (gamer) {
    setting.show = true;
    gamer.callShow();
  }
}
window.NATIVE_CALL_NAV_GAME = function (name, keep) {
  if (_rootRouter.app.$route.name == name) return;
  if (_rootRouter)
    _rootRouter.replace({ name, query: { keep } });
}
export default {
  registerRouter(router) {
    _rootRouter = router;
  },
  regGame(gameid, game) {
    _gameDict[gameid] = game;
  },
  unregGame(gameid) {
    delete _gameDict[gameid];
  },
  close() {
    try {
      if (window.android) {
        window.android.NATIVE_CLOSE();
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_CLOSE"
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_close' }, '*');
      }
    }
    catch (e) {
      console.log(e);
    }
  },
  charge() {
    try {
      if (window.android) {
        window.android.NATIVE_CHARGE();
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_CHARGE"
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_charge' }, '*');
      }
    }
    catch (e) {

    }
  },
  notifyMoneyLess() {
    try {
      if (window.android) {
        window.android.NATIVE_MONEY_LESS();
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_MONEY_LESS"
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_money_less' }, '*');
      }
    }
    catch (e) {

    }
  },
  notifyStage(gameid, stage, stagevalue, lefttime, round) {
    let value = stagevalue;
    try {
      if (window.android) {
        window.android.NATIVE_STAGE(JSON.stringify({ gameid, stage, value, time: lefttime, round }));
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_STAGE", data: { gameid, stage, value, time: lefttime, round }
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_stage', gameid, stage, value, time: lefttime, round }, '*');
      }
      if (window.NATIVE_STAGE) {
        NATIVE_STAGE({ gameid, stage, value, time: lefttime, round });
      }
    }
    catch (e) {

    }
  },
  notifyRound(gameid, round, nums) {
    try {
      if (window.android) {
        window.android.NATIVE_ROUND(JSON.stringify({ gameid, round, nums }));
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_ROUND", data: { gameid, round, nums }
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_round', gameid, round, nums }, '*');
      }
      if (window.NATIVE_ROUND) {
        NATIVE_ROUND({ gameid, round, nums });
      }
    }
    catch (e) {

    }
  },
  notifyHit(gameid, round, money) {
    try {
      if (window.android) {
        window.android.NATIVE_HIT(JSON.stringify({ gameid, round, money }));
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_HIT", data: { gameid, round, money }
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_notify_hit', gameid, round, money }, '*');
      }
      if (window.NATIVE_HIT) {
        NATIVE_HIT({ gameid, round, money });
      }
    }
    catch (e) {

    }
  },
  BoardcastBet(obj) {//{userid,money,gameid,id}
    try {
      if (window.android) {
        window.android.NATIVE_BROAD_BET(JSON.stringify(obj));
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_BROAD_BET", data: obj
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_broad_bet', ...obj }, '*');
      }
      if (window.NATIVE_BROAD_BET) {
        NATIVE_BROAD_BET(obj);
      }
    }
    catch (e) {

    }
  },
  BroadcastHit(gameid, list) { //[{id,money},{id,money}]
    try {
      if (window.android) {
        window.android.NATIVE_BROAD_HITS(JSON.stringify({ gameid, list }));
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_BROAD_HITS", data: { gameid, list }
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_broad_hit', gameid, list: JSON.stringify(list) }, '*');
      }
      if (window.NATIVE_BROAD_HITS) {
        NATIVE_BROAD_HITS({ gameid, list });
      }
    }
    catch (e) {

    }
  },
  closeFollow() {
    try {
      if (window.android) {
        window.android.NATIVE_CLOSE_FOLLOW();
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_CLOSE_FOLLOW"
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_close_follow' }, '*');
      }
      if (window.NATIVE_CLOSE_FOLLOW) {
        NATIVE_CLOSE_FOLLOW();
      }
    }
    catch (e) {

    }
  },
  openhistory(gameid) {
    try {
      if (window.android) {
        window.android.NATIVE_OPEN_HISORY(gameid);
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_OPEN_HISORY", data: gameid
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_open_history', gameid }, '*');
      }
      if (window.NATIVE_OPEN_HISORY) {
        NATIVE_OPEN_HISORY(gameid);
      }
    }
    catch (e) {

    }
  },
  bethistory(gameid) {
    try {
      if (window.android) {
        window.android.NATIVE_BET_HISORY(gameid);
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_BET_HISORY", data: gameid
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_bet_history', gameid }, '*');
      }
      if (window.NATIVE_BET_HISORY) {
        NATIVE_BET_HISORY(gameid);
      }
    }
    catch (e) {

    }
  },
  drawout() {
    try {
      if (window.android) {
        window.android.NATIVE_DRAW_OUT();
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_DRAW_OUT"
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_drawout' }, '*');
      }
      if (window.NATIVE_DRAW_OUT) {
        NATIVE_DRAW_OUT();
      }
    }
    catch (e) {

    }
  },
  servicer(gameid) {
    try {
      if (window.android) {
        window.android.NATIVE_SERVICER(gameid);
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.IOS_BC_GAME.postMessage({
          "cmd": "NATIVE_SERVICER","gameid":gameid
        });
      }
      if (window.parent != window) {
        window.parent.postMessage({ cmd: 'frame_servicer',gameid }, '*');
      }
      if (window.NATIVE_SERVICER) {
        NATIVE_SERVICER(gameid);
      }
    }
    catch (e) {

    }
  }
}