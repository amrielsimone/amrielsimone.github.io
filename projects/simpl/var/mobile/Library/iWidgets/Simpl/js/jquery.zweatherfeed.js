(function($){

	$.fn.weatherfeed = function(locations, options, fn) {	
	
		// Set plugin defaults
		var defaults = {
			unit: 'f',
			image: true,
			country: false,
			highlow: true,
			wind: true,
			humidity: false,
			visibility: false,
			sunrise: false,
			sunset: false,
			forecast: false,
			link: true,
			showerror: true,
			linktarget: '_self',
			woeid: true
		};  
		var options = $.extend(defaults, options); 
		var row = 'odd';

		// Functions
		return this.each(function(i, e) {
			var $e = $(e);
			
			// Add feed class to user div
			if (!$e.hasClass('weatherFeed')) $e.addClass('weatherFeed');

			// Check and append locations
			if (!$.isArray(locations)) return false;

			var count = locations.length;
			if (count > 10) count = 10;

			var locationid = '';

			for (var i=0; i<count; i++) {
				if (locationid != '') locationid += ',';
				locationid += "'"+ locations[i] + "'";
			}

			// Cache results for an hour to prevent overuse
			now = new Date();

			// Select location ID type
			var queryType = options.woeid ? 'woeid' : 'location';
					
			// Create Yahoo Weather feed API address
			var query = "select * from weather.forecast where "+ queryType +" in ("+ locationid +") and u='"+unit +"'";
			var api = 'http://query.yahooapis.com/v1/public/yql?q='+ encodeURIComponent(query) +'&rnd='+ now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() +'&format=json';
			// Send request
			$.ajax({
				type: 'GET',
				url: api,
				dataType: 'json',
				success: function(data) {

					if (data.query) {
			
						if (data.query.results.channel.length > 0 ) {
							
							// Multiple locations
							var result = data.query.results.channel.length;
							for (var i=0; i<result; i++) {
							
								// Create weather feed item
								_process(e, data.query.results.channel[i], options);
							}
						} else {

							// Single location only
							_process(e, data.query.results.channel, options);
						}

						// Optional user callback function
						if ($.isFunction(fn)) fn.call(this,$e);

					} else {
						if (options.showerror) $('#image').html('<img src="Resources/Weather/error.png" />');
					}
				},
				error: function(data) {
					if (options.showerror) $('#image').html('<img src="Resources/Weather/error.png" />');
				}
			});

			
			
// -------------PROCESSING STUFF TIME-----------------
			var _process = function(e, feed, options) {
				var $e = $(e);

				// Format feed items
				var wd = feed.wind.direction;
				if (wd>=348.75&&wd<=360){wd="N"};if(wd>=0&&wd<11.25){wd="N"};if(wd>=11.25&&wd<33.75){wd="NNE"};if(wd>=33.75&&wd<56.25){wd="NE"};if(wd>=56.25&&wd<78.75){wd="ENE"};if(wd>=78.75&&wd<101.25){wd="E"};if(wd>=101.25&&wd<123.75){wd="ESE"};if(wd>=123.75&&wd<146.25){wd="SE"};if(wd>=146.25&&wd<168.75){wd="SSE"};if(wd>=168.75&&wd<191.25){wd="S"};if(wd>=191.25 && wd<213.75){wd="SSW"};if(wd>=213.75&&wd<236.25){wd="SW"};if(wd>=236.25&&wd<258.75){wd="WSW"};if(wd>=258.75 && wd<281.25){wd="W"};if(wd>=281.25&&wd<303.75){wd="WNW"};if(wd>=303.75&&wd<326.25){wd="NW"};if(wd>=326.25&&wd<348.75){wd="NNW"};
				var wf = feed.item.forecast[0];
		
		
		
				$('#City').html(feed.location.city);
				$('#Temp').html(feed.item.condition.temp+'&deg;');
				$('#High').html(wf.high+'&deg;');
				$('#Low').html(wf.low+'&deg;');
				$('#Condition').html(feed.item.condition.text);
				
				//Forecast
				$('#f-d1-t').html(feed.item.forecast[1].text);
				$('#f-d1-h').html(feed.item.forecast[1].high+"/");
				$('#f-d1-l').html(feed.item.forecast[1].low);
				
				//Condensed image cleaning
				
				function cleanImage(e){var t;var n=e;if(n=="0"||n=="2"){var t=1}if(n=="41"||n=="43"){var t=2}if(n=="13"||n=="14"||n=="15"||n=="16"){var t=3}if(n=="5"||n=="6"||n=="7"||n=="35"){var t=4}if(n=="1"||n=="3"||n=="4"||n=="37"||n=="38"||n=="39"||n=="47"){var t=5}if(n=="8"||n=="9"||n=="10"||n=="17"||n=="18"||n=="19"){var t=7}if(n=="32"||n=="34"){var t=6}if(n=="20"||n=="21"||n=="22"){var t=8}if(n=="23"||n=="24"){var t=9}if(n=="11"||n=="12"||n=="40"||n=="42"||n=="45"||n=="46"){var t=10}if(n=="26"||n=="30"||n=="44"){var t=11}if(n=="28"){var t=12}if(n=="31"||n=="33"){var t=14}if(n=="29"){var t=15}if(n=="25"){var t=16}if(n=="27"){var t=13}return t}
				
				$('#Image').html("<img src='Resources/Weather/"+cleanImage(feed.item.condition.code)+".png' />");
				
				
				var foreCast1 = cleanImage(feed.item.forecast[1].code);
				
				
				$('#f-d1-p').html("<img src='Resources/Weather/"+foreCast1+".png' />");
				
			};
			
			
			// Get time string as date
			var _getTimeAsDate = function(t) {
		
				d = new Date();
				r = new Date(d.toDateString() +' '+ t);

				return r;
			};

		});
	};

})(jQuery);


