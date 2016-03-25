app.controller('MessengerController', function($scope, $http, $interval) {

    var controller = this;
    var timer;

           $(document.body).on("pageinit", "#messenger-page", function() {
               $scope.start();
           });

    $scope.start = function() {
        timer = $interval(function() {
            $http.get('http://www.evolutiondigitalstl.com/svc/weddingMessages.php/getMessages').success(function(data) {
                controller.count = data.length;
                controller.data = data;
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
            message: $('#message').val(),
            user: localStorage.getItem("userName"),
            date: getDate(),
            time: getTime()
        };

        $.post( "http://www.evolutiondigitalstl.com/svc/weddingMessages.php", function( data ) {
            alert("Message Sent");
            $scope.stop();
            $scope.start();
        });
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

