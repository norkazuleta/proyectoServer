define(function(require) {
	'use strict';

	function UcAdmin($provide, NgAdminConfigurationProvider, PnfAdminProvider) {
		$provide.factory('UcAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;
			var util = UtilityService;
			var pnf = PnfAdminProvider.$get();

			var uc = nga.entity('unidadcurriculars')
				.identifier(nga.field('uc_id'))
				.label('Unidad Curricular');

			uc.listView()
				.infinitePagination(false)
				.title('Lista de Unidad Curricular')
				.fields([
					nga.field('uc_id').label('uc_id'),
					nga.field('uc_desc').label('uc_desc'),
					nga.field('pnf.pnf_desc').label('pnf_desc'),
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

			uc.creationView()
				.title('Crear nueva Unidad Curricular')
				.fields([
					nga.field('pnf', 'choice')
					.label('pnf_desc')
					.choices(function(entry, scope) {

						util.choicePnf()(entry, scope);

						$rootScope.$broadcast('choice:pnf:get');

						return [];
					}),

					nga.field('uc_desc').label('uc_desc'),
				]);

			uc.editionView()
				.title('Actualizar Unidad Curricular #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('pnf', 'choice')
					.label('pnf_desc')
					.choices(function(entry, scope) {

						entry.values['pnf'] = entry.values['pnf.pnf_id'];

						util.choicePnf()(entry, scope);

						$rootScope.$broadcast('choice:pnf:get');

						return [];
					}),

					nga.field('uc_desc').label('uc_desc'),
				]);

			uc.showView()
				.title('Detalle Unidad Curricular #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('pnf.pnf_id', 'reference')
					.label('pnf_desc')
					.targetEntity(pnf)
					.targetField(nga.field('pnf_desc')),

					nga.field('uc_desc').label('uc_desc'),
					nga.field('uc_id').label('uc_id'),
				]);

			return uc;
		}]);
	}
	UcAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider', 'PnfAdminProvider'];

	return UcAdmin;
});