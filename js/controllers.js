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
      Wallet.addTransaction("walletidone", "datethree", transaction)
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
 