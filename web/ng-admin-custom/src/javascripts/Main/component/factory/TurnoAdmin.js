define(function() {
	'use strict';

	function TurnoAdmin($provide, NgAdminConfigurationProvider) {
		$provide.factory('TurnoAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var util = UtilityService;

			var turno = nga.entity('turnos')
				.identifier(nga.field('turn_id'))
				.label('Turnos');

			turno.listView()
				.infinitePagination(false)
				.fields([
					nga.field('turn_id').label('turn_id'),
					nga.field('turn_desc').label('turn_desc'),
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

			turno.creationView()
				.title('Crear nuevo turno')
				.fields([
					nga.field('turn_desc').label('turn_desc'),
				]);

			turno.editionView()
				.title('Actualizar turno #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('turn_desc').label('turn_desc'),
				]);

			turno.showView()
				.title('Detalle turno #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('turn_id').label('turn_id'),
					nga.field('turn_desc').label('turn_desc'),
				]);

			return turno;
		}]);
	}
	TurnoAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return TurnoAdmin;
});