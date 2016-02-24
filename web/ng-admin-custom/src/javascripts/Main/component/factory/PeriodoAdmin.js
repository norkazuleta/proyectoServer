define(function() {
	'use strict';

	function PeriodoAdmin($provide, NgAdminConfigurationProvider) {
		$provide.factory('PeriodoAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var util = UtilityService;

			var periodo = nga.entity('periodos')
				.identifier(nga.field('peri_id'))
				.label('Periodos');

			periodo.listView()
				.infinitePagination(false)
				.fields([
					nga.field('peri_id').label('peri_id'),
					nga.field('peri_desc').label('peri_desc'),
				])
				.filters([
					nga.field('q', 'template')
					.label('')
					.pinned(true)
					.template('<div class="input-group"><input type="text" ng-model="value" ng-model-options="{debounce: 1500}" placeholder="Buscar" class="form-control"></input><span ng-click="$parent.filterCtrl.filter()" class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),

					nga.field('filters_operator', 'choice')
					.label('Operador SQL')
					.choices(util.filterOperators()),

					nga.field('limit', 'choice')
					.label('Mostrar limite')
					.choices(util.filterLimit()),
				])
				.listActions(['edit', 'delete', 'show']);

			periodo.creationView()
				.title('Crear nuevo periodo')
				.fields([
					nga.field('peri_desc').label('peri_desc'),
				]);

			periodo.editionView()
				.title('Actualizar periodo #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('peri_desc').label('peri_desc'),
				]);

			periodo.showView()
				.title('Detalle periodo #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('peri_id').label('peri_id'),
					nga.field('peri_desc').label('peri_desc'),
				]);

			return periodo;
		}]);
	}
	PeriodoAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return PeriodoAdmin;
});