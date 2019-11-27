const Sequelize = require('sequelize');

const Model = Sequelize.Model;

class DummyNudge extends Model {}

exports.DummyNudge = DummyNudge;
exports.init = function(sequelize) {
  DummyNudge.init({
    name: {
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING
    },
    archived: {
      type: Sequelize.STRING
    },
    public: {
      type: Sequelize.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'dummy_nudges'
    // options
  });
}
