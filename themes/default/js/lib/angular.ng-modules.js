// By Luis Perez 
// From blog post: http://www.simplygoodcode.com/2014/04/angularjs-getting-around-ngapp-limitations-with-ngmodule/

(function() {
  function initNgModules(element) {
    var elements = [element],
      moduleElements = [],
      modules = [],
      names = ['ng:module', 'ng-module', 'x-ng-module', 'data-ng-module', 'ng:modules', 'ng-modules', 'x-ng-modules', 'data-ng-modules'],
      NG_MODULE_CLASS_REGEXP = /\sng[:\-]module[s](:\s*([\w\d_]+);?)?\s/;

    function append(element) {
      element && elements.push(element);
    }

    for(var i = 0; i < names.length; i++) {
      var name = names[i];
//          names[i] = true;
      append(document.getElementById(name));
      name = name.replace(':', '\\:');
      if (element.querySelectorAll) {
        var elements2;
        elements2 = element.querySelectorAll('.' + name);
        for(var j = 0; j < elements2.length; j++) append(elements2[j]);

        elements2 = element.querySelectorAll('.' + name + '\\:');
        for(var j = 0; j < elements2.length; j++) append(elements2[j]);


        elements2 = element.querySelectorAll('[' + name + ']');
        for(var j = 0; j < elements2.length; j++) append(elements2[j]);
      }else{
        console.log("not support querySelectAll")
      }
    }


    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];

      var className = ' ' + element.className + ' ';
      var match = NG_MODULE_CLASS_REGEXP.exec(className);
      if (match) {
        moduleElements.push(element);
        modules.push((match[2] || '').replace(/\s+/g, ','));
      } else {
        if(element.attributes) {
          for (var attrName in element.attributes) {
            if(attrName == "length") continue;
            var attr = { name: element.attributes[attrName].nodeName, value: element.attributes[attrName].nodeValue };
            if ( names.indexOf(attr.name ) !== -1) {
              moduleElements.push(element);
              modules.push(attr.value);
            }
          }
        }
      }
    }

    for(var i = 0; i < moduleElements.length; i++) {
      var moduleElement = moduleElements[i];
      var module = modules[i].replace(/ /g,'').split(",");
      angular.bootstrap(moduleElement, module);
    }

  }

  angular.element(document).ready(function() {
    initNgModules(document);
  });
})();