module.exports = (sequelize, DataTypes) => {
  const Bet = sequelize.define('bet', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    expected: {
      type: DataTypes.ENUM('home', 'tie', 'guest'),
    },
    quota: {
      type: DataTypes.FLOAT,
    },
    passed: {
      type: DataTypes.BOOLEAN,
    },
  })
  return Bet
}
