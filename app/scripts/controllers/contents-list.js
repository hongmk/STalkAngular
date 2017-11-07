'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the angularJsexamApp
 */

angular.module('angularJsexamApp')
  .controller('ContentsListCtrl', [
  	"Data", "$scope", "$state", "$location",
  	function (Data, $scope, $state, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //페이지가 로딩되었을 때 호출
    $scope.$on('$viewContentLoaded', function() {
        var board_id = $location.search().board_id;
        if(board_id !=undefined) {
            window.alert(board_id)
    	   $scope.requestContentsList(board_id);
        }
    });
    $scope.contentsList = [];
    $scope.requestContentsList = function(board_id) {
        var dataPromise = Data.getData(
         //'http://192.168.0.4:52273/user');
    	// var dataPromise = Data.getData(
    	 	'http://192.168.0.4:52275/contents/list/'+board_id);
    	// 폰에서 와이파이로 접근하려면 IP로 열어줘야함
    	// var dataPromise = Data.getData(
    	// 	'http://172.16.2.8:52273/user');
    	dataPromise.then(function(results) {
            window.alert(JSON.stringify(results.data));
    		$scope.contentsList= results.data;
    	}, function(reason){},function(update){});
    }

    $scope.deleteUserInfo = function(id) {
    	var dataPromise = Data.deleteData(
    		'http://192.168.0.4:52273/user/'+id, '');

    	dataPromise.then(function(results) {
    		$scope.requestUserList();
    	}, function(reason){}, function(update){});
    }

    $scope.modifyUserInfo = function(id,name,age) {
    	var dataPromise = Data.modifyData(
    		'http://192.168.0.4:52273/user/'+id, '&name='+name+'&age='+age);

    	dataPromise.then(function(results) {
    		$scope.requestUserList();
    	}, function(reason){}, function(update){});
    }

    $scope.goContent = function(row_id) {
        window.alert("GO CONTENT ID="+row_id);
        $state.go('contents-content', {row_id:row_id});
    }


  }]);