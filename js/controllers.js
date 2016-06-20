angular.module('app.controllers', [])
  
.controller('myMunnyCtrl', function($scope, Wallet, Transactions, Category, Utils) {
  $scope.rawWalletData = {};
  $scope.wallet = {};
  $scope.total = {
    balance: 0,
    income: 0,
    expense: 0
  };
  
  var syncWallet = Wallet.getWallet("walletidone");
  syncWallet.$bindTo($scope, "rawWalletData");
  
  syncWallet.$loaded(
    function(data) {
      $scope.loadWallet();
    },
    function(error) {
      console.error("Error:", error);
    }
  );
  
  $scope.$watch('rawWalletData', function() {
    $scope.loadWallet();
  }, true);
  
  $scope.loadWallet = function() {
    var wallet = {};
    var total = {
      balance: 0,
      income: 0,
      expense: 0
    };
    
    for (var transaction in $scope.rawWalletData) {
      var transactionData = $scope.rawWalletData[transaction];
      
      if (transactionData && transactionData.hasOwnProperty('dateTime')) {
        var date = Utils.timeToDateString(transactionData.dateTime);
        var dateId = date.replace(/[\s]/g, '');
        var amount = transactionData.amount;
        
        if (!wallet[dateId]) {
          wallet[dateId] = {
            "dateString": date,
            "dateTime": transactionData.dateTime,
            "total": 0,
            "transactions": {}
          };
        }
        
        wallet[dateId].transactions[transaction] = transactionData;
        
        if (Utils.isIncome(transactionData)) {
          wallet[dateId]["total"] += amount;
          total.balance += amount;
          total.income += amount;
        } else {
          wallet[dateId]["total"] -= amount;
          total.balance -= amount;
          total.expense += amount;
        }
      }
    }
    $scope.wallet = wallet;
    $scope.total = total;
    console.log($scope.wallet);
  }
  
  $scope.getCategoryDetail = function(category) {
    return Category.getCategoryDetail(category);
  };
  
  $scope.utils = Utils;
})
   
.controller('transactionCtrl', function($scope, Wallet, Category, $state, $stateParams, $cordovaGeolocation) {
  $scope.formData = {
    "date": new Date()
  };
  $scope.category = Category;
  $scope.category.selectedCategory = "";
  $scope.transaction = {};
  $scope.typeName = ($stateParams.type == 'income') ? 'Income' : 'Expense';
  
  $scope.$watch('category', function() {
    $scope.transaction.category = $scope.category.selectedCategory;
  }, true);
  
  var options = {timeout: 10000, enableHighAccuracy: true};
  var location = {};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
    location.latitude = position.coords.latitude;
    location.longitude = position.coords.longitude;
  });
  
  $scope.addTransaction = function(transaction) {
    if (angular.isDefined(transaction)) {
      transaction.uid = "johndoe";
      transaction.created = Date.now();
      transaction.dateTime = $scope.formData.date.getTime();
      transaction.type = $stateParams.type;
      if (transaction.saveLocation) {
        transaction.location = location;
      }
      
      Wallet.addTransaction("walletidone", transaction)
          .then(function() {
            $state.go('menu.myMunny');
            $scope.category.selectedCategory = "";
          });
    }
  };
  
  $scope.getCategoryDetail = function(category) {
    return Category.getCategoryDetail(category);
  };
})
   
.controller('editTransactionCtrl', function($scope, $stateParams, Wallet, Category, Utils) {
  $scope.typeName;
  $scope.formData = {};
  $scope.transaction = {};
  $scope.category = Category;

  var syncTransaction = Wallet.getTransaction($stateParams.walletId, $stateParams.transactionId);
  syncTransaction.$bindTo($scope, "transaction");
  
  $scope.$watch('category', function() {
    $scope.transaction.category = $scope.category.selectedCategory;
  }, true);

  syncTransaction.$loaded(
    function(data) {
      $scope.formData.date = new Date($scope.transaction.dateTime);
      $scope.typeName = ($scope.transaction.type == 'income') ? 'Edit Income' : 'Edit Expense';
      $scope.category.selectedCategory = $scope.transaction.category;
    },
    function(error) {
      console.error("Error:", error);
    }
  );
  
  $scope.getCategoryDetail = function(category) {
    return Category.getCategoryDetail(category);
  };
})
      
.controller('transactionDetailCtrl', function($scope, $stateParams, Wallet, Category, Utils) {
  $scope.transaction = {};
  $scope.category = {};
  $scope.amount = {};
  $scope.dateString;
  
  var syncTransaction = Wallet.getTransaction($stateParams.walletId, $stateParams.transactionId);
  syncTransaction.$bindTo($scope, "transaction");
  
  syncTransaction.$loaded(
    function(data) {
      $scope.category = Category.getCategoryDetail($scope.transaction.category);
      $scope.dateString = Utils.timeToDateString($scope.transaction.dateTime);
      $scope.amount.formatted = Utils.formatMoney($scope.transaction.amount);
      $scope.amount.color = Utils.isIncome(data) ? "balanced" : "assertive";
    },
    function(error) {
      console.error("Error:", error);
    }
  );
})
   
.controller('categoryCtrl', function($scope, $ionicHistory, Category) {
  $scope.categories = Category.getAllCategories();
  $scope.category = Category;
  
  $scope.selectCategory = function(category) {
    $scope.category.selectedCategory = category;
    console.log($scope.category.selectedCategory, Category.selectedCategory);
    $ionicHistory.goBack();
  }
})
   
.controller('settingsCtrl', function($scope) {

})
   
.controller('accountCtrl', function($scope) {

})
   
.controller('shareWalletCtrl', function($scope) {

})
   
.controller('aboutAppCtrl', function($scope, Team) {
  $scope.team = {};
  
  var syncObject = Team.getTeam();
  syncObject.$bindTo($scope, "team");
})
   
.controller('locationCtrl', function($scope, $stateParams, Wallet, Category, Maps, Utils) {
  $scope.transaction = {};
  
  var syncTransaction = Wallet.getTransaction($stateParams.walletId, $stateParams.transactionId);
  syncTransaction.$bindTo($scope, "transaction");
  
  syncTransaction.$loaded(
    function(data) {
      $scope.transaction.categoryName = Category.getCategoryDetail($scope.transaction.category).name;
      $scope.transaction.dateString = Utils.timeToDateString($scope.transaction.dateTime);
      Maps.loadLocation(document.getElementById("map"), $scope.transaction);
    },
    function(error) {
      console.error("Error:", error);
    }
  );
})
 