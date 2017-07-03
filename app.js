'use strict';

// MODULE
var weatherApp=angular.module("weatherApp",['ngRoute','ngResource']);
//ROUTE

weatherApp.config(function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl:'pages/home.html',
    controller:'homeController'

  })
  .when('/forecast',{
    templateUrl:'pages/forecast.html',
    controller:'forecastController'

  })
  .when('/forecast/:days',{
    templateUrl:'pages/forecast.html',
    controller:'forecastController'

  })
});
// SERVICES

weatherApp.service('cityService',function(){
  this.city='New Delhi';
})

// cONTROLLERS
weatherApp.controller("homeController",['$scope','cityService',function($scope,cityService){
  $scope.city=cityService.city;
  $scope.$watch('city',function(){
    cityService.city=$scope.city;
  })


}]);

weatherApp.controller("forecastController",['$scope','cityService','$resource','$routeParams',
                function($scope,cityService,$resource,$routeParams){

$scope.days=$routeParams.days || 2;
$scope.city=cityService.city;
$scope.weatherAPI=
            $resource('https://api.openweathermap.org/data/2.5/forecast/daily?APPID=7a8a6cbfc59c7dc5e2b22fea9933d0dc',
                  {get:{method:"JSONP"}}
            );
            $scope.weatherResult=$scope.weatherAPI.get( {q:$scope.city,cnt:$scope.days});
            console.log($scope.weatherResult);

            $scope.converToDate=function(dt){
              return new Date(dt*1000);
            }
}]);
