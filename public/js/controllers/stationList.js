app.controller('StationListCtrl', function($scope, $http){

	//$http is a service that handles communication between a server and the application
	
	//retrieve all stations
	$http.get('/jcDecauxAPI')
		.success(function(data){
			$scope.stations = data;
			//console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	
	//retrieve stations every 60 seconds
	setInterval(function () {
		//retrieve all stations
		$http.get('/jcDecauxAPI')
			.success(function(data){
				$scope.stations = data;
				//console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	}, 60000);
});

