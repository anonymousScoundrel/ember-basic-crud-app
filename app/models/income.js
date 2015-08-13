import DS from 'ember-data';

// Define our data store property types
// Salary is a string here but should probably be passed to the server as a
// integer or float. We store it as a currency formatted string.
export default DS.Model.extend({
  source: DS.attr('string'),
  salary: DS.attr('string')
}).reopenClass({
  // Instantiate some default values locally
  FIXTURES: [
    {
      id: 1,
      source: 'Cooking',
      salary: 11000,
    },
    {
      id: 2,
      source: 'Cleaning',
      salary: 11500,
    }
  ]
});
