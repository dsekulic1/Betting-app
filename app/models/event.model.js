module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM('home', 'tie', 'guest'),
    },
  })
  return Event
}
