'use strict';
var sailsPluginHook = require('./lib/app.js');

module.exports = function (sails) {
		sailsPluginHook.adaptSails(sails);

    return {
	    defaults: {
	    	<%= nameSlug %>: {

	    	}
	    },

      initialize: function(cb) {
      	sailsPluginHook.init(sails);

        return cb();
      }      
    };
};