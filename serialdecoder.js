jQuery(document).ready(function ($) {
	jQuery("#serialdecoder").after(''+
		'<div class="snc_div">'+
		'<h2>Amazon Fire TV Serial Number Decoder</h2>'+
		'<input id="snc_value" type="text" placeholder="Enter Fire TV Serial Number..."><div id="snc_note"></div>'+
		'<div id="snc_result" style="display:none">'+
		'Rootable: <span id="snc_r_root" class="snc-result"></span><br>'+
		'Likely Software Version: <span id="snc_r_version" class="snc-result"></span><br>'+
		'Manufactured: <span id="snc_r_date" class="snc-result"></span><br>'+
		'Hardware Revision: <span id="snc_r_hr" class="snc-result"></span><br>'+
		'Unit Revision: <span id="snc_r_ur" class="snc-result"></span><br>'+
		'Condition (New or Refurbished): <span id="snc_r_condition" class="snc-result"></span>'+
		'</div>'+
		'</div>');
		
	jQuery("#snc_value").keyup(function() {checkserial();});
});

function checkserial(){
	jQuery("#snc_result").hide();
	jQuery("#snc_note").hide();
	var serial = jQuery("#snc_value").val();
	var len = serial.length;
	if(len<=0){
		jQuery("#snc_note").html("");
		jQuery("#snc_note").show();
		return;
	}else if(len>0 && len<12){
		var s = (len===11 ? "" : "s");
		jQuery("#snc_note").html((12-len) + " more charecter"+s+" required");
		jQuery("#snc_note").show();
	}else{
		var man = serial.charAt(0);
		var con = serial.charAt(1);
		var dev = serial.charAt(2) + serial.charAt(3);
		var hrv = serial.charAt(4) + serial.charAt(5);
		var urv = serial.charAt(6) + serial.charAt(7);
		var yyy = serial.charAt(8);
		var www = serial.charAt(9) + serial.charAt(10);
		var ddd = serial.charAt(11);
		if(len>15) var srn = serial.charAt(12) + serial.charAt(13) + serial.charAt(14);
		else var srn = "";
		
		if(man=="7" && (con=="0"||con=="1") && (dev=="90"||dev=="94") && parseInt(yyy)>=4 && parseInt(www)>=1 && parseInt(www)<=52 && parseInt(ddd)>=1 && parseInt(ddd)<=7){
			jQuery("#snc_note").html("");
			
			var ind = parseInt(yyy+www+ddd);
			
			//DATE
			var year = 2010 + parseInt(yyy);
			var week = parseInt(www);
			var day = parseInt(ddd);
			var simple = new Date(year, 0, 1 + (week - 1) * 7);
			var dow = simple.getDay();
			var ISOweek = simple;
			if (dow <= 4) ISOweek.setDate(simple.getDate() - simple.getDay() + 1);
			else ISOweek.setDate(simple.getDate() + 8 - simple.getDay());
			ISOweek.setDate(ISOweek.getDate()+(day-1));
			var by = (man=="7" ? "By Foxconn on " : "On ");
			jQuery("#snc_r_date").html(by + (ISOweek.getMonth()+1) + '/' + ISOweek.getDate() + '/' + ISOweek.getFullYear());
			
			//CONDITION
			if(con=="0") jQuery("#snc_r_condition").html("New");
			else jQuery("#snc_r_condition").html("Refurbished");
			
			//REVISIONS
			jQuery("#snc_r_hr").html(hrv);
			jQuery("#snc_r_ur").html(urv);
			
			//ROOT
			if(dev=="94") jQuery("#snc_r_root").html("No, All Fire TV Sticks cannot be rooted");
			else{
				if(ind<=4355) jQuery("#snc_r_root").html("<span style='color:#006600;'>Yes</span>");
				else if(ind==4356) jQuery("#snc_r_root").html("<span style='color:#cc0000;'>Unknown</span>");
				else jQuery("#snc_r_root").html("<span style='color:#cc0000;'>No</span>");
			}
			
			//SOFTWARE VERSION
			if(dev=="94") jQuery("#snc_r_version").html("Unknown (Data for the Fire TV Stick is not available");
			else{
				if(ind<=4182) jQuery("#snc_r_version").html("51.1.0 or 51.1.0.1");
				else if(ind>=4183 && ind<=4194) jQuery("#snc_r_version").html("51.1.0 or 51.1.0.1 or 51.1.0.2");
				else if(ind>=4195 && ind<=4302) jQuery("#snc_r_version").html("51.1.0.1 or 51.1.0.2");
				else if(ind>=4303 && ind<=4311) jQuery("#snc_r_version").html("51.1.0.1 or 51.1.0.2 or 51.1.1.0");
				else if(ind>=4312 && ind<=4355) jQuery("#snc_r_version").html("51.1.1.0");
				else if(ind>=4356 && ind<=4356) jQuery("#snc_r_version").html("51.1.1.0 or 51.1.3.0");
				else if(ind>=4357 && ind<=4384) jQuery("#snc_r_version").html("51.1.3.0");
				else if(ind>=4385 && ind<=4411) jQuery("#snc_r_version").html("51.1.3.0 or 51.1.4.0");
				else if(ind>=4412) jQuery("#snc_r_version").html("51.1.4.0");
			}
			
			jQuery("#snc_result").show();
		}else{
			jQuery("#snc_note").html("That is not a valid Fire TV or Fire TV Stick serial number");
			jQuery("#snc_note").show();
		}
		
		
	}
	
}