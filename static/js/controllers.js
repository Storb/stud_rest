'use strict';

var studControllers = angular.module('studControllers', []);

studControllers.controller('studentsListCtrl',
    function($scope, Students, Student, $routeParams,$http){
        var formatStudents = function(students, groups) {
            for (var j = 0; j < groups.length; j++){
                for (var i = 0; i< students.length; i++) {
                    if (students[i].group == groups[j].id) {
                        students[i].group = groups[j];
                    }
                }
            }
            return students;
        };

        $scope.del = function(student){
            Student.delete({Id: student.id});
            $scope.students.pop(student.id);
        };

        $scope.update = function(data) {
            var student = {
                'group': data.group.id,
                'first_name': data.first_name,
                'patronymic': data.patronymic,
                'surname': data.surname,
                'date_birthday': data.date_birthday,
                'card_number': data.card_number
            };
            Student.update({Id: data.id}, student);
            $scope.students.push(student);
        };

        var studentsPromise = Students.query().$promise;
        studentsPromise.then(function(students) {
            $http.get('/groups/').success(function(groups){
                $scope.groups = groups;
                $scope.students = formatStudents(students, groups);
            });
        })
 });

studControllers.controller('studentDetailCtrl',
    function($scope, Student, $routeParams, $http, $location){
        $scope.student = Student.get({Id: $routeParams.id});

        $scope.del = function () {
            Student.delete({Id: $routeParams.id});
            $location.path('/students/');
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
        console.log(student);
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

studControllers.controller('groupsListCtrl',
    function($scope, GroupsList, $http) {
        var groupPromise = GroupsList.query().$promise;
        groupPromise.then(function(groups){
            $scope.groupslist = groups;
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
        $http.post('/groups/', $scope.group).then(function(data){
            console.log(data);
            $location.path('/groups/' + data.data.id + '/');
        });
    };
});

studControllers.controller('groupDetailCtrl',
    function($scope, Group, $routeParams, $http, $location){
        $scope.group = Group.get({Id: $routeParams.id});
        $scope.del = function () {
            Group.delete({Id: $routeParams.id});
            $location.path('/groups/');
        };

        $scope.edit = function(){
            $location.path('/group/edit/' + $scope.group.id + '/');
        };

        $scope.student = '';

        $scope.submit = function() {
            var stud = {
                'group': $scope.group.id,
                'first_name': $scope.student.first_name,
                'patronymic': $scope.student.patronymic,
                'surname': $scope.student.surname,
                'date_birthday': $scope.student.date_birthday,
                'card_number': $scope.student.card_number
            };
            $http.post('/students/', stud).success(function (data) {
                $scope.group.students.push(data);
            });
        };

        $scope.sdel = function(student){
            $http.delete('/students/'+ student.id+'/', student).success(function(){
                $scope.group = Group.get({Id: $routeParams.id})
            });
        };

         $scope.update = function (student) {
             $http.put('/students/' + student.id +'/', student)
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
        for(var i=0; i<$scope.students.length; i++){
            if($scope.group.elder == $scope.students[i].id){
                $scope.group.elder = $scope.students[i]
            }
        }
        if($scope.group.students == 0){
            $scope.students = false;
        }
        console.log($scope.group.elder);
    });
    $scope.submit = function(data){
        var group = {
            'name': data.name,
            'elder': data.elder.id
        };
        $http.put('/groups/' + $scope.group.id + '/', group).success(function(data){
            $location.path('/groups/'+data.id+'/');
        });
    }
});

