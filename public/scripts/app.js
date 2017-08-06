var app = angular.module('myApp', ['ngMaterial', 'ui.router', 'firebase']);

app.config(function($mdThemingProvider, $stateProvider) {
	
  $mdThemingProvider.theme('default')
    .primaryPalette('grey', {

    })
    .accentPalette('blue-grey')
    .backgroundPalette('grey', {
    
    });
    
    $stateProvider
    .state('classifieds', {
    	url:'/classifieds',
    	templateUrl:'Components/classifieds/classifieds.tpl.html',
    	controller:'mainCtrl as vm'
    })
    .state('classifieds.new', {
    	url:'/new',
    	templateUrl:'Components/classifieds/new/classifieds.new.tpl.html',
    	controller:'newMainCtrl as vm'
    })
    .state('classifieds.edit', {
    	url:'/edit/:id',
    	templateUrl:'Components/classifieds/edit/classifieds.edit.tpl.html',
    	controller:'editMainCtrl as vm',
    	params:{
    		classified: null
    	}
    });
    
	    
});
