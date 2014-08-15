angular.module('statistic.visit',['ngResource','angles']).controller('visits',function( $scope, $http,$resource ){

  var type = 'dailyPageView',
    url = '/statistic',
    limit = 7,
    sort = 'key DESC',
    Visit = $resource( url ,{type:type,limit:limit,sort:sort})

  $scope.chart = {
    labels: ['a','b'],
    datasets: [
      {
        label: "Visits",
        fillColor: "rgba(255,255,255,0.2)",
        strokeColor: "rgba(255,255,255,1)",
        pointColor: "rgba(255，255，255,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(255,255,255,1)",
        data: [0,0]
      }
    ]
  };

  $scope.options = {
    scaleLineColor: "rgba(255,255,255,.5)",
    scaleGridLineColor : "rgba(255,255,255,.2)",
    scaleFontColor: "#fff",
    responsive: true,
    maintainAspectRatio: false
  }
  Visit.query().$promise
    .then(function(data){
      $scope.chart.labels = data.map(function( r){ return moment(r.key).format('MM-DD')}).reverse()
      $scope.chart.datasets[0].data = data.map(function( r){ return parseInt(r.value)}).reverse()
    })


})