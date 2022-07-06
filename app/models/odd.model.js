module.exports = (sequelize, DataTypes) => {
  const Odds = sequelize.define('odds', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    home: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tie: {
      type: DataTypes.FLOAT,
    },
    guest: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  })

  return Odds
}
