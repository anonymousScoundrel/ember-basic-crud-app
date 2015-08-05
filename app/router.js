import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

	// Define employment url
  this.route('employment');
  // Define dashboard as root url
  this.resource('dashboard', {path: '/'});

});

export default Router;
