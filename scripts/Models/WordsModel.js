define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var WordsModel = Backbone.Model.extend({

        defaults: {},
        url:'/json/flashcard_input.json',

        initialize:function(){
            this._fetch();
        },

        _fetch:function(){
            this.fetch();
        }

    });

    return WordsModel;
});
