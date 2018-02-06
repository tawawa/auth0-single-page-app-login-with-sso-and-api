
function displayStatus () {
  const accessToken = localStorage.getItem('accessToken');
  const expirationDate = new Date(Number.parseInt(localStorage.getItem('expirationDate')));
  const isExpired = expirationDate < new Date();
  let status;

  if (!accessToken) {
    status = 'There is no access token present in local storage, meaning that you are not logged in. <a href="#" onclick="checkSession()">Click here to attempt an SSO login</a>';
  } else if (isExpired) {
    status = 'There is an expired access token in local storage. <a href="#" onclick="checkSession()">Click here to renew it</a>';
  } else {
    status = `There is an access token in local storage, and it expires on ${expirationDate}. <a href="#" onclick="checkSession()">Click here to renew it</a>`;
  }
  $('#status').html(status);

  if (accessToken && !isExpired) {
    $('#login').hide();
    $('#logout').show();
    $('#app').show();
  } else {
    $('#app').hide();
    $('#logout').hide();
    $('#login').show();
  }
}

function getAccessToken () {
  return localStorage.getItem('accessToken');
}

function saveAuthResult (result) {
  localStorage.setItem('accessToken', result.accessToken);
  localStorage.setItem('idToken', result.idToken);
  localStorage.setItem('expirationDate', Date.now() + Number.parseInt(result.expiresIn) * 1000);
  displayStatus();
}

function checkSession () {
  auth0WebAuth.checkSession({
    responseType: 'token id_token',
    timeout: 5000,
    usePostMessage: true
  }, function (err, result) {
    if (err) {
      alert(`Could not get a new token using silent authentication (${err.error}). Opening login page...`);
      $('#app').hide();
      $('#logout').hide();
      $('#login').show();
    } else {
      saveAuthResult(result);
    }
  });
}

$(function () {
  $('#authenticate-centralised').on('click', function (e) {
    e.preventDefault();
    $('#embedded-login-customui').hide();
    $('#app').hide();
    auth0WebAuth.authorize();
  });

  $('#authenticate-embedded-customui').on('click', function (e) {
    e.preventDefault();
    $('#app').hide();
    $('#embedded-login-customui').show();
          // do the authentication
    $('#signin-db').on('click', function () {
      auth0WebAuth.login({
        realm: AUTH0_CONNECTION,
        username: $('#email').val(),
        password: $('#password').val(),
        redirectUri: AUTH0_CALLBACK_URL,
        sso: true,
        scope: SCOPE
      }, function (err) {
        // this only gets called if there was a login error
        console.error('Portal LoginController Error: ' + err);
      });
    });
  });

  $('#sso-logout').click(function (e) {
    e.preventDefault();
    localStorage.clear();
    auth0WebAuth.logout({ returnTo: 'http://app1.com:3000' });
  });

  $('#local-logout').click(function (e) {
    e.preventDefault();
    localStorage.clear();
    location.href = '/';
  });

  $('#get-profile').on('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: `https://${AUTH0_DOMAIN}/userinfo`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + getAccessToken() },
      success: function (data) {
        $('#results pre').text(JSON.stringify(data, null, 2));
      }
    });
  });

  $('#get-profile-authentication-userinfo').on('click', function (e) {
    e.preventDefault();
    auth0Authentication.userInfo(getAccessToken(), (err, usrInfo) => {
      if (err) {
            // handle error
        console.error('Failed to get userInfo');
        return;
      }
      $('#results pre').text(JSON.stringify(usrInfo, null, 2));
    });
  });

  $('#get-profile-managementapi').on('click', function (e) {
    e.preventDefault();
    auth0WebAuth.checkSession({
      audience: `https://${AUTH0_DOMAIN}/api/v2/`,
      scope: 'read:current_user'
    },
          function (err, result) {
            if (!err) {
              var auth0Manage = new auth0.Management({
                domain: AUTH0_DOMAIN,
                token: result.accessToken
              });
              auth0Manage.getUser(result.idTokenPayload.sub, function (err, usrInfo) {
                if (!err) {
                  // use userInfo
                  $('#results pre').text(JSON.stringify(usrInfo, null, 2));
                } else {
                  // handle error
                }
              });
            } else {
                // handle error
            }
          }
        );
  });

  $('#get-contacts').on('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: `http://localhost:${CONTACTS_API_PORT}/api/contacts`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + getAccessToken() },
      success: function (data) {
        $('#results pre').text(JSON.stringify(data, null, 2));
      }
    });
  });

  $('#get-appointments').on('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: `http://localhost:${CALENDAR_API_PORT}/api/appointments`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + getAccessToken() },
      success: function (data) {
        $('#results pre').text(JSON.stringify(data, null, 2));
      }
    });
  });

  // execute this code
  auth0WebAuth.parseHash(window.location.hash, function (err, result) {
    if (result) {
      saveAuthResult(result);
    }
  });
  // kick off display status
  displayStatus();
});
