import marianaAnemone from "../..";

const config = {
    appId: "{MARIANA_APP_ID}",
    clientId: "{MARIANA_CLIENT_ID}",
    baseUrl: "{APP_URL}",
};

export const mariana = marianaAnemone.initialize(config);
