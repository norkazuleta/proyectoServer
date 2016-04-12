define(function() {
	'use strict';

	function UtilityService($rootScope, RestWrapper, moment, appConfig) {
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

			choiceAldea: function() {
				var util = this;
				return function(entry, scope) {
					var aldeas = [];

					var dgetAldea= $rootScope.$on('choice:aldea:get', getAldeas);

					var dresetAldea = $rootScope.$on('choice:aldea:reset', resetAldeas);

					scope.$on('$destroy', destroyEvent);

					return aldeas;

					function getAldeas(e, $item, $model) {
						util.apiAldea($item, $model).then(function(response) {
							aldeas = util.dataPrepare(response.data.originalElement, [{
								label: 'aldea_nomb'
							}, {
								value: 'aldea_codi'
							}]);
							scope.$broadcast('choices:update', {
								choices: aldeas
							});
						});
					}

					function resetAldeas() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function destroyEvent() {
						dgetAldea();
						dresetAldea();
					}
				};
			},

			choiceAldeaTurno: function() {
				var util = this;
				return function(entry, scope) {
					var aldea = [];

					var dgetAldeaTurno = $rootScope.$on('choice:aldeaturno:get', getAldeaTurno);

					var dresetAldeaTurno = $rootScope.$on('choice:aldeaturno:reset', resetAldeaTurno);

					scope.$on('$destroy', destroyEvent);

					return aldea;

					function getAldeaTurno(e, $item, $model) {
						util.apiAldeaTurno($item, $model).then(function(response) {
							aldea = util.dataPrepare(response.data.originalElement, [{
								label: 'turno.turn_desc'
							}, {
								value: 'turno.turn_id'
							}]);
							scope.$broadcast('choices:update', {
								choices: aldea
							});
						});
					}

					function resetAldeaTurno() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function destroyEvent() {
						dgetAldeaTurno();
						dresetAldeaTurno();
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

					var dPnf= $rootScope.$on('choice:pnf:get', getPnf);

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


			choicePnfTipo: function() {
				var util = this;
				return function(entry, scope) {
					var pnftipo = [];

					var dPnfTipo= $rootScope.$on('choice:pnftipo:get', getPnfTipo);


					scope.$on('$destroy', destroyEvent);

					return pnftipo;

					function getPnfTipo(e, $item, $model) {
						util.apiPnfTipo($item, $model).then(function(response) {
							pnftipo = util.dataPrepare(response.data.originalElement, [{
								label: 'tipo_desc'
							}, {
								value: 'tipo_id'
							}]);
							scope.$broadcast('choices:update', {
								choices: pnftipo
							});
						});
					}

					function destroyEvent() {
						dPnfTipo();
					}
				};
			},

			choicePnfTrayPeri: function() {
				var util = this;
				return function(entry, scope) {
					var pnftrayperi = [];

					var dPnfTrayPeri= $rootScope.$on('choice:pnftrayperi:get', getPnfTrayPeri);

					var dresetTrayPeri = $rootScope.$on('choice:pnftrayperi:reset', resetPnfTrayPeri);

					scope.selPnfTrayPeri = selPnfTrayPeri;

					scope.$on('$destroy', destroyEvent);

					return pnftrayperi;

					function getPnfTrayPeri(e, $item, $model) {
						util.apiPnfTrayPeri($item, $model).then(function(response) {
							pnftrayperi = util.dataPrepare(response.data.originalElement, [{
								label: 'pnf_tray_peri'
							}, {
								value: 'pnf.pnf_id'
							}]);
							scope.$broadcast('choices:update', {
								choices: pnftrayperi
							});
						});
					}

					function selPnfTrayPeri($item, $model) {
						//$rootScope.$broadcast('choice:uc:get', $item, $model);
					}

					function resetPnfTrayPeri() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function destroyEvent() {
						dPnfTrayPeri();
						dresetTrayPeri();
					}
				};
			},


			choicePnfTrayecto: function() {
				var util = this;
				return function(entry, scope) {
					var pnftray = [];

					var dPnfTrayecto = $rootScope.$on('choice:pnftrayecto:get', getPnfTrayecto);

					var dresetPnfTrayecto = $rootScope.$on('choice:pnftrayecto:reset', resetPnfTrayecto);

					scope.$on('$destroy', destroyEvent);

					return pnftray;

					function getPnfTrayecto(e, $item, $model) {
						util.apiPnfTrayecto($item, $model).then(function(response) {
							pnftray = util.dataPrepare(response.data.originalElement, [{
								label: 'tray.tray_desc'
							}, {
								value: 'tray.tray_id'
							}, {
								id: 'pnf.pnf_id'
							}]);
							scope.$broadcast('choices:update', {
								choices: pnftray
							});
						});
					}

					function resetPnfTrayecto() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function destroyEvent() {
						dPnfTrayecto();
						dresetPnfTrayecto();
					}
				};
			},

			choicePnfTrayectoPeriodo: function() {
				var util = this;
				return function(entry, scope) {
					var pnftrayperiodo = [];

					var dPnfTrayectoPeriodo = $rootScope.$on('choice:pnftrayectoperiodo:get', getPnfTrayectoPeriodo);

					var dresetPnfTrayectoPeriodo = $rootScope.$on('choice:pnftrayectoperiodo:reset', resetPnfTrayectoPeriodo);

					scope.$on('$destroy', destroyEvent);

					return pnftrayperiodo;

					function getPnfTrayectoPeriodo(e, $item, $model) {
						util.apiPnfTrayectoPeriodo($item, $model).then(function(response) {
							pnftrayperiodo = util.dataPrepare(response.data.originalElement, [{
								label: 'peri.peri_desc'
							}, {
								value: 'peri.peri_id'
							}, {
								id: 'id'
							}]);
							scope.$broadcast('choices:update', {
								choices: pnftrayperiodo
							});
						});
					}

					function resetPnfTrayectoPeriodo() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function destroyEvent() {
						dPnfTrayectoPeriodo();
						dresetPnfTrayectoPeriodo();
					}
				};
			},

			choicePnfTrayectoPeriodoUc: function() {
				var util = this;
				return function(entry, scope) {
					var pnftrayperiodouc = [];

					var dPnfTrayectoPeriodoUc = $rootScope.$on('choice:pnftrayectoperiodouc:get', getPnfTrayPeriodoUc);

					var dresetPnfTrayectoPeriodoUc = $rootScope.$on('choice:pnftrayectoperiodouc:reset', resetPnfTrayectoPeriodoUc);

					scope.$on('$destroy', destroyEvent);

					return pnftrayperiodouc;

					function getPnfTrayPeriodoUc(e, $item, $model) {
						util.apiPnfTrayectoPeriodoUc($item, $model).then(function(response) {
							pnftrayperiodouc = util.dataPrepare(response.data.originalElement, [{
								label: 'uc.uc_desc'
							}, {
								value: 'uc.uc_id'
							}]);
							scope.$broadcast('choices:update', {
								choices: pnftrayperiodouc
							});
						});
					}

					function resetPnfTrayectoPeriodoUc() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function destroyEvent() {
						dPnfTrayectoPeriodoUc();
						dresetPnfTrayectoPeriodoUc();
					}
				};
			},

			choiceTrayecto: function() {
				var util = this;
				return function(entry, scope) {
					var tray = [];

					var dTrayecto = $rootScope.$on('choice:trayecto:get', getTray);

					scope.selTray = selTray;

					scope.$on('$destroy', destroyEvent);

					return tray;

					function getTray(e, $item, $model) {
						util.apiTrayecto($item, $model).then(function(response) {
							tray = util.dataPrepare(response.data.originalElement, [{
								label: 'tray_desc'
							}, {
								value: 'tray_id'
							}]);
							scope.$broadcast('choices:update', {
								choices: tray
							});
						});
					}

					function selTray($item, $model) {
						$rootScope.$broadcast('choice:periodo:get', $item, $model);
					}

					function destroyEvent() {
						dTrayecto();
					}
				};
			},

			choicePeriodo: function() {
				var util = this;
				return function(entry, scope) {
					var peri = [];

					var dPeriodo = $rootScope.$on('choice:periodo:get', getPeri);

					scope.selPeri = selPeri;

					scope.$on('$destroy', destroyEvent);

					return peri;

					function getPeri(e, $item, $model) {
						util.apiPeriodo($item, $model).then(function(response) {
							peri = util.dataPrepare(response.data.originalElement, [{
								label: 'peri_desc'
							}, {
								value: 'peri_id'
							}]);
							scope.$broadcast('choices:update', {
								choices: peri
							});
						});
					}

					function selPeri($item, $model) {
						$rootScope.$broadcast('choice:pnfuc:get', $item, $model);
					}

					function destroyEvent() {
						dPeriodo();
					}
				};
			},

			choiceUc: function() {
				var util = this;
				return function(entry, scope) {
					var uc = [];

					var dUc = $rootScope.$on('choice:uc:get', getUc);

					scope.selUc = selUc;

					scope.$on('$destroy', destroyEvent);

					return uc;

					function getUc(e, $item, $model) {
						util.apiUc($item, $model).then(function(response) {
							uc = util.dataPrepare(response.data.originalElement, [{
								label: 'uc_desc'
							}, {
								value: 'uc_id'
							}]);
							scope.$broadcast('choices:update', {
								choices: uc
							});
						});
					}

					function selUc($item, $model) {
						//$rootScope.$broadcast('choice:uc:get', $item, $model);
					}

					function destroyEvent() {
						dUc();
					}
				};
			},

			choicePa: function() {
				var util = this;
				return function(entry, scope) {
					var pa = [];

					var dPa = $rootScope.$on('choice:pa:get', getPa);

					scope.selPa = selPa;

					scope.$on('$destroy', destroyEvent);

					return pa;

					function getPa(e, $item, $model) {
						util.apiPeriodoAcademico($item, $model).then(function(response) {
							pa = util.dataPrepare(response.data.originalElement, [{
								label: 'pa'
							}, {
								value: 'pa_id'
							}]);
							scope.$broadcast('choices:update', {
								choices: pa
							});
						});
					}

					function selPa($item, $model) {
						//$rootScope.$broadcast('choice::get', $item, $model);
					}

					function destroyEvent() {
						dPa();
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

			apiAldea: function($item, $model, $limit) {
				if (!$model) {
					$model = appConfig.aldea_codi;
				}
				return RestWrapper.getList({}, 'aldea', '/api/aldeas?filters[aldeaCodi]=' + $model + '&limit=' + ($limit || '4000'));
			},
			apiAldeaTurno: function($item, $model, $limit) {
				if (!$model) {
					$model = appConfig.aldea_codi;
				}
				return RestWrapper.getList({}, 'aldeaturnos', '/api/aldeaturnos?filters[aldea]=' + $model + '&limit=' + ($limit || '4000'));
			},

			apiPnf: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'pnfs', '/api/pnfs?limit=' + ($limit || '1000'));
			},

			apiPnfTipo: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'pnftipos', '/api/pnftipos?limit=' + ($limit || '1000'));
			},

			apiPnfTrayecto: function($item, $model, $limit) {
				console.log($item, $model, 'pnftrayectos');
				return RestWrapper.getList({}, 'pnftrayectos', '/api/pnftrayectoperiodos?filters[pnf]='+$model+'&limit=' + ($limit || '1000'));
			},

			apiPnfTrayectoPeriodo: function($item, $model, $limit) {
				console.log($item, $model, 'pnftrayectoperiodos');
				return RestWrapper.getList({}, 'pnftrayectoperiodos', '/api/pnftrayectoperiodos?filters[pnf]='+$item.id+'&filters[tray]='+$model+'&limit=' + ($limit || '1000'));
			},

			apiPnfTrayectoPeriodoUc: function($item, $model, $limit) {
				console.log($item, $model, 'pnftrayectoperiodoucs');
				return RestWrapper.getList({}, 'pnftrayectoperiodoucs', '/api/pnftrayectoperiodoucs?filters[pnfTrayPeri]='+$model+'&limit=' + ($limit || '1000'));
			},

			apiTrayecto: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'trayectos', '/api/trayectos?limit=' + ($limit || '1000'));
			},

			apiPeriodo: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'periodos', '/api/periodos?limit=' + ($limit || '1000'));
			},

			apiUc: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'unidadcurriculars', '/api/unidadcurriculars?filters[pnf]='+$model+'&limit=' + ($limit || '1000'));
			},

			apiPeriodoAcademico: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'periodoacademicos', '/api/periodoacademicos?limit=' + ($limit || '1000'));
			},

			apiPnfTrayPeri: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'pnftrayectoperiodos', '/api/pnftrayectoperiodos?limit=' + ($limit || '1000'));
			},

			apiDocente: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'docentes', '/api/docentes?limit=' + ($limit || '10000'));
			},

			apiEstudiante: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'estudiantes', '/api/estudiantes?limit=' + ($limit || '10000'));
			},
		};
	}

	UtilityService.$inject = ['$rootScope', 'RestWrapper', 'moment', 'appConfig'];

	return UtilityService;
});