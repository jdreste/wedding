app.controller('RegistryController', function($scope, $http) {
    $scope.target = 'http://www.target.com/gift-registry/giftgiver?registryId=ucxUvNYOfgTUdaknSDuuMw';
    $scope.bedbathbeyond = 'http://www.bedbathandbeyond.com/store/giftregistry/view_registry_guest.jsp?pwsToken=&eventType=Wedding&registryId=542892330&pwsurl';
    $scope.macys = 'http://www1.macys.com/registry/wedding/guest/?registryId=6500568&cm_sp=EXPERIMENT-_-Registry_16B_GVR1-_-Ctrl';

    $scope.goRegistry = function(store) {
               switch(store) {
               case 'target': $scope.openURL($scope.target);
               break;
               case 'bedbathbeyond': $scope.openURL($scope.bedbathbeyond);
               break;
               default: $scope.openURL($scope.macys);
               break;
               }
    }
               
    $scope.openURL = function(url) {
               alert(url);
         if (device.platform === 'Android') {
               alert('here');
               navigator.app.loadUrl(url, {openExternal:true});
         } else {
               alert('hi');
               window.open(url, '_system');
         }
    }
});