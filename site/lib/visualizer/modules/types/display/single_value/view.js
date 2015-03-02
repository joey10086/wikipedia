define(["modules/default/defaultview","src/util/domdeferred","src/util/api","src/util/typerenderer","src/util/color"],function(a,b,c,d,e){function f(){}return $.extend(!0,f.prototype,a,{init:function(){var a="<div></div>";this.dom=$(a).css(this.module.getConfigurationCheckbox("append","yes")?{height:"100%",width:"100%","overflow-x":"hidden","overflow-y":"scroll"}:{display:"table","table-layout":"fixed",height:"100%",width:"100%"}),this.values={},this.module.getDomContent().html(this.dom),this.fillWithVal(this.module.getConfiguration("defaultvalue")),this.resolveReady(),this._relsForLoading=["value"]},blank:{value:function(){if(this.module.getConfigurationCheckbox("append","yes"))for(var a=this.module.getConfiguration("maxEntries"),b=this.dom.children(),c=b.length-a,d=0;c>d;d++)b[d].remove();else this.dom.empty()},color:function(){this.module.getDomContent().css("background-color","#FFF")}},update:{color:function(a){this.module.getDomContent().css("background-color",a.get())},value:function(a,b){void 0==a?this.fillWithVal(this.module.getConfiguration("defaultvalue")||""):this.render(a,b)}},render:function(a,b){var c=this,e=d.toScreen(a,this.module);e.always(function(a){c.values[b]=a,c.renderAll(a,e)})},renderAll:function(a,b){{var c=this,d=this.module.getConfiguration("sprintf");this.module.getConfiguration("sprintfOrder")}if(d&&""!=d)try{require(["components/sprintf/dist/sprintf.min"],function(){var e=[d];for(var f in c.values)e.push(c.values[f]);a=sprintf.apply(this,e),c.fillWithVal(a,b)})}catch(d){c.fillWithVal(a,b)}else c.fillWithVal(a,b)},_scrollDown:function(){var a=this.dom[0].scrollHeight;this.dom.scrollTop(a)},fillWithVal:function(a,c){var d,f=this.module.getConfiguration("valign"),g=this.module.getConfiguration("align"),h=this.module.getConfiguration("fontcolor"),i=this.module.getConfiguration("fontsize"),j=this.module.getConfiguration("font"),k=this.module.getConfigurationCheckbox("preformatted","pre"),l=this.module.getConfigurationCheckbox("preformatted","selectable"),m=void 0!=a?a.toString():"";h&&(h=e.getColor(h)),this.module.getConfigurationCheckbox("append","yes")?(d=$("<div>").css({fontFamily:j||"Arial",fontSize:i||"10pt",color:h||"#000000","vertical-align":f||"top",textAlign:g||"center",width:"100%","white-space":k?"pre":"normal","word-wrap":"break-word","user-select":l?"text":"none"}).html(m),this.dom.append(d)):(d=$("<div />").css({fontFamily:j||"Arial",fontSize:i||"10pt",color:h||"#000000",display:"table-cell","vertical-align":f||"top",textAlign:g||"center",width:"100%",height:"100%","white-space":k?"pre":"normal","word-wrap":"break-word","user-select":l?"text":"none"}).html(m),this.dom.html(d)),this._scrollDown(),c&&c.build&&(c.build(),this._scrollDown()),b.notify(d)}}),f});