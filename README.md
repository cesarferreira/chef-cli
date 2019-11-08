
<h1 align="center">chef-cli</h1>
<p align="center">Quickly <i>convert</i> some (<i><strong>things</strong> into other <strong>things</strong></i>)</p>
<p align="center">
  <a href="https://travis-ci.org/cesarferreira/chef-cli"><img src="https://travis-ci.org/cesarferreira/chef-cli.svg?branch=master" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/chef-cli"><img src="https://img.shields.io/npm/dt/chef-cli.svg" alt="npm"></a>
  <a href="https://www.npmjs.com/package/chef-cli"><img src="https://img.shields.io/npm/v/chef-cli.svg" alt="npm"></a>
  <a href="https://github.com/cesarferreira/oh/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

<p align="center">
  <img src="extras/screenshot.png" width="100%" />
</p>

## Install

```sh
npm install -g chef-for-terminal
```

## Usage
Run the command and enjoy the app being opened where you want it, I use it all the time for `Android Studio` and `Source Tree`

```
Usage
   $ chef
```

## Create your own recipes:
```
   $ chef create "Kilometers to Miles"
```

a file `kilometers-to-miles.js` is created with:

```js
module.exports = {
    title: "Kilometers to Miles",
    execute: input => {
        return new Promise((resolve, reject) => {
            // TODO calculations with 'input'
            resolve(42);
        });
    }
}
```

All you have to o is replace the `execute` function with your own

## Created by
[Cesar Ferreira](https://cesarferreira.com)

## License
MIT © [Cesar Ferreira](http://cesarferreira.com)
