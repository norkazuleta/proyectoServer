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
			choiceMarca: function() {
				var util = this;
				return function(entry, scope) {

					var marcas = [];

					var dMarcas = $rootScope.$on('choice:marcas:get', getMarcas);
					var dresetMarcas = $rootScope.$on('choice:marcas:reset', resetMarcas);

					scope.selMarca = selMarca;

					scope.$on('$destroy', destroyEvent);

					return marcas;

					function getMarcas(e, $item, $model) {
						util.apiMarca($item, $model).then(function(response) {
							marcas = util.dataPrepare(response.data.originalElement, [{
								label: 'marca_nomb'
							}, {
								value: 'marca_id'
							}]);

							scope.$broadcast('choices:update', {
								choices: marcas
							});
						});
					}

					function resetMarcas() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function selMarca($item, $model) {
						$rootScope.$broadcast('choice:modelos:get', $item, $model);

						/*$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dMarcas();
						dresetMarcas();
					}
				};
			},
			choiceModelo: function() {
				var util = this;
				return function(entry, scope) {

					var modelos = [];

					var dModelos = $rootScope.$on('choice:modelos:get', getModelos);
					var dresetModelos = $rootScope.$on('choice:modelos:reset', resetModelos);

					scope.selModelo = selModelo;

					scope.$on('$destroy', destroyEvent);

					return modelos;

					function getModelos(e, $item, $model) {
						util.apiModelo($item, $model).then(function(response) {
							modelos = util.dataPrepare(response.data.originalElement, [{
								label: 'modelo_nomb'
							}, {
								value: 'modelo_id'
							}]);

							scope.$broadcast('choices:update', {
								choices: modelos
							});
						});
					}

					function resetModelos() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function selModelo($item, $model) {

						/*$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dModelos();
						dresetModelos();
					}
				};
			},

			choiceComercio: function(obj) {
				var util = this;
				var dataIndex = angular.isObject(obj) ? obj : null;
				return function(entry, scope) {

					var comercios = [];

					var dComercios = $rootScope.$on('choice:comercios:get', getComercios);
					var dresetComercios = $rootScope.$on('choice:comercios:reset', resetComercios);

					scope.selComercio = selComercio;

					scope.$on('$destroy', destroyEvent);

					return comercios;

					function getComercios(e, $item, $model) {
						util.apiComercio($item, $model).then(function(response) {
							comercios = util.dataPrepare(response.data.originalElement, [dataIndex || {
								label: 'com_estb_rif'
							}, {
								value: 'com_id'
							}]);

							scope.$broadcast('choices:update', {
								choices: comercios
							});
						});
					}

					function resetComercios() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function selComercio($item, $model) {

						/*$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dComercios();
						dresetComercios();
					}
				};
			},




			choicetComercio: function(obj) {
				var util = this;
				var dataIndex = angular.isObject(obj) ? obj : null;
				return function(entry, scope) {

					var tcomercios = [];

					var dtComercios = $rootScope.$on('choice:tcomercios:get', gettComercios);
					var dresettComercios = $rootScope.$on('choice:tcomercios:reset', resettComercios);

					scope.seltComercio = seltComercio;

					scope.$on('$destroy', destroyEvent);

					return tcomercios;

					function gettComercios(e, $item, $model) {
						util.apitComercio($item, $model).then(function(response) {
							tcomercios = util.dataPrepare(response.data.originalElement, [dataIndex || {
								label: 'tcom_nomb'
							}, {
								value: 'tcom_id'
							}]);

							scope.$broadcast('choices:update', {
								choices: tcomercios
							});
						});
					}

					function resettComercios() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function seltComercio($item, $model) {

						/*$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dtComercios();
						dresettComercios();
					}
				};
			},




			choiceLiteComercio: function(obj) {
				var util = this;
				var dataIndex = angular.isObject(obj) ? obj : null;
				return function(entry, scope) {

					var comercios = [];

					var dComercios = $rootScope.$on('choice:litecomercios:get', getLiteComercios);
					var dresetComercios = $rootScope.$on('choice:litecomercios:reset', resetLiteComercios);

					scope.selComercio = selComercio;

					scope.$on('$destroy', destroyEvent);

					return comercios;

					function getLiteComercios(e, $item, $model) {
						util.apiLiteComercio($item, $model).then(function(response) {
							comercios = util.dataPrepare(response.data.originalElement, [dataIndex || {
								label: 'com_estb_rif'
							}, {
								value: 'com_id'
							}]);

							scope.$broadcast('choices:update', {
								choices: comercios
							});
						});
					}

					function resetLiteComercios() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function selComercio($item, $model) {

						/*$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dComercios();
						dresetComercios();
					}
				};
			},



			choiceMagnitud: function() {
				var util = this;
				return function(entry, scope) {

					var magnitudes = [];

					var dMagnitudes = $rootScope.$on('choice:magnitudes:get', getMagnitudes);
					var dresetMagnitudes = $rootScope.$on('choice:magnitudes:reset', resetMagnitudes);


					scope.$on('$destroy', destroyEvent);

					return magnitudes;

					function getMagnitudes(e, $item, $model) {
						util.apiMagnitud($item, $model).then(function(response) {
							magnitudes = util.dataPrepare(response.data.originalElement, [{
								label: 'mag_nomb'
							}, {
								value: 'mag_id'
							}]);

							scope.$broadcast('choices:update', {
								choices: magnitudes
							});
						});
					}

					function resetMagnitudes() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}


					function destroyEvent() {
						dMagnitudes();
						dresetMagnitudes();
					}
				};
			},
			choiceMedida: function() {
				var util = this;
				return function(entry, scope) {

					var medidas = [];

					var dMedidas = $rootScope.$on('choice:medidas:get', getMedidas);
					var dresetMedidas = $rootScope.$on('choice:medidas:reset', resetMedidas);

					scope.selMed = selMed;

					scope.$on('$destroy', destroyEvent);

					return medidas;

					function getMedidas(e, $item, $model) {
						util.apiMedida($item, $model).then(function(response) {
							medidas = util.dataPrepare(response.data.originalElement, [{
								label: 'med_nomb'
							}, {
								value: 'med_id'
							}]);

							scope.$broadcast('choices:update', {
								choices: medidas
							});
						});
					}

					function resetMedidas() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function selMed($item, $model) {

						/*$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dMedidas();
						dresetMedidas();
					}
				};
			},
			choiceProducto: function() {
				var util = this;
				return function(entry, scope) {

					var productos = [];

					var dProductos = $rootScope.$on('choice:productos:get', getProductos);
					var dresetProductos = $rootScope.$on('choice:productos:reset', resetProductos);

					scope.selProducto = selProducto;

					scope.$on('$destroy', destroyEvent);

					return productos;

					function getProductos(e, $item, $model) {
						util.apiProducto($item, $model).then(function(response) {
							productos = util.dataPrepare(response.data.originalElement, [{
								label: 'prod_nomb'
							}, {
								value: 'prod_id'
							}]);

							scope.$broadcast('choices:update', {
								choices: productos
							});
						});
					}

					function resetProductos() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function selProducto($item, $model) {

						/*$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dProductos();
						dresetProductos();
					}
				};
			},
			choiceCategoria: function() {
				var util = this;
				return function(entry, scope) {

					var categorias = [];

					var dCategorias = $rootScope.$on('choice:categorias:get', getCategorias);
					var dresetCategorias = $rootScope.$on('choice:categorias:reset', resetCategorias);

					scope.selCat = selCat;

					scope.$on('$destroy', destroyEvent);

					return categorias;

					function getCategorias(e, $item, $model) {
						util.apiCategoria($item, $model).then(function(response) {
							categorias = util.dataPrepare(response.data.originalElement, [{
								label: 'cat_nomb'
							}, {
								value: 'cat_id'
							}]);

							scope.$broadcast('choices:update', {
								choices: categorias
							});
						});
					}

					function resetCategorias() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function selCat($item, $model) {

						/*$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dCategorias();
						dresetCategorias();
					}
				};
			},

			choiceGrupo: function() {
				var util = this;
				return function(entry, scope) {

					var grupos = [];

					var dGrupos = $rootScope.$on('choice:grupos:get', getGrupos);
					var dresetGrupos = $rootScope.$on('choice:grupos:reset', resetGrupos);

					scope.selGrup = selGrup;

					scope.$on('$destroy', destroyEvent);

					return grupos;

					function getGrupos(e, $item, $model) {
						util.apiGrupo($item, $model).then(function(response) {
							grupos = util.dataPrepare(response.data.originalElement, [{
								label: 'grup_nomb'
							}, {
								value: 'grup_id'
							}]);

							scope.$broadcast('choices:update', {
								choices: grupos
							});
						});
					}

					function resetGrupos() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function selGrup($item, $model) {

						/*$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dGrupos();
						dresetGrupos();
					}
				};
			},

			choiceSgrupo: function() {
				var util = this;
				return function(entry, scope) {

					var sgrupos = [];

					var dSgrupos = $rootScope.$on('choice:sgrupos:get', getSgrupos);
					var dresetSgrupos = $rootScope.$on('choice:sgrupos:reset', resetSgrupos);

					scope.selSgrup = selSgrup;

					scope.$on('$destroy', destroyEvent);

					return sgrupos;

					function getSgrupos(e, $item, $model) {
						util.apiSgrupo($item, $model).then(function(response) {
							sgrupos = util.dataPrepare(response.data.originalElement, [{
								label: 'sgrup_nomb'
							}, {
								value: 'sgrup_id'
							}]);

							scope.$broadcast('choices:update', {
								choices: sgrupos
							});
						});
					}

					function resetSgrupos() {
						scope.$broadcast('choices:update', {
							choices: []
						});
					}

					function selSgrup($item, $model) {

						/*$rootScope.$broadcast('choice:municipios:reset');
						$rootScope.$broadcast('choice:parroquias:reset');
						$rootScope.$broadcast('choice:zonas:reset');*/
					}

					function destroyEvent() {
						dSgrupos();
						dresetSgrupos();
					}
				};
			},

			detailComercio: function() {

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
			apiMarca: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'marcas', '/api/marcas?limit=' + ($limit || '5000'));
			},
			apiModelo: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'zonas', '/api/modelos?filters[marca]=' + $model + '&limit=' + ($limit || '5000'));
			},
			apiComercio: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'comercios', '/api/comercios?limit=' + ($limit || '5000'));
			},
			apiLiteComercio: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'comercios', '/api/comercios/list?limit=' + ($limit || '5000'));
			},
			apitComercio: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'tcomercios', '/api/tcomercios?limit=' + ($limit || '5000'));
			},
			apiMedida: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'medidas', '/api/medidas?limit=' + ($limit || '5000'));
			},
			apiMagnitud: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'magnituds', '/api/magnituds?limit=' + ($limit || '5000'));
			},
			apiProducto: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'productos', '/api/productos?limit=' + ($limit || '50000'));
			},
			apiCategoria: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'categorias', '/api/categorias?limit=' + ($limit || '5000'));
			},
			apiGrupo: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'grupos', '/api/grupos?filters[cat]=' + $model + '&limit=' + ($limit || '5000'));
			},
			apiSgrupo: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'sgrupos', '/api/sgrupos?filters[grup]=' + $model + '&limit=' + ($limit || '5000'));
			},
			apiComercioDetail: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'comerciosdetail', '/api/comercios/' + $model + '/detail');
			},

			apiPrestacion: function($item, $model, $limit) {
				return RestWrapper.getList({}, 'prodprestacions', '/api/prodprestacions?filters[prod]=' + $model + '&limit=' + ($limit || '5000'));
			},
			apiOneComercio: function($item, $model) {
				return RestWrapper.getOne('comercio', '/api/comercios/' + $model);
			}
		};
	}

	UtilityService.$inject = ['$rootScope', 'RestWrapper', 'moment'];

	return UtilityService;
});