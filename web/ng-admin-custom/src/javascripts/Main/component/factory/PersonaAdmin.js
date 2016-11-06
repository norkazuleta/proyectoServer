define(function() {
	'use strict';

	function PersonaAdmin($provide, NgAdminConfigurationProvider) {
		$provide.factory('PersonaAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var util = UtilityService;

			var categoria = nga.entity('personas')
				.identifier(nga.field('id'))
				.label('Personas');

			categoria.listView()
				.infinitePagination(false)
				.fields([
					nga.field('nac_cedu').label('Documento de identidad'),
					nga.field('nomb').label('nomb'),
					nga.field('apell').label('apell'),
					nga.field('fechnac', 'date').label('Fecha nacimiento')
					.format('dd-MM-yyyy'),
					nga.field('correo').label('correo'),
					nga.field('telf').label('Teléfono'),
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

			categoria.creationView()
				.title('Crear nueva persona')
				.fields([
					nga.field('naci', 'choice').label('Tipo documento')
					.choices(util.choiceNac())
					.validation({
						required: true
					}),
					nga.field('cedu').label('N° documento')
					.validation({
						required: true
					}),
					nga.field('nomb').label('nomb')
					.validation({
						required: true
					}),
					nga.field('apell').label('apell')
					.validation({
						required: true
					}),
					nga.field('fechnac', 'date').label('Fecha nacimiento')
					.format('dd-MM-yyyy'),
					nga.field('correo').label('correo'),
					nga.field('telf').label('Teléfono')
					.validation({
						required: true
					}),
					nga.field('profesion_fix').label('Prefijo profesión'),

				]);

			categoria.editionView()
				.title('Actualizar persona #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('naci', 'choice').label('Tipo documento')
					.choices(util.choiceNac())
					.validation({
						required: true
					}),
					nga.field('cedu').label('N° documento')
					.validation({
						required: true
					}),
					nga.field('nomb').label('nomb')
					.validation({
						required: true
					}),
					nga.field('apell').label('apell')
					.validation({
						required: true
					}),
					nga.field('fechnac', 'date').label('Fecha nacimiento')
					.format('dd-MM-yyyy'),
					nga.field('correo').label('correo'),
					nga.field('telf').label('Teléfono')
					.validation({
						required: true
					}),
					nga.field('profesion_fix').label('Prefijo profesión'),
				]);

			categoria.showView()
				.title('Detalle persona #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('nac_cedu').label('Documento de identidad'),
					nga.field('nomb').label('nomb'),
					nga.field('apell').label('apell'),
					nga.field('fechnac', 'date').label('Fecha nacimiento')
					.format('dd-MM-yyyy'),
					nga.field('correo').label('correo'),
					nga.field('telf').label('Teléfono'),
				]);

			return categoria;
		}]);
	}
	PersonaAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return PersonaAdmin;
});