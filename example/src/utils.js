import marianaAnemone from "../..";

const config = {
    appId: "{MARIANA_APP_ID}", // the app ID configured for your app
    clientId: "{MARIANA_CLIENT_ID}", // the sandbox client ID for your app
    baseUrl: "{APP_URL}", // when running this locally, this should be http://localhost:1234
};

export const mariana = marianaAnemone.initialize(config.appId, config.clientId, config.baseUrl);
