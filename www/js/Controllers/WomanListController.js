app.controller('WomanListController', function($scope, $http, shareDataFactory) {

    $http.get('data/women.json').success(function(data){
        $scope.women = data;
    });
               
    $scope.setWoman = function(woman) {
        shareDataFactory.set(woman);
    }
});