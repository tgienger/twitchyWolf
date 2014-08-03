(function(){function len(obj){if(obj instanceof Array||typeof obj==="string")return obj.length;else{var count=0;for(var i in obj){if(obj.hasOwnProperty(i))count++}return count}}function _$rapyd$_print(){var args,output;args=[].slice.call(arguments,0);output=JSON.stringify(args);if("console"in window)console.log(output.substr(1,output.length-2))}var myApp;"use strict";myApp=angular.module("twitchyApp",["ui.router","ui.bootstrap","angularjs.media.directives"]).config(function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/");$stateProvider.state("main",{url:"/",templateUrl:"app/partials/main.html",controller:"MainCtrl"}).state("stream",{url:"/stream",templateUrl:"app/partials/directives/stream.html",controller:"StreamCtrl"}).state("mychat",{url:"/mychat",templateUrl:"app/partials/directives/chat.html",controller:"ChatCtrl"})}).controller("StreamCtrl",function($scope,$http,$rootScope){$scope.l=""}).controller("MainCtrl",function($scope,$http,$rootScope,$window,$timeout){var url,clientId,defaultAccount;url="https://api.twitch.tv/kraken/";clientId="jmauht7mi0ud0hptf0l8060uqe41ybw";$scope.channel={};$scope.channelStarted=false;$scope.chatStarted=false;$scope.loadingStreams=false;$scope.searchCollapsed=true;$scope.userChannel=[];$scope.stream={};$scope.stream.width=620;$scope.stream.height=378;defaultAccount={name:"Twitch Account"};$scope.user=defaultAccount;Twitch.init({clientId:clientId},function(error,status){if(error){_$rapyd$_print(error)}if(status.authenticated){$(".twitch-connect").hide();$(".twitch-logout").show();$rootScope.token=status.token}else{$(".twitch-logout").hide()}});Twitch.api({method:"user"},function(error,user){$scope.$apply(function(){$scope.user=user})});function bringFront(elem,stack){var group,min;group=$(stack);if(len(group)<1){return}min=parseInt(group[0].style.zIndex,10)||0;$(group).each(function(i){this.style.zIndex=min+1});if(elem===undefined){return}$(elem).css({"zIndex":min+len(group)})}$scope.openMyChat=function(){var chatPopup;if($scope.user.display_name===undefined){alert("You must log in")}else{window.user=$scope.user;chatPopup=$window.open("#/mychat",$scope.user.name,"height=500, width=350")}};$scope.miniMize=function(){if($scope.streams){$scope.streams={};$scope.stream.search=""}};$(".draggable").draggable({handle:".handle",stack:".windows",snap:true,containment:"document",iframeFix:true,opacity:.7,snapTolerance:10,snapMode:"outer"}).click(function(){bringFront($(this),".windows")}).css("position","absolute");$(".resizable").resizable();$scope.currentStream={};function startStream(){var streamPopup;window.channelName=$scope.currentStream.channel.display_name;streamPopup=$window.open("#/stream","","height=378, width=620")}$scope.playVideo=function(stream){$scope.currentStream=stream;startStream(stream)};$scope.queryStreams=function(stream){if(stream.search===""){$scope.streams={}}else{$scope.loadingStreams=true;$http.jsonp(url+"search/streams?callback=JSON_CALLBACK",{params:{q:stream.search,type:"suggest"}}).success(function(res){var stream;var _$rapyd$_Iter69=res.streams;for(var _$rapyd$_Index69=0;_$rapyd$_Index69<_$rapyd$_Iter69.length;_$rapyd$_Index69++){stream=_$rapyd$_Iter69[_$rapyd$_Index69];_$rapyd$_print(stream.preview.medium);stream.preview.template=stream.preview.template.replace("{width}",200);stream.preview.template=stream.preview.template.replace("{height}",125)}$scope.streams=res.streams;$scope.loadingStreams=false})}};$scope.queryChannel=function(channel){$http.jsonp(url+"streams/"+channel.name.toLowerCase()+"?callback=JSON_CALLBACK&client_id="+$scope.clientId).success(function(res){$scope.channelInfo=res})};$scope.logout=function(){$scope.chatStarted=false;Twitch.logout(function(error){if(error){_$rapyd$_print(error)}$scope.user=defaultAccount;$(".twitch-connect").show();$(".twitch-logout").hide()})}}).controller("StreamCtrl",function($scope,$http,$rootScope){$scope.channelName=window.opener.channelName;$scope.stream={width:620,height:378}}).controller("ChatCtrl",function($scope,$http){$scope.user=window.opener.user})})();