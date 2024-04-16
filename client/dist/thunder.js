/*!@shinsenter/defer.js@3.8.0*/(function(n,c,l){function d(e,t,s,i){A?G(e,t):(1<(s=s===l?d.lazy:s)&&(i=e,g.push(e=function(){i&&(i(),i=l)},s)),(s?x:g).push(e,Math.max(s?350:0,t)))}function j(e){return typeof(e=e||{})=="string"?{id:e}:e}function f(e,t,s,i){h(t.split(" "),function(r){(i||n)[e+"EventListener"](r,s||J)})}function h(e,t){e.map(t)}function v(e,t){h(H.call(e.attributes),function(s){t(s.name,s.value)})}function k(e,t,s,i,r,u){if(r=y.createElement(e),s&&f(w,m,s,r),t)for(u in t)r[O](u,t[u]);return i&&y.head.appendChild(r),r}function T(e,t){return H.call((t||y).querySelectorAll(e))}function b(e,t){h(T("source,img",e),b),v(e,function(s,i,r){(r=K.exec(s))&&e[O](r[1],i)}),typeof t=="string"&&(e.className+=" "+t),e[m]&&e[m]()}function q(e,t,s){d(function(i){h(i=T(e||"script[type=deferjs]"),function(r,u){r[D]&&(u={},v(r,function(a,o){a!=B&&(u[a==D?"href":a]=o)}),u.as=E,u.rel="preload",k(z,u,l,n))}),function r(u,a,o){(u=i[S]())&&(a={},v(u,function(p,C){p!=B&&(a[p]=C)}),o=a[D]&&!("async"in a),(a=k(E,a)).text=u.text,u.parentNode.replaceChild(a,u),o?f(w,m+" error",r,a):r())}()},t,s)}function J(e,t){for(t=A?(f(N,L),x):(f(N,M),A=d,x[0]&&f(w,L),g);t[0];)G(t[S](),t[S]())}var K=/^data-(.+)/,z="link",E="script",m="load",I="pageshow",w="add",N="remove",L="touchstart mousemove mousedown keydown wheel",M="on"+I in n?I:m,O="setAttribute",S="shift",D="src",B="type",F=n.IntersectionObserver,y=n.document,A=/p/.test(y.readyState),g=[],x=[],G=n.setTimeout,H=g.slice;d.all=q,d.dom=function(e,t,s,i,r){d(function(u){function a(o){i&&i(o)===!1||b(o,s)}u=F?new F(function(o){h(o,function(p,C){p.isIntersecting&&(u.unobserve(C=p.target),a(C))})},r):l,h(T(e||"[data-src]"),function(o){o[c]||(o[c]=d,u?u.observe(o):a(o))})},t,!1)},d.css=function(e,t,s,i,r){(t=j(t)).href=e,t.rel="stylesheet",d(function(){k(z,t,i,n)},s,r)},d.js=function(e,t,s,i,r){(t=j(t)).src=e,d(function(){k(E,t,i,n)},s,r)},d.reveal=b,n[c]=d,A||f(w,M),q()})(globalThis,"Defer");Defer.lazy=!0;Defer.all('script[type="thunder"]');Defer.all('script[type="thunder-strike"]',250,!1);window.thunderAssets=[];window.thunderAssetsCalled=[];var pastThunders=[];function detectAndCallThunderAssets(link){let kname=link.split("."),kformat=link.split(".");if(kname&&kname.length&&(kname=kname[0].split("/"),kname&&(kname=kname.splice(-1),kname&&kname.length&&(kname=kname[0].split("-"),kname&&kname.length&&(kname=kname[0])))),kformat&&kformat.length&&(kformat=kformat[1]),kname&&kformat){let kk=kname+"."+kformat,callback=window.thunderAssets[kk];typeof callback=="function"&&!window.thunderAssetsCalled[kk]&&window.thunderAssets&&(eval("callback()"),window.thunderAssetsCalled[kk]=!0)}}function thunderStrike(n){if(n&&!pastThunders.includes(n)){let c=n.split(".").pop();if(c=="js"){let l=document.createElement("script");l.src=n,l.type="module",l.onload=()=>detectAndCallThunderAssets(n),document.documentElement.firstChild.appendChild(l),pastThunders.push(n)}else if(c=="css"||c=="scss"||c=="sass"||c=="less"){let l=document.createElement("link");l.rel="stylesheet",l.href=n,l.onload=()=>detectAndCallThunderAssets(n),document.documentElement.firstChild.appendChild(l),pastThunders.push(n)}}}function fireThunder(n){n.split(",").length>1?n.split(",").forEach(c=>{thunderStrike(c)}):thunderStrike(n)}let thunderAssets=document.querySelectorAll('meta[name="thunder-asset"]'),thunders=[];thunderAssets.length&&thunderAssets.forEach(n=>{thunders.push(n.content),Defer.dom(n.getAttribute("cloud"),0,"seen",function(c){fireThunder(n.content)})});window.thunder=()=>{thunders.length&&thunders.map(n=>fireThunder(n))};
