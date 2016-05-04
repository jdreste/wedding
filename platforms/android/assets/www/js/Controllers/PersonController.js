app.controller('PersonController', function($scope, shareDataFactory) {
	$scope.shareDataFactory = shareDataFactory.get();
});