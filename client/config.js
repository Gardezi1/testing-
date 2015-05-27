Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'type',
        showFieldLabel: false,      // If true, fieldLabel will be shown before radio group
        fieldLabel: 'User Type',
        inputType: 'radio',
        radioLayout: 'vertical',    // It can be 'inline' or 'vertical'
        data: [{                    // Array of radio options, all properties are required
            id: 1,                  // id suffix of the radio element
            label: 'Doctor',          // label for the radio element
            value: 'doctor'              // value of the radio element, this will be saved.
          }, {
            id: 2,
            label: 'Advisor',
            value: 'advisor',
        }],
        validate: function(value, errorFunction){
          if (!value) {
            errorFunction("Please select user type.");
            return false;
          } else {
            return true;
          }
        },
        visible: true
    }, {
        fieldName: 'terms',
        fieldLabel: 'I accept the terms and conditions',
        inputType: 'checkbox',
        visible: true,
        validate: function(value, errorFunction){
          if (value != 'true') {
            errorFunction("You must accept the terms and conditions.");
            return false;
          } else {
            return true;
          }
        },
        saveToProfile: false
    }]
});