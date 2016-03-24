app.controller('MainController', function($scope) {

    $(document.body).on("pageinit", "#main-page", function() {
        if (localStorage.getItem("userName") == null) {
            modal.show();
        }
    });
    $scope.closeModal = function() {
        var pattern = /^[a-zA-Z -\']*[a-zA-Z]+[a-zA-Z -\']*$/;
        if (pattern.test($scope.txtName)) {
            if (localStorage != undefined) {
                localStorage.setItem("userName", $scope.txtName);
            } else {
                alert("Can't store name in storage.");
            }
            modal.hide();
           // $('#nameValidationError').show();
            return true;
        }
        $('#nameValidationError').show();
    }
});