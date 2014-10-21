angular.module('widget.time',[]).controller('widget.time',function( $scope,$timeout ){


  function startTime(){
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);

    //Check for PM and AM
    var day_or_night = (h > 11) ? "PM" : "AM";

    //Convert to 12 hours system
    if (h > 12)
      h -= 12;

    //Add time to the headline and update every 500 milliseconds
    $scope.time = h + ":" + m + ":" + s + " " + day_or_night;
    $timeout(function() {
      startTime()
    }, 500);
  }

  function checkTime(i)
  {
    if (i < 10)
    {
      i = "0" + i;
    }
    return i;
  }

  startTime()
})
