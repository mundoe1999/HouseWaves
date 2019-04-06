"use strict";

angular.module('BoroughApp', [])
.controller('BoroughCtrl', ['$scope', '$http', function($scope, $http){
  $http.get("https://data.cityofnewyork.us/resource/fhrw-4uyv.json?$where=created_date between '2019-01-01T00:00:01.000' and '2019-04-05T02:14:35.000'&complaint_type=Noise - Residential").then(function(response){
    console.log(response.data);
    $scope.boroughs = response.data;
  });
}]);
