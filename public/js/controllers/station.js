app.controller('StationCtrl', function($scope, $http, $routeParams){

	//$http is a service that handles communication between a server and the application
	
	//retrieve all stations
	$http.get('/jcDecauxAPI/' + $routeParams.number)
		.success(function(data){
			
			$scope.station = data;
			
			var lat = data.position.lat;
			var lng = data.position.lng;
			var userMarker;

			if (navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position){
					$scope.$apply(function(){
						$scope.userMarker = position;
					});
				});
			}
			else{
				alert("Geolocation is not supported by this browser.");
			}

			$scope.map = { center: { latitude: lat, longitude: lng }, zoom: 11 };
			$scope.marker = { coords: { latitude: lat, longitude: lng}};
			$scope.icon = "img/marker.png";
			$scope.userIcon = "img/userMarker.png";
			$scope.windowOptions = {visible: true};
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
});