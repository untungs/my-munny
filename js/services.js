angular.module('app.services', [])

.factory('Transactions', function(WALLETS) {
  var Transactions = {
    getWallet: function(walletid) {
      return WALLETS[walletid];
    }
  };
  
  return Transactions;
})

.factory('Wallet', function($firebaseObject) {
  
  var Wallet = {
    getWallet: function(walletId) {
      var ref = firebase.database().ref('wallets/' + walletId);
      return $firebaseObject(ref);
    }
  };
  
  return Wallet;
})

.factory('Category', function(CATEGORY) {
  var Category = {
    getCategory: function(category) {
      return CATEGORY[category];
    }
  };
  
  return Category;
})

.factory('Utils', function() {
  var Utils = {
    formatMoney: function(amount) {
      return "Rp " + Math.abs(amount).toLocaleString('id-ID');
    },
    isIncome: function(transaction) {
      if (transaction.type) {
        return transaction.type === "income";
      } else {
        return transaction.amount >= 0;
      }
    },
    isExpense: function(transaction) {
      if (transaction.type) {
        return transaction.type === "expense";
      } else {
        return transaction.amount < 0;
      }
    }
  };
  
  return Utils;
})

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

