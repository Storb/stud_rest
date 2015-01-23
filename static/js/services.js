
var studServices = angular.module('studentServices', ['ngResource', 'ngRoute']);

studServices.factory('Students',
    function($resource){
        return $resource('/students/');
    }
);

studServices.factory('GroupsList',
    function($resource){
        return $resource('/groups/');
    }
);

studServices.factory('Group',['$resource',
    function($resource){
        return $resource('/groups/:Id/', {Id:'@id'});
}]);
studServices.factory('Student',
    function($resource){
        return $resource('/students/:Id/', {Id:'@id'});
    }
);








































//studServices.factory('Auth',['$http', function($http){
//   return {
//       isLogged: function(){
//           return $http.get('/api-auth/');
//       },
//       login: function(){
//           return $http.post('/api-auth/login/', inputs);
//       },
//       logout: function(){
//           return $http.delete('/api-auth/logout/', inputs);
//       }
//   }
//}]);
