vars = {
    static: '/static/',
    static_template: '/static/angular/view/'
};

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
            }).when('/groups/:id/', {
                templateUrl: vars.static_template + 'group_detail.html',
                controller: 'groupDetailCtrl'
            }).when('/group/add/', {
                templateUrl: vars.static_template + 'group_add.html',
                controller: 'groupAddCtrl'
            }).when('/group/edit/:id/', {
                templateUrl: vars.static_template + 'group_edit.html',
                controller: 'groupEditCtrl'
            }).when('/students/', {
                templateUrl: vars.static_template + 'students.html',
                controller: 'studentsListCtrl'
            }).when('/students/:id/', {
                templateUrl: vars.static_template + 'student_detail.html',
                controller: 'studentDetailCtrl'
            }).when('/students/edit/:id', {
                templateUrl: vars.static_template + 'student_edit.html',
                controller: 'studentEditCtrl'
            }).when('/student/add/', {
                templateUrl: vars.static_template + 'student_add.html',
                controller: 'studentAddCtrl'
            });
    }]
);
stud.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);