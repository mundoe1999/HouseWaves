"use strict";
//
//

var testing;

  angular.module('BoroughApp', [])
  .controller('BoroughCtrl', ['$scope', '$http', function($scope, $http){
    $http.get("https://data.cityofnewyork.us/resource/fhrw-4uyv.json?$where=created_date between '2019-01-01T00:00:01.000' and '2019-04-05T02:14:35.000'&complaint_type=Noise - Residential")
    .then(function(response){
      $scope.boroughs = response.data;
      testing = response.data;
      console.log(response.data);
    });
  }]);

  function test(){
    var x = 0;
    for(x in testing){
        if(testSomething(testing[x].incident_zip, testing[x].street_name)){
          console.log("Noisy!");
          document.getElementById('result').innerHTML=`Noisy neighborhood! Find another place!`;

          return true;
        }
    }
    document.getElementById('result').innerHTML=`There have been no noise complaints in this neighborhood!`;
    return false;
  }
function testSomething(zipcode, street){
  var usr_str = document.getElementById('stinput').value;
  var usr_zip = document.getElementById('zipinput').value;
  if(zipcode === usr_zip &&  street === usr_str){

    return true;
  } else{
    return false;
  }
}
