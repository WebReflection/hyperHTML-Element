var HyperHTMLElement = (function (exports) {
  'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  /*! (c) Andrea Giammarchi (ISC) */var hyperHTML = function (e) {
    function t() {
      return this;
    }function n(e) {
      this.childNodes = e, this.length = e.length, this.first = e[0], this.last = e[this.length - 1], this._ = null;
    }function r() {}function i(e) {
      var t = Ze.get(this);return t && t.template === pe(e) ? a.apply(t.updates, arguments) : o.apply(this, arguments), this;
    }function o(e) {
      e = pe(e);var t = Ve.get(e) || u.call(this, e),
          n = he(this.ownerDocument, t.fragment),
          r = Be.create(n, t.paths);Ze.set(this, { template: e, updates: r }), a.apply(r, arguments), this.textContent = "", this.appendChild(n);
    }function a() {
      for (var e = arguments.length, t = 1; t < e; t++) {
        this[t - 1](arguments[t]);
      }
    }function u(e) {
      var t = [],
          n = e.join(G).replace(Ge, Ie),
          r = fe(this, n);Be.find(r, t, e.slice());var i = { fragment: r, paths: t };return Ve.set(e, i), i;
    }function c(e) {
      return arguments.length < 2 ? null == e ? Ke("html") : "string" == typeof e ? c.wire(null, e) : "raw" in e ? Ke("html")(e) : "nodeType" in e ? c.bind(e) : Qe(e, "html") : ("raw" in e ? Ke("html") : c.wire).apply(null, arguments);
    } /*! (c) Andrea Giammarchi - ISC */
    var l = {};try {
      l.WeakMap = WeakMap;
    } catch (WeakMap) {
      l.WeakMap = function (e, t) {
        function n(t) {
          i(this, "_", { value: "_@ungap/weakmap" + e++ }), t && t.forEach(r, this);
        }function r(e) {
          this.set(e[0], e[1]);
        }var i = t.defineProperty,
            o = t.hasOwnProperty,
            a = n.prototype;return a["delete"] = function (e) {
          return this.has(e) && delete e[this._];
        }, a.get = function (e) {
          return this.has(e) ? e[this._] : void 0;
        }, a.has = function (e) {
          return o.call(e, this._);
        }, a.set = function (e, t) {
          return i(e, this._, { configurable: !0, value: t }), this;
        }, n;
      }(Math.random(), Object);
    }var s = l.WeakMap,
        f = {};try {
      f.WeakSet = WeakSet;
    } catch (WeakSet) {
      !function (e, t) {
        function n() {
          t(this, "_", { value: "_@ungap/weakmap" + e++ });
        }var r = n.prototype;r.add = function (e) {
          return this.has(e) || t(e, this._, { value: !0, configurable: !0 }), this;
        }, r.has = function (e) {
          return this.hasOwnProperty.call(e, this._);
        }, r["delete"] = function (e) {
          return this.has(e) && delete e[this._];
        }, f.WeakSet = n;
      }(Math.random(), Object.defineProperty);
    }var d = f.WeakSet,
        h = {};try {
      h.Map = Map;
    } catch (Map) {
      h.Map = function () {
        function e(e) {
          return -1 < (t = n.indexOf(e));
        }var t = 0,
            n = [],
            r = [];return { "delete": function _delete(i) {
            var o = e(i);return o && (n.splice(t, 1), r.splice(t, 1)), o;
          }, get: function get$$1(n) {
            return e(n) ? r[t] : void 0;
          }, has: function has(t) {
            return e(t);
          }, set: function set$$1(i, o) {
            return r[e(i) ? t : n.push(i) - 1] = o, this;
          } };
      };
    }var v = h.Map,
        p = function p(e, t, n, r, i, o) {
      if (i - r < 2) t.insertBefore(e(n[r], 1), o);else {
        for (var a = t.ownerDocument.createDocumentFragment(); r < i;) {
          a.appendChild(e(n[r++], 1));
        }t.insertBefore(a, o);
      }
    },
        m = function m(e, t) {
      return e == t;
    },
        g = function g(e) {
      return e;
    },
        b = function b(e, t, n, r, i, o, a) {
      var u = o - i;if (u < 1) return -1;for (; n - t >= u;) {
        for (var c = t, l = i; c < n && l < o && a(e[c], r[l]);) {
          c++, l++;
        }if (l === o) return t;t = c + 1;
      }return -1;
    },
        w = function w(e, t, n, r, i, o) {
      for (; r < i && o(n[r], e[t - 1]);) {
        r++, t--;
      }return 0 === t;
    },
        y = function y(e, t, n, r, i) {
      return n < r ? e(t[n], 0) : 0 < n ? e(t[n - 1], -0).nextSibling : i;
    },
        N = function N(e, t, n, r, i) {
      if (i - r < 2) t.removeChild(e(n[r], -1));else {
        var o = t.ownerDocument.createRange();o.setStartBefore(e(n[r], -1)), o.setEndAfter(e(n[i - 1], -1)), o.deleteContents();
      }
    },
        E = function E(e, t, n, r, i, o, a, u) {
      var c = 0,
          l = r < u ? r : u,
          s = Array(l++),
          f = Array(l);f[0] = -1;for (var d = 1; d < l; d++) {
        f[d] = a;
      }for (var h = new v(), p = o; p < a; p++) {
        h.set(i[p], p);
      }for (var m = t; m < n; m++) {
        var g = h.get(e[m]);null != g && -1 < (c = C(f, l, g)) && (f[c] = g, s[c] = { newi: m, oldi: g, prev: s[c - 1] });
      }for (c = --l, --a; f[c] > a;) {
        --c;
      }l = u + r - c;var b = Array(l),
          w = s[c];for (--n; w;) {
        for (var y = w, N = y.newi, E = y.oldi; n > N;) {
          b[--l] = 1, --n;
        }for (; a > E;) {
          b[--l] = -1, --a;
        }b[--l] = 0, --n, --a, w = w.prev;
      }for (; n >= t;) {
        b[--l] = 1, --n;
      }for (; a >= o;) {
        b[--l] = -1, --a;
      }return b;
    },
        k = function k(e, t, n, r, i, o, a) {
      var u = n + o,
          c = [],
          l = void 0,
          s = void 0,
          f = void 0,
          d = void 0,
          h = void 0,
          v = void 0,
          p = void 0;e: for (l = 0; l <= u; l++) {
        if (l > 50) return null;for (p = l - 1, h = l ? c[l - 1] : [0, 0], v = c[l] = [], s = -l; s <= l; s += 2) {
          for (d = s === -l || s !== l && h[p + s - 1] < h[p + s + 1] ? h[p + s + 1] : h[p + s - 1] + 1, f = d - s; d < o && f < n && a(r[i + d], e[t + f]);) {
            d++, f++;
          }if (d === o && f === n) break e;v[l + s] = d;
        }
      }var m = Array(l / 2 + u / 2),
          g = m.length - 1;for (l = c.length - 1; l >= 0; l--) {
        for (; d > 0 && f > 0 && a(r[i + d - 1], e[t + f - 1]);) {
          m[g--] = 0, d--, f--;
        }if (!l) break;p = l - 1, h = l ? c[l - 1] : [0, 0], s = d - f, s === -l || s !== l && h[p + s - 1] < h[p + s + 1] ? (f--, m[g--] = 1) : (d--, m[g--] = -1);
      }return m;
    },
        x = function x(e, t, n, r, i, o, a, u, c) {
      for (var l = new v(), s = e.length, f = a, d = 0; d < s;) {
        switch (e[d++]) {case 0:
            i++, f++;break;case 1:
            l.set(r[i], 1), p(t, n, r, i++, i, f < u ? t(o[f], 1) : c);break;case -1:
            f++;}
      }for (d = 0; d < s;) {
        switch (e[d++]) {case 0:
            a++;break;case -1:
            l.has(o[a]) ? a++ : N(t, n, o, a++, a);}
      }
    },
        C = function C(e, t, n) {
      for (var r = 1, i = t; r < i;) {
        var o = (r + i) / 2 >>> 0;n < e[o] ? i = o : r = o + 1;
      }return r;
    },
        S = function S(e, t, n, r, i, o, a, u, c, l, s, f, d) {
      x(k(n, r, o, a, u, l, f) || E(n, r, i, o, a, u, c, l), e, t, n, r, a, u, s, d);
    },
        M = function M(e, t, n, r) {
      r || (r = {});for (var i = r.compare || m, o = r.node || g, a = null == r.before ? null : o(r.before, 0), u = t.length, c = u, l = 0, s = n.length, f = 0; l < c && f < s && i(t[l], n[f]);) {
        l++, f++;
      }for (; l < c && f < s && i(t[c - 1], n[s - 1]);) {
        c--, s--;
      }var d = l === c,
          h = f === s;if (d && h) return n;if (d && f < s) return p(o, e, n, f, s, y(o, t, l, u, a)), n;if (h && l < c) return N(o, e, t, l, c), n;var v = c - l,
          E = s - f,
          k = -1;if (v < E) {
        if (-1 < (k = b(n, f, s, t, l, c, i))) return p(o, e, n, f, k, o(t[l], 0)), p(o, e, n, k + v, s, y(o, t, c, u, a)), n;
      } else if (E < v && -1 < (k = b(t, l, c, n, f, s, i))) return N(o, e, t, l, k), N(o, e, t, k + E, c), n;return v < 2 || E < 2 ? (p(o, e, n, f, s, o(t[l], 0)), N(o, e, t, l, c), n) : v === E && w(n, s, t, l, c, i) ? (p(o, e, n, f, s, y(o, t, c, u, a)), n) : (S(o, e, n, f, s, E, t, l, c, v, u, i, a), n);
    },
        _ = {};try {
      _.CustomEvent = new CustomEvent(".").constructor;
    } catch (CustomEvent) {
      _.CustomEvent = function (e, t) {
        t || (t = {});var n = document.createEvent("Event"),
            r = !!t.bubbles,
            i = !!t.cancelable;return n.initEvent(e, r, i), n.bubbles = r, n.cancelable = i, n.detail = t.detail, n;
      };
    }var A = _.CustomEvent,
        O = function O(e, t) {
      var n = "_" + e + "$";return { get: function get$$1() {
          return this[n] || j(this, n, t.call(this, e));
        }, set: function set$$1(e) {
          j(this, n, e);
        } };
    },
        j = function j(e, t, n) {
      return Object.defineProperty(e, t, { configurable: !0, value: "function" == typeof n ? function () {
          return e._wire$ = n.apply(this, arguments);
        } : n })[t];
    },
        T = {},
        L = {},
        P = [],
        W = L.hasOwnProperty,
        $ = 0,
        D = { attributes: T, define: function define(e, t) {
        e.indexOf("-") < 0 ? (e in L || ($ = P.push(e)), L[e] = t) : T[e] = t;
      }, invoke: function invoke(e, t) {
        for (var n = 0; n < $; n++) {
          var r = P[n];if (W.call(e, r)) return L[r](e[r], t);
        }
      } },
        R = Array.isArray || function (e) {
      var t = e.call([]);return function (n) {
        return e.call(n) === t;
      };
    }({}.toString),
        H = "".trim || function () {
      return String(this).replace(/^\s+|\s+/g, "");
    },
        z = document.defaultView,
        F = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,
        B = "http://www.w3.org/2000/svg",
        Z = /^(?:style|textarea)$/i,
        V = "_hyper: " + (Math.random() * new Date() | 0) + ";",
        G = "\x3c!--" + V + "--\x3e",
        I = " \\f\\n\\r\\t",
        q = "[ " + I + "]+[^  \\f\\n\\r\\t\\/>\"'=]+",
        J = "<([A-Za-z]+[A-Za-z0-9:_-]*)((?:",
        K = "(?:=(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|[^  \\f\\n\\r\\t\\/>\"'=]+))?)",
        Q = new RegExp(J + q + K + "+)([ " + I + "]*/?>)", "g"),
        U = new RegExp(J + q + K + "*)([ " + I + "]*/>)", "g"),
        X = function X(e, t) {
      return Y(e).createElement(t);
    },
        Y = function Y(e) {
      return e.ownerDocument || e;
    },
        ee = function ee(e) {
      return Y(e).createDocumentFragment();
    },
        te = function te(e, t) {
      return Y(e).createTextNode(t);
    },
        ne = ee(document),
        re = "append" in ne,
        ie = "content" in X(document, "template");ne.appendChild(te(ne, "g")), ne.appendChild(te(ne, ""));var oe = 1 === ne.cloneNode(!0).childNodes.length,
        ae = "importNode" in document,
        ue = re ? function (e, t) {
      e.append.apply(e, t);
    } : function (e, t) {
      for (var n = t.length, r = 0; r < n; r++) {
        e.appendChild(t[r]);
      }
    },
        ce = new RegExp("(" + q + "=)(['\"]?)" + G + "\\2", "gi"),
        le = function le(e, t, n, r) {
      return "<" + t + n.replace(ce, se) + r;
    },
        se = function se(e, t, n) {
      return t + (n || '"') + V + (n || '"');
    },
        fe = function fe(e, t) {
      return ("ownerSVGElement" in e ? be : ge)(e, t.replace(Q, le));
    },
        de = oe ? function (e) {
      for (var t = e.cloneNode(), n = e.childNodes || [], r = n.length, i = 0; i < r; i++) {
        t.appendChild(de(n[i]));
      }return t;
    } : function (e) {
      return e.cloneNode(!0);
    },
        he = ae ? function (e, t) {
      return e.importNode(t, !0);
    } : function (e, t) {
      return de(t);
    },
        ve = [].slice,
        pe = function pe(e) {
      return _me(e);
    },
        _me = function me(e) {
      if (e.propertyIsEnumerable("raw") || !Object.isFrozen(e.raw) || /Firefox\/(\d+)/.test((z.navigator || {}).userAgent) && parseFloat(RegExp.$1) < 55) {
        var t = {};_me = function me(e) {
          var n = "^" + e.join("^");return t[n] || (t[n] = e);
        };
      } else _me = function me(e) {
        return e;
      };return _me(e);
    },
        ge = ie ? function (e, t) {
      var n = X(e, "template");return n.innerHTML = t, n.content;
    } : function (e, t) {
      var n = X(e, "template"),
          r = ee(e);if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(t)) {
        var i = RegExp.$1;n.innerHTML = "<table>" + t + "</table>", ue(r, ve.call(n.querySelectorAll(i)));
      } else n.innerHTML = t, ue(r, ve.call(n.childNodes));return r;
    },
        be = ie ? function (e, t) {
      var n = ee(e),
          r = Y(e).createElementNS(B, "svg");return r.innerHTML = t, ue(n, ve.call(r.childNodes)), n;
    } : function (e, t) {
      var n = ee(e),
          r = X(e, "div");return r.innerHTML = '<svg xmlns="' + B + '">' + t + "</svg>", ue(n, ve.call(r.firstChild.childNodes)), n;
    };n.prototype.valueOf = function (e) {
      var t = null == this._;return t && (this._ = ee(this.first)), (t || e) && ue(this._, this.childNodes), this._;
    }, n.prototype.remove = function () {
      this._ = null;var e = this.first,
          t = this.last;if (2 === this.length) t.parentNode.removeChild(t);else {
        var n = Y(e).createRange();n.setStartBefore(this.childNodes[1]), n.setEndAfter(t), n.deleteContents();
      }return e;
    };var we = function we(e) {
      var t = [],
          n = void 0;switch (e.nodeType) {case 1:case 11:
          n = e;break;case 8:
          n = e.parentNode, ye(t, n, e);break;default:
          n = e.ownerElement;}for (e = n; n = n.parentNode; e = n) {
        ye(t, n, e);
      }return t;
    },
        ye = function ye(e, t, n) {
      e.unshift(e.indexOf.call(t.childNodes, n));
    },
        Ne = { create: function create(e, t, n) {
        return { type: e, name: n, node: t, path: we(t) };
      }, find: function find(e, t) {
        for (var n = t.length, r = 0; r < n; r++) {
          e = e.childNodes[t[r]];
        }return e;
      } },
        Ee = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
        ke = function ke(e, t, n) {
      if (n) {
        var r = t.cloneNode(!0);return r.value = "", e.setAttributeNode(r), xe(r, n);
      }return xe(e.style, n);
    },
        xe = function xe(e, t) {
      var n = void 0,
          r = void 0;return function (i) {
        switch (typeof i === "undefined" ? "undefined" : _typeof(i)) {case "object":
            if (i) {
              if ("object" === n) {
                if (!t && r !== i) for (var o in r) {
                  o in i || (e[o] = "");
                }
              } else t ? e.value = "" : e.cssText = "";var a = t ? {} : e;for (var u in i) {
                var c = i[u],
                    l = "number" != typeof c || Ee.test(u) ? c : c + "px";!t && /^--/.test(u) ? a.setProperty(u, l) : a[u] = l;
              }n = "object", t ? e.value = Me(r = a) : r = i;break;
            }default:
            r != i && (n = "string", r = i, t ? e.value = i || "" : e.cssText = i || "");}
      };
    },
        Ce = /([^A-Z])([A-Z]+)/g,
        Se = function Se(e, t, n) {
      return t + "-" + n.toLowerCase();
    },
        Me = function Me(e) {
      var t = [];for (var n in e) {
        t.push(n.replace(Ce, Se), ":", e[n], ";");
      }return t.join("");
    },
        _e = z.document,
        Ae = /*! (c) Andrea Giammarchi */
    function (e) {
      function t(e) {
        function t(e) {
          s = new l();for (var t, i = e.length, o = 0; o < i; o++) {
            t = e[o], a(t.removedNodes, r, n), a(t.addedNodes, n, r);
          }s = null;
        }function a(e, t, n) {
          for (var r, o = new i(t), a = e.length, u = 0; u < a; 1 === (r = e[u++]).nodeType && c(r, o, t, n)) {}
        }function c(e, t, n, r) {
          u.has(e) && !s[n].has(e) && (s[r]["delete"](e), s[n].add(e), e.dispatchEvent(t));for (var i = e.children, o = i.length, a = 0; a < o; c(i[a++], t, n, r)) {}
        }function l() {
          this[n] = new o(), this[r] = new o();
        }var s = null;try {
          new MutationObserver(t).observe(e, { subtree: !0, childList: !0 });
        } catch (v) {
          var f = 0,
              d = [],
              h = function h(e) {
            d.push(e), clearTimeout(f), f = setTimeout(function () {
              t(d.splice(f = 0, d.length));
            }, 0);
          };e.addEventListener("DOMNodeRemoved", function (e) {
            h({ addedNodes: [], removedNodes: [e.target] });
          }, !0), e.addEventListener("DOMNodeInserted", function (e) {
            h({ addedNodes: [e.target], removedNodes: [] });
          }, !0);
        }
      }var n = "connected",
          r = "dis" + n,
          i = e.Event,
          o = e.WeakSet,
          a = !0,
          u = new o();return function (e) {
        return a && (a = !a, t(e.ownerDocument)), u.add(e), e;
      };
    }({ Event: A, WeakSet: d });r.prototype = Object.create(null);var Oe = function Oe(e) {
      return { html: e };
    },
        je = function et(e, t) {
      return "ELEMENT_NODE" in e ? e : e.constructor === n ? 1 / t < 0 ? t ? e.remove() : e.last : t ? e.valueOf(!0) : e.first : et(e.render(), t);
    },
        Te = function Te(e) {
      return "ELEMENT_NODE" in e || e instanceof n || e instanceof t;
    },
        Le = function Le(e, t) {
      for (var n = [], r = t.length, i = 0; i < r; i++) {
        var o = t[i],
            a = Ne.find(e, o.path);switch (o.type) {case "any":
            n.push(He(a, []));break;case "attr":
            n.push(ze(a, o.name, o.node));break;case "text":
            n.push(Fe(a)), a.textContent = "";}
      }return n;
    },
        Pe = function tt(e, t, n) {
      for (var r = e.childNodes, i = r.length, o = 0; o < i; o++) {
        var a = r[o];switch (a.nodeType) {case 1:
            We(a, t, n), tt(a, t, n);break;case 8:
            a.textContent === V && (n.shift(), t.push(Z.test(e.nodeName) ? Ne.create("text", e) : Ne.create("any", a)));break;case 3:
            Z.test(e.nodeName) && H.call(a.textContent) === G && (n.shift(), t.push(Ne.create("text", e)));}
      }
    },
        We = function We(e, t, n) {
      for (var i = new r(), o = e.attributes, a = ve.call(o), u = [], c = a.length, l = 0; l < c; l++) {
        var s = a[l];if (s.value === V) {
          var f = s.name;if (!(f in i)) {
            var d = n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/, "$1");i[f] = o[d] || o[d.toLowerCase()], t.push(Ne.create("attr", i[f], d));
          }u.push(s);
        }
      }for (var h = u.length, v = 0; v < h; v++) {
        var p = u[v];/^id$/i.test(p.name) ? e.removeAttribute(p.name) : e.removeAttributeNode(u[v]);
      }var m = e.nodeName;if (/^script$/i.test(m)) {
        for (var g = _e.createElement(m), b = 0; b < o.length; b++) {
          g.setAttributeNode(o[b].cloneNode(!0));
        }g.textContent = e.textContent, e.parentNode.replaceChild(g, e);
      }
    },
        $e = function $e(e, t) {
      t(e.placeholder), "text" in e ? Promise.resolve(e.text).then(String).then(t) : "any" in e ? Promise.resolve(e.any).then(t) : "html" in e ? Promise.resolve(e.html).then(Oe).then(t) : Promise.resolve(D.invoke(e, t)).then(t);
    },
        De = function De(e) {
      return null != e && "then" in e;
    },
        Re = /^(?:form|list)$/i,
        He = function He(e, t) {
      var n = { node: je, before: e },
          r = !1,
          i = void 0;return function o(a) {
        switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "string":case "number":case "boolean":
            r ? i !== a && (i = a, t[0].textContent = a) : (r = !0, i = a, t = M(e.parentNode, t, [te(e, a)], n));break;case "function":
            o(a(e));break;case "object":case "undefined":
            if (null == a) {
              r = !1, t = M(e.parentNode, t, [], n);break;
            }default:
            if (r = !1, i = a, R(a)) {
              if (0 === a.length) t.length && (t = M(e.parentNode, t, [], n));else switch (_typeof(a[0])) {case "string":case "number":case "boolean":
                  o({ html: a });break;case "object":
                  if (R(a[0]) && (a = a.concat.apply([], a)), De(a[0])) {
                    Promise.all(a).then(o);break;
                  }default:
                  t = M(e.parentNode, t, a, n);}
            } else Te(a) ? t = M(e.parentNode, t, 11 === a.nodeType ? ve.call(a.childNodes) : [a], n) : De(a) ? a.then(o) : "placeholder" in a ? $e(a, o) : "text" in a ? o(String(a.text)) : "any" in a ? o(a.any) : "html" in a ? t = M(e.parentNode, t, ve.call(fe(e, [].concat(a.html).join("")).childNodes), n) : o("length" in a ? ve.call(a) : D.invoke(a, o));}
      };
    },
        ze = function ze(e, t, n) {
      var r = "ownerSVGElement" in e,
          i = void 0;if ("style" === t) return ke(e, n, r);if (/^on/.test(t)) {
        var o = t.slice(2);return "connected" === o || "disconnected" === o ? Ae(e) : t.toLowerCase() in e && (o = o.toLowerCase()), function (t) {
          i !== t && (i && e.removeEventListener(o, i, !1), i = t, t && e.addEventListener(o, t, !1));
        };
      }if ("data" === t || !r && t in e && !Re.test(t)) return function (n) {
        i !== n && (i = n, e[t] !== n && (e[t] = n, null == n && e.removeAttribute(t)));
      };if (t in D.attributes) return function (n) {
        i = D.attributes[t](e, n), e.setAttribute(t, null == i ? "" : i);
      };var a = !1,
          u = n.cloneNode(!0);return function (t) {
        i !== t && (i = t, u.value !== t && (null == t ? (a && (a = !1, e.removeAttributeNode(u)), u.value = t) : (u.value = t, a || (a = !0, e.setAttributeNode(u)))));
      };
    },
        Fe = function Fe(e) {
      var t = void 0;return function n(r) {
        if (t !== r) {
          t = r;var i = typeof r === "undefined" ? "undefined" : _typeof(r);"object" === i && r ? De(r) ? r.then(n) : "placeholder" in r ? $e(r, n) : n("text" in r ? String(r.text) : "any" in r ? r.any : "html" in r ? [].concat(r.html).join("") : "length" in r ? ve.call(r).join("") : D.invoke(r, n)) : "function" === i ? n(r(e)) : e.textContent = null == r ? "" : r;
        }
      };
    },
        Be = { create: Le, find: Pe },
        Ze = new s(),
        Ve = function () {
      try {
        var e = new s(),
            t = Object.freeze([]);if (e.set(t, !0), !e.get(t)) throw t;return e;
      } catch (t) {
        return new v();
      }
    }(),
        Ge = U,
        Ie = function Ie(e, t, n) {
      return F.test(t) ? e : "<" + t + n + "></" + t + ">";
    },
        qe = new s(),
        Je = function Je(e, t) {
      return null == e ? Ke(t || "html") : Qe(e, t || "html");
    },
        Ke = function Ke(e) {
      var t = void 0,
          n = void 0,
          r = void 0,
          o = void 0,
          a = void 0;return function (u) {
        u = pe(u);var c = o !== u;return c && (o = u, r = ee(document), n = "svg" === e ? document.createElementNS(B, "svg") : r, a = i.bind(n)), a.apply(null, arguments), c && ("svg" === e && ue(r, ve.call(n.childNodes)), t = Ue(r)), t;
      };
    },
        Qe = function Qe(e, t) {
      var n = t.indexOf(":"),
          r = qe.get(e),
          i = t;return -1 < n && (i = t.slice(n + 1), t = t.slice(0, n) || "html"), r || qe.set(e, r = {}), r[i] || (r[i] = Ke(t));
    },
        Ue = function Ue(e) {
      for (var t = e.childNodes, r = t.length, i = [], o = 0; o < r; o++) {
        var a = t[o];1 !== a.nodeType && 0 === H.call(a.textContent).length || i.push(a);
      }return 1 === i.length ? i[0] : new n(i);
    },
        Xe = function Xe(e) {
      return i.bind(e);
    },
        Ye = D.define;return c.Component = t, c.bind = Xe, c.define = Ye, c.diff = M, c.hyper = c, c.observe = Ae, c.wire = Je, c._ = { global: z, WeakMap: s, WeakSet: d }, function (e) {
      var n = new s(),
          r = Object.create,
          i = function i(e, t, n) {
        return e.set(t, n), n;
      },
          o = function o(e, t, n, _o) {
        var u = t.get(e) || a(e, t);switch (typeof _o === "undefined" ? "undefined" : _typeof(_o)) {case "object":case "function":
            var c = u.w || (u.w = new s());return c.get(_o) || i(c, _o, new e(n));default:
            var l = u.p || (u.p = r(null));return l[_o] || (l[_o] = new e(n));}
      },
          a = function a(e, t) {
        var n = { w: null, p: null };return t.set(e, n), n;
      },
          u = function u(e) {
        var t = new v();return n.set(e, t), t;
      };Object.defineProperties(t, { "for": { configurable: !0, value: function value(e, t) {
            return o(this, n.get(e) || u(e), e, null == t ? "default" : t);
          } } }), Object.defineProperties(t.prototype, { handleEvent: { value: function value(e) {
            var t = e.currentTarget;this["getAttribute" in t && t.getAttribute("data-call") || "on" + e.type](e);
          } }, html: O("html", e), svg: O("svg", e), state: O("state", function () {
          return this.defaultState;
        }), defaultState: { get: function get$$1() {
            return {};
          } }, dispatch: { value: function value(e, t) {
            var n = this._wire$;if (n) {
              var r = new A(e, { bubbles: !0, cancelable: !0, detail: t });return r.component = this, (n.dispatchEvent ? n : n.childNodes[0]).dispatchEvent(r);
            }return !1;
          } }, setState: { value: function value(e, t) {
            var n = this.state,
                r = "function" == typeof e ? e.call(this, n) : e;for (var i in r) {
              n[i] = r[i];
            }return !1 !== t && this.render(), this;
          } } });
    }(Ke), c;
  }(window);
  var Component = hyperHTML.Component,
      bind = hyperHTML.bind,
      define = hyperHTML.define,
      hyper = hyperHTML.hyper,
      wire = hyperHTML.wire;

  var _fixBabelExtend = function (O) {
    var gPO = O.getPrototypeOf || function (o) {
      return o.__proto__;
    },
        sPO = O.setPrototypeOf || function (o, p) {
      o.__proto__ = p;
      return o;
    },
        construct = (typeof Reflect === 'undefined' ? 'undefined' : _typeof(Reflect)) === 'object' ? Reflect.construct : function (Parent, args, Class) {
      var Constructor,
          a = [null];
      a.push.apply(a, args);
      Constructor = Parent.bind.apply(Parent, a);
      return sPO(new Constructor(), Class.prototype);
    };

    return function fixBabelExtend(Class) {
      var Parent = gPO(Class);
      return sPO(Class, sPO(function Super() {
        return construct(Parent, arguments, gPO(this).constructor);
      }, Parent));
    };
  }(Object);

  // utils to deal with custom elements builtin extends
  var ATTRIBUTE_CHANGED_CALLBACK = 'attributeChangedCallback';
  var O = Object;
  var classes = [];
  var defineProperty$1 = O.defineProperty;
  var getOwnPropertyDescriptor = O.getOwnPropertyDescriptor;
  var getOwnPropertyNames = O.getOwnPropertyNames;
  var getOwnPropertySymbols = O.getOwnPropertySymbols || function () {
    return [];
  };
  var getPrototypeOf = O.getPrototypeOf || function (o) {
    return o.__proto__;
  };
  var ownKeys = (typeof Reflect === 'undefined' ? 'undefined' : _typeof(Reflect)) === 'object' && Reflect.ownKeys || function (o) {
    return getOwnPropertyNames(o).concat(getOwnPropertySymbols(o));
  };
  var setPrototypeOf = O.setPrototypeOf || function (o, p) {
    return o.__proto__ = p, o;
  };
  var camel = function camel(name) {
    return name.replace(/-([a-z])/g, function ($0, $1) {
      return $1.toUpperCase();
    });
  };

  var HyperHTMLElement = _fixBabelExtend(function (_HTMLElement) {
    inherits(HyperHTMLElement, _HTMLElement);

    function HyperHTMLElement() {
      classCallCheck(this, HyperHTMLElement);
      return possibleConstructorReturn(this, (HyperHTMLElement.__proto__ || Object.getPrototypeOf(HyperHTMLElement)).apply(this, arguments));
    }

    createClass(HyperHTMLElement, [{
      key: 'render',


      // overwrite this method with your own render
      value: function render() {}

      // ---------------------//
      // Basic State Handling //
      // ---------------------//

      // define the default state object
      // you could use observed properties too

    }, {
      key: 'setState',


      // currently a state is a shallow copy, like in Preact or other libraries.
      // after the state is updated, the render() method will be invoked.
      // ⚠️ do not ever call this.setState() inside this.render()
      value: function setState(state, render) {
        var target = this.state;
        var source = typeof state === 'function' ? state.call(this, target) : state;
        for (var key in source) {
          target[key] = source[key];
        }if (render !== false) this.render();
        return this;
      }
    }, {
      key: 'html',


      // lazily bind once hyperHTML logic
      // to either the shadowRoot, if present and open,
      // the _shadowRoot property, if set due closed shadow root,
      // or the custom-element itself if no Shadow DOM is used.
      get: function get$$1() {
        return this._html$ || (this.html = bind(
        // in case of Shadow DOM {mode: "open"}, use it
        this.shadowRoot ||
        // in case of Shadow DOM {mode: "close"}, use it
        // this needs the following reference created upfront
        // this._shadowRoot = this.attachShadow({mode: "close"});
        this._shadowRoot ||
        // if no Shadow DOM is used, simply use the component
        // as container for its own content (it just works too)
        this));
      }

      // it can be set too if necessary, it won't invoke render()
      ,
      set: function set$$1(value) {
        defineProperty$1(this, '_html$', { configurable: true, value: value });
      }
    }, {
      key: 'defaultState',
      get: function get$$1() {
        return {};
      }

      // the state with a default

    }, {
      key: 'state',
      get: function get$$1() {
        return this._state$ || (this.state = this.defaultState);
      }

      // it can be set too if necessary, it won't invoke render()
      ,
      set: function set$$1(value) {
        defineProperty$1(this, '_state$', { configurable: true, value: value });
      }
    }], [{
      key: 'define',


      // define a custom-element in the CustomElementsRegistry
      // class MyEl extends HyperHTMLElement {}
      // MyEl.define('my-el');
      value: function define$$1(name, options) {
        var Class = this;
        var proto = Class.prototype;

        var onChanged = proto[ATTRIBUTE_CHANGED_CALLBACK];
        var hasChange = !!onChanged;

        // Class.booleanAttributes
        // -----------------------------------------------
        // attributes defined as boolean will have
        // an either available or not available attribute
        // regardless of the value.
        // All falsy values, or "false", mean attribute removed
        // while truthy values will be set as is.
        // Boolean attributes are also automatically observed.
        var booleanAttributes = Class.booleanAttributes || [];
        booleanAttributes.forEach(function (name) {
          if (!(name in proto)) defineProperty$1(proto, camel(name), {
            configurable: true,
            get: function get$$1() {
              return this.hasAttribute(name);
            },
            set: function set$$1(value) {
              if (!value || value === 'false') this.removeAttribute(name);else this.setAttribute(name, value);
            }
          });
        });

        // Class.observedAttributes
        // -------------------------------------------------------
        // HyperHTMLElement will directly reflect get/setAttribute
        // operation once these attributes are used, example:
        // el.observed = 123;
        // will automatically do
        // el.setAttribute('observed', 123);
        // triggering also the attributeChangedCallback
        var observedAttributes = Class.observedAttributes || [];
        observedAttributes.forEach(function (name) {
          // it is possible to redefine the behavior at any time
          // simply overwriting get prop() and set prop(value)
          if (!(name in proto)) defineProperty$1(proto, camel(name), {
            configurable: true,
            get: function get$$1() {
              return this.getAttribute(name);
            },
            set: function set$$1(value) {
              if (value == null) this.removeAttribute(name);else this.setAttribute(name, value);
            }
          });
        });

        // if these are defined, overwrite the observedAttributes getter
        // to include also booleanAttributes
        var attributes = booleanAttributes.concat(observedAttributes);
        if (attributes.length) defineProperty$1(Class, 'observedAttributes', {
          get: function get$$1() {
            return attributes;
          }
        });

        // created() {}
        // ---------------------------------
        // an initializer method that grants
        // the node is fully known to the browser.
        // It is ensured to run either after DOMContentLoaded,
        // or once there is a next sibling (stream-friendly) so that
        // you have full access to element attributes and/or childNodes.
        var created = proto.created || function () {
          this.render();
        };

        // used to ensure create() is called once and once only
        defineProperty$1(proto, '_init$', {
          configurable: true,
          writable: true,
          value: true
        });

        defineProperty$1(proto, ATTRIBUTE_CHANGED_CALLBACK, {
          configurable: true,
          value: function aCC(name, prev, curr) {
            if (this._init$) {
              checkReady.call(this, created);
              if (this._init$) return this._init$$.push(aCC.bind(this, name, prev, curr));
            }
            // ensure setting same value twice
            // won't trigger twice attributeChangedCallback
            if (hasChange && prev !== curr) {
              onChanged.apply(this, arguments);
            }
          }
        });

        var onConnected = proto.connectedCallback;
        var hasConnect = !!onConnected;
        defineProperty$1(proto, 'connectedCallback', {
          configurable: true,
          value: function cC() {
            if (this._init$) {
              checkReady.call(this, created);
              if (this._init$) return this._init$$.push(cC.bind(this));
            }
            if (hasConnect) {
              onConnected.apply(this, arguments);
            }
          }
        });

        // define lazily all handlers
        // class { handleClick() { ... }
        // render() { `<a onclick=${this.handleClick}>` } }
        getOwnPropertyNames(proto).forEach(function (key) {
          if (/^handle[A-Z]/.test(key)) {
            var _key$ = '_' + key + '$';
            var method = proto[key];
            defineProperty$1(proto, key, {
              configurable: true,
              get: function get$$1() {
                return this[_key$] || (this[_key$] = method.bind(this));
              }
            });
          }
        });

        // whenever you want to directly use the component itself
        // as EventListener, you can pass it directly.
        // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
        //  class Reactive extends HyperHTMLElement {
        //    oninput(e) { console.log(this, 'changed', e.target.value); }
        //    render() { this.html`<input oninput="${this}">`; }
        //  }
        if (!('handleEvent' in proto)) {
          defineProperty$1(proto, 'handleEvent', {
            configurable: true,
            value: function value(event) {
              this[(event.currentTarget.dataset || {}).call || 'on' + event.type](event);
            }
          });
        }

        if (options && options.extends) {
          var Native = document.createElement(options.extends).constructor;
          var Intermediate = function (_Native) {
            inherits(Intermediate, _Native);

            function Intermediate() {
              classCallCheck(this, Intermediate);
              return possibleConstructorReturn(this, (Intermediate.__proto__ || Object.getPrototypeOf(Intermediate)).apply(this, arguments));
            }

            return Intermediate;
          }(Native);
          var Super = getPrototypeOf(Class);
          ownKeys(Super).filter(function (key) {
            return ['length', 'name', 'arguments', 'caller', 'prototype'].indexOf(key) < 0;
          }).forEach(function (key) {
            return defineProperty$1(Intermediate, key, getOwnPropertyDescriptor(Super, key));
          });
          ownKeys(Super.prototype).forEach(function (key) {
            return defineProperty$1(Intermediate.prototype, key, getOwnPropertyDescriptor(Super.prototype, key));
          });
          setPrototypeOf(Class, Intermediate);
          setPrototypeOf(proto, Intermediate.prototype);
          customElements.define(name, Class, options);
        } else {
          customElements.define(name, Class);
        }
        classes.push(Class);
        return Class;
      }
    }]);
    return HyperHTMLElement;
  }(HTMLElement));

  // exposing hyperHTML utilities
  HyperHTMLElement.Component = Component;
  HyperHTMLElement.bind = bind;
  HyperHTMLElement.intent = define;
  HyperHTMLElement.wire = wire;
  HyperHTMLElement.hyper = hyper;

  try {
    if (Symbol.hasInstance) classes.push(defineProperty$1(HyperHTMLElement, Symbol.hasInstance, {
      enumerable: false,
      configurable: true,
      value: function value(instance) {
        return classes.some(isPrototypeOf, getPrototypeOf(instance));
      }
    }));
  } catch (meh) {}

  // ------------------------------//
  // DOMContentLoaded VS created() //
  // ------------------------------//
  var dom = {
    type: 'DOMContentLoaded',
    handleEvent: function handleEvent() {
      if (dom.ready()) {
        document.removeEventListener(dom.type, dom, false);
        dom.list.splice(0).forEach(invoke);
      } else setTimeout(dom.handleEvent);
    },
    ready: function ready() {
      return document.readyState === 'complete';
    },

    list: []
  };

  if (!dom.ready()) {
    document.addEventListener(dom.type, dom, false);
  }

  function checkReady(created) {
    if (dom.ready() || isReady.call(this, created)) {
      if (this._init$) {
        var list = this._init$$;
        if (list) delete this._init$$;
        created.call(defineProperty$1(this, '_init$', { value: false }));
        if (list) list.forEach(invoke);
      }
    } else {
      if (!this.hasOwnProperty('_init$$')) defineProperty$1(this, '_init$$', { configurable: true, value: [] });
      dom.list.push(checkReady.bind(this, created));
    }
  }

  function invoke(fn) {
    fn();
  }

  function isPrototypeOf(Class) {
    return this === Class.prototype;
  }

  function isReady(created) {
    var el = this;
    do {
      if (el.nextSibling) return true;
    } while (el = el.parentNode);
    setTimeout(checkReady.bind(this, created));
    return false;
  }

  exports.default = HyperHTMLElement;

  return exports["default"];

}({}));
