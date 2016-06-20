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
  var ref = firebase.database().ref("data");
  
  var Wallet = {
    getWallet: function(walletId) {
      var transactionRef = ref.child('wallet-transactions/' + walletId);
      return $firebaseObject(transactionRef);
    },
    
    addTransaction: function(walletId, transaction) {
      var transactionRef = ref.child("wallet-transactions/" + walletId);
      var newKey = transactionRef.push().key;
      
      console.log(newKey, transaction);
      return transactionRef.child(newKey).set(transaction);
    },
    
    deleteTransaction: function(walletId, transactionId) {
      var transactionRef = ref.child("wallet-transactions/" + walletId + "/" + transactionId);
      var transactionObj = $firebaseObject(transactionRef);
      
      return transactionObj.$remove();
    },
    
    getTransaction: function(walletId, transactionId) {
      var transactionRef = ref.child("wallet-transactions/" + walletId + "/" + transactionId);
      return $firebaseObject(transactionRef);
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

.factory('Geolocation', function($cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  
  var Geolocation = {
    getLocation: function() {
      return $cordovaGeolocation.getCurrentPosition(options);
    }
  };
  
  return Geolocation;
  
})

.factory('Maps', function($cordovaGeolocation) {
  var map = {}
  var latLng = {};
  
  var Maps = {
    loadLocation: function(mapElement, transaction) {
      var options = {timeout: 10000, enableHighAccuracy: true};
      latLng = new google.maps.LatLng(transaction.location.latitude, transaction.location.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
   
      map = new google.maps.Map(mapElement, mapOptions);
      
      google.maps.event.addListenerOnce(map, 'idle', function() {
        loadMarker(transaction);
      });
    }
  };
  
  var loadMarker = function(transaction) {
    var marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    var infoWindow = new google.maps.InfoWindow({
      content: transaction.categoryName + "<br>" +
        transaction.dateString + "<br>" + 
        transaction.note
    });
    
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
    });
  };
  
  return Maps;
})

.factory('Utils', function() {
  var Utils = {
    formatMoney: function(amount) {
      var formatted = (amount < 0) ? "-" : "";
      formatted += "Rp " + Math.abs(amount).toLocaleString('id-ID');
      return formatted;
    },
    isIncome: function(transaction) {
      if (transaction.type) {
        return transaction.type === "income";
      } else {
        return transaction >= 0;
      }
    },
    isExpense: function(transaction) {
      if (transaction.type) {
        return transaction.type === "expense";
      } else {
        return transaction < 0;
      }
    },
    dateFormat: { year: 'numeric', month: 'long', day: 'numeric' },
    timeToDateString: function(timestamp) {
      return new Date(timestamp).toLocaleDateString('id-ID', this.dateFormat);
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

