angular.module('app.constants', [])

.constant('WALLETS', {
  "walletidone": {
    "balance": 18000,
    "income": 100000,
    "expense": 82000,
    "days": {
      "dateone": {
        "date": "06 June 2016",
        "amount": 64000,
        "transactions": {
          "dateonetransone": {
            "type": "income",
            "uid": "johndoe",
            "date": "07 June 2016",
            "timestamp": 123456,
            "amount": 100000,
            "category": "atm",
            "note": "iubkjg skfd ireury sfdg",
            "location": "-7.12,101.15",
            "photo": "photo1.jpg"
          },
          "dateonetranstwo": {
            "type": "expense",
            "uid": "johndoe",
            "date": "07 June 2016",
            "timestamp": 123457,
            "amount": 21000,
            "category": "phonecredit",
            "note": "iubkjg skfd ireury sfdg",
            "location": "-7.12,101.15",
            "photo": "photo1.jpg"
          },
          "dateonetransthree": {
            "type": "expense",
            "uid": "johndoe",
            "date": "07 June 2016",
            "timestamp": 123458,
            "amount": 15000,
            "category": "eatingout",
            "note": "Nasi Rames",
            "location": "-7.12,101.15",
            "photo": "photo1.jpg"
          }
        }
      },
      "datetwo": {
        "date": "07 June 2016",
        "amount": -34000,
        "transactions": {
          "datetwotransone": {
            "type": "expense",
            "uid": "johndoe",
            "date": "07 June 2016",
            "timestamp": 123456,
            "amount": 24000,
            "category": "transportation",
            "note": "",
            "location": "-7.12,101.15",
            "photo": ""
          },
          "datetwotranstwo": {
            "type": "expense",
            "uid": "johndoe",
            "date": "07 June 2016",
            "timestamp": 123457,
            "amount": 10000,
            "category": "eatingout",
            "note": "Nasi Padang",
            "location": "-7.12,101.15",
            "photo": "photo2.jpg"
          }
        }
      },
      "datethree": {
        "date": "08 June 2016",
        "amount": -12000,
        "transactions": {
          "datetwotransone": {
            "type": "expense",
            "uid": "johndoe",
            "date": "08 June 2016",
            "timestamp": 123456,
            "amount": 12000,
            "category": "laundry",
            "note": "",
            "location": "-7.12,101.15",
            "photo": ""
          }
        }
      }
    }
  }
})

.constant('CATEGORY', {
  "eatingout": {
    "name": "Eating out",
    "type": "expense",
    "icon": "ion-spoon"
  },
  "transportation": {
    "name": "Transportation",
    "type": "expense",
    "icon": "ion-android-bus"
  },
  "fuel": {
    "name": "Fuel",
    "type": "expense",
    "icon": "ion-model-s"
  },
  "phonecredit": {
    "name": "Phone Credit",
    "type": "expense",
    "icon": "ion-iphone"
  },
  "laundry": {
    "name": "Laundry",
    "type": "expense",
    "icon": "ion-tshirt"
  },
  "movie": {
    "name": "Movie",
    "type": "expense",
    "icon": "ion-android-film"
  },
  "atm": {
    "name": "ATM",
    "type": "income",
    "icon": "ion-cash"
  },
})