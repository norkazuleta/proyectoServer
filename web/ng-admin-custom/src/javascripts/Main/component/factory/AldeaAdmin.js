define(function(require) {
	'use strict';

	function AldeaAdmin($provide, NgAdminConfigurationProvider, PaisAdminProvider, EstadoAdminProvider, MunicipioAdminProvider, ParroquiaAdminProvider, TurnoAdminProvider) {
		$provide.factory('AldeaAdmin', ['$rootScope', 'RestWrapper', 'UtilityService', function($rootScope, RestWrapper, UtilityService) {
			var nga = NgAdminConfigurationProvider;
			var util = UtilityService;
			var pais = PaisAdminProvider.$get();
			var estado = EstadoAdminProvider.$get();
			var municipio = MunicipioAdminProvider.$get();
			var parroquia = ParroquiaAdminProvider.$get();
			var turno = TurnoAdminProvider.$get();

			var aldea = nga.entity('aldeas')
				.identifier(nga.field('aldea_codi'))
				.label('Aldeas');

			aldea.listView()
				.infinitePagination(false)
				.fields([
					nga.field('aldea_codi').label('aldea_codi'),
					nga.field('aldea_nomb').label('aldea_nomb'),
					nga.field('parroq.parroq_nomb').label('parroq_nomb'),
					nga.field('parroq.muni.muni_nomb').label('muni_nomb'),
					nga.field('parroq.muni.edo.edo_nomb').label('edo_nomb'),
					/*nga.field('parroq.muni.edo.pais.pais_nomb').label('pais_nomb'),*/
		            nga.field('aldea_turno', 'template')
                		.template('<span ng-repeat="group in entry.values.aldea_turno track by $index" class="label label-default">{{ group.turno.turn_desc }}</span>')
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

			aldea.creationView()
				.fields([
					nga.field('pais', 'choice')
					.label('pais_nomb')
					.attributes({
						'on-select': 'selPais($item, $model)'
					})
					.choices(function(entry, scope) {

						util.choicePais()(entry, scope);

						$rootScope.$broadcast('choice:pais:get');

						return [];
					}),

					nga.field('edo', 'choice')
					.label('edo_nomb')
					.attributes({
						'on-select': 'selEdo($item, $model)'
					})
					.choices(util.choiceEstado()),

					nga.field('muni', 'choice')
					.label('muni_nomb')
					.attributes({
						'on-select': 'selMuni($item, $model)'
					})
					.choices(util.choiceMunicipio()),

					nga.field('parroq', 'choice')
					.label('parroq_nomb')
					.choices(util.choiceParroquia()),

					nga.field('aldea_nomb').label('aldea_nomb'),
					nga.field('aldea_codi').label('aldea_codi'),

					nga.field('aldea_turno', 'reference_many')
					.label('Turno')
                    .targetEntity(turno)
                    .targetField(nga.field('turn_desc'))
                    .filters(function(search) {
                        return search ? { q: search } : null;
                    })
                    .remoteComplete(true, { refreshDelay: 300 }),
				]);

			aldea.editionView()
				.fields([
					nga.field('pais', 'choice')
					.label('pais_nomb')
					.attributes({
						'on-select': 'selPais($item, $model)'
					})
					.choices(function(entry, scope) {

						entry.values['pais'] = entry.values['parroq.muni.edo.pais.pais_id'];

						util.choicePais()(entry, scope);

						$rootScope.$broadcast('choice:pais:get');

						return [];
					}),

					nga.field('edo', 'choice')
					.label('edo_nomb')
					.attributes({
						'on-select': 'selEdo($item, $model)'
					})
					.choices(function (entry, scope) {
						var paisId;
						paisId = entry.values['parroq.muni.edo.pais.pais_id'];
						entry.values['edo'] = entry.values['parroq.muni.edo.edo_codi'];

						util.choiceEstado()(entry, scope);

						$rootScope.$broadcast('choice:estados:get', {value: paisId}, paisId);

						return [];
					}),

					nga.field('muni', 'choice')
					.label('muni_nomb')
					.attributes({
						'on-select': 'selMuni($item, $model)'
					})
					.choices(function (entry, scope) {
						var edoCodi;
						edoCodi = entry.values['parroq.muni.edo.edo_codi'];
						entry.values['muni'] = entry.values['parroq.muni.muni_codi'];

						util.choiceMunicipio()(entry, scope);

						$rootScope.$broadcast('choice:municipios:get', {value: edoCodi}, edoCodi);

						return [];
					}),

					nga.field('parroq', 'choice')
					.label('parroq_nomb')
					.choices(function (entry, scope) {
						var muniCodi;
						muniCodi = entry.values['parroq.muni.muni_codi'];
						entry.values['parroq'] = entry.values['parroq.parroq_codi'];

						util.choiceParroquia()(entry, scope);

						$rootScope.$broadcast('choice:parroquias:get', {value: muniCodi}, muniCodi);

						return [];
					}),
					nga.field('aldea_nomb').label('aldea_nomb'),
					nga.field('aldea_codi').label('aldea_codi'),

					nga.field('aldea_turno', 'reference_many')
					.label('Turno')
                    .targetEntity(turno)
                    .targetField(nga.field('turn_desc'))
                    .filters(function(search) {
                        return search ? { q: search } : null;
                    })
                    .remoteComplete(false, { refreshDelay: 300 }),
				]);

			aldea.showView()
				.fields([
					/*nga.field('parroq.muni.edo.pais.pais_id', 'reference')
					.label('pais_nomb')
					.targetEntity(pais)
					.targetField(nga.field('pais_nomb')),*/

					nga.field('parroq.muni.edo.edo_codi', 'reference')
					.label('edo_nomb')
					.targetEntity(estado)
					.targetField(nga.field('edo_nomb')),

					nga.field('parroq.muni.muni_codi', 'reference')
					.label('muni_nomb')
					.targetEntity(municipio)
					.targetField(nga.field('muni_nomb')),

					nga.field('parroq.parroq_codi', 'reference')
					.label('parroq_nomb')
					.targetEntity(parroquia)
					.targetField(nga.field('parroq_nomb')),

					nga.field('aldea_nomb').label('aldea_nomb'),
					nga.field('aldea_codi').label('aldea_codi'),

					 nga.field('aldea_turno', 'template')
                		.template('<span ng-repeat="group in entry.values._aldea_turno track by $index" class="label label-default">{{ group.turno.turn_desc }}</span>')
                	.cssClasses('hidden-xs'),
				]);

			return aldea;
		}]);
	}
	AldeaAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider', 'PaisAdminProvider', 'EstadoAdminProvider', 'MunicipioAdminProvider', 'ParroquiaAdminProvider', 'TurnoAdminProvider'];

	return AldeaAdmin;
});