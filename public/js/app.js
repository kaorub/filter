(function() {
	'use strict';
	// TODO service

	angular.module('app', [])
	.filter('offset', function() {
	  return function(input, start) {
	    start = parseInt(start, 10);
	    return input.slice(start);
	  };
	})
	.controller("PaginationCtrl", function($scope, $http) {
		$scope.rowsPerPage = 10;
		$scope.currentPage = 0;
		$scope.gap = 5;

		$http({method: 'GET', url: '/public/ajax/main.json'})
		.success(function(data) {
			$scope.rows = data;
		});

	  	$scope.prevPage = function() {
		    if ($scope.currentPage > 0) {
		    	$scope.currentPage--;
		    }
		};

		$scope.prevPageDisabled = function() {
	    	return $scope.currentPage === 0 ? "disabled" : "";
	  	};

	  	$scope.pageCount = function() {
	    	return Math.ceil($scope.rows.length/$scope.rowsPerPage)-1;
	  	};

	  	$scope.nextPage = function() {
	    	if ($scope.currentPage < $scope.pageCount()) {
	      		$scope.currentPage++;
	    	}
	  	};

	  	$scope.nextPageDisabled = function() {
	    	return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
	  	};

	  	$scope.setPage = function(number) {
	  		$scope.currentPage = number;
	  	};

	  	if (!Math.floor10) {
		    Math.floor10 = function(value, exp) {
		      return decimalAdjust('floor', value, exp);
		    };
		}

		function decimalAdjust(type, value, exp) {
		    if (typeof exp === 'undefined' || +exp === 0) {
		      return Math[type](value);
		    }
		    value = +value;
		    exp = +exp;
		    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		      return NaN;
		    }
		    value = value.toString().split('e');
		    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		    value = value.toString().split('e');
		    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
		}

	    $scope.range = function () {
	        var ret = [];
	        
	        var start = 5 * Math.floor10($scope.currentPage/5, 0);
	        console.log(start);
	        if (start > $scope.rows.length - $scope.gap) {
	            start = $scope.rows.length - $scope.gap;
	        }
	        for (var i = start; i < $scope.gap + start; i++) {
	            ret.push(i);
	        }        
	         
	        console.log(ret);        
	        return ret;
    	};

	})
})()