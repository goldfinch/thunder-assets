(function(n,a,l){function f(t,e,r){v?H(t,e):((r=r===l?f.lazy:r)?I:D).push(t,Math.max(r?350:0,e))}function b(t){m.head.appendChild(t)}function d(t,e){t.forEach(function(r){e(r)})}function h(t,e,r,u){d(e.split(" "),function(o){(u||n)[t+"EventListener"](o,r||U)})}function y(t,e,r,u){return(u=e?m.getElementById(e):l)||(u=m.createElement(t),e&&(u.id=e)),r&&h(g,p,r,u),u}function w(t,e){d(J.call(t.attributes),function(r){e(r.name,r.value)})}function A(t,e){return J.call((e||m).querySelectorAll(t))}function C(t,e){d(A("source,img",t),C),w(t,function(r,u,o){(o=/^data-(.+)/.exec(r))&&t[S](o[1],u)}),e&&(t.className+=" "+e),t[p]&&t[p]()}function N(t,e,r){f(function(u){d(u=A(t||"script[type=deferjs]"),function(o,c){o.src&&(c=y(z),w(o,function(i,s){i!=F&&c[S](i=="src"?"href":i,s)}),c.rel="preload",c.as=x,b(c))}),function o(c,i){(c=u[j]())&&(i=y(x),w(c,function(s,E){s!=F&&i[S](s,E)}),i.text=c.text,c.parentNode.replaceChild(i,c),i.src&&!i.getAttribute("async")?h(g,p+" error",o,i):o())}()},e,r)}function U(t,e){for(e=v?(h(L,M),I):(h(L,O),v=f,I[0]&&h(g,M),D);e[0];)H(e[j](),e[j]())}var z="link",x="script",p="load",B="pageshow",g="add",L="remove",M="touchstart mousemove mousedown keydown wheel",O="on"+B in n?B:p,S="setAttribute",j="shift",F="type",G=n.IntersectionObserver,m=n.document||n,v=/p/.test(m.readyState),D=[],I=[],H=n.setTimeout,J=D.slice;f.all=N,f.dom=function(t,e,r,u,o){f(function(c){function i(s){u&&u(s)===!1||C(s,r)}c=G?new G(function(s){d(s,function(E,K){E.isIntersecting&&(c.unobserve(K=E.target),i(K))})},o):l,d(A(t||"[data-src]"),function(s){s[a]||(s[a]=f,c?c.observe(s):i(s))})},e,!1)},f.css=function(t,e,r,u,o){f(function(c){(c=y(z,e,u)).rel="stylesheet",c.href=t,b(c)},r,o)},f.js=function(t,e,r,u,o){f(function(c){(c=y(x,e,u)).src=t,b(c)},r,o)},f.reveal=C,n[a]=f,v||h(g,O),N()})(globalThis,"Defer");

Defer.lazy = true;
Defer.all('script[type="thunder"]');

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
  } else
  {
    thunderStrike(link)
  }
}

let thunderAssets = document.querySelectorAll('meta[name="thunder-asset"]');
let thunders = [];

if (thunderAssets.length) {

  thunderAssets.forEach((i) => {
    thunders.push(i.content)
    Defer.dom(i.getAttribute('cloud'), 0, 'seen', function(node) {
      fireThunder(i.content)
    });
  })
}

window.thunder = () => {

  if (thunders.length) {
    thunders.map((link) => fireThunder(link))
  }
}
