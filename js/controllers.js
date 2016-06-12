angular.module('app.controllers', [])
  
.controller('myMunnyCtrl', function($scope, Wallet, Transactions, Category, Utils) {
  // console.log(Transactions.getWallet("walletidone"));
  // $scope.wallet = Transactions.getWallet("walletidone");
  $scope.wallet = {
    balance: 0,
    income: 0,
    expense: 0
  };
  
  var syncObject = Wallet.getWallet("walletidone");
  syncObject.$bindTo($scope, "wallet");
  
  $scope.getTotalBalance = function() {
    var balance = 0;
    var days = Object.keys($scope.wallet);
    
    days.forEach(function(key) {
      balance += $scope.wallet[key].amount;
    });
    
    return balance;
  };
  
  $scope.getTotalIncome = function() {
    var balance = 0;
    var days = Object.keys($scope.wallet);
    
    days.forEach(function(key) {
      amount = $scope.wallet[key].amount;
      if (amount > 0) {
        balance += amount;
      }
    });
    
    return balance;
  };
  
  $scope.getTotalExpense = function() {
    var balance = 0;
    var days = Object.keys($scope.wallet);
    
    days.forEach(function(key) {
      amount = $scope.wallet[key].amount;
      if (amount < 0) {
        balance += Math.abs(amount);
      }
    });
    
    return balance;
  };
  
  $scope.getCategory = function(category) {
    return Category.getCategory(category);
  };
  
  $scope.utils = Utils;
})
   
.controller('incomeCtrl', function($scope) {

})
   
.controller('expenseCtrl', function($scope) {

})
   
.controller('editTransactionCtrl', function($scope) {

})
      
.controller('transactionDetailCtrl', function($scope) {

})
   
.controller('categoryCtrl', function($scope) {

})
   
.controller('settingsCtrl', function($scope) {

})
   
.controller('accountCtrl', function($scope) {

})
   
.controller('shareWalletCtrl', function($scope) {

})
   
.controller('aboutAppCtrl', function($scope) {

})
   
.controller('locationCtrl', function($scope) {

})
 