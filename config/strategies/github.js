'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	GithubStrategy = require('passport-github').Strategy,
	config = require('../config'),
	users = require('../../server-app-folder/controllers/users.server.controller');

module.exports = function() {
	// Use github strategy
	passport.use(new GithubStrategy({
			clientID: config.github.clientID,
			clientSecret: config.github.clientSecret,
			callbackURL: config.github.callbackURL,
			passReqToCallback: true
		},
		function(req, accessToken, refreshToken, profile, done) {
			// Set the provider data and include tokens
			var providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			// Create the user OAuth profile
			var providerUserProfile = {
				email: profile.emails[0].value,
				username: profile.username,
				provider: 'github',
				providerIdentifierField: 'id',
				providerData: providerData
			};

			// Save the user OAuth profile
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};
