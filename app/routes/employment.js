import Ember from 'ember';

export default Ember.Route.extend({

	// Note: model here instantiates our site's values
  model: function() {

  	// Populate our data store records with formatted data
  	return this.store.findAll('employment').then(function(data) {

  		data.filter(function(item, index, enumberable) {
  			var salary = parseFloat(item.get('salary')).toFixed(2);

  				item.set('salary', salary);
  				return true;
  		}, data);

			return {
      	sourceInput: null,
      	salaryInput: null,
      	computedSalary: null,
      	records: data
    	};
  	});

  }

});
