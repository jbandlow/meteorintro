// Common code between client and server
Images = new Mongo.Collection("images");

// When called, Meteor methods run on BOTH the client and the server.
Meteor.methods({
  addStar: function(memeId) {
    Meteor.users.update(
      {'_id': Meteor.userId()},
      {'$set': {'profile.starred': memeId}}
    );
  },
  removeStar: function(memeId) {
    Meteor.users.update(
      {'_id': Meteor.userId()},
      {'$unset': 'profile.starred'}
    );
  },
  upvoteImage: function(imageId) {
    if (Meteor.userId()) {
      Images.update(imageId, {'$inc': {'score': 1}});
      if (Meteor.isClient) {
        Session.set("numVotes", Session.get("numVotes") + 1);
      }
    }
  },
  downvoteImage: function(imageId) {
    if (Meteor.userId()) {
      Images.update(imageId, {'$inc': {'score': -1}});
      if (Meteor.isClient) {
        Session.set("numVotes", Session.get("numVotes") + 1);
      }
    }
  }
});


if (Meteor.isClient) {
  // Session variables maintain state within a browser tab.
  Session.set("numVotes", 0);

  //********   HEADER TEMPLATE  ********//
  Template.header.helpers({
    numVotes: function() {
      return Session.get("numVotes");
    }
  });
  //*************************************//


  //********* LEADERBOARD  TEMPLATE  ********//
  // Helpers
  Template.leaderboard.helpers({
      images: function() {
          return Images.find({}, { sort: {score: -1, name: 1} });
      }
  });
  //*************************************//


  //*********  BALLOT TEMPLATE  ********//
  // Helpers
  Template.ballot.helpers({
      imageUrl: function() { return this.url || ''; },
      imageScore: function() { return this.score || 0; },
      starChoice: function() {
        return this._id === Meteor.user().profile.starred ? 'fullstar' : 'emptystar';
      }
  });

  // Renderer
  Template.ballot.onRendered(function() {
    // Console.log on rendered is a good way to see the data context.
    console.log('ballot: ',this);
  });

  // Event Handlers
  Template.ballot.events({
    'click .upvote': function() {
      Meteor.call('upvoteImage', this._id);
    },
    'click .downvote': function() {
      Meteor.call('downvoteImage', this._id);
    },
    'click .star': function() {
      var memeId = this._id;
      if (_.contains(Meteor.user().profile.starred, memeId)) {
        Meteor.call('removeStar', memeId);
      } else {
        Meteor.call('addStar', memeId);
      }
    }
  });
  //*************************************//

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    Images.remove({});
    var initial_images = [
      {
        'name' : '05-Success Kid',
        'url' : 'http://images.memegenerator.net/images/298x/1031.jpg',
        'toptext': 'Successful demo',
        'bottomtext': 'Meteor FTW',
        'score': 0
      },
      {
        'name' : '04-Wonka',
        'url' : 'http://images.memegenerator.net/images/298x/2729805.jpg',
        'toptext': 'Meteor can do that?',
        'bottomtext': 'Tell me more',
        'score': 0
      },
      {
        'name' : '02-Boromir',
        'url' : 'http://images.memegenerator.net/images/298x/3291562.jpg',
        'toptext': 'One does not simply',
        'bottomtext': 'build reactive webapps',
        'score': 0
      },
      {
        'name' : '01-First World Problems',
        'url' : 'http://images.memegenerator.net/images/298x/2055789.jpg',
        'toptext': "I can't keep my DB",
        'bottomtext': "synced with all clients",
        'score': 0
      },
      {
        'name' : '03-Philosoraptor',
        'url' : 'http://images.memegenerator.net/images/298x/984.jpg',
        'toptext': "What if client code",
        'bottomtext': "was server code?",
        'score': 0
      }
    ];
    if (Images.find().count() == 0) {
      _.each(initial_images, function(img) {
          Images.insert(img);
      });
    }
  });
}
