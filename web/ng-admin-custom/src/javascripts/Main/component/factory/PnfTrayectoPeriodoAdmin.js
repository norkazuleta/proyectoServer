define(function(require) {
	'use strict';

	function PnfTrayectoPeriodoAdmin($provide, NgAdminConfigurationProvider, PnfAdminProvider, TrayectoAdminProvider, PeriodoAdminProvider, UcAdminProvider) {
		$provide.factory('PnfTrayectoPeriodoAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;
			var util = UtilityService;
			var pnf = PnfAdminProvider.$get();
			var trayecto = TrayectoAdminProvider.$get();
			var periodo = PeriodoAdminProvider.$get();
			var uc = UcAdminProvider.$get();

			var pnftrayperi = nga.entity('pnftrayectoperiodos')
				.identifier(nga.field('id'))
				.label('PNFs & Trayectos & Periodos');

			pnftrayperi.listView()
				.infinitePagination(false)
				.fields([
					nga.field('id').label('ID'),
					nga.field('pnf.pnf_desc').label('pnf_desc'),
					nga.field('tray.tray_desc').label('tray_desc'),
					nga.field('peri.peri_desc').label('peri_desc'),
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

			pnftrayperi.creationView()
				.fields([
					nga.field('pnf', 'choice')
					.label('pnf_desc')
					.choices(function(entry, scope) {

						util.choicePnf()(entry, scope);

						$rootScope.$broadcast('choice:pnf:get');

						return [];
					}),

					nga.field('tray', 'choice')
					.label('tray_desc')
					.choices(function(entry, scope) {

						util.choiceTrayecto()(entry, scope);

						$rootScope.$broadcast('choice:trayecto:get');

						return [];
					}),

					nga.field('peri', 'choice')
					.label('peri_desc')
					.choices(function(entry, scope) {

						util.choicePeriodo()(entry, scope);

						$rootScope.$broadcast('choice:periodo:get');

						return [];
					}),
				]);

			pnftrayperi.editionView()
				.fields([
					nga.field('pnf', 'choice')
					.label('pnf_desc')
					.choices(function(entry, scope) {

						entry.values['pnf'] = entry.values['pnf.pnf_id'];

						util.choicePnf()(entry, scope);

						$rootScope.$broadcast('choice:pnf:get');

						return [];
					}),

					nga.field('tray', 'choice')
					.label('tray_desc')
					.choices(function(entry, scope) {

						entry.values['tray'] = entry.values['tray.tray_id'];

						util.choiceTrayecto()(entry, scope);

						$rootScope.$broadcast('choice:trayecto:get');

						return [];
					}),

					nga.field('peri', 'choice')
					.label('peri_desc')
					.choices(function(entry, scope) {

						entry.values['peri'] = entry.values['peri.peri_id'];

						util.choicePeriodo()(entry, scope);

						$rootScope.$broadcast('choice:periodo:get');

						return [];
					}),

					/**nga.field('uc', 'reference_many')
					.label('Unidad Curricular')
                    .targetEntity(uc)
                    .targetField(nga.field('uc_desc'))
                    .filters(function(search) {
                        return search ? { q: search } : null;
                    })
                    .remoteComplete(false, {
                    	refreshDelay: 300,
                    	searchQuery: search =>({
                    		q:search
                    	})
                    })
                    .permanentFilters({'filters[pnf]': '1'})
                    .attributes({ placeholder: 'Seleccione Unidad Curricular ...' }),**/
				]);

			pnftrayperi.showView()
				.fields([
					nga.field('pnf.pnf_id', 'reference')
					.label('pnf_desc')
					.targetEntity(pnf)
					.targetField(nga.field('pnf_desc')),

					nga.field('tray.tray_id', 'reference')
					.label('tray_desc')
					.targetEntity(trayecto)
					.targetField(nga.field('tray_desc')),

					nga.field('peri.peri_id', 'reference')
					.label('peri_desc')
					.targetEntity(periodo)
					.targetField(nga.field('peri_desc')),

				]);

			return pnftrayperi;
		}]);
	}
	PnfTrayectoPeriodoAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider', 'PnfAdminProvider', 'TrayectoAdminProvider', 'PeriodoAdminProvider', 'UcAdminProvider'];

	return PnfTrayectoPeriodoAdmin;
});