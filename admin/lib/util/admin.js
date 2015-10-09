 AdminConfig = {
  name: 'MedCircle',
  adminEmails: ['admin@medcircle.com'],
  userSchema: new SimpleSchema({
    'profile.firstName': {
       type: String
     }
  }),
  collections: {
    Posts: {
       icon: 'shopping-cart',
      omitFields: ["serviceId", "productId", "variantId", "createdAt", "updatedAt"],
      tableColumns: [
       { label: 'Title', name: 'title' },
       { label: 'Source', name: 'source' },
       { label: 'Posted At', name: 'createdAt' }
      ],
      showEditColumn: true,
      showDelColumn: true
      // templates: {
      //   new: {
      //     name: "articleNew"
      //   }
        // ,edit:
        // {
        //   name: "articleEdit",
        //   data: {
        //    //  post: Posts.findOne({"_id": Router.current().params})
        //   }

        // }
     // }
    },
  },
  autoForm: {
    omitFields: ["createdAt", "updatedAt", "authorId","videoId"]
  },

}


// Router.route('adminDashboardPostsEdit',{
//     controller: 'AdminController',
//     path: '/admin/Posts/:_id/edit',
//     action: 'AdminPosts'
// })

// AdminController = RouteController.extend({
//     AdminPosts: function () {

      
//     }, 
//     data :function(){
//      return Posts.findOne({"_id":params});
//     }
    
// });
