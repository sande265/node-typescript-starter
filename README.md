<div align="center">
  <img src="https://www.freepnglogos.com/uploads/javascript-png/javascript-nodejs-logo-27.png" width="55" alt="Node.JS" />
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png"
    width="55"
    alt="TypeScript"
  />
  <img
    src="https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png"
    width="55"
    alt="JavaScript"
  />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ESLint_logo.svg/324px-ESLint_logo.svg.png?20211012234406" width="55" alt="Eslint" />
  <img
    src="https://seeklogo.com/images/P/prettier-logo-D5C5197E37-seeklogo.com.png"
    width="55"
    alt="Prettier"
  />
</div>

## Don't forget give me a star if you like it 😅😅 😊😊

The 2nd project what I did with Nodejs, Express & TypeScript.

- Node.js
- Express
- Concurrently
- Typescript

## Security

Generate Private key & Public Key for the app to authenticate using the keys generated to sign the token.

```bash
openssl genrsa -des3 -out private.pem 2048
```

then generate public key from private.pem

```bash
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```

Optional Rename the keys with extenstion .key

## Environment variables used patter

```javascript
PORT=// Your app port here for development
SECRET=// app secret used to sign the keys (Required)
TOKEN_EXP=// Token expiry time in seconds, default=3600
RT_EXPIRY=// Refresh token expiry time in seconds, default=2*TOKEN_EXPIRY
DB_USER=// MongoDB Username
DB_PASS=// MongoDB Password
DB_PORT=// MongoDB Server Port
DB_HOST=// Atlas DB url or your hosted url endpoint
```

To use the environment variables use dotenv.config() to access the values or else it's undefined!

Use the package manager [YARN] or [NPM] to install [Simplify Leave App].\
First, Install API image classification: [Here](https://github.com/iamvucms/ImageClassifyAPI/blob/master/README.md#installation)\
Edit src/constant/index.ts

```bash
git clone https://github.com/sande265/node.git
cd simplify-leave
yarn install
```

## Installation
```bash
npm install -g nodemon
npm install -g ts-node
npm install -g typescript
npm install
```

## Usage

```bash
yarn dev // using concurrently to compile TS to JS & run dev server.
yarn build // For production


```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
