(function(){

	app.controller('newMainCtrl', ['$scope', '$http', 'CustomHttpServise','$mdSidenav', '$mdToast','$mdDialog','$timeout','$state',   
					function($scope, $http, CustomHttpServise, $mdSidenav, $mdToast, $mdDialog, $timeout, $state){
		
		var vm = this;
		
		vm.closeSidebar = closeSidebar;
		vm.saveClassified = saveClassified;
		vm.showToast = showToast;
		
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
		
		function saveClassified(classified){
			if (classified != undefined){
				
					classified.contact = {
					name: "Dmitri Rivin",
					phone: " 054 - 626777",
					email: "dmitri@gmail.com"
				};
				
				$scope.$emit('newClassified', classified);
				vm.sidenavOpen = false;
				showToast("saved!");
				
			}
			
			else{
				showToast("Nothing Placed!!!!!");
			}
		}
	
		function showToast(toastMsg){
			$mdToast.show($mdToast.simple().content(toastMsg).position('top , right').hideDelay(3000));
		}
	
	}]);

})();
