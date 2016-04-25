define(function() {
	'use strict';

	function EstuPnfAdmin($provide, NgAdminConfigurationProvider) {
		$provide.factory('EstuPnfAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var util = UtilityService;

			var estupnf = nga.entity('estupnfs')
				.identifier(nga.field('id'))
				.label('PNF Estudiantes');

			estupnf.listView()
				.title('PNF Estudiantes')
				.infinitePagination(false)
				.fields([
					nga.field('pnf.pnf_desc').label('pnf_desc'),
					nga.field('estu.cedu').label('cedu'),
					nga.field('estu.nomb_apell').label('nomb'),
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

			estupnf.creationView()
				.title('Crear nuevo estupnf')
				.fields([
					/*nga.field('pnf.pnf_desc').label('pnf_desc'),
					nga.field('estu.cedu').label('cedu')
						.validation({
							required: true
						}),
					nga.field('estu.nomb_apell').label('nomb')
						.validation({
							required: true
						}),*/
				]);

			estupnf.editionView()
				.title('Actualizar estupnf #{{ ::entry.identifierValue }}')
				.fields([
					/*nga.field('pnf.pnf_desc').label('pnf_desc'),
					nga.field('estu.cedu').label('cedu')
						.validation({
							required: true
						}),
					nga.field('estu.nomb_apell').label('nomb')
						.validation({
							required: true
						}),*/
				]);

			estupnf.showView()
				.title('Detalle estupnf #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('pnf.pnf_desc').label('pnf_desc'),
					nga.field('estu.cedu').label('cedu'),
					nga.field('estu.nomb_apell').label('nomb'),
				]);

			return estupnf;
		}]);
	}
	EstuPnfAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return EstuPnfAdmin;
});