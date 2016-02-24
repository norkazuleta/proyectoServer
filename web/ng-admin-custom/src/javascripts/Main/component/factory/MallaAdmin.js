define(function(require) {
	'use strict';

	function MallaAdmin($provide, NgAdminConfigurationProvider, PnfTipoAdminProvider) {
		$provide.factory('MallaAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;
			var util = UtilityService;
			var pnftipo = PnfTipoAdminProvider.$get();

			var malla = nga.entity('mallas')
				.identifier(nga.field('malla_id'))
				.label('Mallas');

			malla.listView()
				.infinitePagination(false)
				.fields([
					nga.field('malla_id').label('malla_id'),
					nga.field('pnf_tipo.tipo_desc').label('pnf_tipo_desc'),
					nga.field('malla_anio').label('malla_anio'),
					nga.field('malla_codi').label('malla_codi'),
					nga.field('status').label('status'),
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

			malla.creationView()
				.fields([
					nga.field('pnf_tipo', 'choice')
					.label('PNF TIPO')
					.choices(function(entry, scope) {

						util.choicePnfTipo()(entry, scope);

						$rootScope.$broadcast('choice:pnftipo:get');

						return [];
					}),

					nga.field('malla_anio').label('malla_anio'),
					nga.field('malla_codi').label('malla_codi'),
					nga.field('status','boolean').label('estatus'),
				]);

			malla.editionView()
				.fields([
					nga.field('pnf_tipo', 'choice')
					.label('PNF TIPO')
					.choices(function(entry, scope) {

						entry.values['pnf_tipo'] = entry.values['pnf_tipo.tipo_id'];

						util.choicePnfTipo()(entry, scope);

						$rootScope.$broadcast('choice:pnftipo:get');

						return [];
					}),

					nga.field('malla_anio').label('malla_anio'),
					nga.field('malla_codi').label('malla_codi'),
					nga.field('status', 'boolean').label('estatus'),
				]);

			malla.showView()
				.fields([
					nga.field('malla_id').label('malla_id'),
					nga.field('pnf_tipo.tipo_id', 'reference')
					.label('PNF TIPO')
					.targetEntity(pnftipo)
					.targetField(nga.field('tipo_desc')),

					nga.field('malla_anio').label('malla_anio'),
					nga.field('malla_codi').label('malla_codi'),
					nga.field('status', 'boolean').label('estatus'),
				]);

			return malla;
		}]);
	}
	MallaAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider', 'PnfTipoAdminProvider'];

	return MallaAdmin;
});