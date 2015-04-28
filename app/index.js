'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');
var path = require('path');

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
        path.join(this.props.sailsName, this.destinationPath('lib/app.js'))
      );

      this.fs.copy(
        this.templatePath('_lib/_sails/_loadControllers.js'),
        path.join(this.props.sailsName, this.destinationPath('lib/sails/_loadControllers.js'))
      );

      this.fs.copy(
        this.templatePath('_lib/_sails/_loadPolicies.js'),
        path.join(this.props.sailsName, this.destinationPath('lib/sails/_loadPolicies.js'))
      );

      this.fs.copyTpl(
        this.templatePath('_test/_basic.js'),
        path.join(this.props.sailsName, this.destinationPath('test/basic.js')),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('_index.js'),
        path.join(this.props.sailsName, this.destinationPath('index.js')),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        path.join(this.props.sailsName, this.destinationPath('package.json')),
        this.props
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        path.join(this.props.sailsName, this.destinationPath('.gitignore'))
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
