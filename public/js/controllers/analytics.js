app.controller('AnalyticsCtrl', function($scope, $http, $routeParams){

	//$http is a service that handles communication between a server and the application
	
	//retrieve all stations
	$http.get('/stations/' + $routeParams.number)
		.success(function(data){

			var address = data[0].address;

			var totalBikeSpaces = data[0].bike_stands;

			console.log("Total Spaces: " + totalBikeSpaces);

			$scope.stations = data;

			$scope.stationAddress = address;

			// Color Options "#002533","#008CC2","#00B8FD","#005879, #1e73be, #51a6f1, #378cd7"

			var colorArray = ['#51a6f1', '#002533'];

			var satObj = {};
			satObj.key = "Weekend Bikes";
			satObj.values = [];
			satObj.color = "#002533";

			var tueObj = {};
			tueObj.key = "Week Day Bikes";
			tueObj.values = [];
			tueObj.color = "#51a6f1";

			var weekendObjBikes = {};
			var weekendObjSpaces = {};
			var totalWeekendBikes = 0;
			var averageWeekendBikes = 0;
			var totalWeekendSpaces = 0;
			var averageWeekendSpaces = 0;

			var weekDayObjBikes = {};
			var weekDayObjSpaces = {};
			var totalWeekDayBikes = 0;
			var averageWeekDayBikes = 0;
			var totalWeekDaySpaces = 0;
			var averageWeekDaySpaces = 0;

			var averageObjBikes = {};
			var averageObjSpaces = {};
			var totalBikes = 0;
			var averageBikes = 0;
			var totalSpaces = 0;
			var averageSpaces = 0;

			var areaChartData = [];
			var totalPieChartData = [];
			var weekendPieChartData = [];
			var weekDayPieChartData = [];

			var satMidNight = 1422662400000;
			var sunMidNight = 1422748800000;

			var dataLength = data.length;

			//Seperate the data into weekday and weekend objects 
			angular.forEach(data, function(station){

				totalBikes += station.available_bikes;
				totalSpaces += station.available_bike_stands;

				if(station.last_update > satMidNight && station.last_update < sunMidNight){
					
					satObj.values.push([station.last_update, station.available_bikes]);
					
					totalWeekendBikes += station.available_bikes;
					totalWeekendSpaces += station.available_bike_stands;
				}
				else {

					tueObj.values.push([station.last_update, station.available_bikes]);
					
					totalWeekDayBikes += station.available_bikes;
					totalWeekDaySpaces += station.available_bike_stands;
				}
			});

			/***********************************************************Area Chart***********************************************************************************/

			areaChartData.push(satObj);
			areaChartData.push(tueObj);

			$scope.areaChartOptions = {
				chart: {
					type: 'multiBarChart',

					x: function(d){return d[0];},
					y: function(d){return d[1];},

					clipEdge: true,
					transitionDuration: 500,
					useInteractiveGuideline: true,
					showLabels: true,
					showLegend: true,

					xAxis: {
						showMaxMin: false,
						tickFormat: function(d){
							return d3.time.format('%H:%M')(new Date(d))
						},
						axisLabel: "Time"
					},

					yAxis: {
						showMaxMin: true,
						tickFormat: function(d){
							return d3.format(',.0f')(d)
						},
						axisLabel: "Available Bikes",
						axisLabelDistance: 40
					}
				}
			};

			$scope.areaChartData = areaChartData;

			/***********************************************************Weekend Pie Chart****************************************************************************/

			averageWeekendBikes = parseInt(totalWeekendBikes / satObj.values.length);
			averageWeekendSpaces = parseInt(totalWeekendSpaces / satObj.values.length);

			weekendObjBikes.key = "Average Bikes: " + averageWeekendBikes + "/"+ totalBikeSpaces;
			weekendObjBikes.data = averageWeekendBikes;

			weekendObjSpaces.key = "Average Spaces: " + averageWeekendSpaces + "/"+ totalBikeSpaces;
			weekendObjSpaces.data = averageWeekendSpaces;

			weekendPieChartData.push(weekendObjBikes);
			weekendPieChartData.push(weekendObjSpaces);

			$scope.weekendPieChartOptions = {
				chart: {
	                type: 'pieChart',
	                height: 400,
	                x: function(d){return d.key;},
	                y: function(d){return d.data;},
	                color: colorArray,
	                showLabels: true,
	                showLegend: true,
	                labelType: "percent",
	                tooltips: false,
	                transitionDuration: 1000,
	                labelThreshold: 0,
	            }
			};

			$scope.weekendPieChartData = weekendPieChartData;

			/***********************************************************Week Day Pie Chart****************************************************************************/

			averageWeekDayBikes = parseInt(totalWeekDayBikes / tueObj.values.length);
			averageWeekDaySpaces = parseInt(totalWeekDaySpaces / tueObj.values.length);

			console.log("Total Spaces: " + totalBikeSpaces);

			weekDayObjBikes.key = "Average Bikes: " + averageWeekDayBikes + "/"+ totalBikeSpaces;
			weekDayObjBikes.data = averageWeekDayBikes;

			weekDayObjSpaces.key = "Average Spaces: " + averageWeekDaySpaces + "/"+ totalBikeSpaces;
			weekDayObjSpaces.data = averageWeekDaySpaces;

			weekDayPieChartData.push(weekDayObjBikes);
			weekDayPieChartData.push(weekDayObjSpaces);

			$scope.weekDayPieChartOptions = {
				chart: {
	                type: 'pieChart',
	                height: 400,
	                x: function(d){return d.key;},
	                y: function(d){return d.data;},
	                color: colorArray,
	                showLabels: true,
	                showLegend: true,
	                labelType: "percent",
	                tooltips: false,
	                transitionDuration: 1000,
	                labelThreshold: 0,
	            }
			};

			$scope.weekDayPieChartData = weekDayPieChartData;

			/***********************************************************Average Pie Chart****************************************************************************/

			averageBikes = parseInt(totalBikes/dataLength);
			averageSpaces = parseInt(totalSpaces/dataLength);

			averageObjBikes.key = "Average Bikes: " + averageBikes + "/"+ totalBikeSpaces;
			averageObjBikes.data = averageBikes;

			averageObjSpaces.key = "Average Spaces: " + averageSpaces + "/"+ totalBikeSpaces;
			averageObjSpaces.data = averageSpaces;

			totalPieChartData.push(averageObjBikes);
			totalPieChartData.push(averageObjSpaces);

			$scope.totalPieChartOptions = {
				chart: {
	                type: 'pieChart',
	                height: 400,
	                x: function(d){return d.key;},
	                y: function(d){return d.data;},
	                color: colorArray,
	                showLabels: true,
	                showLegend: true,
	                labelType: "percent",
	                tooltips: false,
	                transitionDuration: 1000,
	                labelThreshold: 0,
	            }
			};

			$scope.totalPieChartData = totalPieChartData;
		})

			/***************************************************************************************************************************************************************/

		.error(function(data){
			console.log('Error: ' + data);
		});
});