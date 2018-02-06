
function displayStatus () {
  const accessToken = localStorage.getItem('accessToken');
  const expirationDate = new Date(Number.parseInt(localStorage.getItem('expirationDate')));
  const isExpired = expirationDate < new Date();
  let status;

  if (!accessToken) {
    status = 'There is no access token present in local storage, meaning that you are not logged in.';
  } else {
    status = 'There is an access token in local storage. <a href="#" onclick="checkSession()">Click to see if you also have a SSO Session</a>';
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

function getIdToken () {
  return localStorage.getItem('idToken');
}

function saveAuthResult (result) {
  localStorage.setItem('accessToken', result.accessToken);
  localStorage.setItem('idToken', result.idToken);
  localStorage.setItem('expirationDate', Date.now() + Number.parseInt(result.expiresIn) * 1000);
  displayStatus();
}

function checkSession () {
  auth0.getSSOData(function (err, ssoData) {
    if (!(ssoData && ssoData.sso === true)) {
      alert(`NO SSO Session exists!`);
      $('#app').hide();
      $('#logout').hide();
      $('#login').show();
    } else {
      alert(`SSO Session exists!`);
    }
  });
}

$(function () {
  $('#authenticate-embedded-customui').on('click', function (e) {
    e.preventDefault();
    $('#app').hide();
    $('#embedded-login-customui').show();
          // do the authentication
    $('#signin-db').on('click', function () {
      auth0.login({
        connection: AUTH0_CONNECTION,
        username: $('#email').val(),
        password: $('#password').val(),
        sso: true,
        audience: AUDIENCE
      }, function (err) {
        // this only gets called if there was a login error
        console.error('Portal LoginController Error: ' + err);
      });
    });
  });

  $('#sso-logout').click(function (e) {
    e.preventDefault();
    localStorage.clear();
    auth0.logout({ returnTo: 'http://app1.com:3000' });
  });

  $('#local-logout').click(function (e) {
    e.preventDefault();
    localStorage.clear();
    location.href = '/';
  });

  $('#get-profile-authentication-userinfo').on('click', function (e) {
    e.preventDefault();
    auth0.getProfile(getIdToken(), function (err, usrInfo) {
      if (err) {
        // handle error
        console.error('Failed to get userInfo');
        return;
      }
      $('#results pre').text(JSON.stringify(usrInfo, null, 2));
    });
  });

  // execute this code
  var result = auth0.parseHash(window.location.hash);
  if (result && result.accessToken) {
    saveAuthResult(result);
  } else if (result && result.error) {
    alert('error: ' + result.error);
  }
  // kick off display status
  displayStatus();
});
