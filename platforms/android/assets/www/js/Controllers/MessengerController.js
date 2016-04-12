app.controller('MessengerController', function($scope, $http, $interval) {

    var controller = this;
    var timer;

    $scope.showSpinner = false;

    document.addEventListener("deviceready", onDeviceReady, false);

    $(document.body).on("pageinit", "#messenger-page", function() {
        $scope.start();
    });

    function onDeviceReady(){
        document.addEventListener("backbutton", function(e){
            $scope.stop();
        }, false);
    }

    $scope.start = function() {
        timer = $interval(function() {
            $scope.showSpinner = true;
            $http.get('http://www.evolutiondigitalstl.com/svc/weddingImages.php/getMessages').success(function(data) {
                controller.count = data.length;
                controller.data = data;
                $scope.showSpinner = false;
            }).error(function() {
                //itemScope.item.desc = 'No bacon lorem ipsum';
                //itemScope.item.label = 'No bacon';
            });
            console.log('new message');
        }, 5000);
    }

    $scope.stop = function() {
        if (angular.isDefined(timer)) {
            $interval.cancel(timer);
            timer = undefined;
        }
    }

    $scope.submit = function() {

        var data = {
            message: $scope.message,
            user: localStorage.getItem("userName"),
            date: getDate(),
            time: getTime()
        };

        $.ajax({
            type: "POST",
            data: JSON.stringify(data),
            url: "http://www.evolutiondigitalstl.com/svc/weddingImages.php/addMessage",
            contentType: "application/json"
        });
        $scope.message = null;
    }

    $scope.MessageDelegate = {
        configureItemScope: function(index, itemScope) {
         // if (!itemScope.item) {
            //itemScope.canceler = $q.defer();
            itemScope.item = {
              message: '',
              date: '',
              time: '',
            };
            itemScope.item.message = controller.data[index].message;
            itemScope.item.user = controller.data[index].user;
            itemScope.item.date = controller.data[index].date;
            itemScope.item.time = controller.data[index].time;


       //  }
        },
        countItems: function() {
                // Return number of items.
                return controller.count;
              },
              calculateItemHeight: function(index) {
                      // Return the height of an item in pixels.
                      return 45;
                    },
        destroyItemScope: function(index, itemScope) {
          //itemScope.canceler.resolve();
        }
    }
});

