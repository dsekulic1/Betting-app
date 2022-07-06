module.exports = (sequelize, DataTypes) => {
  const Sport = sequelize.define('sport', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  return Sport
}
