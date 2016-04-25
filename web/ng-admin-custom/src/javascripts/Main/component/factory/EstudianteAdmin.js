define(function() {
	'use strict';

	function EstudianteAdmin($provide, NgAdminConfigurationProvider, PnfAdminProvider) {
		$provide.factory('EstudianteAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var pnf = PnfAdminProvider.$get();
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
					nga.field('fn', 'date').label('fn')
					.format('dd-MM-yyyy'),
					nga.field('correo').label('correo'),
					nga.field('tlf').label('tlf'),
					nga.field('estu_pnf', 'template')
					.label('PNF')
					.template('<span ng-repeat="item in entry.values.estu_pnf track by $index" class="label label-default">{{ item.pnf.pnf_desc }}</span>')
					.cssClasses('hidden-xs'),
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
					nga.field('fn', 'date').label('fn')
					.format('dd-MM-yyyy')
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

					nga.field('estu_pnf', 'reference_many')
					.label('PNF')
					.attributes({
						placeholder: 'Filtrar/Seleccionar PNF.'
					})
					.targetEntity(pnf)
					.targetField(nga.field('pnf_desc'))
					.filters(function(search) {
						return search ? {
							q: search
						} : null;
					})
					.remoteComplete(true, {
						refreshDelay: 300
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
					.format('dd-MM-yyyy')
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

					nga.field('estu_pnf', 'reference_many')
					.label('PNF')
					.attributes({
						placeholder: 'Filtrar/Seleccionar PNF.'
					})
					.targetEntity(pnf)
					.targetField(nga.field('pnf_desc'))
					.filters(function(search) {
						return search ? {
							q: search
						} : null;
					})
					.remoteComplete(false, {
						refreshDelay: 300
					}),
				]);

			estudiante.showView()
				.title('Detalle estudiante #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('cedu').label('cedu'),
					nga.field('nomb').label('nomb'),
					nga.field('apell').label('apell'),
					nga.field('fn', 'date').label('fn')
					.format('dd-MM-yyyy'),
					nga.field('correo').label('correo'),
					nga.field('tlf').label('tlf'),
					nga.field('aldea_turno', 'template')
					.label('PNF')
					.template('<span ng-repeat="item in entry.values._estu_pnf track by $index" class="label label-default">{{ item.pnf.pnf_desc }}</span>')
					.cssClasses('hidden-xs'),
					nga.field('Mostrar').label('')
					.template('<a class="btn btn-default" ng-click="open($event, entry.values.cedu)" ng-controller="HandleReportController" href="#"><span class="fa fa-file-pdf-o"></span>&nbsp;<span class="hidden-xs">Record académico</span> </a>'),
				]);

			return estudiante;
		}]);
	}
	EstudianteAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider', 'PnfAdminProvider'];

	return EstudianteAdmin;
});