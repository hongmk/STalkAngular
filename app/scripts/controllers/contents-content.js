'use strict';

angular.module('angularJsexamApp')
  .controller('ContentsContentCtrl', [
  	"Data", "$scope", "$state","$stateParams",
  	function (Data, $scope, $state, $stateParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //페이지가 로딩되었을 때 호출
    $scope.$on('$viewContentLoaded', function() {
        window.alert(JSON.stringify($stateParams));
    	$scope.getContent($stateParams.row_id);
    });

    $scope.content ={};
    $scope.getContent = function(row_id) {
        var dataPromise = Data.getData(
         //'http://192.168.0.4:52273/user');
    	// var dataPromise = Data.getData(
    	 	'http://172.16.2.8:52275/contents/content/'+row_id);
    	// 폰에서 와이파이로 접근하려면 IP로 열어줘야함
    	// var dataPromise = Data.getData(
    	// 	'http://172.16.2.8:52273/user');
    	dataPromise.then(function(results) {
    		$scope.content = results.data;
             window.alert(JSON.stringify($scope.content));
             window.alert(JSON.stringify($scope.content.row_id));
             $scope.getComments($scope.content.row_id);
    	}, function(reason){},function(update){});
    }

    $scope.commentsList =[{}];
    $scope.getComments = function(content_id) {
        var dataPromise = Data.getData(
            'http://172.16.2.8:52275/comments/list/'+content_id);
        dataPromise.then(function(results) {
            console.log(results.data);
            $scope.commentsList = results.data;
             window.alert(JSON.stringify($scope.commentsList));
        }, function(reason){},function(update){});        
    }


  }]);