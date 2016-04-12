app.controller('TakePhotoController', function($scope, $http, $interval) {

    var controller = this;
    var timer;

    $scope.isDisabled = true;
    $scope.showSpinner = false;
    $scope.pictureShown = false;

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
                $scope.showSpinner = true;
            $http.get('http://www.evolutiondigitalstl.com/svc/weddingImages.php/getImages').success(function(data) {
                controller.count = data.length;
                controller.data = data;
                $scope.showSpinner = false;
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

    $scope.clearImage = function() {
        $scope.picture = null;
        $scope.pictureShown = false;
    }

    function onSuccess(imageData) {
        controller.image = "data:image/jpeg;base64," + imageData;
        $scope.pictureShown = true;
        $scope.picture = controller.image;
       // $('#picture').html('<img height="150" width="150" src="' + controller.image + '"/>');
        $scope.isDisabled = false;
        $scope.pictureShown = true;
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
        var ft = new FileTransfer();
        ft.upload(fileURI, encodeURI("http://www.evolutiondigitalstl.com/svc/weddingImages.php/addImage"), win, fail, options);
        $scope.stop();
        $scope.start();
        //$('#picture').html("");
        $scope.pictureShown = false;
    }

    $scope.GalleryDelegate = {
        configureItemScope: function(index, itemScope) {
         // if (!itemScope.item) {
          //  itemScope.canceler = $q.defer();
            itemScope.item = {
                sender: '',
                filename: '',
                date: '',
                time: ''
            };
            itemScope.item.sender = controller.data[index].sender;
            itemScope.item.filename = controller.data[index].filename;
            itemScope.item.date = controller.data[index].date;
            itemScope.item.time = controller.data[index].time;
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