define(function() {
	'use strict';

	function PnfAdmin($provide, NgAdminConfigurationProvider) {
		$provide.factory('PnfAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var util = UtilityService;

			var pnf = nga.entity('pnfs')
				.identifier(nga.field('pnf_id'))
				.label('PNF');

			pnf.listView()
				.infinitePagination(false)
				.title('Lista de PNF')
				.fields([
					nga.field('pnf_id').label('pnf_id'),
					nga.field('pnf_desc').label('pnf_desc'),
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

			pnf.creationView()
				.title('Crear nuevo PNF')
				.fields([
					nga.field('pnf_desc').label('pnf_desc'),
				]);

			pnf.editionView()
				.title('Actualizar PNF #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('pnf_desc').label('pnf_desc'),
				]);

			pnf.showView()
				.title('Detalle PNF #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('pnf_id').label('pnf_id'),
					nga.field('pnf_desc').label('pnf_desc'),
				]);

			return pnf;
		}]);
	}
	PnfAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return PnfAdmin;
});