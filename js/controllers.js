angular.module('app.controllers', [])
  
.controller('myMunnyCtrl', function($scope, Transactions, Category, Utils) {
  console.log(Transactions.getWallet("walletidone"));
  $scope.wallet = Transactions.getWallet("walletidone");
  
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
 