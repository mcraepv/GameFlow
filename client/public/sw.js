if (!self.define) {
  const e = (e) => {
      'require' !== e && (e += '.js');
      let r = Promise.resolve();
      return (
        t[e] ||
          (r = new Promise(async (r) => {
            if ('document' in self) {
              const t = document.createElement('script');
              (t.src = e), document.head.appendChild(t), (t.onload = r);
            } else importScripts(e), r();
          })),
        r.then(() => {
          if (!t[e]) throw new Error(`Module ${e} didn’t register its module`);
          return t[e];
        })
      );
    },
    r = (r, t) => {
      Promise.all(r.map(e)).then((e) => t(1 === e.length ? e[0] : e));
    },
    t = { require: Promise.resolve(r) };
  self.define = (r, s, i) => {
    t[r] ||
      (t[r] = Promise.resolve().then(() => {
        let t = {};
        const o = { uri: location.origin + r.slice(1) };
        return Promise.all(
          s.map((r) => {
            switch (r) {
              case 'exports':
                return t;
              case 'module':
                return o;
              default:
                return e(r);
            }
          })
        ).then((e) => {
          const r = i(...e);
          return t.default || (t.default = r), t;
        });
      }));
  };
}
define('./sw.js', ['./workbox-e1c51ee9'], function (e) {
  'use strict';
  e.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [{ url: 'index.html', revision: 'da6c846d56e29f3832c5957d6ae45c70' }],
      {}
    );
});
//# sourceMappingURL=sw.js.map
