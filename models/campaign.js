module.exports = (sequelize, DataTypes) => {
  var Campaign = sequelize.define('campaign', {
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
      type: DataTypes.STRING(100),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    participant: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    image_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    time: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false
  });

  return Campaign;
};
