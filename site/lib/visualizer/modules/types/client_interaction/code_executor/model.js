define(["modules/types/client_interaction/code_editor/model","src/util/datatraversing"],function(a,b){function c(){}return c.prototype=Object.create(a.prototype),c.prototype.getjPath=function(a){var c=[];return"outputValue"===a&&this.module.controller.lastData&&b.getJPathsFromElement(this.module.controller.lastData,c),c},c});