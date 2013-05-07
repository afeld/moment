var moment = require("./moment");

var fixedMoment = function() {
  var mom = moment.apply(null, arguments),
    val, orig;

  for (var key in moment) {
    val = mom[key];
    if (typeof val === 'function') {
      // wrap it
      mom[key] = (function(name) {
        return function() {
          var dup = this.clone();
          // return origMethod.apply(dup, arguments);
          dup[name].apply(dup, arguments);
          return dup;
        };
      })(key);
    }
  }

  return mom;
};


module.exports = fixedMoment;
