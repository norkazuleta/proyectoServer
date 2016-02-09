/*global define*/

define(function () {
	'use strict';

	var HomeController = function ($scope, $state) {

		this.$scope = $scope;
		this.$state = $state;

		$scope.$on('$destroy', this.destroy.bind(this));
	};

	HomeController.prototype.destroy = function () {
		this.$scope = undefined;
		this.$state = undefined;
	};

	HomeController.$inject = ['$scope', '$state'];

	return HomeController;
});