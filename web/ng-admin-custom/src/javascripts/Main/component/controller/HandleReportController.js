/*global define*/

define(function() {
	'use strict';
    var template = require('../../view/layoutModalReport.html');

	var HandleReportController = function($scope, $modal) {

		$scope.open = function($event, identifier) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.identifier = identifier;

			$modal.open({
                animation: true,
                template: template,
                controller: ['$scope', '$modalInstance', 'progression', 'RestWrapper', '$sce', 'UtilityService', 'identifier', function($scope, $modalInstance, progression, RestWrapper, $sce, UtilityService, identifier) {
                	this.$scope = $scope;
					this.rest = RestWrapper;
                	this.util = UtilityService;
                	this.progression = progression;
					this.$sce = $sce;
					this.$scope.item = {loading:true, loadingIFrame: false};
					this.identifier = identifier;

                	this.requestReport = function() {

						var queryString = this.util.toQueryString({id: this.identifier});

						this.progression.start();

						this.rest
							.getOne('reports', '/api/reports/s?' + queryString)
							.then((data) => {
								var url = data.originalElement.url + '&v=' + (new Date()).getTime() + Math.floor(Math.random() * 1000000);
								this.$scope.reportURL = this.$sce.trustAsResourceUrl(url);
								this.$scope.item = {loading:false, loadingIFrame: true};
								this.progression.done();
							}, () => {
								this.progression.done();
							});
                	};

                	this.resetLoading = function (elem) {
						elem.style.display = 'block';
                		if (elem.nextSibling.nextElementSibling) {
                			elem.nextSibling.nextElementSibling.style.display = 'none';
                		}
                	};
                	var load = false, selfa = this;
                	window.iframeload = function (iframe) {
						iframe.height = '800px';
						if (navigator.userAgent.indexOf("Chrome") > 0){
							if (!load) {
								load = true;
							} else{
								selfa.resetLoading(iframe);
							}
						} else {
							selfa.resetLoading(iframe);
						}
					};

                	$scope.cancel = function () {
						$modalInstance.close();
					};

                	this.requestReport();
                }],
                size: 'lg',
                resolve: {
                    identifier: function () {
                        return $scope.identifier;
                    }
                }
            });
		};
	};

	HandleReportController.$inject = ['$scope', '$modal'];

	return HandleReportController;
});