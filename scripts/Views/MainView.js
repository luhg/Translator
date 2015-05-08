/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'Views/TipsView'
], function ($, _, Backbone, JST, TipsView) {
    'use strict';

    var MainView = Backbone.View.extend({
        template: JST['scripts/Templates/MainView.ejs'],

        id: '',

        className: '',

        events: {
            'keyup #input_value, change #input_value':'_changeText',
            'click .lang-block a':'_changeLanguage'
        },

        initialize: function (params) {
            this.words = params.words;
            this.model.on('change', this.render, this); // update view when some data will be changed
            this.words.on('sync', this.render, this); // update view when words will be loaded
        },

        render: function () {
            this.$el.html(this.template({
                model:this.model
            }));

            //run translate method when entered some text
            if(this.model.get('value').length){
                this._translate();
            }
            return this;
        },

        _changeText:function(e){
            var $el = $(e.currentTarget),
                value = $el.val().trim();

            //update main model, but not run 'change' event
            this.model.set('value', value,{silent:true});

            // update route
            this.model.trigger('route:update');

            //destroy tips if exist
            this._destroyTips();

            //hide translated word
            this._hideTranslated();

            // translate text value
            this._translate();
        },

        //change from/to values
        _changeLanguage:function(e){
            var $el = $(e.currentTarget),
                from_language = $el.data('lang');

            this.model.trigger('set-arguments', from_language);
            return false;
        },

        //translate text value
        _translate:function(){
            var value = this.model.get('value').toLowerCase(), // set value in lower case
                words =[];  // all words from dictionary. Only selected language

            if(this.model.get('from')==='en'){
                //get array of english words
                words = this.words.keys();
            }else{
                //get array of spanish words
                words = this.words.values();
            }

            //find all possible words
            var search =  words.filter(function(item){
                if(item.toLowerCase().indexOf(value)> -1){
                    return item;
                }
            });

            if(search.length){
                if(search[0].toLowerCase()=== value){
                    //100% perfect
                    this._showTranslated(search[0]);
                }else{
                    // show tips when entered more than 3 characters
                    if(value.length>3){
                        this._showTips(search);
                    }
                }

            }
        },

        //hide translated value
        _hideTranslated:function(){
            this.$('#translated_value').html('');
        },

        // show translated word
        _showTranslated:function(value){
            var translated= ''; //translated word

            if(this.model.get('from')==='en'){
                //show spanish value
                translated= this.words.get(value);
            }else{
                //show english value
                _.find(this.words.toJSON(), function(item, index, key){
                    if(item==value){
                        translated = index;
                        return item;
                    }
                });
            }

            //set translated value into html tag.
            this.$('#translated_value').html(translated);
        },

        // show all possible words
        _showTips:function(tips){

            this._destroyTips();//destroy tips

            this.tips = new TipsView({
                model:this.model,
                tips:tips
            });
            this.$('#tips').html(this.tips.render().el);
        },

        //destroy TipsView if exist
        _destroyTips:function(){
            if(this.tips && this.tips.remove){
                this.tips.remove();
            }
        }
    });

    return MainView;
});
