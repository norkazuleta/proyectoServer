import estudianteCreateView  from '../../view/estudianteCreateView.html';

define(function() {
	'use strict';

	function EstudianteAdmin($provide, NgAdminConfigurationProvider, PnfAdminProvider) {
		$provide.factory('EstudianteAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var pnf = PnfAdminProvider.$get();
			var util = UtilityService;

			var estudiante = nga.entity('estudiantes')
				.identifier(nga.field('id'))
				.label('Estudiantes');

			var pdf = `<a class="btn btn-default btn-xs" ng-click="open($event, entry.values['persona.id'], entry.values['pnf.pnf_id'])" ng-controller="HandleReportController" href="#">
				<span class="fa fa-file-pdf-o"></span>
				<span class="hidden-xs"></span>
			</a>`;

			var filter = `
				<ui-select  ng-model="values['q']" ng-required="true" required="required" id="q" name="q" ng-controller="FController as f" ng-init="f.init('apiEstu');">
				    <ui-select-match allow-clear="true" placeholder="Valores de filtro">{{ $select.selected.label }}</ui-select-match>
				    <ui-select-choices repeat="item.value as item in personas | filter: {label: $select.search} track by $index">
				        {{ item.label }}
				    </ui-select-choices>
				</ui-select>
			`;

			estudiante.listView()
				.infinitePagination(false)
				.fields([
					nga.field('persona.nac_cedu').label('Documento de identidad'),
					nga.field('persona.nomb_apell').label('Nombre Apellido'),
					nga.field('persona.fechnac', 'date').label('fn')
					.format('dd-MM-yyyy'),
					nga.field('persona.correo').label('correo'),
					nga.field('persona.telf').label('tlf'),
					nga.field('pnf.pnf_desc').label('PNF'),
				])
				.filters([
					nga.field('q', 'template')
					.label('')
					.pinned(true)
					//.template('<div class="input-group"><input type="text" ng-model="value" ng-model-options="{debounce: 1500}" placeholder="Cédula" class="form-control"></input><span ng-click="$parent.filterCtrl.filter()" class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
					.template(filter),

					nga.field('filters_operator', 'choice')
					.label('Operador SQL')
					.choices(util.filterOperators()),

					nga.field('limit', 'choice')
					.label('Mostrar limite')
					.choices(util.filterLimit()),

					nga.field('filters[pnf]', 'choice')
					.label('PNF')
					.choices(function(entry, scope) {
						util.choicePnf()(entry, scope);
						$rootScope.$broadcast('choice:pnf:get');
					}),
				])
				.listActions([pdf, 'delete', 'show']);

			estudiante.creationView()
				.title('Crear nuevo estudiante')
				.fields([
					nga.field('persona', 'choice')
					.label('Persona')
					.validation({
						required: true
					})
					.attributes({
						'on-select': 'selPersonaEstu($item, $model)',
					})
					.choices(function(entry, scope) {

						util.choicePersonaEstu()(entry, scope);

						scope.selPersonaEstu = selPersonaEstu;

						$rootScope.$broadcast('choice:personaestus:get');

						return [];

						function selPersonaEstu($item, $model) {
							entry.values['pnf'] = '';

							$rootScope.$broadcast('choice:personapnfs:reset');
							$rootScope.$broadcast('choice:personapnfs:get', $item, $model);
						}
					}),

					nga.field('pnf', 'choice')
					.label('PNF')
					.validation({
						required: true
					})
					.choices(function(entry, scope) {

						util.choicePersonaPnf()(entry, scope);

						/*$rootScope.$broadcast('choice:personapnfs:get');*/

						return [];
					}),
				])
				.template(estudianteCreateView);

			/*estudiante.editionView()
				.title('Actualizar estudiante #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('persona', 'choice')
					.label('Persona')
					.validation({
						required: true
					})
					.attributes({
						'on-select': 'selPers($item, $model)',
					})
					.choices(function(entry, scope) {

						entry.values['persona'] = entry.values['persona.cedu'];

						util.choicePers()(entry, scope);

						scope.selPers = selPers;

						$rootScope.$broadcast('choice:pers:get');

						return [];

						function selPers($item, $model) {
							entry.values['pnf'] = '';

							$rootScope.$broadcast('choice:personapnfs:reset');
							$rootScope.$broadcast('choice:personapnfs:get', $item, $model);
						}
					}),

					nga.field('pnf', 'choice')
					.label('PNF')
					.validation({
						required: true
					})
					.choices(function(entry, scope) {

						entry.values['pnf'] = entry.values['pnf.pnf_id'];
						var cedu = entry.values['persona.cedu'];

						util.choicePersonaPnf()(entry, scope);

						$rootScope.$broadcast('choice:personapnfs:get', {}, cedu);

						return [];
					}),
				]);*/

			estudiante.showView()
				.title('Detalle estudiante #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('persona.nac_cedu').label('Documento de identidad'),
					nga.field('persona.nomb_apell').label('Nombre Apellido'),
					nga.field('persona.fechnac', 'date').label('Fecha de nacimiento')
					.format('dd-MM-yyyy'),
					nga.field('persona.correo').label('correo'),
					nga.field('persona.telf').label('Teléfono'),
					nga.field('pnf.pnf_desc').label('PNF'),

					nga.field('Mostrar').label('')
					.template('<a class="btn btn-default" ng-click="open($event, entry.values.persona.cedu)" ng-controller="HandleReportController" href="#"><span class="fa fa-file-pdf-o"></span>&nbsp;<span class="hidden-xs">Record académico</span> </a>'),
				]);

			return estudiante;
		}]);
	}
	EstudianteAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider', 'PnfAdminProvider'];

	return EstudianteAdmin;
});