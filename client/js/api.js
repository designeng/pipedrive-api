define(function() {
  var api, apiToken, domain, prefix, protocol, suffix, version;
  protocol = "https";
  domain = "api.pipedrive.com";
  version = "v1";
  apiToken = "7dacd3f1efaed95b707174872d2b8497e576fd73";
  prefix = "" + protocol + "://" + domain + "/" + version + "/";
  suffix = "?api_token=" + apiToken;
  return api = {
    getProfilesCollectionUrl: function() {
      return "" + prefix + "persons" + suffix;
    }
  };
});
