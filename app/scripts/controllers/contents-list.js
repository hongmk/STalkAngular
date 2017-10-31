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
  	"Data", "$scope", "$state",
  	function (Data, $scope, $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //페이지가 로딩되었을 때 호출
    $scope.$on('$viewContentLoaded', function() {
    	$scope.requestContentsList();
    });
    $scope.contentsList = [];
    $scope.requestContentsList = function() {
        var dataPromise = Data.getData(
         //'http://192.168.0.4:52273/user');
    	// var dataPromise = Data.getData(
    	 	'http://192.168.0.4:52275/contents/list/'+1);
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

    // $scope.id =0;
    // $scope.name = "";
    // $scope.age =0;
     $scope.contentInfo={};

    // 통신으로 읽어올 글정보를 테스트용으로 1건 하드코딩함
    // $scope.nicname="Nicname"
    // $scope.timestamp = "24:11:22"
    // $scope.title="Content Title 테스트용"
    // $scope.content ="테스트용으로 content를 하트코딩함. 실제로는 JSON배열로 받아 contents-list.html 에서 ..."; 
    // $scope.likeCnt = 5;
    // $scope.commentCnt= 6;

    $scope.getUserInfo = function(id) {
    	var dataPromise = Data.getData(
    		'http://192.168.0.4:52273/user/'+id);
    	// 폰에서 와이파이로 접근하려면 IP로 열어줘야함
    	// var dataPromise = Data.getData(
    	// 	'http://172.16.2.8:52273/user');
    	dataPromise.then(function(results) {
    		$scope.userinfo = results.data;
    		//window.alert("SUCCESS getUserInfo"+id+JSON.stringify($scope.userinfo));
    	},function(reason){},function(update){});
    }

    $scope.getContent = function(row_id) {
        window.alert("GET USER CONTENT ID="+row_id);
                var dataPromise = Data.getData(
            'http://192.168.0.4:52275/contents/content/'+row_id);
        // 폰에서 와이파이로 접근하려면 IP로 열어줘야함
        // var dataPromise = Data.getData(
        //  'http://172.16.2.8:52273/user');
        dataPromise.then(function(results) {
            $scope.contentInfo = results.data;

            window.alert(JSON.stringify($scope.contentInfo));
        },function(reason){},function(update){});
    }


  }]);