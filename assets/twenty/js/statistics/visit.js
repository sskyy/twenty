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
        fillColor: "rgba(28, 202, 204, 0.2)",
        strokeColor: "rgba(28, 202, 204,1)",
        pointColor: "rgba(28, 202, 204,1)",
        pointStrokeColor: "rgba(28, 202, 204,1)",
        pointHighlightFill: "rgba(28, 202, 204,.8)",
        pointHighlightStroke: "rgba(28, 202, 204,.8)",
        data: [0,0]
      }
    ]
  };

  $scope.options = {
    scaleLineColor: "rgba(0,0,0,.1)",
    scaleGridLineColor : "rgba(0,0,0,.05)",
    scaleFontColor: "#666666",
    responsive: true,
    maintainAspectRatio: false
  }
  Visit.query().$promise
    .then(function(data){
      $scope.chart.labels = data.map(function( r){ return moment(r.key).format('MM-DD')}).reverse()
//      $scope.chart.labels = ['08-01','08-02','08-03','08-04','08-05','08-06','08-07','08-08']
      $scope.chart.datasets[0].data = data.map(function( r){ return parseInt(r.value)}).reverse()
//      $scope.chart.datasets[0].data = [50,40,34,50,68,79,56,48]
      if($scope.chart.labels.length ==1){
        $scope.chart.labels.unshift('08-24')
        $scope.chart.datasets[0].data.unshift(0)
      }
    })


})