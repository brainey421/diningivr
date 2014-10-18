exports.diningCourts = [
	"Earhart",
	"Ford",
	"Hillenbrand",
	"Wiley",
	"Windsor"
];

exports.getMenu = function(diningCourtId) {
	var done = false;
	var str = "hello";
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
	
	console.log("Loading menu: " + "http://api.hfs.purdue.edu/menus/v1/locations/" + exports.diningCourts[diningCourtId] + "/" + month + "-" + day + "-" + year);
	
	var http = require("http");
	var menu = "";
	http.get("http://api.hfs.purdue.edu/menus/v1/locations/" + exports.diningCourts[diningCourtId] + "/" + month + "-" + day + "-" + year, function(response) {
		response.on("data", function(chunk) {
		    menu += chunk;
		});
		response.on("end", function() {
			menu = JSON.parse(menu);
			
			var meal = "";
			if (hour < 9 || hour == 9 && minute < 30)
			{
				meal = "Breakfast";
			}
			else if (hour < 14)
			{
				meal = "Lunch";
			}
			else
			{
				meal = "Dinner";
			}
			
			ret = "";
			for (var i = 0; i < menu[meal].length; i++)
			{
				items = menu[meal][i]["Items"];
				for (var j = 0; j < items.length; j++)
				{
					if (i == menu[meal].length - 1 && j == items.length - 1)
					{
						ret += "and " + items[j]["Name"] + " for " + meal + ".";
					}
					else
					{
						ret += items[j]["Name"] + ", ";
					}
				}
			}
			if (ret == "")
			{
				ret = "nothing for " + meal + "."
			}
			
			//console.log(ret);
			str = ret;
			end = true;
			return ret;
		});
	});
	while(!end) {

	}
	return str;
}