angular.module('app')
.controller('BookingListCtrl',function($scope,$rootScope,$state,dateUtils,reservations){
	$scope.reservations=reservations;
	$scope.navDate=function(){
		$state.go('booking.day',{year:'2018',month:'1',day:'13'});
	}
	
	 $scope.$watch('reservationDate', function(newValue, oldValue) {
	        $scope.dpModel = $rootScope.reservationDate;
	    });


	    $scope.$watch('dpModel', function(newValue, oldValue) {
	      if(newValue && !angular.equals(newValue, oldValue)) {
	        $state.go('booking.day', {year: newValue.getFullYear(), month: newValue.getMonth() + 1, day: newValue.getDate()});
	      }
	    });

	    $scope.between = function(date) {
	      return _.filter($scope.reservations, function(reservation) {
	        var from = reservation.from;
	        var to = dateUtils.addDays(reservation.nights, reservation.from);
	        return from <= date && date < to;
	      });
	    };
})