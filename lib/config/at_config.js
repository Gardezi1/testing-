//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn', {redirect: '/articles',});
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail', {redirect: '/verify',});

// Options
AccountsTemplates.configure({
    //defaultLayout: 'emptyLayout',
    showForgotPasswordLink: true,
    overrideLoginErrors: false,
    enablePasswordChange: true,
    sendVerificationEmail: true,

    enforceEmailVerification: true,
    //confirmPassword: true,
    //continuousValidation: false,
    //displayFormLabels: true,
    //forbidClientAccountCreation: false,
    //formValidationFeedback: true,
    //homeRoutePath: '/',
    //showAddRemoveServices: false,
    //showPlaceholders: true,

    negativeValidation: true,
    positiveValidation:true,
    negativeFeedback: false,
    positiveFeedback:false,

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',
});

AccountsTemplates.addFields([
  {
      _id: 'name',
      type: 'text',
      displayName: "Name",
      required: true,
  },
  {
      _id: 'phone',
      type: 'tel',
      displayName: "Phone",
      required: true
  },
  {
      _id: "type",
      type: "select",
      required: true,
      select: [
          {
          text: "Doctor",
          value: "doctor",
        }, {
          text: "Advocate",
          value: "advocate",
        }
      ]
  }
]);
