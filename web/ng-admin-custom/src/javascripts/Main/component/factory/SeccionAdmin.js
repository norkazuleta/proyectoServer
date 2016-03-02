define(function(require) {
	'use strict';

	function SeccionAdmin($provide, NgAdminConfigurationProvider) {
		$provide.factory('SeccionAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var util = UtilityService;

			var seccion = nga.entity('seccions')
				.identifier(nga.field('secc_id'))
				.label('Secciones');


			seccion.listView()
				.infinitePagination(false)
				.title('Lista Secciones')
				.fields([
					nga.field('secc_id').label('ID'),
					nga.field('secc_codi').label('Código sección'),
					nga.field('pnf.pnf_desc').label('PNF'),
					nga.field('tray.tray_desc').label('Trayecto'),
					nga.field('peri.peri_desc').label('Periodo'),
					nga.field('uc.uc_desc').label('Unidad Curricular'),
					nga.field('pa.pa_peri').label('Periodo Académico'),
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

			seccion.creationView()
				.title('Nueva Sección')
				.fields([
					nga.field('pnf', 'choice')
					.label('PNF')
					.validation({
						required: true
					})
					.attributes({
						'on-select': 'selPnf($item, $model)',
					})
					.choices(function(entry, scope) {

						scope.selPnf = selPnf;

						util.choicePnf()(entry, scope);

						$rootScope.$broadcast('choice:pnf:get');

						return [];

						function selPnf ($item, $model) {
							$rootScope.$broadcast('choice:uc:get', $item, $model);
						}
					}),
					nga.field('tray', 'choice')
					.label('Trayecto')
					.attributes({
						'on-select': 'selTray($item, $model)',
					})
					.choices(function(entry, scope) {

						scope.selTray = selTray;

						util.choiceTrayecto()(entry, scope);

						$rootScope.$broadcast('choice:trayecto:get');

						return [];

						function selTray ($item, $model) {
							$rootScope.$broadcast('choice:periodo:get', [$item]);
						}
					}),
					nga.field('peri', 'choice')
					.label('Periodo')
					.attributes({
						'on-select': 'selPeri($item, $model)',
					})
					.choices(function(entry, scope) {

						scope.selPeri = selPeri;

						util.choicePeriodo()(entry, scope);

						$rootScope.$broadcast('choice:periodo:get');

						return [];

						function selPeri ($item, $model) {
							$rootScope.$broadcast('choice:uc:get', [$item]);
						}
					}),
					nga.field('uc', 'choice')
					.label('Unidad Curricular')
					.choices(function(entry, scope) {

						scope.selUc = selUc;

						util.choicePeriodo()(entry, scope);

						$rootScope.$broadcast('choice:uc:get');

						return [];

						function selUc ($item, $model) {
							//$rootScope.$broadcast('choice:uc:get', [$item]);
						}
					}),
					nga.field('pa', 'choice')
					.label('Periodo Académico')
					.choices(function(entry, scope) {

						scope.selPa = selPa;

						util.choicePa()(entry, scope);

						$rootScope.$broadcast('choice:pa:get');

						return [];

						function selPa ($item, $model) {
							//$rootScope.$broadcast('choice:uc:get', [$item]);
						}
					})
				]);

			seccion.editionView()
				.title('Actualizar Sección #{{ ::entry.identifierValue }}')
				.fields([
				]);

			seccion.showView()
				.title('Detalle Sección #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('secc_id').label('ID'),
					nga.field('secc_codi').label('Código sección'),
					nga.field('pnf.pnf_desc').label('PNF'),
					nga.field('tray.tray_desc').label('trayecto'),
					nga.field('peri.peri_desc').label('periodo'),
					nga.field('uc.uc_desc').label('Unidad Curricular'),
					nga.field('pa.pa_desc').label('Periodo Académico'),
				]);


			return seccion;
		}]);
	}
	SeccionAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return SeccionAdmin;
});