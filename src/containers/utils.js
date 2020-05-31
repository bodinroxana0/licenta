const initAuth = () => {
    return window.gapi.auth2.init({
      client_id: "443094691967-2j7a99kuh7puj3dvb7m7f9i40j6lcjr3.apps.googleusercontent.com", //paste your client ID here
      scope: "https://www.googleapis.com/auth/analytics.readonly",
    });
  };