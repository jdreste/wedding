app.controller('MainController', function($scope) {

    $(document.body).on("pageinit", "#main-page", function() {
        if (localStorage.getItem("code") == "yes") {
            if (localStorage.getItem("userName") == null) {
                nameModal.show();
            }
        } else {
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
            $scope.closeNameModal();
        }
            $('#codeValidationError').show();
    }

    $scope.closeNameModal = function() {
        var pattern = /^[a-zA-Z -\']*[a-zA-Z]+[a-zA-Z -\']*$/;
        if (pattern.test($scope.txtName)) {
            if (localStorage != undefined) {
                localStorage.setItem("userName", $scope.txtName);
            } else {
                alert("Can't store name in storage.");
            }
            nameModal.hide();
        }
        $('#nameValidationError').show();
    }
});