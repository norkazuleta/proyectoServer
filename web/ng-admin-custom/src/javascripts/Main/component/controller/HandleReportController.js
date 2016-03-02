/*global define*/

define(function() {
	'use strict';
    var template = require('../../view/layoutModalReport.html');

	var HandleReportController = function($scope, $rootScope, $modal, $document, $stateParams, $log) {

		var title = 'Reporte';

		$scope.items = [{loading: true}];



		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			var modalInstance = $modal.open({
                animation: true,
                template: template,
                controller: ['$scope', '$modalInstance', 'progression', 'RestWrapper', '$document', '$sce', 'UtilityService', 'items', function($scope, $modalInstance, progression, RestWrapper, $document, $sce, UtilityService, items) {

                	this.$scope = $scope;
                	$scope.items = items;
					this.reportView = angular.element($document[0].querySelector('#show-view-reports'));
					this.rest = RestWrapper;
                	this.util = UtilityService;
                	this.progression = progression;
					this.$sce = $sce;

                	this.requestReport = function() {

						var queryString = this.util.toQueryString({});

						this.progression.start();

						//this.$scope.results = {};

						this.rest
							.getOne('reports', '/api/reports/s?' + queryString)
							.then((data) => {
								this.progression.done();
								console.log(data.originalElement);
								var url = data.originalElement.url + '&v=' + (new Date()).getTime() + Math.floor(Math.random() * 1000000);
								this.$scope.reportURL = this.$sce.trustAsResourceUrl(url);
								this.reportView.css('height', '1000px');
								this.$scope.items = [{loading:false}];
							}, (response) => {
								this.progression.done();
								console.log(response.originalElement, "failed");
							});
                	};



                	$scope.cancel = function () {
						$modalInstance.close();
					};

                	this.requestReport();

                }],
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            /*modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });*/

		};
	};

	HandleReportController.$inject = ['$scope', '$rootScope', '$modal', '$document', '$stateParams', '$log'];

	return HandleReportController;
});