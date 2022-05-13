
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
   
}

function share(data, url){
	
	logit("Starting share plugin...");
	
	const options = {
	  message: 'share this', // not supported on some apps (Facebook, Instagram)
	  subject: 'Subject', // fi. for email
	 // files: [], // an array of filenames either locally or remotely
	  url: url,
	 // chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
	 // appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
	  //iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
	};

	const onSuccess = function(result) {
	
	};

	const onError = function(msg) {
	  console.log("Sharing failed: " + msg);
	};

	window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
		
}