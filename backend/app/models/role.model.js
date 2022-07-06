module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  })

  return Role
}
