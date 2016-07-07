/**
 * Created by nuintun on 2014/4/2.
 */

'use strict';

// External lib
var config = require('./config'),
  Execute = require('./execute'),
  Query = require('./query'),
  ExecuteScalar = require('./executeScalar'),
  ExecuteTrans = require('./executeTrans');

function Client(connection){
  this.connection = connection;

  if (!(this instanceof Client)) {
    return new Client(connection);
  }
}

Client.prototype = {
  execute: function (sql){
    return new Execute(this.connection, sql);
  },
  query: function (sql){
    return new Query(this.connection, sql);
  },
  executeScalar: function (sql, scalar){
    return new ExecuteScalar(this.connection, sql, scalar);
  },
  
  executeTrans: function (sql){
    return new ExecuteTrans(this.connection, sql );
  }
};

// Main
config.open = Client.bind(Client);

// Exports
module.exports = config;
