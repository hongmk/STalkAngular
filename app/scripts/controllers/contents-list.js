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
    $scope.restfulURL = 'http://192.168.0.4:52275';
    $scope.angularURL = 'http://192.168.0.4:9000';
    $scope.board_id=0;
    //페이지가 로딩되었을 때 호출
    $scope.$on('$viewContentLoaded', function() {
        $scope.board_id = $location.search().board_id;
        var board_id = $location.search().board_id;
        if(board_id !=undefined) {
            window.alert(board_id);
    	   $scope.requestContentsList(board_id);
        }
    });
    $scope.contentsList = [];
    $scope.requestContentsList = function(board_id) {
        var dataPromise = Data.getData(
         //'http://192.168.0.4:52273/user');
    	// var dataPromise = Data.getData(
    	 	$scope.restfulURL+'/contents/list/'+board_id);
    	// 폰에서 와이파이로 접근하려면 IP로 열어줘야함
    	// var dataPromise = Data.getData(
    	// 	'http://172.16.2.8:52273/user');
    	dataPromise.then(function(results) {
            window.alert(JSON.stringify(results.data));
    		$scope.contentsList= results.data;
            for (var i = 0; i < $scope.contentsList.length; i++) {
                var obj = $scope.contentsList[i].last_modify_date.replace("T", " ");
                $scope.contentsList[i].last_modify_date 
                        = obj.replace(".000Z", "");
            }
    	}, function(reason){},function(update){});
    }

    $scope.deleteUserInfo = function(id) {
    	var dataPromise = Data.deleteData(
    		$scope.restfulURL+'/user/'+id, '');

    	dataPromise.then(function(results) {
    		$scope.requestUserList();
    	}, function(reason){}, function(update){});
    }

    $scope.modifyUserInfo = function(id,name,age) {
    	var dataPromise = Data.modifyData(
    		$scope.restfulURL+'/user/'+id, '&name='+name+'&age='+age);

    	dataPromise.then(function(results) {
    		$scope.requestUserList();
    	}, function(reason){}, function(update){});
    }

    $scope.plusLikeCnt = function(row_id) {
         window.alert(JSON.stringify(row_id));
         var dataPromise = Data.modifyData(
            $scope.restfulURL+'/contents/content/like/'+row_id,'');

        dataPromise.then(function(results) {
            $scope.requestContentsList($scope.board_id);
        }, function(reason){}, function(update){});
    }




  }]);