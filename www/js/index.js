

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady(){

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

	window.plugins && window.plugins.socialsharing ? window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError) : onError("no plugin");
		
}

function scanBle(){
	
	let deviceList = [];

	const ble_success = () => {
		
		logit("BT enabled, scanning...");
		
		//fetch list of devices
		//ble.scan(services, seconds, success, failure);
		
		ble.startScan([], (device) => {
			logit(device);
			deviceList.push(device);
			redrawList(deviceList);
		}, () => display_ble("Bluetooth not enabled."));
		
	}
	
	const ble_failure = () => {
		//display ble not active
		display_ble("Bluetooth not enabled.");
	}
	
	ble.isEnabled(ble_success, ble_failure);
	
}

function redrawList(deviceList){
	
	let listView = "";
	
	deviceList.map((dev) => {
		listView += drawDevice(dev);
	});
	
	displayBle(listView);
}

function displayBle(str){
	
	document.getElementById("deviceList").innerHTML = str;
	
}

function drawDevice(obj){
	
	return `<div class='device' onClick='pairDevice()'>dev</div>`;
	
}