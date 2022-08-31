    //VALIDATE
// include('just-validate3.3.3.min.js');

const validationAbout = new JustValidate('.about__form', {
  errorFieldCssClass: 'is-invalid',
  errorLabelStyle: {
    color: '#f06666',
  },
});
validationAbout
  .addField('.about__input', [
    {
      rule: 'required',
      errorMessage: 'Введите e-mail',
    },
    {
      rule: 'email',
      errorMessage: 'Недопустимый формат',
    },
  ]);

  const validationContacts = new JustValidate('.callback__form', {
    errorFieldCssClass: 'is-invalid',
    errorLabelStyle: {
      color: '#FF3030',
    },
  });
  validationContacts
    .addField('.name-input', [
      {
        rule: 'customRegexp',
        value: /^[a-zA-Zа-яА-Яё]/,
        errorMessage: 'Недопустимый формат',
      },{
        rule: 'required',
        errorMessage: 'Введите ваше имя',
      },
    ])
    .addField('.email-input', [
      {
        rule: 'required',
        errorMessage: 'Введите e-mail',
      },
      {
        rule: 'email',
        errorMessage: 'Недопустимый формат',
      },
    ]);