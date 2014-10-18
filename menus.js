exports.diningCourts = [
	"Earhart",
	"Ford",
	"Hillenbrand",
	"Wiley",
	"Windsor"
];

exports.getMenu = function(diningCourtId) {
	var date = new Date();
	
	var year = date.getFullYear().toString();
	var month = date.getMonth() + 1;
	if (month < 10)
	{
		month = "0" + month.toString();
	}
	else
	{
		month = month.toString();
	}
	var day = date.getDate();
	if (day < 10)
	{
		day = "0" + day.toString();
	}
	else
	{
		day = day.toString();
	}
	var hour = date.getHours();
	var minute = date.getMinutes();
	
	console.log("http://api.hfs.purdue.edu/menus/v1/locations/" + exports.diningCourts[diningCourtId] + "/" + month + "-" + day + "-" + year);
	
	var http = require("http");
	var parseString = require('xml2js').parseString;
	
	http.get("http://api.hfs.purdue.edu/menus/v1/locations/" + exports.diningCourts[diningCourtId] + "/" + month + "-" + day + "-" + year, function(response) {
		var menu = "";
		response.on("data", function(chunk) {
		    menu += chunk;
		});
		response.on("end", function() {
		    console.log(menu);
		});
	});
	
	if (hour < 9 || hour == 9 && minute < 30)
	{
		return "breakfast";
	}
	else if (hour < 14)
	{
		return "lunch";
	}
	else
	{
		return "dinner";
	}
}

exports.getMenu(3);