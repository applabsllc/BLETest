


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
    bluetoothle.enable(() => {
		//create service
		bluetoothle.addService(() => {}, () => logit("error on creating service"), serviceParams);
		//create advert
		bluetoothle.startAdvertising(() => {}, () => logit("error on advertising service"), advertParams);
	}
	, (err) => logit("bleP disabled:"+err.message));
	
}

function scanBle(){
	
	let deviceList = [];
	
	
	logit("starting scan...");

	if(typeof bluetoothle === "undefined"){
		displayBle("Plugin not loaded");
		return;
	}
	
	const ble_success = () => {
		
		logit("BT enabled, scanning...");
		
		bluetoothle.startScan( (device) => {
			
			if(device.status != "scanStarted"){
				if(!deviceList.find(item => item.address === device.address)){
					logit("found device! :");
					logit(device);
					deviceList.push(device);
					redrawList(deviceList);
				}
			}
			
		}, (err) => logit(err.message),{ "callbackType": bluetoothle.CALLBACK_TYPE_ALL_MATCHES , services : [] } );
		
		
	}
	
	const ble_failure = (str = null) => {
		displayBle(str?str:"BT Disabled or Unallowed");
	}
	
	bluetoothle.initialize(() => {
		bluetoothle.requestPermission(() => {
			bluetoothle.enable(() => ble_success(), () => ble_success());//both functions are same since error can ocurr if already enabled
		}, () => logit("no coarse location permission"));	
	}, {"request": true, "statusReceiver": false, "restoreKey" : "bluetoothleplugintest" });
    
	
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
	return `<div class='device' onClick='pairDevice("`+obj.address+`")'>`+(obj.name? obj.name: obj.address)+`</div>`;
}

function pairDevice(addr){
	
logit("try to pair w "+addr+" ....");	

	bluetoothle.connect((resp) => {
		logit(resp);
			if(resp.status == "connected"){
				logit("paired with "+resp.name);
				//discover all services
				bluetoothle.discover((discovery) => {
					if(discovery.status == "discovered"){
						logit("something was discovered!");
						//read all services possible
						discovery.services.map((service) => {
							service.characteristics.map((serviceChar) => {
								if(serviceChar.properties.read)//if it can be read then read
								bluetoothle.read((data) => {
									//show result of data recieved
									logit("Data read: " + data.value);
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
