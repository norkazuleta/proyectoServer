define(function() {
	'use strict';

	function DocenteAdmin($provide, NgAdminConfigurationProvider) {
		$provide.factory('DocenteAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var util = UtilityService;

			var docente = nga.entity('docentes')
				.identifier(nga.field('cedu'))
				.label('Profesores');

			docente.listView()
				.infinitePagination(false)
				.fields([
					nga.field('cedu').label('cedu'),
					nga.field('nomb').label('nomb'),
					nga.field('apell').label('apell'),
					nga.field('fn', 'date').label('fn')
					.format('dd-MM-yyyy'),
					nga.field('correo').label('correo'),
					nga.field('tlf').label('tlf'),
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

			docente.creationView()
				.title('Crear nuevo docente')
				.fields([
					nga.field('cedu').label('cedu'),
					nga.field('nomb').label('nomb'),
					nga.field('apell').label('apell'),
					nga.field('fn', 'date').label('fn')
					.format('dd-MM-yyyy'),
					nga.field('correo').label('correo'),
					nga.field('tlf').label('tlf'),
				]);

			docente.editionView()
				.title('Actualizar docente #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('cedu').label('cedu'),
					nga.field('nomb').label('nomb'),
					nga.field('apell').label('apell'),
					nga.field('fn', 'date').label('fn')
					.format('dd-MM-yyyy'),
					nga.field('correo').label('correo'),
					nga.field('tlf').label('tlf'),
				]);

			docente.showView()
				.title('Detalle docente #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('cedu').label('cedu'),
					nga.field('nomb').label('nomb'),
					nga.field('apell').label('apell'),
					nga.field('fn', 'date').label('fn')
					.format('dd-MM-yyyy'),
					nga.field('correo').label('correo'),
					nga.field('tlf').label('tlf'),
				]);

			return docente;
		}]);
	}
	DocenteAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return DocenteAdmin;
});