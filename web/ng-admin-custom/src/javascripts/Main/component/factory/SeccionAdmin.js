define(function() {
	'use strict';

	function SeccionAdmin($provide, NgAdminConfigurationProvider) {
		$provide.factory('SeccionAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', 'appConfig', function($rootScope, RestWrapper, UtilityService, appConfig) {
			var nga = NgAdminConfigurationProvider;

			var util = UtilityService;

			var seccion = nga.entity('seccions')
				.identifier(nga.field('secc_id'))
				.label('Secciones');

			var asigd = `<a class="btn btn-default btn-xs" ng-click="open($event, entry.values.secc_id, entry.values)" ng-controller="AsigDoceController" href="#/seccions/list">
				<span class="glyphicon" aria-hidden="true"></span>
				Asignar docente<span class="hidden-xs"></span>
			</a>`;
			var asige = `<a class="btn btn-default btn-xs" ng-click="open($event, entry.values.secc_id, entry.values)" ng-controller="AsigEstuController" href="#/seccions/list">
				<span class="glyphicon" aria-hidden="true"></span>
				Asignar estudiante<span class="hidden-xs"></span>
			</a>`;
			var carganota = `<a class="btn btn-default btn-xs" ng-click="open($event, entry.values.secc_id, entry.values)" ng-controller="CargaNotaController" href="#/seccions/list">
				<span class="glyphicon" aria-hidden="true"></span>
				Cargar Notas<span class="hidden-xs"></span>
			</a>`;
			seccion.listView()
				.infinitePagination(false)
				.title('Lista Secciones')
				.fields([
					nga.field('secc_codi').label('Código sección'),
					nga.field('pa.pa').label('Periodo Académico'),
					nga.field('aldea_turno').label('Aldea - Turno'),
					nga.field('pnf.pnf_desc').label('PNF'),
					nga.field('tray.tray_desc').label('Trayecto'),
					nga.field('peri.peri_desc').label('Periodo'),
					nga.field('uc.uc_desc').label('Unidad Curricular'),
					nga.field('doce.persona.nac_cedu_nomb_apell').label('Docente Colaborador'),
					nga.field('estu_total').label('Estudiantes'),
					nga.field('nt', 'template')
						.label('Notas Cargados')
                		.template('<span class="label label-default">{{ entry.values.nota.length }}</span>')
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
				.listActions([asigd, asige, carganota, 'edit', 'delete', 'show']);

			seccion.creationView()
				.title('Nueva Sección')
				.fields([
					nga.field('aldea', 'choice')
					.label('aldea_nomb')
					.validation({
						required: true
					})
					.attributes({
						'on-select': 'selAldea($item, $model)',
					})
					.choices(function(entry, scope) {

						util.choiceAldea()(entry, scope);

						$rootScope.$broadcast('choice:aldea:get');

						scope.selAldea = selAldea;

						return [];

						function selAldea($item, $model) {
							$rootScope.$broadcast('choice:aldeaturno:reset');
							$rootScope.$broadcast('choice:aldeaturno:get', $item, $model);
						}
					}),
					nga.field('turn', 'choice')
					.label('Turno')
					.validation({
						required: true
					})
					.choices(function(entry, scope) {

						util.choiceAldeaTurno()(entry, scope);

						$rootScope.$broadcast('choice:aldeaturno:get');

						return [];
					}),
					nga.field('pnf', 'choice')
					.label('PNF')
					.validation({
						required: true
					})
					.attributes({
						'on-select': 'selPnf($item, $model)',
					})
					.choices(function(entry, scope) {

						util.choicePnf()(entry, scope);

						$rootScope.$broadcast('choice:pnf:get');

						scope.selPnf = selPnf;

						return [];

						function selPnf($item, $model) {
							entry.values['tray'] = '';
							entry.values['peri'] = '';
							entry.values['uc'] = '';
							$rootScope.$broadcast('choice:pnftrayectoperiodo:reset');
							$rootScope.$broadcast('choice:pnftrayectoperiodouc:reset');
							$rootScope.$broadcast('choice:pnftrayecto:reset');
							$rootScope.$broadcast('choice:pnftrayecto:get', $item, $model);
						}
					}),
					nga.field('tray', 'choice')
					.label('Trayecto')
					.validation({
						required: true
					})
					.attributes({
						'on-select': 'selPnfTrayecto($item, $model)',
					})
					.choices(function(entry, scope) {

						util.choicePnfTrayecto()(entry, scope);

						scope.selPnfTrayecto = selPnfTrayecto;

						return [];

						function selPnfTrayecto ($item, $model) {
							entry.values['peri'] = '';
							entry.values['uc'] = '';
							$rootScope.$broadcast('choice:pnftrayectoperiodouc:reset');
							$rootScope.$broadcast('choice:pnftrayectoperiodo:reset');
							$rootScope.$broadcast('choice:pnftrayectoperiodo:get', $item, $model);
						}
					})
					/*.template(trayTemplate)*/,

					nga.field('peri', 'choice')
					.label('Periodo')
					.validation({
						required: true
					})
					.attributes({
						'on-select': 'selPnfTrayPeriodo($item, $model)',
					})
					.choices(function(entry, scope) {

						util.choicePnfTrayectoPeriodo()(entry, scope);

						scope.selPnfTrayPeriodo = selPnfTrayPeriodo;

						return [];

						function selPnfTrayPeriodo ($item, $model) {
							entry.values['uc'] = '';
							$rootScope.$broadcast('choice:pnftrayectoperiodouc:reset');
							$rootScope.$broadcast('choice:pnftrayectoperiodouc:get', $item, $item.id);
						}
					}),
					nga.field('uc', 'choice')
					.label('Unidad Curricular')
					.validation({
						required: true
					})
					.choices(function(entry, scope) {

						util.choicePnfTrayectoPeriodoUc()(entry, scope);

						return [];
					}),
					/*nga.field('secc_codi')
					.label('Código sección')
					.validation({
						required: true
					}),*/
					nga.field('pa', 'choice')
					.label('Periodo Académico')
					.validation({
						required: true
					})
					.choices(function(entry, scope) {

						util.choicePa()(entry, scope);

						$rootScope.$broadcast('choice:pa:get');

						return [];
					})
				]);

			seccion.editionView()
				.title('Actualizar Sección #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('aldea', 'choice')
					.label('aldea_nomb')
					.validation({
						required: true
					})
					.attributes({
						'on-select': 'selAldea($item, $model)',
					})
					.choices(function(entry, scope) {

						util.choiceAldea()(entry, scope);

						var aldeaCodi = entry.values['aldea.aldea_codi'];
						entry.values['aldea'] = aldeaCodi;

						$rootScope.$broadcast('choice:aldea:get', {value: aldeaCodi}, aldeaCodi);

						scope.selAldea = selAldea;

						return [];

						function selAldea($item, $model) {
							$rootScope.$broadcast('choice:aldeaturno:reset');
							$rootScope.$broadcast('choice:aldeaturno:get', $item, $model);
						}
					}),
					nga.field('turn', 'choice')
					.label('Turno')
					.validation({
						required: true
					})
					.choices(function(entry, scope) {

						util.choiceAldeaTurno()(entry, scope);
						var turnId = entry.values['turn.turn_id'];
						var aldeaCodi = entry.values['aldea.aldea_codi'];
						entry.values['turn'] = turnId;

						$rootScope.$broadcast('choice:aldeaturno:get', {value: aldeaCodi}, aldeaCodi);

						return [];
					}),

					nga.field('pnf', 'choice')
					.label('PNF')
					.validation({
						required: true
					})
					.attributes({
						'on-select': 'selPnf($item, $model)',
					})
					.choices(function(entry, scope) {

						entry.values['pnf'] = entry.values['pnf.pnf_id'];

						util.choicePnf()(entry, scope);

						$rootScope.$broadcast('choice:pnf:get');

						scope.selPnf = selPnf;

						return [];

						function selPnf($item, $model) {
							entry.values['tray'] = '';
							entry.values['peri'] = '';
							entry.values['uc'] = '';
							$rootScope.$broadcast('choice:pnftrayectoperiodo:reset');
							$rootScope.$broadcast('choice:pnftrayectoperiodouc:reset');
							$rootScope.$broadcast('choice:pnftrayecto:reset');
							$rootScope.$broadcast('choice:pnftrayecto:get', $item, $model);
						}
					}),
					nga.field('tray', 'choice')
					.label('Trayecto')
					.validation({
						required: true
					})
					.attributes({
						'on-select': 'selPnfTrayecto($item, $model)',
					})
					.choices(function(entry, scope) {

						var pnfId, trayId;
						pnfId = entry.values['pnf.pnf_id'];
						trayId = entry.values['tray.tray_id'];
						entry.values['tray'] = trayId;

						util.choicePnfTrayecto()(entry, scope);

						scope.selPnfTrayecto = selPnfTrayecto;

						$rootScope.$broadcast('choice:pnftrayecto:get', {value: trayId, id: pnfId}, trayId);

						return [];

						function selPnfTrayecto ($item, $model) {
							entry.values['peri'] = '';
							entry.values['uc'] = '';
							$rootScope.$broadcast('choice:pnftrayectoperiodouc:reset');
							$rootScope.$broadcast('choice:pnftrayectoperiodo:reset');
							$rootScope.$broadcast('choice:pnftrayectoperiodo:get', $item, $model);
						}
					}),
					nga.field('peri', 'choice')
					.label('Periodo')
					.validation({
						required: true
					})
					.attributes({
						'on-select': 'selPnfTrayPeriodo($item, $model)',
					})
					.choices(function(entry, scope) {
						var pnfId, periId;
						pnfId = entry.values['pnf.pnf_id'];
						periId = entry.values['peri.peri_id'];
						entry.values['peri'] = periId;

						util.choicePnfTrayectoPeriodo()(entry, scope);

						scope.selPnfTrayPeriodo = selPnfTrayPeriodo;

						$rootScope.$broadcast('choice:pnftrayectoperiodo:get', {value: periId, id: pnfId}, periId);

						return [];

						function selPnfTrayPeriodo ($item, $model) {
							entry.values['uc'] = '';
							$rootScope.$broadcast('choice:pnftrayectoperiodouc:reset');
							$rootScope.$broadcast('choice:pnftrayectoperiodouc:get', $item, $item.id);
						}
					}),
					nga.field('uc', 'choice')
					.label('Unidad Curricular')
					.validation({
						required: true
					})
					.choices(function(entry, scope) {
						let id;
						id = entry.values['peri.peri_id'];
						entry.values['uc'] = entry.values['uc.uc_id'];

						util.choicePnfTrayectoPeriodoUc()(entry, scope);

						$rootScope.$broadcast('choice:pnftrayectoperiodouc:get', {value: id}, id);

						return [];
					}),
					nga.field('secc_codi')
					.label('Código sección')
					.validation({
						required: true
					}),
					nga.field('pa', 'choice')
					.label('Periodo Académico')
					.validation({
						required: true
					})
					.choices(function(entry, scope) {

						util.choicePa()(entry, scope);
						entry.values['pa'] = entry.values['pa.pa_id'];

						$rootScope.$broadcast('choice:pa:get');

						return [];
					})
				]);

			seccion.showView()
				.title('Detalle Sección #{{ ::entry.identifierValue }}')
				.fields([
					nga.field('secc_id').label('ID'),
					nga.field('secc_codi').label('Código sección'),
					nga.field('pnf.pnf_desc').label('PNF'),
					nga.field('tray.tray_desc').label('trayecto'),
					nga.field('peri.peri_desc').label('periodo'),
					nga.field('uc.uc_desc').label('Unidad Curricular'),
					nga.field('pa.pa').label('Periodo Académico'),
					nga.field('doce.persona.nac_cedu_nomb_apell').label('Docente Colaborador'),

				]);

			return seccion;
		}]);
	}
	SeccionAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return SeccionAdmin;
});