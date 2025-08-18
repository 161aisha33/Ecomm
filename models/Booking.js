export default (sequelize, DataTypes) => {
  return sequelize.define('Booking', {
    bookingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tourDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    customerId: DataTypes.INTEGER,
    townId: DataTypes.INTEGER,
    packageId: DataTypes.INTEGER,
    numberOfPeople: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    totalPrice: DataTypes.DECIMAL(10, 2),
    status: {
      type: DataTypes.ENUM('pending','confirmed','paid','cancelled'),
      defaultValue: 'pending',
    },
    // New fields for booking management
    specialRequests: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cancellationReason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'bookings',
  });
};