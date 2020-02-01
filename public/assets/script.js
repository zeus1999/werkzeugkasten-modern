var app = angular.module("werkzeugkasten", []);


app.controller("programCtrl", function($scope, $http){

    $scope.search = "";
    $scope.$on("key", function(a, b){

        if(b == "space"){
            $scope.search += " ";
        } else if(b == "backspace"){
            let c = $scope.search.split("");
            c.pop();
            $scope.search = c.join("");
        } else if(b == "enter"){

            $http({
                url: 'http://192.168.178.45:6/search',
                method: "POST",
                data: { 'message' : $scope.search }
            })
            .then(function(response) {
                $scope.result = response.data;
            }, 
            function(response) { // optional
                    // failed
            });
        

        } else {
            $scope.search += b;
        }
    });

});

app.controller("keyboard", function($scope, $rootScope){

    $scope.keys = [
        [
            { length: 1, value: "q" },
            { length: 1, value: "w" },
            { length: 1, value: "e" },
            { length: 1, value: "r" },
            { length: 1, value: "t" },
            { length: 1, value: "z" },
            { length: 1, value: "u" },
            { length: 1, value: "i" },
            { length: 1, value: "o" },
            { length: 1, value: "p" },
            { length: 1, value: "ü" },
        ],
        [
            { length: 1, value: "a" },
            { length: 1, value: "s" },
            { length: 1, value: "d" },
            { length: 1, value: "f" },
            { length: 1, value: "g" },
            { length: 1, value: "h" },
            { length: 1, value: "j" },
            { length: 1, value: "k" },
            { length: 1, value: "l" },
            { length: 1, value: "ö" },
            { length: 1, value: "ä" },
        ],
        [
            { length: 1, value: "y" },
            { length: 1, value: "x" },
            { length: 1, value: "c" },
            { length: 1, value: "v" },
            { length: 1, value: "b" },
            { length: 1, value: "n" },
            { length: 1, value: "m" },
            { length: 3, value: "backspace" }
        ],
        [
            { length: 6, value: "space" },
            { length: 4, value: "enter" }
        ]
    ];

    $scope.click = function(a){
        $rootScope.$broadcast("key", a);
    }

})