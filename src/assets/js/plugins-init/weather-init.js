!function (t) { var e, i; e = "Dhaka", i = "", t.simpleWeather({ location: e, woeid: i, unit: "f", success: function (e) { html = '<i class="wi wi-yahoo-' + e.code + '"></i><h2> ' + e.temp + "&deg;" + e.units.temp + "</h2>", html += '<div class="city">' + e.city + ", " + e.region + "</div>", html += '<div class="currently">' + e.currently + "</div>", html += '<div class="celcious">' + e.alt.temp + "&deg;C</div>", t("#weather-one").html(html) }, error: function (e) { t("#weather-one").html("<p>" + e + "</p>") } }) }(jQuery);