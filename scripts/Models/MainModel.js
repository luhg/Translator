define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    return Backbone.Model.extend({

        defaults: {
            from:'en', // translate from language
            to:'is',   //translate to language
            value:''

        },

        initialize:function(){
            console.log('Main:init');
            this.on('set-arguments', this._setData, this);
        },

        //set new 'from','to' and 'value' values
        _setData:function(from, to, value){
            var data = {
                from:from,
                to:to,
                value:value || this.get('value')
            };
            data = this._checkLangs(data);
            this.set(data);

        },

        // check if 'from' value is correct
        _checkLangs:function(data){
            var en = 'en',  //English
                is = 'is';  //Spanish

            if(data.from && data.from===en){
                data.to = is;
            }else if(data.from && data.from === is){
                data.to = en;
            }else{
                // set default value when 'from' is incorrect
                data = this.defaults;
                this.trigger('route:update');
            }

            return data;
        }

    });
});
