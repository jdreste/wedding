app.controller('MessengerController', function($scope, $http, $q, $interval) {

    var controller = this;
    var timer;
    var canceller = $q.defer();

    var submitModal = function() {
        modalMessage.show();
    };
               
    angular.element(document).ready(function () {
        $scope.start();
    });

    $scope.showSpinner = false;

    document.addEventListener("deviceready", onDeviceReady, false);

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
            });
        }, 5000);
    }

    $scope.stop = function() {
        if (angular.isDefined(timer)) {
            $interval.cancel(timer);
            timer = undefined;
        }
    }
               
    $scope.cancel = function() {
        canceller.resolve("Submit Cancelled");
        modalMessage.hide();
    }

    $scope.submit = function() {

        submitModal();

        var data = {
            message: $scope.message,
            user: localStorage.getItem("userName"),
            date: getDate(),
            time: getTime()
        };

        $http({
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            timeout: canceller.promise,
            url: "http://www.evolutiondigitalstl.com/svc/weddingImages.php/addMessage"
        }).then(function successCallback(response) {
            modalMessage.hide();
            alert('Message Submitted!');
        }, function errorCallback(response) {
            modalMessage.hide();
            alert('Error!');
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

