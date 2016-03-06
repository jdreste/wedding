app.controller('TakePhotoController', function($scope, $http) {

    var controller = this;

    $scope.takePicture = function(){
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }

    function onSuccess(imageData) {
        controller.image = "data:image/jpeg;base64," + imageData;
        $('#picture').html('<img height="150" width="150" src="' + controller.image + '"/>');
    }

    function onFail(message) {
        alert(message);
    }

    function clearCache() {
        navigator.camera.cleanup();
    }

    $scope.submit = function() {

    var fileURI = controller.image;

    var win = function (r) {
            clearCache();
            retries = 0;
            alert('Done!');
        }

        var fail = function (error) {
            if (retries == 0) {
                retries ++
                setTimeout(function() {
                    onCapturePhoto(fileURI)
                }, 1000)
            } else {
                retries = 0;
                clearCache();
                alert('Ups. Something wrong happens!');
            }
        }


    var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.params = {}; // if we need to send parameters to the server request
        var ft = new FileTransfer();
        ft.upload(fileURI, encodeURI("http://www.evolutiondigitalstl.com/svc/weddingImages.php"), win, fail, options);
    }
});