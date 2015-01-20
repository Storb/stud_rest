'use strict';

var studControllers = angular.module('studControllers', []);

studControllers.controller('studentsCtrl',
    function($scope, Students){
        $scope.students = Students.query();
    }
);
studControllers.controller('groupsListCtrl',
    function($scope, GroupsList, $routeParams, Group){
        $scope.groupslist = GroupsList.query();
    }
);
studControllers.controller('groupCtrl',
    function($scope, Group, $routeParams){
        $scope.group = Group.get({Id: $routeParams.id});
});
studControllers.controller('studentDetailCtrl',
    function($scope, Student, $routeParams){
        $scope.student = Student.get({Id: $routeParams.id});
    }
);
studControllers.controller('groupAddCtrl', function($scope, $location, $http){
    $scope.group = '';
    $scope.submit = function(){
        var group = {
            'name': $scope.group.name
        };
        $http.post('/api/groups/', group).success(function(data){
            $location.path('/groups/').replace();
        });
    }
});
studControllers.controller('groupDeleteCtrl', function($scope, $location, $http, $roteParams){
    $scope.submit = function(){
        $http.delete('/api/groups/'+$routeParams.groupid+'/', $scope.group).success(function(data){
            $location.path('/groups/').replace();
        });
    }
});
//var addStudentControllers = function($scope){
//    $scope.selection = 'StudentForm';
//    $scope.student = Student.query();
//    $scope.apply = $scope.title = 'Add';
//    scope.ok = function(name)
//}

//yovaControllers.controller('feedsCtrl', function($scope, $http){
//  $http({method: 'GET', url: '/api/v1/feeds.json'}).
//    success(function(data, status, headers, config) {
//      console.log(data);
//      console.log(data.feeds);
//      $scope.feedLimit = 7;
//      $scope.showMore = function() {
//        $scope.feedLimit += 5;
//      }
//      $scope.feeds = data.feeds;
//    }).
//    error(function(data, status, headers, config) {
//      // Called asynchronously if an error occurs
//      console.log("Failed to retrieve user messages");
//    });
//
//});