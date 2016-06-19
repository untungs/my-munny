angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.myMunny', {
    url: '/main',
    views: {
      'view-content': {
        templateUrl: 'templates/myMunny.html',
        controller: 'myMunnyCtrl'
      }
    }
  })

  .state('menu.income', {
    url: '/income',
    views: {
      'view-content': {
        templateUrl: 'templates/income.html',
        controller: 'transactionCtrl'
      }
    },
    params: {
      type: 'income'
    }
  })

  .state('menu.expense', {
    url: '/expense',
    views: {
      'view-content': {
        templateUrl: 'templates/income.html',
        controller: 'transactionCtrl'
      }
    },
    params: {
      type: 'expense'
    }
  })

  .state('menu.editTransaction', {
    url: '/edit',
    views: {
      'view-content': {
        templateUrl: 'templates/editTransaction.html',
        controller: 'editTransactionCtrl'
      }
    }
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.transactionDetail', {
    url: '/detail',
    views: {
      'view-content': {
        templateUrl: 'templates/transactionDetail.html',
        controller: 'transactionDetailCtrl'
      }
    }
  })

  .state('menu.category', {
    url: '/category',
    views: {
      'view-content': {
        templateUrl: 'templates/category.html',
        controller: 'categoryCtrl'
      }
    }
  })

  .state('menu.settings', {
    url: '/settings',
    views: {
      'view-content': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('menu.account', {
    url: '/account',
    views: {
      'view-content': {
        templateUrl: 'templates/account.html',
        controller: 'accountCtrl'
      }
    }
  })

  .state('menu.shareWallet', {
    url: '/sharewallet',
    views: {
      'view-content': {
        templateUrl: 'templates/shareWallet.html',
        controller: 'shareWalletCtrl'
      }
    }
  })

  .state('menu.aboutApp', {
    url: '/about',
    views: {
      'view-content': {
        templateUrl: 'templates/aboutApp.html',
        controller: 'aboutAppCtrl'
      }
    }
  })

  .state('menu.location', {
    url: '/location',
    views: {
      'view-content': {
        templateUrl: 'templates/location.html',
        controller: 'locationCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/menu/main')

  

});