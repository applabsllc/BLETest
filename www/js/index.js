


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady(){
	
    logit('Running cordova-' + cordova.platformId + '@' + cordova.version);
    bluetoothle.initialize(() => {}, {"request": true, "statusReceiver": false, "restoreKey" : "bluetoothleplugintest" });
    bluetoothle.enable(() => logit("ble enabled!"), () => logit("ble disabled"));
	
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
	
	window.plugins && window.plugins.socialsharing ? window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError) : onError("no plugin");
		
}

function notice(){
logit("= Scanning...");	
setTimeout(notice,5500);
}

function scanBle(){
	
	let deviceList = [];
	
	logit("starting scan...");

	if(typeof bluetoothle === "undefined")displayBle("Plugin not loaded or allowed");
	
	const ble_success = () => {
		
		logit("BT enabled, scanning...");
		
		notice();
		bluetoothle.startScan( (device) => {
			logit("found device:");
			logit(device);
			if(device.status != "scanStarted"){
				deviceList.push(device);
				redrawList(deviceList);
			}
			
		}, (err) => ble_failure(err.message),{ "callbackType": bluetoothle.CALLBACK_TYPE_ALL_MATCHES , services : [] } );
		
		
	}
	
	const ble_failure = (str = null) => {
		displayBle(str?str:"Bluetooth not enabled.");
	}
	
	bluetoothle.isEnabled(ble_success, ble_failure);
	
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
	logit(obj);
	return `<div class='device' onClick='pairDevice("`+obj.address+`")'>`+obj.name+`</div>`;
}

function pairDevice(addr){
	
logit("try to pair w "+addr+" ....");	

	bluetoothle.bond((resp) => {
		if(resp.status == "bonded"){
			logit("paired with "+addr);
			bluetoothle.services((serviceObj) => {
				//subscribe to all services
				deviceObj.services.map((service) => {
					
				});
			}, () => logit("Error on discovery"), { "address": addr, "clearCache": true });
		}
	}, (err) => ble_failure(err.message), { "address" : addr } );
	
}
