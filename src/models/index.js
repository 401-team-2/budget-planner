'use strict';

require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const transactionModel = require('./transactions/model.js');
const userModel = require('../auth/models/users.js'); 
const Collection = require('./data-collection.js');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite:memory:', {
  dialect: 'postgres', 
});
const transactions = transactionModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  transactions: new Collection(transactions),
  users: users
};
