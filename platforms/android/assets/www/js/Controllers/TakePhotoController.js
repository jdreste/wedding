app.controller('TakePhotoController', function($scope, $http) {

    var image = null;

    $scope.takePicture = function(){
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }

    function onSuccess(imageData) {
        image = "data:image/jpeg;base64," + imageData;
        $('#picture').append('<img height="150" width="150" src="' + image + '"/>');
    }

    function onFail(message) {
        alert(message);
    }

    $scope.submit = function() {
    console.log('here');
        $.post("http://www.upload.php", {data: image}, function(data) {
            alert("Image uploaded!");
        });
    }
});