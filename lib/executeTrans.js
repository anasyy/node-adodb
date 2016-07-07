/**
 * Created by nuintun
 * Modified by Anas Yassine on 2015/4/8.
 */

'use strict';

// External lib
var util = require('util'),
  proxy = require('./proxy'),
  eventemitter = require('events').EventEmitter;

function ExecuteTrans (connection, sql){
  eventemitter.call(this);

  this.params = {
    connection: connection,
    sql: sql
  };

  this.exec();
}

util.inherits(ExecuteTrans, eventemitter);

ExecuteTrans.prototype.exec = function (){
  var that = this;

  proxy.exec(
    'executeTrans',
    that.params,
    function (data){
      that.emit('done', data);
    },
    function (error){
      that.emit('fail', error);
    }
  );
};

module.exports = ExecuteTrans;