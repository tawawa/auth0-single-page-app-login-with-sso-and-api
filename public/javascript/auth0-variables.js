
const AUTH0_CLIENT_ID = 'zalZ1MTxYGmq72QYJ3fhsMl13Z5xfZga';
const AUTH0_DOMAIN = 'demonstration.auth0.com';
const AUDIENCE = 'organise';
const SCOPE = 'openid profile email read:contacts read:calendar';
const AUTH0_CALLBACK_URL = 'http://app1.com:3000';
const AUTH0_CONNECTION = 'Username-Password-Authentication';
const CONTACTS_API_PORT = '3001';
const CALENDAR_API_PORT = '3002';

const auth0WebAuth = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  redirectUri: AUTH0_CALLBACK_URL,
  responseType: 'id_token token',
  audience: AUDIENCE,
  scope: SCOPE
});

const auth0Authentication = new auth0.Authentication({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID
});
