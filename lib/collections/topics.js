Topics = new Mongo.Collection("topics");

Topics.attachSchema(new SimpleSchema({
  name:{
    type: String
  }
  /*topic1: {
    type: Boolean,
    label: "Topic1",
  },
  topic2: {
    type: Boolean,
    label: "Topic2"
  },
  topic3: {
    type: Boolean,
    label: "Topic3"
  },
  topic4: {
    type: Boolean,
    label: "Topic4"
  },
  topic5: {
    type: Boolean,
    label: "Topic5"
  },
  topic6: {
    type: Boolean,
    label: "Topic6"
  },
  topic7: {
    type: Boolean,
    label: "Topic7"
  },
  topic8: {
    type: Boolean,
    label: "Topic8"
  },
  topic9: {
    type: Boolean,
    label: "Topic9"
  },
  topic10: {
    type: Boolean,
    label: "Topic10"
  },
  topic11: {
    type: Boolean,
    label: "Topic11"
  },
  topic12: {
    type: Boolean,
    label: "Topic12"
  },*/

  // articleTopics: {
  //   label: "Manage Topics",
  //   type: [String],
  //   autoform: {
  //     type: "select-checkbox",
  //     options: function () {
  //       return [
  //         {label: "Topic1", value: "topic1"},
  //         {label: "Topic2", value: "topic2"},
  //         {label: "Topic3", value: "topic3"},
  //         {label: "Topic4", value: "topic4"},
  //         {label: "Topic5", value: "topic5"},
  //         {label: "Topic6", value: "topic6"},
  //         {label: "Topic7", value: "topic7"},
  //         {label: "Topic8", value: "topic8"},
  //         {label: "Topic9", value: "topic9"},
  //         {label: "Topic10", value: "topic10"},
  //         {label: "Topic11", value: "topic11"},
  //         {label: "Topic12", value: "topic12"}
  //       ];
  //     }
  //   }
  // }
}));