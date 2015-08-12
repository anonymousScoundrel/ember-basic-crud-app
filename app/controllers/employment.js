import Ember from 'ember';

// Is the controller in Ember going away or not?
// This is very confusing according to the documentation.
export default Ember.Controller.extend({

	isEditing: false,
	isAdding: true,
	updateId: null,
	salaryError: false,
  salaryObserver: function() {
  	// Note: input sanitization is apparently already handled by HTMLbars
  	var salaryInput = this.get('model.salaryInput');
		var inputIsNaN = isNaN(salaryInput);

  	if (salaryInput !== null && salaryInput !== '') {
			if (!inputIsNaN) {
				this.set('salaryError', false);
  			// Make sure this is displayed as an integer or float
  			this.set('model.computedSalary',
        	accounting.formatMoney(
          	this.get('model.salaryInput') * this.get('model.multiplier'),
          	{ precision: 2 }
        	)
  			);
			} else {
				this.set('salaryError', true);
			}
  	}

  }.observes('model.salaryInput'),
  actions: {
    addRow: function() {
    	var self = this;
    	var store = self.store;

      // Save new record to local data store
      store.createRecord('employment', {
        source: self.get('model.sourceInput'),
        salary: self.get('model.computedSalary')
      }).save().then(function() {
        // Reset values to default state
	      self.send('clearForm');
      });
    },
    editRow: function (id) {
    	var self = this;
    	var store = self.store;

    	// Set form button's state
    	self.set('isAdding', false);
    	self.set('isEditing', true);

    	// set values from data to fields
    	store.find('employment', id).then(function(item) {
				var cleanSalary = accounting.unformat(item.get('salary'));

    		self.set('model.salaryInput', cleanSalary / self.get('model.multiplier'));
    		self.set('model.sourceInput', item.get('source'));
    	});

    	// There must be a smarter way of doing this
    	// Set id of current row to know who we are updating
    	self.set('updateId', id);
    },
    updateRow: function () {
    	var self = this;
    	var store = self.store;

			store.find('employment', self.get('updateId')).then(function(item) {
				item.set('source', self.get('model.sourceInput'));
				item.set('salary', self.get('model.computedSalary'));

				self.set('updateId', null);
				self.send('clearForm');
				self.set('isEditing', false);
				self.set('isAdding', true);
			});

    },
    deleteRow: function(id) {
    	var self = this;
    	var store = self.store;

      store.find('employment', id).then(function(item) {
        store.deleteRecord(item);
      });

      // Fix for if a user clicks delete while editing
      // The record is still deleted but a new record is inserted
      // Maybe there should be a confirmation?
      if (this.get('isEditing') === true) {
        this.set('isAdding', true);
        this.set('isEditing', false);
      }

    },
    cancelUpdate: function() {
    	this.set('isEditing', false);
    	this.set('isAdding', true);
    	this.set('updateId', null);
    	this.send('clearForm');
    },
    clearForm: function() {
			this.set('model.sourceInput', null);
    	this.set('model.computedSalary', null);
    	this.set('model.salaryInput', ''); // null doesn't seem to work here
    }
  }

});
