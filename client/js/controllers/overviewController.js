var overview = angular.module('app.overviewController', []);

overview.controller('OverviewController', function($scope, MapService, AnimationService, BestSpotService) {
  $scope.beaches = MapService.getBeachCache();
  $scope.options = [
    {option: "beachname", value: "beach name"},
    {option: "forecastData[0].solidRating + forecastData[0].fadedRating", value: "star rating"},
    {option: "lat", value: "latitude"},
    {option: "lon", value: "longitude"},
    {option: "forecastData[0].condition.temperature", value: "temperature"},
    {option: "forecastData[0].wind.chill", value: "wind chill"},
    {option: "forecastData[0].swell.components.combined.height", value: "swell height"},
    {option: "forecastData[0].swell.components.combined.period", value: "swell period"}
  ];
  $scope.mySelect = $scope.options[1];
  $scope.selectBeach = function(beach) {
    MapService.setCurrentBeach(beach.beachname);
    MapService.zoomToBeach(beach.beachname);
    AnimationService.highlightMarker();
  };

  //methods for stars

  $scope.toRepeat = function(num) {
    var results = [];
    for (var i = 0; i < num; i++) {
      results.push(i);
    }
    return results;
  };

});
