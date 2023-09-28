'use strict';

const transactionModel = (sequelize, DataTypes) => sequelize.define('Transactions', {
  category: { type: DataTypes.STRING, required: true },
  date: { type: DataTypes.DATE, required: true },
  amount: { type: DataTypes.DECIMAL, required: true }
});

module.exports = transactionModel;
