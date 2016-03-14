/*global define*/
define(function () {
	'use strict';

	function InterceptorAdmin (RestangularProvider) {
		RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params) {
			if (operation == "getList") {
				if (params._page) {
					params._start = (params._page - 1) * params._perPage;
	                params._end = params._page * params._perPage;

	                params.offset = params._start;
	                params.limit = params._end;

	                delete params._start;
					delete params._end;

				}
				delete params._page;
				delete params._perPage;

				if (params._sortField) {
					/*params._sort = params._sortField;*/
					/*params.sorting = new Array();


					var order_by = {};
					order_by[params._sortField] = params._sortDir;
					order_by['case_name'] = 'ASC';
					var order = [];
					order.push('[case_id]=ASC');
					order.push('[case_name]=DESC');

					params.sorting = order_by;*/

					delete params._sortDir;
					delete params._sortField;
				}

				if (params._filters) {
					for (var filter  in params._filters) {
						params[filter] = params._filters[filter];
					}
					delete params._filters;
				}
			}
			return {
				params: params
			};
		});

	    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {

	        if (operation === 'getList' && data && data._embedded) {

	        	return data._embedded.items;
	        }

	        //extra reference_many
			if (operation === 'get' && what === 'aldeas' && angular.isArray(data.aldea_turno)) {
				response.data._aldea_turno = response.data.aldea_turno;
				var aldea_turno = [];
				angular.forEach(response.data.aldea_turno, function(item) {
					aldea_turno.push(item.turno.turn_id);
				});
				response.data.aldea_turno = aldea_turno;
			}

			if (operation === 'get' && what === 'pnftrayectoperiodos' && angular.isArray(data.uc)) {

				response.data._uc = response.data.uc;
				var uc = [];
				angular.forEach(response.data.uc, function(item) {
					uc.push(item.uc.uc_id);
				});
				response.data.uc = uc;
			}



	        return data;
	    });

	    RestangularProvider.setResponseExtractor(function (data) {
			var resp = data;
	        if (angular.isArray(data)) {
	            resp.originalElement = [];
	            angular.forEach(resp, function (value, key) {
	                resp.originalElement[key] = angular.copy(value);
	            });
	        } else if (angular.isObject(data)) {
	            resp.originalElement = angular.copy(data);
	        }

	        return resp;
	    })
	}

	InterceptorAdmin.$inject = ['RestangularProvider'];

	return InterceptorAdmin;
});