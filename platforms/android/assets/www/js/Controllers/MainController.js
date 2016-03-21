app.controller('MainController', function($scope) {

    $(document.body).on("pageinit", "#main-page", function() {
        modal.show();
    });
    $scope.closeModal = function() {
        var pattern = /^[a-zA-Z -\']*[a-zA-Z]+[a-zA-Z -\']*$/;
        if (pattern.test($scope.txtName)) {
            modal.hide();
            $('#nameValidationError').show();
            return true;
        }
        $('#nameValidationError').show();
    }
});