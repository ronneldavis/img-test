# Canvas Libraries Test

This project demonstrates the usage of three different canvas libraries in Node.js:

- node-canvas
- @napi-rs/canvas
- skia-canvas

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

## Usage

The server provides three endpoints, each using a different canvas library to generate the same house drawing:

1. [http://localhost:3000/node-canvas](http://localhost:3000/node-canvas) - Uses node-canvas
2. [http://localhost:3000/napi-canvas](http://localhost:3000/napi-canvas) - Uses @napi-rs/canvas
3. [http://localhost:3000/skia-canvas](http://localhost:3000/skia-canvas) - Uses skia-canvas

Each endpoint will return a PNG image of a simple house drawing. You can open these URLs in your browser to see the generated images.
