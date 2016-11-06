import template from '../../view/layoutModalReport.html';

class HandleReportModalController {

	constructor($scope, $modalInstance, progression, RestWrapper, $sce, UtilityService, personId, pnfId) {
		this.$scope = $scope;
		this.$modalInstance = $modalInstance;
		this.progression = progression;
		this.rest = RestWrapper;
		this.$sce = $sce;
		this.util = UtilityService;
		this.personId = personId;
		this.pnfId = pnfId;

		this.$scope.item = { loading: true, loadingIFrame: false };

		this.initIframe();
		this.request();

		this.$scope.close = this.close.bind(this);
		this.$scope.$on('$destroy', this.destroy.bind(this));
	}

	request() {
		var queryString = this.util.toQueryString({
		 'param': {
			 'persona_id': this.personId,
			 'pnf_id': this.pnfId
		 },
		 'action': 'rpt',
		 'report': 'recordEstu'
		});
		this.progression.start();

		this.rest
			.getOne('reports', '/api/reports?' + queryString)
			.then((data) => {
				var url = data.originalElement.url + '&v=' + (new Date()).getTime() + Math.floor(Math.random() * 1000000);
				this.$scope.reportURL = this.$sce.trustAsResourceUrl(url);
				this.$scope.item = { loading: false, loadingIFrame: true };
				this.progression.done();
			}, () => {
				this.progression.done();
			});
	}

	resetLoading(elem) {
		elem.style.display = 'block';
		if (elem.nextSibling.nextElementSibling) {
			elem.nextSibling.nextElementSibling.style.display = 'none';
		}
	}

	initIframe() {
		var load = false;
		window.iframeload = (iframe) => {
			iframe.height = '800px';
			if (navigator.userAgent.indexOf("Chrome") > 0) {
				if (!load) {
					load = true;
				} else {
					this.resetLoading(iframe);
				}
			} else {
				this.resetLoading(iframe);
			}
		};
	}

	close() {
		this.$modalInstance.close();
	}

	destroy() {
		this.$scope = undefined;
		this.rest = undefined;
		this.util = undefined;
		this.progression = undefined;
		this.$sce = undefined;
		this.$scope = undefined;

	}
}

export default class HandleReportController {
	constructor($scope, $modal) {
		this.$scope = $scope;
		this.$modal = $modal;

		this.$scope.open = this.openModal.bind(this);
		this.$scope.$on('$destroy', this.destroy.bind(this));
	}

	openModal($event, personaId, pnfId) {
		$event.preventDefault();
		$event.stopPropagation();

		this.$modal.open({
			animation: true,
			template: template,
			controller: HandleReportModalController,
			controllerAs: 'handlereport',
			size: 'lg',
			resolve: {
				personaId: function() {
					return personaId;
				},
				pnfId: function() {
					return pnfId;
				}
			}
		});
	}

	destroy() {
		this.$scope = undefined;
		this.$modal = undefined;
	}
}

HandleReportModalController.$inject = ['$scope', '$modalInstance', 'progression', 'RestWrapper', '$sce', 'UtilityService', 'personaId', 'pnfId'];

HandleReportController.$inject = ['$scope', '$modal'];