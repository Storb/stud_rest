vars = {
    static: '/static/',
    static_template: '/static/angular/view/'
}

var stud = angular.module('studApp', [
    'ngRoute',
	'ngResource',
    'studentServices',
    'studControllers'
]);

stud.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.when('/groups/',{
                templateUrl: vars.static_template + 'groups.html',
                controller: 'groupsListCtrl'
            }).when('/students/', {
                templateUrl: vars.static_template + 'students.html',
                controller: 'studentsCtrl'
            }).when('/groups/:id/', {
                templateUrl: vars.static_template + 'group_detail.html',
                controller: 'groupCtrl'
            }).when('/students/:id/', {
                templateUrl: vars.static_template + 'student_detail.html',
                controller: 'studentDetailCtrl'
            }).when('/group/add/', {
                templateUrl: vars.static_template + 'group_add.html',
                controller: 'groupAddCtrl'
            });
    }]
);
stud.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';    }
]);