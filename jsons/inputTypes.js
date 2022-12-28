export const text = {
  elements: [
    {
      name: "username",
      type: "text",
      title: "Username",
    },
    {
      name: "email",
      type: "text",
      title: "E-mail address",
      inputType: "email",
      placeholder: "foobar@example.com",
      isRequired: true,
      autocomplete: "email",
    },
    {
      name: "password",
      type: "text",
      title: "Password",
      description: "Enter 8 characters minimum.",
      inputType: "password",
      isRequired: true,
      autocomplete: "password",
      validators: [
        {
          type: "text",
          minLength: 8,
          text: "Your password must be at least 8 characters long.",
        },
      ],
    },
    {
      name: "url",
      type: "text",
      title: "URL",
      inputType: "url",
      placeholder: "https://www.example.com",
      validators: [
        {
          type: "regex",
          regex: "https://.*",
          text: "Your answer must match the URL pattern.",
        },
      ],
    },
  ],
  showQuestionNumbers: false,
};

export const date = {
  elements: [
    {
      name: "date",
      type: "text",
      title: "Select a future date",
      inputType: "date",
      defaultValueExpression: "today()",
      minValueExpression: "today()",
      isRequired: true,
    },
    {
      name: "date",
      type: "text",
      title: "Select a past date within 30 days before today",
      inputType: "date",
      minValueExpression: "today(-30)",
      maxValueExpression: "today()",
      isRequired: true,
    },
    {
      name: "time",
      type: "text",
      title: "Select a time between 09:00 and 18:00",
      inputType: "time",
      min: "09:00",
      max: "18:00",
      isRequired: true,
    },
    {
      name: "datetime-local",
      type: "text",
      title: "Select a date and time",
      inputType: "datetime-local",
      defaultValueExpression: "currentDate()",
    },
    {
      name: "month",
      type: "text",
      title: "Select a month",
      inputType: "month",
    },
    {
      name: "week",
      type: "text",
      title: "Select a week",
      inputType: "week",
    },
  ],
};

export const numeric = {
  elements: [
    {
      name: "number",
      type: "text",
      title: "Enter a number from 0 to 100",
      inputType: "number",
      min: 0,
      max: 100,
      defaultValue: 0,
      isRequired: true,
    },
    {
      name: "range",
      type: "text",
      title: "Select a value",
      inputType: "range",
      min: 0,
      max: 100,
      step: 10,
      defaultValue: 90,
    },
    {
      name: "phone",
      type: "text",
      title: "Enter a phone number",
      inputType: "tel",
      placeholder: "+0 (000) 000-00-00",
      autocomplete: "tel",
      validators: [
        {
          type: "regex",
          regex: "\\+[0-9]{1} \\([0-9]{3}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}",
          text: "Phone number must be in the following format: +0 (000) 000-00-00",
        },
      ],
    },
  ],
  showQuestionNumbers: false,
};


export const boolean = {
    "elements": [
      {
        "type": "boolean",
        "name": "bool",
        "title": "Please answer the question",
        "label": "Are you 21 or older?",
        "isRequired": true
      }
    ]
  };

  export const radio = {
    "elements": [
      {
        "type": "radiogroup",
        "name": "car",
        "title": "Which is the brand of your car?",
        "isRequired": true,
        "showNoneItem": true,
        "showOtherItem": true,
        "colCount": 1,
        "choices": [
          "Ford",
          "Vauxhall",
          "Volkswagen",
          "Nissan",
          "Audi",
          "Mercedes-Benz",
          "BMW",
          "Peugeot",
          "Toyota"
        ],
        "separateSpecialChoices": true,
        "showClearButton": true
      }
    ],
    "showQuestionNumbers": false
  };

  export const checkbox = {
    "elements": [
      {
        "type": "checkbox",
        "name": "car",
        "title": "Which is the brand of your car?",
        "description": "If you own cars from multiple brands, please select all of them.",
        "choices": [
          "Ford",
          "Vauxhall",
          "Volkswagen",
          "Nissan",
          "Audi",
          "Mercedes-Benz",
          "BMW",
          "Peugeot",
          "Toyota",
          "Citroen"
        ],
        "isRequired": true,
        "colCount": 2,
        "showNoneItem": true,
        "showOtherItem": true,
        "showSelectAllItem": true,
        "separateSpecialChoices": true
      }
    ],
    "showQuestionNumbers": false
  };

  export const file = {
    "elements": [
      {
        "type": "file",
        "title": "Please upload your photo",
        "name": "image",
        "storeDataAsText": false,
        "showPreview": true,
        "imageWidth": 150,
        "maxSize": 102400
      }
    ]
  };