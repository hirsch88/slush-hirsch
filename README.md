# Slush hirsch  [![NPM version](https://badge-me.herokuapp.com/api/npm/slush-hirsch.png)](http://badges.enytc.com/for/npm/slush-hirsch)

> master  [![Build Status](https://travis-ci.org/hirsch88/slush-hirsch.svg?branch=master)](https://travis-ci.org/hirsch88/slush-hirsch)

> develop [![Build Status](https://travis-ci.org/hirsch88/slush-hirsch.svg?branch=develop)](https://travis-ci.org/hirsch88/slush-hirsch)

> TypeScript Generator for module-based applications


## Getting Started

Install `slush-hirsch` globally:

```bash
$ npm install -g slush-hirsch
```

### Usage

#### Scaffolding a new Project (in-construction)
Create a new folder for your project:

```bash
$ mkdir my-slush-hirsch
```

Run the generator from within the new folder:

```bash
$ cd my-slush-hirsch && slush hirsch
```

#### Template Generatros
Run the template generators from within your project root folder:

**Component**: Creates a new component(directive) for your project.
```bash
$ slush hirsch:component
```

**Filter**: Creates a new filter for your project.
```bash
$ slush hirsch:filter
```

**Controller**: Creates a new controller for your project.
```bash
$ slush hirsch:controller
// or
$ slush hirsch:ctrl
```

**Model**: Creates a new model for your project.
```bash
$ slush hirsch:controller
```

**View**: Creates a new view module with routes config and a first view with controller.
```bash
$ slush hirsch:view
```


## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/slushjs/slush).

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/hirsch88/slush-hirsch/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/hirsch88/slush-hirsch/issues).

## License

The MIT License

Copyright (c) 2015, hirsch

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

