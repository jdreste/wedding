app.controller('ManListController', function($scope, $http, shareDataFactory) {

            $http.get('data/men.json').success(function(data){
	          		$scope.men = data;
          	});

          	 $scope.setMan = function(man) {
          	 console.log('here');
          	 	shareDataFactory.set(man);
             }

});