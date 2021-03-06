
var MainModule = angular.module('mainMod', ['ng-admin', 'ui.router', 'boxuk.translation', 'angularMoment']);
MainModule.constant('appConfig', window.config || {});
MainModule.controller('AppCtrl', require('./component/controller/AppController'));
MainModule.controller('ModalLoginCtrl', require('./component/controller/ModalLoginController'));
MainModule.controller('ModalLogoutCtrl', require('./component/controller/ModalLogoutController'));
MainModule.controller('ModalAccessDeniedDeCtrl', require('./component/controller/ModalAccessDeniedController'));
MainModule.controller('SessionDropdownCtrl', require('./component/controller/SessionDropdownController'));

MainModule.factory('AuthenticationService', require('./component/factory/AuthenticationService'));
MainModule.factory('UtilityService', require('./component/factory/UtilityService'));

MainModule.controller('PageController', require('./component/controller/PageController'));
MainModule.controller('LoginController', require('./component/controller/LoginController'));
MainModule.controller('RegisterController', require('./component/controller/RegisterController'));
MainModule.controller('LostpasswordController', require('./component/controller/LostpasswordController'));
MainModule.controller('HomeController', require('./component/controller/HomeController'));
MainModule.controller('ProfileController', require('./component/controller/ProfileController'));
MainModule.controller('ChangePasswordController', require('./component/controller/ChangePasswordController'));
MainModule.controller('ResettingController', require('./component/controller/ResettingController'));
MainModule.controller('ResettingResetController', require('./component/controller/ResettingResetController'));

MainModule.controller('HandlePrintController', require('./component/controller/HandlePrintController'));
MainModule.controller('HandleReportController', require('./component/controller/HandleReportController'));
MainModule.controller('AsigEstuController', require('./component/controller/AsigEstuController'));
MainModule.controller('AsigDoceController', require('./component/controller/AsigDoceController'));
MainModule.controller('CargaNotaController', require('./component/controller/CargaNotaController'));
MainModule.controller('PersonaCreateController', require('./component/controller/PersonaCreateController'));
MainModule.controller('FController', require('./component/controller/FController'));

MainModule.config(require('./config/routing'));

MainModule.config(require('./component/factory/AjusteAdmin'));
MainModule.config(require('./component/factory/UserAdmin'));
MainModule.config(require('./component/factory/PaisAdmin'));
MainModule.config(require('./component/factory/EstadoAdmin'));
MainModule.config(require('./component/factory/MunicipioAdmin'));
MainModule.config(require('./component/factory/ParroquiaAdmin'));
MainModule.config(require('./component/factory/ZonaAdmin'));
MainModule.config(require('./component/factory/TurnoAdmin'));
MainModule.config(require('./component/factory/AldeaAdmin'));

MainModule.config(require('./component/factory/PnfAdmin'));
MainModule.config(require('./component/factory/PersonaAdmin'));
MainModule.config(require('./component/factory/EstudianteAdmin'));
MainModule.config(require('./component/factory/DocenteAdmin'));
MainModule.config(require('./component/factory/UcAdmin'));
MainModule.config(require('./component/factory/TrayectoAdmin'));
MainModule.config(require('./component/factory/PeriodoAdmin'));
MainModule.config(require('./component/factory/PnfTipoAdmin'));
MainModule.config(require('./component/factory/PeriodoAcademicoAdmin'));
MainModule.config(require('./component/factory/SeccionAdmin'));
MainModule.config(require('./component/factory/PnfTrayectoPeriodoAdmin'));
MainModule.config(require('./component/factory/PnfTrayectoPeriodoUcAdmin'));

MainModule.config(require('./config/InterceptorAdmin'));
MainModule.config(require('./config/ConfigAdmin'));
MainModule.config(require('./config/notification'));

MainModule.provider('UserService', require('./component/service/UserService'));

MainModule.run(require('./run/initGlobal'));
MainModule.run(require('./run/LoaderToken'));
MainModule.run(require('./run/initMoment'));