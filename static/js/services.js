
var studServices = angular.module('studentServices', ['ngResource', 'ngRoute']);

studServices.factory('Students',
    function($resource){
        return $resource('/students/' ,
            {
                'add': { method: 'POST', params: { add: true }}
            });
    }
);

studServices.factory('GroupsList',
    function($resource){
        return $resource('/groups/');
    }
);

studServices.factory('Group',
    function($resource){
        return $resource('/groups/:Id/', null);
});
studServices.factory('Student',
    function($resource){
        return $resource('/students/:Id/', null,
            {
                'update': { method:'PUT' }
            });
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
