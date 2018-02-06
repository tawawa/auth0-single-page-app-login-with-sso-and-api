# Auth0 Single Page App Login With Sso And Api

This is the ultimate OIDC / Oauth2 demonstration starter app for Single Page App integration with Auth0.
The purpose of this sample, is a one-stop shop for illustrating (using plain HTML and JavaScript with a splash of Node.js):

1. Embedded Custom UI Login usage
2. Centralised Login usage
3. Silent Authentication for tokens refresh (checkSession) 
4. Single Sign-On usage
5. Single Sign-Out usage
6. Local Sign-Out usage
7. Calling Auth0 userinfo api endpoint (raw URL)
8. Usage of Auth0.js Authentication Client for userinfo api endpoint
9. Usage of Auth0.js Management Client library 
10. Calling two different external APIs using same Resource API and different scopes (using JWT Access Token)

This application demonstrates the usage of a single Resource Server with namespaced scoping representing multiple APIs. This sample consists of:

- 2 Node.js APIs: `contacts` and `calendar` (you can think of them as microservices);
- 1 Resource Server representing the 2 APIs;
- 2 Namespaced scopes: `read:contacts` and `read:calendar`;
- The Code Authorization Grant flow to obtain an `access_token` that works for both APIs


## Setup

### Dashboard

You will need to create an API using the Auth0 Dashboard called `organiser Service` with the unique identifier `organise` (this is later used in the `audience` parameter of your Authorization URL).

The API needs two namespaced scopes:

* `read:contacts`
* `read:calendar`

Also need to 

- Switch `Skip User Consent off` for the Organize Resource Server in Auth0 Dashboard
- Switch on `Allow Online Access` for the Organise Resource Server in Auth0 Dashboard

Create a single page application Client.

Under settings ensure you have:

Client-Type: Single Page App

Allowed Callback URLs:
 - http://app1.com:3000

Allowed Web Origins:
 - http://app1.com:3000

Allowed Logout URLs
 - http://app1.com:3000

Under Advanced Settings -> Oauth, switch ON the OIDC Conformant toggle.

Under Tenant Settings -> Advanced, add `http://app1.com:3000` to Allowed Logout URLs


### Locally

Add:

```
127.0.0.1  app1.com
```

to your `/etc/hosts` file.

This is important, all references locally are to `app1.com` and not `localhost`.
Required for cross-origin and SSO to work properly.


## Running the Sample

Install the dependencies.

```bash
npm install
```

Rename `.env.example` to `.env`. Replace `AUTH0_DOMAIN` with your own values.

Finally, under  `public -> javascript`, open `auth0-variables.js` 
and update `AUTH0_CLIENT_ID` and `AUTH0_DOMAIN` with your own settings.

Example values:

```
const AUTH0_CLIENT_ID = 'zalZ1MTxYGmq72QYJ3fhsMl13Z5xfZga';
const AUTH0_DOMAIN = 'demonstration.auth0.com';
```

If you don't yet have an Auth0 account, [sign up](https://auth0.com/signup) for free.

```bash
# copy configuration and replace with your own
cp .env.example .env
```

## Enable Cross Origin Authentication

In order to be able to log-in with user and password you need to make sure you take into account the details explained in the [Cross Origin Authentication documentation](https://auth0.com/docs/cross-origin-authentication). 


## Run the Application

Run the application by executing the command below.

```bash
npm start
```

The app will be served at `http://app1.com:3000`.

Two APIs are also running on ports `3001` and `3002`


## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
