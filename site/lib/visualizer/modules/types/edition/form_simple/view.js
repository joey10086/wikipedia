define(["modules/default/defaultview","src/util/datatraversing","src/util/api","lib/formcreator/formcreator","lodash"],function(a,b,c,d,e){function f(){}return f.prototype=$.extend(!0,{},a,{init:function(){this.dom=$("<div />"),this.module.getDomContent().html(this.dom),this.callback=null},inDom:function(){var a,b=this,c=this.module.getConfiguration("structure")||[],f=this.module.getConfiguration("tpl_file"),g=this.module.getConfiguration("trigger"),h=this.module.getConfiguration("tpl_html"),i={},j={sections:{main:{groups:{main:{options:{type:"list",multiple:!1},fields:d.makeStructure(c)}}}}};a=f?$.get(f,{}):h;var k=function(){if(!b.lockEvents){var a,c,d=new DataObject(this.getValue(),!0);b.formValue=d;var e,f=b.module.getDataFromRel("input_object"),g=b.module.getConfiguration("structure")||[],h=new DataObject;if(f)if(b.module.getConfiguration("replaceObj")){for(a=0,c=g.length;c>a;a++)e=g[a].groups.general[0].searchOnField[0],f.setChild(e,b.form.sectionElements.main[0].groupElements.main[0].fieldElements[g[a].groups.general[0].name[0]][0].value,[b.module.getId()]);b.module.model.dataTriggerChange(f)}else for(a=0,c=g.length;c>a;a++)e=g[a].groups.general[0].searchOnField[0],h.setChild(e,b.form.sectionElements.main[0].groupElements.main[0].fieldElements[g[a].groups.general[0].name[0]][0].value);else h=d;b.module.controller.valueChanged(h)}};$.when(a).done(function(a){a='<form><div style="position: relative;" class="form-sections-wrapper form-section-section-container"><div class="form-section" data-form-sectionname="main"><div class="form-section-group-container"><div class="form-group" data-form-groupname="main">'+a+"</div></div></div></div></form>";var c=d.makeForm();switch(g){case"btn":var f=b.module.getConfiguration("btnLabel");c.addButton(f,{color:"blue"},$.proxy(k,c));break;case"change":var h=b.module.getConfiguration("debounce");i.onValueChanged=h>0?e.debounce(k,h):k}c.init(i),c.setStructure(j),c.onStructureLoaded().done(function(){c.fill({})}),c.onLoaded().done(function(){c.setTpl(a),b.dom.html(c.makeDomTpl()),c.inDom(),c.dom.submit(function(a){a.preventDefault()}),k.call(c),b.resolveReady()}),b.form=c})},update:{input_object:function(a){console.log("input");var b=this;this.newValue(a),this.module.model.dataListenChange(a,function(){b.newValue(this)},"input_object")}},newValue:function(a){console.log("new");var b,c=this,d=this.module.getConfiguration("structure")||[];c.lockEvents=!0,c.nb=0;for(var e=0,f=d.length;f>e;e++)b=d[e].groups.general[0].searchOnField[0],function(b,e){c.nb++,a.getChild(e,!0).then(function(a){c.form.sectionElements.main[0].groupElements.main[0].fieldElements[d[b].groups.general[0].name[0]][0].value=a?a.get?a.get():a.toString():"",c.nb--,0==c.nb&&(c.lockEvents=!1)})}(e,b)},getDom:function(){return this.dom}}),f});