define(["modules/default/defaultview","src/util/datatraversing","src/util/api","src/util/util","lodash","threejs","src/util/debug","chroma","lib/threejs/TrackballControls"],function(a,b,c,d,e,f,g,h){function i(a){for(var b in a)f.ImageUtils.loadTexture(a[b])}function j(a,b,c){for(var d=[],e=0;a>e;e++)d.push(Math.random()*(c-b)+b);return d}function k(a,b){var c=j(b,0,a.length-.001);return c=c.map(function(b){return a[Math.floor(b)]})}function l(a){for(var b=[],c="0123456789ABCDEF".split(""),d=0;a>d;d++){for(var e="#",f=0;3>f;f++)e+=c[Math.floor(16*Math.random())];b.push(e)}return b}function m(a){var b=a.toString(16);return 1==b.length?"0"+b:b}function n(a,b,c){return"#"+m(a)+m(b)+m(c)}function o(a){return 3===a.length?"rgba("+a[0]+","+a[1]+","+a[2]+",1)":4===a.length?"rgba("+a[0]+","+a[1]+","+a[2]+","+a[3]+")":"rgba(0,0,0,1)"}function p(a,b){a=""+a;var c=a.indexOf(".");return-1===c?+a:a.slice(0,c+b+1)}function q(){this._firstLoad=!0}var r=1e3,s=100,t=3,u="#eeeeee",v="#888888",w="#FFFFFF",x=.03,y="sphere",z="rgba(0,0,0,1)",A=r/1e3,B=2,C=1e4,D=require.toUrl("modules/types/chart/basic/scatter3D")+"/",E={sphere:D+"img/ball.png",spheret:D+"img/ballt.png",tetrahedron:D+"img/tetrahedron2.png",tetrahedront:D+"img/tetrahedron2t.png",cone:D+"img/cone.png",conet:D+"img/conet.png",cube:D+"img/cube.png",cubet:D+"img/cubet.png",pyramid:D+"img/pyramid.png",pyramidt:D+"img/pyramidt.png",cylinder:D+"img/cylinder.png",cylindert:D+"img/cylindert.png",cuboid:D+"img/cuboid.png",cuboidt:D+"img/cuboidt.png"};return i(E),$.fn.listHandlers=function(a,b){return this.each(function(){var c=this,d=$(this).data("events");d&&$.each(d,function(d,e){new RegExp("^("+("*"===a?".+":a.replace(",","|").replace(/^on/i,""))+")$","i").test(d)&&$.each(e,function(a,e){b(c,"\n"+a+": ["+d+"] : "+e)})})})},q.prototype=$.extend(!0,{},a,{DEBUG:!0,_initThreejs:function(){function a(a){var b=new f.Vector3(a.offsetX/$(r.renderer.domElement).width()*2-1,2*-(a.offsetY/$(r.renderer.domElement).height())+1,.5),c=new f.Projector;c.unprojectVector(b,r.camera);for(var d=new f.Ray(r.camera.position,b.sub(r.camera.position).normalize()),g=0,h=[],i=0;i<r.mathPoints.length;i++)d.isIntersectionSphere(r.mathPoints[i])&&(g++,h.push({index:r.mathPoints[i].index,distance:r.camera.position.distanceTo(r.mathPoints[i].center)}));return h.sort(E),h=e.filter(h,function(a){return a.distance>B}),h=e.map(h,function(a){return a.index})}function b(a){if(r._configCheckBox("displayPointCoordinates","onhover")){var b=[];b.push("X: "+parseFloat(r._data.x[a].toPrecision(3)).toExponential()),b.push("Y: "+parseFloat(r._data.y[a].toPrecision(3)).toExponential()),b.push("Z: "+parseFloat(r._data.z[a].toPrecision(3)).toExponential());var c=$("#legend_point_coordinates");c.html(b.join("<br/>")),c.show()}}function d(){r._configCheckBox("displayPointCoordinates","onhover")&&$("#legend_point_coordinates").hide()}function g(e){var f;if(f=a(e),t=f,v=e,f.length>0){var g=f[0],h=g,i=h!==w;w&&i?(c.highlightId(r._data._highlight[w],0),c.highlightId(r._data._highlight[h],1),b(g)):i&&(c.highlightId(r._data._highlight[h],1),b(g)),w=h}else null!==w&&(c.highlightId(r._data._highlight[w],0),d()),w=null}function h(){if(0!==t.length){var a=r.module.getConfiguration("tooltipJpath");if(a){var b=r._data;if(b.info){var c=b.info[t[0]],d=c.getChildSync(a),e=$("#scatter3D_tooltip");e.css("left",v.offsetX-s),e.css("top",v.offsetY),e.css("width",s),e.html(d.value),e.show()}}}}function i(){$("#scatter3D_tooltip").hide()}function j(){if(0!==t.length){var a=t[0];D.length>0&&k();var b={color:8947848},c=new f.Vector3(r._data.normalizedData.x[a],r._data.normalizedData.y[a],r._data.normalizedData.z[a]),d=new f.Vector3(r._data.normalizedData.x[a],r._data.normalizedData.y[a],0);D.push(r._drawLine(c,d,b)),D.push(r._drawCircle({color:"#000000",radius:r._data.size[a],x:r._data.normalizedData.x[a],y:r._data.normalizedData.y[a],z:A+r.gorigin.z})),d=new f.Vector3(r._data.normalizedData.x[a],0,r._data.normalizedData.z[a]),D.push(r._drawLine(c,d,b)),D.push(r._drawCircle({rotationAngle:Math.PI/2,rotationAxis:{x:1},color:"#000000",radius:r._data.size[a],x:r._data.normalizedData.x[a],y:A+r.gorigin.y,z:r._data.normalizedData.z[a]})),d=new f.Vector3(0,r._data.normalizedData.y[a],r._data.normalizedData.z[a]),D.push(r._drawLine(c,d,b)),D.push(r._drawCircle({rotationAngle:Math.PI/2,rotationAxis:{y:1},color:"#000000",radius:r._data.size[a],x:A+r.gorigin.x,y:r._data.normalizedData.y[a],z:r._data.normalizedData.z[a]})),p()}}function k(){for(var a=0;a<D.length;a++)r.scene.remove(D[a]);D=[],p()}function l(){function a(){if(t.length>0){var a=t[0];r.module.controller.onHover(a)}}r.camera=r.camera||new f.PerspectiveCamera(60,r.dom.width()/r.dom.height(),B,C),r.controls||(r.controls=new f.TrackballControls(r.camera,r.dom.get(0)),r.controls.rotateSpeed=1,r.controls.zoomSpeed=1.2,r.controls.panSpeed=.8,r.controls.noZoom=!1,r.controls.noPan=!1,r.controls.staticMoving=!0,r.controls.dynamicDampingFactor=.3,r.controls.keys=[65,83,68],r.controls.addEventListener("change",p)),r.scene=new f.Scene,r.renderer=new f.WebGLRenderer({antialias:!1});var b=r.module.getConfiguration("backgroundColor");r.renderer.setClearColor(n(b[0],b[1],b[2])||u,1),r.renderer.setSize(window.innerWidth,window.innerHeight),q=document.getElementById(r.dom.attr("id")),q.innerHTML="",q.appendChild(r.renderer.domElement),$(r.dom).append('<div id="scatter3D_tooltip" style="z-index: 10000; position:absolute; top: 20px; width:'+s+'100px; height: auto; background-color: #f9edbe;"> </div>'),$("#scatter3D_tooltip").hide(),$(r.dom).append('<div id="legend" style="z-index: 10000; right:10px ;position:absolute; top: 25px; height: auto; background-color: #ffffff;"> </div>');var c=$("#legend");c.append('<div id="legend_titles"></div>'),c.append('<div id="legend_point_coordinates"></div>'),c.css("background-color",r.module.getConfiguration("backgroundColor")).css("text-align","right"),$("#legend_titles").hide(),$("#legend_point_coordinates").hide(),m(),$(r.renderer.domElement).on("mousemove",e.throttle(g,100)),$(r.renderer.domElement).on("mousemove",e.throttle(a,300)),r._configCheckBox("tooltip","show")&&($(r.renderer.domElement).on("mousemove",e.debounce(h,500)),$(r.renderer.domElement).on("mousemove",e.throttle(i,500))),r._configCheckBox("projection","show")&&($(r.renderer.domElement).on("mousemove",e.debounce(j,500)),$(r.renderer.domElement).on("mousemove",e.throttle(k,500))),$(r.renderer.domElement).listHandlers("mousemove",function(a,b){console.log("handler list: ",a,b)})}function m(){r.camera.aspect=r.dom.width()/r.dom.height(),r.camera.updateProjectionMatrix(),r.renderer.setSize(r.dom.width(),r.dom.height()),r.controls.handleResize(),p()}function o(){requestAnimationFrame(o),r.controls.update()}function p(){r._render(),r.headlight&&(r.headlight.position.x=r.camera.position.x+200,r.headlight.position.y=r.camera.position.y+200,r.headlight.position.z=r.camera.position.z+200),r.tickLabels&&(x(),y(),z())}var q,r=this,t=[],v=null,w=null,x=$.proxy(e.throttle(r._drawTickLabels,500),r),y=$.proxy(e.throttle(r._drawAxisLabels,500),r),z=$.proxy(e.throttle(r._drawGraphTitle,500),r),D=[];l(),o();var E=function(a,b){return a.distance-b.distance}},_drawGraph:function(){var a=this;e.keys(a.scene.children).forEach(function(b){a.scene.remove(a.scene.children[b])});var b;b=new f.AmbientLight(2236962,1),a.scene.add(b),a.headlight=new f.PointLight(11184810,1.5),a.headlight.position.set(1e3,1e3,1e3),a.scene.add(a.headlight),a._mathPoints(),a._drawPointsQuick(),a._drawAxes(),a._drawFaces(),a._drawGrid(),a._drawSecondaryGrid(),a._drawTicks(),a._drawTickLabels(),a._drawAxisLabels(),a._drawGraphTitle(),a._render()},_drawPointsQuick:function(){var a=this;if(a._mainParticleObjects)for(var b in a._mainParticleObjects)a.scene.remove(a._mainParticleObjects[b]);a._mainParticleObjects={};for(var c={},d=0;d<a._data.shape.length;d++)c[a._data.shape[d]]=c[a._data.shape[d]]||[],c[a._data.shape[d]].push(d);for(var b in c)a._mainParticleObjects[b]=a._newParticleObject(c[b],{shape:b}),a._updateParticleObject(a._mainParticleObjects[b]),a.scene.add(a._mainParticleObjects[b]);a.renderer.render(a.scene,a.camera)},_configCheckBox:function(a,b){return this.module.getConfiguration(a)&&e.find(this.module.getConfiguration(a),function(a){return a===b})},_getDataField:function(a){return this._data?e.flatten(e.pluck(this._data.data,a)):[]},_normalizeData:function(){var a=this;if(this._data){a._data.normalizedData={},a._data.normalizedData.x=e.map(a._data.x,function(b){return r*(b-a._data.realMin.x)/a._data.realLen.x}),a._data.normalizedData.y=e.map(a._data.y,function(b){return r*(b-a._data.realMin.y)/a._data.realLen.y}),a._data.normalizedData.z=e.map(a._data.z,function(b){return r*(b-a._data.realMin.z)/a._data.realLen.z});var b=this.module.getConfiguration("sizeNormalization"),c=Math.min.apply(null,a._data.size),d=Math.max.apply(null,a._data.size),f=d-c;if(a._data.size=e.map(a._data.size,function(a){return 0===f?b/2:b*(a-c)/f}),e.all(a._data.color,e.isNumber)){var g=Math.min.apply(null,a._data.color),i=Math.max.apply(null,a._data.color),j=i-g;a._data.color=e.map(a._data.color,function(a){var b=0===j?180:360*(a-g)/j,c=h("hsl("+b+", 65%, 65%)");return c.hex()})}}},_computeMinMax:function(){var a=this;if(a._data){a.minMax={};var b=a._data.x,c=a._data.y,d=a._data.z;a._data.min={},a._data.max={},a._data.len={},a._data.min.x=parseFloat(a.module.getConfiguration("minX"))||Math.min.apply(null,b),a._data.min.y=parseFloat(a.module.getConfiguration("minY"))||Math.min.apply(null,c),a._data.min.z=parseFloat(a.module.getConfiguration("minZ"))||Math.min.apply(null,d),a._data.max.x=parseFloat(a.module.getConfiguration("maxX"))||Math.max.apply(null,b),a._data.max.y=parseFloat(a.module.getConfiguration("maxY"))||Math.max.apply(null,c),a._data.max.z=parseFloat(a.module.getConfiguration("maxZ"))||Math.max.apply(null,d),a._data.len.x=a._data.max.x-a._data.min.x,a._data.len.y=a._data.max.y-a._data.min.y,a._data.len.z=a._data.max.z-a._data.min.z}},_getUnitPerTick:function(a,b,c,d){var e=this;b=b?Math.min(b,a/10):a/10;for(var f=c/b,g=Math.floor(Math.log(f)/Math.log(10)),h=f*Math.pow(10,-g),i=[1,2,5,10],j=!1,k=i.length-1;k>=0;k--)(!j||Math.abs(i[k]-h)<Math.abs(j-h))&&(j=i[k]);var l=j*Math.pow(10,g),m=c/l;e._data.realMin[d]=Math.floor(e._data.min[d]/l)*l,e._data.realMax[d]=Math.ceil(e._data.max[d]/l)*l,e._data.realMin[d]!==e._data.min[d]&&m++,e._data.realMax[d]!==e._data.max[d]&&m++,e._data.intervalVal[d]=l,e._data.realLen[d]=e._data.realMax[d]-e._data.realMin[d],e._data.nbTicks[d]=Math.round((e._data.realMax[d]-e._data.realMin[d])/e._data.intervalVal[d]+1),e._data.intervalPx[d]=r/(e._data.nbTicks[d]-1),e._data.decimals[d]=g;var n=Math.floor(Math.log(l)/Math.log(10));e._data.intervalFactor[d]=Math.abs(n)<=1?1:Math.pow(10,n)},_computeTickInfo:function(){var a=this;a._data.realMin={},a._data.realMax={},a._data.realLen={},a._data.intervalPx={},a._data.nbTicks={},a._data.intervalVal={},a._data.decimals={},a._data.intervalFactor={},a._getUnitPerTick(r,3,a._data.len.x,"x"),a._getUnitPerTick(r,3,a._data.len.y,"y"),a._getUnitPerTick(r,3,a._data.len.z,"z")},_drawAxes:function(){var a=this;if(a._data){a._reinitObject3DArray("axes");var b=new f.Vector3(1,0,0),c=new f.Vector3(0,1,0),d=new f.Vector3(0,0,-1),e=(new f.Vector3(0,0,0),0),g=new f.ArrowHelper(b,new f.Vector3(0,0,r),r,e,1,1),h=new f.ArrowHelper(c,new f.Vector3(0,0,r),r,e,1,1),i=new f.ArrowHelper(d,new f.Vector3(r,0,r),r,e,1,1);a.axes.push(g,h,i),this.scene.add(g),this.scene.add(h),this.scene.add(i)}},_drawCircle:function(a){var a=a||{},b=new f.Shape,c=a.radius||x;c*=r;for(var d=0;16>d;d++){var e=(d+1)/16,g=e*Math.PI*2,h=c*Math.cos(g),i=c*Math.sin(g);0==d?b.moveTo(h,i):b.lineTo(h,i)}var j=b.makeGeometry(),k=new f.MeshBasicMaterial({color:a.color||v,side:f.DoubleSide}),l=new f.Mesh(j,k),m=new f.Matrix4,n=new f.Matrix4;return a.rotationAxis&&m.makeRotationAxis(new f.Vector3(a.rotationAxis.x||0,a.rotationAxis.y||0,a.rotationAxis.z||0),a.rotationAngle||0),n.makeTranslation(a.x||0,a.y||0,a.z||0),n.multiplyMatrices(n,m),l.applyMatrix(n),this.scene.add(l),l},_drawLine:function(a,b,c){c=c||{};var d=this,e=new f.LineBasicMaterial({color:c.color||0}),g=new f.Geometry;g.vertices.push(a),g.vertices.push(b);var h=new f.Line(g,e);return d.scene.add(h),h},_reinitObject3DArray:function(a){this[a]=this[a]||[];for(var b=0;b<this[a].length;b++)this.scene.remove(this[a][b]);this[a]=[]},_setGridOrigin:function(){var a=this;a.gorigin={},a.gorigin.x=parseFloat(a.module.getConfiguration("gridOriginX")||a._data.realMin.x),a.gorigin.y=parseFloat(a.module.getConfiguration("gridOriginY")||a._data.realMin.y),a.gorigin.z=parseFloat(a.module.getConfiguration("gridOriginZ")||a._data.realMin.z),a.gorigin.x=r*(a.gorigin.x-a._data.realMin.x)/a._data.realLen.x,a.gorigin.y=r*(a.gorigin.y-a._data.realMin.y)/a._data.realLen.y,a.gorigin.z=r*(a.gorigin.z-a._data.realMin.z)/a._data.realLen.z},_drawSecondaryGrid:function(){var a=this;a._reinitObject3DArray("secondaryGrid");for(var b={color:8947848},c=a.module.getConfiguration("secondaryGrids")||2,d=0;d<a._data.nbTicks.x-1;d++)for(var e=1;c>e;e++)this._configCheckBox("grid","xysec")&&a.secondaryGrid.push(a._drawLine(new f.Vector3(a._data.intervalPx.x*d+a._data.intervalPx.x/c*e,0,A+a.gorigin.z),new f.Vector3(a._data.intervalPx.x*d+a._data.intervalPx.x/c*e,r,A+a.gorigin.z),b)),this._configCheckBox("grid","xzsec")&&a.secondaryGrid.push(a._drawLine(new f.Vector3(a._data.intervalPx.x*d+a._data.intervalPx.x/c*e,A+a.gorigin.y,0),new f.Vector3(a._data.intervalPx.x*d+a._data.intervalPx.x/c*e,A+a.gorigin.y,r),b));for(var d=0;d<a._data.nbTicks.y-1;d++)for(var e=1;c>e;e++)this._configCheckBox("grid","yzsec")&&a.secondaryGrid.push(a._drawLine(new f.Vector3(A+a.gorigin.x,a._data.intervalPx.y*d+a._data.intervalPx.y/c*e,0),new f.Vector3(A+a.gorigin.x,a._data.intervalPx.y*d+a._data.intervalPx.y/c*e,r),b)),this._configCheckBox("grid","xysec")&&a.secondaryGrid.push(a._drawLine(new f.Vector3(0,a._data.intervalPx.y*d+a._data.intervalPx.y/c*e,A+a.gorigin.z),new f.Vector3(r,a._data.intervalPx.y*d+a._data.intervalPx.y/c*e,A+a.gorigin.z),b));for(var d=0;d<a._data.nbTicks.z-1;d++)for(var e=1;c>e;e++)this._configCheckBox("grid","yzsec")&&a.secondaryGrid.push(a._drawLine(new f.Vector3(A+a.gorigin.x,0,a._data.intervalPx.z*d+a._data.intervalPx.z/c*e),new f.Vector3(A+a.gorigin.x,r,a._data.intervalPx.z*d+a._data.intervalPx.z/c*e),b)),this._configCheckBox("grid","xzsec")&&a.secondaryGrid.push(a._drawLine(new f.Vector3(0,A+a.gorigin.y,a._data.intervalPx.z*d+a._data.intervalPx.z/c*e),new f.Vector3(r,A+a.gorigin.y,a._data.intervalPx.z*d+a._data.intervalPx.z/c*e),b))},_drawGrid:function(){var a=this;a._reinitObject3DArray("grid");for(var b=0;b<a._data.nbTicks.x;b++)this._configCheckBox("grid","xy")&&a.grid.push(a._drawLine(new f.Vector3(a._data.intervalPx.x*b,0,A+a.gorigin.z),new f.Vector3(a._data.intervalPx.x*b,r,A+a.gorigin.z))),this._configCheckBox("grid","xz")&&a.grid.push(a._drawLine(new f.Vector3(a._data.intervalPx.x*b,A+a.gorigin.y,0),new f.Vector3(a._data.intervalPx.x*b,A+a.gorigin.y,r)));for(var b=0;b<a._data.nbTicks.y;b++)this._configCheckBox("grid","yz")&&a.grid.push(a._drawLine(new f.Vector3(A+a.gorigin.x,a._data.intervalPx.y*b,0),new f.Vector3(A+a.gorigin.x,a._data.intervalPx.y*b,r))),this._configCheckBox("grid","xy")&&a.grid.push(a._drawLine(new f.Vector3(0,a._data.intervalPx.y*b,A+a.gorigin.z),new f.Vector3(r,a._data.intervalPx.y*b,A+a.gorigin.z)));for(var b=0;b<a._data.nbTicks.z;b++)this._configCheckBox("grid","yz")&&a.grid.push(a._drawLine(new f.Vector3(A+a.gorigin.x,0,a._data.intervalPx.z*b),new f.Vector3(A+a.gorigin.x,r,a._data.intervalPx.z*b))),this._configCheckBox("grid","xz")&&a.grid.push(a._drawLine(new f.Vector3(0,A+a.gorigin.y,a._data.intervalPx.z*b),new f.Vector3(r,A+a.gorigin.y,a._data.intervalPx.z*b)))},_drawTicks:function(){var a=this;if(a._reinitObject3DArray("ticks"),a._configCheckBox("ticks","x"))for(var b=0;b<a._data.nbTicks.x;b++)a.ticks.push(a._drawLine(new f.Vector3(a._data.intervalPx.x*b,0,r),new f.Vector3(a._data.intervalPx.x*b,0,1.05*r)));if(a._configCheckBox("ticks","y"))for(var b=0;b<a._data.nbTicks.y;b++)a.ticks.push(a._drawLine(new f.Vector3(0,a._data.intervalPx.y*b,r),new f.Vector3(-.05*r,a._data.intervalPx.y*b,r)));if(a._configCheckBox("ticks","z"))for(var b=0;b<a._data.nbTicks.z;b++)a.ticks.push(a._drawLine(new f.Vector3(r,0,a._data.intervalPx.z*b),new f.Vector3(1.05*r,0,a._data.intervalPx.z*b)))},_addText:function(a,b,c,d,e){var g=this,e=e||{};e.size=e.size||50,e.fillStyle=e.fillStyle||o(g.module.getConfiguration("annotationColor"))||z,e.textAlign=e.textAlign||"left",e.font=e.font||"Arial",e.opacity=e.opacity||.99;var h=document.createElement("canvas");switch(h.height=1.2*e.size,h.width=e.size*a.length/2+e.size/2,e.textAlign){case"left":b+=h.width/2;break;case"right":b-=h.width/2}var i=h.getContext("2d");i.font="Bold "+e.size+"px "+e.font,i.fillStyle=e.fillStyle,i.fillText(a,0,e.size);var j=new f.Texture(h);j.needsUpdate=!0;var k=new f.MeshBasicMaterial({map:j,transparent:1===e.opacity?!1:!0,opacity:e.opacity}),l=new f.Mesh(new f.PlaneGeometry(h.width,h.height),k),m=g.camera.matrix.clone();return m.setPosition(new f.Vector3(0,0,0)),l.applyMatrix(m),l.position.set(b,c,d),l.castShadow=!1,l.receiveShadow=!1,g.scene.add(l),l},_drawTickLabels:function(){var a=this;if(a._reinitObject3DArray("tickLabels"),a._configCheckBox("ticks","zlab"))for(var b=0;b<a._data.nbTicks.z;b++){var c=p((a._data.realMin.z+b*a._data.intervalVal.z)/a._data.intervalFactor.z,2).toString();a.tickLabels.push(a._addText(c,1.1*r,0,b*a._data.intervalPx.z,{textAlign:"left"}))}if(a._configCheckBox("ticks","ylab"))for(var b=0;b<a._data.nbTicks.y;b++){var c=p((a._data.realMin.y+b*a._data.intervalVal.y)/a._data.intervalFactor.y,2).toString();a.tickLabels.push(a._addText(c,-.05*r,b*a._data.intervalPx.y,r,{textAlign:"right"}))}if(a._configCheckBox("ticks","xlab"))for(var b=0;b<a._data.nbTicks.x;b++){var c=p((a._data.realMin.x+b*a._data.intervalVal.x)/a._data.intervalFactor.x,2).toString();a.tickLabels.push(a._addText(c,b*a._data.intervalPx.x,0,1.1*r,{textAlign:"right"}))}},_drawGraphTitle:function(){var a=this;a._reinitObject3DArray("graphTitle");var b=a.module.getConfiguration("labels"),c=a._meta.title||"";if(c&&""!==c)switch(b){case"none":return;default:a.graphTitle.push(a._addText(c,r/10,1.3*r,100,{textAlign:"left"}))}},_drawAxisLabels:function(){function a(a,b,c){var d=[];d.push("X: "+a),d.push("Y: "+b),d.push("Z: "+c),$("#legend_titles").html(d.join("<br/>"))}function b(a,b,d){e.tickLabels.push(e._addText(c(a,"x"),r/2,0,1.4*r,{textAlign:"right"})),e.tickLabels.push(e._addText(c(b,"y"),-.4*r,r/2,r,{textAlign:"right"})),e.tickLabels.push(e._addText(c(d,"z"),1.4*r,0,r/2,{textAlign:"left"}))}function c(a,b){return 1===e._data.intervalFactor[b]?a:e._data.intervalFactor[b]>1?a+" (× 10"+d(Math.round(Math.log(e._data.intervalFactor[b])/Math.LN10))+")":a+" (× 10"+d("-"+-Math.round(Math.log(e._data.intervalFactor[b])/Math.LN10))+")"}function d(a){a=a.toString();for(var b="",c=0;c<a.length;c++)"2"===a[c]||"3"===a[c]?b+=String.fromCharCode(176+parseInt(a[c])):a[c]>="0"&&a[c]<"9"?b+=String.fromCharCode(8304+parseInt(a[c])):"-"===a[c]&&(b+=String.fromCharCode(8315));return b}var e=this;e._reinitObject3DArray("axisLabels");var f=e.module.getConfiguration("labels"),g=e._data.xAxis?e._data.xAxis:null,h=e._data.yAxis?e._data.xAxis:null,i=e._data.yAxis?e._data.xAxis:null,j=g&&e._meta.axis&&e._meta.axis[g]?e._meta.axis[g].name:"X",k=h&&e._meta.axis&&e._meta.axis[h]?e._meta.axis[h].name:"Y",l=i&&e._meta.axis&&e._meta.axis[i]?e._meta.axis[i].name:"Z";switch(f){case"axis":b(j,k,l),$("#legend_titles").hide();break;case"alegend":b("X","Y","Z"),a(j,k,l),$("#legend_titles").show();break;case"both":b(j,k,l),a(j,k,l),$("#legend_titles").show();break;default:return}},_drawFaces:function(){var a=this;if(a._data){a._reinitObject3DArray("faces");var b,c,d,e=new f.PlaneGeometry(r,r),g=new f.PlaneGeometry(r,r),h=new f.PlaneGeometry(r,r),i=new f.PlaneGeometry(r,r),j=new f.PlaneGeometry(r,r),k=new f.PlaneGeometry(r,r),l=new f.MeshBasicMaterial({color:16777215,side:f.DoubleSide,transparent:!0,opacity:.6}),m=new f.Mesh(e,l),n=new f.Mesh(g,l),o=new f.Mesh(h,l),p=new f.Mesh(i,l),q=new f.Mesh(j,l),s=new f.Mesh(k,l);b=new f.Matrix4,c=new f.Matrix4,d=new f.Matrix4,b.makeTranslation(r/2,r/2,a.gorigin.z),c.makeTranslation(0,0,r/2),m.applyMatrix(b),c.multiplyMatrices(b,c),p.applyMatrix(c),b=new f.Matrix4,c=new f.Matrix4,d=new f.Matrix4,b.makeRotationY(Math.PI/2),c.makeTranslation(-r/2,r/2,a.gorigin.x),c.multiplyMatrices(b,c),d.makeTranslation(0,0,r),n.applyMatrix(c),d.multiplyMatrices(c,d),q.applyMatrix(d),b=new f.Matrix4,c=new f.Matrix4,d=new f.Matrix4,b.makeRotationX(Math.PI/2),c.makeTranslation(r/2,r/2,-a.gorigin.y),c.multiplyMatrices(b,c),o.applyMatrix(c),d.makeTranslation(0,0,-r),d.multiplyMatrices(c,d),s.applyMatrix(d),p.visible=!1,q.visible=!1,s.visible=!1,a.faces.push(m),a.faces.push(n),a.faces.push(o);for(var t=0;t<a.faces.length;t++)a.scene.add(a.faces[t])}},_inBoundary:function(a){var b=this;return e.isObject(a)?a.x<b._data.realMin.x||a.x>b._data.realMax.x?!1:a.y<b._data.realMin.y||a.y>b._data.realMax.y?!1:a.z<b._data.realMin.z||a.z>b._data.realMax.z?!1:!0:e.isArray(a)?b._inBoundary({x:a[0],y:a[1],z:a[2]}):!1},_computeInBoundaryIndexes:function(){var a=this;a._data.inBoundary=[];for(var b=0;b<a._data.x.length;b++)a._data.inBoundary.push(a._inBoundary({x:a._data.x[b],y:a._data.y[b],z:a._data.z[b]})?!0:!1)},_mathPoints:function(){var a=this;if(a._data){a.mathPoints=[];for(var b=0;b<a._data.x.length;b++)if(a._data.inBoundary[b]){var c=x;a._data.size&&a._data.size[b]&&(c=a._data.size[b]);var d=new f.Sphere(new f.Vector3(a._data.normalizedData.x[b],a._data.normalizedData.y[b],a._data.normalizedData.z[b]),c*r);d.index=b,a.mathPoints.push(d)}}},_updateMathPoints:function(a){var b,c=this;if(a.applyFilter){b=c._data.inBoundary.slice(0);for(var d=0;d<c._dispFilter.length;d++)b[d]=c._dispFilter[d]&&b[d]}else b=c._data.inBoundary;for(var d=0;d<c._data.x.length;d++)c.mathPoints[d].radius=b[d]?c._data.size[d]*r:0},_zoomToFit:function(){var a=this,b=Math.PI/3,c=Math.PI/4,d=r*t,e=this._polarToCartesian(b,c,d),g=new f.Vector3(r/2,r/2,r/2);a.camera.position.set(e[0],e[1],e[2]),a.camera.lookAt(g)},_polarToCartesian:function(a,b,c){var d=Math.sin(b)*Math.cos(a)*c,e=Math.sin(b)*Math.sin(a)*c,f=Math.cos(b)*c;return[d,e,f]},init:function(){this.dom||(this._id=d.getNextUniqueId(),this.dom=$(' <div id="'+this._id+'"></div>').css({height:"100%",width:"100%",overflow:"hidden"}),this.module.getDomContent().html(this.dom)),this.loadedData=$.Deferred(),this.resolveReady()},onResize:function(){var a=this;this.loadedData.done(function(){a._firstLoad?(a._initThreejs(),a._activateHighlights(),a._zoomToFit(),a._firstLoad=!1):(a.camera.aspect=a.dom.width()/a.dom.height(),a.camera.updateProjectionMatrix(),a.renderer.setSize(a.dom.width(),a.dom.height()),a.controls.handleResize(),a._render(),a.headlight&&(a.headlight.position.x=a.camera.position.x+200,a.headlight.position.y=a.camera.position.y+200,a.headlight.position.z=a.camera.position.z+200),a.tickLabels&&(a._drawTickLabels(),a._drawAxisLabels(),a._drawGraphTitle())),a._data&&a._drawGraph()})},_newParticleObject:function(a,b){var c=this;b=b||{};var d=E[b.shape]||E[y];b.transparent&&(d=d.replace(/\.(png|svg|jpeg|jpg|gif)$/i,"t.$1"));var e={size:{type:"f",value:[]},ca:{type:"c",value:[]}},g={amplitude:{type:"f",value:1},color:{type:"c",value:new f.Color("#ffffff")},texture:{type:"t",value:f.ImageUtils.loadTexture(d)}},h=new f.ShaderMaterial({uniforms:g,attributes:e,vertexShader:"			attribute float size;			attribute vec4 ca;			varying vec4 vColor;			void main() {				vColor = ca;				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );				gl_PointSize = size * ( 1.0 / length( mvPosition.xyz ) );				gl_Position = projectionMatrix * mvPosition;			}",fragmentShader:"uniform vec3 color;			uniform sampler2D texture;			varying vec4 vColor;			void main() {				vec4 outColor = texture2D( texture, gl_PointCoord );				if ( outColor.a < 0.5 ) discard;				gl_FragColor = outColor * vec4( color * vColor.xyz, 1.0 );				float depth = gl_FragCoord.z / gl_FragCoord.w;				const vec3 fogColor = vec3( 0.0 );				float fogFactor = smoothstep( 0.0, 10000.0, depth );				gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );			}",transparent:!0}),i=new f.Geometry;if(a)for(var j=0;j<a.length;j++){var k=new f.Vector3;k.x=c._data.normalizedData.x[a[j]],k.y=c._data.normalizedData.y[a[j]],k.z=c._data.normalizedData.z[a[j]],i.vertices.push(k)}else for(var j=0;j<c._data.normalizedData.x.length;j++){var k=new f.Vector3;k.x=c._data.normalizedData.x[j],k.y=c._data.normalizedData.y[j],k.z=c._data.normalizedData.z[j],i.vertices.push(k)}var l=new f.PointCloud(i,h);return l.indexes=a,l},_updateParticleObject:function(a,b){if(a){var c=this;b=b||{};var d,e=a.indexes,g=a.geometry.vertices,h=a.material.attributes.size.value,i=a.material.attributes.ca.value,j=c._data.color,k=c._data.size,l=2.2388*(b.sizeFactor||1)*r*c.dom.height(),m=b.forcedColor?new f.Color(b.forcedColor):null,n=b.updateColor||!0;if(b.applyFilter){d=c._data.inBoundary.slice(0);for(var o=0;o<c._dispFilter.length;o++)d[o]=c._dispFilter[o]&&d[o]}else d=c._data.inBoundary;if(e)for(var p=0;p<g.length;p++)h[p]=d[e[p]]?(k[e[p]]||x)*l:-1,m?i[p]=m:n&&(i[p]=new f.Color(j[e[p]]||w));else for(var p=0;p<g.length;p++)h[p]=d[p]?(k[p]||x)*l:0,m?i[p]=m:n&&(i[p]=new f.Color(j[p]||w));a.material.attributes.size.needsUpdate=!0,a.material.attributes.ca.needsUpdate=!0}},_prepareHighlights:function(a){var b=this;b._highlightParticleObjects={};for(var c={},d=0;d<a.length;d++)c[b._data.shape[d]]=c[b._data.shape[d]]||{},c[b._data.shape[d]][a[d]]=c[b._data.shape[d]][a[d]]||[],c[b._data.shape[d]][a[d]].push(d);for(var e in c)for(var f in c[e])b._highlightParticleObjects[e]=b._highlightParticleObjects[e]||{},b._highlightParticleObjects[e][f]=b._newParticleObject(c[e][f],{shape:e||y,transparent:!0});b.renderer.render(b.scene,b.camera)},update:{chart:function(a){return this.module.data=a,a.get()?(this._convertChartToData(a.get()),this._computeMinMax(),this._computeTickInfo(),this._computeInBoundaryIndexes(),this._normalizeData(),this._setGridOrigin(),this._updateChartData(),this._firstLoad||this._activateHighlights(),void("pending"===this.loadedData.state()?this.loadedData.resolve():this._drawGraph())):void console.error("Unvalid value",a)},data3D:function(a){return this.module.data=a,a&&a.get()?(this._convertData3dToData(a),this._computeMinMax(),this._computeTickInfo(),this._computeInBoundaryIndexes(),this._normalizeData(),this._setGridOrigin(),this._updateChartData(),this._firstLoad||this._activateHighlights(),void("pending"===this.loadedData.state()?this.loadedData.resolve():this._drawGraph())):void g.error("Unvalid value"+a)},boolArray:function(a){if(this._data&&this._mainParticleObjects){var b=this;if(!a||!a.get())return void console.error("Unvalid value boolArray",a);b._dispFilter=a.get();for(var c in b._mainParticleObjects)b._updateParticleObject(b._mainParticleObjects[c],{applyFilter:!0,updateColor:!1});b._updateMathPoints({applyFilter:!0});for(var c in b._highlightParticleObjects)for(var d in b._highlightParticleObjects[c])b._updateParticleObject(b._highlightParticleObjects[c][d],{applyFilter:!0,updateColor:!1,sizeFactor:1.35});b.renderer.render(b.scene,b.camera)}}},_render:function(){var a=this;setTimeout(function(){a.renderer.render(a.scene,a.camera,0)},20)},_convertData3dToData:function(a){function b(a){return e.isObject(a)||e.isArray(a)?null:a}function c(a,c,d){var e=a.getChildSync(c);return e?b(e.get()):d}var d=this;Array.isArray(a)&&0!==a.length||console.error("Data 3D not valid"),d._data={};var f=d.module.getConfiguration("dataJpaths");d._data.x=[],d._data.y=[],d._data.z=[],d._data.size=[],d._data.color=[],d._data.shape=[],d._data._highlight=[];var g=e.cloneDeep(f);e.each(g,function(a){a.unshift(0)});for(var h=0;h<a.length;h++)e.each(g,function(a){a[0]=h}),d._data.x.push(c(a,g.x,0)),d._data.y.push(c(a,g.y,0)),d._data.z.push(c(a,g.z,0)),d._data.color.push(c(a,g.color,w)),d._data.size.push(c(a,g.size,x)),d._data.shape.push(c(a,g.shape,y));d._meta={},d._data.x=d._data.x||[],d._data.y=d._data.y||[],d._data.z=d._data.z||[],d._data._highlight=e.pluck(a,"_highlight"),e.any(d._data._highlight)||(d._data._highlight=[]),d._dispFilter=d._dispFilter||[]},_convertChartToData:function(a){this._data={},this._meta={};var b=this;if(Array.isArray(a.data)&&a.data[0]&&Array.isArray(a.data[0].y)){a.data.length>0&&g.warn("Scatter 3D module will merge series together");for(var c=0;c<a.data.length;c++)e.keys(a.data[c]).forEach(function(d){Array.isArray(a.data[c][d])?(b._data[d]=b._data[d]||[],b._data[d].push(a.data[c][d]),b._data[d]=e.flatten(b._data[d],!0)):b._data[d]=a.data[c][d],e.filter(b._data[d],function(a){return void 0!==a})});e.keys(a).forEach(function(c){"data"!==c&&(b._meta[c]=a[c])}),b._dispFilter=b._dispFilter||[];var d=1e3;b._data.x=j(d,0,5),b._data.y=j(d,0,5),b._data.z=j(d,0,5),b._data.size=j(d,.01,.02),b._data.color=l(d),b._data._highlight=k(["A","B","C","D"],d)}},_completeDataInfo:function(a,b){var c=this;c._data[a]=c._data[a]||[];for(var d=0;d<c._data.x.length;d++)c._data[a][d]||(c._data[a][d]=b)},_updateChartData:function(){this._completeDataInfo("size",x),this._completeDataInfo("color",w),this._completeDataInfo("shape",y)},_activateHighlights:function(){function a(a){f._prepareHighlights(a);var g=e.uniq(a);e.keys(g).forEach(function(a){g[a]&&c.listenHighlight({_highlight:g[a]},function(a,c){a?d(c):b(c)})})}function b(a){var b=!1;for(var c in f._highlightParticleObjects)f._highlightParticleObjects[c][a]&&f._highlightParticleObjects[c][a].drawn&&(f.scene.remove(f._highlightParticleObjects[c][a]),f._highlightParticleObjects[c][a].drawn=!1,b=!0);b&&f._render()}function d(a){for(var b in f._highlightParticleObjects)if(f._highlightParticleObjects[b][a]){if(f._highlightParticleObjects[b][a].drawn===!0)return;f.scene.add(f._highlightParticleObjects[b][a]),f._highlightParticleObjects[b][a].drawn=!0,f._updateParticleObject(f._highlightParticleObjects[b][a],{updateColor:!0,sizeFactor:1.35,transparent:!0}),f._render()}}var f=this;f._data&&(c.killHighlight(f.module.getId()),f._data._highlight&&a(f._data._highlight))},updateOptions:function(){this._options={grid:{clickable:!0,hoverable:!0},series:{pie:{show:!0}}}}}),q});