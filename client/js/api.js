define(function() {
  var api, apiToken, domain, localMocks, port, prefix, protocol, suffix, userId, version;
  apiToken = "7dacd3f1efaed95b707174872d2b8497e576fd73";
  userId = 733958;
  localMocks = false;
  if (!localMocks) {
    protocol = "https";
    domain = "api.pipedrive.com";
    version = "v1";
    prefix = "" + protocol + "://" + domain + "/" + version + "/";
    suffix = "?api_token=" + apiToken;
  } else {
    protocol = "http";
    domain = "localhost";
    port = "7788";
    prefix = "" + protocol + "://" + domain + ":" + port + "/";
    suffix = "";
  }
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
    },
    getDealsCollectionUrl: function() {
      return "" + prefix + "deals" + suffix;
    },
    getStagesCollectionUrl: function() {
      return "" + prefix + "stages" + suffix;
    }
  };
});
