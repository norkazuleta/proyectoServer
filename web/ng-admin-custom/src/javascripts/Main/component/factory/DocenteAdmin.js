import docenteCreateView  from '../../view/docenteCreateView.html';

define(function() {
	'use strict';

	function DocenteAdmin($provide, NgAdminConfigurationProvider) {
		$provide.factory('DocenteAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;

			var util = UtilityService;

			var filter = `
				<ui-select  ng-model="values['q']" ng-required="true" required="required" id="q" name="q" ng-controller="FController as f" ng-init="f.init('apiDoce');">
				    <ui-select-match allow-clear="true" placeholder="Valores de filtro">{{ $select.selected.label }}</ui-select-match>
				    <ui-select-choices repeat="item.value as item in personas | filter: {label: $select.search} track by $index">
				        {{ item.label }}
				    </ui-select-choices>
				</ui-select>
			`;

			var docente = nga.entity('docentes')
				.identifier(nga.field('id'))
				.label('Profesores');

			docente.listView()
				.infinitePagination(false)
				.fields([
					nga.field('persona.nac_cedu').label('Documento de identidad'),
					nga.field('persona.nomb_apell').label('Nombre Apellido'),
					nga.field('persona.fechnac', 'date').label('fn')
					.format('dd-MM-yyyy'),
					nga.field('persona.correo').label('correo'),
					nga.field('persona.telf').label('tlf'),
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
				])
				.listActions(['delete', 'show']);

			docente.creationView()
				.title('Crear nuevo docente')
				.fields([
					nga.field('persona', 'choice')
					.label('Persona')
					.validation({
						required: true
					})
					.choices(function(entry, scope) {

						util.choicePersonaDoce()(entry, scope);

						$rootScope.$broadcast('choice:personadoces:get');

						return [];
					}),
				])
				.template(docenteCreateView);

			/*docente.editionView()
				.title('Actualizar docente #{{ ::entry.identifierValue }}')
				.fields([
				]);*/

			docente.showView()
				.title('Detalle docente #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('persona.nac_cedu').label('Documento de identidad'),
					nga.field('persona.nomb_apell').label('Nombre Apellido'),
					nga.field('persona.fechnac', 'date').label('fn')
					.format('dd-MM-yyyy'),
					nga.field('persona.correo').label('correo'),
					nga.field('persona.telf').label('tlf'),
				]);

			return docente;
		}]);
	}
	DocenteAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return DocenteAdmin;
});