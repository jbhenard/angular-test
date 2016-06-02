var app = angular.module('news', ['ngRoute']);

// configuration du router
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'mainController',
            templateUrl: 'view/main.html'
        })
        .when('/post/:id', {
            controller: 'postController',
            templateUrl: 'view/post.html'
        })
        .when('/users', {
            controller: 'usersController',
            templateUrl: 'view/users.html'
        })
        .when('/user/:id', {
            controller: 'userController',
            templateUrl: 'view/user.html'
        })

        // dans tous les autres cas on affiche la page /
        .otherwise('/');
});

// on crée un service d'acces a l'api Web au format json
app.service('api', function($http) {

    // constante qui défini l'adresse de l'API
    var api = 'http://jsonplaceholder.typicode.com/';

    // method qui récupére le résultat de la requette http://jsonplaceholder.typicode.com/posts/
    this.getPosts = function() {
       return  $http.get(api + 'posts/');
    };

    // method qui récupére le résultat de la requette http://jsonplaceholder.typicode.com/posts/1
    this.getPost = function(id) {
        return  $http.get(api + 'posts/' + id);
    };

    // method qui récupére le résultat de la requette http://jsonplaceholder.typicode.com/users/
    this.getUsers = function() {
        return  $http.get(api + 'users/');
    };

    // method qui récupére le résultat de la requette http://jsonplaceholder.typicode.com/users/1
    this.getUser = function(id) {
        return  $http.get(api + 'users/' + id);
    };
});

app.controller('mainController', function($scope, api) {
    // on appelle la method getPost du service api précédament crée
    api.getPosts().then(
        function (response){ // success
            // envois le résulat dans la vue
            $scope.posts = response.data;
        },
        function () {// error
            alert('erreur');
        }
    );
});

app.controller('usersController', function($scope, api) {
    api.getUsers().then(
        function (response){ // success
            $scope.users = response.data;
        },
        function () { // error
            alert('erreur');
        }
    );
});

app.controller('userController', function($scope, $routeParams, api) {
    api.getUser($routeParams.id).then(
        function (response){ // success
            $scope.user = response.data;
        },
        function () { // error
            alert('erreur');
        }
    );
});

app.controller('postController', function($scope, api, $routeParams) {
    // on récupére le post par l'id
    api.getPost($routeParams.id).then(

        // si on a un resultat
        function (responsePost){

            // on stocke le résulat dans la vue
            $scope.post = responsePost.data;

            // on récupére les données de l'utilisateur par l'userId contenue dans le post
            api.getUser($scope.post.userId).then(

                // si ça a foncitonné
                function (responseUser) {
                    // on ajoute le contenue des informations de l'utilisateur dans le post
                    $scope.post.user = responseUser.data;
                },
                function () { // error
                    alert('erreur sur la récup de l\'utilisateur');
                }
            );
        },
        function () { // error
            alert('erreur');
        }
    );
});
