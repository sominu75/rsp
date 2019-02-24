module.exports = (sequelize, DataTypes) => {
  return sequelize.define('campaign', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    admin_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    client_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    image_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    time: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false
  });
};
