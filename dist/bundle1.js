(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

angular.module('app', ["ui.router", "ui.bootstrap", "ncy-angular-breadcrumb"]) //ui-bootstrap is for modal window
.value('rooms', [{ roomId: 1, roomNumber: 101, type: 'Double' }, { roomId: 2, roomNumber: 102, type: 'Double' }, { roomId: 3, roomNumber: 103, type: 'Double' }, { roomId: 4, roomNumber: 104, type: 'Double' }]).factory('reservations', function (dateUtils) {
	return [{ reservationId: 1, guestName: 'Mohammad Junaid Khan', roomId: '2', from: dateUtils.addDays(-1), nights: 3 }, { reservationId: 2, guestName: 'Mohammad Junaid Khan', roomId: '3', from: dateUtils.addDays(-8), nights: 5 }, { reservationId: 3, guestName: 'Mohammad Junaid Khan', roomId: '1', from: dateUtils.addDays(3), nights: 6 }, { reservationId: 4, guestName: 'Mohammad Junaid Khan', roomId: '2', from: dateUtils.addDays(6), nights: 2 }, { reservationId: 5, guestName: 'Mohammad Junaid Khan', roomId: '3', from: dateUtils.addDays(12), nights: 1 }];
}).factory('dateUtils', function () {
	return {
		addDays: function addDays(days, date) {
			if (!date) {
				var todayTime = new Date();
				todayTime.setHours(0, 0, 0, 0);
				date = new Date(todayTime);
			}

			var newDate = new Date(date);
			newDate.setDate(date.getDate() + days);
			return newDate;
		}
	};
}).controller('BookingListCtrl', function ($scope, $rootScope, $state, dateUtils, reservations) {
	$scope.reservations = reservations;
	$scope.navDate = function () {
		$state.go('booking.day', { year: '2018', month: '1', day: '13' });
	};
}).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'views/home.html',
		ncyBreadcrumb: {
			label: 'Home'
		}
	}).state('sample', {
		url: '/sample',
		templateUrl: 'views/sample.html',
		ncyBreadcrumb: {
			label: 'Sample',
			parent: 'home'
		}
	}).state('room', {
		url: '/room',
		templateUrl: 'views/room_list.html',
		controller: 'RoomListCtrl',
		ncyBreadcrumb: {
			label: 'Rooms',
			parent: 'sample'
		}
	}).state('room.new', {
		url: '/new',
		views: {
			"@": {
				templateUrl: 'views/room_form.html',
				controller: 'RoomDetailCtrl'
			}
		},
		ncyBreadcrumb: {
			label: 'New Room'
		}
	}).state('room.detail', {
		url: '/{roomId}?from',
		views: {
			"roomcontent@room": {
				templateUrl: 'views/room_detail.html',
				controller: 'RoomDetailCtrl'
			}
		},
		ncyBreadcrumb: {
			label: 'Room {{room.roomNumber}}'
		}
	}).state('room.detail.edit', {
		url: '/edit',
		views: {
			"@": {
				templateUrl: 'views/room_form.html',
				controller: 'RoomDetailCtrl'
			}
		},
		ncyBreadcrumb: {
			label: 'Editing'
		}
	}).state('booking', {
		url: '/booking',
		templateUrl: 'views/booking_list.html',
		controller: 'BookingListCtrl',
		ncyBreadcrumb: {
			label: 'Reservations',
			parent: 'sample'
		}
	})
	/*	.state('booking.day',{
 		url:'/:year-:month-:day',
 		templateUrl : 'views/booking_day.html',
 		controller : 'BookingDayCtrl',
 		ncyBreadcrumb:{
 			label:'Reservations for {{reservationDate | date:\'mediumDate\'}}' 
 		}
 	})*/
	.state('booking.day', {
		url: '/:year-:month-:day',
		views: {
			"content@booking": {
				templateUrl: 'views/booking_day.html',
				controller: 'BookingDayCtrl'
			}
		},
		ncyBreadcrumb: {
			label: 'Reservations for {{reservationDate | date:\'mediumDate\'}}'
		}
	}).state('booking.day.detail', {
		url: '/reservationId',
		onEnter: function onEnter($stateParams, $state, $uibModal) {
			$uibModal.open({
				templateUrl: "views/booking_detail.html",
				controller: "BookingDetailCtrl"
			}).result.then(function (result) {
				return $state.go("^");
			}, function (result) {
				return result.go("^");
			});
		},
		ncyBreadcrumb: {
			skip: true
		}
	});
	$urlRouterProvider.otherwise('/home');
}]);

},{}]},{},[1])

//# sourceMappingURL=bundle1.js.map
