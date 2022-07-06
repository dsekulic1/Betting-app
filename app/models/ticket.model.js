module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('ticket', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('WIN', 'LOST', 'UNRESOLVED'),
      defaultValue: 'UNRESOLVED',
    },
    bet: {
      type: DataTypes.FLOAT,
    },
    excpectedGain: {
      type: DataTypes.FLOAT,
    },
  })
  return Ticket
}
