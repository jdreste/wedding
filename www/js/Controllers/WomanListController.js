app.controller('WomanListController', function($scope, $http) {

            $http.get('data/women.json').success(function(data){
	          		$scope.women = data; 
          	});  

});