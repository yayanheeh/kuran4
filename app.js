var app = angular.module('quranApp',['ui.router']);

/* ------------ STATES -------------*/
app.config(function ($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/surahs');
	$stateProvider
		.state('home',{
			url: '',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				}
			}
			
		})
		.state('editions',{
			url: '/editions',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				},
				'body': {
					templateUrl: '/html/editions.html',
					controller: 'editionsCtrl'
				}
			}
		})
		.state('surahs',{
			url: '/surahs/:identifier',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				},
				'body': {
					templateUrl: '/html/surahs.html',
					controller: 'surahsCtrl'
				}
			}
			
		})
		.state('ayahs',{
			url: '/ayahs/:identifier/:surahNumber',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				},
				'body': {
					templateUrl: '/html/ayahs.html',
					controller: 'ayahsCtrl'
				}
			}
			
		})
		.state('listJuz',{
			url: '/listJuz/:identifier',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				},
				'body': {
					templateUrl: '/html/juz.all.html',
					controller: 'listJuzCtrl'
				}
			}
		})
		.state('juz',{
			url: '/juz/:identifier/:juzNumber',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				},
				'body': {
					templateUrl: '/html/juz.html',
					controller: 'juzCtrl'
				}
			}
		})
		.state('resources',{
			url: '/resources/:type',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				},
				'body': {
					templateUrl: '/html/resources.html',
					controller: 'resourcesCtrl'
				}
			}
		})
		.state('notFound',{
			url: '/notFound',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				},
				'body': {
					template: '404 not found',
				}
			}
		})
		// .otherwise({
		// 	template: '404 NOT FOUND'
		// });
});
