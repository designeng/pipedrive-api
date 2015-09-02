define(function() {
  var api, apiToken, domain, port, prefix, protocol, suffix, userId;
  protocol = "http";
  domain = "localhost";
  port = "7788";
  apiToken = "7dacd3f1efaed95b707174872d2b8497e576fd73";
  userId = 733958;
  prefix = "" + protocol + "://" + domain + ":" + port + "/";
  suffix = "?api_token=" + apiToken;
  return api = {
    getSuffix: function() {
      return suffix;
    },
    getProfilesCollectionUrl: function() {
      return "" + prefix + "persons" + suffix;
    },
    getPersonDealsUrl: function(personId) {
      return "" + prefix + "persons/" + personId + "/deals" + suffix;
    },
    getUserCornerUrl: function() {
      return "" + prefix + "users/733958" + suffix;
    },
    getOrganizationsUrl: function() {
      return "" + prefix + "organizations" + suffix;
    }
  };
});
