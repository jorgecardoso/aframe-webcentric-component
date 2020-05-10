## aframe-webcentric-component

[![Version](http://img.shields.io/npm/v/aframe-webcentric-component.svg?style=flat-square)](https://npmjs.org/package/aframe-webcentric-component)
[![License](http://img.shields.io/npm/l/aframe-webcentric-component.svg?style=flat-square)](https://npmjs.org/package/aframe-webcentric-component)

Web-Centric functionality for A-Frame

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-webcentric-component@1.0.0/dist/aframe-webcentric-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity webcentric="foo: bar"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-webcentric-component
```

Then require and use.

```js
require('aframe');
require('aframe-webcentric-component');
```
