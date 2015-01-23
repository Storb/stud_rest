'use strict';

var studControllers = angular.module('studControllers', []);

studControllers.controller('studentsListCtrl',
    function($scope, Students, $routeParams,$http, $location){
        $scope.students = Students.query();
        $scope.students.$promise.then(function(){
            $scope.del = function(data){
//                var currentId = data.id;
                $http.delete('/students/' + data.id +'/').success(function(){
                    $scope.students = Students.query();
//                    for (var j = 0; j < $scope.students.length; j++) {
//                        if ($scope.students[j].id == currentId) {
//                            $scope.students.splice(j, 1);
//                            break;
//                        }
//                    }
                });
            };
            $scope.edit = function(data){
                $location.path('/students/edit/' + data.id + '/');
            }
        });
 });

studControllers.controller('studentDetailCtrl',
    function($scope, Student, $routeParams, $http, $location){
        $http.get('/students/'+$routeParams.id+'/').success(function(data) {
            $scope.student = data;
        });
        $scope.del = function () {
            var student = {
                'id': $scope.student.id,
                'group': $scope.student.group
            };
            $http.delete('/students/' + student.id + '/').success(function () {
                $location.path('/groups/'+student.group+'/');
            });
        };
        $scope.edeet = function(){
            var student = {
                'id': $scope.student.id
            };
            $location.path('/students/edit/'+student.id+'/');
        }
});
studControllers.controller('studentEditCtrl', function($scope, $location, $http, $routeParams){
    $http.get('/students/'+$routeParams.id+'/').success(function(data){
        $scope.student = data;
        $http.get('/groups/').success(function(data){
            $scope.groups = data;
            for(var i=0; i < data.length; i++){
                if($scope.student.group == data[i].id){
                    $scope.group = data[i];
                }
            }
        });
    });
    $scope.submit = function(){
        var student = {
            'group': $scope.group.id,
            'first_name': $scope.student.first_name,
            'patronymic': $scope.student.patronymic,
            'surname': $scope.student.surname,
            'date_birthday': $scope.student.date_birthday,
            'card_number': $scope.student.card_number
        };
        $http.put('/students/'+$routeParams.id+'/', student).success(function(){
            $location.path('/students/'+$routeParams.id+'/');
        });
    };
});
studControllers.controller('studentAddCtrl', function($scope, $location, $http){
    $http.get('/groups/').success(function(data) {
            $scope.groups = data;
        });
    $scope.student = '';
    $scope.submit = function(){
        var student = {
            'first_name': $scope.student.first_name,
            'patronymic': $scope.student.patronymic,
            'surname': $scope.student.surname,
            'date_birthday': $scope.student.date_birthday,
            'card_number': $scope.student.card_number
        };
        if ($scope.group){
            student['group'] = $scope.group.id
        }
        $http.post('/students/', student).success(function(){
            $location.path('/groups/');
        });
    }
});
studControllers.controller('studentDeleteCtrl', function($scope, $location, $http, $routeParams){
    $scope.submit = function(){
        $http.delete('/students/'+$routeParams.id+'/', $scope.student).success(function(){
            $location.path('/students/');
        });
    }
});
studControllers.controller('groupsListCtrl',
    function($scope, GroupsList, $http) {
        $scope.groupslist = GroupsList.query();
        $scope.groupslist.$promise.then(function(){
            $http.get('/students/').success(function(data){
                for(var i=0; i< $scope.groupslist.length; i++){
                    for(var j=0; j< data.length; j++){
                        if(data[j].id == $scope.groupslist[i].elder){
                            $scope.groupslist[i].elder=data[j]
                        }
                    }
                }
            });
        });
    });

studControllers.controller('groupAddCtrl', function($scope, $location, $http){
    $scope.group = '';
    $scope.submit = function(){
        var group = {
            'name': $scope.group.name,
            'elder': $scope.group.elder
        };
        $http.post('/groups/', group).success(function(data){
            $location.path('/groups/' + data.id + '/');
        });
    };
});
studControllers.controller('groupDeleteCtrl', function($scope, $location, $http, $routeParams){
    $scope.submit = function(){
        $http.delete('/groups/'+$routeParams.id+'/', $scope.group).success(function(){
            $location.path('/groups/');
        });
    }
});
studControllers.controller('groupDetailCtrl',
    function($scope, Group, $routeParams, $http, $location){
        $scope.group = Group.get({Id: $routeParams.id});
        $scope.del = function () {
            $http.delete('/groups/' + $scope.group.id + '/', $scope.group).success(function () {
                $location.path('/groups/');
            });
        };
        $scope.edit = function(){
            $location.path('/group/edit/' + $scope.group.id + '/');
        };
        $scope.student = '';
        $scope.submit = function() {
            var student = {
                'group': $scope.group.id,
                'first_name': $scope.student.first_name,
                'patronymic': $scope.student.patronymic,
                'surname': $scope.student.surname,
                'date_birthday': $scope.student.date_birthday,
                'card_number': $scope.student.card_number
            };
            $http.post('/students/', student).success(function (data) {
                $scope.group.students.push(data);
            });
        };
        $scope.sdel = function(student){
            $http.delete('/students/'+ student.id+'/', student).success(function(){
                $scope.group = Group.get({Id: $routeParams.id})
            });
        };
        $http.get('/groups/'+$routeParams.id+'/').success(function(data){
            $scope.group = data;
            $scope.students = $scope.group.students;
            for(var i=0; i < $scope.students.length; i++){
                if($scope.students[i].id == $scope.group.elder){
                    $scope.group.elder = $scope.students[i];
                }
            }
        })
});
studControllers.controller('groupEditCtrl', function($scope, $location, $http, $routeParams){
    $http.get('/groups/'+$routeParams.id+'/').success(function(data){
        $scope.group = data;
        $scope.students = $scope.group.students;
        for(var i=0; i < $scope.students.length; i++){
            if($scope.students[i].id == $scope.group.elder){
                $scope.group.elder = $scope.students[i];
            }
        }
    });
    $scope.submit = function(){
        $scope.group.elder = $scope.group.elder.id;
        $http.put('/groups/'+$routeParams.id+'/', $scope.group).success(function(){
            $location.path('/groups/'+$routeParams.id+'/');
        });
    }
});
