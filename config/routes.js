const corsPolicy = {
  allRoutes: true,
  allowOrigins: ['https://myrltystaging.herokuapp.com','http://localhost:3001', 'http://localhost:3000', 'https://realtor-12.web.app', 'https://myrlty123.herokuapp.com', 'https://rlty-admin-panel.herokuapp.com', 'https://myrlty-admin-panel.web.app'],
  allowCredentials: true,
  allowHeaders: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  //allowHeaders: '*',
  allowRequestHeaders: 'content-type,datatype,authentication,authorization',
};

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'GET /ping': { cors: corsPolicy, action: 'ping' },

  'POST /api/v1/send-email': { cors: corsPolicy, action: 'mail/send' },
  'POST /api/v1/send-bulk-email': { cors: corsPolicy, action: 'mail/bulk' },

  [`GET /api/v1/admin/reports`]: { cors: corsPolicy, action: 'admin/reports/list' },
  [`POST /api/v1/admin/users`]: { cors: corsPolicy, action: 'admin/users/create' },
  [`GET /api/v1/admin/users`]: { cors: corsPolicy, action: 'admin/users/list' },
  [`GET /api/v1/admin/users/:id`]: { cors: corsPolicy, action: 'admin/users/get-one' },
  [`PUT /api/v1/admin/users/:id`]: { cors: corsPolicy, action: 'admin/users/update' },
  [`DELETE /api/v1/admin/users/:id`]: { cors: corsPolicy, action: 'admin/users/delete' },


  [`POST /api/v1/admin/notes`]: { cors: corsPolicy, action: 'admin/notes/create' },
  [`GET /api/v1/admin/notes`]: { cors: corsPolicy, action: 'admin/notes/list' },
  [`GET /api/v1/admin/notes/:id`]: { cors: corsPolicy, action: 'admin/notes/get-one' },
  [`PUT /api/v1/admin/notes/:id`]: { cors: corsPolicy, action: 'admin/notes/update' },
  [`DELETE /api/v1/admin/notes/:id`]: { cors: corsPolicy, action: 'admin/notes/delete' },


  [`POST /api/v1/admin/showings`]: { cors: corsPolicy, action: 'admin/showings/create' },
  [`GET /api/v1/admin/showings`]: { cors: corsPolicy, action: 'admin/showings/list' },
  [`GET /api/v1/admin/showings/:id`]: { cors: corsPolicy, action: 'admin/showings/get-one' },
  [`PUT /api/v1/admin/showings/:id`]: { cors: corsPolicy, action: 'admin/showings/update' },
  [`DELETE /api/v1/admin/showings/:id`]: { cors: corsPolicy, action: 'admin/showings/delete' },

  [`POST /api/v1/admin/faqs`]: { cors: corsPolicy, action: 'admin/faqs/create' },
  [`GET /api/v1/admin/faqs`]: { cors: corsPolicy, action: 'admin/faqs/list' },
  [`GET /api/v1/admin/faqs/:id`]: { cors: corsPolicy, action: 'admin/faqs/get-one' },
  [`PUT /api/v1/admin/faqs/:id`]: { cors: corsPolicy, action: 'admin/faqs/update' },
  [`DELETE /api/v1/admin/faqs/:id`]: { cors: corsPolicy, action: 'admin/faqs/delete' },

  [`POST /api/v1/admin/setting`]: { cors: corsPolicy, action: 'admin/setting/create' },
  [`GET /api/v1/admin/setting`]: { cors: corsPolicy, action: 'admin/setting/list' },
  [`GET /api/v1/admin/setting/:id`]: { cors: corsPolicy, action: 'admin/setting/get-one' },
  [`PUT /api/v1/admin/setting/:id`]: { cors: corsPolicy, action: 'admin/setting/update' },
  [`DELETE /api/v1/admin/setting/:id`]: { cors: corsPolicy, action: 'admin/setting/delete' },


  [`GET /api/v1/admin/properties`]: { cors: corsPolicy, action: 'admin/properties/list' },
  [`POST /api/v1/admin/properties`]: { cors: corsPolicy, action: 'admin/properties/create' },
  [`GET /api/v1/admin/properties/:id`]: { cors: corsPolicy, action: 'admin/properties/get-one' },
  [`PUT /api/v1/admin/properties/:id`]: { cors: corsPolicy, action: 'admin/properties/update' },
  [`DELETE /api/v1/admin/properties/:id`]: { cors: corsPolicy, action: 'admin/properties/delete' },


  [`GET /api/v1/admin/property_types`]: { cors: corsPolicy, action: 'admin/property_types/list' },

  //property buyers 
  [`GET /api/v1/admin/property_buyers`]: { cors: corsPolicy, action: 'admin/property_buyers/list' },
  [`POST /api/v1/admin/property_buyers`]: { cors: corsPolicy, action: 'admin/property_buyers/create' },
  [`GET /api/v1/admin/property_buyers/:id`]: { cors: corsPolicy, action: 'admin/property_buyers/get-one' },
  [`PUT /api/v1/admin/property_buyers/:id`]: { cors: corsPolicy, action: 'admin/property_buyers/update' },
  [`DELETE /api/v1/admin/property_buyers/:id`]: { cors: corsPolicy, action: 'admin/property_buyers/delete' },

  [`GET /api/v1/admin/property_sellers`]: { cors: corsPolicy, action: 'admin/property_sellers/list' },
  [`POST /api/v1/admin/property_sellers`]: { cors: corsPolicy, action: 'admin/property_sellers/create' },
  [`GET /api/v1/admin/property_sellers/:id`]: { cors: corsPolicy, action: 'admin/property_sellers/get-one' },
  [`PUT /api/v1/admin/property_sellers/:id`]: { cors: corsPolicy, action: 'admin/property_sellers/update' },
  [`DELETE /api/v1/admin/property_sellers/:id`]: { cors: corsPolicy, action: 'admin/property_sellers/delete' },

  //Subscriptions
  [`GET /api/v1/admin/subscriptions`]: { cors: corsPolicy, action: 'admin/subscriptions/list' },
  [`GET /api/v1/admin/subscriptions/:id`]: { cors: corsPolicy, action: 'admin/subscriptions/get-one' },
  [`PUT /api/v1/admin/subscriptions/:id`]: { cors: corsPolicy, action: 'admin/subscriptions/update' },
  

  [`POST /api/v1/admin/login`]: { cors: corsPolicy, action: 'auth/v1/login' },
  [`POST /api/v1/admin/forget-password`]: { cors: corsPolicy, action: 'auth/v1/admin/users/forget-password' },

  [`POST /api/v1/admin/forget-password/confirm-otp`]: { cors: corsPolicy, action: 'auth/v1/admin/users/forget-password/confirm-otp' },
  [`POST /api/v1/admin/forget-password/change-password`]: { cors: corsPolicy, action: 'auth/v1/admin/users/forget-password/change-password' },

  [`POST /api/v1/admin/logout`]: { cors: corsPolicy, action: 'auth/v1/logout' },

  "GET /api/v1/aws/sign-url": {
    action: "api/v1/aws/sign-url",
    cors: corsPolicy,
  },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // ===============================================
  //Authentication
  /**
   * send-otp - get email from user
   * inputs:
   *  - email
   *
   * process:
   *  - get email and send otp code for registration
   *
   * outputs:
   *  - success/error
   */
  'POST /auth/v1/send-otp': { cors: corsPolicy, action: 'auth/v1/send-otp' },
  /**
   * confirm-otp - 
   * inputs:
   *  - email
   *  - pasword
   *  - name
   *  - phone
   *  - otp
   *
   * process:
   *  - if otp is correct, register user
   *
   * outputs:
   *  - success/error
   */

  'POST /auth/v1/confirm-otp-login': { cors: corsPolicy, action: 'auth/v1/confirm-otp' },

  /**
  * user login - 
  * inputs:
  *  - email
  *  - password
  *
  * process:
  *  - send data to auth server to login user
  *
  * outputs:
  *  - success & data/error
  */

  'POST /auth/v1/confirm-otp': { cors: corsPolicy, action: 'auth/v1/confirm-otp' },

  'POST /api/v1/login': { cors: corsPolicy, action: 'api/v1/login' }, ///not using for login
  'POST /auth/v1/login': { cors: corsPolicy, action: 'auth/v1/login' },

  // social logins
  /**
   * social login - token and tokentype 
   * inputs:
   *  - token
   *  - tokentype
   *
   * process:
   *  - send token from facebook and linkedin, and from instagram get code. 
   *  - login user is response is success from auth server else throw error
   * outputs:
   *  - success/error
   */
  'POST /auth/v1/social-login': { cors: corsPolicy, action: 'auth/v1/social-login' },
  /**
   * inputs:
   *  - refresh token
   *
   * process:
   *  - get refresh token send it to auth server and get new token
   *
   * output:
   *  - new token
   */

  'POST /auth/v1/refresh-token': { cors: corsPolicy, action: 'auth/v1/refresh-token' },
  /**
   * inputs:
   *  - email
   *
   * process:
   *  - send email to auth serve and get otp
   *
   * outputs:
   *  - success/error
   */

  'POST /auth/v1/forget-password': { cors: corsPolicy, action: 'auth/v1/forget-password' },
  /**
   * inputs:
   *  - email
   *  - otp
   *
   * process:
   *  - send email and otp to auth server and get token
   *  - generate token and email in response
   *
   * outputs:
   *  - send email and token with succ
   */
  'POST /auth/v1/forget-password/confirm-otp': { cors: corsPolicy, action: 'auth/v1/forget-password/confirm-otp' },
  /**
   * forget-password
   * inputs:
   *  - email
   *  - token
   *  - password
   *
   * process:
   *  - confirm email and token
   *  - update encrypted password
   *
   * outputs:
   *  - success/error
   */
  'POST /auth/v1/forget-password/change-password': { cors: corsPolicy, action: 'auth/v1/forget-password/change-password' },
  /**
   * reset password - get email and new password
   * inputs:
   *  - email
   *  - password
   *
   * process:
   *  - send email and new password to auth server
   *  - change password
   * outputs:
   *  - success/error
   */

  'POST /auth/v1/reset-password': { cors: corsPolicy, action: 'api/v1/user/reset/user-pass-reset' },
  /**
   * Logout user - get token
   * inputs:
   *  - token
   *
   * process:
   *  - logout user by expiring token through auth server
   *
   * outputs:
   *  - success/error
   */
  'POST /auth/v1/logout': { cors: corsPolicy, action: 'auth/v1/logout' },



  //User Api
  'POST /api/v1/user/edit-profile': { cors: corsPolicy, action: 'api/v1/user/edit/profile-edit' },
  'POST /api/v1/user/post-registration': { cors: corsPolicy, action: 'api/v1/user/postregistration/post-registration' },


  //Proeprty API
  'POST /api/v1/user/add-property': { cors: corsPolicy, action: 'api/v1/user/propertylisting/propertylisting' },
  'POST /api/v1/user/edit-property': { cors: corsPolicy, action: 'api/v1/user/editproperty/editproperty' },

  'GET /api/v1/user/get-property': { cors: corsPolicy, action: 'api/v1/user/getproperty-listing/getproperty' },
  'GET /api/v1/user/get-property/:id': { cors: corsPolicy, action: 'api/v1/user/getpropertylistingbyid/propertylistingbyid' },

  'POST /api/v1/user/mark-favourite': { cors: corsPolicy, action: 'api/v1/property/mark-as-favourite/markasfavourite' },
  'POST /api/v1/user/add-buyer': { cors: corsPolicy, action: 'api/v1/logic/property/buyer' },
  'POST /api/v1/user/add-seller': { cors: corsPolicy, action: 'api/v1/logic/property/seller' },




  'POST /api/v1/user/is-sold': { cors: corsPolicy, action: 'api/v1/logic/property/issold' },

  'GET /api/v1/user/get-favourite-property': { cors: corsPolicy, action: 'api/v1/user/getallfavouriteproperties/getallfavouriteproperties' },

  'GET /api/v1/user/get-favourite-properties': { cors: corsPolicy, action: 'api/v1/user/getallfavouriteproperties/getallfavouriteproperties' },
  'GET /api/v1/user/search-favourite-property': { cors: corsPolicy, action: 'api/v1/user/searchfavouriteproperty/searchfavouriteproperty' },

  // 'POST /api/v1/user/mark-favourite': { cors: corsPolicy, action: 'api/v1/property/mark-as-favourite/markasfavourite' },
  'DELETE /api/v1/user/delete-property': { cors: corsPolicy, action: 'api/v1/user/deleteproperty/delete-property' },
  'GET /api/v1/user/search-property': { cors: corsPolicy, action: 'api/v1/user/searchproperty/searchproperty' },
  'GET /api/v1/user/search-buyer': { cors: corsPolicy, action: 'api/v1/user/searchbuyer/searchbuyer' },
  'GET /api/v1/user/search-seller': { cors: corsPolicy, action: 'api/v1/user/searchseller/searchseller' },
  'GET /api/v1/user/categories': { cors: corsPolicy, action: 'api/v1/user/categories/getcategories' },
  'GET /api/v1/user/user-profile': { cors: corsPolicy, action: 'api/v1/user/getprofile/getprofile' },

  'POST /api/v1/user/showings': { cors: corsPolicy, action: 'api/v1/user/showings/addshowing' },
  'GET /api/v1/user/showings': { cors: corsPolicy, action: 'api/v1/user/showings/getshowing' },
  'PUT /api/v1/user/showings': { cors: corsPolicy, action: 'api/v1/user/showings/updateshowing' },
  'DELETE /api/v1/user/showings': { cors: corsPolicy, action: 'api/v1/user/showings/deleteshowing' },

  'POST /api/v1/user/add-notes': { cors: corsPolicy, action: 'api/v1/user/addnotes/addnotes' },
  'PUT /api/v1/user/edit-notes': { cors: corsPolicy, action: 'api/v1/user/addnotes/editnotes' },
  'DELETE /api/v1/user/delete-notes': { cors: corsPolicy, action: 'api/v1/user/addnotes/deletenotes' },
  'GET /api/v1/user/get-all-notes': { cors: corsPolicy, action: 'api/v1/user/getshowing/getshowing' },
  'GET /api/v1/user/count-property': { cors: corsPolicy, action: 'api/v1/user/propertycounts/propertycounts' },
  'GET /api/v1/user/monthly-revenue': { cors: corsPolicy, action: 'api/v1/user/monthly-revenue/monthly-revenue' },
  'GET /api/v1/user/graph-api': { cors: corsPolicy, action: 'api/v1/user/graph-api/graph-api' },
  'GET /api/v1/user/get-setting': { cors: corsPolicy, action: 'api/v1/user/setting/get-setting' },
  'GET /api/v1/user/get-faqs': { cors: corsPolicy, action: 'api/v1/user/setting/get-faqs' },


  'POST /api/v1/device-token': { cors: corsPolicy, action: 'api/v1/device-token/save' },
  'POST /api/v1/allow-notification': { cors: corsPolicy, action: 'api/v1/allow-notification/toggle' },
  'GET /api/v1/get-notification-list': { cors: corsPolicy, action: 'api/v1/allow-notification/notification-listing' },
  'PUT /api/v1/is-open': { cors: corsPolicy, action: 'api/v1/allow-notification/is-open' },
  'GET /api/v1/is-open-count': { cors: corsPolicy, action: 'api/v1/allow-notification/is-open-count' },

  'PUT /api/v1/is-notification-open': { cors: corsPolicy, action: 'api/v1/allow-notification/is-notification-open' },

  'PUT /api/v1/user/sendnotification': { cors: corsPolicy, action: 'notification/send' },


  'GET /api/v1/user/mls/get': { cors: corsPolicy, action: 'api/v1/user/mls/get' },
  'GET /api/v1/property_types': { cors: corsPolicy, action: 'api/v1/property_types/get' },
  'GET /api/v1/notify': { cors: corsPolicy, action: 'api/v1/notify/get' },
  'GET /api/v1/report': { cors: corsPolicy, action: 'api/v1/user/report/report' },
  'GET /api/v1/report/get': { cors: corsPolicy, action: 'api/v1/user/report/get' },
  'GET /api/v1/report/test': { cors: corsPolicy, action: 'api/v1/user/report/test' },

  'GET /api/v1/subscription/get': { cors: corsPolicy, action: 'api/v1/user/subscriptions/get' },
  'POST /api/v1/subscription/purchase': { cors: corsPolicy, action: 'api/v1/user/subscriptions/purchase' },
  'POST /api/v1/subscription/apple-purchase': { cors: corsPolicy, action: 'api/v1/user/subscriptions/apple-purchase' },
  'POST /api/v1/subscription/google-purchase': { cors: corsPolicy, action: 'api/v1/user/subscriptions/google-purchase' },
  
  'POST /api/v1/subscription/cancel': { cors: corsPolicy, action: 'api/v1/user/subscriptions/cancel' },
  
  "POST /api/v1/test-payment" :{
    cors: corsPolicy,
    action: "api/v1/test-payment",
    },
    "POST /api/v1/stripe/webhook" :{
      cors: corsPolicy,
      action: "api/v1/stripe/webhook",
      },
  
  

};
