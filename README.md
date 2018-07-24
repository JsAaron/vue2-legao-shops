# vue webpack4 example

## NOTE
- now you can use [@vue/cli](https://github.com/vuejs/vue-cli) to create webpack4 project, dose not need this project.
- 现在你可以使用 [@vue/cli](https://github.com/vuejs/vue-cli) 直接创建webpack4项目，不必再看下面的了。

----------

This is example of Vue project with webpack4

## Usage

start use webpack4 by clone this repertory:

```bash
git clone --depth 1 https://github.com/joaner/vue-webpack4-example myproject
```

OR download package:

```bash
wget https://github.com/joaner/vue-webpack4-example/archive/master.tar.gz
tar -zxf vue-webpack4-example-master.tar.gz
cd vue-webpack4-example-master
npm install
```

### Start you project

```bash
vi package.json
npm run dev
```

---------

## Migrate from webpack<=3

If you project already use webpack3, you can run the command yourself to migrate:

### your existing webpack3 project

```bash
vue-init webpack vue-project
cd vue-project
npm install
```

### migrate to webpack4

`npm-check-updates` can automatically upgrade to the latest version without `^` rule.

```bash
npm install -g npm-check-updates
ncu -u
npm install extract-text-webpack-plugin@4.0.0-beta.0
npm install --force
```

## Performance

### webpack 3, split

```
Hash: 4cdb19b01343f490b110
Version: webpack 3.11.0
Time: 5680ms
                                                  Asset       Size  Chunks             Chunk Names
                  static/js/app.22682dd45c784aee5b30.js    11.5 kB       0  [emitted]  app
               static/js/vendor.e5e7ecee6f957e2703de.js    62.2 kB       1  [emitted]  vendor
             static/js/manifest.2ae2e69a05c33dfc65f8.js  857 bytes       2  [emitted]  manifest
    static/css/app.30790115300ab27614ce176899523b62.css  432 bytes       0  [emitted]  app
static/css/app.30790115300ab27614ce176899523b62.css.map  828 bytes          [emitted]
              static/js/app.22682dd45c784aee5b30.js.map    21.4 kB       0  [emitted]  app
           static/js/vendor.e5e7ecee6f957e2703de.js.map     324 kB       1  [emitted]  vendor
         static/js/manifest.2ae2e69a05c33dfc65f8.js.map    4.97 kB       2  [emitted]  manifest
                                             index.html  502 bytes          [emitted]

  Build complete.
```

### webpack 4

```
Hash: 117c844bc33f1d84ceb9
Version: webpack 4.1.1
Time: 4574ms
                                                  Asset       Size  Chunks             Chunk Names
               static/js/vendor.be41032cbe36be175db8.js   60.8 KiB       0  [emitted]  vendor
                  static/js/app.636944ff6ff64ab5f67c.js   12.2 KiB       1  [emitted]  app
    static/css/app.30790115300ab27614ce176899523b62.css  432 bytes       1  [emitted]  app
static/css/app.30790115300ab27614ce176899523b62.css.map  828 bytes          [emitted]
           static/js/vendor.be41032cbe36be175db8.js.map    316 KiB       0  [emitted]  vendor
              static/js/app.636944ff6ff64ab5f67c.js.map   25.7 KiB       1  [emitted]  app
                                             index.html  416 bytes          [emitted]
Entrypoint app = static/js/vendor.be41032cbe36be175db8.js static/js/vendor.be41032cbe36be175db8.js.map static/js/app.636944ff6ff64ab5f67c.js static/css/app.30790115300ab27614ce176899523b62.css static/js/app.636944ff6ff64ab5f67c.js.map
```

## Suggestion

welcome any idea...
