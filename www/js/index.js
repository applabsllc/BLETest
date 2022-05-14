
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    logit('Running cordova-' + cordova.platformId + '@' + cordova.version);
   
}

function share(data, url){
	
	logit("Starting share plugin...");
	
	const options = {
	  message: data,
	  subject: 'Shared from BLEApp',
	  url: url,
	};

	const onSuccess = function(result) {
		logit("Share success!!");
	};

	const onError = function(msg) {
	  console.log("Share failed: " + msg);
	};

	window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
		
}