(function() {
      'use strict';

      angular.module('app', ['dba.signature-angular'])
      .controller('ControllerSignature',function($scope,$rootScope){

            $scope.events = {
                  clean:clean
            }

            function clean(){
                  $rootScope.$broadcast('clean-canvas');
            }
            
      });
      
})();