 AdminConfig = {
  name: 'MedCircle',
  adminEmails: ['admin@medcircle.com'],
  collections: {
    Posts: {
      showEditColumn: true,
      showDelColumn: true,
      templates: {
        new: {
          name: "articleNew"
        }
      }
    },
  },
  autoForm: {
    omitFields: ["createdAt", "updatedAt", "authorId"]
  },

}