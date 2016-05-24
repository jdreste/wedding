app.controller('TakePhotoController', function($scope, $http) {

    var controller = this;
    var ft, win, fail;

    $scope.isDisabled = true;
    $scope.showSpinner = false;
    $scope.picture = null;

    angular.element(document).ready(function () {
        $scope.reload();
    });
               
    var submitModal = function() {
        modalPhoto.show();
    };

    $scope.reload = function() {
        $scope.showSpinner = true;
        $http.get('http://www.evolutiondigitalstl.com/svc/weddingImages.php/getImages').success(function(data) {
            controller.count = data.length;
            controller.data = data;
            $scope.showSpinner = false;
        }).error(function() {
            alert('error');
        });
    }

    $scope.takePicture = function(){
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 10,
            destinationType: Camera.DestinationType.DATA_URL,
            correctOrientation: true
        }, callback());
    }
               
    function callback() {
        $scope.isDisabled = false;
    }

    function onSuccess(imageData) {
        controller.image = "data:image/jpeg;base64," + imageData;
        $scope.picture = controller.image;
    }

    function onFail(message) {
        alert(message);
    }

    function clearCache() {
        navigator.camera.cleanup();
    }

    $scope.submit = function() {

    modalPhoto.show();
    var fileURI = controller.image;
    var params = {
        user: localStorage.getItem("userName"),
        date: getDate(),
        time: getTime()
    };

    win = function (r) {
            clearCache();
            retries = 0;
            modalPhoto.hide();
            alert('Photo submitted!');
        }

    fail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                onCapturePhoto(fileURI)
            }, 1000)
        } else {
            retries = 0;
            clearCache();
            modalPhoto.hide();
            alert(error);
        }
    }
               

    var options = new FileUploadOptions();
        options.params = params;
        options.chunkedMode = false;
        options.fileKey = "file";
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        ft = new FileTransfer();
        ft.upload(fileURI, encodeURI("http://www.evolutiondigitalstl.com/svc/weddingImages.php/addImage"), win, fail, options, callbackDisableButton());
        $scope.stop();
        $scope.start();
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
               
    function callbackDisableButton() {
        $scope.isDisabled = true;
    }
});