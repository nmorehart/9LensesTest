function DataPointsViewModel($scope, $http) {
    $scope.dataPointsM = {
        TotalDataPoints : 0
    };
    
    $scope.Load = function () {
        $http({ method: "GET", url: "/api" }).success(function (data, status, headers, config) {
            $scope.dataPointsM = data;
        });
    }
    
    $scope.Update = function () {
        $http({ method: "PUT", data: $scope.dataPointsM, url: "/api" }).success(function (data, status, headers, config) {
            socket.emit('total points', $scope.dataPointsM);
        });
    }
    
    socket.on('total points', function (data) {
        $scope.dataPointsM = data;
        $scope.$apply();
    });

    $scope.Load();
};