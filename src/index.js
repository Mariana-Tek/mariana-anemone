import {
  get as getCookie,
  remove as removeCookie,
  set as setCookie,
} from "es-cookie";
import ClientOAuth2 from "client-oauth2";
import pkceChallenge from "pkce-challenge";

const AUTH_STATE_COOKIE_NAME = "mariana-auth-state";
const AUTH_CODE_VERIFIER_COOKIE_NAME = "mariana-auth-code-verifier";
const AUTH_SESSION_NAME = "mariana-auth-session";
const marianaAuth = new ClientOAuth2({
    clientId: "wiQQqf49D1acE2RHU5eCchNM36O6aMP2ceKFP5L7",
    accessTokenUri: "https://cousteau-r45kxk.marianatek.com/o/token/",
    authorizationUri: "https://cousteau-r45kxk.marianatek.com/o/authorize",
    redirectUri: window.location.origin,
    scopes: ["read:account"],
  });

function isAuthenticated() {
  const sessionData = JSON.parse(localStorage.getItem(AUTH_SESSION_NAME));

  return !!sessionData && !!sessionData.access_token;
}

async function authenticate(url, code) {
    const token = await marianaAuth.code.getToken(url, {
      body: {
        grant_type: "authorization_code",
        code,
        code_verifier: getCookie(AUTH_CODE_VERIFIER_COOKIE_NAME),
      },
    });
  
    removeCookie(AUTH_CODE_VERIFIER_COOKIE_NAME);
  
    const sessionData = {
      ...token.data,
      expired_at: token.expires.getTime(),
    };
  
    localStorage.setItem(AUTH_SESSION_NAME, JSON.stringify(sessionData));
  }

function redirect() {
    const { code_challenge, code_verifier } = pkceChallenge();
  
    const stateString = window.xprops.marianaRedirect;
  
    setCookie(AUTH_STATE_COOKIE_NAME, stateString, { expires: 1 });
    setCookie(AUTH_CODE_VERIFIER_COOKIE_NAME, code_verifier, { expires: 1 });
  
    const redirectUri = marianaAuth.code.getUri({
      state: stateString,
  
      query: {
        code_challenge: code_challenge,
        code_challenge_method: "S256",
      },
    });

    window.xprops.redirect(redirectUri);
  }

window.addEventListener("DOMContentLoaded", async () => {
  const url = new URL(location.href);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const isAuthenticating =
    code && state && state === getCookie(AUTH_STATE_COOKIE_NAME);

  removeCookie(AUTH_STATE_COOKIE_NAME);

  if (isAuthenticating) {
    await authenticate(url, code);

    if (window === window.parent) {
        window.location.assign(state);
    } else {
        history.pushState({}, document.title, window.location.origin);
    }
  }

  if (!isAuthenticated()) {
    redirect()
  }
});
