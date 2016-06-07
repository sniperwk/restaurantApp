'use strict';

angular.module('confusionApp', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			// route for the home page
			.state('app', {
				url: '/',
				views: {
					'header': {
						templateUrl: 'views/header.html'
					},
					'content': {
						template: '<h1>To be completed</h1>',
						controller: 'IndexController'
					},
					'footer': {
						templateUrl: 'views/footer.html'
					}
				}
			})

			// route for about us page
			.state('app.aboutus', {
				url: 'aboutus',
				views: {
					'content@': {
						template: '<h1>To be completed</h1>',
						controller: 'AboutController'
					}
				}
			})

			// route for contact us page
			.state('app.contactus', {
				url: 'contactus',
				views: {
					'content@': {
						templateUrl: 'views/contactus.html',
						controller: 'ContactController'
					}
				}
			})

			// route for menu page
			.state('app.menu', {
				url: 'menu',
				views: {
					'content@': {
						templateUrl: 'views/menu.html',
						controller: 'MenuController'
					}
				}
			})

			// route for dishdetail page
			.state('app.dishdetails', {
				url: 'menu/:id',
				views: {
					'content@': {
						templateUrl: 'views/dishdetail.html',
						controller: 'DishDetailController'
					}
				}
			});

		$urlRouterProvider.otherwise('/');
	})	
	;

