define(function() {
	'use strict';

	function UtilityService($rootScope, RestWrapper, moment) {
		return {
			toQueryString: function (obj, prefix) {
				var qs = function(obj, prefix){
				  var str = [];
				  for (var p in obj) {
				    var k = prefix ? prefix + "[" + p + "]" : p,
				        v = obj[p];
				    str.push(angular.isObject(v) ? qs(v, k) : (k) + "=" + encodeURIComponent(v));
				  }
				  return str.join("&");
				};

				return qs(obj, prefix);
			},
			trim: function(value) {
				if (!angular.isString(value)) {
					return value;
				}

				if (!String.prototype.trim) {
					return value.replace(/^\s*/, '').replace(/\s*$/, '');
				}

				return String.prototype.trim.apply(value);
			},
			isEmpty: function(value) {
				return angular.isUndefined(value) || value === '' || value === null || value !== value;
			},

			dataPrepare: function(data, dataIndex) {
				var _data = data || [];
				var _dataIndex = dataIndex || [{
					value: ''
				}, {
					label: ''
				}];
				var _resp = [];
				if (angular.isArray(_data) || angular.isObject(_data)) {
					angular.forEach(_data, function(value, key) {
						if (angular.isArray(_dataIndex)) {
							_resp[key] = {};
							angular.forEach(_dataIndex, function(_value) {
								if (angular.isObject(_value)) {
									angular.forEach(_value, function(v, k) {
										if (_data[key][v]) {
											_resp[key][k] = _data[key][v];
										} else {
											var join = v.split('.');
											if (join.length > 1) {
												var __data = null;
												angular.forEach(join, function(val, clv) {
													if (__data) {
														if (angular.isObject(__data) && __data[val]) {
															__data = __data[val];
														}
													} else {
														__data = _data[key][val];
													}
												});
												if (__data) {
													_resp[key][k] = __data;
												}
											}
										}
									});
								}
							});
						}
					});
				}
				return _resp;
			},
			dataPrepareOperators: function(data, dataIndex) {
				var _data = data || [];
				var _dataIndex = dataIndex || [{
					value: ''
				}, {
					label: ''
				}];
				var _resp = [];
				var count = 0;
				if (angular.isArray(_data) || angular.isObject(_data)) {
					angular.forEach(_data, function(value, key) {
						angular.forEach(value, function(oval, okey) {
							count++;
							if (angular.isArray(_dataIndex)) {
								_resp[count] = {};
								angular.forEach(_dataIndex, function(_value) {
									if (angular.isObject(_value)) {
										angular.forEach(_value, function(v, k) {
											_resp[count][k] = okey;
										});
									}
								});
							}
						})
					});
				}
				return _resp;
			},

			filterOperators: function() {
				var util = this;
				return function(entry, scope) {
					var operators = [];

					var dOperators = $rootScope.$on('filters:operators:get', getOperators);

					$rootScope.$broadcast('filters:operators:get');

					scope.$on('$destroy', destroyEvent);

					return operators;

					function getOperators(e) {
						RestWrapper.getList({}, 'filters', '/api/filters/operators')
							.then(function(response) {
								operators = util.dataPrepareOperators(response.data.originalElement);
								scope.$broadcast('choices:update', {
									choices: operators
								});
							});
					}

					function destroyEvent() {
						dOperators();
					}
				}
			},

			filterLimit: function() {
				return function(entry, scope) {
					return [{
						label: '10',
						value: '10'
					}, {
						label: '25',
						value: '25'
					}, {
						label: '50',
						value: '50'
					}, {
						label: '100',
						value: '100'
					}, {
						label: '200',
						value: '200'
					}];
				};
			},

			choiceNac: function() {
				return function(entry, scope) {
					return [{
						label: 'V',
						value: 'V'
					}, {
						label: 'E',
						value: 'E'
					}];
				};
			},

			choiceDel: function() {
				return function(entry, scope) {
					return [{
						label: 'Dia',
						value: 'day'
					}, {
						label: 'Dia Anterior',
						value: 'dayBefore'
					}, {
						label: 'Semana',
						value: 'week'
					}, {
						label: 'Semana Anterior',
						value: 'weekBefore'
					}, {
						label: 'Mes',
						value: 'month'
					}, {
						label: 'Mes Anterior',
						value: 'monthBefore'
					}];
				};
			},

			choiceMonth: function() {
				return function(entry, scope) {
					var nowEn = moment().locale('en'),
						nowEs = moment().locale('es'),
						esLocaleData = nowEs.localeData(),
						enLocaleData = nowEn.localeData();

					var months = [];
					angular.forEach(esLocaleData._months, function(value, key) {
						months.push({
							label: esLocaleData._months[key],
							value: enLocaleData._months[key]
						});
					});

					return months;
				};
			},

			choiceYear: function() {
				return function(rStart, sEnd) {
					var now = moment(),
						range = [],
						rangeStart = rStart || 2015,
						rangeEnd = sEnd || now.get('years');

					for (var i = rangeStart; i <= rangeEnd; i++) {
						range.push(i);
					}

					if (range.length === 0 || rangeEnd < rangeStart ) {
						range.push(rangeStart);
					}

					var years = [];
					angular.forEach(range, function(value, key) {
						years.push({
							label: value,
							value: value
						});
					});

					return years;
				};
			},

			choicePais: function() {
				var util = this;
				return function(entry, scope) {
					var pais = [];

					var dPais = $rootScope.$on('choice:pais:get', getPais);

					scope.selPais = selPais;

					scope.$on('$destroy', destroyEvent);

					return pais;

					function getPais(e, $item, $model) {
						util.apiPais($item, $model).then(function(response) {
							pais = util.dataPrepare(response.data.originalElement, [{
								label: 'pais_nomb'
							}, {
								value: 'pais_id'
							}]);
							scope.$broadcast('choices:update', {
								choices: pais
							});
						});
					}

					function selPais($item, $model) {
						$rootScope.$broadcast('choice:estados:get', $item, $model);
						/*
						$rootScope.$broadcast('choice:estados:reset');
						$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dPais();
					}
				};
			},
			choiceEstado: function() {
				var util = this;
				return function(entry, scope) {

					var estados = [];

					var dEstados = $rootScope.$on('choice:estados:get', getEstados);
					var dresetEstados = $rootScope.$on('choice:estados:reset', resetEstados);

					scope.selEdo = selEdo;

					scope.$on('$destroy', destroyEvent);

					return estados;

					function getEstados(e, $item, $model) {
						util.apiEstado($item, $model).then(function(response) {
							estados = util.dataPrepare(response.data.originalElement, [{
								label: 'edo_nomb'
							}, {
								value: 'edo_codi'
							}]);

							scope.$broadcast('choices:update', {
								choices: estados
							});
						});
					}

					function resetEstados() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function selEdo($item, $model) {
						$rootScope.$broadcast('choice:municipios:get', $item, $model);

						/*$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dEstados();
						dresetEstados();
					}
				};
			},
			choiceMunicipio: function() {
				var util = this;
				return function(entry, scope) {
					var municipios = [];

					var dgetMunicipios = $rootScope.$on('choice:municipios:get', getMunicipios);

					var dresetMunicipios = $rootScope.$on('choice:municipios:reset', resetMunicipios);

					scope.selMuni = selMuni;

					scope.$on('$destroy', destroyEvent);

					return municipios;

					function getMunicipios(e, $item, $model) {
						util.apiMunicipio($item, $model).then(function(response) {
							municipios = util.dataPrepare(response.data.originalElement, [{
								label: 'muni_nomb'
							}, {
								value: 'muni_codi'
							}]);
							scope.$broadcast('choices:update', {
								choices: municipios
							});
						});
					}

					function resetMunicipios() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function selMuni($item, $model) {
						$rootScope.$broadcast('choice:parroquias:get', $item, $model);
						/*$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dgetMunicipios();
						dresetMunicipios();
					}
				};
			},
			choiceParroquia: function() {
				var util = this;
				return function(entry, scope) {
					var parroquias = [];

					var dgetParroquias = $rootScope.$on('choice:parroquias:get', getParroquias);

					var dresetParroquias = $rootScope.$on('choice:parroquias:reset', resetParroquias);

					scope.selParroq = selParroq;

					scope.$on('$destroy', destroyEvent);

					return parroquias;

					function getParroquias(e, $item, $model) {
						util.apiParroquia($item, $model).then(function(response) {
							parroquias = util.dataPrepare(response.data.originalElement, [{
								label: 'parroq_nomb'
							}, {
								value: 'parroq_codi'
							}]);
							scope.$broadcast('choices:update', {
								choices: parroquias
							});
						});
					}

					function resetParroquias() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function selParroq($item, $model) {
						$rootScope.$broadcast('choice:zonas:get', $item, $model);
					}

					function destroyEvent() {
						dgetParroquias();
						dresetParroquias();
					}
				};
			},
			choiceZona: function() {
				var util = this;
				return function(entry, scope) {

					var zonas = [];

					var dgetZonas = $rootScope.$on('choice:zonas:get', getZonas);

					var dresetZonas = $rootScope.$on('choice:zonas:reset', resetZonas);

					scope.$on('$destroy', destroyEvent);

					return zonas;

					function getZonas(e, $item, $model) {
						util.apiZona($item, $model).then(function(response) {
							zonas = util.dataPrepare(response.data.originalElement, [{
								label: 'zona_nomb'
							}, {
								value: 'zona_id'
							}]);
							scope.$broadcast('choices:update', {
								choices: zonas
							});
						});
					}

					function resetZonas() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function destroyEvent() {
						dgetZonas();
						dresetZonas();
					}
				};
			},


			choicePnf: function() {
				var util = this;
				return function(entry, scope) {
					var pnf = [];

					var dPPnf= $rootScope.$on('choice:pnf:get', getPnf);

					scope.selPnf = selPnf;

					scope.$on('$destroy', destroyEvent);

					return pnf;

					function getPnf(e, $item, $model) {
						util.apiPnf($item, $model).then(function(response) {
							pnf = util.dataPrepare(response.data.originalElement, [{
								label: 'pnf_desc'
							}, {
								value: 'pnf_id'
							}]);
							scope.$broadcast('choices:update', {
								choices: pnf
							});
						});
					}

					function selPnf($item, $model) {
						$rootScope.$broadcast('choice:uc:get', $item, $model);
						/*
						$rootScope.$broadcast('choice:estados:reset');
						$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dPnf();
					}
				};
			},


			apiPais: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'pais', '/api/pais?limit=' + ($limit || '1000'));
			},
			apiEstado: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'estados', '/api/estados?filters[pais]=' + $model + '&limit=' + ($limit || '2000'));
			},
			apiMunicipio: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'municipios', '/api/municipios?filters[edo]=' + $model + '&limit=' + ($limit || '3000'));
			},
			apiParroquia: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'parroquias', '/api/parroquias?filters[muni]=' + $model + '&limit=' + ($limit || '4000'));
			},
			apiZona: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'zonas', '/api/zonas?filters[parroq]=' + $model + '&limit=' + ($limit || '5000'));
			},

			apiPnf: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'pnfs', '/api/pnfs?limit=' + ($limit || '1000'));
			}
		};
	}

	UtilityService.$inject = ['$rootScope', 'RestWrapper', 'moment'];

	return UtilityService;
});