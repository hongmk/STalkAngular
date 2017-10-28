'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the angularJsexamApp
 */
angular.module('angularJsexamApp')
  .controller('UserListCtrl', [
  	"Data", "$scope", "$state", 
  	function (Data, $scope, $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //페이지가 로딩되었을 때 호출
    $scope.$on('$viewContentLoaded', function() {
    	$scope.requestUserList();
    });
    $scope.userList = [];
    $scope.requestUserList = function() {
    	var dataPromise = Data.getData(
    		'http://172.16.2.8:52273/user');
    	// 폰에서 와이파이로 접근하려면 IP로 열어줘야함
    	// var dataPromise = Data.getData(
    	// 	'http://172.16.2.8:52273/user');
    	dataPromise.then(function(results) {
    		$scope.userList = results.data;
    	},function(reason){},function(update){});
    }

    $scope.deleteUserInfo = function(id) {
    	var dataPromise = Data.deleteData(
    		'http://172.16.2.8:52273/user/'+id, '');

    	dataPromise.then(function(results) {
    		$scope.requestUserList();
    	}, function(reason){}, function(update){})
    }

        $scope.modifyUserInfo = function(id,name,age) {
    	var dataPromise = Data.modifyData(
    		'http://172.16.2.8:52273/user/'+id, '&name='+name+'&age='+age);

    	dataPromise.then(function(results) {
    		$scope.requestUserList();
    	}, function(reason){}, function(update){})
    }

    $scope.id =0;
    $scope.name = "";
    $scope.age =0;
    $scope.userinfo={};

    $scope.getUserInfo = function(id) {
    	var dataPromise = Data.getData(
    		'http://172.16.2.8:52273/user/'+id);
    	// 폰에서 와이파이로 접근하려면 IP로 열어줘야함
    	// var dataPromise = Data.getData(
    	// 	'http://172.16.2.8:52273/user');
    	dataPromise.then(function(results) {
    		$scope.userinfo = results.data;
    		//window.alert("SUCCESS getUserInfo"+id+JSON.stringify($scope.userinfo));
    	},function(reason){},function(update){});
    }
  }]);