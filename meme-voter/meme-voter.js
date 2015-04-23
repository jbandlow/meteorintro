Images = new Mongo.Collection("images");

if (Meteor.isClient) {
  // Leaderboard Template
  //    Helpers
  Template.leaderboard.helpers({
      images: function() {
          return Images.find({}, { sort: {score: -1, name: 1} });
      }
  });

  // Ballot Template
  //    Helpers
  Template.ballot.helpers({
      imageUrl: function() { return this.url || ''; },
      imageScore: function() { return this.score || 0; }
  });

  //    Event Handlers
  Template.ballot.events({
    'click .upvote': function(event, template) {
      Images.update(this._id, {'$inc': {'score': 1}});
    }
  });
  Template.ballot.events({
    'click .downvote': function(event, template) {
      console.log(template);
      Images.update(this._id, {'$inc': {'score': -1}});
    }
  });

  Template.ballot.onRendered(function() {
    console.log('ballot: ',this);
  });

  Template.meme.onRendered(function() {
    console.log('meme: ',this);
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    Images.remove({});
    //if (Images.find().count() == 0) {
      var initial_images = [
        {
          'name' : 'Wonka',
          'url' : 'http://images.memegenerator.net/images/298x/1031.jpg',
          'score': 0
        },
        {
          'name' : 'Success Kid',
          'url' : 'http://images.memegenerator.net/images/298x/2729805.jpg',
          'score': 0
        },
        {
          'name' : 'Boromir',
          'url' : 'http://images.memegenerator.net/images/298x/3291562.jpg',
          'toptext': 'One does not simply',
          'bottomtext': 'build reactive webapps',
          'score': 0
        },
        {
          'name' : 'First World Problems',
          'url' : 'http://images.memegenerator.net/images/298x/2055789.jpg',
          'toptext': "I can't keep my server",
          'bottomtext': "in sync with my client",
          'score': 0
        },
        {
          'name' : 'Philosoraptor',
          'url' : 'http://images.memegenerator.net/images/298x/984.jpg',
          'toptext': "What if my framework",
          'bottomtext': "managed state?",
          'score': 0
        }
      ];
      _.each(initial_images, function(img) {
          Images.insert(img);
      });
    //}
  });
}
