define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    return Backbone.Model.extend({

        defaults: {
            from:'en', // translate from language
            to:'es',   //translate to language
            value:''   //text for translation

        },

        initialize:function(){
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
                es = 'es';  //Spanish

            if(data.from && data.from===en){
                data.to = es;
            }else if(data.from && data.from === es){
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
