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
      imageUrl: function() { return this.url || ''; }
  });

  Template.ballot.helpers({
      imageScore: function() { return this.score || 0; }
  });

  //    Event Handlers
  // TODO: Voting
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Images.find().count() == 0) {
      var initial_images = [
        {
          'name' : 'Wonka',
          'url' : 'http://images.memegenerator.net/images/298x/1031.jpg'
        },
        {
          'name' : 'Success Kid',
          'url' : 'http://images.memegenerator.net/images/298x/2729805.jpg'
        },
        {
          'name' : 'Boromir',
          'url' : 'http://images.memegenerator.net/images/298x/3291562.jpg'
        },
        {
          'name' : 'First World Problems',
          'url' : 'http://images.memegenerator.net/images/298x/2055789.jpg'
        },
        {
          'name' : 'Philosoraptor',
          'url' : 'http://images.memegenerator.net/images/298x/984.jpg'
        }
      ];
      _.each(initial_images, function(img) {
          Images.insert(img);
      });
    }
  });
}
