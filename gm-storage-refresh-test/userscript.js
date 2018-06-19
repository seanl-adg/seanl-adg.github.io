// ==UserScript==
// @name GM_storage refresh test
// @namespace GM_storage refresh test
// @description GM_storage refresh test
// @version 0.0.0
// @match https://seanl-adg.github.io/*
// @grant GM_getValue
// @grant GM_setValue
// @grant unsafeWindow
// @run-at document-start
// ==/UserScript==

unsafewindow.GM_getValue = GM_getValue;
unsafeWindow.GM_setValue = GM_setValue;
