


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
	  logit("Share failed: " + msg);
	};
	
	window.plugins && window.plugins.socialsharing ? window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError) : onError("no plugin");
		
}


function actAsPeripheral(){//unused function
	
	let deviceList = [];
	
	
	logit("starting scan...");

	if(typeof bluetoothle === "undefined"){
		displayBle("Plugin not loaded");
		return;
	}
	
	const serviceParams = {
		  service: "1234",
		  characteristics: [
			{
			  uuid: "ABCD",
			  permissions: {
				read: true,
				write: true,
			  },
			  properties : {
				read: true,
				writeWithoutResponse: true,
				write: true,
				notify: true,
				indicate: true,
			  }
			}
		  ]
		};
	
	const advertParams = {
		  "service":"1234", 
		  "name":"Hi-Im A Peripheral",
		};

	bluetoothle.initializePeripheral(() => {}, {"request": true, "statusReceiver": false, "restoreKey" : "bluetoothleperipheraltest" });
    bluetoothle.enable(() => logit("blep enabled!"), (err) => logit("blep disabled:"+err.message));
	bluetoothle.addService(() => {}, () => logit("error on creating service"), serviceParams);
	bluetoothle.startAdvertising(() => {}, () => logit("error on advertising service"), advertParams);
}

function scanBle(){
	
	let deviceList = [];
	
	
	logit("starting scan...");

	if(typeof bluetoothle === "undefined"){
		displayBle("Plugin not loaded");
		return;
	}
	
	bluetoothle.initialize(() => {}, {"request": true, "statusReceiver": false, "restoreKey" : "bluetoothleplugintest" });
    bluetoothle.enable(() => logit("ble enabled!"), (err) => logit("ble disabled: "+err.message));
	bluetoothle.requestPermission(() => {}, () => logit("no coarse location permission"));
	
	const ble_success = () => {
		
		logit("BT enabled, scanning...");
		
		bluetoothle.startScan( (device) => {
			
			logit(device);
			if(device.status == "scanResult"){
				logit("found device!");
				if(!deviceList.find(item => item.address === device.address)){
					deviceList.push(device);
					redrawList(deviceList);
				}
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

	bluetoothle.connect((resp) => {
			if(resp.status == "connected"){
				logit("paired with "+resp.name);
				//discover all services
				bluetoothle.discover((discovery) => {
					if(discovery.status == "discovered"){
					//read all services possible
						discovery.services.map((service) => {
							service.characteristics.map((serviceChar) => {
								if(serviceChar.properties.read)//if it can be read then read
								bluetoothle.read((data) => {
									//show result of data recieved
									logit("Data recieved: " + data.value);
								}, 
								(err) => ble_failure("Error on read: "+err.message), 
								{"address": addr , "service": service.uuid ,"characteristic": serviceChar.uuid });
							});
						});
					}
				}, 
				(err) => ble_failure("Error on discovery of services: "+ err.message), 
				{ "address": addr, "clearCache": true });
			}
		}, 
		(err) => ble_failure("Error on connect: "+err.message), 
		{ "address" : addr } 
	);
	
}
