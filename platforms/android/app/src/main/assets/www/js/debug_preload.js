
function logit(txt){
	
		console.log(txt);
		
		if(typeof txt === "object")txt="\n"+JSON.stringify(txt)+"\n";
			
		if(document.getElementById("debugdiv")){
			document.getElementById("debugdiv").value+=""+txt+"\n";
		}else{
			if(document.getElementById("debugdiv_preload")){
			document.getElementById("debugdiv_preload").value+=""+txt+" (pre)\n";
			}
		}
	
}

var debughtmlpre='';

debughtmlpre+='<div style="display:none;visibility:hidden;">';
debughtmlpre+='<textarea style="width:95%;height:140px;" id="debugdiv_preload"></textarea>';
debughtmlpre+='	';
debughtmlpre+='</div>';

if(true)
document.write(debughtmlpre);
		