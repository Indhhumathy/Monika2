// // Header
// var oHeader = {alg: 'HS256', typ: 'JWT'};
// // Payload
// var oPayload = {};
// var tNow = KJUR.jws.IntDate.get('now');
// var tEnd = KJUR.jws.IntDate.get('now + 1day');
// oPayload.iss = "http://foo.com";
// oPayload.sub = "mailto:mike@foo.com";
// oPayload.nbf = tNow;
// oPayload.iat = tNow;
// oPayload.exp = tEnd;
// oPayload.jti = "id123456";
// oPayload.aud = "http://foo.com/employee";
// // Sign JWT, password=616161
// var sHeader = JSON.stringify(oHeader);
// var sPayload = JSON.stringify(oPayload);
// var sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "616161");


function signToken(options){
  // Header
  var oHeader = {alg: 'HS256', typ: 'JWT'};
  // Payload
  var oPayload = {};
  var tNow = KJUR.jws.IntDate.get('now');
  var tEnd = KJUR.jws.IntDate.get('now + 1day');
  oPayload.iss = options.clientId;
  oPayload.sub = options.identity;
  oPayload.iat = tNow;
  oPayload.exp = tEnd;
  oPayload.aud = options.aud || "https://idproxy.kore.com/authorize";
  oPayload.isAnonymous = options.isAnonymous || false;
  oHeader.fName = options.fName;
  oHeader.lName = options.lName;
  // Sign JWT
  var sHeader = JSON.stringify(oHeader);
  var sPayload = JSON.stringify(oPayload);
  var sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, options.clientSecret);
  return sJWT;
}