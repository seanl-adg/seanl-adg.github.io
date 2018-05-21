(function() {

    (function () {
        try {
            var g = null, aa = false, ba = false, ca = false, k = false, n = false, p = null, q = "d9f6b24e08774ca2a6b7e21ecd02fa2c", t = q.substring(16) + q.substring(0, 16) || "adgStRunId";
            var u = Object.defineProperty, w = Object.getOwnPropertyDescriptor, x = Object.getPrototypeOf, y = Object.create, z = Object.getOwnPropertyNames, A = window.MutationObserver || window.WebKitMutationObserver, B = Error.captureStackTrace;
            function C() {
            }
            ;
            if ("function" == typeof WeakMap)
                var D = WeakMap;
            else {
                var da = 0, E = function () {
                    this.a = (da += Math.random()).toString();
                };
                E.prototype.set = function (a, b) {
                    var c = a[this.a];
                    c && c[0] === a ? c[1] = b : u(a, this.a, { value: [a, b], writable: !0 });
                    return this;
                };
                E.prototype.get = function (a) {
                    var b;
                    return (b = a[this.a]) && b[0] === a ? b[1] : void 0;
                };
                E.prototype.delete = function (a) {
                    var b = a[this.a];
                    if (!b)
                        return !1;
                    a = b[0] === a;
                    b[0] = b[1] = void 0;
                    return a;
                };
                E.prototype.has = function (a) {
                    var b = a[this.a];
                    return b ? b[0] === a : !1;
                };
                D = E;
            }
            ;
            for (var F = window; F.parent !== F;)
                F = F.parent;
            function G(a) {
                this.s = a;
            }
            function H(a, b, c) {
                this.b = a;
                this.f = b;
                this.g = c;
                this.a = !1;
                this.c = this.c.bind(this);
            }
            H.prototype.c = function (a, b) {
                b = void 0 === b ? this.f : b;
                if (this.a)
                    throw 1;
                this.a = !0;
                try {
                    return this.b.call(b, a);
                }
                catch (c) {
                    throw B && B(c, this.g), new G(c);
                }
            };
            function ea() {
                var a = this;
                this.b = new D;
                this.a = function (b, c) {
                    var d = b.f, e = a.b.get(d);
                    "undefined" == typeof e && (e = d);
                    return b.c(c, e);
                };
            }
            function fa(a, b, c) {
                var d = w(a, c);
                d && d.configurable && (d.value = a[c], u(b, c, d));
            }
            function I(a, b, c) {
                function d() {
                    var a = new H(b, this, d);
                    try {
                        return c(a, arguments);
                    }
                    catch (h) {
                        if (!a.a)
                            try {
                                return a.c(arguments);
                            }
                            catch (m) {
                                h = m;
                            }
                        if (h instanceof G)
                            throw h.s;
                    }
                }
                J(a, b, d);
                return d;
            }
            function J(a, b, c) {
                fa(b, c, "name");
                fa(b, c, "length");
                a.b.set(c, b);
            }
            function K(a, b, c, d) {
                b.hasOwnProperty(c) && (b[c] = I(a, b[c], d));
            }
            function L(a, b, c, d) {
                var e = w(b, c);
                if (e && e.get && e.configurable) {
                    d = I(a, e.get, d);
                    var h;
                    e.set && (h = I(a, e.set, void 0));
                    u(b, c, { get: d, set: h, configurable: !0, enumerable: e.enumerable });
                }
            }
            ;
            var ha = Object.prototype.toString;
            function M(a) {
                return "[object Navigator]" === ha.call(a);
            }
            ;
            var ia = "function" === typeof URL ? function (a) {
                return new URL(a);
            } : function (a) {
                var b = document.createElement("a");
                b.href = a;
                "" == b.host && (b.href = b.href);
                return b;
            };
            function N(a) {
                var b = ja;
                this.l = a;
                this.j = t;
                this.h = [];
                this.g = this.g.bind(this);
                this.b = this.b.bind(this);
                var c = a.HTMLIFrameElement.prototype;
                this.o = w(c, "contentWindow").get;
                this.m = w(c, "contentDocument").get;
                this.a = new D;
                L(b, c, "contentWindow", this.b);
                L(b, c, "contentDocument", this.b);
                ka(this, a);
            }
            function ka(a, b) {
                A && (a.i || (a.i = new A(function (b) {
                    for (var c = 0, e = b.length; c < e; c++)
                        for (var h = b[c].addedNodes, m = 0, f = h.length; m < f; m++) {
                            var l = h[m];
                            if ("IFRAME" === l.nodeName)
                                O(a, l);
                            else if ("id" in l) {
                                l = l.getElementsByTagName("IFRAME");
                                for (var v = 0, r = l.length; v < r; v++)
                                    O(a, l[v]);
                            }
                        }
                })), a.i.observe(b.document.documentElement, { childList: !0, subtree: !0 }));
            }
            function O(a, b) {
                if ("undefined" === typeof a.a.get(b)) {
                    b.addEventListener("load", a.g);
                    try {
                        var c = a.o.call(b);
                        if ("about:" === c.location.protocol) {
                            a.a.set(b, c.document);
                            la(a, c);
                            var d = b.src, e;
                            if (e = d && a.j) {
                                var h = a.l.location, m = a.l.document.domain, f = ia(d);
                                e = "javascript:" === f.protocol || "about:blank" === f.href ? !0 : "data:" === f.protocol ? !1 : f.hostname === m && f.port === h.port && f.protocol === h.protocol;
                            }
                            e && u(c, a.j, { value: void 0, configurable: !0 });
                        }
                    }
                    catch (l) {
                        a.a.set(b, null);
                    }
                }
            }
            N.prototype.b = function (a, b) {
                O(this, a.f);
                return a.c(b);
            };
            function la(a, b) {
                a = a.h;
                for (var c = 0, d = a.length; c < d; c++)
                    a[c](b);
            }
            N.prototype.g = function (a) {
                a = a.target;
                try {
                    var b = this.m.call(a);
                    "about:" === b.location.protocol && this.a.get(a) !== b && (this.a.set(a, b), la(this, b.defaultView));
                }
                catch (c) {
                    this.a.set(a, null);
                }
            };
            function ma(a, b) {
                return M(a.f) ? g : a.c(b);
            }
            var na = g ? function (a) {
                var b = a.Navigator.prototype;
                L(P, a.Navigator.prototype, "userAgent", ma);
                a = a.navigator;
                (b = w(b, "userAgent")) && b.get && !b.configurable && (u(a, "userAgent", b), L(P, a, "userAgent", ma));
            } : C;
            var oa = /^RTC/, pa = aa ? function (a) {
                z(a).filter(function (a) {
                    return oa.test(a);
                }).forEach(function (b) {
                    var c = a[b];
                    "function" === typeof c && -1 !== c.toString().indexOf("[native code]") && delete a[b];
                });
                delete a.webkitRTCPeerConnection;
                delete a.mozRTCPeerConnection;
                var b = a.Navigator.prototype;
                delete b.getUserMedia;
                delete b.webkitGetUserMedia;
                delete b.mozGetUserMedia;
            } : C;
            var qa = w(Document.prototype, "referrer").get;
            function ra(a, b) {
                a: {
                    try {
                        qa.call(a.f);
                    }
                    catch (d) {
                        if ("TypeError" === d.name) {
                            var c = !1;
                            break a;
                        }
                    }
                    c = !0;
                }
                return c ? p : a.c(b);
            }
            var sa = p ? function (a) {
                var b = a.Document.prototype;
                L(P, b, "referrer", ra);
                (b = w(b, "referrer")) && b.get && !b.configurable && (a = a.HTMLDocument) && (a = a.prototype, u(a, "referrer", b), L(P, a, "referrer", ra));
            } : C;
            function ta(a) {
                var b = this;
                this.a = a;
                this.b = this.a.Promise;
                this.i = this.a.DOMException;
                this.g = function (a, d) {
                    var c = d[0];
                    a = b.b.resolve("denied");
                    "function" === typeof c && a.then(function (a) {
                        c(a);
                    });
                    return a;
                };
                this.j = function () {
                    return "denied";
                };
                this.h = function (a, d) {
                    return "[object PushManager]" === ha.call(a.f) ? b.b.reject(new b.i("", "NotAllowedError")) : a.c(d);
                };
            }
            var ua = ba ? function (a) {
                a = new ta(a);
                var b = a.a;
                b.Notification && (K(P, b.Notification, "requestPermission", a.g), L(P, b.Notification, "permission", a.j));
                b.PushManager && K(P, b.PushManager.prototype, "subscribe", a.h);
            } : C;
            var Q = new D;
            function va(a, b) {
                return Q.has(a.f) ? 1 : a.c(b);
            }
            function wa(a, b) {
                return Q.has(a.f) ? "User denied geolocation" : a.c(b);
            }
            function xa(a) {
                function b() {
                    try {
                        a.call(this, arguments);
                    }
                    catch (c) {
                        throw "TypeError" === c.name && (c.message = c.message.replace("MediaError", "PositionError"), B && B(c, b)), c;
                    }
                }
                J(P, a, b);
                return b;
            }
            function ya(a) {
                var b = this;
                this.a = a;
                this.g = function (a, d) {
                    if (!za(b, a.f))
                        return a.c(d);
                    a = d[1];
                    "function" === typeof a && setTimeout(a, 0, Aa(b));
                };
                this.j = 0;
                this.h = function (a, d) {
                    if (!za(b, a.f))
                        return a.c(d);
                    a = d[1];
                    "function" === typeof a && setTimeout(a, 0, Aa(b));
                    return b.j++;
                };
            }
            function Aa(a) {
                a = y(a.i);
                Q.set(a, void 0);
                return a;
            }
            function za(a, b) {
                try {
                    a.b.call(b, 0);
                }
                catch (c) {
                    if ("TypeError" === c.name)
                        return !1;
                }
                return !0;
            }
            var Ba = ca ? function (a) {
                a = new ya(a);
                var b = a.a.navigator.geolocation;
                if (b) {
                    a.b = b.clearWatch;
                    var c = a.a;
                    if (c.PositionError)
                        var d = c.PositionError.prototype;
                    else if (d = { PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 }, c = c.MediaError) {
                        var e = c.prototype;
                        c = w(e, "code");
                        e = w(e, "message");
                        c.get = xa(c.get);
                        e.get = xa(e.get);
                        u(d, "code", c);
                        u(d, "message", e);
                    }
                    L(P, d, "code", va);
                    L(P, d, "message", wa);
                    a.i = d;
                    b = x(b);
                    K(P, b, "getCurrentPosition", a.g);
                    K(P, b, "watchPosition", a.h);
                }
            } : C;
            var R = "function" === typeof Proxy;
            function S(a, b) {
                this.g = a;
                this.h = b;
                this.b = [];
                a = this.g;
                b = this.b;
                for (var c = this.a = y(x(a)), d = 0, e = a.length; d < e; d++) {
                    var h = a[d], m = this.h(h);
                    if (!(k && -1 !== m.indexOf("Shockwave Flash") || n && -1 !== m.indexOf("Java"))) {
                        var f = b.push(h) - 1;
                        u(c, f, { value: h, enumerable: !0, configurable: R });
                        u(c, m, { value: h, configurable: R });
                    }
                }
                this.i = b.length;
                R && (this.a = new Proxy(this.a, this));
            }
            S.prototype.isExtensible = function () {
                return !1;
            };
            S.prototype.preventExtensions = function () {
                return !1;
            };
            S.prototype.defineProperty = function (a, b, c) {
                if (T && U(b))
                    throw Ca(b);
                return Reflect.defineProperty(a, b, c);
            };
            S.prototype.set = function (a, b, c, d) {
                if (T && U(b))
                    throw Ca(b);
                return Reflect.set(a, b, c, d);
            };
            S.prototype.deleteProperty = function (a, b) {
                if (U(b)) {
                    if (Number(b) < this.b.length)
                        return !0;
                }
                else {
                    var c;
                    if (c = "string" === typeof b)
                        a: {
                            c = this.b;
                            for (var d = 0, e = c.length; d < e; d++)
                                if (this.h(c[d]) === b) {
                                    c = !0;
                                    break a;
                                }
                            c = !1;
                        }
                    return c ? !0 : Reflect.deleteProperty(a, b);
                }
            };
            S.prototype.ownKeys = function (a) {
                return Da ? Reflect.ownKeys(a) : this.b.map(function (a, c) {
                    return String(c);
                });
            };
            var Ea;
            function Ca(a) {
                a = Ea.replace("1073741824", a);
                return new TypeError(a);
            }
            var T = !1, Da = !0, V = navigator.plugins;
            try {
                u(V, 1073741824, { value: null, configurable: !0 });
            }
            catch (a) {
                "TypeError" === a.name && (T = !0, Ea = a.message);
            }
            finally {
                delete V[1073741824];
            }
            if (0 < V.length) {
                var Fa = V[0];
                -1 === z(V).indexOf(Fa.name) && (Da = !1);
            }
            function U(a) {
                if ("string" !== typeof a)
                    return !1;
                a = Number(a);
                return (a | 0) === a && 0 < 1 / a;
            }
            function Ga(a) {
                return a.name;
            }
            function Ha(a) {
                return a.enabledPlugin.name;
            }
            var W = new D;
            function Ia(a, b) {
                b = a.c(b);
                if (!M(a.f))
                    return b;
                a = W.get(b);
                a || (a = new S(b, Ga), W.set(b, a), W.set(a.a, a));
                return a.a;
            }
            function Ja(a, b) {
                b = a.c(b);
                if (!M(a.f))
                    return b;
                a = W.get(b);
                a || (a = new S(b, Ha), W.set(b, a), W.set(a.a, a));
                return a.a;
            }
            function Ka(a, b) {
                var c = W.get(a.f);
                if (!c)
                    return a.c(b);
                a = String(b[0]);
                return U(a) ? c.g[a] || null : null;
            }
            function La(a, b) {
                var c = W.get(a.f);
                if (!c)
                    return a.c(b);
                a = String(b[0]);
                return U(a) ? null : c.g[a] || null;
            }
            function X(a, b) {
                var c = W.get(a.f);
                return c ? c.i : a.c(b);
            }
            var Ma = k || n ? function (a) {
                var b = a.Navigator.prototype;
                L(P, b, "plugins", Ia);
                L(P, b, "mimeTypes", Ja);
                if (b = a.PluginArray)
                    b = b.prototype, K(P, b, "item", Ka), K(P, b, "namedItem", La), L(P, b, "length", X);
                (b = a.MSPluginsCollection) && L(P, b.prototype, "length", X);
                if (b = a.MimeTypeArray)
                    b = b.prototype, K(P, b, "item", Ka), K(P, b, "namedItem", La), L(P, b, "length", X);
                (a = a.MSMimeTypesCollection) && L(P, a.prototype, "length", X);
            } : C;
            var Na = k ? function (a) {
                var b = a.ActiveXObject, c = !1;
                try {
                    new b(" ");
                }
                catch (e) {
                    -2146827859 === e.number && (c = !0);
                }
                if (c) {
                    var d = function (a, c) {
                        if (this instanceof d) {
                            "string" === typeof a && 0 === a.indexOf("ShockwaveFlash.ShockwaveFlash") && (a = " ");
                            for (var e = [void 0], f = 0, h = arguments.length; f < h; f++)
                                e.push(arguments[f]);
                            return new (Function.prototype.bind.apply(b, e));
                        }
                        return b.apply(this, arguments);
                    };
                    d.prototype = b.prototype;
                    d.prototype.constructor = d;
                    J(P, b, d);
                    a.ActiveXObject = d;
                }
            } : C;
            var Y, Oa = { childList: !0, subtree: !0 };
            function Z(a) {
                for (var b = a.attributes, c = 0; c < b.length; c++)
                    try {
                        4 < b[c].value.length && b[c].value.indexOf(".swf") === b[c].value.length - 4 && a.setAttribute(b[c].name, " ");
                    }
                    catch (d) {
                    }
            }
            var Pa = k ? function (a) {
                if (!Y) {
                    if (!A)
                        return;
                    Y = new A(function (a) {
                        for (var b = 0, d = a.length; b < d; b++) {
                            var e = a[b].addedNodes;
                            if (e)
                                for (var h = 0, m = e.length; h < m; h++) {
                                    var f = e[h];
                                    if ("id" in f) {
                                        var l = f.nodeName;
                                        if ("EMBED" !== l && "OBJECT" !== l || !f.hasAttributes()) {
                                            l = f.getElementsByTagName("EMBED");
                                            f = f.getElementsByTagName("OBJECT");
                                            var v;
                                            var r = 0;
                                            for (v = l.length; r < v; r++)
                                                Z(l[r]);
                                            r = 0;
                                            for (v = f.length; r < v; r++)
                                                Z(f[r]);
                                        }
                                        else
                                            Z(f);
                                    }
                                }
                        }
                    });
                }
                Y.observe(a.document.documentElement, Oa);
            } : C;
            if (window.hasOwnProperty(t))
                delete window[t];
            else {
                var P, ja = P = new ea, Qa = function (a) {
                    var b = ja, c = a.Function.prototype;
                    K(b, c, "toString", b.a);
                    K(b, c, "toSource", b.a);
                    b = new N(a);
                    na(a);
                    pa(a);
                    sa(a);
                    ua(a);
                    Ba(a);
                    Ma(a);
                    Na(a);
                    Pa(a);
                    b.h.push(Qa);
                };
                Qa(window);
            }
            ;
        }
        catch (e) {
            console && console.error && console.error('AdGuard Stealth mode error: ' + e);
        }
    })();


})();