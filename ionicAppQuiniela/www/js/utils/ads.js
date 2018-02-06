(function() {
  'use strict';
  var admobData = {};
  // Determine platform
  if (/(android)/i.test(navigator.userAgent)) {
    admobData = {
      banner: 'ca-app-pub-2184234238287268/8548081235'
    };
  } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobData = {
      banner: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    };
  } else {
    admobData = {
      banner: 'ca-app-pub-2184234238287268/8548081235'
    };
  }
  function setBanner() {
    if (AdMob) {
      AdMob.createBanner({
        adId : admobData.banner,
        position : AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow : true
      });
    }
  }
  document.addEventListener('deviceready', setBanner, false);
}());
