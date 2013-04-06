/*
This class contains all the model objects corresponding to the DB schema.
Communication between UI and Backend services are to be done using these objects.
*/

{"Cust_ID":999,"name":"fundu","email":"chaitanya118@gmail.com","gender":true,"is_retailer":true,"phone":"0123456789","zipcode":"333031","retailer_passcode":1234,"Promo_Code":5678,"is_offers":1}

exports.user = {
  user_id: -1,
  name: "",
  email: "",
  gender: true,
  is_retailer: false,
  phone: "",
  zipcode: "",
  retailer_passcode: 1234,
  Promo_Code: 5678,
  is_offers: 1
};
