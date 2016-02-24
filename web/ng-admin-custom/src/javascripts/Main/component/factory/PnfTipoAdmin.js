define(function() {
	'use strict';

	function PnfTipoAdmin($provide, NgAdminConfigurationProvider) {
		$provide.factory('PnfTipoAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var util = UtilityService;

			var pnftipo = nga.entity('pnftipos')
				.identifier(nga.field('tipo_id'))
				.label('PNF TIPO');

			pnftipo.listView()
				.infinitePagination(false)
				.fields([
					nga.field('tipo_id').label('tipo_id'),
					nga.field('tipo_desc').label('tipo_desc'),
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

			pnftipo.creationView()
				.title('Crear nuevo pnftipo')
				.fields([
					nga.field('tipo_desc').label('tipo_desc'),
				]);

			pnftipo.editionView()
				.title('Actualizar pnftipo #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('tipo_desc').label('tipo_desc'),
				]);

			pnftipo.showView()
				.title('Detalle pnftipo #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('tipo_id').label('tipo_id'),
					nga.field('tipo_desc').label('tipo_desc'),
				]);

			return pnftipo;
		}]);
	}
	PnfTipoAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return PnfTipoAdmin;
});