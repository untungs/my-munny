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
      'side-menu21': {
        templateUrl: 'templates/myMunny.html',
        controller: 'myMunnyCtrl'
      }
    }
  })

  .state('menu.income', {
    url: '/income',
    views: {
      'side-menu21': {
        templateUrl: 'templates/income.html',
        controller: 'incomeCtrl'
      }
    }
  })

  .state('menu.expense', {
    url: '/expense',
    views: {
      'side-menu21': {
        templateUrl: 'templates/expense.html',
        controller: 'expenseCtrl'
      }
    }
  })

  .state('menu.editTransaction', {
    url: '/edit',
    views: {
      'side-menu21': {
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
      'side-menu21': {
        templateUrl: 'templates/transactionDetail.html',
        controller: 'transactionDetailCtrl'
      }
    }
  })

  .state('menu.category', {
    url: '/category',
    views: {
      'side-menu21': {
        templateUrl: 'templates/category.html',
        controller: 'categoryCtrl'
      }
    }
  })

  .state('menu.settings', {
    url: '/settings',
    views: {
      'side-menu21': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('menu.account', {
    url: '/account',
    views: {
      'side-menu21': {
        templateUrl: 'templates/account.html',
        controller: 'accountCtrl'
      }
    }
  })

  .state('menu.shareWallet', {
    url: '/sharewallet',
    views: {
      'side-menu21': {
        templateUrl: 'templates/shareWallet.html',
        controller: 'shareWalletCtrl'
      }
    }
  })

  .state('menu.aboutApp', {
    url: '/about',
    views: {
      'side-menu21': {
        templateUrl: 'templates/aboutApp.html',
        controller: 'aboutAppCtrl'
      }
    }
  })

  .state('menu.location', {
    url: '/location',
    views: {
      'side-menu21': {
        templateUrl: 'templates/location.html',
        controller: 'locationCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/menu/main')

  

});