// ==UserScript==
// @name        動畫瘋 - 自動全螢幕
// @namespace   lmly9193
// @match       https://ani.gamer.com.tw/animeVideo.php?*
// @grant       none
// @version     1.0
// @author      lmly9193
// @description 自動全螢幕
// ==/UserScript==

var waitUntilExist = function (selector, callback) {
    if (jQuery(selector).length) {
        callback();
    } else {
        setTimeout(function () {
            waitUntilExist(selector, callback);
        }, 100);
    }
};

waitUntilExist('.vjs-fullscreen-control', function () {
    $('.vjs-fullscreen-control').click();
});
