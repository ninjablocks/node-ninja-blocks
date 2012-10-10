exports.filter = function(filter,set) {
  // If an empty object is passed in either argument, return the set
  if (Object.keys(filter).length===0 || Object.keys(set).length===0) return set;
  var out={};
  for (var i in set) {
    if (set.hasOwnProperty(i)) {
      var filterMatched = 0;
      var filterLength = Object.keys(filter).length;
      for (var f in filter) {
        if (filter.hasOwnProperty(f)) {
          if (set[i].hasOwnProperty(f) && set[i][f] == filter[f]) 
            filterMatched++;
        }
      }
      if (filterMatched === filterLength) out[i] = set[i];
    }
  }
  return out;
};