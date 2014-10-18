var http = require("http");

var diningCourts = [
	"Earhart",
	"Ford",
	"Hillenbrand",
	"Wiley",
	"Windsor"
];

exports.getMenu = function(diningCourtId) {
	var date = new Date();
	var hour = date.getHours();
	var minute = date.getMinutes();
	
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

//var xmlHttp = new XMLHttpRequest();
//xmlHttp.open("GET", "http://api.hfs.purdue.edu/menus/v1/locations/Earhart/10-18-2014", false);
//xmlHttp.send(null);
//console.log(xmlHttp.responseText);

//http.get("http://api.hfs.purdue.edu/menus/v1/locations/Earhart/10-18-2014", function(data) {
  //console.log(data);
  //}).on('error', function(e) {
  //console.log("Got error: " + e.message);
  //});