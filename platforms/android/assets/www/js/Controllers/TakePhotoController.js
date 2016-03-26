app.controller('TakePhotoController', function($scope, $http, $interval) {

    var controller = this;
    var timer;

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady(){
        document.addEventListener("backbutton", function(e){
            $scope.stop();
        }, false);
    }

    $(document.body).on("pageinit", "#photo-page", function() {
        $scope.start();
    });

    $scope.start = function() {
        timer = $interval(function() {
            $http.get('http://www.evolutiondigitalstl.com/svc/weddingImages.php/getImages').success(function(data) {
                controller.count = data.length;
                controller.data = data;
            }).error(function() {
                alert('error');
            });
        }, 5000);
    }

    $scope.stop = function() {
        if (angular.isDefined(timer)) {
            $interval.cancel(timer);
            timer = undefined;
        }
    }

    $scope.takePicture = function(){
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 10,
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
    var params = {
        user: localStorage.getItem("userName"),
        date: getDate(),
        time: getTime()
    };

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
                alert(error);
            }
        }


    var options = new FileUploadOptions();
        options.params = params;
        options.chunkedMode = false;
        options.fileKey = "file";
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.params = {}; // if we need to send parameters to the server request
        var ft = new FileTransfer();
        ft.upload(fileURI, encodeURI("http://www.evolutiondigitalstl.com/svc/weddingImages.php"), win, fail, options);
        $scope.stop();
        $scope.start();
    }

    $scope.GalleryDelegate = {
        configureItemScope: function(index, itemScope) {
         // if (!itemScope.item) {
          //  itemScope.canceler = $q.defer();
            itemScope.item = {
                id: '',
                filename: '',
                sender: '',
            };
            itemScope.item.id = controller.data[index].id;
            itemScope.item.filename = controller.data[index].filename;
            itemScope.item.sender = controller.data[index].sender;
       //   }
        },
        countItems: function() {
            // Return number of items.
            return controller.count;
        },
        calculateItemHeight: function(index) {
            // Return the height of an item in pixels.
            return 100;
        },
        destroyItemScope: function(index, itemScope) {
            //itemScope.canceler.resolve();
        }
    }
});