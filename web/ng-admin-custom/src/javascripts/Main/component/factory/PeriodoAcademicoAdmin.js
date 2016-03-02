define(function(require) {
	'use strict';

	function PeriodoAcademicoAdmin($provide, NgAdminConfigurationProvider, PnfTipoAdminProvider) {
		$provide.factory('PeriodoAcademicoAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;
			var util = UtilityService;
			var pnftipo = PnfTipoAdminProvider.$get();

			var periodoacademico = nga.entity('periodoacademicos')
				.identifier(nga.field('pa_id'))
				.label('Periodo Académico');

			periodoacademico.listView()
				.infinitePagination(false)
				.title('Administar Periodo Académico')
				.fields([
					nga.field('pa_id').label('pa_id'),
					nga.field('pnf_tipo.tipo_desc').label('pnf_tipo_desc'),
					nga.field('pa_anio').label('pa_anio'),
					nga.field('pa_codi').label('pa_codi'),
					nga.field('pa_ini', 'date').label('pa_ini'),
					nga.field('pa_fin', 'date').label('pa_fin'),
					nga.field('pa_status', 'boolean').label('pa_status'),
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

			periodoacademico.creationView()
				.title('Crear nuevo Periodo Académico')
				.fields([
					nga.field('pnf_tipo', 'choice')
					.label('pnf_tipo_desc')
					.choices(function(entry, scope) {

						util.choicePnfTipo()(entry, scope);

						$rootScope.$broadcast('choice:pnftipo:get');

						return [];
					}),

					nga.field('pa_anio').label('pa_anio'),
					nga.field('pa_codi').label('pa_codi'),
					nga.field('pa_ini', 'date').label('pa_ini'),
					nga.field('pa_fin', 'date').label('pa_fin'),
					nga.field('pa_status','boolean').label('pa_status'),
				]);

			periodoacademico.editionView()
				.title('Actualizar Periodo Académico #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('pnf_tipo', 'choice')
					.label('pnf_tipo_desc')
					.choices(function(entry, scope) {

						entry.values['pnf_tipo'] = entry.values['pnf_tipo.tipo_id'];

						util.choicePnfTipo()(entry, scope);

						$rootScope.$broadcast('choice:pnftipo:get');

						return [];
					}),

					nga.field('pa_anio').label('pa_anio'),
					nga.field('pa_codi').label('pa_codi'),
					nga.field('pa_ini', 'date').label('pa_ini'),
					nga.field('pa_fin', 'date').label('pa_fin'),
					nga.field('pa_status', 'boolean').label('pa_status'),
				]);

			periodoacademico.showView()
				.title('Detalle Periodo Académico #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('pa_id').label('pa_id'),
					nga.field('pnf_tipo.tipo_id', 'reference')
					.label('pnf_tipo_desc')
					.targetEntity(pnftipo)
					.targetField(nga.field('tipo_desc')),

					nga.field('pa_anio').label('pa_anio'),
					nga.field('pa_codi').label('pa_codi'),
					nga.field('pa_ini', 'date').label('pa_ini'),
					nga.field('pa_fin', 'date').label('pa_fin'),
					nga.field('pa_status', 'boolean').label('pa_status'),
				]);

			return periodoacademico;
		}]);
	}
	PeriodoAcademicoAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider', 'PnfTipoAdminProvider'];

	return PeriodoAcademicoAdmin;
});