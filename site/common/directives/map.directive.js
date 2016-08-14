app.directive('mapView', function(){
    return {
        template: '<esri-map-view map="map" view-options="options"></esri-map-view>',
        transclude:true,
        controller: function($scope, esriLoader){
            $scope.options = {
                extent:{
                    xmin: -9177811,
                    ymin: 4247000,
                    xmax: -9176791,
                    ymax: 4247784,
                    spatialReference: 102100
                }
            }
            esriLoader.require([
                'esri/Map',
                'esri/layers/FeatureLayer'
            ], function(Map, FeatureLayer){
                $scope.map = new Map({
                    basemap: 'hybrid'
                });
                // and add a feature layer
            var featureLayer = new FeatureLayer({
                url: 'http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0'
            });

            $scope.map.add(featureLayer);
            })
        }
    }
})