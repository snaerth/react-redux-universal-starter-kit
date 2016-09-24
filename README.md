# React-redux-universal. Starter kit
Starter kit with server side rendering, eslint, less, stylelint and enzyme tests.

**Before working on a new project**

Change stuff in `package.json`.

## Install

```bash
$ npm install
```

## Run dev
```bash
$ npm run dev
```

## Run release
```bash
$ npm start
```

# Configuration make

### `target`
Specify which platform to target, currently accepts `"web"` (client), and `"node"` (server).

### `hot`
Boolean value to enable hot reloading on the client. Only works in development mode.

### `entry`
Path to an entry point for packaging. Will output the same name into `./build`.

### `debug`
Enable or disable debug mode. The production will always overwrite with `false`.

### `devtool`
Set the devtool sourcemapping. Defaults to `cheap-module-eval-source-map` for client and `eval-source-map` for server.

### `eslint`
Enable or disable eslinting of the javascript on runtime. Only in debug mode.

### `Special thanks to UENO`
This starter kit is mostly based on UENO starter kit. Thank you UENO
https://github.com/ueno-llc/starter-kit