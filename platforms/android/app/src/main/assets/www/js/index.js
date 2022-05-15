


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady(){
	
    logit('Running cordova-' + cordova.platformId + '@' + cordova.version);
    window.bluetoothle.initialize(() => {}, {"request": true, "statusReceiver": false, "restoreKey" : "bluetoothleplugintest" });
    window.bluetoothle.enable(() => logit("ble enabled!"), () => logit("ble disabled"));
	
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
	  logit("Share failed: " + msg);
	};
	
	//logit(window.plugins);
	window.plugins && window.plugins.socialsharing ? window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError) : onError("no plugin");
		
}

function notice(){
logit("= Scanning...");	
setTimeout(notice,5500);
}

function scanBle(){
	
	let deviceList = [];
	
	logit("starting scan...");
	
	if(typeof ble === "undefined"){
		ble = window.bluetoothle;
	}
	
	if(!ble)logit("ble plugin not loaded or allowed.");
	
	const ble_success = () => {
		
		logit("BT enabled, scanning...");
		
		//fetch list of devices
		//ble.scan(services, seconds, success, failure);
		notice();
		ble.startScan( (device) => {
			logit("found device:");
			logit(device);
			if(device.status != "scanStarted"){
				deviceList.push(device);
				redrawList(deviceList);
			}
			
		}, (str) => ble_failure(str),{CALLBACK_TYPE_ALL_MATCHES : 1} );
		
		
	}
	
	const ble_failure = (str) => {
		logit(str);
		displayBle("Bluetooth not enabled.");
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
	//logit(str);
	document.getElementById("deviceList").innerHTML = str;
	
}

function drawDevice(obj){
	logit(obj);
	return `<div class='device' onClick='pairDevice("`+obj.name+`")'>`+obj.name+`</div>`;
	
}

function pairDevice(id){
	
logit("try to pair w "+id+" ....");	
	
}
