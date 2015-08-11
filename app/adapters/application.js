// export { default } from 'ember-data-fixture-adapter';
// The above method worked, but threw deprecation notices.
// The fixes below take care of those.
import EmberDataFixtureAdapter from 'ember-data-fixture-adapter';

export default EmberDataFixtureAdapter.extend({
  shouldReloadAll: function() {
    return true;
  },
  shouldBackgroundReloadRecord: function() {
    return true;
  }
});

// This is the deprecated way. Now we use above add on.
// import DS from 'ember-data';
// export default DS.FixtureAdapter.extend({
// });
