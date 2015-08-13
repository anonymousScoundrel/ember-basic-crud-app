import Ember from 'ember';

export default Ember.Route.extend({

	// Note: model here instantiates our site's values
  model: function() {

    /**
    * There is no simple way to clone our ember data object, that I found.
    * With that in mind here is my approach: the data comes from the server
    * presumably as an int or float, so we will format it locally and just
    * make a note to unformat it before sending it back to the server (if we
    * were using one, that is.)
    */
  	// Populates our data store records with formatted data
  	return this.store.findAll('income').then(function(data) {

  		data.filter(function(item) {
  			var salary = accounting.formatMoney(
          item.get('salary'), { precision: 2}
        );

  			item.set('salary', salary);
  			return true;
  		}, data);

			return {
      	sourceInput: null,
      	salaryInput: null,
      	computedSalary: null,
        multiplier: 12,
        records: data
    	};
  	});

  }

});
