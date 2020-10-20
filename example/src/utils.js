import marianaAnemone from "@mariana-tek/anemone";

const config = {
    appId: "example-app-local-dev", // the app ID configured for your app
    clientId: "example_app_local_client_id", // the sandbox client ID for your app
    baseUrl: "http://localhost:1234", // the url for this app when running locally
};

export const mariana = marianaAnemone.initialize(config.appId, config.clientId, config.baseUrl);
