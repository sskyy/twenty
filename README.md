**We are refactoring Twenty core, you may want to [have a look](http://github.com/sskyy/zero).**

# Twenty

A blog framework based on zero.js. [http://twentyjs.com](http://twentyjs.com)

## Start

 - use `git clone` or simply download this repo.
 - use `npm install` to install all dependencies.
 - use `node app` to run!
 
## admin guide

 - admin entry address : `http://127.0.0.1:1337/page/static/admin`
 
## developer guide

First of all, Twenty is a standard sails(express) application, it means the guide of sails or express can work with Twenty too.  
Here is a quick glance at Twenty's program structure, for more detailed developer guide, please see [zero.js](http://github.com/sskyy/zero) 
 
 - Visitor theme is located in `/views/twenty`. We use `jade` as view engine. If you want to use a different engine, you will need to change the config file `/config/cms.js`.  
 - Admin panel is a single page application. The layout file named `admin.jade` is also located in `/views/twenty`. It's template files are located in `/assets/twenty/templates`.
 - zero.js has provided a full package of angular modules for developers. It's very simple to use. Check out `/views/twenty/post-list.jade`, let me show you how quick you can change post-list into a spa:
   - This page we shows visitors a list of categories and a list of posts. First of all, include `/assets/default/js/index/crud.js`, `/assets/default/js/node/crud.js`, and `/assets/default/js/lib/angular.ng-modules.js`. this file will enable us to use multiple modules without create a wrapper module to include all modules.
   - Add `ng-modules='node.crud'` and `ng-modules='index.crud'` with it's controllers `ng-controller="node.crud"` and `ng-controller="index.crud"`  to the element which will contain the list, remember you should specify what type of node and index you are listing by using `node-type` attribute and `index-type`.
   - Done. a full use of these default angular module can be found [here](http://github.com/sskyy/zero).

## what's next? 

Twenty shares the same goal with zero.js, to be the most flexible CMS system. By `flexible` we mean it will be the easiest system to customize, to build module or theme for.  
It will continue integrate the most popular stacks to keep it simple to learn for developers. We really want our developers developing modules or themes with fun and we are confident with that.  
Our next step is to build a online bundle market inside twenty to let users install any theme or module through a click. And help developers to make a profit.   

## we are recruiting

For now, we have three engineers full of passion to develop zero.js and twenty, and looking forward to have more company. Please send email to admin@onezerojs.com, remember to tell us your github account name.