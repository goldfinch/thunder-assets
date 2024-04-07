## Use

thunder-assets.yml

```yml
---
Name: app-thunder-assets
---
Goldfinch\ThunderAssets\Thunder:
  registered_font: https://use.typekit.net/***
  registered_assets:
    themes/main/src/app.scss: true
    themes/main/src/app.js: true
    themes/main/src/vue.scss: "[app-form]"
    themes/main/src/vue.js: "[app-form]"
```

```js
window.thunderAssets['vue.scss'] = () => {}
window.thunderAssets['vue.js'] = () => {}
```
