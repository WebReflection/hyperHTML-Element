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
    var t = document.defaultView,
        r = /^area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr$/i,
        l = "ownerSVGElement",
        c = "http://www.w3.org/2000/svg",
        s = "connected",
        f = "dis" + s,
        d = /^style|textarea$/i,
        b = "_hyper: " + (Math.random() * new Date() | 0) + ";",
        h = "\x3c!--" + b + "--\x3e",
        v = t.Event;try {
      new v("Event");
    } catch (e) {
      v = function v(e) {
        var t = document.createEvent("Event");return t.initEvent(e, !1, !1), t;
      };
    }var n,
        i = t.Map || function () {
      var n = [],
          r = [];return { get: function get$$1(e) {
          return r[n.indexOf(e)];
        }, set: function set$$1(e, t) {
          r[n.push(e) - 1] = t;
        } };
    },
        o = 0,
        p = t.WeakMap || function () {
      var n = b + o++;return { get: function get$$1(e) {
          return e[n];
        }, set: function set$$1(e, t) {
          Object.defineProperty(e, n, { configurable: !0, value: t });
        } };
    },
        a = t.WeakSet || function () {
      var t = new p();return { add: function add(e) {
          t.set(e, !0);
        }, has: function has(e) {
          return !0 === t.get(e);
        } };
    },
        m = Array.isArray || (n = {}.toString, function (e) {
      return "[object Array]" === n.call(e);
    }),
        g = b.trim || function () {
      return this.replace(/^\s+|\s+$/g, "");
    };function w() {
      return this;
    }var u = function u(e, t) {
      var n = "_" + e + "$";return { get: function get$$1() {
          return this[n] || y(this, n, t.call(this, e));
        }, set: function set$$1(e) {
          y(this, n, e);
        } };
    },
        y = function y(e, t, n) {
      return Object.defineProperty(e, t, { configurable: !0, value: "function" == typeof n ? function () {
          return e._wire$ = n.apply(this, arguments);
        } : n })[t];
    },
        N = {},
        x = {},
        E = [],
        C = x.hasOwnProperty,
        j = 0,
        A = { attributes: N, define: function define(e, t) {
        e.indexOf("-") < 0 ? (e in x || (j = E.push(e)), x[e] = t) : N[e] = t;
      }, invoke: function invoke(e, t) {
        for (var n = 0; n < j; n++) {
          var r = E[n];if (C.call(e, r)) return x[r](e[r], t);
        }
      } },
        k = function k(e, t) {
      return T(e).createElement(t);
    },
        T = function T(e) {
      return e.ownerDocument || e;
    },
        O = function O(e) {
      return T(e).createDocumentFragment();
    },
        S = function S(e, t) {
      return T(e).createTextNode(t);
    },
        L = " \\f\\n\\r\\t",
        M = "[^ " + L + "\\/>\"'=]+",
        $ = "[ " + L + "]+" + M,
        D = "<([A-Za-z]+[A-Za-z0-9:_-]*)((?:",
        P = "(?:=(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|" + M + "))?)",
        B = new RegExp(D + $ + P + "+)([ " + L + "]*/?>)", "g"),
        R = new RegExp(D + $ + P + "*)([ " + L + "]*/>)", "g"),
        _ = O(document),
        H = "append" in _,
        z = "content" in k(document, "template");_.appendChild(S(_, "g")), _.appendChild(S(_, ""));var F = 1 === _.cloneNode(!0).childNodes.length,
        Z = "importNode" in document,
        I = H ? function (e, t) {
      e.append.apply(e, t);
    } : function (e, t) {
      for (var n = t.length, r = 0; r < n; r++) {
        e.appendChild(t[r]);
      }
    },
        V = new RegExp("(" + $ + "=)(['\"]?)" + h + "\\2", "gi"),
        W = function W(e, t, n, r) {
      return "<" + t + n.replace(V, q) + r;
    },
        q = function q(e, t, n) {
      return t + (n || '"') + b + (n || '"');
    },
        G = function G(e, t) {
      return (l in e ? ee : Y)(e, t.replace(B, W));
    },
        J = F ? function (e) {
      for (var t = e.cloneNode(), n = e.childNodes || [], r = n.length, i = 0; i < r; i++) {
        t.appendChild(J(n[i]));
      }return t;
    } : function (e) {
      return e.cloneNode(!0);
    },
        K = Z ? function (e, t) {
      return e.importNode(t, !0);
    } : function (e, t) {
      return J(t);
    },
        Q = [].slice,
        U = function U(e) {
      return _X(e);
    },
        _X = function X(e) {
      if (e.propertyIsEnumerable("raw") || /Firefox\/(\d+)/.test((t.navigator || {}).userAgent) && parseFloat(RegExp.$1) < 55) {
        var n = {};_X = function X(e) {
          var t = "^" + e.join("^");return n[t] || (n[t] = e);
        };
      } else _X = function X(e) {
        return e;
      };return _X(e);
    },
        Y = z ? function (e, t) {
      var n = k(e, "template");return n.innerHTML = t, n.content;
    } : function (e, t) {
      var n = k(e, "template"),
          r = O(e);if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(t)) {
        var i = RegExp.$1;n.innerHTML = "<table>" + t + "</table>", I(r, Q.call(n.querySelectorAll(i)));
      } else n.innerHTML = t, I(r, Q.call(n.childNodes));return r;
    },
        ee = z ? function (e, t) {
      var n = O(e),
          r = T(e).createElementNS(c, "svg");return r.innerHTML = t, I(n, Q.call(r.childNodes)), n;
    } : function (e, t) {
      var n = O(e),
          r = k(e, "div");return r.innerHTML = '<svg xmlns="' + c + '">' + t + "</svg>", I(n, Q.call(r.firstChild.childNodes)), n;
    };function te(e) {
      this.childNodes = e, this.length = e.length, this.first = e[0], this.last = e[this.length - 1];
    }te.prototype.insert = function () {
      var e = O(this.first);return I(e, this.childNodes), e;
    }, te.prototype.remove = function () {
      var e = this.first,
          t = this.last;if (2 === this.length) t.parentNode.removeChild(t);else {
        var n = T(e).createRange();n.setStartBefore(this.childNodes[1]), n.setEndAfter(t), n.deleteContents();
      }return e;
    };var ne = function ne(e, t, n) {
      e.unshift(e.indexOf.call(t.childNodes, n));
    },
        re = function re(e, t, n) {
      return { type: e, name: n, node: t, path: function (e) {
          var t = [],
              n = void 0;switch (e.nodeType) {case 1:case 11:
              n = e;break;case 8:
              n = e.parentNode, ne(t, n, e);break;default:
              n = e.ownerElement;}for (e = n; n = n.parentNode; e = n) {
            ne(t, n, e);
          }return t;
        }(t) };
    },
        ie = function ie(e, t) {
      for (var n = t.length, r = 0; r < n; r++) {
        e = e.childNodes[t[r]];
      }return e;
    },
        oe = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
        ae = function ae(o, a) {
      var u = void 0,
          l = void 0;return function (e) {
        switch (typeof e === "undefined" ? "undefined" : _typeof(e)) {case "object":
            if (e) {
              if ("object" === u) {
                if (!a && l !== e) for (var t in l) {
                  t in e || (o[t] = "");
                }
              } else a ? o.value = "" : o.cssText = "";var n = a ? {} : o;for (var r in e) {
                var i = e[r];n[r] = "number" != typeof i || oe.test(r) ? i : i + "px";
              }u = "object", a ? o.value = ce(l = n) : l = e;break;
            }default:
            l != e && (u = "string", l = e, a ? o.value = e || "" : o.cssText = e || "");}
      };
    },
        ue = /([^A-Z])([A-Z]+)/g,
        le = function le(e, t, n) {
      return t + "-" + n.toLowerCase();
    },
        ce = function ce(e) {
      var t = [];for (var n in e) {
        t.push(n.replace(ue, le), ":", e[n], ";");
      }return t.join("");
    },
        se = function se(e, t) {
      return e == t;
    },
        fe = function fe(e) {
      return e;
    },
        de = function de(e, t, n, r) {
      if (null == r) t.removeChild(e(n, -1));else {
        var i = t.ownerDocument.createRange();i.setStartBefore(e(n, -1)), i.setEndAfter(e(r, -1)), i.deleteContents();
      }
    },
        he = function he(e, t, n, r) {
      r || (r = {});for (var i = r.compare || se, o = r.node || fe, a = null == r.before ? null : o(r.before, 0), u = 0, l = 0, c = t.length - 1, s = t[0], f = t[c], d = n.length - 1, h = n[0], v = n[d]; u <= c && l <= d;) {
        if (null == s) s = t[++u];else if (null == f) f = t[--c];else if (null == h) h = n[++l];else if (null == v) v = n[--d];else if (i(s, h)) s = t[++u], h = n[++l];else if (i(f, v)) f = t[--c], v = n[--d];else if (i(s, v)) e.insertBefore(o(s, 1), o(f, -0).nextSibling), s = t[++u], v = n[--d];else if (i(f, h)) e.insertBefore(o(f, 1), o(s, 0)), f = t[--c], h = n[++l];else {
          var p = t.indexOf(h);if (p < 0) e.insertBefore(o(h, 1), o(s, 0)), h = n[++l];else {
            for (var m = p, g = l; m <= c && g <= d && t[m] === n[g];) {
              m++, g++;
            }if (1 < m - p) --p === u ? e.removeChild(o(s, -1)) : de(o, e, s, t[p]), l = g, s = t[u = m], h = n[g];else {
              var b = t[p];t[p] = null, e.insertBefore(o(b, 1), o(s, 0)), h = n[++l];
            }
          }
        }
      }if (u <= c || l <= d) if (c < u) {
        var w = n[d + 1],
            y = null == w ? a : o(w, 0);if (l === d) e.insertBefore(o(n[l], 1), y);else {
          for (var N = e.ownerDocument.createDocumentFragment(); l <= d;) {
            N.appendChild(o(n[l++], 1));
          }e.insertBefore(N, y);
        }
      } else null == t[u] && u++, u === c ? e.removeChild(o(t[u], -1)) : de(o, e, t[u], t[c]);return n;
    },
        ve = new a();function pe() {}pe.prototype = Object.create(null);var me = function me(e) {
      return { html: e };
    },
        ge = function e(t, n) {
      return "ELEMENT_NODE" in t ? t : t.constructor === te ? 1 / n < 0 ? n ? t.remove() : t.last : n ? t.insert() : t.first : e(t.render(), n);
    },
        be = function be(e, t, n) {
      for (var r = new pe(), i = e.attributes, o = Q.call(i), a = [], u = o.length, l = 0; l < u; l++) {
        var c = o[l];if (c.value === b) {
          var s = c.name;if (!(s in r)) {
            var f = n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/, "$1");r[s] = i[f] || i[f.toLowerCase()], t.push(re("attr", r[s], f));
          }a.push(c);
        }
      }for (var d = a.length, h = 0; h < d; h++) {
        var v = a[h];/^id$/i.test(v.name) ? e.removeAttribute(v.name) : e.removeAttributeNode(a[h]);
      }var p = e.nodeName;if (/^script$/i.test(p)) {
        for (var m = document.createElement(p), g = 0; g < i.length; g++) {
          m.setAttributeNode(i[g].cloneNode(!0));
        }m.textContent = e.textContent, e.parentNode.replaceChild(m, e);
      }
    },
        we = function we(e, t) {
      t(e.placeholder), "text" in e ? Promise.resolve(e.text).then(String).then(t) : "any" in e ? Promise.resolve(e.any).then(t) : "html" in e ? Promise.resolve(e.html).then(me).then(t) : Promise.resolve(A.invoke(e, t)).then(t);
    },
        ye = function ye(e) {
      return null != e && "then" in e;
    },
        Ne = function Ne(r, i) {
      var o = { node: ge, before: r },
          a = !1,
          u = void 0;return function e(t) {
        switch (typeof t === "undefined" ? "undefined" : _typeof(t)) {case "string":case "number":case "boolean":
            a ? u !== t && (u = t, i[0].textContent = t) : (a = !0, u = t, i = he(r.parentNode, i, [S(r, t)], o));break;case "object":case "undefined":
            if (null == t) {
              a = !1, i = he(r.parentNode, i, [], o);break;
            }default:
            if (a = !1, m(u = t)) {
              if (0 === t.length) i.length && (i = he(r.parentNode, i, [], o));else switch (_typeof(t[0])) {case "string":case "number":case "boolean":
                  e({ html: t });break;case "object":
                  if (m(t[0]) && (t = t.concat.apply([], t)), ye(t[0])) {
                    Promise.all(t).then(e);break;
                  }default:
                  i = he(r.parentNode, i, t, o);}
            } else "ELEMENT_NODE" in (n = t) || n instanceof te || n instanceof w ? i = he(r.parentNode, i, 11 === t.nodeType ? Q.call(t.childNodes) : [t], o) : ye(t) ? t.then(e) : "placeholder" in t ? we(t, e) : "text" in t ? e(String(t.text)) : "any" in t ? e(t.any) : "html" in t ? i = he(r.parentNode, i, Q.call(G(r, [].concat(t.html).join("")).childNodes), o) : e("length" in t ? Q.call(t) : A.invoke(t, e));}var n;
      };
    },
        xe = function xe(t, n, e) {
      var r = l in t,
          i = void 0;if ("style" === n) return function (e, t, n) {
        if (n) {
          var r = t.cloneNode(!0);return r.value = "", e.setAttributeNode(r), ae(r, n);
        }return ae(e.style, n);
      }(t, e, r);if (/^on/.test(n)) {
        var o = n.slice(2);return o === s || o === f ? (je && (je = !1, function () {
          var i = function i(e, t) {
            for (var n = new v(t), r = e.length, i = 0; i < r; i++) {
              var o = e[i];1 === o.nodeType && a(o, n);
            }
          },
              a = function e(t, n) {
            ve.has(t) && t.dispatchEvent(n);for (var r = t.children || function (e) {
              for (var t = [], n = e.childNodes, r = n.length, i = 0; i < r; i++) {
                1 === n[i].nodeType && t.push(n[i]);
              }return t;
            }(t), i = r.length, o = 0; o < i; o++) {
              e(r[o], n);
            }
          };try {
            new MutationObserver(function (e) {
              for (var t = e.length, n = 0; n < t; n++) {
                var r = e[n];i(r.removedNodes, f), i(r.addedNodes, s);
              }
            }).observe(document, { subtree: !0, childList: !0 });
          } catch (e) {
            document.addEventListener("DOMNodeRemoved", function (e) {
              i([e.target], f);
            }, !1), document.addEventListener("DOMNodeInserted", function (e) {
              i([e.target], s);
            }, !1);
          }
        }()), ve.add(t)) : n.toLowerCase() in t && (o = o.toLowerCase()), function (e) {
          i !== e && (i && t.removeEventListener(o, i, !1), (i = e) && t.addEventListener(o, e, !1));
        };
      }if ("data" === n || !r && n in t) return function (e) {
        i !== e && (i = e, t[n] !== e && null == (t[n] = e) && t.removeAttribute(n));
      };if (n in A.attributes) return function (e) {
        i = A.attributes[n](t, e), t.setAttribute(n, null == i ? "" : i);
      };var a = !1,
          u = e.cloneNode(!0);return function (e) {
        i !== e && (i = e, u.value !== e && (null == e ? (a && (a = !1, t.removeAttributeNode(u)), u.value = e) : (u.value = e, a || (a = !0, t.setAttributeNode(u)))));
      };
    },
        Ee = function Ee(n) {
      var r = void 0;return function e(t) {
        r !== t && ("object" == _typeof(r = t) && t ? ye(t) ? t.then(e) : "placeholder" in t ? we(t, e) : e("text" in t ? String(t.text) : "any" in t ? t.any : "html" in t ? [].concat(t.html).join("") : "length" in t ? Q.call(t).join("") : A.invoke(t, e)) : n.textContent = null == t ? "" : t);
      };
    },
        Ce = { create: function create(e, t) {
        for (var n = [], r = t.length, i = 0; i < r; i++) {
          var o = t[i],
              a = ie(e, o.path);switch (o.type) {case "any":
              n.push(Ne(a, []));break;case "attr":
              n.push(xe(a, o.name, o.node));break;case "text":
              n.push(Ee(a)), a.textContent = "";}
        }return n;
      }, find: function e(t, n, r) {
        for (var i = t.childNodes, o = i.length, a = 0; a < o; a++) {
          var u = i[a];switch (u.nodeType) {case 1:
              be(u, n, r), e(u, n, r);break;case 8:
              u.textContent === b && (r.shift(), n.push(d.test(t.nodeName) ? re("text", t) : re("any", u)));break;case 3:
              d.test(t.nodeName) && g.call(u.textContent) === h && (r.shift(), n.push(re("text", t)));}
        }
      } },
        je = !0;var Ae = new p(),
        ke = function () {
      try {
        var e = new p(),
            t = Object.freeze([]);if (e.set(t, !0), !e.get(t)) throw t;return e;
      } catch (t) {
        return new i();
      }
    }();function Te(e) {
      var t = Ae.get(this);return t && t.template === U(e) ? Oe.apply(t.updates, arguments) : function (e) {
        e = U(e);var t = ke.get(e) || function (e) {
          var t = [],
              n = e.join(h).replace(De, Pe),
              r = G(this, n);Ce.find(r, t, e.slice());var i = { fragment: r, paths: t };return ke.set(e, i), i;
        }.call(this, e),
            n = K(this.ownerDocument, t.fragment),
            r = Ce.create(n, t.paths);Ae.set(this, { template: e, updates: r }), Oe.apply(r, arguments), this.textContent = "", this.appendChild(n);
      }.apply(this, arguments), this;
    }function Oe() {
      for (var e = arguments.length, t = 1; t < e; t++) {
        this[t - 1](arguments[t]);
      }
    }var Se,
        Le,
        Me,
        $e,
        De = R,
        Pe = function Pe(e, t, n) {
      return r.test(t) ? e : "<" + t + n + "></" + t + ">";
    },
        Be = new p(),
        Re = function Re(n) {
      var r = void 0,
          i = void 0,
          o = void 0,
          a = void 0,
          u = void 0;return function (e) {
        e = U(e);var t = a !== e;return t && (a = e, o = O(document), i = "svg" === n ? document.createElementNS(c, "svg") : o, u = Te.bind(i)), u.apply(null, arguments), t && ("svg" === n && I(o, Q.call(i.childNodes)), r = He(o)), r;
      };
    },
        _e = function _e(e, t) {
      var n = t.indexOf(":"),
          r = Be.get(e),
          i = t;return -1 < n && (i = t.slice(n + 1), t = t.slice(0, n) || "html"), r || Be.set(e, r = {}), r[i] || (r[i] = Re(t));
    },
        He = function He(e) {
      for (var t = e.childNodes, n = t.length, r = [], i = 0; i < n; i++) {
        var o = t[i];1 !== o.nodeType && 0 === g.call(o.textContent).length || r.push(o);
      }return 1 === r.length ? r[0] : new te(r);
    },
        ze = A.define;function Fe(e) {
      return arguments.length < 2 ? null == e ? Re("html") : "string" == typeof e ? Fe.wire(null, e) : "raw" in e ? Re("html")(e) : "nodeType" in e ? Fe.bind(e) : _e(e, "html") : ("raw" in e ? Re("html") : Fe.wire).apply(null, arguments);
    }return Fe.Component = w, Fe.bind = function (e) {
      return Te.bind(e);
    }, Fe.define = ze, Fe.diff = he, (Fe.hyper = Fe).wire = function (e, t) {
      return null == e ? Re(t || "html") : _e(e, t || "html");
    }, Se = Re, Le = new p(), Me = Object.create, $e = function $e(e, t) {
      var n = { w: null, p: null };return t.set(e, n), n;
    }, Object.defineProperties(w, { for: { configurable: !0, value: function value(e, t) {
          return function (e, t, n, r) {
            var i,
                o,
                a,
                u = t.get(e) || $e(e, t);switch (typeof r === "undefined" ? "undefined" : _typeof(r)) {case "object":case "function":
                var l = u.w || (u.w = new p());return l.get(r) || (i = l, o = r, a = new e(n), i.set(o, a), a);default:
                var c = u.p || (u.p = Me(null));return c[r] || (c[r] = new e(n));}
          }(this, Le.get(e) || (n = e, r = new i(), Le.set(n, r), r), e, null == t ? "default" : t);var n, r;
        } } }), Object.defineProperties(w.prototype, { handleEvent: { value: function value(e) {
          var t = e.currentTarget;this["getAttribute" in t && t.getAttribute("data-call") || "on" + e.type](e);
        } }, html: u("html", Se), svg: u("svg", Se), state: u("state", function () {
        return this.defaultState;
      }), defaultState: { get: function get$$1() {
          return {};
        } }, dispatch: { value: function value(e, t) {
          var n = this._wire$;if (n) {
            var r = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: t });return r.component = this, (n.dispatchEvent ? n : n.childNodes[0]).dispatchEvent(r);
          }return !1;
        } }, setState: { value: function value(e, t) {
          var n = this.state,
              r = "function" == typeof e ? e.call(this, n) : e;for (var i in r) {
            n[i] = r[i];
          }return !1 !== t && this.render(), this;
        } } }), Fe;
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

  var HyperHTMLElement = _fixBabelExtend(function (_HTMLElement) {
    inherits(HyperHTMLElement, _HTMLElement);

    function HyperHTMLElement() {
      classCallCheck(this, HyperHTMLElement);
      return possibleConstructorReturn(this, (HyperHTMLElement.__proto__ || Object.getPrototypeOf(HyperHTMLElement)).apply(this, arguments));
    }

    createClass(HyperHTMLElement, [{
      key: 'render',


      // ---------------------//
      // Basic State Handling //
      // ---------------------//

      // overwrite this method with your own render
      value: function render() {}

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

        // if observedAttributes contains attributes to observe
        // HyperHTMLElement will directly reflect get/setAttribute
        // operation once these attributes are used, example:
        // el.observed = 123;
        // will automatically do
        // el.setAttribute('observed', 123);
        // triggering also the attributeChangedCallback
        (Class.observedAttributes || []).forEach(function (name) {
          if (!(name in proto)) defineProperty$1(proto, name.replace(/-([a-z])/g, function ($0, $1) {
            return $1.toUpperCase();
          }), {
            configurable: true,
            // it's impossible to understand if this property
            // should be returned as boolean or not
            // but you can always define
            // get propName() { return !!this.getAttribute(name); }
            // overwriting the default behavior
            get: function get$$1() {
              var value = this.getAttribute(name);
              return value === '' ? true : value;
            },
            set: function set$$1(value) {
              if (value === false || value == null) this.removeAttribute(name, value);else {
                this.setAttribute(name, value);
              }
            }
          });
        });

        var onChanged = proto.attributeChangedCallback;
        var hasChange = !!onChanged;

        // created() {} is an initializer method that grants
        // the node is fully known to the browser.
        // It is ensured to run either after DOMContentLoaded,
        // or once there is a next sibling (stream-friendly) so that
        // you have full access to element attributes and/or childNodes.
        var created = proto.created;
        if (created) {
          // used to ensure create() is called once and once only
          defineProperty$1(proto, '_init$', {
            configurable: true,
            writable: true,
            value: true
          });

          // ⚠️ if you need to overwrite/change attributeChangedCallback method
          //    at runtime after class definition, be sure you do so
          //    via Object.defineProperty to preserve its non-enumerable nature.
          defineProperty$1(proto, 'attributeChangedCallback', {
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

          // ⚠️ if you need to overwrite/change connectedCallback method
          //    at runtime after class definition, be sure you do so
          //    via Object.defineProperty to preserve its non-enumerable nature.
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
        } else if (hasChange) {
          // ⚠️ if you need to overwrite/change attributeChangedCallback method
          //    at runtime after class definition, be sure you do so
          //    via Object.defineProperty to preserve its non-enumerable nature.
          defineProperty$1(proto, 'attributeChangedCallback', {
            configurable: true,
            value: function value(name, prev, curr) {
              // ensure setting same value twice
              // won't trigger twice attributeChangedCallback
              if (prev !== curr) {
                onChanged.apply(this, arguments);
              }
            }
          });
        }

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
          // ⚠️ if you need to overwrite/change handleEvent method
          //    at runtime after class definition, be sure you do so
          //    via Object.defineProperty to preserve its non-enumerable nature.
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
