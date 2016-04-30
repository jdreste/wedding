app.controller('MenController', function($scope, shareDataFactory) {
	$scope.shareDataFactory = shareDataFactory.get();
});