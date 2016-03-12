app.controller('MessengerController', function($scope, $http) {

    var controller = this;

    $http.get('data/messages.json').success(function(data) {
        controller.count = data.length;
        controller.data = data;
    }).error(function() {
        //itemScope.item.desc = 'No bacon lorem ipsum';
        //itemScope.item.label = 'No bacon';
    });

    $scope.submit = function() {
        var data = $('#message').val();
        console.log(data);
        $.post( "http://www.evolutiondigitalstl.com/svc/weddingMessagesSubmit.php", function( data ) {
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