const testData = {
  users: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    lockedOut: {
      username: 'locked_out_user',
      password: 'secret_sauce'
    },
    problem: {
      username: 'problem_user',
      password: 'secret_sauce'
    },
    performance: {
      username: 'performance_glitch_user',
      password: 'secret_sauce'
    }
  },
  
  products: {
    backpack: {
      name: 'Sauce Labs Backpack',
      price: '$29.99',
      dataTest: 'sauce-labs-backpack'
    },
    bikeLight: {
      name: 'Sauce Labs Bike Light',
      price: '$9.99',
      dataTest: 'sauce-labs-bike-light'
    },
    boltTShirt: {
      name: 'Sauce Labs Bolt T-Shirt',
      price: '$15.99',
      dataTest: 'sauce-labs-bolt-t-shirt'
    },
    fleeceJacket: {
      name: 'Sauce Labs Fleece Jacket',
      price: '$49.99',
      dataTest: 'sauce-labs-fleece-jacket'
    },
    onesie: {
      name: 'Sauce Labs Onesie',
      price: '$7.99',
      dataTest: 'sauce-labs-onesie'
    },
    tShirtRed: {
      name: 'Test.allTheThings() T-Shirt (Red)',
      price: '$15.99',
      dataTest: 'test.allthethings()-t-shirt-(red)'
    }
  },

  productList: [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt',
    'sauce-labs-fleece-jacket',
    'sauce-labs-onesie',
    'test.allthethings()-t-shirt-(red)'
  ],

  urls: {
    login: '/',
    inventory: '/inventory.html',
    cart: '/cart.html'
  }
};

module.exports = testData;