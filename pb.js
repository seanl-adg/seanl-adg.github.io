(function(unsafeWindow, GM_getValue, GM_setValue, GM_listValues, GM_deleteValue, GM_getResourceURL) {
// ==UserScript==
// @name AdGuard Popup Blocker (Dev)
// @name:hu AdGuard Felugró Szűrő (Dev)
// @name:da AdGuard Popup Blocker (Dev)
// @name:fr Bloqueur de popup de AdGuard (Dev)
// @name:it Blocco Pop-Up di AdGuard (Dev)
// @name:fa مسدودساز پاپ-آپ AdGuard (Dev)
// @name:sv AdGuards popup-blockerare (Dev)
// @name:zh-TW AdGuard 彈出式視窗封鎖器 (Dev)
// @name:pt-BR AdGuard Bloqueador de Pop-up (Dev)
// @name:no AdGuards popup-blokkerer (Dev)
// @name:ru Блокировщик всплывающей рекламы от AdGuard (Dev)
// @name:de AdGuard Pop-up-Blocker (Dev)
// @name:zh-CN AdGuard 弹窗拦截器 (Dev)
// @name:sk AdGuard blokovač vyskakovacích okien (Dev)
// @name:ja AdGuard ポップアップブロッカー (Dev)
// @name:uk Блокувальник спливаючої реклами AdGuard (Dev)
// @name:sr-Latn AdGuard blokator iskačućih prozora (Dev)
// @name:pl Bloker wyskakujących okienek przez AdGuard (Dev)
// @namespace AdGuard
// @description Blocks popup ads on web pages
// @description:hu A felugró hirdetéseket szűri minden weboldalon
// @description:ko 웹 페이지의 팝업 광고를 차단합니다.
// @description:da Blokerer pop-up reklamer på websider
// @description:fr Bloque les publicités intrusives sur les pages web
// @description:it Blocca gli annunci di popup nelle pagine internet
// @description:es-419 Bloquea anuncios emergentes en páginas web
// @description:nl Blokkeert pop up advertenties op webpagina's
// @description:fa مسدودسازی تبلیغات پاپ آپ در صفحات وب.
// @description:sv Blockerar popupfönster på webbsidor
// @description:ms Halang iklan popup di laman web
// @description:zh-TW 封鎖於網頁上之彈出式視窗廣告
// @description:pt-BR Bloqueia anúncios pop-ups dentro dos sites
// @description:no Blokker popup-annonser på nettsider
// @description:ru Блокирует всплывающую рекламу на страницах
// @description:vi Chặn quảng cáo popup trên các trang web
// @description:pt-PT Bloqueia anúncios popup em páginas da web.
// @description:de Blockiert Anzeige-Pop-ups auf Webseiten
// @description:zh-CN 拦截网页弹窗广告
// @description:sk Blokuje vyskakovacie reklamy na webových stránkach
// @description:ja ウェブページのポップアップ広告をブロックする
// @description:tr Web sayfalarında açılan pencere reklamları engeller
// @description:ar لحظر الإعلانات المنبثقة على صفحات الويب
// @description:uk Блокує спливаючу рекламу на веб-сторінках
// @description:sr-Latn Blokira iskačuće reklame na veb stranicama
// @description:pl Blokuje wyskakujące okienka z reklamami na stronach internetowych
// @version 2.5.1
// @license LGPL-3.0; https://github.com/AdguardTeam/PopupBlocker/blob/master/LICENSE
// @downloadURL https://AdguardTeam.github.io/PopupBlocker/popupblocker.user.js
// @updateURL https://AdguardTeam.github.io/PopupBlocker/popupblocker.meta.js
// @supportURL https://github.com/AdguardTeam/PopupBlocker/issues
// @homepageURL https://github.com/AdguardTeam/PopupBlocker
// @match http://*/*
// @match https://*/*
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_getResourceURL
// @grant unsafeWindow
// @icon ./assets/128.png
// @resource ./assets/fonts/bold/OpenSans-Bold.woff ./assets/fonts/bold/OpenSans-Bold.woff
// @resource ./assets/fonts/bold/OpenSans-Bold.woff2 ./assets/fonts/bold/OpenSans-Bold.woff2
// @resource ./assets/fonts/regular/OpenSans-Regular.woff ./assets/fonts/regular/OpenSans-Regular.woff
// @resource ./assets/fonts/regular/OpenSans-Regular.woff2 ./assets/fonts/regular/OpenSans-Regular.woff2
// @resource ./assets/fonts/semibold/OpenSans-Semibold.woff ./assets/fonts/semibold/OpenSans-Semibold.woff
// @resource ./assets/fonts/semibold/OpenSans-Semibold.woff2 ./assets/fonts/semibold/OpenSans-Semibold.woff2
// @run-at document-start
// ==/UserScript==
(function () {


}());
(function () {
var I18nService = /** @class */ (function () {
    function I18nService($getMessage) {
        this.$getMessage = $getMessage;
    }
    I18nService.prototype.getMsg = function (messageId, opt_values) {
        var str = this.$getMessage(messageId);
        if (opt_values) {
            str = str.replace(/\{\$([^}]+)}/g, function (match, key) {
                return (opt_values != null && key in opt_values) ? opt_values[key] : match;
            });
        }
        return str;
    };
    return I18nService;
}());

/**
 * This serves as a whitelist on various checks where we block re-triggering of events.
 * See dom/dispatchEvent.ts.
 */


/**
 * Detects about:blank, about:srcdoc urls.
 */

/**
 * @fileoverview Utility functions for instanceof checks against DOM classes. Used for type casting.
 * Since it is common for us to cross the border of browsing contexts, instanceof
 * check for DOM element is not reliable.
 */



/**/






/**/
var isUndef = function (obj) {
    return typeof obj === 'undefined';
};
/**/

var UserscriptSettingsDao = /** @class */ (function () {
    function UserscriptSettingsDao() {
        this.settingsChangeListeners = [];
    }
    UserscriptSettingsDao.migrateDataIfNeeded = function () {
        var dataVersion = parseFloat(GM_getValue(UserscriptSettingsDao.DATA_VERSION_KEY, '1'));
        if (dataVersion < 2) {
            var whitelist = [];
            GM_forEach(new Ver1DataMigrator(whitelist));
            GM_setValue(UserscriptSettingsDao.WHITELIST, whitelist.join(','));
            GM_setValue(UserscriptSettingsDao.DATA_VERSION_KEY, String(UserscriptSettingsDao.CURRENT_VERSION));
        }
    };
    UserscriptSettingsDao.prototype.setSourceOption = function (domain, option, cb) {
        GM_setValue(domain, option);
        if (!isUndef(cb)) {
            cb();
        }
        this.fireListeners();
    };
    UserscriptSettingsDao.prototype.getSourceOption = function (domain) {
        return GM_getValue(domain, 0 /* NONE */);
    };
    UserscriptSettingsDao.getWhitelist = function () {
        var whitelistStringified = GM_getValue(UserscriptSettingsDao.WHITELIST);
        if (isUndef(whitelistStringified) || whitelistStringified.length === 0) {
            // Discard zero-length string
            return [];
        }
        return whitelistStringified.split(',');
    };
    UserscriptSettingsDao.prototype.setWhitelist = function (domain, whitelisted, cb) {
        var whitelist = UserscriptSettingsDao.getWhitelist();
        var prevWhitelistInd = whitelist.indexOf(domain);
        if (prevWhitelistInd === -1 && whitelisted !== false) {
            whitelist.push(domain);
        }
        else if (prevWhitelistInd !== -1 && whitelisted !== true) {
            whitelist.splice(prevWhitelistInd, 1);
        }
        else {
            if (!isUndef(cb)) {
                cb();
            }
            return;
        }
        GM_setValue(UserscriptSettingsDao.WHITELIST, whitelist.join(','));
        if (!isUndef(cb)) {
            cb();
        }
        this.fireListeners();
    };
    UserscriptSettingsDao.prototype.getIsWhitelisted = function (domain) {
        var whitelist = UserscriptSettingsDao.getWhitelist();
        return whitelist.indexOf(domain) !== -1;
    };
    UserscriptSettingsDao.prototype.getEnumeratedOptions = function () {
        var whitelisted = [];
        var silenced = [];
        GM_forEach(new AllOptionsBuilder(whitelisted, silenced));
        return [whitelisted, silenced];
    };
    UserscriptSettingsDao.prototype.enumerateOptions = function (cb) {
        cb(this.getEnumeratedOptions());
    };
    UserscriptSettingsDao.prototype.fireListeners = function () {
        var listeners = this.settingsChangeListeners;
        var options = this.getEnumeratedOptions();
        for (var i = 0, l = listeners.length; i < l; i++) {
            listeners[i](options);
        }
    };
    UserscriptSettingsDao.prototype.onSettingsChange = function (cb) {
        this.settingsChangeListeners.push(cb);
    };
    /**
     * The version number of the data scheme that this implemenation uses.
     */
    UserscriptSettingsDao.CURRENT_VERSION = 2;
    /**
     * A GM_value key, storing a data scheme's version number in a string.
     */
    UserscriptSettingsDao.DATA_VERSION_KEY = "ver";
    /**
     * A GM_value key, storing a comma-separated list of whitelisted domains.
     */
    UserscriptSettingsDao.WHITELIST = "whitelist";
    return UserscriptSettingsDao;
}());
function GM_forEach(iterator) {
    var keys = GM_listValues();
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        var value = GM_getValue(key);
        iterator.callback(key, value);
    }
}
var Ver1DataMigrator = /** @class */ (function () {
    function Ver1DataMigrator(whitelist) {
        this.whitelist = whitelist;
    }
    Ver1DataMigrator.prototype.callback = function (key, value) {
        if (typeof value === 'string') {
            if (key === Ver1DataMigrator.VER_1_WHITELIST_KEY) {
                Array.prototype.push.apply(this.whitelist, value.split(','));
            }
            else {
                try {
                    // Domain settings
                    if (JSON.parse(value)['whitelisted'] === true) {
                        if (this.whitelist.indexOf(key) === -1) {
                            this.whitelist.push(key);
                        }
                    }
                }
                catch (e) { }
            }
        }
        GM_deleteValue(key);
    };
    Ver1DataMigrator.VER_1_WHITELIST_KEY = 'whitelist';
    return Ver1DataMigrator;
}());
var AllOptionsBuilder = /** @class */ (function () {
    function AllOptionsBuilder(whitelisted, silenced) {
        this.whitelisted = whitelisted;
        this.silenced = silenced;
    }
    AllOptionsBuilder.prototype.callback = function (key, value) {
        if (key === UserscriptSettingsDao.WHITELIST) {
            if (value.length > 0) {
                Array.prototype.push.apply(this.whitelisted, value.split(','));
            }
        }
        else if (key !== UserscriptSettingsDao.DATA_VERSION_KEY) {
            if ((value & 1 /* SILENCED */) !== 0) {
                this.silenced.push(key);
            }
        }
    };
    return AllOptionsBuilder;
}());

/**
 * Note: it should always request new data with GM_getValue,
 * in order to retrieve the most up-to-date data.
 */
var UserscriptContentScriptApiFacade = /** @class */ (function () {
    function UserscriptContentScriptApiFacade(settingsDao, alertController, $getMessage) {
        this.settingsDao = settingsDao;
        this.alertController = alertController;
        this.$getMessage = $getMessage;
        this.domain = location.hostname;
        this.envIsFirefoxBrowserExt = typeof InstallTrigger !== 'undefined' && document.currentScript;
    }
    UserscriptContentScriptApiFacade.prototype.originIsWhitelisted = function (domain) {
        if (domain === void 0) { domain = this.domain; }
        return this.settingsDao.getIsWhitelisted(domain);
    };
    UserscriptContentScriptApiFacade.prototype.originIsSilenced = function () {
        return (this.settingsDao.getSourceOption(this.domain) & 1 /* SILENCED */) !== 0;
    };
    UserscriptContentScriptApiFacade.prototype.showAlert = function (orig_domain, popup_url) {
    };
    /**
     * Methods are defined in privileged context, we need to expose it to the
     * page's context in order to use it in injected script.
     */
    UserscriptContentScriptApiFacade.prototype.expose = function () {
        var BRIDGE_KEY = '__PB' + (Math.random() * 1e9 >>> 0) + '__';
        if (this.envIsFirefoxBrowserExt) {
            this.originIsWhitelisted = this.originIsWhitelisted.bind(this);
            this.originIsSilenced = this.originIsSilenced.bind(this);
            this.showAlert = this.showAlert.bind(this);
            unsafeWindow[BRIDGE_KEY] = cloneInto(this, unsafeWindow, { cloneFunctions: true });
        }
        else {
            unsafeWindow[BRIDGE_KEY] = this;
        }
        return BRIDGE_KEY;
    };
    return UserscriptContentScriptApiFacade;
}());

/**
 * @fileoverview Global namespace to be used throughout the content script.
 */
var adguard = {};

/**
 * @fileoverview A custom getMessage implementation for userscripts.
 */
var translations = {"hu":{"userscript_name":"AdGuard Felugró Szűrő","on_navigation_by_popunder":"Ez az átmenetet egy másik oldalra egy pop-under okozta. Szeretné folytatni?","aborted_popunder_execution":"Popup Szűrő megszakított egy scriptet ami a háttérben átirányította volna"},"ko":{"on_navigation_by_popunder":"이 페이지 전환은 팝업 스크립트가 유발했을 수 있습니다. 계속하시겠습니까?","aborted_popunder_execution":"페이지 전환이 일어나지 않도록 팝업 차단기가 스크립트 실행을 중단시켰습니다"},"da":{"userscript_name":"AdGuard Popup Blocker","on_navigation_by_popunder":"Denne overgang til den nye side vil sandsynligvis medføre et pop under-vindue. Ønsker du at fortsætte?","aborted_popunder_execution":"PopupBlocker afbrød en script eksekvering for at forhindre baggrundsomdirigering","settings_saved":"Indstillingerne er gemt","show_popup":"Vis {$destUrl}","continue_blocking":"Fortsæt blokering","allow_from":"Tillad pop-ups for {$origDomain}","manage_pref":"Administrer præferencer...","popup_text":"AdGuard forhindrede denne hjemmeside i at åbne {$numPopup} pop op-vinduer","options":"Valgmuligheder","silence_noti":"Vis ikke denne meddelelse på {$origDomain}"},"fr":{"userscript_name":"Bloqueur de popup de AdGuard","on_navigation_by_popunder":"Cette transition vers la nouvelle page est susceptible d'être causé par un pop-under. Désirez-vous continuer?","aborted_popunder_execution":"PopupBlocker a interrompu l'exécution d'un script pour éviter la redirection du fond d'écran "},"it":{"userscript_name":"Blocco Pop-Up di AdGuard","on_navigation_by_popunder":"Questo passaggio alla nuova pagina è probabilmente causato da un pop-under. Vuoi continuare?","aborted_popunder_execution":"PopupBlocker ha interrotto l'esecuzione di uno script per impedire il reindirizzamento in background"},"es-419":{"on_navigation_by_popunder":"Esta transición a la nueva página parece estar causada por un pop-under (que aparece detrás de la ventada actual). ¿Desea continuar?","aborted_popunder_execution":"PopupBlocker abortó la ejecución de un script para prevenir un redireccionamiento en segundo plano."},"nl":{"on_navigation_by_popunder":"De overgang naar de nieuwe pagina wordt waarschijnlijk veroorzaakt door een pop-under. Wil je doorgaan?","aborted_popunder_execution":"De pop-up blocker heeft de uitvoering van een script onderbroken om te voorkomen dat er op de achtergrond een redirect plaatsvindt."},"fa":{"userscript_name":"مسدودساز پاپ-آپ AdGuard","on_navigation_by_popunder":"انتقال به این صفحه جدید احتمالا بخاطر یه پاپ-آندر انجام شده است. میخواهید ادامه دهید؟","aborted_popunder_execution":"مسدودساز پاپ-آپ اجرای کد را لغو کرده تا از ریدایرکت جبلوگیری شود"},"sv":{"userscript_name":"AdGuards popup-blockerare","on_navigation_by_popunder":"Övergången till den nya webbsidan orsakas sannolikt av en underliggande fönster (en s.k. pop-under). Vill du fortsätta?","aborted_popunder_execution":"Popupblockeraren avbröt en skriptexekvering för att hindra omdirigering av en bakgrundsaktivitet."},"ms":{"on_navigation_by_popunder":"Transisi ke laman baru berkemungkinan disebabkan oleh pop-under. Anda pasti untuk teruskan?","aborted_popunder_execution":"Penghalang Popup menghentikan pelaksanaan skrip untuk mencegah pelencongan dari belakang tabir"},"zh-TW":{"userscript_name":"AdGuard 彈出式視窗封鎖器","on_navigation_by_popunder":"此至新的頁面之轉換很可能是由一個背彈式視窗引起。您想要繼續嗎？","aborted_popunder_execution":"彈出式視窗封鎖器中止腳本執行以防止背景重定向","settings_saved":"已儲存之設定","show_popup":"顯示 {$destUrl}","continue_blocking":"繼續封鎖","allow_from":"對於 {$origDomain} 允許彈出式視窗","manage_pref":"管理偏好...","popup_text":"AdGuard阻止該網站展現 {$numPopup} 彈出式視窗","options":"選項","silence_noti":"不要於 {$origDomain} 上顯示該訊息"},"pt-BR":{"userscript_name":"AdGuard Bloqueador de Pop-up","on_navigation_by_popunder":"Essa transição para a nova página provavelmente será causada por um pop-under. Você deseja continuar?","aborted_popunder_execution":"O bloqueador de pop-ups interrompeu uma execução de script para evitar um redirecionamento em plano de fundo"},"no":{"userscript_name":"AdGuards popup-blokkerer","on_navigation_by_popunder":"Omdirigeringen til den nye nettsiden er sannsynligvis forårsaket av en pop-under. Ønsker du å fortsette?","aborted_popunder_execution":"PopupBlocker avbrøt en skrift fra å kjøre for å hindre bakgrunnsomdirigering"},"ru":{"userscript_name":"Блокировщик всплывающей рекламы от AdGuard","on_navigation_by_popunder":"Этот переход на новую страницу скорее всего вызван поп-андером. Всё равно продолжить?","aborted_popunder_execution":"PopupBlocker прервал исполнение скрипта, чтобы предотвратить фоновую переадресацию"},"pt-PT":{"on_navigation_by_popunder":"Esta transição para a nova página  será  provavelmente causada por um popunder. Deseja continuar?","aborted_popunder_execution":"PopupBlocker abortou uma execução de script para evitar o redireccionamento em segundo plano"},"id":{"on_navigation_by_popunder":"Transisi ke laman baru ini kemungkinan disebabkan oleh sebuah pop-up. Apakah Anda ingin melanjutkan?","aborted_popunder_execution":"PopupBlocker menghentikan eksekusi script untuk mencegah perubahan laman di latar belakang"},"de":{"userscript_name":"AdGuard Pop-up-Blocker","on_navigation_by_popunder":"Diese Seiten-Navigation wird wahrscheinlich durch ein Pop-under verursacht. Möchten Sie fortfahren?","aborted_popunder_execution":"Pop-up-Blocker hat eine Skript-Ausführung abgebrochen, um eine Hintergrundumleitung zu verhindern"},"zh-CN":{"userscript_name":"AdGuard 弹窗拦截器","on_navigation_by_popunder":"此网页导航可能导致弹窗。您要继续？","aborted_popunder_execution":"PopupBlocker 已中止脚本执行以防止后台重新定向"},"sk":{"userscript_name":"AdGuard blokovač vyskakovacích okien","on_navigation_by_popunder":"Tento prechod na novú stránku je pravdepodobne spôsobený pop-under. Chcete pokračovať?","aborted_popunder_execution":"PopupBlocker prerušil vykonanie skriptu, aby zabránil presmerovaniu na pozadí"},"ja":{"userscript_name":"AdGuard ポップアップブロッカー","on_navigation_by_popunder":"新しいページへの移動はポップアンダーによって生じた可能性があります。続行しますか？","aborted_popunder_execution":"ポップアップブロッカーはバックグラウンドリダイレクトを防ぐためにスクリプトの実行を中止しました"},"tr":{"on_navigation_by_popunder":"Yeni sayfaya geçiş, bir gizli pencere nedeniyle meydana gelmiş olabilir. Devam etmek istiyor musunuz?","aborted_popunder_execution":"Arka plan yönlendirmesini önlemek için Açılır Pencere Engelleyicisi bir komut dosyasının çalışmasını engelledi"},"ar":{"on_navigation_by_popunder":"من المحتمل ان يكون هذا الانتقال إلى الصفحة الجديدة ناتجا عن الإطار المنبثق. هل ترغب في المتابعة ؟","aborted_popunder_execution":"تم إحباط البرنامج النصي لمنع أعاده توجيه الخلفية"},"uk":{"userscript_name":"Блокувальник спливаючої реклами AdGuard","on_navigation_by_popunder":"Цей перехід на нову сторінку, ймовірно, міг бути викликаний поп-андером. Бажаєте продовжити?","aborted_popunder_execution":"PopupBlocker перервав виконання скрипта, щоб запобігти фоновому перенаправленню"},"sr-Latn":{"userscript_name":"AdGuard blokator iskačućih prozora","on_navigation_by_popunder":"Ovaj prelaz na novu stranicu je verovatno uzrokovan iskačućim prozorom. Želite li da nastavite?","aborted_popunder_execution":"Blokator iskačućeg prozora je blokirao izvršenje skripte kako bi sprečio pozadinsko preusmerenje"},"en":{"userscript_name":"AdGuard Popup Blocker","on_navigation_by_popunder":"This transition to the new page is likely to be caused by a pop-under. Do you wish to continue?","aborted_popunder_execution":"PopupBlocker aborted a script execution to prevent background redirect","settings_saved":"Settings saved","show_popup":"Show {$destUrl}","continue_blocking":"Continue blocking","allow_from":"Allow pop-ups for {$origDomain}","manage_pref":"Manage preferences...","popup_text":"AdGuard prevented this website from opening {$numPopup} pop-up windows","options":"Options","silence_noti":"Don't show this message on {$origDomain}"},"pl":{"userscript_name":"Bloker wyskakujących okienek przez AdGuard","on_navigation_by_popunder":"To przejście na nową stronę może być spowodowane przez pop-under. Czy chcesz kontynuować?","aborted_popunder_execution":"PopupBlocker anulował wykonanie skryptu by przeciwdziałać przekierowaniu w tle"}};
/**
 * AdGuard for Windows noramlizes locales like this.
 */
function normalizeLocale(locale) {
    return locale.toLowerCase().replace('_', '-');
}
var supportedLocales = Object.keys(translations).map(function (locale) { return normalizeLocale(locale); });
var defaultLocale = 'en';
var currentLocale = null;
function setLocaleIfSupported(locale) {
    if (supportedLocales.indexOf(locale) !== -1) {
        currentLocale = locale;
        return true;
    }
    return false;
}
function setLocale() {
    if (typeof AdguardSettings !== 'undefined') {
        var locale = normalizeLocale(AdguardSettings.locale);
        if (setLocaleIfSupported(locale)) {
            return;
        }
    }
    var lang = normalizeLocale(navigator.language);
    if (setLocaleIfSupported(lang)) {
        return;
    }
    var i = lang.indexOf('-');
    if (i !== -1) {
        lang = lang.slice(0, i);
    }
    if (setLocaleIfSupported(lang)) {
        return;
    }
    currentLocale = defaultLocale;
}
setLocale();
var getMessage = function (messageId) {
    var message = translations[currentLocale][messageId];
    if (!message) {
        message = translations[defaultLocale][messageId];
        throw messageId + ' not localized';
    }
    return message;
};

/**
 * @fileoverview Provides various CSS in JS string
 */
var CSSService = /** @class */ (function () {
    function CSSService($getURL) {
        this.$getURL = $getURL;
    }
    CSSService.prototype.getFontURLs = function () {
        if (isUndef(this.fontURLs)) {
            var fontsDir = CSSService.fontsDir;
            var opensans = "/OpenSans-";
            var woff = '.woff';
            var WOFF_OPENSANS_REGULAR = fontsDir + "regular" + opensans + "Regular" + woff;
            var WOFF_OPENSANS_SEMIBOLD = fontsDir + "semibold" + opensans + "Semibold" + woff;
            var WOFF_OPENSANS_BOLD = fontsDir + "bold" + opensans + "Bold" + woff;
            var WOFF2_OPENSANS_REGULAR = WOFF_OPENSANS_REGULAR + 2;
            var WOFF2_OPENSANS_SEMIBOLD = WOFF_OPENSANS_SEMIBOLD + 2;
            var WOFF2_OPENSANS_BOLD = WOFF_OPENSANS_BOLD + 2;
            this.fontURLs = [
                this.$getURL(WOFF_OPENSANS_REGULAR),
                this.$getURL(WOFF2_OPENSANS_REGULAR),
                this.$getURL(WOFF_OPENSANS_SEMIBOLD),
                this.$getURL(WOFF2_OPENSANS_SEMIBOLD),
                this.$getURL(WOFF_OPENSANS_BOLD),
                this.$getURL(WOFF2_OPENSANS_BOLD)
            ];
        }
        return this.fontURLs;
    };
    CSSService.isNotDataURI = function (url) {
        return !CSSService.reDataURI.test(url);
    };
    // every browser that supports preload supports woff2.
    CSSService.prototype.getAlertPreloadFontURLs = function () {
        var urls = this.getFontURLs();
        // Regular and Bold woff2
        return [urls[1], urls[5]]
            .filter(CSSService.isNotDataURI); // There is no point of applying 'preload'
        // to data URIs. 
    };
    CSSService.prototype.getToastPreloadFontURLs = function () {
        var urls = this.getFontURLs();
        // Regular woff2
        return [urls[1]].filter(CSSService.isNotDataURI);
    };
    CSSService.prototype.getInlineFontCSS = function () {
        var urls = this.getFontURLs();
        return "@font-face{font-family:\"Open Sans\";src:url("+urls[1]+") format(\"woff2\"),url("+urls[0]+") format(\"woff\");font-weight:400;font-style:normal}@font-face{font-family:\"Open Sans\";src:url("+urls[3]+") format(\"woff2\"),url("+urls[2]+") format(\"woff\");font-weight:600;font-style:normal}@font-face{font-family:\"Open Sans\";src:url("+urls[5]+") format(\"woff2\"),url("+urls[4]+") format(\"woff\");font-weight:700;font-style:normal}";
    };
    CSSService.prototype.getAlertCSS = function () {
        return this.getInlineFontCSS() + "*{box-sizing:border-box}html{font-size:10px;height:100%}body{height:100%;margin:0;font-size:1.3rem;line-height:1.428571429;color:#282828;font-family:\"Open Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Ubuntu,\"Helvetica Neue\",Arial,sans-serif;font-weight:400}body.body--overflow{overflow:hidden}ul{list-style:none}input{outline:0}button{font-size:inherit;color:inherit;border:0;outline:0;background-color:transparent}select::-ms-expand{display:none}.radio{display:none}.radio-label{padding-left:30px;position:relative}.radio-label:after{content:\'\';cursor:pointer;position:absolute;left:0;top:0;width:18px;height:18px;border-radius:100%;box-shadow:0 0 0 1px #ccc;transition:.3s ease box-shadow}.radio-label:hover:after{box-shadow:0 0 0 1px #66b574}.radio:checked+.radio-label:before{content:\'\';position:absolute;top:4px;left:4px;width:10px;height:10px;border-radius:100%;background-color:#66b574}.radio:disabled+.radio-label:after{background-color:#f1f1f1;cursor:default}.radio:disabled+.radio-label:hover:after{box-shadow:0 0 0 1px #ccc}.checkbox{display:none}.checkbox-label{padding-left:30px;position:relative}.checkbox-label:after{content:\'\';cursor:pointer;position:absolute;left:0;top:-1px;width:19px;height:19px;border-radius:3px;box-shadow:0 0 0 1px #ccc;transition:.3s ease box-shadow,.3s ease background-color}.checkbox-label:hover:after{box-shadow:0 0 0 1px #66b574}.checkbox:checked+.checkbox-label:after{background-color:#66b574;box-shadow:0 0 0 1px #66b574}.checkbox:checked+.checkbox-label:before{content:\'\';cursor:pointer;position:absolute;z-index:1;top:5px;left:4px;width:11px;height:9px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width=\'11\' height=\'9\' viewBox=\'0 0 11 9\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctitle%3ELine 5%3C/title%3E%3Cpath d=\'M.91 4.059l3.41 3.408L9.684.597\' stroke=\'%23FFF\' stroke-width=\'1.2\' fill=\'none\' fill-rule=\'evenodd\' stroke-linecap=\'round\'/%3E%3C/svg%3E\")}.checkbox:checked+.checkbox-label:hover:after{background-color:#66b574}.checkbox:disabled+.checkbox-label:after{background-color:#f1f1f1;cursor:default}.checkbox:disabled+.checkbox-label:hover:after{box-shadow:0 0 0 1px #ccc}.userscript-options-page{background-color:#e6e6e6}.userscript-options-page .settings{-ms-flex-pack:center;justify-content:center}.alert{display:none;position:fixed;top:5px;right:58px;width:390px;background-color:#fff;padding:45px 20px 20px;box-shadow:0 0 10px 3px rgba(162,161,161,.3)}.alert:after{content:\"▲\";position:absolute;right:-9px;top:44px;transform:rotate(90deg) scaleY(.7);color:#fff}.alert--show{display:block}.alert__close{display:block;position:absolute;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\'0 0 16 16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctitle%3EGroup 2%3C/title%3E%3Cg stroke=\'%23979797\' stroke-width=\'1.5\' fill=\'none\' fill-rule=\'evenodd\' opacity=\'.661\' stroke-linecap=\'square\'%3E%3Cpath d=\'M1.473 1.273l13 13M1.473 14.273l13-13\'/%3E%3C/g%3E%3C/svg%3E\");cursor:pointer;top:20px;right:20px;width:15px;height:15px}.alert__in{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-bottom:35px}.alert__ico{margin-right:20px}.alert__ico--windows{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\'0 0 49 41\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctitle%3EGroup 3%3C/title%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M2.374.715h44.4a1.8 1.8 0 0 1 1.8 1.8v36.4a1.8 1.8 0 0 1-1.8 1.8h-44.4a1.8 1.8 0 0 1-1.8-1.8v-36.4a1.8 1.8 0 0 1 1.8-1.8z\' fill=\'%23F5A623\'/%3E%3Cpath d=\'M5.204 10.117h38.74a1.8 1.8 0 0 1 1.8 1.8v23.596a1.8 1.8 0 0 1-1.8 1.8H5.204a1.8 1.8 0 0 1-1.8-1.8V11.917a1.8 1.8 0 0 1 1.8-1.8z\' fill=\'%23FFF\' opacity=\'.149\'/%3E%3Cg stroke=\'%23FFF\' stroke-linecap=\'round\' stroke-width=\'1.5\'%3E%3Cpath d=\'M19.149 19.004L29.816 29.67M19.149 29.671l10.667-10.667\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");width:49px;height:41px;margin-right:20px}.alert__ico--touch{width:31px;height:40px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\'0 0 31 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctitle%3EGroup 2%3C/title%3E%3Cg fill=\'%2366B574\' fill-rule=\'nonzero\'%3E%3Cpath d=\'M21.115 25.65c-.491 1.018-1.06 2-1.701 2.94a11.367 11.367 0 0 0 2.726 4.356 11.393 11.393 0 0 0 3.726 2.49 14.968 14.968 0 0 0 1.579-1.86c-3.449-1.101-6.013-4.198-6.33-7.926z\'/%3E%3Cpath d=\'M25.65 24.87v-9.137c0-5.668-4.612-10.279-10.28-10.279-5.667 0-10.278 4.611-10.278 10.279A4.573 4.573 0 0 1 .524 20.3v2.284a6.86 6.86 0 0 0 6.852-6.852c0-4.408 3.587-7.995 7.995-7.995 4.408 0 7.994 3.587 7.994 7.995v9.136c0 3.246 2.268 5.971 5.302 6.676.345-.691.637-1.412.872-2.158a4.575 4.575 0 0 1-3.89-4.518zM20.525 34.562a13.785 13.785 0 0 1-2-2.532l-.76-1.238-1.087 1.095a22.72 22.72 0 0 1-9.214 5.619 14.804 14.804 0 0 0 2.828 1.391 25.004 25.004 0 0 0 7.072-4.51 16.126 16.126 0 0 0 4.303 4.002c.8-.376 1.561-.821 2.275-1.328a13.727 13.727 0 0 1-3.417-2.5z\'/%3E%3Cpath d=\'M15.37.886C7.185.886.525 7.546.525 15.733v2.284a2.287 2.287 0 0 0 2.284-2.284c0-6.927 5.636-12.563 12.563-12.563 6.927 0 12.562 5.636 12.562 12.563v9.136c0 1.205.938 2.194 2.121 2.278.107-.719.163-1.454.163-2.202v-9.212c0-8.187-6.66-14.847-14.846-14.847z\'/%3E%3Cpath d=\'M15.37 10.022a5.717 5.717 0 0 0-5.71 5.71c0 5.039-4.098 9.137-9.136 9.137v.076c0 .75.056 1.486.164 2.206a11.343 11.343 0 0 0 7.913-3.34 11.347 11.347 0 0 0 3.343-8.078 3.43 3.43 0 0 1 3.427-3.426 3.43 3.43 0 0 1 3.426 3.426c0 9.083-6.662 16.638-15.357 18.039.53.713 1.12 1.377 1.766 1.985a20.41 20.41 0 0 0 9.857-5.485 20.425 20.425 0 0 0 6.018-14.54 5.717 5.717 0 0 0-5.71-5.71zM17.295 37.792l-.207-.21a27.22 27.22 0 0 1-3.26 2.13 14.952 14.952 0 0 0 5.216-.38 18.558 18.558 0 0 1-1.75-1.54z\'/%3E%3Cpath d=\'M15.37 14.59c-.63 0-1.141.512-1.141 1.143 0 7.325-5.778 13.327-13.015 13.687.243.77.548 1.513.909 2.223a15.866 15.866 0 0 0 9.71-4.602 15.886 15.886 0 0 0 4.68-11.308c0-.631-.512-1.142-1.142-1.142z\'/%3E%3C/g%3E%3C/svg%3E\")}.alert__text{width:258px}.alert__btns{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.alert__select{width:170px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\'0 0 11 8\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctitle%3ETriangle%3C/title%3E%3Cpath stroke=\'%231D1D1D\' stroke-width=\'1.5\' d=\'M9.63.914L5.147 5.945.665.914\' fill=\'none\' fill-rule=\'evenodd\' opacity=\'.337\'/%3E%3C/svg%3E\");background-size:10px 8px;background-position:153px 17px;background-repeat:no-repeat;text-align-last:center;border-radius:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;font-size:inherit;border:0;cursor:pointer;text-align:center;box-shadow:0 0 0 1px rgba(197,197,197,.47);padding:0 20px;height:40px;line-height:40px;background-color:#fff;transition:.3s ease background-color;font-family:\"Open Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Ubuntu,\"Helvetica Neue\",Arial,sans-serif;font-weight:700}.alert__select:hover{background-color:rgba(104,188,113,.2)}.alert__btn{display:block;width:170px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;text-align:center;box-shadow:0 0 0 1px rgba(197,197,197,.47);padding:0 20px;height:40px;line-height:40px;background-color:#fff;transition:.3s ease background-color;font-family:\"Open Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Ubuntu,\"Helvetica Neue\",Arial,sans-serif;font-weight:700}.alert__btn:hover{background-color:rgba(104,188,113,.2)}.alert__btn:active{background-color:#66b574;color:#fff}.pin{display:none;width:30px;height:30px;position:fixed;right:8px;cursor:pointer;border-radius:100%;box-shadow:0 0 10px 3px rgba(162,161,161,.3);background-color:#fff;background-repeat:no-repeat;background-position:50%;transition:.3s ease background-color;padding:0}.pin:hover{background-color:rgba(104,188,113,.2)}.pin--show{display:block}.pin--shield{width:60px;height:60px;background-size:30px;background-position:50% 17px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 25.3 25.9\'%3E%3Cpath fill=\'%2368bc71\' d=\'M12.7 0C8.7 0 3.9.9 0 3c0 4.4-.1 15.4 12.7 23C25.4 18.4 25.3 7.4 25.3 3 21.4.9 16.6 0 12.7 0z\'/%3E%3Cpath fill=\'%2367b279\' d=\'M12.6 25.9C-.1 18.4 0 7.4 0 3c3.9-2 8.7-3 12.6-3v25.9z\'/%3E%3Cpath fill=\'%23fff\' d=\'M12.2 17.3L19.8 7a.99.99 0 0 0-1.3.1l-6.4 6.6-2.4-2.9c-1.1-1.3-2.7-.3-3.1 0l5.6 6.5\'/%3E%3C/svg%3E\")}.pin--win-hidden{background-size:16px 13px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\'0 0 49 41\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctitle%3EGroup 3%3C/title%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M2.374.715h44.4a1.8 1.8 0 0 1 1.8 1.8v36.4a1.8 1.8 0 0 1-1.8 1.8h-44.4a1.8 1.8 0 0 1-1.8-1.8v-36.4a1.8 1.8 0 0 1 1.8-1.8z\' fill=\'%23F5A623\'/%3E%3Cpath d=\'M5.204 10.117h38.74a1.8 1.8 0 0 1 1.8 1.8v23.596a1.8 1.8 0 0 1-1.8 1.8H5.204a1.8 1.8 0 0 1-1.8-1.8V11.917a1.8 1.8 0 0 1 1.8-1.8z\' fill=\'%23FFF\' opacity=\'.149\'/%3E%3Cg stroke=\'%23FFF\' stroke-linecap=\'round\' stroke-width=\'1.5\'%3E%3Cpath d=\'M19.149 19.004L29.816 29.67M19.149 29.671l10.667-10.667\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")}.pin--touch{background-size:13px 16px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\'0 0 31 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctitle%3EGroup 2%3C/title%3E%3Cg fill=\'%2366B574\' fill-rule=\'nonzero\'%3E%3Cpath d=\'M21.115 25.65c-.491 1.018-1.06 2-1.701 2.94a11.367 11.367 0 0 0 2.726 4.356 11.393 11.393 0 0 0 3.726 2.49 14.968 14.968 0 0 0 1.579-1.86c-3.449-1.101-6.013-4.198-6.33-7.926z\'/%3E%3Cpath d=\'M25.65 24.87v-9.137c0-5.668-4.612-10.279-10.28-10.279-5.667 0-10.278 4.611-10.278 10.279A4.573 4.573 0 0 1 .524 20.3v2.284a6.86 6.86 0 0 0 6.852-6.852c0-4.408 3.587-7.995 7.995-7.995 4.408 0 7.994 3.587 7.994 7.995v9.136c0 3.246 2.268 5.971 5.302 6.676.345-.691.637-1.412.872-2.158a4.575 4.575 0 0 1-3.89-4.518zM20.525 34.562a13.785 13.785 0 0 1-2-2.532l-.76-1.238-1.087 1.095a22.72 22.72 0 0 1-9.214 5.619 14.804 14.804 0 0 0 2.828 1.391 25.004 25.004 0 0 0 7.072-4.51 16.126 16.126 0 0 0 4.303 4.002c.8-.376 1.561-.821 2.275-1.328a13.727 13.727 0 0 1-3.417-2.5z\'/%3E%3Cpath d=\'M15.37.886C7.185.886.525 7.546.525 15.733v2.284a2.287 2.287 0 0 0 2.284-2.284c0-6.927 5.636-12.563 12.563-12.563 6.927 0 12.562 5.636 12.562 12.563v9.136c0 1.205.938 2.194 2.121 2.278.107-.719.163-1.454.163-2.202v-9.212c0-8.187-6.66-14.847-14.846-14.847z\'/%3E%3Cpath d=\'M15.37 10.022a5.717 5.717 0 0 0-5.71 5.71c0 5.039-4.098 9.137-9.136 9.137v.076c0 .75.056 1.486.164 2.206a11.343 11.343 0 0 0 7.913-3.34 11.347 11.347 0 0 0 3.343-8.078 3.43 3.43 0 0 1 3.427-3.426 3.43 3.43 0 0 1 3.426 3.426c0 9.083-6.662 16.638-15.357 18.039.53.713 1.12 1.377 1.766 1.985a20.41 20.41 0 0 0 9.857-5.485 20.425 20.425 0 0 0 6.018-14.54 5.717 5.717 0 0 0-5.71-5.71zM17.295 37.792l-.207-.21a27.22 27.22 0 0 1-3.26 2.13 14.952 14.952 0 0 0 5.216-.38 18.558 18.558 0 0 1-1.75-1.54z\'/%3E%3Cpath d=\'M15.37 14.59c-.63 0-1.141.512-1.141 1.143 0 7.325-5.778 13.327-13.015 13.687.243.77.548 1.513.909 2.223a15.866 15.866 0 0 0 9.71-4.602 15.886 15.886 0 0 0 4.68-11.308c0-.631-.512-1.142-1.142-1.142z\'/%3E%3C/g%3E%3C/svg%3E\")}";
    };
    CSSService.prototype.getToastCSS = function () {
        return this.getInlineFontCSS() + ".toast{width:100%;position:absolute;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;bottom:0;left:0;opacity:0;visibility:hidden;transition:.3s ease opacity,.3s ease visibility;font-size:14px;font-family:\"Open Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Ubuntu,\"Helvetica Neue\",Arial,sans-serif;font-weight:400}.toast--active{opacity:1;visibility:visible}.toast__in{padding:15px 30px;max-width:190px;color:#fff;border-radius:5px;text-align:center;white-space:nowrap;background-color:rgba(0,0,0,.7)}";
    };
    CSSService.fontsDir = './assets/fonts/';
    CSSService.reDataURI = /^data\:/;
    return CSSService;
}());

var i18nService = new I18nService(getMessage);
var settingsDao = new UserscriptSettingsDao();
var cssService = new CSSService(GM_getResourceURL);
var csApiFacade = new UserscriptContentScriptApiFacade(settingsDao, undefined, getMessage);
adguard.i18nService = i18nService;
function popupBlocker(window,PARENT_FRAME_KEY,CONTENT_SCRIPT_KEY){(function () {


}());
(function () {
var getTime = 'now' in performance ? function () {
    return performance.timing.navigationStart + performance.now();
} : Date.now;

/**
 * @fileoverview Logging functions to be used in dev channel. Function bodies are enclosed with preprocess
 * directives in order to ensure that these are stripped out by minifier in beta and release channels.
 */
var prefix = '';
var win = window;
while (win.parent !== win) {
    win = win.parent;
    prefix += '-- ';
}
var loc = location.href;
var suffix = "    (at " + loc + ")";
var depth = 0;
function call(msg) {
    depth++;
    console.group(prefix + msg + suffix);
}
function callEnd() {
    depth--;
    console.groupEnd();
}
function closeAllGroup() {
    while (depth > 0) {
        console.groupEnd();
        depth--;
    }
}
function print(str, obj) {
    var date = getTime().toFixed(3);
    var indent = 10 - date.length;
    if (indent < 0) {
        indent = 0;
    }
    var indentstr = '';
    while (indent-- > 0) {
        indentstr += ' ';
    }
    console.log(prefix + ("[" + indentstr + date + "]: " + str + suffix));
    if (obj !== undefined) {
        console.log(prefix + '=============================');
        try {
            console.log(obj);
            /**
             * Acconding to testing, Edge 41.16299 throws some errors
             * while printing some `Proxy` objects in console, such as
             * new Proxy(window, { get: Reflect.get }).
             * Strangely, just having a try-catch block enclosing it prevents errors.
             */
        }
        catch (e) {
            console.log('Object not printed due to an error');
        }
        console.log(prefix + '=============================');
    }
}
/**
 * Accepts a function, and returns a wrapped function that calls `call` and `callEnd`
 * automatically before and after invoking the function, respectively.
 * @param fn A function to wrap
 * @param message
 * @param cond optional argument, the function argument will be passed to `cond` function, and
 * its return value will determine whether to call `call` and `callEnd`.
 */
function connect(fn, message, cond) {
    return function () {
        var shouldLog = cond ? cond.apply(null, arguments) : true;
        if (shouldLog) {
            call(message);
        }
        var ret = fn.apply(this, arguments);
        if (shouldLog) {
            callEnd();
        }
        return ret;
    };
}

var createOpen = function (index, events) {
    print('index:', index);
    var evt = events[index][0];
    if (evt.$type == 0 /* CREATE */ && getTime() - evt.$timeStamp < 200) {
        print("time difference is less than a threshold");
        /**
         * A test here is meant to block attempts to call window.open from iframes which
         * was created later than 200 milliseconds ago. Such techniques are mostly used
         * by popup/popunder scripts on Firefox.
         *
         * In an issue https://github.com/AdguardTeam/PopupBlocker/issues/63, a pop-up
         * window of Google Hangout is created with chrome-extension://... url, and it
         * contains an iframe having domain hangouts.google.com, and inside it it immediately
         * calls window.open with empty url in order to obtain reference to certain browsing
         * context.
         *
         * A delicate issue revealed by https://github.com/AdguardTeam/PopupBlocker/issues/98
         * is that such a meant-to-be empty iframe can have non-empty `location` object.
         * This is caused by `document.open`, which is in effect identical to performing another
         * navigation, i.e. replacing associated `document` object, setting location from
         * initiating origin, etc. I refer to
         * {@link https://bugs.chromium.org/p/chromium/issues/detail?id=742049} for more info.
         *
         * Therefore, we take advantage of `performance.timing` api to determine whether the
         * empty iframe has an associated HTTP request.
         */
        var browsingContext = evt.$data;
        print("testing context is: ", browsingContext);
        var isSameOriginChildContext = browsingContext.frameElement !== null;
        if (isSameOriginChildContext) {
            var timing = browsingContext.performance.timing;
            var fetchStart = timing.fetchStart, responseEnd = timing.responseEnd;
            if (fetchStart === 0 || fetchStart === responseEnd) {
                return false;
            }
        }
    }
    return true;
};
var createOpen$1 = connect(createOpen, 'Performing create test');

/**
 * This serves as a whitelist on various checks where we block re-triggering of events.
 * See dom/dispatchEvent.ts.
 */


/**
 * Detects about:blank, about:srcdoc urls.
 */
var ABOUT_PROTOCOL = 'about:';
var reEmptyUrl = new RegExp('^' + ABOUT_PROTOCOL);
var isEmptyUrl = function (url) {
    return reEmptyUrl.test(url);
};

/**
 * There are certain browser quirks regarding how they treat non-string values
 * provided as arguments of `window.open`, and we can't rely on third-party scripts
 * playing nicely with it.
 * undefined --> 'about:blank'
 * null --> 'about:blank', except for Firefox, in which it is converted to 'null'.
 * false --> 'about:blank', except for Edge, in which it is converted to 'false'.
 * These behaviors are different from how anchor tag's href attributes behaves with non-string values.
 */
var convertToString = function (href) {
    if (typeof href !== 'string') {
        if (href instanceof Object) {
            href = String(href);
        }
        else {
            href = '';
        }
    }
    return href;
};
/**
 * Creates an object that implements properties of Location api.
 */

var aboutBlank = function (index, events) {
    // if there is a blocked popup within 100 ms, do not allow opening popup with url about:blank.
    // It is a common technique used by popunder scripts on FF to regain focus of the current window.
    var latestOpenEvent = events[index][events[index].length - 1];
    var now = latestOpenEvent.$timeStamp;
    if (latestOpenEvent.$type === 1 /* APPLY */ && latestOpenEvent.$name === 'open' && isEmptyUrl(convertToString(latestOpenEvent.$data.arguments[0]))) {
        print('The latest event is open(\'about:blank\')');
        var l = events.length;
        while (l-- > 0) {
            var frameEvents = events[l];
            var k = frameEvents.length;
            while (k-- > 0) {
                var event_1 = frameEvents[k];
                if (now - event_1.$timeStamp > 200) {
                    break;
                }
                if (event_1.$name === 'open' && event_1.$type === 1 /* APPLY */) {
                    if (event_1.$data.context['mocked']) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
};
var aboutBlank$1 = connect(aboutBlank, 'Performing aboutBlank test');

/**
 * @fileoverview Global namespace to be used throughout the page script.
 */
var adguard = {};

/**
 * @fileoverview There are some unfortunate cases where throwing inside a script is necessary
 * for seamless user experience. When a popunder script tries to replicate a window to a popup
 * and navigate the window to some ads landing page, it usually uses methods of `location` object
 * and we cannot add a layer of check on those methods (they are all non-configurable).
 * See https://github.com/AdguardTeam/PopupBlocker/issues/14, nothing prevent from popunder scripts
 * using it at any time. Currently, the only reliable way is to abort script execution on an attempt
 * to open a popup window which must happen before calling `location` methods.
 * To do so, during popup detection, we additionaly checks if the target of the popup is identical
 * to the current window or `href` attribute of a clicked anchor, and triggers aborting in such cases.
 */
var MAGIC;
function abort() {
    closeAllGroup();
    MAGIC = Math.random().toString(36).substr(7);
    console.warn(adguard.contentScriptApiFacade.$getMessage('aborted_popunder_execution'));
    throw MAGIC;
}

/**
 * @fileoverview Utility functions for instanceof checks against DOM classes. Used for type casting.
 * Since it is common for us to cross the border of browsing contexts, instanceof
 * check for DOM element is not reliable.
 */



/**/




/**/
var toString = Object.prototype.toString;
var isWindow = function (el) {
    return toString.call(el) === '[object Window]';
};
var isLocation = function (el) {
    return toString.call(el) === '[object Location]';
};
/**/

/**/

var navigatePopupToItself = function (index, events, incoming) {
    var $type = incoming.$type;
    var $name = incoming.$name;
    if ((($name === 'assign' || $name === 'replace') && $type === 1 /* APPLY */) ||
        (($name === 'location' || $name === 'href') && $type === 3 /* SET */)) {
        var currentHref = location.href; // ToDo: Consider making this work on empty iframes
        var newLocation = String(incoming.$data.arguments[0]);
        if (newLocation === currentHref) {
            // Performs a check that it is a modification of a mocked object.
            // Non-determinism here is inevitable, due to our decoupled approach in timeline implementation.
            // This may be improved in future.
            if ((incoming.$name === 'location' && !isWindow(incoming.$data.this)) ||
                !isLocation(incoming.$data.this)) {
                print('navigatePopupToItself - found a suspicious attempt');
                abort();
            }
        }
    }
    return true;
};

var TimelineEvent = /** @class */ (function () {
    function TimelineEvent($type, $name, $data) {
        this.$type = $type;
        this.$name = $name;
        this.$data = $data;
        this.$timeStamp = getTime();
    }
    return TimelineEvent;
}());

var beforeTest = [createOpen$1, aboutBlank$1];
var afterTest = [navigatePopupToItself];
var EVENT_RETENTION_LENGTH = 5000;
var Timeline = /** @class */ (function () {
    function Timeline() {
        this.events = [[]];
        this.isRecording = false;
        // Registers a unique event when it is first created.
        this.registerEvent(new TimelineEvent(0 /* CREATE */, undefined, window), 0);
    }
    /**
     * When an event is registered, it performs some checks by calling functions of type `condition`
     * which accepts an existing events as a first argument, and an incoming event as a second argument.
     * An object at which the event is happened is included in the event as a `data` property,
     * and such functions can act on it appropriately, for example, it can close a popup window.
     */
    Timeline.prototype.registerEvent = function (event, index) {
        var i = afterTest.length;
        while (i--) {
            afterTest[i](index, this.events, event);
        }
        var frameEvents = this.events[index];
        frameEvents.push(event);
        if (!this.isRecording) {
            setTimeout(function () {
                frameEvents.splice(frameEvents.indexOf(event), 1);
            }, EVENT_RETENTION_LENGTH);
        }
        else {
            var name_1 = event.$name ? event.$name.toString() : '';
            print("Timeline.registerEvent: " + event.$type + " " + name_1, event.$data);
        }
    };
    /**
     * Wrapped window.open calls this. If it returns false, it does not call window.open.
     * beforeTests are basically the same as the afterTests except that
     * it does not accept a second argument.
     */
    Timeline.prototype.canOpenPopup = function (index) {
        call('Inquiring events timeline about whether window.open can be called...');
        var i = beforeTest.length;
        while (i--) {
            if (!beforeTest[i](index, this.events)) {
                print('false');
                callEnd();
                return false;
            }
        }
        print('true');
        callEnd();
        return true;
    };
    Timeline.prototype.onNewFrame = function (window) {
        var pos = this.events.push([]) - 1;
        // Registers a unique event when a frame is first created.
        // It passes the `window` object of the frame as a value of `$data` property.
        this.registerEvent(new TimelineEvent(0 /* CREATE */, undefined, window), pos);
        return pos;
    };
    /**
     * Below methods are used only for logging & testing purposes.
     * It does not provide any functionality to block popups,
     * and is stipped out in production builds.
     * In dev build, the timeline instance is exposed to the global scope with a name '__t',
     * and one can call below methods of it to inspect how the popup script calls browser apis.
     * In test builds, it is used to access a private member `events`.
     */
    Timeline.prototype.startRecording = function () {
        this.isRecording = true;
    };
    /**
     * Returns an array. Its elements corresponds to frames to which the current window
     * has access, and the first element corresponds to the current window.
     */
    Timeline.prototype.takeRecords = function () {
        this.isRecording = false;
        var res = this.events.map(function (el) { return (Array.prototype.slice.call(el)); });
        var now = getTime();
        var l = this.events.length;
        while (l-- > 0) {
            var frameEvents = this.events[l];
            while (frameEvents[0]) {
                if (now - frameEvents[0].$timeStamp > EVENT_RETENTION_LENGTH) {
                    frameEvents.shift();
                }
                else {
                    break;
                }
            }
        }
        return res;
    };
    return Timeline;
}());
var timeline = typeof PARENT_FRAME_KEY === 'string' ? window.parent[PARENT_FRAME_KEY][2] : new Timeline();
var position = typeof PARENT_FRAME_KEY === 'string' ? timeline.onNewFrame(window) : 0;
// These are called from the outside of the code, so we have to make sure that call structures of those are not modified.
// It is removed in minified builds, see the gulpfile.
/** @suppress {uselessCode} */
function cc_export() {
    "REMOVE_START";
    window['registerEvent'] = timeline.registerEvent;
    window['canOpenPopup'] = timeline.canOpenPopup;
    window['onNewFrame'] = timeline.onNewFrame;
    "REMOVE_END";
}
cc_export();
window['__t'] = timeline;

/**
 * A polyfill for the WeakMap that covers only the most basic usage.
 * Originally based on {@link https://github.com/Polymer/WeakMap}
 */
var counter = Date.now() % 1e9;
var defineProperty = Object.defineProperty;
var WeakMapPolyfill = /** @class */ (function () {
    function WeakMapPolyfill() {
        this.$name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
    }
    WeakMapPolyfill.prototype.set = function (key, value) {
        var entry = key[this.$name];
        if (entry && entry[0] === key)
            entry[1] = value;
        else
            defineProperty(key, this.$name, { value: [key, value], writable: true });
        return this;
    };
    WeakMapPolyfill.prototype.get = function (key) {
        var entry;
        return (entry = key[this.$name]) && entry[0] === key ?
            entry[1] : undefined;
    };
    WeakMapPolyfill.prototype.delete = function (key) {
        var entry = key[this.$name];
        if (!entry)
            return false;
        var hasValue = entry[0] === key;
        entry[0] = entry[1] = undefined;
        return hasValue;
    };
    WeakMapPolyfill.prototype.has = function (key) {
        var entry = key[this.$name];
        if (!entry)
            return false;
        return entry[0] === key;
    };
    return WeakMapPolyfill;
}());
var nativeWeakMapSupport = typeof WeakMap === 'function';
/**
 * Firefox has a buggy WeakMap implementation as of 58. It won't accept
 * certain objects which are relatively recently added to the engine.
 * {@link https://bugzilla.mozilla.org/show_bug.cgi?id=1391116}
 * {@link https://bugzilla.mozilla.org/show_bug.cgi?id=1351501}
 * A similar error prevents using `AudioBuffer` as a key.
 */
var buggyWeakMapSupport = !nativeWeakMapSupport ? false : (function () {
    if (typeof DOMPoint !== 'function') {
        return false;
    }
    var key = new DOMPoint();
    var weakmap = new WeakMap();
    try {
        weakmap.set(key, undefined); // Firefox 58 throws here.
        return false;
    }
    catch (e) {
        print('Buggy WeakMap support');
        return true;
    }
})();
// To be used in AudioBufferCache

var wm$1 = nativeWeakMapSupport ? WeakMap : WeakMapPolyfill;

var mockedWindowCollection = new wm$1();

var supported = false;
supported = typeof Proxy !== 'undefined';
/**
 * Why not use Proxy on production version?
 * Using proxy instead of an original object in some places require overriding Function#bind,apply,call,
 * and replacing such native codes into js implies serious performance effects on codes completely unrelated to popups.
 */
var _bind = Function.prototype.bind;
var _apply = Function.prototype.apply;
var _call = Function.prototype.call;
var _toStringFn = Function.prototype.toString;
var _exec = RegExp.prototype.exec; // Issue 102: Keep native RegExp methods.
// RegExp.prototype.test, even though being a native function,
// may call third-party code outside our membrane.
// Instead, we need to use `exec` whenever possible.
var _reflect;
if (supported) {
    _reflect = Reflect.apply;
}
// Lodash isNative
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsNative = new RegExp('^' + _toStringFn.call(Object.prototype.hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * Certain built-in functions depends on internal slots of 'this' of its execution context.
 * In order to make such methods of proxied objects behave identical to the original object,
 * we need to bind the original 'this' for the proxy's [[Get]] handler.
 * However, non-native functions does not have access to object's internal slots,
 * so we can safely bind the proxied objects for such non-native methods.
 * If isNativeFn test is passed, the object is either a native function,
 * or a non-native function whose function body consists of '[native code]',
 * which obviously does not have access to the internal slot of 'this'.
 */
var isNativeFn = function (fn) {
    if (typeof fn !== 'function') {
        return false;
    }
    if (fn === _bind || fn === _call || fn === _apply || fn === _toStringFn || fn === _exec) {
        // This is our assumption. If, for example, another browser extension modifies them before us,
        // It is their responsibility to do so transparently.
        return true;
    }
    var tostr;
    try {
        tostr = _reflect(_toStringFn, fn, []);
    }
    catch (e) {
        // The above block throws if `fn` is a Proxy constructed over a function, from a third-party code.
        // Such a proxy is still callable, so Function.prototype.(bind,apply,call) may be invoked on it.
        // It is a common practice to bind the correct `this` to methods, so we try in that way.
        try {
            tostr = fn.toString();
        }
        catch (e) {
            // In this case, we bail out, hoping for a third-party code does not mess with internal slots.
            return false;
        }
    }
    return _reflect(_exec, reIsNative, [tostr]) !== null;
};
// See HTMLIFrame.ts
var proxyToReal = typeof PARENT_FRAME_KEY === 'string' ? window.parent[PARENT_FRAME_KEY][0] : new wm$1();
var realToProxy = typeof PARENT_FRAME_KEY === 'string' ? window.parent[PARENT_FRAME_KEY][1] : new wm$1();


/**
 * An apply handler to be used to proxy Function#(bind, apply, call) methods.
 * Example: (Event.prototype.addEventListener).call(window, 'click', function() { });
 * target: Function.prototype.call
 * _this: Event.prototype.addEventListener
 * _arguments: [window, 'click', function() { }]
 * We unproxies 'window' in the above case.
 *
 * @param target Must be one of Function#(bind, apply, call).
 * @param _this A function which called (bind, apply, call).
 * @param _arguments
 */
var applyWithUnproxiedThis = function (target, _this, _arguments) {
    // Convert _arguments[0] to its unproxied version
    // When it is kind of object which may depend on its internal slot
    var _caller = proxyToReal.get(_this) || _this;
    if (isNativeFn(_caller) && _caller !== _bind && _caller !== _apply && _caller !== _call) {
        // Function#(bind, apply, call) does not depend on the target's internal slots,
        // In (Function.prototype.call).apply(Function.prototype.toString, open)
        // we should not convert Function.prototype.toString to the original function.
        var thisOfReceiver = _arguments[0];
        var unproxied = proxyToReal.get(thisOfReceiver);
        if (unproxied) {
            _arguments[0] = unproxied;
        }
    }
    return _reflect(target, _this, _arguments);
};
/**
 * An apply handler to make Reflect.apply handler
 * Reflect.apply(EventTarget.prototype.addEventListener, proxideWindow, ['click', function(){}])
 */
var reflectWithUnproxiedThis = function (target, _this, _arguments) {
    var appliedFn = _arguments[0];
    appliedFn = proxyToReal.get(appliedFn) || appliedFn;
    if (isNativeFn(appliedFn) && appliedFn !== _bind && appliedFn !== _apply && appliedFn !== _call) {
        var thisOfAppliedFn = _arguments[1];
        var unproxied = proxyToReal.get(thisOfAppliedFn);
        if (unproxied) {
            _arguments[1] = unproxied;
        }
    }
    return _reflect(target, _this, _arguments);
};
/**
 * An apply handler to make invoke handler.
 */
var invokeWithUnproxiedThis = function (target, _this, _arguments) {
    var unproxied = proxyToReal.get(_this);
    if (typeof unproxied == 'undefined') {
        unproxied = _this;
    }
    return supported ? _reflect(target, unproxied, _arguments) : target.apply(unproxied, _arguments);
};
/**
 * An apply handler to be used for MessageEvent.prototype.source.
 */
var proxifyReturn = function (target, _this, _arguments) {
    var ret = _reflect(target, _this, _arguments);
    var proxy = realToProxy.get(ret);
    if (proxy) {
        ret = proxy;
    }
    return ret;
};

var defaultApplyHandler = supported ? _reflect : function (_target, _this, _arguments) { return (_target.apply(_this, _arguments)); };

function makeFunctionWrapper(orig, applyHandler) {
    var wrapped;
    var proxy = realToProxy.get(orig);
    if (proxy) {
        return proxy;
    }
    if (supported) {
        wrapped = new Proxy(orig, { apply: applyHandler });
    }
    else {
        wrapped = function () { return applyHandler(orig, this, arguments); };
        copyProperty(orig, wrapped, 'name');
        copyProperty(orig, wrapped, 'length');
    }
    proxyToReal.set(wrapped, orig);
    realToProxy.set(orig, wrapped);
    return wrapped;
}
function copyProperty(orig, wrapped, prop) {
    var desc = Object.getOwnPropertyDescriptor(orig, prop);
    if (desc && desc.configurable) {
        desc.value = orig[prop];
        Object.defineProperty(wrapped, prop, desc);
    }
}
/**
 * @param option Can be a boolean 'false' to disable logging, or can be a function which accepts the same type
 * of params as ApplyHandler and returns booleans which indicates whether to log it or not.
 */
function makeLoggedFunctionWrapper(orig, type, name, applyHandler, option) {
    applyHandler = applyHandler || defaultApplyHandler;
    if (option === false) {
        return makeFunctionWrapper(orig, applyHandler);
    }
    return makeFunctionWrapper(orig, function (target, _this, _arguments) {
        var context = {};
        if (typeof option == 'undefined' || option(target, _this, _arguments)) {
            var data = {
                this: _this,
                arguments: _arguments,
                context: context
            };
            timeline.registerEvent(new TimelineEvent(type, name, data), position);
        }
        return applyHandler(target, _this, _arguments, context);
    });
}
function wrapMethod(obj, prop, applyHandler, option) {
    if (obj.hasOwnProperty(prop)) {
        obj[prop] = makeLoggedFunctionWrapper(obj[prop], 1 /* APPLY */, prop, applyHandler, option);
    }
}
function wrapAccessor(obj, prop, getterApplyHandler, setterApplyHandler, option) {
    var desc = Object.getOwnPropertyDescriptor(obj, prop);
    if (desc && desc.get && desc.configurable) {
        var getter = makeLoggedFunctionWrapper(desc.get, 2 /* GET */, prop, getterApplyHandler, option);
        var setter;
        if (desc.set) {
            setter = makeLoggedFunctionWrapper(desc.set, 3 /* SET */, prop, setterApplyHandler, option);
        }
        Object.defineProperty(obj, prop, {
            get: getter,
            set: setter,
            configurable: true,
            enumerable: desc.enumerable
        });
    }
}
if (supported) {
    wrapMethod(Function.prototype, 'bind', applyWithUnproxiedThis, false);
    wrapMethod(Function.prototype, 'apply', applyWithUnproxiedThis, false);
    wrapMethod(Function.prototype, 'call', applyWithUnproxiedThis, false);
    wrapMethod(Reflect, 'apply', reflectWithUnproxiedThis, false);
    wrapAccessor(MessageEvent.prototype, 'source', proxifyReturn, undefined, false);
}
wrapMethod(Function.prototype, 'toString', invokeWithUnproxiedThis, false);
wrapMethod(Function.prototype, 'toSource', invokeWithUnproxiedThis, false);

/*
import adguard from '../../page_script_namespace';

if (typeof CONTENT_SCRIPT_KEY !== 'undefined') {
    adguard.contentScriptApiFacade = window[CONTENT_SCRIPT_KEY];
    delete window[CONTENT_SCRIPT_KEY];
} else {
    adguard.contentScriptApiFacade = window.parent[PARENT_FRAME_KEY][3];
}

import '../../messaging';
*/

// import '../../dom/open';
// import '../../dom/click';
// import '../../dom/dispatchEvent';
// import '../../dom/HTMLIFrame';
// import '../../dom/HTMLObject';
// import '../../dom/removeChild';
// import '../../dom/unload';
// import '../../dom/write';
// import '../../dom/preventDefault';
// import '../../observers/overlay_link_observer';

}());
};
var BRIDGE_KEY = csApiFacade.expose();
/**
 * In Firefox, userscripts can't write properties of unsafeWindow, so we
 * create a <script> tag to run the script in the page's context.
 */
{
    var win = typeof unsafeWindow !== 'undefined' ? unsafeWindow.window : window;
    popupBlocker(win, undefined, BRIDGE_KEY);
}
/**
 * Expose GM_api on options page.
 */
function isOptionsPage() {
    return location.href === 'https://adguardteam.github.io/PopupBlocker/options.html';
}
if (isOptionsPage()) {
    unsafeWindow["GM_getValue"] = exportFunction(GM_getValue, unsafeWindow);
    unsafeWindow["GM_setValue"] = exportFunction(GM_setValue, unsafeWindow);
    unsafeWindow["GM_listValues"] = exportFunction(GM_listValues, unsafeWindow);
}

}());


})(window, function(){}, function(){}, function(){return [];}, function(){}, function(){});