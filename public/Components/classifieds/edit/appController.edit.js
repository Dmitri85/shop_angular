(function(){

	app.controller('editMainCtrl', ['$scope', '$http', 'CustomHttpServise','$mdSidenav', '$mdToast','$mdDialog','$timeout','$state',   
					function($scope, $http, CustomHttpServise, $mdSidenav, $mdToast, $mdDialog, $timeout, $state){
		
		var vm = this;
		
		vm.classifieds = CustomHttpServise.ref;
		vm.closeSidebar = closeSidebar;
		vm.saveEdit = saveEdit;
		vm.showToast = showToast;
		vm.classified = vm.classifieds.$getRecord($state.params.id);
		
		$timeout(function(){
			$mdSidenav('left').open();
		}, 1);
		
		$scope.$watch('vm.sidenavOpen', function(sidenav){
			if (sidenav === false){
				$mdSidenav('left').close()
								  .then(function(){
								  	$state.go('classifieds');
								  });
			}
		});
		
		function closeSidebar(){
			vm.classified = undefined;
			vm.sidenavOpen = false;	
		}
		
		function saveEdit(classified){
			vm.classifieds.$save(vm.classified).then(function(){
				$scope.$emit('editSaved', 'edit saved!');
				vm.sidenavOpen = false;
				showToast("edit saved!");	
			});
			
				
		}
	
		function showToast(toastMsg){
			$mdToast.show($mdToast.simple().content(toastMsg).position('top , right').hideDelay(3000));
		}
	
	}]);

})();
