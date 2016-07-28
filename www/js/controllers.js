var payUrl = 'http://10.68.19.111:8080/pay/unionpay/front/consume?merId=777290058110048';

function getItems () {
  var items = [];
  for (var x = 1; x < 100; x++) {
    items.push({title: 'This is item number ' + x + ' which is an ' + (x % 2 === 0 ? 'EVEN' : 'ODD') + ' number.'});
  }
  return items;
}

angular.module('starter.controllers', []).controller('HomeCtrl', function ($scope, cyOpenWindow, $state) {
  $scope.amount = 10;
  $scope.orderId = 'test11015';
  $scope.accNo = '6226090000000048';

  $scope.doPay = function () {
    var params = [
      'amount=' + ($scope.amount * 100),
      'orderId=' + $scope.orderId,
      'accNo=' + $scope.accNo
    ];
    var window = cyOpenWindow.show({
      title: '银联支付',
      url: payUrl + '&' + params.join('&'),
      onmessage: function (e) {
        console.log(e.data);
        window.hide();
      }
    });
  };

  $scope.doRemoteSearch = function () {
    $state.go('search-demo-remote');
  };

  $scope.doLocalSearch = function () {
    $state.go('search-demo-local');
  };
  
  $scope.doNavbarHide = function () {
    $state.go('auto-hide-navbar');
  };

  $scope.doAlphaScroll = function () {
    $state.go('ion-alpha-scroll');
  };
}).controller('RemoteSearchCtrl', function ($scope, $ionicFilterBar) {
  var filterBarInstance;
  $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      doSearch: function (filterText) {
        $scope.searchKey = filterText;
        // ajax请求实现
      }
    });
  };

  $scope.$on('$destroy', function () {
    if (filterBarInstance) {
      filterBarInstance();
      filterBarInstance = null;
    }
  });
}).controller('LocalSearchCtrl', function ($scope, $ionicFilterBar) {
  var filterBarInstance;

  $scope.items = getItems();

  $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      localSearch: true,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      }
    });
  };

  $scope.$on('$destroy', function () {
    if (filterBarInstance) {
      filterBarInstance();
      filterBarInstance = null;
    }
  });
}).controller('AutoHideNavbarCtrl', function ($scope) {
  $scope.items = getItems();
}).controller('IonAlphaScrollCtrl', function ($scope) {
  var getContacts = function () {
    var str = "ZABCJKLDEFGOPQRHIMNSWXY";
    var result = [];
    for (var i = 0; i < str.length; i++) {
      var nextChar = str.charAt(i);
      for (var j = 0; j < 5; j++) {
        var name = nextChar + 'name' + j;
        result.push({
          name: name,
          description: 'My name is ' + name
        });
      }
    }
    return result;
  };

  $scope.doRefresh = function () {
    $scope.contacts = getContacts();
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.doRefresh();
});