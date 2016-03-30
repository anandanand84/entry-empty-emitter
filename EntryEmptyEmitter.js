/**
 * Created by AAravindan on 1/26/16.
 */

const EventEmitter = require('events');
const util = require('util');

function EntryEmptyEmitter() {
    EventEmitter.call(this);
}

util.inherits(EntryEmptyEmitter, EventEmitter);

EntryEmptyEmitter.prototype.keys = {};

EntryEmptyEmitter.prototype.add = function(key){
    this.keys[key] ? this.keys[key]++ : (this.keys[key] = 1);
    if(this.keys[key] === 1){
        this.emit('entry:'+key,key);
        this.emit('entry',key);
    }
};

EntryEmptyEmitter.prototype.remove = function(key){
    this.keys[key] ? this.keys[key]-- : (this.keys[key] = 0);
    if(this.keys[key] <= 0){
        this.keys[key] = 0;
        this.emit('empty',key);
        this.emit('empty:'+key,key);
    }
};

EntryEmptyEmitter.prototype.status = function(){
    return this.keys;
};

EntryEmptyEmitter.prototype.reset = function(key){
    delete this.keys[key];
};

EntryEmptyEmitter.prototype.getCount = function(key){
    return this.keys[key];
};

global.EntryEmptyEmitter = module.exports = new EntryEmptyEmitter();
