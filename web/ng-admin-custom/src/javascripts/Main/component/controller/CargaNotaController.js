import cargaNotaTemplate from '../../view/layoutModalCargaNota.html';

class CargaNotaModalController {
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

		this.$scope.notas = this.getNotas();
		this.$scope.asists = this.getAsist();

		this.$scope.close = this.close.bind(this);
		this.$scope.selEstu = this.selEstu.bind(this);
		this.$scope.removeEstu = this.removeEstu.bind(this);
		this.$scope.initItem = this.initItem.bind(this);

		this.$scope.$on('$destroy', this.destroy.bind(this));
	}

	initItem(item, index) {
		this.$scope.model[index] = {};
		if (item.cedu) {
			this.$scope.model[index].cedu = item.cedu;
		}

		if (item.nota) {
			this.$scope.model[index].nota = item.nota;
		}

		if (item.asist) {
			this.$scope.model[index].asist = item.asist;
		}
	}

	getNotas() {
		var notas = [];
		notas.push({
			value: '0',
			label: 'PI'
		});
		for (var i = 0; i < 20; i++) {
			if (i < 9) {
				notas.push({
					value: (i + 1),
					label: '0' + (i + 1)
				});
			} else {
				notas.push({
					value: (i + 1),
					label: (i + 1)
				});
			}
		}
		return notas;
	}

	getAsist() {
		var asist = [];
		for (var i = 0; i < 100; i++) {
			asist.push({
				value: (i + 1),
				label: (i + 1) + '%'
			});
		}
		return asist;
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

				var items = [],
					estus = [],
					_estus = [],
					_notas = [];
				angular.forEach(this.$scope.values['estu'], function(item) {
					_estus.push(item.cedu.cedu);
				});

				angular.forEach(this.$scope.values['nota'], function(item) {
					_notas.push({cedu: item.cedu.cedu, nota: item.nota, asist: item.asist});
				});

				if (this.$scope.estudiantes.length) {
					angular.forEach(this.$scope.estudiantes, (item) => {
						if (_estus.indexOf(item.cedu) !== -1) {
							angular.forEach(_notas, function(_item){
								if (_item.cedu === item.cedu) {
									item.nota = _item.nota;
									item.asist = _item.asist;
								}
							});

							items.push(item);
							estus.push(item.cedu);
						}
					});
				}

				if (items.length) {

					this.$scope.insc = estus.length;

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
			notas: this.$scope.model
		};

		this.progression.start();

		this.rest
			.createOne(data, 'notas', '/api/notas/asigs')
			.then(() => {
				this.progression.done();
				this.notification.log('Changes successfully saved.', {
					addnCls: 'humane-flatty-success'
				});

				this.refresh();
			}, () => {
				this.progression.done();
				this.notification.log('Error 500.', {
					addnCls: 'humane-flatty-error'
				});
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
			template: cargaNotaTemplate,
			controller: CargaNotaModalController,
			controllerAs: 'carganota',
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

CargaNotaModalController.$inject = ['$scope', '$modalInstance', 'notification', 'progression', 'UtilityService', '$state', '$stateParams', 'RestWrapper', 'identifier', 'values'];

AsigEstuController.$inject = ['$scope', '$modal'];