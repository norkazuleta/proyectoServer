/*global define*/
define(function() {
	'use strict';

	var baseApiUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/';

	var customHeaderTemplate = require('../view/layoutNavbar.html');
	var customLayoutTemplate = require('../view/layout.html');

	var customListViewTemplate = require('../../Crud/list/listLayout.html');
	var customDeleteViewTemplate = require('../../Crud/delete/delete.html');
	var customBatchDeleteTemplate = require('../../Crud/delete/batchDelete.html');
	var customEditViewTemplate = require('../../Crud/form/edit.html');
	var customShowViewTemplate = require('../../Crud/show/show.html');
	var customCreateViewTemplate = require('../../Crud/form/create.html');

	var customDashboardTemplate = require('../view/dashboard.html');

	function ConfigAdmin(NgAdminConfigurationProvider,
		UserAdminProvider,
		PaisAdminProvider,
		EstadoAdminProvider,
		MunicipioAdminProvider,
		ParroquiaAdminProvider,
		ZonaAdminProvider,
		AldeaAdminProvider,

		PnfAdminProvider,
		DocenteAdminProvider,
		EstudianteAdminProvider,
		UcAdminProvider,
		TrayectoAdminProvider,
		PeriodoAdminProvider,
		PnfTipoAdminProvider,
		PeriodoAcademicoAdminProvider,
		SeccionAdminProvider,
		TurnoAdminProvider,
		PnfTrayectoPeriodoAdminProvider,
		PnfTrayectoPeriodoUcAdminProvider
		) {


		var nga = NgAdminConfigurationProvider;

		var admin = NgAdminConfigurationProvider
			.application('SISTEMA DE RECORD DE NOTAS')
			.baseApiUrl(baseApiUrl);


		admin
			.addEntity(UserAdminProvider.$get())
			.addEntity(PaisAdminProvider.$get())
			.addEntity(EstadoAdminProvider.$get())
			.addEntity(MunicipioAdminProvider.$get())
			.addEntity(ParroquiaAdminProvider.$get())
			.addEntity(ZonaAdminProvider.$get())
			.addEntity(AldeaAdminProvider.$get())
			.addEntity(PnfAdminProvider.$get())
			.addEntity(PnfTipoAdminProvider.$get())
			.addEntity(PeriodoAcademicoAdminProvider.$get())
			.addEntity(SeccionAdminProvider.$get())
			.addEntity(TurnoAdminProvider.$get())
			.addEntity(UcAdminProvider.$get())
			.addEntity(TrayectoAdminProvider.$get())
			.addEntity(PeriodoAdminProvider.$get())
			.addEntity(DocenteAdminProvider.$get())
			.addEntity(EstudianteAdminProvider.$get())
			.addEntity(PnfTrayectoPeriodoAdminProvider.$get())
			.addEntity(PnfTrayectoPeriodoUcAdminProvider.$get())
		;

		admin.menu(nga.menu()
			.addChild(nga.menu().title('Escritorio').icon('<span class="fa fa-dashboard"> </span>').link('/dashboard'))
			.addChild(nga.menu().title('Usuario').icon('<span class="fa fa-user"> </span>')
				.addChild(nga.menu().title('Perfil').icon('<span class="fa fa-user"> </span>').link('/profile/show'))
				.addChild(nga.menu().title('Cuenta').icon('<span class="fa fa-user"> </span>').link('/profile/edit'))
				.addChild(nga.menu().title('Contraseña').icon('<span class="fa fa-lock"> </span>').link('/profile/change-password'))
			)
			.addChild(nga.menu().title('Configuración').icon('<span class="fa fa-gears"> </span>')
				.addChild(nga.menu(UserAdminProvider.$get()).icon('<span class="fa fa-users"> </span>'))
				/*.addChild(nga.menu(PaisAdminProvider.$get()))*/
				.addChild(nga.menu(EstadoAdminProvider.$get()))
				.addChild(nga.menu(MunicipioAdminProvider.$get()))
				.addChild(nga.menu(ParroquiaAdminProvider.$get()))
				/*.addChild(nga.menu(ZonaAdminProvider.$get()))*/
				.addChild(nga.menu(AldeaAdminProvider.$get()))
				.addChild(nga.menu(TurnoAdminProvider.$get()))
				.addChild(nga.menu(PnfTrayectoPeriodoAdminProvider.$get()))
				.addChild(nga.menu(PnfTrayectoPeriodoUcAdminProvider.$get()))
			)
			.addChild(nga.menu().title('Seguimiento Académico').icon('<span class="fa fa-key"> </span>')
				.addChild(nga.menu().title('Cargar Notas').icon('<span class="fa fa-user"> </span>').link('/profile/show'))
				.addChild(nga.menu().title('Nueva Sección').icon('<span class="fa fa-user"> </span>').link('/seccions/create'))
				.addChild(nga.menu().title('Administrar Sección').icon('<span class="fa fa-user"> </span>').link('/seccions/list'))
				.addChild(nga.menu().title('Asignar Docente').icon('<span class="fa fa-user"> </span>').link('/docentes/create'))
				.addChild(nga.menu().title('Administrar Docente').icon('<span class="fa fa-user"> </span>').link('/docentes/list'))
				.addChild(nga.menu().title('Asignar Estudiante').icon('<span class="fa fa-user"> </span>').link('/estudiantes/create'))
				.addChild(nga.menu().title('Administrar Estudiante').icon('<span class="fa fa-user"> </span>').link('/estudiantes/list'))
			)
			.addChild(nga.menu().title('Periodo Académico').icon('<span class="fa fa-key"> </span>')
				.addChild(nga.menu(PnfTipoAdminProvider.$get()))
				.addChild(nga.menu(PeriodoAcademicoAdminProvider.$get()))
			)
			.addChild(nga.menu().title('Malla Curricular').icon('<span class="fa fa-key"> </span>')
				.addChild(nga.menu(PnfAdminProvider.$get()))
				.addChild(nga.menu(TrayectoAdminProvider.$get()))
				.addChild(nga.menu(PeriodoAdminProvider.$get()))
				.addChild(nga.menu(UcAdminProvider.$get()))
			)
		);

		var customTemplate = {
			'DeleteView': customDeleteViewTemplate,
			'EditView': customEditViewTemplate,
			'ListView': customListViewTemplate,
			'ShowView': customShowViewTemplate,
			'CreateView': customCreateViewTemplate,
			'BatchDeleteView': customBatchDeleteTemplate
		};

		admin.customTemplate(function(viewName) {
			if (customTemplate[viewName]) {
				return customTemplate[viewName];
			}
		});

		admin.header(customHeaderTemplate);

		admin.dashboard(nga.dashboard()
	    	.addCollection(nga.collection(UserAdminProvider.$get())
	    		.title('Usuarios')
	    		.fields([
					nga.field('username').label('profile.show.username'),
					nga.field('email').label('Correo electrónico'),
					nga.field('enabled', 'boolean').label('Estado')
				])
	    	)

			.template(customDashboardTemplate)
		);

		NgAdminConfigurationProvider.configure(admin);
	}

	ConfigAdmin.$inject = [
		'NgAdminConfigurationProvider',
		'UserAdminProvider',
		'PaisAdminProvider',
		'EstadoAdminProvider',
		'MunicipioAdminProvider',
		'ParroquiaAdminProvider',
		'ZonaAdminProvider',
		'AldeaAdminProvider',

		'PnfAdminProvider',
		'DocenteAdminProvider',
		'EstudianteAdminProvider',
		'UcAdminProvider',
		'TrayectoAdminProvider',
		'PeriodoAdminProvider',
		'PnfTipoAdminProvider',
		'PeriodoAcademicoAdminProvider',
		'SeccionAdminProvider',
		'TurnoAdminProvider',
		'PnfTrayectoPeriodoAdminProvider',
		'PnfTrayectoPeriodoUcAdminProvider',
	];

	return ConfigAdmin;
});