FollowerTopics = new Mongo.Collection("followerTopics");

FollowerTopics.attachSchema(new SimpleSchema({
  topicOwnerId:{
    type: String
  },
  topicFollowerId: {
    type: String
  },
  topics: {
    type: [String]
  }
}));