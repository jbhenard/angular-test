var app = angular.module('news', []);

app.controller('mainController', function($scope, $http) {
    var api = 'http://jsonplaceholder.typicode.com/';
    $http.get(api + 'posts/').then(
        function (response){ // success
            console.log(response);
            $scope.posts = response.data;
        },
        function (response){ // error
            $scope.error = 'Il y a eu une erreur!'
        }
    );
});

