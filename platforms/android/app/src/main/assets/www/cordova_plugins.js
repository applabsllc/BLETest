cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-bluetoothle.BluetoothLe",
      "file": "plugins/cordova-plugin-bluetoothle/www/bluetoothle.js",
      "pluginId": "cordova-plugin-bluetoothle",
      "clobbers": [
        "window.bluetoothle"
      ]
    },
    {
      "id": "es6-promise-plugin.Promise",
      "file": "plugins/es6-promise-plugin/www/promise.js",
      "pluginId": "es6-promise-plugin",
      "runs": true
    },
    {
      "id": "cordova-plugin-x-socialsharing.SocialSharing",
      "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
      "pluginId": "cordova-plugin-x-socialsharing",
      "clobbers": [
        "window.plugins.socialsharing"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-bluetoothle": "6.6.2",
    "cordova-plugin-whitelist": "1.3.5",
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-x-socialsharing": "6.0.3"
  };
});