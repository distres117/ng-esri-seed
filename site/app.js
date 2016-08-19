var app = angular.module('app', []);

app.controller('MapCtrl', function ($scope) {
    var map;
    require([
        'esri/map'
    ], function(Map){
        map = new Map("map", {
            basemap: "streets",
            center: [-119.036, 36.621],
            zoom: 6,
            logo: false,
            showAttribution: false
        });
    })
});