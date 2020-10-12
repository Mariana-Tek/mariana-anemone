const { create } = require("zoid/dist/zoid.js");

const xpropsError =
    "Could not establish connection with Mariana Tek Admin Application. Make sure to call createComponent().";

const validateXprops = () => {
    if (!window.xprops) {
        new Error(xpropsError);
    }
};

const redirect = (url) => {
    validateXprops();
    return window.xprops.navigation.redirect(url);
};

const goToClass = (classId) => {
    validateXprops();
    return window.xprops.navigation.goToClass(classId);
};

const goToProfile = (userId) => {
    validateXprops();
    return window.xprops.navigation.goToProfile(userId);
};

const initialize = (appId, clientId, baseUrl) => {
    if (!appId) throw new Error("An appId is required");
    if (!clientId) throw new Error("A clientId is required");
    if (!baseUrl) throw new Error("A baseUrl is required");

    const createComponent = () => {
        create({
            tag: appId,
            url: baseUrl,
        });
    };

    const getToken = () => {
        validateXprops();
        return window.xprops.auth.getToken(clientId);
    };

    return {
        createComponent,
        auth: { getToken },
        navigation: {
            redirect,
            goToClass,
            goToProfile,
        },
    };
};

module.exports = { initialize };
