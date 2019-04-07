"use strict";
//
//

var testing;
var today;
var sixMonths;

var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-74.0060,40.7128]),
      zoom: 10
    })
  });

function setDays(){
  today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  var oldmm = today.getMonth()-5;
  var oldyyyy = today.getFullYear();

  if(Math.sign(oldmm)<= 0){
    oldmm = oldmm + 12;
    oldyyyy -= 1;
  }

  oldmm = String(oldmm).padStart(2, '0');
  today = yyyy + '-' + mm + '-' + dd;
  sixMonths = oldyyyy + '-' + oldmm + '-' + '01';

  //Setting the second date
  console.log(today);
  console.log(sixMonths);
}
setDays();
var apiLink = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?$where=created_date between '"+ sixMonths+"T00:00:01.000' and '"+today+"T00:00:01.000'&complaint_type=Noise - Residential";

  angular.module('BoroughApp', [])
  .controller('BoroughCtrl', ['$scope', '$http', function($scope, $http){
    $http.get(apiLink)
    .then(function(response){
      $scope.boroughs = response.data;
      //Putting the json into the variable
      testing = response.data;
      console.log(response.data);
    });
  }]);

  function test(){
    var x = 0;
    for(x in testing){
      add_map_point(testing[x].latitude,testing[x].longitude);
    }
    for(x in testing){
        if(testSomething(testing[x].incident_zip, testing[x].street_name)){
          console.log("Noisy!");
          document.getElementById('result').innerHTML=`Noisy neighborhood! Find another place!`;
          //Align map to where it is
          CenterMap(testing[x].longitude, testing[x].latitude);
          return true;
        }
    } //End for loop
    
    document.getElementById('result').innerHTML=`There have been no noise complaints in this neighborhood!`;
    CenterMap(-74.0060,40.7128);
    map.getView().setZoom(10);
    return false;
  }

function testSomething(zipcode, street){
  var usr_str = document.getElementById('stinput').value;
  var usr_zip = document.getElementById('zipinput').value;

  //Ignore Case Sensitivity
    usr_str = usr_str.toUpperCase();

  if(zipcode === usr_zip && street === usr_str){
    return true;
  }
  return false;
}


function CenterMap(long, lat) {
    console.log("Long: " + long + " Lat: " + lat);
    map.getView().setCenter(ol.proj.transform([parseFloat(long), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857'), 6);
    //Make it to set size
    map.getView().setZoom(15);
}


function add_map_point(lat, lng) {
    var vectorLayer = new ol.layer.Vector({
        source:new ol.source.Vector({
            features: [new ol.Feature({
           geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
            })]
        }),
        style: new ol.style.Style({
            image: new ol.style.Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
    src: "img/YellowDot.gif"
            })
        })
    });
    map.addLayer(vectorLayer);
}

function get_data_point(){
  var x = 0;
  for(x in testing){
    console.log(testing[x].latitude);
    add_map_point(testing[x].latitude,testing[x].longitude);
  }
}

console.log(map.getView().getCenter());
