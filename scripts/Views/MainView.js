/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var MainView = Backbone.View.extend({
        template: JST['scripts/Templates/MainView.ejs'],

        id: '',

        className: '',

        events: {},

        initialize: function (params) {
            this.words = params.words;
            this.model.on('change', this.render, this); // update view when some data will be changed
        },

        render: function () {
            this.$el.html(this.template({
                model:this.model
            }));
        }
    });

    return MainView;
});
