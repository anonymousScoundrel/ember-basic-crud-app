import Ember from 'ember';

export default Ember.Controller.extend({

	isEditing: false,
	isAdding: true,
	updateId: null,
  salaryObserver: function() {
  	// Note: input sanitization is apparently already handled by HTMLbars
  	var salaryInput = this.get('model.salaryInput');

  	if (salaryInput !== null) {
  		// Make sure this is an integer or float
  		this.set('model.computedSalary',
  			parseFloat(salaryInput * 12).toFixed(2)
  		);
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
    		self.set('model.salaryInput', item.get('salary'));
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

    },
    cancelUpdate: function() {
    	this.set('isEditing', false);
    	this.set('isAdding', true);
    	this.set('updateId', null);
    	this.send('clearForm');
    },
    clearForm: function() {
    	this.set('model.sourceInput', null);
    	this.set('model.salaryInput', ''); // null doesn't seem to work here
    }
  }

});