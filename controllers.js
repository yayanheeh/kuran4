app.controller('navbarCtrl',function ($scope,$http,$rootScope,apiService) {
	if ($rootScope.identifier === undefined) {
		$rootScope.identifier = 'ar.muyassar';	
	};

	if ($rootScope.type === undefined) {
		$rootScope.type = 'all';	
	};

	if ($rootScope.language === undefined) {
		$rootScope.language = 'en';	
	};

	apiService.editions(function(editions) {
		 $scope.editions = editions;
	});

	apiService.languages(function(languages) {
		 $scope.languages = languages;
	});

	apiService.types(function(types) {
		$scope.types = [];
		$scope.types = types;
		$scope.types.unshift('all');
	});

	$scope.setType = function (type) {
		$rootScope.type = type;
	};

	$scope.saveIdentifier = function (identifier) {
		$rootScope.identifier = identifier;
	};

	$scope.setLanguage = function (language) {
		$rootScope.language = language;
	};
});

app.controller('editionsCtrl',function ($scope,$http,apiService) {
	$scope.editions = [];
	$scope.languages =[];

	apiService.editions(function(editions) {
		 $scope.editions = editions;
	});

	apiService.languages(function(languages) {
		 $scope.languages = languages;
	});
});

app.controller('listJuzCtrl',function ($scope,$rootScope) {
	$scope.juzNumbers = [];
	for (var i = 1; i <= 30; i++) {
		$scope.juzNumbers.push(i);
	};

	$scope.identifier = $rootScope.identifier;
})

app.controller('surahsCtrl',function ($scope,$http,$stateParams,apiService) {

	apiService.quran(function(quran) {
		 $scope.surahs = quran;
	});
});


app.controller('ayahsCtrl',function ($scope,$http,$stateParams,apiService) {

	var surahNumber = $stateParams.surahNumber;

	apiService
		.getSurah(surahNumber,$rootScope.identifier)
		.then(function successCallback(response) {
			//Store the data object in $scope.ayahs
		    $scope.ayahs = response.data.data.ayahs;
		}, 	function errorCallback(response) {
		   	console.log(response);
		});
});

app.controller('juzCtrl',function ($scope,$http,$stateParams,apiService) {

	var identifier = $stateParams.identifier;
	var juzNumber = $stateParams.juzNumber;

	apiService
		.getJuz(juzNumber,identifier)
		.then(function successCallback(response) {
			//Store the data object in $scope.ayahs
			console.log(response.data.data)
		    $scope.ayahs = response.data.data.ayahs;
		  }, function errorCallback(response) {
		    console.log(response);
		  });
});

app.controller('resourcesCtrl',function ($scope,$http,$stateParams,apiService) {
	
	var type = $stateParams.type;

	apiService
		.getType(type)
		.then(function successCallback(response) {
				//Store the data object in $scope.resources
			    $scope.resources = response.data.data;
			  }, function errorCallback(response) {
			    console.log(response);
			  });
});

app.service('apiService', function($http){
	this.editions = getEditions;
	this.types = getTypes;
	this.languages = getEditionsLanguages;
	this.quran = listSurah;

	function getEditions(callback) {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/edition'
		}).then(function successCallback(response) {
			//Store the data array in $scope.editions
		    callback(response.data.data);
		  }, function errorCallback(response) {
		    console.log(response.error);
		  });
	};

	function getTypes(callback) {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/edition/type'
		}).then(function successCallback(response) {
			//Store the data array in $scope.types
		    callback(response.data.data);
		  }, function errorCallback(response) {
		    console.log(response.error);
		  });
	};

	function getEditionsLanguages(callback) {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/edition/language'
		}).then(function successCallback(response) {
			//Store the data array in $scope.editions
		    callback(response.data.data);
		  }, function errorCallback(response) {
		    console.log(response.error);
		  });
	};

	function listSurah(callback) {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/surah'
		}).then(function successCallback(response) {
			//Store the data object in $scope.surahs
		    callback(response.data.data);
		  }, function errorCallback(response) {
		    console.log(response);
		  });
	};

	this.getSurah = function(surahNumber,identifier) {
		return 	$http({
				  method: 'GET',
				  url: 'http://api.alquran.cloud/surah/'+ surahNumber + '/' + identifier
				})
	};

	this.getJuz = function (juzNumber,identifier) {
		return  $http({
				  method: 'GET',
				  url: 'http://api.alquran.cloud/juz/'+ juzNumber + '/' + identifier
				})
	};

	this.getType = function (type) {
		return 	$http({
				  method: 'GET',
				  url: 'http://api.alquran.cloud/edition/type/' + type
				})
	};
})