Router.configure({
  layoutTemplate: 'layout'
});

Router.plugin('dataNotFound', {
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'home'
});
