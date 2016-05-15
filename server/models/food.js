module.exports = function(Food) {

  var app = require('../../server/server');
  var async = require('async');
  var Fridge;

  // REMOTE FUNCTIONS
  Food.GetFridgesByFood = function(foodName, cb) {

    var Fridge = app.models.Fridge;
    var fridges = [];
    Food.find({where: {name:foodName}})
      .then(function(foods) {

        async.eachSeries(foods, function(food, callback) {
          Fridge.find({where: {id: food.fridgeId}})
            .then(function(fridge) {
              fridges.push(fridge[0]);
              callback();
            })
        }, function(err) {
          cb(null, fridges);
        })
      }).catch(function(err) {cb(err, null);});

  }

  Food.remoteMethod('GetFridgesByFood', {
    http: {path: '/getFridgesByFood', verb: 'get'},
    accepts: {args: 'foodName', type: 'string'},
    returns: {type: 'object', root:true}
  })

};
