(function(){
	
	app.controller('mainCtrl', ['$scope', '$http', 'CustomHttpServise','$mdSidenav', '$mdToast','$mdDialog', '$state','$firebaseArray',  
					function($scope, $http, CustomHttpServise, $mdSidenav, $mdToast, $mdDialog, $state, $firebaseArray){
		
		var vm = this;
		
		vm.openSideBar = openSideBar;
		vm.closeSidebar = closeSidebar;
		vm.saveClassified = saveClassified;
		vm.editItem = editItem;
		vm.saveEdit = saveEdit;
		vm.deleteItem = deleteItem;
		
		vm.classifieds;
		vm.categories;
		vm.editing;
		vm.classified;
		
		
		
		vm.classifieds = CustomHttpServise.ref;
		vm.classifieds.$loaded().then(function(classifieds){
			vm.categories = getCategories(classifieds);
		});
	
		$scope.$on('newClassified', function(event , classified){
			vm.classifieds.$add(classified);
		});
		
		/*$scope.$on('editSaved', function(event, message){
			showToast(message);
		 });
		*/
		
		//Fake Contact
		var contact = {
			name: "Dmitri Rivin",
			phone: " 054 - 626777",
			email: "dmitri@gmail.com"
		};
		
		
		function openSideBar () {
			$state.go('classifieds.new');
			
			
		};
		
		function closeSidebar (){
			$mdSidenav('left').close();
		};
		
		//Fake save on a Front-End
		function saveClassified (){
			
			if (classified != undefined){
				classified.contact = contact;
				vm.classifieds.push(vm.classified);
				vm.classified = undefined;
				closeSidebar();
				showToast("saved!");
				
			}
			
			else{
				showToast("Nothing Placed!!!!!");
			}
			console.log(classified);
			
		};
		
		
		function editItem (classified){
			$state.go('classifieds.edit', {
				id: classified.$id
			});
		};
		
		function saveEdit (){
			vm.editing = false;
			vm.classified = undefined;
			closeSidebar();
			showToast("saved!");
		};
		
		function deleteItem (event, classified){
			var confirm = $mdDialog.confirm().title('Are you sure you whant delete ' + classified.title + ' ?')
			.ok('Yes')
			.cancel('No')
			.targetEvent(event);
			$mdDialog.show(confirm)
			.then(function(){
				vm.classifieds.$remove(classified);
				showToast('removed!');
			}, function(){
			
			});
		};
		
		function showToast(toastMsg){
			$mdToast.show($mdToast.simple().content(toastMsg).position('top , right').hideDelay(3000));
		}
		
		function getCategories(classifieds){
			var categories = [];
			angular.forEach(classifieds, function(item){
				angular.forEach(item.categories, function(category){
					categories.push(category);
				});
			});
			return _.uniq(categories);
		}
		
	
	}]);
	
		
})();
