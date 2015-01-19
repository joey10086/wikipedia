define(["modules/default/defaultcontroller"],function(a){function b(){}function c(a){return function(b){return b.indexOf(a)>-1}}function d(a){return a=parseFloat(a),isNaN(a)?null:a}return b.prototype=$.extend(!0,{},a),b.prototype.moduleInformation={moduleName:"Plotter",description:"Displays a plot, either data or jcamp",author:"Norman Pellet",date:"24.12.2013",license:"MIT",cssClass:"spectra_displayer"},b.prototype.references={x:{label:"X position",type:"number"},markerInfos:{label:"Marker infos",type:"object"},markerXY:{label:"Marker [x,y]",type:"array"},shapeInfos:{label:"Shape infos",type:"object"},chart:{type:"chart",label:"Chart object"},xArray:{type:"array",label:"1D Y array"},xyArray:{type:"array",label:"1D XY array"},jcamp:{type:["jcamp","string"],label:"Jcamp data"},annotations:{type:["array"],label:"Annotation file"},fromTo:{type:"fromTo",label:"From - To data"},series_xy1d:{type:"array",label:"List of series in 1D format ( [ x, y, x, y, ... ] )"},selectedShape:{type:"object",label:"Selected shape"}},b.prototype.events={onZoomChange:{label:"Zoom changed",refAction:["fromTo"]},onTrackMouse:{label:"Mouse tracking",refVariable:["x"],refAction:["x"]},onAnnotationAdd:{label:"Annotation added",refAction:["annotation"]},onMouseOverMarker:{label:"Mouse over a marker",refVariable:["markerInfos","markerXY"]},onMouseOutMarker:{label:"Mouse out of a marker"},onMouseOverShape:{label:"Mouse over a shape",refVariable:["shapeInfos"]},onShapeSelect:{label:"When a shape is selected",refAction:["selectedShape"]}},b.prototype.variablesIn=["chart","xArray","xyArray","jcamp","annotations","fromTo","series_xy1d"],b.prototype.actionsIn={fromTo:"From-To",addSerie:"Add a serie",removeSerie:"Remove a serie",removeSerieByName:"Remove serie (name as input)",selectSerie:"Select serie",unselectSerie:"Unselect serie"},b.prototype.configurationStructure=function(){var a=[],b=this.module.definition.vars_in;if(b)for(var c=0,d=b.length;d>c;c++)("jcamp"==b[c].rel||"xArray"==b[c].rel||"xyArray"==b[c].rel||"chart"==b[c].rel||"series_xy1d"==b[c].rel)&&a.push({title:b[c].name,key:b[c].name});if(this.module.view.seriesActions)for(var c=0,d=this.module.view.seriesActions.length;d>c;c++)a.push({title:this.module.view.seriesActions[c][2],key:this.module.view.seriesActions[c][2]});return{groups:{group:{options:{type:"list"},fields:{graphurl:{type:"text",title:"Graph URL","default":""},flip:{type:"checkbox",title:"Axis flipping",options:{flipX:"Flip X",flipY:"Flip Y"},caseDisplay:{flipX:1,flipY:2},"default":[]},displayAxis:{type:"checkbox",title:"Display axis",options:{x:"X",y:"Y"},displayCase:[1],"default":["y"]},grids:{type:"checkbox",title:"Grids",displayCase:[2],options:{hmain:"Horizontal Main",hsec:"Honrizontal Seconday",vmain:"Vertical Main",vsec:"Vertical Secondary"},"default":[]},xLabel:{type:"text",title:"X axis label","default":""},yTopSpacing:{type:"text",title:"Spacing above the data","default":0},yBottomSpacing:{type:"text",title:"Spacing below the data","default":0},xLeftSpacing:{type:"text",title:"Spacing left","default":0},xRightSpacing:{type:"text",title:"Spacing right","default":0},yLabel:{type:"text",title:"Y axis label","default":""},minX:{type:"text",title:"Min X","default":""},maxX:{type:"text",title:"Max X","default":""},minY:{type:"text",title:"Min Y","default":""},maxY:{type:"text",title:"Max Y","default":""},zoom:{type:"combo",multiple:!0,title:"Zoom",options:[{key:"x",title:"X only"},{key:"y",title:"Y only"},{key:"xy",title:"XY"},{key:"none",title:"None"}],"default":"none"},shiftxtozero:{type:"checkbox",title:"Shift X to Min",options:{shift:""},"default":[]},xaxismodification:{type:"combo",title:"X axis modification",options:[{key:"timestamptotime",title:"Timestamp to time"},{key:"valtotime",title:"Value to time from 0"},{key:"valtotime:min.sec",title:"Seconds to min.sec"}],"default":[]},wheelAction:{type:"combo",title:"Mouse Wheel",options:[{key:"zoomX",title:"Zoom X"},{key:"zoomY",title:"Zoom Y"},{key:"none",title:"None"}],"default":"none"},wheelbaseline:{type:"float",title:"Wheel baseline","default":0},fullOut:{type:"combo",title:"Full out on load",options:[{key:"none",title:"Never"},{key:"xAxis",title:"X axis"},{key:"yAxis",title:"Y axis"},{key:"both",title:"Both axis"},{key:"once",title:"Once per input variable"}],"default":"both"},FitYToAxisOnFromTo:{type:"checkbox",title:"Rescale Y axis on FromTo receive",options:{rescale:""}},legend:{type:"combo",title:"Show legend",options:[{key:"none",title:"No legend"},{key:"topleft",title:"Top-left"},{key:"topright",title:"Top-right"},{key:"bottomleft",title:"Bottom-left"},{key:"bottomright",title:"Bottom-right"}]}}},plotinfos:{options:{type:"table",multiple:!0},fields:{variable:{type:"combo",title:"Variable",options:a,"default":""},plotcolor:{type:"color",title:"Color","default":[1,1,255,1]},strokewidth:{type:"text",title:"Width (px)","default":"1"},plotcontinuous:{type:"checkbox",title:"Continuous",options:{continuous:"Continuous"},"default":["continuous"]},peakpicking:{type:"checkbox",title:"Peak Picking",options:{picking:"Peak Picking"},"default":[]},markers:{type:"checkbox",title:"Markers",options:{markers:"Show markers"},"default":[]},normalize:{type:"combo",title:"Normalize",options:[{key:"none",title:"None"},{key:"max1",title:"Set max to 1"},{key:"sum1",title:"Set sum to 1"},{key:"max1min0",title:"Max 1, Min 0"}],"default":"none"},optimizeSlots:{type:"checkbox",title:"Optimize with slots",options:{slots:""},"default":[]},degrade:{type:"float",title:"Degrade serie (px/pt)","default":0},monotoneous:{type:"checkbox",title:"X is monotoneous",options:{yes:""},"default":[]}}}}}},b.prototype.configFunctions={displayYAxis:c("y"),displayXAxis:c("x"),vertGridMain:c("vmain"),vertGridSec:c("vsec"),horGridMain:c("hmain"),horGridSec:c("hsec"),shiftxtozero:c("shift"),minX:d,minY:d,maxX:d,maxY:d,flipX:c("flipX"),flipY:c("flipY")},b.prototype.configAliases={graphurl:["groups","group",0,"graphurl",0],shiftxtozero:["groups","group",0,"shiftxtozero",0],displayYAxis:["groups","group",0,"displayAxis",0],yLabel:["groups","group",0,"yLabel",0],displayXAxis:["groups","group",0,"displayAxis",0],xLabel:["groups","group",0,"xLabel",0],vertGridMain:["groups","group",0,"grids",0],vertGridSec:["groups","group",0,"grids",0],xastime:["groups","group",0,"xastime",0],horGridMain:["groups","group",0,"grids",0],horGridSec:["groups","group",0,"grids",0],xLeftSpacing:["groups","group",0,"xLeftSpacing",0],xRightSpacing:["groups","group",0,"xRightSpacing",0],yBottomSpacing:["groups","group",0,"yBottomSpacing",0],yTopSpacing:["groups","group",0,"yTopSpacing",0],wheelAction:["groups","group",0,"wheelAction",0],fullOut:["groups","group",0,"fullOut",0],FitYToAxisOnFromTo:["groups","group",0,"FitYToAxisOnFromTo",0],zoom:["groups","group",0,"zoom",0],minX:["groups","group",0,"minX",0],minY:["groups","group",0,"minY",0],maxX:["groups","group",0,"maxX",0],maxY:["groups","group",0,"maxY",0],flipX:["groups","group",0,"flip",0],flipY:["groups","group",0,"flip",0],plotinfos:["groups","plotinfos",0],wheelbaseline:["groups","group",0,"wheelbaseline",0],displayAxis:["groups","group",0,"displayAxis",0],flipAxis:["groups","group",0,"flip",0],grid:["groups","group",0,"grids",0],xaxismodification:["groups","group",0,"xaxismodification",0],legend:["groups","group",0,"legend",0]},b.prototype.zoomChanged=function(a,b){var c={type:"fromTo",value:{from:a,to:b}};this.sendAction("fromto",c)},b.prototype.onMouseOverMarker=function(a,b){this.infos=b,this.createDataFromEvent("onMouseOverMarker","markerInfos",b),this.createDataFromEvent("onMouseOverMarker","markerXY",a)},b.prototype.onMouseOutMarker=function(a,b){this.createDataFromEvent("onMouseOutMarker","markerInfos",b),this.createDataFromEvent("onMouseOutMarker","markerXY",a)},b.prototype.print=function(){return this.module.view.graph._dom.innerHTML},b});