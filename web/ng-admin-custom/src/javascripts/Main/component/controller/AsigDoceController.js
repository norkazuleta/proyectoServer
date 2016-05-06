import asigDoceTemplate from '../../view/layoutModalAsigDoce.html';

class AsigDoceModalController {
	constructor($scope, $modalInstance, notification, progression, UtilityService, $state, $stateParams, RestWrapper, identifier, values) {
		this.$scope = $scope;
		this.$modalInstance = $modalInstance;
		this.notification = notification;
		this.progression = progression;
		this.util = UtilityService;
		this.$state = $state;
		this.$stateParams = $stateParams;
		this.rest = RestWrapper;

		this.$scope.secc = identifier;
		this.$scope.values = values;
		this.$scope.doce = {};
		this.$scope.docentes = [];

		this.$scope.item = {
			loading: true
		};

		this.getDocentes();

		this.$scope.close = this.close.bind(this);
		this.$scope.selDoce = this.selDoce.bind(this);

		this.$scope.$on('$destroy', this.destroy.bind(this));
	}

	getDocentes() {
		this.util
			.apiDocente()
			.then((response) => {
				this.$scope.docentes = this.util.dataPrepare(response.data.originalElement, [{
					label: 'persona.cedu_nomb_apell'
				}, {
					value: 'persona.cedu'
				}, {
					nomb: 'persona.nomb'
				}, {
					apell: 'persona.apell'
				}, {
					'nomb_apell': 'persona.nomb_apell'
				}, {
					cedu: 'persona.cedu'
				}, {
					correo: 'persona.correo'
				}, {
					telf: 'persona.telf'
				}]);

				if (this.$scope.docentes.length) {
					angular.forEach(this.$scope.docentes, (item) => {
						if (item.cedu === this.$scope.values['doce.cedu.cedu']) {
							this.selected(item);
						}
					});
				}

				this.$scope.insc = this.$scope.values['estu'].length;

				this.$scope.item = {
					loading: false
				};
			});
	}

	selDoce($item, $model) {
		this.selected($item);
	}

	refresh() {
		this.$state.go('list', this.$stateParams, {
			reload: true,
			inherit: false
		});
	}

	selected(item) {
		this.$scope.doce.cedu = item.cedu;
		this.$scope.doce.nomb_apell = item.nomb_apell;
		this.$scope.doce.telf = item.telf;
		this.$scope.docente = item.cedu;
	}

	submitEdition($event) {
		$event.preventDefault();
		if (!this.validateForm()) {
			return;
		}

		let data = {
			secc: this.$scope.secc,
			cedu: this.$scope.docente
		};

        this.progression.start();

		this.rest
			.createOne(data, 'secciondoces', '/api/secciondoces/asigs')
			.then(() => {
                this.progression.done();
                this.notification.log('Changes successfully saved.', { addnCls: 'humane-flatty-success' });
                this.refresh();
			}, () => {
				this.progression.done();
        		this.notification.log('Error 500.', {addnCls: 'humane-flatty-error'});
			});

	}

	validateForm() {
		if (!this.form.$valid) {
			this.notification.log('invalid form', {
				addnCls: 'humane-flatty-error'
			});
			return false;
		}

		return true;
	}

	close() {
		this.$modalInstance.close();
	}

	destroy() {
		this.$scope = undefined;
		this.$modalInstance = undefined;
		this.progression = undefined;
		this.RestWrapper = undefined;
		this.util = undefined;
	}
}

export default class AsigDoceController {
	constructor($scope, $modal) {
		this.$scope = $scope;
		this.$modal = $modal;

		this.$scope.open = this.openModal.bind(this);

		this.$scope.$on('$destroy', this.destroy.bind(this));
	}

	openModal($event, identifier, values) {
		$event.preventDefault();
		$event.stopPropagation();

		this.$modal.open({
			animation: true,
			template: asigDoceTemplate,
			controller: AsigDoceModalController,
			controllerAs: 'asigdoce',
			size: 'lg',
			resolve: {
				identifier: function() {
					return identifier;
				},
				values: function() {
					return values;
				}
			}
		});
	}

	destroy() {
		this.$modal = undefined;
		this.$scope = undefined;
	}
}

AsigDoceModalController.$inject = ['$scope', '$modalInstance', 'notification', 'progression', 'UtilityService', '$state', '$stateParams', 'RestWrapper', 'identifier', 'values'];

AsigDoceController.$inject = ['$scope', '$modal'];