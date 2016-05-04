app.controller('MainController', function($scope) {
               
    $scope.codeValidationError = true;
    $scope.nameValidationError = true;
    
    angular.element(document).ready(function () {
        if (localStorage.getItem("code") != "yes") {
            codeModal.show();
        }
    });

    $scope.closeCodeModal = function() {
        var code = "06/25/16";
        if (code == $scope.txtCode) {
            if (localStorage != undefined) {
                localStorage.setItem("code", "yes");
            } else {
                alert("Can't store code in storage.");
            }
            codeModal.hide();
            nameModal.show();
        } else {
            $scope.codeValidationError = false;
        }
    }

    $scope.closeNameModal = function() {
        var pattern = /^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/i;
        if (pattern.test($scope.txtName)) {
            if (localStorage != undefined) {
                localStorage.setItem("userName", $scope.txtName);
                nameModal.hide();
            } else {
                alert("Can't store name in storage.");
            }
        } else {
            $scope.nameValidationError = false;
        }
    }
});