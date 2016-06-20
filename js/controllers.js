angular.module('app.controllers', [])
   
.controller('menuCtrl', function($scope, Config) {
  Config.getConfig().$loaded()
    .then(function(data) {
      $scope.feedbackLink = "<a class='item' href='" + data.feedbackUrl + "'>" + data.feedbackTitle + "</a>";
    })
    .catch(function(error) {
      console.log(error);
    });
})
  
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
   
.controller('transactionCtrl', function($scope, Wallet, Category, Geolocation, $state, $stateParams) {
  $scope.formData = {
    "date": new Date(),
    "saveLocation": false
  };
  $scope.category = Category;
  $scope.category.selectedCategory = "";
  $scope.transaction = {};
  $scope.typeName = ($stateParams.type == 'income') ? 'Income' : 'Expense';
  
  $scope.$watch('category', function() {
    $scope.transaction.category = $scope.category.selectedCategory;
  }, true);
  
  var location = {};
  Geolocation.getLocation().then(function(position) {
    location.latitude = position.coords.latitude;
    location.longitude = position.coords.longitude;
  });
  
  $scope.addTransaction = function(transaction) {
    if (angular.isDefined(transaction)) {
      transaction.uid = "johndoe";
      transaction.created = Date.now();
      transaction.dateTime = $scope.formData.date.getTime();
      transaction.type = $stateParams.type;
      if ($scope.formData.saveLocation) {
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
   
.controller('editTransactionCtrl', function($scope, $stateParams, Wallet, Category, Geolocation, Utils) {
  $scope.typeName;
  $scope.formData = {};
  $scope.transaction = {};
  $scope.category = Category;

  var syncTransaction = Wallet.getTransaction($stateParams.walletId, $stateParams.transactionId);
  syncTransaction.$bindTo($scope, "transaction");
  
  var location = {};
  Geolocation.getLocation().then(function(position) {
    location.latitude = position.coords.latitude;
    location.longitude = position.coords.longitude;
  });
  
  $scope.$watch('category', function() {
    $scope.transaction.category = $scope.category.selectedCategory;
  }, true);
  
  $scope.$watch('formData', function() {
    $scope.transaction.dateTime = new Date($scope.formData.date).getTime();
    $scope.transaction.location = ($scope.formData.saveLocation) ? location : {};
  }, true);

  syncTransaction.$loaded(
    function(data) {
      $scope.formData.date = new Date($scope.transaction.dateTime);
      $scope.formData.saveLocation = ($scope.transaction.location) ? true : false;
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
      
.controller('transactionDetailCtrl', function($scope, $stateParams, $ionicPopup, $ionicHistory, Wallet, Category, Utils) {
  $scope.transaction = {};
  $scope.category = {};
  $scope.amount = {};
  $scope.dateString;
  $scope.formData = {
    "dateString": "",
    "saveLocation": false
  }
  
  var syncTransaction = Wallet.getTransaction($stateParams.walletId, $stateParams.transactionId);
  syncTransaction.$bindTo($scope, "transaction");
  
  syncTransaction.$loaded(
    function(data) {
      $scope.category = Category.getCategoryDetail($scope.transaction.category);
      $scope.formData.dateString = Utils.timeToDateString($scope.transaction.dateTime);
      $scope.formData.saveLocation = ($scope.transaction.location);
      $scope.amount.formatted = Utils.formatMoney($scope.transaction.amount);
      $scope.amount.color = Utils.isIncome(data) ? "balanced" : "assertive";
    },
    function(error) {
      console.error("Error:", error);
    }
  );
  
  $scope.deleteTransaction = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Transaction',
      template: 'Are you sure you want to delete this transaction?'
    });
    
    confirmPopup.then(function(res) {
      if (res) {
        Wallet.deleteTransaction($stateParams.walletId, $stateParams.transactionId)
            .then(function(ref) {
              $ionicHistory.goBack();
            }, function(error) {
              console.log("Error:", error);
            });
      }
    });
  }
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
   
.controller('aboutAppCtrl', function($scope, Team, Config) {
  $scope.about = "<a class='item positive'><strong>My Munny</strong></a>";
  Config.getConfig().$loaded()
    .then(function(data) {
      $scope.about = "<a class='item positive' href='" + data.siteUrl + "'><strong>" + data.siteTitle + "</strong></a>";
    })
    .catch(function(error) {
      console.log(error);
    });
    
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
 