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

        events: {
            'keyup #input_value':'_inputValue',
            'click .lang-block a':'_changeLanguage'
        },

        initialize: function (params) {
            this.words = params.words;
            this.model.on('change', this.render, this); // update view when some data will be changed
            this.words.on('sync', this.render, this); // update view when words will be loaded
        },

        render: function () {
            console.log('View:render()');
            this.$el.html(this.template({
                model:this.model
            }));
        },

        _inputValue:function(e){
            var $el = $(e.currentTarget),
                value = $el.val().trim();

            //update main model, but not run 'change' event
            this.model.set('value', value,{silent:true});

            // update route
            this.model.trigger('route:update');

            // translate text value
            this._translate();
        },

        //change from/to language
        _changeLanguage:function(e){
            var $el = $(e.currentTarget),
                data = $el.data('lang');

            this.model.trigger('set-arguments', data);
            return false;
        },

        //translate text value
        _translate:function(){
            var value = this.model.get('value'),
                en_words = this.words.keys(),   // get array of english words
                is_words =this.words.values();  // get array of spanish words
        }
    });

    return MainView;
});
