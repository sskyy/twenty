# Twenty

A blog framework based on zero.js.

## Start

 - use `git clone` or simply download this repo.
 - use `npm install` to install all dependencies.
 - use `node app` to run!
 
## admin guide

 - admin entry address : `http://127.0.0.1:1337/page/static/admin`
 
## developer guide

First of all, Twenty is a standard sails(express) application, it means the guide of sails or express can work with Twenty too.  
Here is a quick glance at Twenty's program structure, for more detailed developer guide, please see [zero.js](http://github.com/sskyy/zero) 
 
 - Visitor theme is located in `/views/twenty`. We use `jade` as view engine. If you want to use a different engine, remember change the config file `/config/cms.js`.  
 - Admin panel is a single page application. The layout file is also located in `/views/twenty` named `admin.jade`. It's partial file are located in `/assets/twenty/templates`.
 - zero.js has provided a full package of angular modules for developers. It's very simple to use. Check out `/views/twenty/post-list.jade`, let me show you how quick you can change post-list to a spa:
   - In this page we will show visitors a list of categories and a list of posts. First of all, include `/assets/default/js/index/crud.js` and `/assets/default/js/node/crud.js`. AND include `/assets/default/js/common/bootstrap.js` right behind angular script, this file will bootstrap you page automatically so you do not need to wrap all modules manually.
   - use `ng-controller="node.crud"` and `ng-controller="index.crud"` to the element which will contain the list, and you should specify what type of node and index you are listing by using `node-type` attribute and `index-type`.
   - a full use of these default angular module can be found [here](http://github.com/sskyy/zero).

## what's next? 

Twenty shares the same goal with zero.js, to be the most flexible CMS system. By `flexible` we mean it will be the easiest system to customize, to build module or theme for.  
It will continue integrate the most popular stacks to keep it simple to learn for developers. We really want our developers developing modules or themes with fun and we are confident with that.  
Our next step is to build a online bundle market inside twenty to let users install any theme or module through a click. And help developers to make a profit.   

## we are recruiting

For now, we have three engineers full of passion to develop zero.js and twenty, and looking forward to have more company. Please send email to admin@onezerojs.com, remember to tell us your github account name.