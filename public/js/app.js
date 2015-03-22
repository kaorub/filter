(function() {
	'use strict';
	// TODO service

	angular.module('app', [])
	.service('getData', ['$http', function($http) {
		$http.get('/public/ajax/main.json')
		.success(function(data) {
			$scope.rows = data;
			return;
		})
		.error(function(data, status, headers, config) {
			return false;
		})
	}])
	.filter('offset', function() {
	  return function(input, start) {
	    start = parseInt(start, 10);
	    return input.slice(start);
	  };
	})
	.controller("PaginationCtrl", function($scope, $http, $filter) {
		$scope.rowsPerPage = 10;
		$scope.currentPage = 0;
		$scope.gap = 5;
		$scope.rows = [];
		$scope.path = [];
		$scope.resultList = {};
// setGraph methods
		$scope.setPath = function(point) {
			if (point) this.path.push(point);
			$scope.displayedRows = $scope.filteredRows;
		}	
		$scope.showPath = function() {
			console.log("it works");
			$filter('filter')($scope.displayedRows);
		}
		$http({method: 'GET', url: '/public/ajax/main.json'})
		.success(function(data) {
			$scope.rows = data;
		});
// Pagination methods
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
	        
	        var start = $scope.gap * Math.floor10($scope.currentPage/$scope.gap, 0);
	        if (start > $scope.rows.length - $scope.gap) {
	            start = $scope.rows.length - $scope.gap;
	        }
	        for (var i = start; i < $scope.gap + start; i++) {
	            ret.push(i);
	        }        
	        return ret;
    	};
// End Pagination methods

	})
	// .directive('searchGraph', function() {
	// 	return {
	// 		// restrict: 'E',
	// 		// require: 'ngModel',
	// 		link: function(scope, elem, attr, ctrl) {
	// 			scope.$watch(attr.searchGraph, function(value) {
	// 				elem.html(value)
	// 				// angular.forEach()
	// 				// return value;
	// 			});
	// 			// ctrl.$parsers.unshift(function() {

	// 			// })
	// 		}
	// 		// compile: function(temlateElement, templateAttrs) {
	// 		// 	templateElement.append('<div>{{' + templateAttrs.)
	// 		// }
	// 	}
	// })
})()