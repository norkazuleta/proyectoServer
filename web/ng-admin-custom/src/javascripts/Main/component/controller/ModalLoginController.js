define(function() {
	'use strict';

	var ModalLoginController = function($rootScope, $scope, $modalInstance, AuthenticationService, progression, $state) {
		$scope.credentials = {
			/*username: 'admin',
			password: '123456'*/
		};

		$scope.$on('event:auth-login-failed', function(even, data) {
			$scope.errorMessage = data.message ? 'status.' + data.code : 'Bad credentials';
		});

		$scope.$on('event:auth-login-complete', function() {
			$modalInstance.close();
		});

		$scope.submit = function(credentials) {
			AuthenticationService.loginModal(credentials);
		};

		$scope.cancel = function() {
			AuthenticationService.cancel();
		};

		$scope.goHome = function() {
            progression.done();
			$modalInstance.close();
			AuthenticationService.cancel();
            $state.go('home');

		};

		$scope.goLostpassword = function() {
            progression.done();
			$modalInstance.close();
			AuthenticationService.cancel();
            $state.go('lostpassword');
		};
	};

	ModalLoginController.$inject = ['$rootScope', '$scope', '$modalInstance', 'AuthenticationService', 'progression', '$state'];

	return ModalLoginController;
});