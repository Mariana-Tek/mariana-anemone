import * as zoid from 'zoid/dist/zoid.js';

const redirect = (url) => {
    return window.xprops.navigation.redirect(url);
}

const goToClass = (classId) => {
    return window.xprops.navigation.goToClass(classId);
}

const goToProfile = (userId) => {
    return window.xprops.navigation.goToProfile(userId);
}

const initialize = (config) => {
    if (!config) throw new Error('A config object is required');

    const { appId, clientId, baseUrl } = config;

    if (!appId) throw new Error('An appId is required');
    if (!clientId) throw new Error('A clientId is required');
    if (!baseUrl) throw new Error('A baseUrl is required');

    const createComponent = () => {
        zoid.create({
            tag: appId,
            url: baseUrl
        })
    }

    const getToken = () => {
        return window.xprops.auth.getToken(clientId)
    };

    return {
        createComponent,
        auth: { getToken },
        navigation: {
            redirect,
            goToClass,
            goToProfile,
        }
    };
}

export default { initialize };



