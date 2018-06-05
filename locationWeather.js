function scaleChange (checked) {
	if(checked==="F") {
		document.getElementById("temperature").innerHTML = (parseFloat(document.getElementById("temperature").innerHTML) * 1.8 + 32).toFixed(1);
	}
	else {
		document.getElementById("temperature").innerHTML = ((parseFloat(document.getElementById("temperature").innerHTML) - 32) / 1.8).toFixed(1);
	}
}
			
function getLocation(callback) {
	navigator.geolocation.getCurrentPosition(function(position){
	var text = "";
	text += "&lat="+position.coords.latitude+"&lon="+position.coords.longitude; 
	callback(text);
	});
}
     
getLocation(function(lat_lng){
	var link = "https://api.openweathermap.org/data/2.5/weather?id=524901&APPID=1a51ea13141bd21ee0496845f6900266"+lat_lng;
	console.log(link);
	
	fetch(link).then(function(data) {
		// Your code for handling the data you get from the API
		return data.json();
		}).then(function(json){
		document.getElementById("weatherData").style.visibility = "visible";
		document.getElementById("temperatureScale").style.visibility = "visible";
		var htmllocation = "";
		var htmlforecast = "";
		console.log(json);

		var city = JSON.stringify(json.name);
		var citySplit = city.split('"');
		var cityStyle = citySplit[1];
		console.log(cityStyle);

		var country = JSON.stringify(json.sys, ['country']);
		var countrySplit = country.split('"');
		var countryStyle = countrySplit[3].toString();
		console.log(countryStyle);

		var icon = JSON.stringify(json.weather, ['icon']);
		var iconSplit = icon.split('"');
		var iconStyle = iconSplit[3].toString();
		console.log(iconStyle);

		var description = JSON.stringify(json.weather, ['description']);
		var descriptionSplit = description.split('"');
		var descriptionAtt = descriptionSplit[3].toString();
		var descriptionStyle = descriptionAtt.charAt(0).toUpperCase()+descriptionAtt.slice(1);
		console.log(descriptionStyle);

		var temp = JSON.stringify(json.main, ['temp']);
		var tempSplit = temp.split(':');
		var tempStyle = tempSplit[1].slice(0,  tempSplit[1].length-1);
		var tempFloat = parseFloat(tempSplit[1]);
		var tempCel = tempFloat - 273.15;
		console.log(tempStyle);

		htmllocation += "<h2 align='center'>Weather "+cityStyle+", "+countryStyle+"</h2>";
		document.getElementById("location").innerHTML = htmllocation;
		
		htmlforecast += "<span id='temperature'>"+tempCel+"</span><span id='description'><img src='http://openweathermap.org/img/w/"+iconStyle+".png' width='40' height='40'>"+descriptionStyle+"</span>";
		document.getElementById("weatherData").innerHTML = htmlforecast;
		
		}).catch(function(error) {
		console.log(error);
		// This is where you run code if the server returns any errors
		});
		
});