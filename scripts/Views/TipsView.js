/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    return Backbone.View.extend({
        template: JST['scripts/Templates/Tips.ejs'],

        id: '',

        className: '',

        events: {
            'click a':'_onClick'
        },

        initialize: function (params) {
            this.tips = params.tips;
        },

        render: function () {
            console.log('TipsView:render()', this.tips);
            this.$el.html(this.template({
                model:this.model.toJSON(),
                tips:this.tips
            }));
            return this;
        },

        _onClick:function(e){
            var $el = $(e.currentTarget),
                value = $el.data('value');

            // update text-value in main model
            this.model.trigger('set-arguments',this.model.get('from'),this.model.get('to'),value);
            return false;
        }
    });
});
