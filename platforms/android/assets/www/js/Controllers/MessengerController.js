app.controller('MessengerController', function($scope, $http) {

    var controller = this;

    $http.get('http://www.evolutiondigitalstl.com/svc/weddingMessages.php/getMessages').success(function(data) {
        controller.count = data.length;
        controller.data = data;
    }).error(function() {
        //itemScope.item.desc = 'No bacon lorem ipsum';
        //itemScope.item.label = 'No bacon';
    });

    $scope.submit = function() {

        var data = {
            message: $('#message').val(),
            user: localStorage.getItem("userName"),
            date: getDate(),
            time: getTime()
        };
        console.log(data.user);
        console.log(data.message);
        console.log(data.date);
        console.log(data.time);
        $.post( "http://www.evolutiondigitalstl.com/svc/weddingMessages.php", function( data ) {
          $( "#label" ).html( data );
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

