'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost/sequelize_test',
  {
    logging: false
  }
);

const Post = sequelize.define(
  // 第一引数はテーブル名
  'Post',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: Sequelize.TEXT
    }
  },
  {
    freezeTableName: true,
  }
);

Post.sync();
module.exports = Post;