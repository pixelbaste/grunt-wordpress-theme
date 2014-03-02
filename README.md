# Grunt Init Wordpress Theme Setup

This is a basic bootstrapper for Wordpress Theme development.

## Introduction

This is based off some of the fantastic work from the following great people:

* 10up - [https://github.com/10up/grunt-wp-theme](https://github.com/10up/grunt-wp-theme)
* Automatic (Underscores.me) - [https://github.com/Automattic/underscores.me](https://github.com/Automattic/underscores.me)

## Installation

There are 2 possible routes of installation both of which require [grunt-init](http://gruntjs.com/project-scaffolding) to be installed.

### Option 1 - Global Template

Once grunt-init is installed, place this template in your `~/.grunt-init/` directory. It's recommended that you use git to clone this template into that directory, as follows:

#### Linux/Mac Users

```
git clone https://github.com/pixelbaste/grunt-wordpress-theme.git ~/.grunt-init/wordpress-theme
```

#### Windows Users

```
git clone https://github.com/pixelbaste/grunt-wordpress-theme.git %USERPROFILE%/.grunt-init/wordpress-theme
```

#### Usage

At the command-line, cd into an empty directory, run this command and follow the prompts.

```
grunt-init wordpress-theme
```

_Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files._

### Option 2 - Local Template

At your command line run the following substituting `wordpress-theme` with any directory you wish

```
git clone https://github.com/pixelbaste/grunt-wordpress-theme.git wordpress-theme
```
#### Usage

On completion of the clone run the following and follow the prompts:

```
grunt-init *relative-path-to-wordpress-theme-clone*
```


### Setup NPM Modules


Install the NPM modules required to actually process your newly-created project by running:

```
npm install
```




