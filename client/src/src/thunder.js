/*!@shinsenter/defer.js@3.8.0*/
!(function (c, u, f) { function s(n, t, e, o) { N ? z(n, t) : (1 < (e = e === f ? s.lazy : e) && (o = n, S.push(n = function () { o && (o(), o = f) }, e)), (e ? q : S).push(n, Math.max(e ? 350 : 0, t))) } function r(n) { return "string" == typeof (n = n || {}) ? { id: n } : n } function a(t, n, e, o) { l(n.split(" "), function (n) { (o || c)[t + "EventListener"](n, e || i) }) } function l(n, t) { n.map(t) } function d(n, t) { l(D.call(n.attributes), function (n) { t(n.name, n.value) }) } function p(n, t, e, o, i, c) { if (i = I.createElement(n), e && a(w, b, e, i), t) for (c in t) i[j](c, t[c]); return o && I.head.appendChild(i), i } function h(n, t) { return D.call((t || I).querySelectorAll(n)) } function m(o, n) { l(h("source,img", o), m), d(o, function (n, t, e) { (e = y.exec(n)) && o[j](e[1], t) }), "string" == typeof n && (o.className += " " + n), o[b] && o[b]() } function n(n, t, e) { s(function (o) { l(o = h(n || "script[type=deferjs]"), function (n, e) { n[A] && (e = {}, d(n, function (n, t) { n != C && (e[n == A ? "href" : n] = t) }), e.as = g, e.rel = "preload", p(v, e, f, c)) }), (function i(n, e, t) { (n = o[k]()) && (e = {}, d(n, function (n, t) { n != C && (e[n] = t) }), t = e[A] && !("async" in e), (e = p(g, e)).text = n.text, n.parentNode.replaceChild(e, n), t ? a(w, b + " error", i, e) : i()) })() }, t, e) } function i(n, t) { for (t = N ? (a(e, o), q) : (a(e, x), N = s, q[0] && a(w, o), S); t[0];)z(t[k](), t[k]()) } var y = /^data-(.+)/, v = "link", g = "script", b = "load", t = "pageshow", w = "add", e = "remove", o = "touchstart mousemove mousedown keydown wheel", x = "on" + t in c ? t : b, j = "setAttribute", k = "shift", A = "src", C = "type", E = c.IntersectionObserver, I = c.document, N = /p/.test(I.readyState), S = [], q = [], z = c.setTimeout, D = S.slice; s.all = n, s.dom = function (n, t, i, c, r) { s(function (e) { function o(n) { c && !1 === c(n) || m(n, i) } e = E ? new E(function (n) { l(n, function (n, t) { n.isIntersecting && (e.unobserve(t = n.target), o(t)) }) }, r) : f, l(h(n || "[data-src]"), function (n) { n[u] || (n[u] = s, e ? e.observe(n) : o(n)) }) }, t, !1) }, s.css = function (n, t, e, o, i) { (t = r(t)).href = n, t.rel = "stylesheet", s(function () { p(v, t, o, c) }, e, i) }, s.js = function (n, t, e, o, i) { (t = r(t)).src = n, s(function () { p(g, t, o, c) }, e, i) }, s.reveal = m, c[u] = s, N || a(w, x), n() })(this, "Defer");

Defer.lazy = true;
Defer.all('script[type="thunder"]');
Defer.all('script[type="thunder-strike"]', 250, false);

window.thunderAssets = [];
window.thunderAssetsCalled = [];

var pastThunders = [];

function detectAndCallThunderAssets(link) {

  let kname = link.split('.');
  let kformat = link.split('.');

  if (kname && kname.length) {
    kname = kname[0].split('/')

    if (kname) {

      kname = kname.splice(-1)

      if (kname && kname.length) {

        kname = kname[0].split('-')

        if (kname && kname.length) {
          kname = kname[0]
        }
      }
    }
  }

  if (kformat && kformat.length) {
    kformat = kformat[1]
  }

  if (kname && kformat) {
    let kk = kname + '.' + kformat;
    let callback = window.thunderAssets[kk];

    if (typeof callback === 'function') {

      if (!window.thunderAssetsCalled[kk] && window.thunderAssets) {
        eval('callback()')
        window.thunderAssetsCalled[kk] = true
      }
    }
  }
}

function thunderStrike(link) {

  if (link && !pastThunders.includes(link)) {

    let type = link.split('.').pop();

    if (type == 'js') {
      let script = document.createElement('script');
      script.src = link;
      script.type = 'module';

      script.onload = () => detectAndCallThunderAssets(link)

      document.documentElement.firstChild.appendChild(script);
      pastThunders.push(link)

    } else if (type == 'css' || type == 'scss' || type == 'sass' || type == 'less') {
      let stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = link;

      stylesheet.onload = () => detectAndCallThunderAssets(link);

      document.documentElement.firstChild.appendChild(stylesheet);
      pastThunders.push(link)
    }
  }
}

function fireThunder(link) {
  if (link.split(',').length > 1) {
    link.split(',').forEach((i) => {
      thunderStrike(i)
    })
  } else {
    thunderStrike(link)
  }
}

let thunderAssets = document.querySelectorAll('meta[name="thunder-asset"]');
let thunders = [];

if (thunderAssets.length) {

  thunderAssets.forEach((i) => {
    thunders.push(i.content)
    Defer.dom(i.getAttribute('cloud'), 100, 'seen', function (node) {
      fireThunder(i.content)
    });
  })
}

window.thunder = () => {

  // forcing loading on first interaction (disable for now)
  // if (thunders.length) {
  //   console.log(thunders)
  //   thunders.map((link) => fireThunder(link))
  // }
}
