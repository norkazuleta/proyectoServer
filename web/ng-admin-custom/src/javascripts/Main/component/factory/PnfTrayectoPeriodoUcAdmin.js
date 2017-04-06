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
				.title('Administrar UCs')
				.fields([
					nga.field('id').label('ID'),
					nga.field('pnf_tray_peri.pnf.pnf_desc').label('pnf_desc'),
					nga.field('pnf_tray_peri.tray.tray_desc').label('tray_desc'),
					nga.field('pnf_tray_peri.peri.peri_desc').label('peri_desc'),
					nga.field('uc.uc_desc').label('uc_desc'),
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


			pnftrayperi.showView()
				.title('Detalle UC #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('id').label('ID'),
					nga.field('pnf_tray_peri.pnf.pnf_desc').label('pnf_desc'),
					nga.field('pnf_tray_peri.tray.tray_desc').label('tray_desc'),
					nga.field('pnf_tray_peri.peri.peri_desc').label('peri_desc'),
					nga.field('uc.uc_desc').label('uc_desc'),
				]);

			return pnftrayperi;
		}]);
	}
	PnfTrayectoPeriodoUcAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider', 'PnfTrayectoPeriodoAdminProvider', 'UcAdminProvider'];

	return PnfTrayectoPeriodoUcAdmin;
});