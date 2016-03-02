define(function(require) {
	'use strict';

	function PnfTrayectoPeriodoUcAdmin($provide, NgAdminConfigurationProvider, PnfTrayectoPeriodoAdminProvider, UcAdminProvider) {
		$provide.factory('PnfTrayectoPeriodoUcAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;
			var util = UtilityService;
			var ptp = PnfTrayectoPeriodoAdminProvider.$get();
			var uc = UcAdminProvider.$get();

			var pnftrayperi = nga.entity('pnftrayectoperiodoucs')
				.identifier(nga.field('id'))
				.label('PNFs & Trayectos & Periodos & UC');

			pnftrayperi.listView()
				.infinitePagination(false)
				.fields([
					nga.field('id').label('ID'),
					nga.field('pnf_tray_peri.pnf.pnf_desc').label('pnf_desc'),
					nga.field('pnf_tray_peri.tray.tray_desc').label('tray_desc'),
					nga.field('pnf_tray_peri.peri.peri_desc').label('peri_desc'),
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
					nga.field('pnf_tray_peri', 'choice')
					.label('pnf_tray_peri')
					.choices(function(entry, scope) {

						util.choicePnfTrayPeri()(entry, scope);

						$rootScope.$broadcast('choice:pnftrayperi:get');

						return [];
					}),

					nga.field('uc', 'reference_many')
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
                    .attributes({ placeholder: 'Seleccione Unidad Curricular ...' }),
				]);

			pnftrayperi.editionView()
				.fields([
					/*nga.field('pnf', 'choice')
					.label('pnf_desc')
					.choices(function(entry, scope) {

						entry.values['pnf'] = entry.values['pnf.pnf_id'];

						util.choicePnf()(entry, scope);

						$rootScope.$broadcast('choice:pnf:get');

						return [];
					}),*/


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

				]);

			return pnftrayperi;
		}]);
	}
	PnfTrayectoPeriodoUcAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider', 'PnfTrayectoPeriodoAdminProvider', 'UcAdminProvider'];

	return PnfTrayectoPeriodoUcAdmin;
});