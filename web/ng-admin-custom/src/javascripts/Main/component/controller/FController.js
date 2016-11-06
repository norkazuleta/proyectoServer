export default class FController {
	constructor($scope, UtilityService, RestWrapper) {
		this.$scope = $scope;
		this.util = UtilityService;
		this.rest = RestWrapper;

		this.$scope.personas = [{label: 'Cargando...', value: -1}];
		this.method = null;

		this.$scope.$on('$destroy', this.destroy.bind(this));
	}

	init(method) {
		this.method = method;
		this.getData();
	}

	getData() {
		if (typeof this.util[this.method] === 'function') {
			this.util
				.apiMethod(this.method)()
				.then((response) => {
					this.$scope.personas = this.util.dataPrepare(response.data.originalElement, [{
						value: 'id'
					}, {
						label: 'nac_cedu_nomb_apell'
					}]);
				});
		}
	}

	destroy() {
		this.$scope = undefined;
		this.util = undefined;
        this.rest = undefined;
	}
}

FController.$inject = ['$scope', 'UtilityService', 'RestWrapper'];
