var debughtml='';
var preloaded='';
var debug = true;

if(document.getElementById("debugdiv_preload"))
	preloaded=document.getElementById("debugdiv_preload").value;

			debughtml+='<div class="debug">';
			debughtml+='<textarea style="width:95%;height:140px;font-size:12px !important;" id="debugdiv">\n'+preloaded+'</textarea>';
			debughtml+='	';
			debughtml+='</div>';
			
			if(debug)
			document.getElementById("lowerDiv").innerHTML += debughtml;
		
			