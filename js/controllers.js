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
  
  $scope.getCategory = function(category) {
    return Category.getCategory(category);
  };
  
  $scope.utils = Utils;
})
   
.controller('transactionCtrl', function($scope, Wallet, $state) {
  $scope.addTransaction = function(transaction) {
    if (angular.isDefined(transaction)) {
      Wallet.addTransaction("walletidone", "datethree", transaction)
          .then(function() {
            $state.go('menu.myMunny');
          });
    }
  };
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
 