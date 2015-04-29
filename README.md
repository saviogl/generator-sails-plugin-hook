# generator-sails-plugin-hook

> [Yeoman](http://yeoman.io) generator


## Getting Started

To install generator-sails-plugin-hook from npm, run:

```bash
npm install -g generator-sails-plugin-hook
```

Finally, initiate the generator:

```bash
yo sails-plugin-hook
```

## What Does It Generate ?

It generates a scaffold of a `Sails Plugin Hook`, which is simply a sails installable hook ( http://sailsjs.org/#!/documentation/concepts/extending-sails/Hooks/installablehooks.html ) with some aditional plugin features that allows its files to be merged upon sails `lift` process.

The generated plugin was developed to use the same app anatomy as a Sails App ( http://sailsjs.org/#!/documentation/anatomy/myApp ), but it has only support for `Controllers`, `Models`, `Policies`, `Services` and `config`:

```
sails-hook-your-hook-name
...
|_api
|__controllers
|__models
|__policies
|__services
|_config
...
```

You would create your files in these folders just as you would create files in a newly created Sails App.

Once your hook-plugin has been installed in a Sails App, those files would be merged into sails upon `lift` process.

## Sails Plugin Hook Example

To get an idea on what is a `Sails Plugin Hook` check out the following:

https://www.npmjs.com/package/sails-hook-jwt-auth/

## License

MIT