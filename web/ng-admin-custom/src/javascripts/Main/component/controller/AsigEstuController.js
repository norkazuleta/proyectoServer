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
		this.$scope.secc = identifier;

		this.$scope.values = values;
		this.$scope.model = {};
		this.$scope.estus = [];
		this.$scope.estudiantes = [];

		this.$scope.item = {
			loading: true
		};

		this.getEstudiates();

		this.$scope.close = this.close.bind(this);
		this.$scope.selEstu = this.selEstu.bind(this);
		this.$scope.removeEstu = this.removeEstu.bind(this);

		this.$scope.$on('$destroy', this.destroy.bind(this));
	}

	getEstudiates() {
		this.util
			.apiEstudiante()
			.then((response) => {

				this.$scope.estudiantes = this.util.dataPrepare(response.data.originalElement, [{
					label: 'cedu'
				}, {
					value: 'cedu'
				}, {
					nomb: 'nomb'
				}, {
					apell: 'apell'
				}, {
					'nomb_apell': 'nomb_apell'
				}, {
					cedu: 'cedu'
				}, {
					correo: 'correo'
				}, {
					tlf: 'tlf'
				}]);

				var items = [], estus = [], _estus = [];
				angular.forEach(this.$scope.values['estu'], function(item){
					_estus.push(item.cedu.cedu);
				});

				if (this.$scope.estudiantes.length) {
					angular.forEach(this.$scope.estudiantes, (item) => {
						if (_estus.indexOf(item.cedu) !== -1) {
							items.push(item);
							estus.push(item.cedu);
						}
					});
				}

				if (items.length) {

					this.$scope.insc = estus.length;
					this.$scope.model.estus = estus;

					this.selected(items);
				}

				this.$scope.item = {
					loading: false
				};
			});
	}

	selEstu($item, $model, $select) {
		this.selected($select.selected);
	}

	removeEstu($item, $model, $select) {
		this.selected($select.selected);
	}

	selected(items) {
		this.$scope.estus = items;
	}

	refresh() {
		this.$state.go('list', this.$stateParams, {
			reload: true,
			inherit: false
		});
	}

	submitEdition($event) {
		$event.preventDefault();
		if (!this.validateForm()) {
			return;
		}

		let data = {
			secc: this.$scope.secc,
			cedu: this.$scope.model.estus
		};

        this.progression.start();

		this.rest
			.createOne(data, 'seccionestus', '/api/seccionestus/asigs')
			.then(() => {
                this.progression.done();
                this.notification.log('Changes successfully saved.', { addnCls: 'humane-flatty-success' });
				this.$scope.insc = this.$scope.model.estus.length;
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