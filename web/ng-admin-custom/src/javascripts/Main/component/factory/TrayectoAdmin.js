define(function() {
	'use strict';

	function TrayectoAdmin($provide, NgAdminConfigurationProvider) {
		$provide.factory('TrayectoAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var util = UtilityService;

			var trayecto = nga.entity('trayectos')
				.identifier(nga.field('tray_id'))
				.label('Trayectos');

			trayecto.listView()
				.infinitePagination(false)
				.fields([
					nga.field('tray_id').label('tray_id'),
					nga.field('tray_desc').label('tray_desc'),
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

			trayecto.creationView()
				.title('Crear nuevo trayecto')
				.fields([
					nga.field('tray_desc').label('tray_desc'),
				]);

			trayecto.editionView()
				.title('Actualizar trayecto #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('tray_desc').label('tray_desc'),
				]);

			trayecto.showView()
				.title('Detalle trayecto #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('tray_id').label('tray_id'),
					nga.field('tray_desc').label('tray_desc'),
				]);

			return trayecto;
		}]);
	}
	TrayectoAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return TrayectoAdmin;
});