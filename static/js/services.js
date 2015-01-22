var studServices = angular.module('studentServices', ['ngResource', 'ngRoute']);

studServices.factory('Students',
    function($resource){
        return $resource('/api/students/');
    }
);

studServices.factory('GroupsList',
    function($resource){
        return $resource('/api/groups/');
    }
);

studServices.factory('Group',['$resource',
    function($resource){
        return $resource('/api/groups/:Id/', {Id:'@id'});
}]);
studServices.factory('Student',
    function($resource){
        return $resource('/api/students/:Id/', {Id:'@id'});
    }
);

studServices.factory('Auth', function($http){
   return {
       load: function() {
           return $http.get('/api/')
       }
   }
});