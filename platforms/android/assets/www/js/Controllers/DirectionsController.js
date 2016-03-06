app.controller('DirectionsController', function($scope, $http) {

    $scope.launchNavigator = function(destination) {
        console.log('here');
            var goTo = "";
            switch(destination) {
                case 0: goTo = "10709 Watson Rd., Sunset Hills, Saint Louis, MO 63127";
                break;
                case 1: goTo = "13001 Gary Player Dr., St. Louis, MO 63127";
                break;
                case 2: goTo = "1904 Concourse Dr., St. Louis, MO 63112";
                break;
                default:
                break;
            }

            launchnavigator.navigate(
              goTo,
              null,
              function(){
                  alert("Plugin success");
              },
              function(error){
                  alert("Plugin error: "+ error);
              },
              {
                navigationMode: "turn-by-turn"
              });
        }
});