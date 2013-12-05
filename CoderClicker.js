

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  Template.hello.greeting = function () {
    return "World of the Mysterious Beasts";
  };


  Template.hello.items = function () {
    return [{name:"Sprite", cost:500},{name:"HouseElf", cost:2500},{name:"Yahoo", cost:8000},{name:"Dryad", cost:20000},{name:"Leprechaun", cost:50000},{name:"Fairy", cost:100000},{name:"Vampire", cost:500000},{name:"Werewolf", cost:750000},{name:"Wizard", cost:1000000},{name:"Alchemist", cost:25000000},{name:"Dragon", cost:100000000},{name:"Grawp", cost:250000000},{name:"Unicorn", cost:700000000},{name:"Palace", cost:10000000000},{name:"Empire", cost:100000000000}];
  };

  Meteor.subscribe('userData');
  Template.hello.user = function () {
    return Meteor.user();
  }

  Template.hello.events({
    'click input.code':function () {
      Meteor.call('click')
    }
  });
    
  Template.hello.events({  
    'click input.buy': function (event) {
      Meteor.call('buy', event.target.id);
    }
  });

  Template.hello.players = function () {
    return Meteor.users.find({}, {sort: {'money': -1}});
  };
}

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    user.money = 0;
    user.rate = 0;
    return user;
  })

  Meteor.startup(function () {
    Meteor.setInterval(function() {
      Meteor.users.find({}).map(function(user) {
        Meteor.users.update({_id: user._id}, {$inc: {'money': user.rate}})
      });
    }, 1000)
  });

Meteor.publish("userData", function() {
  return Meteor.users.find({}, {sort:{'money': -1}})
});
}

Meteor.methods({
  click: function () {
    Meteor.users.update({_id: this.userId}, {$inc: {'money': 25}});
  },
  buy: function(amount) {
    if(Meteor.user() .money >= amount && amount > 0)
      Meteor.users.update({_id: this.userId}, {$inc:{'rate': (Math.floor(amount/500)), 'money': (0-amount)}});
  },
})

