define(function() {
	'use strict';

	function EstudianteAdmin($provide, NgAdminConfigurationProvider) {
		$provide.factory('EstudianteAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var util = UtilityService;

			var estudiante = nga.entity('estudiantes')
				.identifier(nga.field('cedu'))
				.label('Estudiantes');

			estudiante.listView()
				.infinitePagination(false)
				.fields([
					nga.field('cedu').label('cedu'),
					nga.field('nomb').label('nomb'),
					nga.field('apell').label('apell'),
					nga.field('fn', 'date').label('fn'),
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

			estudiante.creationView()
				.title('Crear nuevo estudiante')
				.fields([
					nga.field('cedu').label('cedu')
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
					nga.field('fn','date').label('fn')
					.validation({
						required: true
					}),
					nga.field('correo').label('correo')
					.validation({
						required: true
					}),
					nga.field('tlf').label('tlf')
					.validation({
						required: true
					}),
				]);

			estudiante.editionView()
				.title('Actualizar estudiante #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('cedu').label('cedu')
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
					nga.field('fn', 'date').label('fn')
					.validation({
						required: true
					}),
					nga.field('correo').label('correo')
					.validation({
						required: true
					}),
					nga.field('tlf').label('tlf')
					.validation({
						required: true
					}),
				]);

			estudiante.showView()
				.title('Detalle estudiante #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('cedu').label('cedu'),
					nga.field('nomb').label('nomb'),
					nga.field('apell').label('apell'),
					nga.field('fn', 'date').label('fn'),
					nga.field('correo').label('correo'),
					nga.field('tlf').label('tlf'),

					nga.field('Mostrar').label('')
          			.template('<a class="btn btn-default" ng-click="open($event, entry.values.cedu)" ng-controller="HandleReportController" href="#"><span class="fa fa-file-pdf-o"></span>&nbsp;<span class="hidden-xs">Record académico</span> </a>'),
				]);

			return estudiante;
		}]);
	}
	EstudianteAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return EstudianteAdmin;
});