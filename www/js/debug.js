var debughtml='';
var preloaded='';
var debug = true;

if(document.getElementById("debugdiv_preload"))
preloaded=document.getElementById("debugdiv_preload").value;

debughtml+='<div class="debug">';
debughtml+='<textarea style="width:95%;height:100px;font-size:10px !important;" id="debugdiv">\n'+preloaded+'</textarea>';
debughtml+='</div>';

if(debug)
document.getElementById("notificationArea").innerHTML += debughtml;

			