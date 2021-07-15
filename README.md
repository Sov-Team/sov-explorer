# Sovryn RSK explorer Frontend

## Sovrython Presentation Slides

Sovryn RSK Explorer has been developped for Sovrython.

Please check project our [submission presentation slides](https://docs.google.com/presentation/d/e/2PACX-1vROnWX2s_TMBGtNRx_oPDXR6xKXIbuRzSd9gkiQBfgJyKGyYoJshWSTut3v2E4pcvLSMKagbCNLlY5s/pub?start=false&loop=false&delayms=30000&slide=id.ge2e28a2853_0_290)

## Description

  Web client for [sov-explorer-api](https://github.com/Sov-Team/sov-explorer-api)

  Sovryn RSK explorer is an enhanced fork of [RSK explorer](https://github.com/rsksmart/rsk-explorer)

  Check the [changelogs](https://github.com/rsksmart/rsk-explorer/compare/master...Sov-Team:master) to view the diff between this fork and the original RSK explorer.

## Tasks

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# serve with tracking
npm run dev-with-tracking

# build for production with minification
npm run build

# build for production with google tracking and hotjar 
# you must set the GA-TAG and HOTJAR_ID first, see 'Settings'
npm run build-with-tracking

```

## Deployment

### Install dependencies

``` bash
npm install
```

### Settings

The configuration is provided through this environment variables:

- **WS_URL**: sov-explorer-api WS url (backend)
- **STATS_URL**: rsk stats web (link redirect the 'stats' link)
- **GA_TAG**: (optional) Google analytics tag.
- **HOTJAR_ID**: (optional) Hotjar ID.

E.g. *to change the backend url :*

``` shell
export WS_URL=wss://explorer-api.sovryn.tech
```

### Building for production

``` shell
npm run build
```

Serve ./dist folder on web server

### HTTP Server configuration

The client uses [vue-router HTML 5 History mode](https://router.vuejs.org/en/essentials/history-mode.html), this requires a special configuration of the web server:

nginx:

``` javascript
location / {
  try_files $uri $uri/ /index.html;
}
```

#### Double slashed paths

Double slashed paths fail on router resolution

E.g. *https://explorer.sovryn.tech//block/3505358*
To avoid this errors use the HTTP Server to rewrite the paths.

nginx:

``` javascript
merge_slashes off;
rewrite ^(.*?)//+(.*?)$ $1/$2 permanent;
```
