# Mariana Anemone
An SDK for building Embedded Apps with Mariana Tek.

## Installation

Coming soon

## Documentation

Full reference: https://marianatek.com/developers/guides/mariana-anemone

## Running the example app
*Note:* This example application will only function when loaded within a sandbox for the Mariana Tek Admin Application where a test Embedded App is installed. If you 
have an idea for a new Embedded App and don't have a sandbox or a test Embedded App installed yet, contact <partners@marianatek.com>.

1. Go to the root of the example app and install dependencies:
```
cd example
npm install
```

2. Update the value of `config` in example/src/utils.js with the correct values for your app:
```js
const config = {
    appId: "{MARIANA_APP_ID}", // the app ID configured for your app
    clientId: "{MARIANA_CLIENT_ID}", // the sandbox client ID for your app
    baseUrl: "{APP_URL}", // when running this locally, this should be http://localhost:1234
};
```

3. Spin up the application:
```
npm start
```

