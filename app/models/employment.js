import DS from 'ember-data';

// Define our data store property types
export default DS.Model.extend({
  source: DS.attr("string"),
  salary: DS.attr("number"),
  multiplier: DS.attr("number")
}).reopenClass({
  // Instantiate some default values locally
  // Note: This is deprecated. Is there any other way of doing this?
  FIXTURES: [
    {
      id: 1,
      source: "John Doe",
      salary: 8000,
    },
    {
      id: 2,
      source: "Jane Doe",
      salary: 10000,
    }
  ]
});
