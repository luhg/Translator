define([
    'jquery',
    'backbone',
    'Models/MainModel',
    'Models/WordsModel',
    'Views/MainView'

], function ($, Backbone, MainModel, WordsModel, MainView) {
    'use strict';

    return Backbone.Router.extend({
        routes: {
            ':from':'_route',
            ':from/:to':'_route',
            ':from/:to/(:value)':'_route',
            '*path':'_route'
        },

        initialize:function(){
            this._initModels();
            this._initViews();
        },

        _initModels:function(){
            this.models ={
                main: new MainModel(),
                words: new WordsModel()
            };
            this.listenTo(this.models.main,{
                'change':this._updateRoute,
                'route:update':this._updateRoute
            }, this);
        },

        _initViews:function(){
            new MainView({
                model:this.models.main,
                words:this.models.words,
                el:$('#content')
            });
        },

        _route:function(from,to,value){
            value = value || '';
            this.models.main.trigger('set-arguments', from, to, value);
        },

        _navigate:function(route){
            this.navigate(route);
        },

        //update route to #{from-language}/{to-language}/{text-value}
        _updateRoute:function(){
            this._navigate(
                '#'+this.models.main.get('from')+
                '/'+this.models.main.get('to')+
                '/'+encodeURI(this.models.main.get('value'))    //encode text value
            );
        }
    });
});
