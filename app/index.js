'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('SailsPluginHook') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your Sails-Plugin-Hook\'s name',
      default: 'new-plugin'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Your Sails-Plugin-Hook description',
      default: 'Sails-Plugin-Hook'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      this.props.nameSlug = _s.slugify(this.props.name);
      this.props.sailsName = 'sails-hook-' + this.props.nameSlug;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_lib/_app.js'),
        this.destinationPath('lib/app.js')
      );

      this.fs.copy(
        this.templatePath('_lib/_sails/_loadControllers.js'),
        this.destinationPath('lib/sails/_loadControllers.js')
      );

      this.fs.copy(
        this.templatePath('_lib/_sails/_loadPolicies.js'),
        this.destinationPath('lib/sails/_loadPolicies.js')
      );

      this.fs.copyTpl(
        this.templatePath('_test/_basic.js'),
        this.destinationPath('test/basic.js'),
        this
      );

      this.fs.copyTpl(
        this.templatePath('_index.js'),
        this.destinationPath('index.js'),
        this
      );

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
