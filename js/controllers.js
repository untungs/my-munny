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
      $scope.loadWallet({ year: 'numeric', month: 'long', day: 'numeric' });
    },
    function(error) {
      console.error("Error:", error);
    }
  );
  
  $scope.$watch('rawWalletData', function() {
    $scope.loadWallet({ year: 'numeric', month: 'long', day: 'numeric' });
  }, true);
  
  $scope.loadWallet = function(dateOption) {
    var wallet = {};
    var total = {
      balance: 0,
      income: 0,
      expense: 0
    };
    
    for (var transaction in $scope.rawWalletData) {
      var transactionData = $scope.rawWalletData[transaction];
      
      if (transactionData && transactionData.hasOwnProperty('timestamp')) {
        var date = new Date(transactionData.timestamp).toLocaleDateString('id-ID', dateOption);
        var dateId = date.replace(/[\s]/g, '');
        var amount = transactionData.amount;
        
        if (!wallet[dateId]) {
          wallet[dateId] = {
            "dateString": date,
            "total": 0,
            "transactions": {}
          };
        }
        
        wallet[dateId].transactions[transaction] = transactionData;
        wallet[dateId]["total"] += amount;
        total.balance += amount;
        total.income += (amount > 0) ? amount : 0;
        total.expense += (amount < 0) ? -amount : 0;
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
   
.controller('transactionCtrl', function($scope, Wallet, Category, $state) {
  $scope.category = Category;
  $scope.transaction = {};
  
  $scope.$watch('category', function() {
    $scope.transaction.category = $scope.category.selectedCategory;
  }, true);
  
  $scope.addTransaction = function(transaction) {
    if (angular.isDefined(transaction)) {
      transaction.uid = "johndoe";
      transaction.timestamp = Date.now();
      
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
   
.controller('editTransactionCtrl', function($scope) {

})
      
.controller('transactionDetailCtrl', function($scope, Category) {
  
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
   
.controller('locationCtrl', function($scope) {

})
 