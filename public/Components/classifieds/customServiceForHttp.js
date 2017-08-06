(function(){
	
	app.service('CustomHttpServise',function($http, $firebaseArray){
		
		var ref = firebase.database().ref();

		return{
			ref: $firebaseArray(ref)
		} ;
		
		
	});
	
	
	
	
})();
