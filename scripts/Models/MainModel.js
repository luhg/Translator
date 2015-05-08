define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    return Backbone.Model.extend({

        defaults: {
            from:'en',
            to:'is',
            value:''
        }

    });
});
