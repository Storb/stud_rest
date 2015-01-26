vars = {
    static: '/static/',
    static_template: '/static/angular/view/'
};

var stud = angular.module('studApp', [
    'ngRoute',
	'ngResource',
    'studentServices',
    'studControllers',
    'editStudent'
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
            }).when('/groups/delete/:id/', {
                templateUrl: vars.static_template + 'group_delete.html',
                controller: 'groupDeleteCtrl'
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
            }).when('/students/delete/:id', {
                templateUrl: vars.static_template + 'student_delete.html',
                controller: 'studentDeleteCtrl'
            }).when('/student/add/', {
                templateUrl: vars.static_template + 'student_add.html',
                controller: 'studentAddCtrl'
            }).when('/login/', {
                templateUrl: vars.static_template + 'login.html',
                controller: 'LoginCtrl'
            });
    }]
);
stud.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);