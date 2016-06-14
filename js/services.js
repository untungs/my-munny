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
  var ref = firebase.database().ref();
  
  var Wallet = {
    getWallet: function(walletId) {
      var walletRef = ref.child('wallets/' + walletId);
      return $firebaseObject(walletRef);
    },
    
    addTransaction: function(walletId, dayId, transaction) {
      var transactionRef = ref.child("wallets/" + walletId + "/days/" + dayId + "/transactions");
      var newKey = transactionRef.push().key;
      
      console.log(newKey, transaction);
      return transactionRef.child(newKey).update(transaction);
    }
  };
  
  return Wallet;
})

.factory('Category', function(CATEGORY) {
  var Category = {
    selectedCategory: "",
    getAllCategories: function() {
      return CATEGORY;
    },
    getCategoryDetail: function(category) {
      return CATEGORY[category];
    },
    getSelectedCategory: function() {
      return selectedCategory;
    },
    setSelectedCategory: function(category) {
      this.selectedCategory = category;
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

.factory('Team', function($firebaseObject) {
  var ref = firebase.database().ref();
  
  var Team = {
    getTeam: function() {
      var teamRef = ref.child('team');
      return $firebaseObject(teamRef);
    }
  };
  
  return Team;
})

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

