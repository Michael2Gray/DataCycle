var app = angular.module('dataCycle', ['ngRoute','ngAnimate','uiGmapgoogle-maps','nvd3']);
	
app.config(function($routeProvider){
	$routeProvider.
		when('/analytics', {
			templateUrl: 'views/analyticsList.html',
			controller: 'AnalyticsListCtrl'
		}).
		when('/analytics/:number', {
			templateUrl: 'views/analytics.html',
			controller: 'AnalyticsCtrl'
		}).
		when('/stations', {
			templateUrl: 'views/stationList.html',
			controller: 'StationListCtrl'
		}).
		when('/station/:number', {
			templateUrl: 'views/station.html',
			controller: 'StationCtrl'
		}).
		when('/about', {
			templateUrl: 'views/about.html'
		}).
		otherwise({
			redirectTo: '/stations'
		});
});

