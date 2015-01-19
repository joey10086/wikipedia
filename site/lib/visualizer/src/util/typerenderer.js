define(["require","jquery","src/util/api","src/util/util","src/util/datatraversing"],function(a,b,c,d,e){function f(a,c,d,f,h){var i=e.getType(c),j=e.getHighlights(c);if(f=b.extend(f,e.getOptions(c)),!g[i])return a.resolve("");var k=c;c=e.get(c),!g[i].ready&&g[i].init&&(g[i].init(),g[i].ready=!0),g[i].toscreen(a,c,k,f,j,d,h)}d.loadCss("components/font-awesome/css/font-awesome.min.css");var g={};return g.string={},g.string.toscreen=function(a,b){for(b=String(b);;)if(b=b.replace("<","&lt;").replace(">","&gt;"),-1===b.indexOf("<")&&-1===b.indexOf(">"))break;a.resolve(b)},g.date={},g.date.toscreen=function(a,b){try{var c=new Date(b);a.resolve(c.toLocaleString())}catch(d){a.resolve("Invalid date")}},g.color={},g.color.toscreen=function(a,c){var d=b("<div><div/></div>");d.children().css({backgroundColor:c,width:"100%",height:"100%",padding:0,margin:0}),a.resolve(d.html())},g.html={},g.html.toscreen=function(a,b){a.resolve(String(b))},g.matrix={},g.matrix.toscreen=function(a,b){a.resolve(b)},g.number={},g.number.toscreen=function(a,b){a.reject(b.valueOf())},g.chemical={},g.chemical.toscreen=function(a,b){b.getChild(["iupac","0","value"]).then(a.resolve,a.reject)},g.picture={},g.picture.toscreen=function(a,b){a.reject('<img src="'+b+'" />')},g.svg={},g.svg.toscreen=function(a,c){var d=b(c),e=[0,0,parseInt(d.attr("width")),parseInt(d.attr("height"))];d[0].setAttribute("viewBox",e.join(" ")),d.removeAttr("id"),d.attr("width","100%"),d.attr("height","100%"),a.resolve(d)},g.gif=g.picture,g.jpeg=g.picture,g.jpg=g.picture,g.png=g.picture,g.doi={},g.doi.toscreen=function(a,b){return a.resolve(b.replace(/^(.*)$/,'<a target="_blank" href="http://dx.doi.org/$1"><img src="bin/logo/doi.png" /></a>'))},g.jme={},g.jme.toscreen=function(b,c,d,e,f,h){a(["lib/chemistry/jme-converter"],function(a){var d=a.toMolfile(c),i={type:"mol2d",value:d};g.mol2d.toscreen(b,d,i,e,f,h)})},g.smiles={},g.smiles.toscreen=function(b,c,d,e,f,h){a(["http://www.lactame.com/lib/actelion/2.0.4/actelion-2.0.4.js"],function(a){var d=a.Molecule.fromSmiles(String(c)),i={type:"mol2d",value:d.toMolfile()};g.mol2d.toscreen(b,d,i,e,f,h)})},g.actelionID={},g.actelionID.toscreen=function(b,c,d,e,f,h){a(["http://www.lactame.com/lib/actelion/2.0.4/actelion-2.0.4.js"],function(a){var c=a.Molecule.fromIDCode(String(d.value),d.coordinates?String(d.coordinates):!0),i={type:"mol2d",value:c.toMolfile()};g.mol2d.toscreen(b,c,i,e,f,h)})},g.mol2d={},g.mol2d.toscreen=function(e,f,g,h,i,j){var k=d.getNextUniqueId(),l=d.getNextUniqueId(),m='<div id="'+k+'" style="width:100%; height:100%" />',n=b("<canvas />",{id:l}).get(0);e.build=function(){b("#"+k).html(n),a(["ChemDoodle"],function(){var a=new ChemDoodle.ViewerCanvas(l),d=b(n).parent();a.resize(d.width(),d.height()),this.canvas=a,a.specs.backgroundColor="transparent",a.specs.bonds_saturationWidth_2D=.18,a.specs.atoms_font_families_2D=["Helvetica","Arial","sans-serif"];var e=ChemDoodle.readMOL(g.value),f=(e.getDimension(),1);this.molecule=e,e.scaleToAverageBondLength(20*f),a.specs.atoms_font_size_2D=14*f,a.specs.bonds_hashSpacing_2D=2.5*f,a.specs.bonds_width_2D=1.2*f,a.specs.atoms_useJMOLColors=!0,a.loadMolecule(e),c.listenHighlight(g._highlight,function(c,d){if(0!==b("#"+k).length){for(var f,h=d.length-1;h>=0;h--)if(f=g._atoms[d[h]])for(var i=f.length-1;i>=0;i--)e.atoms[f[i]].isHover=c;n.width=n.width;for(var h=0;h<e.atoms.length;h++)e.atoms[h].drawChildExtras=e.atoms[h].isHover;a.repaint()}},!0,j.id||0)})},e.unbuild=function(){},e.getCWC=function(){return this.canvas},a(["ChemDoodle"],function(){ChemDoodle.ELEMENT.H.jmolColor="#BBBBBB",ChemDoodle.ELEMENT.S.jmolColor="#CCCC30",e.id=k,e.canvasdom=n,e.resolve(m)})},g.molfile2D=g.mol2d,g.mol3d={},g.mol3d.toscreen=function(a){var c=d.getNextUniqueId();CI.Util.DOMDeferred.progress(function(a){if(0!==b("#"+c,a).length){var d=new ChemDoodle.MolGrabberCanvas3D(c,600,400);d.specs.projectionWidthHeightRatio_3D=1.5,d.specs.set3DRepresentation("Stick"),d.setSearchTerm("penicillin"),d.handle=null,d.timeout=15,d.startAnimation=ChemDoodle._AnimatorCanvas.prototype.startAnimation,d.stopAnimation=ChemDoodle._AnimatorCanvas.prototype.stopAnimation,d.dblclick=ChemDoodle.RotatorCanvas.prototype.dblclick,d.nextFrame=function(a){var b=[];mat4.identity(b);var c=a/1e3,d=Math.PI/15;mat4.rotate(b,d*c,[1,0,0]),mat4.rotate(b,d*c,[0,1,0]),mat4.rotate(b,d*c,[0,0,1]),mat4.multiply(this.rotationMatrix,b)},d.startAnimation()}}),a.resolve('<canvas id="'+c+'"></canvas>')},g.jcamp={},g.jcamp.hexToRgb=function(a){var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return b?{r:parseInt(b[1],16),g:parseInt(b[2],16),b:parseInt(b[3],16)}:null},g.id=0,g.cache=[],g.jcamp.fromdom=function(a,b,d,e,f){var h;if(0!==a.length){if(a.data("spectra"))h=a.data("spectra");else{var h=new ChemDoodle.OverlayCanvas(a.attr("id"),d.width||300,d.height||150);h.CIOnRepaint(function(){var b=[],c=a.data("zones"),d=a.data("allspectras");if(h._highlights)for(var e in h._highlights)if(1===h._highlights[e])for(var f in c)c[f][e]&&b.push({zone:c[f][e],color:d[f].plots_color});for(var g=this.spectrum.memory,i=this._domcanvas.getContext("2d"),e=0,j=b.length;j>e;e++){var k=this.spectrum.getTransformedX(b[e].zone[0],{},g.width,g.offsetLeft),l=this.spectrum.getTransformedX(b[e].zone[1],{},g.width,g.offsetLeft);i.beginPath(),i.rect(k,0,l-k,g.height);var m=hexToRgb(b[e].color);(null===m||0===m.r&&0===m.g&&0===m.b)&&(m={r:222,g:205,b:59}),i.fillStyle="rgba("+m.r+", "+m.g+", "+m.b+", 0.5)",i.fill()}}),h.CIOnMouseMove(function(b){var c=a.data("zones");h._highlights=h._highlights||{};var d,e,f=(this.spectrum.memory,b.offsetX),g=this.spectrum.getInverseTransformedX(f);for(var i in c)for(var j in c[i])d=Math.min(c[i][j][0],c[i][j][1]),e=Math.max(c[i][j][0],c[i][j][1]),g>d&&e>g?h._highlights[j]||CI.RepoHighlight.set(j,1):1===h._highlights[j]&&CI.RepoHighlight.set(j,0)}),a.data("spectra",h),h.specs.plots_showYAxis=!0,d||(d={}),h.specs.plots_flipXAxis=d.flipX||!1,h.specs.plots_flipYAxis=d.flipY||!1}var i=d.spectraid;a.data("allspectras")||a.data("allspectras",{}),a.data("zones")||a.data("zones",{}),a.data("allspectrasid")||a.data("allspectrasid",{});var j=a.data("allspectras"),k=a.data("allspectrasid"),l=a.data("zones");if(j[i]=ChemDoodle.readJCAMP(b.value),g.jcamp.cache.push(j[i]),b._cacheId=g.jcamp.id,g.id++,100===g.jcamp.cache.length&&(g.jcamp.cache.splice(0,1),g.jcamp.id--),j[i].plots_color=d.plotcolor,j[i].continuous=d.continuous||!1,void 0===k[i]){var m=h.addSpectrum(j[i]);k[i]=m,h.getXMaxBound(),h.repaint()}else-1===k[i]?(h.loadSpectrum(j[i]),h.getXMaxBound(),h.repaint(),c.killHighlight(f.id+"_"+i)):(h.overlaySpectra[k[i]]=j[i],c.killHighlight(f.id+"_"+i));l[i]=b._zones,CI.RepoHighlight.listen(e,function(a,b){h._highlights=h._highlights||{};for(var c=0;c<b.length;c++)h._highlights[b[c]]=a;h.repaint()},!0,f.id+"_"+i)}},g.jcamp.toscreen=function(c,d,e){a(["lib/plot/plot","components/jcampconverter/src/jcampconverter"],function(a,d){var f=b("<div />").css({width:200,height:200}),g=new a(f.get(0),{closeRight:!1,closeTop:!1,zoomMode:""},{bottom:[{unitModification:!1,primaryGrid:!1,nbTicksPrimary:5,nbTicksSecondary:2,secondaryGrid:!1,axisDataSpacing:{min:0,max:0}}],left:[{ticklabelratio:1,primaryGrid:!0,nbTicksSecondary:4,secondaryGrid:!1,nbTicksPrimary:2,forcedMin:0,axisDataSpacing:{min:0,max:0}}]});g.resize(200,200),e=d.convert(e.value);var h=g.newSerie("serie",{lineToZero:!0});h.autoAxis(),h.setData(e.spectra[0].data[0]),c.resolve(g._dom),g.redraw(),g.drawSeries()})},g.mf={},g.mf.toscreen=function(a,b){return a.reject(b.replace(/\[([0-9]+)/g,"[<sup>$1</sup>").replace(/([a-zA-Z)])([0-9]+)/g,"$1<sub>$2</sub>").replace(/\(([0-9+-]+)\)/g,"<sup>$1</sup>"))},g.pdb={},g.pdb.toscreen=function(a,b){return a.resolve(b)},g.cif={},g.cif.toscreen=function(a,b){return a.resolve(b)},g.downloadLink={},g.downloadLink.toscreen=function(a,b){return a.resolve(b.replace(/^(.*)$/,'<a href="$1">⤵</a>'))},g["boolean"]={},g["boolean"].toscreen=function(a,b){a.resolve(b?'<span style="color: green;">&#10004;</span>':'<span style="color: red;">&#10008;</span>')},g.colorBar={},g.colorBar.toscreen=function(a,c){var d=b("<div>"),e="linear-gradient(to right",f=0,g=0,h=c.length;for(g=0;h>g;f+=c[g++][0]);var i,j,k=0;for(g=0;h>g;g++)i=k+c[g][0]/f*100,j=c[g][1],e+=", "+j+" "+k+"%, "+j+" "+i+"%",k=i;e+=")",d.css({height:"100%",width:"100%"}).css("background",e),a.resolve(d.get(0))},g.indicator={},g.indicator.init=function(){var a,c=b('<div class="ci-tooltip"></div>').css({display:"none",opacity:0}).appendTo("#ci-visualizer");b("#modules-grid").on("mouseenter","[data-tooltip]",function(d){a=setTimeout(function(){var a=b(d.target),e=a.offset();c.css({left:e.left,top:e.top,display:"block"}).text(a.attr("data-tooltip")),c.animate({opacity:1})},500)}),b("#modules-grid").on("mouseleave","[data-tooltip]",function(){clearTimeout(a),c.css({opacity:0,display:"none"})})},g.indicator.toscreen=function(c,d){a(["src/util/color"],function(a){Array.isArray(d)||c.reject("");var e='<table cellpadding="0" cellspacing="0" style="text-align: center; height:100%; width:100%"><tr>';isNaN(d[0])||(d=d.map(function(a){return{size:a}}));for(var f=d.length,g=a.getDistinctColors(d.length),h=0,i=0;f>i;i++)d[i].bgcolor||(d[i].bgcolor=g[i]),d[i].size||0===d[i].size||(d[i].size=10),h+=d[i].size;for(var i=0;f>i;i++)d[i].bgcolor||(d[i].bgcolor=g[i]),d[i].size||0===d[i].size||(d[i].size=10),h+=d[i].size;for(var i=0;f>i;i++){var j=d[i],k=b("<td>").css({width:100*j.size/h+"%",border:"none"});j.bgcolor&&k.css("background-color",j.bgcolor),j.color&&k.css("color",j.color),j.text&&k.append(j.text),j["class"]&&k.addClass(j["class"]),j.icon&&k.prepend('<i class="fa fa-'+j.icon+'"></i>'),j.css&&k.css(j.css),j.tooltip&&k.attr("data-tooltip",j.tooltip),e+=k.get(0).outerHTML}e+="</tr></table>",c.resolve(e)})},g.styledValue={},g.styledValue.toscreen=function(a,c,d,e,f,h,i){var j=b("<div>");j.css(c.css),g.toScreen(c.value,h,e,i).always(function(b){j.append(b),a.resolve(j.get(0))})},{toScreen:function(a,c,d,e){var g=b.Deferred();return a=DataObject.check(a,!0),e?(a.getChild(e).then(function(a){f(g,a,c,d,e)},function(){g.reject()}),g):(f(g,a,c,d,e),g)},addType:function(a,b){g[a]=b}}});