(function(){

	app.directive('classifiedCard', function(){
		return{
			templateUrl:'Components/classifieds/Card/classified-card.tpl.html',
			scope:{
				classifieds: '=',
				classifiedsFilter: '=classifiedsFilter',
				category: '=category'
			},
			controller: classifiedCardController,
			controllerAs:'vm'
				
		};
		
		function classifiedCardController($state, $scope, $mdDialog, $mdToast){
			
			var vm = this;
			vm.editItem = editItem;
			vm.deleteItem = deleteItem;
			vm.showToast = showToast;
		
			function editItem (classified){
			$state.go('classifieds.edit', {
				id: classified.$id
				});
			};
			
			function deleteItem (event, classified){
			var confirm = $mdDialog.confirm().title('Are you sure you whant delete ' + classified.title + ' ?')
			.ok('Yes')
			.cancel('No')
			.targetEvent(event);
			$mdDialog.show(confirm)
			.then(function(){
				$scope.classifieds.$remove(classified);
				showToast('removed!');
			}, function(){
			
				});
			};
			
			function showToast(toastMsg){
			$mdToast.show($mdToast.simple().content(toastMsg).position('top , right').hideDelay(3000));
			}
		}
	});
	
})();
