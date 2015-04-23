// Common code between client and server
Images = new Mongo.Collection("images");

if (Meteor.isClient) {
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
      imageScore: function() { return this.score || 0; }
  });

  // Renderer
  Template.ballot.onRendered(function() {
    console.log('ballot: ',this);
  });

  // Event Handlers
  Template.ballot.events({
    'click .upvote': function(event, template) {
      Images.update(this._id, {'$inc': {'score': 1}});
      Session.set("numVotes", Session.get("numVotes") + 1);
    }
  });
  Template.ballot.events({
    'click .downvote': function(event, template) {
      Images.update(this._id, {'$inc': {'score': -1}});
      Session.set("numVotes", Session.get("numVotes") + 1);
    }
  });
  //*************************************//


  //*******  MEME  TEMPLATE ********//
  // Renderer
  Template.meme.onRendered(function() {
    console.log('meme: ',this);
  });
  //*************************************//
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
