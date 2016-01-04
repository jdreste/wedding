app.controller('ManListController', function($scope, $http) {

            $http.get('data/men.json').success(function(data){
	          		$scope.men = data; 
          	});  

});