'use strict';

/**
 * @ngdoc service
 * @name angularJsexamApp.sessionService
 * @description
 * # sessionService
 * Service in the angularJsexamApp.
 */
  //Data 는 기존에 통신기능 작성할 때 만든 팩토리
 //sesstionInfo에 있는 함수도 하용
angular.module('angularJsexamApp')
  .service('sessionService', 
  	[ 'Data','sessionInfo',  function (Data, sessionInfo) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.login = function(params, callback) {
    	var dataPromise = Data.setData(
    		'http://172.16.2.8:52273/user/login',
    		'&user_id='+params.user_id+"&password="+params.password);
    	dataPromise.then(function(result) {
    		if (result.data.result == true) {
    			    			//JSON객체를 문자열 -> 객체로 한번 더 전환하는 이유: function의 인자로 넘어온 result와 다른 객체를 생성
    			//인자로 넘어온 result가 readOnly인 경우등에 쉽게 객체를 재생성
    			result = JSON.stringify(result);
    			result = JSON.parse(result);
    			result.data.user_id = params.user_id;
    			sessionInfo.reset();
    			sessionInfo.setUserInfo(result);
    			callback(result);
    		} else {
    			window.alert('로그인 실패');
    		}
    	}, function(reason) {}, function(update) {});
    }
  }]);