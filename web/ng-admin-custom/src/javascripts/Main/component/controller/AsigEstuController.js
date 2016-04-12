import asigEstuTemplate from '../../view/layoutModalAsigEstu.html';

class AsigEstuModalController {
	constructor($scope, $modalInstance, notification, progression, UtilityService, $state, $stateParams, RestWrapper, identifier, values) {
		this.$scope = $scope;
		this.$modalInstance = $modalInstance;
		this.notification = notification;
		this.progression = progression;
		this.util = UtilityService;
		this.$state = $state;
		this.$stateParams = $stateParams;
		this.rest = RestWrapper;
		this.identifier = identifier;
		this.$scope.secc = identifier;
		this.values = values;

		this.$scope.identifier = identifier;
		this.$scope.values = values;
		this.$scope.estu = {};
		this.$scope.estudiantes = [];

		this.$scope.item = {
			loading: false
		};

		this.getEstudiates();

		this.$scope.close = this.close.bind(this);

		this.$scope.selEstu = this.selEstu.bind(this);

		this.$scope.$on('$destroy', this.destroy.bind(this));
	}

	getEstudiates() {
		this.util
			.apiEstudiante()
			.then((response) => {
				let data = [];
				angular.forEach(response.data.originalElement, function(item) {
					data.push(item);
				});


				this.$scope.estudiantes = this.util.dataPrepare(response.data.originalElement, [{
					label: 'cedu'
				}, {
					value: 'cedu'
				}, {
					nomb: 'nomb'
				}, {
					apell: 'apell'
				}, {
					nomb_apell: 'nomb_apell'
				}, {
					cedu: 'cedu'
				}, {
					correo: 'correo'
				}, {
					tlf: 'tlf'
				}]);

				if (this.$scope.estudiantes.length) {
					angular.forEach(this.$scope.estudiantes, (item) => {
						if (item.cedu === this.$scope.values['estu.cedu.cedu']) {
							this.selected(item);
						}
					});
				}

				this.$scope.item = {
					loading: false
				};
			});
	}

	selEstu($item, $model) {
		this.selected($item);
	}

	refresh() {
		this.$state.go('list', this.$stateParams, {
			reload: true,
			inherit: false
		});
	}

	selected(item) {
		this.$scope.estu.cedu = item.cedu;
		this.$scope.estu.nomb_apell = item.nomb_apell;
		this.$scope.estu.tlf = item.tlf;
		this.$scope.estudiante = item.cedu;
	}

	submitEdition($event) {
		$event.preventDefault();
		if (!this.validateForm()) {
			return;
		}

		let data = {
			secc: this.$scope.secc,
			cedu: this.$scope.estudiante
		};

        this.progression.start();

		this.rest
			.createOne(data, 'seccionestus', '/api/seccionestus/asigs')
			.then((response) => {
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
		this.identifier = undefined;
		this.values = undefined;
	}
}

export default class AsigEstuController {
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
			template: asigEstuTemplate,
			controller: AsigEstuModalController,
			controllerAs: 'asigestu',
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

AsigEstuModalController.$inject = ['$scope', '$modalInstance', 'notification', 'progression', 'UtilityService', '$state', '$stateParams', 'RestWrapper', 'identifier', 'values'];

AsigEstuController.$inject = ['$scope', '$modal'];