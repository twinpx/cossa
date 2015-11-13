/*
BBEditor v0.1 - (c)oded 2008 - MIT License
*/
/*
[MooTools v1.2.1]
MooTools, <http://mootools.net>, My Object Oriented (JavaScript) Tools.
Copyright (c) 2006-2008 Valerio Proietti, <http://mad4milk.net>, MIT Style License.
*/
var MooTools={version:"1.2.1",build:"0d4845aab3d9a4fdee2f0d4a6dd59210e4b697cf"};var Native=function(K){K=K||{};var A=K.name;var I=K.legacy;var B=K.protect;
var C=K.implement;var H=K.generics;var F=K.initialize;var G=K.afterImplement||function(){};var D=F||I;H=H!==false;D.constructor=Native;D.$family={name:"native"};
if(I&&F){D.prototype=I.prototype;}D.prototype.constructor=D;if(A){var E=A.toLowerCase();D.prototype.$family={name:E};Native.typize(D,E);}var J=function(N,L,O,M){if(!B||M||!N.prototype[L]){N.prototype[L]=O;
}if(H){Native.genericize(N,L,B);}G.call(N,L,O);return N;};D.alias=function(N,L,O){if(typeof N=="string"){if((N=this.prototype[N])){return J(this,L,N,O);
}}for(var M in N){this.alias(M,N[M],L);}return this;};D.implement=function(M,L,O){if(typeof M=="string"){return J(this,M,L,O);}for(var N in M){J(this,N,M[N],L);
}return this;};if(C){D.implement(C);}return D;};Native.genericize=function(B,C,A){if((!A||!B[C])&&typeof B.prototype[C]=="function"){B[C]=function(){var D=Array.prototype.slice.call(arguments);
return B.prototype[C].apply(D.shift(),D);};}};Native.implement=function(D,C){for(var B=0,A=D.length;B<A;B++){D[B].implement(C);}};Native.typize=function(A,B){if(!A.type){A.type=function(C){return($type(C)===B);
};}};(function(){var A={Array:Array,Date:Date,Function:Function,Number:Number,RegExp:RegExp,String:String};for(var G in A){new Native({name:G,initialize:A[G],protect:true});
}var D={"boolean":Boolean,"native":Native,object:Object};for(var C in D){Native.typize(D[C],C);}var F={Array:["concat","indexOf","join","lastIndexOf","pop","push","reverse","shift","slice","sort","splice","toString","unshift","valueOf"],String:["charAt","charCodeAt","concat","indexOf","lastIndexOf","match","replace","search","slice","split","substr","substring","toLowerCase","toUpperCase","valueOf"]};
for(var E in F){for(var B=F[E].length;B--;){Native.genericize(window[E],F[E][B],true);}}})();var Hash=new Native({name:"Hash",initialize:function(A){if($type(A)=="hash"){A=$unlink(A.getClean());
}for(var B in A){this[B]=A[B];}return this;}});Hash.implement({forEach:function(B,C){for(var A in this){if(this.hasOwnProperty(A)){B.call(C,this[A],A,this);
}}},getClean:function(){var B={};for(var A in this){if(this.hasOwnProperty(A)){B[A]=this[A];}}return B;},getLength:function(){var B=0;for(var A in this){if(this.hasOwnProperty(A)){B++;
}}return B;}});Hash.alias("forEach","each");Array.implement({forEach:function(C,D){for(var B=0,A=this.length;B<A;B++){C.call(D,this[B],B,this);}}});Array.alias("forEach","each");
function $A(C){if(C.item){var D=[];for(var B=0,A=C.length;B<A;B++){D[B]=C[B];}return D;}return Array.prototype.slice.call(C);}function $arguments(A){return function(){return arguments[A];
};}function $chk(A){return !!(A||A===0);}function $clear(A){clearTimeout(A);clearInterval(A);return null;}function $defined(A){return(A!=undefined);}function $each(C,B,D){var A=$type(C);
((A=="arguments"||A=="collection"||A=="array")?Array:Hash).each(C,B,D);}function $empty(){}function $extend(C,A){for(var B in (A||{})){C[B]=A[B];}return C;
}function $H(A){return new Hash(A);}function $lambda(A){return(typeof A=="function")?A:function(){return A;};}function $merge(){var E={};for(var D=0,A=arguments.length;
D<A;D++){var B=arguments[D];if($type(B)!="object"){continue;}for(var C in B){var G=B[C],F=E[C];E[C]=(F&&$type(G)=="object"&&$type(F)=="object")?$merge(F,G):$unlink(G);
}}return E;}function $pick(){for(var B=0,A=arguments.length;B<A;B++){if(arguments[B]!=undefined){return arguments[B];}}return null;}function $random(B,A){return Math.floor(Math.random()*(A-B+1)+B);
}function $splat(B){var A=$type(B);return(A)?((A!="array"&&A!="arguments")?[B]:B):[];}var $time=Date.now||function(){return +new Date;};function $try(){for(var B=0,A=arguments.length;
B<A;B++){try{return arguments[B]();}catch(C){}}return null;}function $type(A){if(A==undefined){return false;}if(A.$family){return(A.$family.name=="number"&&!isFinite(A))?false:A.$family.name;
}if(A.nodeName){switch(A.nodeType){case 1:return"element";case 3:return(/\S/).test(A.nodeValue)?"textnode":"whitespace";}}else{if(typeof A.length=="number"){if(A.callee){return"arguments";
}else{if(A.item){return"collection";}}}}return typeof A;}function $unlink(C){var B;switch($type(C)){case"object":B={};for(var E in C){B[E]=$unlink(C[E]);
}break;case"hash":B=new Hash(C);break;case"array":B=[];for(var D=0,A=C.length;D<A;D++){B[D]=$unlink(C[D]);}break;default:return C;}return B;}var Browser=$merge({Engine:{name:"unknown",version:0},Platform:{name:(window.orientation!=undefined)?"ipod":(navigator.platform.match(/mac|win|linux/i)||["other"])[0].toLowerCase()},Features:{xpath:!!(document.evaluate),air:!!(window.runtime),query:!!(document.querySelector)},Plugins:{},Engines:{presto:function(){return(!window.opera)?false:((arguments.callee.caller)?960:((document.getElementsByClassName)?950:925));
},trident:function(){return(!window.ActiveXObject)?false:((window.XMLHttpRequest)?5:4);},webkit:function(){return(navigator.taintEnabled)?false:((Browser.Features.xpath)?((Browser.Features.query)?525:420):419);
},gecko:function(){return(document.getBoxObjectFor==undefined)?false:((document.getElementsByClassName)?19:18);}}},Browser||{});Browser.Platform[Browser.Platform.name]=true;
Browser.detect=function(){for(var B in this.Engines){var A=this.Engines[B]();if(A){this.Engine={name:B,version:A};this.Engine[B]=this.Engine[B+A]=true;
break;}}return{name:B,version:A};};Browser.detect();Browser.Request=function(){return $try(function(){return new XMLHttpRequest();},function(){return new ActiveXObject("MSXML2.XMLHTTP");
});};Browser.Features.xhr=!!(Browser.Request());Browser.Plugins.Flash=(function(){var A=($try(function(){return navigator.plugins["Shockwave Flash"].description;
},function(){return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version");})||"0 r0").match(/\d+/g);return{version:parseInt(A[0]||0+"."+A[1]||0),build:parseInt(A[2]||0)};
})();function $exec(B){if(!B){return B;}if(window.execScript){window.execScript(B);}else{var A=document.createElement("script");A.setAttribute("type","text/javascript");
A[(Browser.Engine.webkit&&Browser.Engine.version<420)?"innerText":"text"]=B;document.head.appendChild(A);document.head.removeChild(A);}return B;}Native.UID=1;
var $uid=(Browser.Engine.trident)?function(A){return(A.uid||(A.uid=[Native.UID++]))[0];}:function(A){return A.uid||(A.uid=Native.UID++);};var Window=new Native({name:"Window",legacy:(Browser.Engine.trident)?null:window.Window,initialize:function(A){$uid(A);
if(!A.Element){A.Element=$empty;if(Browser.Engine.webkit){A.document.createElement("iframe");}A.Element.prototype=(Browser.Engine.webkit)?window["[[DOMElement.prototype]]"]:{};
}A.document.window=A;return $extend(A,Window.Prototype);},afterImplement:function(B,A){window[B]=Window.Prototype[B]=A;}});Window.Prototype={$family:{name:"window"}};
new Window(window);var Document=new Native({name:"Document",legacy:(Browser.Engine.trident)?null:window.Document,initialize:function(A){$uid(A);A.head=A.getElementsByTagName("head")[0];
A.html=A.getElementsByTagName("html")[0];if(Browser.Engine.trident&&Browser.Engine.version<=4){$try(function(){A.execCommand("BackgroundImageCache",false,true);
});}if(Browser.Engine.trident){A.window.attachEvent("onunload",function(){A.window.detachEvent("onunload",arguments.callee);A.head=A.html=A.window=null;
});}return $extend(A,Document.Prototype);},afterImplement:function(B,A){document[B]=Document.Prototype[B]=A;}});Document.Prototype={$family:{name:"document"}};
new Document(document);Array.implement({every:function(C,D){for(var B=0,A=this.length;B<A;B++){if(!C.call(D,this[B],B,this)){return false;}}return true;
},filter:function(D,E){var C=[];for(var B=0,A=this.length;B<A;B++){if(D.call(E,this[B],B,this)){C.push(this[B]);}}return C;},clean:function(){return this.filter($defined);
},indexOf:function(C,D){var A=this.length;for(var B=(D<0)?Math.max(0,A+D):D||0;B<A;B++){if(this[B]===C){return B;}}return -1;},map:function(D,E){var C=[];
for(var B=0,A=this.length;B<A;B++){C[B]=D.call(E,this[B],B,this);}return C;},some:function(C,D){for(var B=0,A=this.length;B<A;B++){if(C.call(D,this[B],B,this)){return true;
}}return false;},associate:function(C){var D={},B=Math.min(this.length,C.length);for(var A=0;A<B;A++){D[C[A]]=this[A];}return D;},link:function(C){var A={};
for(var E=0,B=this.length;E<B;E++){for(var D in C){if(C[D](this[E])){A[D]=this[E];delete C[D];break;}}}return A;},contains:function(A,B){return this.indexOf(A,B)!=-1;
},extend:function(C){for(var B=0,A=C.length;B<A;B++){this.push(C[B]);}return this;},getLast:function(){return(this.length)?this[this.length-1]:null;},getRandom:function(){return(this.length)?this[$random(0,this.length-1)]:null;
},include:function(A){if(!this.contains(A)){this.push(A);}return this;},combine:function(C){for(var B=0,A=C.length;B<A;B++){this.include(C[B]);}return this;
},erase:function(B){for(var A=this.length;A--;A){if(this[A]===B){this.splice(A,1);}}return this;},empty:function(){this.length=0;return this;},flatten:function(){var D=[];
for(var B=0,A=this.length;B<A;B++){var C=$type(this[B]);if(!C){continue;}D=D.concat((C=="array"||C=="collection"||C=="arguments")?Array.flatten(this[B]):this[B]);
}return D;},hexToRgb:function(B){if(this.length!=3){return null;}var A=this.map(function(C){if(C.length==1){C+=C;}return C.toInt(16);});return(B)?A:"rgb("+A+")";
},rgbToHex:function(D){if(this.length<3){return null;}if(this.length==4&&this[3]==0&&!D){return"transparent";}var B=[];for(var A=0;A<3;A++){var C=(this[A]-0).toString(16);
B.push((C.length==1)?"0"+C:C);}return(D)?B:"#"+B.join("");}});Function.implement({extend:function(A){for(var B in A){this[B]=A[B];}return this;},create:function(B){var A=this;
B=B||{};return function(D){var C=B.arguments;C=(C!=undefined)?$splat(C):Array.slice(arguments,(B.event)?1:0);if(B.event){C=[D||window.event].extend(C);
}var E=function(){return A.apply(B.bind||null,C);};if(B.delay){return setTimeout(E,B.delay);}if(B.periodical){return setInterval(E,B.periodical);}if(B.attempt){return $try(E);
}return E();};},run:function(A,B){return this.apply(B,$splat(A));},pass:function(A,B){return this.create({bind:B,arguments:A});},bind:function(B,A){return this.create({bind:B,arguments:A});
},bindWithEvent:function(B,A){return this.create({bind:B,arguments:A,event:true});},attempt:function(A,B){return this.create({bind:B,arguments:A,attempt:true})();
},delay:function(B,C,A){return this.create({bind:C,arguments:A,delay:B})();},periodical:function(C,B,A){return this.create({bind:B,arguments:A,periodical:C})();
}});Number.implement({limit:function(B,A){return Math.min(A,Math.max(B,this));},round:function(A){A=Math.pow(10,A||0);return Math.round(this*A)/A;},times:function(B,C){for(var A=0;
A<this;A++){B.call(C,A,this);}},toFloat:function(){return parseFloat(this);},toInt:function(A){return parseInt(this,A||10);}});Number.alias("times","each");
(function(B){var A={};B.each(function(C){if(!Number[C]){A[C]=function(){return Math[C].apply(null,[this].concat($A(arguments)));};}});Number.implement(A);
})(["abs","acos","asin","atan","atan2","ceil","cos","exp","floor","log","max","min","pow","sin","sqrt","tan"]);String.implement({test:function(A,B){return((typeof A=="string")?new RegExp(A,B):A).test(this);
},contains:function(A,B){return(B)?(B+this+B).indexOf(B+A+B)>-1:this.indexOf(A)>-1;},trim:function(){return this.replace(/^\s+|\s+$/g,"");},clean:function(){return this.replace(/\s+/g," ").trim();
},camelCase:function(){return this.replace(/-\D/g,function(A){return A.charAt(1).toUpperCase();});},hyphenate:function(){return this.replace(/[A-Z]/g,function(A){return("-"+A.charAt(0).toLowerCase());
});},capitalize:function(){return this.replace(/\b[a-z]/g,function(A){return A.toUpperCase();});},escapeRegExp:function(){return this.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1");
},toInt:function(A){return parseInt(this,A||10);},toFloat:function(){return parseFloat(this);},hexToRgb:function(B){var A=this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
return(A)?A.slice(1).hexToRgb(B):null;},rgbToHex:function(B){var A=this.match(/\d{1,3}/g);return(A)?A.rgbToHex(B):null;},stripScripts:function(B){var A="";
var C=this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){A+=arguments[1]+"\n";return"";});if(B===true){$exec(A);}else{if($type(B)=="function"){B(A,C);
}}return C;},substitute:function(A,B){return this.replace(B||(/\\?\{([^{}]+)\}/g),function(D,C){if(D.charAt(0)=="\\"){return D.slice(1);}return(A[C]!=undefined)?A[C]:"";
});}});Hash.implement({has:Object.prototype.hasOwnProperty,keyOf:function(B){for(var A in this){if(this.hasOwnProperty(A)&&this[A]===B){return A;}}return null;
},hasValue:function(A){return(Hash.keyOf(this,A)!==null);},extend:function(A){Hash.each(A,function(C,B){Hash.set(this,B,C);},this);return this;},combine:function(A){Hash.each(A,function(C,B){Hash.include(this,B,C);
},this);return this;},erase:function(A){if(this.hasOwnProperty(A)){delete this[A];}return this;},get:function(A){return(this.hasOwnProperty(A))?this[A]:null;
},set:function(A,B){if(!this[A]||this.hasOwnProperty(A)){this[A]=B;}return this;},empty:function(){Hash.each(this,function(B,A){delete this[A];},this);
return this;},include:function(B,C){var A=this[B];if(A==undefined){this[B]=C;}return this;},map:function(B,C){var A=new Hash;Hash.each(this,function(E,D){A.set(D,B.call(C,E,D,this));
},this);return A;},filter:function(B,C){var A=new Hash;Hash.each(this,function(E,D){if(B.call(C,E,D,this)){A.set(D,E);}},this);return A;},every:function(B,C){for(var A in this){if(this.hasOwnProperty(A)&&!B.call(C,this[A],A)){return false;
}}return true;},some:function(B,C){for(var A in this){if(this.hasOwnProperty(A)&&B.call(C,this[A],A)){return true;}}return false;},getKeys:function(){var A=[];
Hash.each(this,function(C,B){A.push(B);});return A;},getValues:function(){var A=[];Hash.each(this,function(B){A.push(B);});return A;},toQueryString:function(A){var B=[];
Hash.each(this,function(F,E){if(A){E=A+"["+E+"]";}var D;switch($type(F)){case"object":D=Hash.toQueryString(F,E);break;case"array":var C={};F.each(function(H,G){C[G]=H;
});D=Hash.toQueryString(C,E);break;default:D=E+"="+encodeURIComponent(F);}if(F!=undefined){B.push(D);}});return B.join("&");}});Hash.alias({keyOf:"indexOf",hasValue:"contains"});
var Event=new Native({name:"Event",initialize:function(A,F){F=F||window;var K=F.document;A=A||F.event;if(A.$extended){return A;}this.$extended=true;var J=A.type;
var G=A.target||A.srcElement;while(G&&G.nodeType==3){G=G.parentNode;}if(J.test(/key/)){var B=A.which||A.keyCode;var M=Event.Keys.keyOf(B);if(J=="keydown"){var D=B-111;
if(D>0&&D<13){M="f"+D;}}M=M||String.fromCharCode(B).toLowerCase();}else{if(J.match(/(click|mouse|menu)/i)){K=(!K.compatMode||K.compatMode=="CSS1Compat")?K.html:K.body;
var I={x:A.pageX||A.clientX+K.scrollLeft,y:A.pageY||A.clientY+K.scrollTop};var C={x:(A.pageX)?A.pageX-F.pageXOffset:A.clientX,y:(A.pageY)?A.pageY-F.pageYOffset:A.clientY};
if(J.match(/DOMMouseScroll|mousewheel/)){var H=(A.wheelDelta)?A.wheelDelta/120:-(A.detail||0)/3;}var E=(A.which==3)||(A.button==2);var L=null;if(J.match(/over|out/)){switch(J){case"mouseover":L=A.relatedTarget||A.fromElement;
break;case"mouseout":L=A.relatedTarget||A.toElement;}if(!(function(){while(L&&L.nodeType==3){L=L.parentNode;}return true;}).create({attempt:Browser.Engine.gecko})()){L=false;
}}}}return $extend(this,{event:A,type:J,page:I,client:C,rightClick:E,wheel:H,relatedTarget:L,target:G,code:B,key:M,shift:A.shiftKey,control:A.ctrlKey,alt:A.altKey,meta:A.metaKey});
}});Event.Keys=new Hash({enter:13,up:38,down:40,left:37,right:39,esc:27,space:32,backspace:8,tab:9,"delete":46});Event.implement({stop:function(){return this.stopPropagation().preventDefault();
},stopPropagation:function(){if(this.event.stopPropagation){this.event.stopPropagation();}else{this.event.cancelBubble=true;}return this;},preventDefault:function(){if(this.event.preventDefault){this.event.preventDefault();
}else{this.event.returnValue=false;}return this;}});var Element=new Native({name:"Element",legacy:window.Element,initialize:function(A,B){var C=Element.Constructors.get(A);
if(C){return C(B);}if(typeof A=="string"){return document.newElement(A,B);}return $(A).set(B);},afterImplement:function(A,B){Element.Prototype[A]=B;if(Array[A]){return ;
}Elements.implement(A,function(){var C=[],G=true;for(var E=0,D=this.length;E<D;E++){var F=this[E][A].apply(this[E],arguments);C.push(F);if(G){G=($type(F)=="element");
}}return(G)?new Elements(C):C;});}});Element.Prototype={$family:{name:"element"}};Element.Constructors=new Hash;var IFrame=new Native({name:"IFrame",generics:false,initialize:function(){var E=Array.link(arguments,{properties:Object.type,iframe:$defined});
var C=E.properties||{};var B=$(E.iframe)||false;var D=C.onload||$empty;delete C.onload;C.id=C.name=$pick(C.id,C.name,B.id,B.name,"IFrame_"+$time());B=new Element(B||"iframe",C);
var A=function(){var F=$try(function(){return B.contentWindow.location.host;});if(F&&F==window.location.host){var G=new Window(B.contentWindow);new Document(B.contentWindow.document);
$extend(G.Element.prototype,Element.Prototype);}D.call(B.contentWindow,B.contentWindow.document);};(window.frames[C.id])?A():B.addListener("load",A);return B;
}});var Elements=new Native({initialize:function(F,B){B=$extend({ddup:true,cash:true},B);F=F||[];if(B.ddup||B.cash){var G={},E=[];for(var C=0,A=F.length;
C<A;C++){var D=$.element(F[C],!B.cash);if(B.ddup){if(G[D.uid]){continue;}G[D.uid]=true;}E.push(D);}F=E;}return(B.cash)?$extend(F,this):F;}});Elements.implement({filter:function(A,B){if(!A){return this;
}return new Elements(Array.filter(this,(typeof A=="string")?function(C){return C.match(A);}:A,B));}});Document.implement({newElement:function(A,B){if(Browser.Engine.trident&&B){["name","type","checked"].each(function(C){if(!B[C]){return ;
}A+=" "+C+'="'+B[C]+'"';if(C!="checked"){delete B[C];}});A="<"+A+">";}return $.element(this.createElement(A)).set(B);},newTextNode:function(A){return this.createTextNode(A);
},getDocument:function(){return this;},getWindow:function(){return this.window;}});Window.implement({$:function(B,C){if(B&&B.$family&&B.uid){return B;}var A=$type(B);
return($[A])?$[A](B,C,this.document):null;},$$:function(A){if(arguments.length==1&&typeof A=="string"){return this.document.getElements(A);}var F=[];var C=Array.flatten(arguments);
for(var D=0,B=C.length;D<B;D++){var E=C[D];switch($type(E)){case"element":F.push(E);break;case"string":F.extend(this.document.getElements(E,true));}}return new Elements(F);
},getDocument:function(){return this.document;},getWindow:function(){return this;}});$.string=function(C,B,A){C=A.getElementById(C);return(C)?$.element(C,B):null;
};$.element=function(A,D){$uid(A);if(!D&&!A.$family&&!(/^object|embed$/i).test(A.tagName)){var B=Element.Prototype;for(var C in B){A[C]=B[C];}}return A;
};$.object=function(B,C,A){if(B.toElement){return $.element(B.toElement(A),C);}return null;};$.textnode=$.whitespace=$.window=$.document=$arguments(0);
Native.implement([Element,Document],{getElement:function(A,B){return $(this.getElements(A,true)[0]||null,B);},getElements:function(A,D){A=A.split(",");
var C=[];var B=(A.length>1);A.each(function(E){var F=this.getElementsByTagName(E.trim());(B)?C.extend(F):C=F;},this);return new Elements(C,{ddup:B,cash:!D});
}});(function(){var H={},F={};var I={input:"checked",option:"selected",textarea:(Browser.Engine.webkit&&Browser.Engine.version<420)?"innerHTML":"value"};
var C=function(L){return(F[L]||(F[L]={}));};var G=function(N,L){if(!N){return ;}var M=N.uid;if(Browser.Engine.trident){if(N.clearAttributes){var P=L&&N.cloneNode(false);
N.clearAttributes();if(P){N.mergeAttributes(P);}}else{if(N.removeEvents){N.removeEvents();}}if((/object/i).test(N.tagName)){for(var O in N){if(typeof N[O]=="function"){N[O]=$empty;
}}Element.dispose(N);}}if(!M){return ;}H[M]=F[M]=null;};var D=function(){Hash.each(H,G);if(Browser.Engine.trident){$A(document.getElementsByTagName("object")).each(G);
}if(window.CollectGarbage){CollectGarbage();}H=F=null;};var J=function(N,L,S,M,P,R){var O=N[S||L];var Q=[];while(O){if(O.nodeType==1&&(!M||Element.match(O,M))){if(!P){return $(O,R);
}Q.push(O);}O=O[L];}return(P)?new Elements(Q,{ddup:false,cash:!R}):null;};var E={html:"innerHTML","class":"className","for":"htmlFor",text:(Browser.Engine.trident||(Browser.Engine.webkit&&Browser.Engine.version<420))?"innerText":"textContent"};
var B=["compact","nowrap","ismap","declare","noshade","checked","disabled","readonly","multiple","selected","noresize","defer"];var K=["value","accessKey","cellPadding","cellSpacing","colSpan","frameBorder","maxLength","readOnly","rowSpan","tabIndex","useMap"];
Hash.extend(E,B.associate(B));Hash.extend(E,K.associate(K.map(String.toLowerCase)));var A={before:function(M,L){if(L.parentNode){L.parentNode.insertBefore(M,L);
}},after:function(M,L){if(!L.parentNode){return ;}var N=L.nextSibling;(N)?L.parentNode.insertBefore(M,N):L.parentNode.appendChild(M);},bottom:function(M,L){L.appendChild(M);
},top:function(M,L){var N=L.firstChild;(N)?L.insertBefore(M,N):L.appendChild(M);}};A.inside=A.bottom;Hash.each(A,function(L,M){M=M.capitalize();Element.implement("inject"+M,function(N){L(this,$(N,true));
return this;});Element.implement("grab"+M,function(N){L($(N,true),this);return this;});});Element.implement({set:function(O,M){switch($type(O)){case"object":for(var N in O){this.set(N,O[N]);
}break;case"string":var L=Element.Properties.get(O);(L&&L.set)?L.set.apply(this,Array.slice(arguments,1)):this.setProperty(O,M);}return this;},get:function(M){var L=Element.Properties.get(M);
return(L&&L.get)?L.get.apply(this,Array.slice(arguments,1)):this.getProperty(M);},erase:function(M){var L=Element.Properties.get(M);(L&&L.erase)?L.erase.apply(this):this.removeProperty(M);
return this;},setProperty:function(M,N){var L=E[M];if(N==undefined){return this.removeProperty(M);}if(L&&B[M]){N=!!N;}(L)?this[L]=N:this.setAttribute(M,""+N);
return this;},setProperties:function(L){for(var M in L){this.setProperty(M,L[M]);}return this;},getProperty:function(M){var L=E[M];var N=(L)?this[L]:this.getAttribute(M,2);
return(B[M])?!!N:(L)?N:N||null;},getProperties:function(){var L=$A(arguments);return L.map(this.getProperty,this).associate(L);},removeProperty:function(M){var L=E[M];
(L)?this[L]=(L&&B[M])?false:"":this.removeAttribute(M);return this;},removeProperties:function(){Array.each(arguments,this.removeProperty,this);return this;
},hasClass:function(L){return this.className.contains(L," ");},addClass:function(L){if(!this.hasClass(L)){this.className=(this.className+" "+L).clean();
}return this;},removeClass:function(L){this.className=this.className.replace(new RegExp("(^|\\s)"+L+"(?:\\s|$)"),"$1");return this;},toggleClass:function(L){return this.hasClass(L)?this.removeClass(L):this.addClass(L);
},adopt:function(){Array.flatten(arguments).each(function(L){L=$(L,true);if(L){this.appendChild(L);}},this);return this;},appendText:function(M,L){return this.grab(this.getDocument().newTextNode(M),L);
},grab:function(M,L){A[L||"bottom"]($(M,true),this);return this;},inject:function(M,L){A[L||"bottom"](this,$(M,true));return this;},replaces:function(L){L=$(L,true);
L.parentNode.replaceChild(this,L);return this;},wraps:function(M,L){M=$(M,true);return this.replaces(M).grab(M,L);},getPrevious:function(L,M){return J(this,"previousSibling",null,L,false,M);
},getAllPrevious:function(L,M){return J(this,"previousSibling",null,L,true,M);},getNext:function(L,M){return J(this,"nextSibling",null,L,false,M);},getAllNext:function(L,M){return J(this,"nextSibling",null,L,true,M);
},getFirst:function(L,M){return J(this,"nextSibling","firstChild",L,false,M);},getLast:function(L,M){return J(this,"previousSibling","lastChild",L,false,M);
},getParent:function(L,M){return J(this,"parentNode",null,L,false,M);},getParents:function(L,M){return J(this,"parentNode",null,L,true,M);},getChildren:function(L,M){return J(this,"nextSibling","firstChild",L,true,M);
},getWindow:function(){return this.ownerDocument.window;},getDocument:function(){return this.ownerDocument;},getElementById:function(O,N){var M=this.ownerDocument.getElementById(O);
if(!M){return null;}for(var L=M.parentNode;L!=this;L=L.parentNode){if(!L){return null;}}return $.element(M,N);},getSelected:function(){return new Elements($A(this.options).filter(function(L){return L.selected;
}));},getComputedStyle:function(M){if(this.currentStyle){return this.currentStyle[M.camelCase()];}var L=this.getDocument().defaultView.getComputedStyle(this,null);
return(L)?L.getPropertyValue([M.hyphenate()]):null;},toQueryString:function(){var L=[];this.getElements("input, select, textarea",true).each(function(M){if(!M.name||M.disabled){return ;
}var N=(M.tagName.toLowerCase()=="select")?Element.getSelected(M).map(function(O){return O.value;}):((M.type=="radio"||M.type=="checkbox")&&!M.checked)?null:M.value;
$splat(N).each(function(O){if(typeof O!="undefined"){L.push(M.name+"="+encodeURIComponent(O));}});});return L.join("&");},clone:function(O,L){O=O!==false;
var R=this.cloneNode(O);var N=function(V,U){if(!L){V.removeAttribute("id");}if(Browser.Engine.trident){V.clearAttributes();V.mergeAttributes(U);V.removeAttribute("uid");
if(V.options){var W=V.options,S=U.options;for(var T=W.length;T--;){W[T].selected=S[T].selected;}}}var X=I[U.tagName.toLowerCase()];if(X&&U[X]){V[X]=U[X];
}};if(O){var P=R.getElementsByTagName("*"),Q=this.getElementsByTagName("*");for(var M=P.length;M--;){N(P[M],Q[M]);}}N(R,this);return $(R);},destroy:function(){Element.empty(this);
Element.dispose(this);G(this,true);return null;},empty:function(){$A(this.childNodes).each(function(L){Element.destroy(L);});return this;},dispose:function(){return(this.parentNode)?this.parentNode.removeChild(this):this;
},hasChild:function(L){L=$(L,true);if(!L){return false;}if(Browser.Engine.webkit&&Browser.Engine.version<420){return $A(this.getElementsByTagName(L.tagName)).contains(L);
}return(this.contains)?(this!=L&&this.contains(L)):!!(this.compareDocumentPosition(L)&16);},match:function(L){return(!L||(L==this)||(Element.get(this,"tag")==L));
}});Native.implement([Element,Window,Document],{addListener:function(O,N){if(O=="unload"){var L=N,M=this;N=function(){M.removeListener("unload",N);L();
};}else{H[this.uid]=this;}if(this.addEventListener){this.addEventListener(O,N,false);}else{this.attachEvent("on"+O,N);}return this;},removeListener:function(M,L){if(this.removeEventListener){this.removeEventListener(M,L,false);
}else{this.detachEvent("on"+M,L);}return this;},retrieve:function(M,L){var O=C(this.uid),N=O[M];if(L!=undefined&&N==undefined){N=O[M]=L;}return $pick(N);
},store:function(M,L){var N=C(this.uid);N[M]=L;return this;},eliminate:function(L){var M=C(this.uid);delete M[L];return this;}});window.addListener("unload",D);
})();Element.Properties=new Hash;Element.Properties.style={set:function(A){this.style.cssText=A;},get:function(){return this.style.cssText;},erase:function(){this.style.cssText="";
}};Element.Properties.tag={get:function(){return this.tagName.toLowerCase();}};Element.Properties.html=(function(){var C=document.createElement("div");
var A={table:[1,"<table>","</table>"],select:[1,"<select>","</select>"],tbody:[2,"<table><tbody>","</tbody></table>"],tr:[3,"<table><tbody><tr>","</tr></tbody></table>"]};
A.thead=A.tfoot=A.tbody;var B={set:function(){var E=Array.flatten(arguments).join("");var F=Browser.Engine.trident&&A[this.get("tag")];if(F){var G=C;G.innerHTML=F[1]+E+F[2];
for(var D=F[0];D--;){G=G.firstChild;}this.empty().adopt(G.childNodes);}else{this.innerHTML=E;}}};B.erase=B.set;return B;})();if(Browser.Engine.webkit&&Browser.Engine.version<420){Element.Properties.text={get:function(){if(this.innerText){return this.innerText;
}var A=this.ownerDocument.newElement("div",{html:this.innerHTML}).inject(this.ownerDocument.body);var B=A.innerText;A.destroy();return B;}};}Element.Properties.events={set:function(A){this.addEvents(A);
}};Native.implement([Element,Window,Document],{addEvent:function(E,G){var H=this.retrieve("events",{});H[E]=H[E]||{keys:[],values:[]};if(H[E].keys.contains(G)){return this;
}H[E].keys.push(G);var F=E,A=Element.Events.get(E),C=G,I=this;if(A){if(A.onAdd){A.onAdd.call(this,G);}if(A.condition){C=function(J){if(A.condition.call(this,J)){return G.call(this,J);
}return true;};}F=A.base||F;}var D=function(){return G.call(I);};var B=Element.NativeEvents[F];if(B){if(B==2){D=function(J){J=new Event(J,I.getWindow());
if(C.call(I,J)===false){J.stop();}};}this.addListener(F,D);}H[E].values.push(D);return this;},removeEvent:function(C,B){var A=this.retrieve("events");if(!A||!A[C]){return this;
}var F=A[C].keys.indexOf(B);if(F==-1){return this;}A[C].keys.splice(F,1);var E=A[C].values.splice(F,1)[0];var D=Element.Events.get(C);if(D){if(D.onRemove){D.onRemove.call(this,B);
}C=D.base||C;}return(Element.NativeEvents[C])?this.removeListener(C,E):this;},addEvents:function(A){for(var B in A){this.addEvent(B,A[B]);}return this;
},removeEvents:function(A){if($type(A)=="object"){for(var C in A){this.removeEvent(C,A[C]);}return this;}var B=this.retrieve("events");if(!B){return this;
}if(!A){for(var C in B){this.removeEvents(C);}this.eliminate("events");}else{if(B[A]){while(B[A].keys[0]){this.removeEvent(A,B[A].keys[0]);}B[A]=null;}}return this;
},fireEvent:function(D,B,A){var C=this.retrieve("events");if(!C||!C[D]){return this;}C[D].keys.each(function(E){E.create({bind:this,delay:A,"arguments":B})();
},this);return this;},cloneEvents:function(D,A){D=$(D);var C=D.retrieve("events");if(!C){return this;}if(!A){for(var B in C){this.cloneEvents(D,B);}}else{if(C[A]){C[A].keys.each(function(E){this.addEvent(A,E);
},this);}}return this;}});Element.NativeEvents={click:2,dblclick:2,mouseup:2,mousedown:2,contextmenu:2,mousewheel:2,DOMMouseScroll:2,mouseover:2,mouseout:2,mousemove:2,selectstart:2,selectend:2,keydown:2,keypress:2,keyup:2,focus:2,blur:2,change:2,reset:2,select:2,submit:2,load:1,unload:1,beforeunload:2,resize:1,move:1,DOMContentLoaded:1,readystatechange:1,error:1,abort:1,scroll:1};
(function(){var A=function(B){var C=B.relatedTarget;if(C==undefined){return true;}if(C===false){return false;}return($type(this)!="document"&&C!=this&&C.prefix!="xul"&&!this.hasChild(C));
};Element.Events=new Hash({mouseenter:{base:"mouseover",condition:A},mouseleave:{base:"mouseout",condition:A},mousewheel:{base:(Browser.Engine.gecko)?"DOMMouseScroll":"mousewheel"}});
})();Native.implement([Document,Element],{getElements:function(H,G){H=H.split(",");var C,E={};for(var D=0,B=H.length;D<B;D++){var A=H[D],F=Selectors.Utils.search(this,A,E);
if(D!=0&&F.item){F=$A(F);}C=(D==0)?F:(C.item)?$A(C).concat(F):C.concat(F);}return new Elements(C,{ddup:(H.length>1),cash:!G});}});Element.implement({match:function(B){if(!B||(B==this)){return true;
}var D=Selectors.Utils.parseTagAndID(B);var A=D[0],E=D[1];if(!Selectors.Filters.byID(this,E)||!Selectors.Filters.byTag(this,A)){return false;}var C=Selectors.Utils.parseSelector(B);
return(C)?Selectors.Utils.filter(this,C,{}):true;}});var Selectors={Cache:{nth:{},parsed:{}}};Selectors.RegExps={id:(/#([\w-]+)/),tag:(/^(\w+|\*)/),quick:(/^(\w+|\*)$/),splitter:(/\s*([+>~\s])\s*([a-zA-Z#.*:\[])/g),combined:(/\.([\w-]+)|\[(\w+)(?:([!*^$~|]?=)(["']?)([^\4]*?)\4)?\]|:([\w-]+)(?:\(["']?(.*?)?["']?\)|$)/g)};
Selectors.Utils={chk:function(B,C){if(!C){return true;}var A=$uid(B);if(!C[A]){return C[A]=true;}return false;},parseNthArgument:function(F){if(Selectors.Cache.nth[F]){return Selectors.Cache.nth[F];
}var C=F.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);if(!C){return false;}var E=parseInt(C[1]);var B=(E||E===0)?E:1;var D=C[2]||false;var A=parseInt(C[3])||0;
if(B!=0){A--;while(A<1){A+=B;}while(A>=B){A-=B;}}else{B=A;D="index";}switch(D){case"n":C={a:B,b:A,special:"n"};break;case"odd":C={a:2,b:0,special:"n"};
break;case"even":C={a:2,b:1,special:"n"};break;case"first":C={a:0,special:"index"};break;case"last":C={special:"last-child"};break;case"only":C={special:"only-child"};
break;default:C={a:(B-1),special:"index"};}return Selectors.Cache.nth[F]=C;},parseSelector:function(E){if(Selectors.Cache.parsed[E]){return Selectors.Cache.parsed[E];
}var D,H={classes:[],pseudos:[],attributes:[]};while((D=Selectors.RegExps.combined.exec(E))){var I=D[1],G=D[2],F=D[3],B=D[5],C=D[6],J=D[7];if(I){H.classes.push(I);
}else{if(C){var A=Selectors.Pseudo.get(C);if(A){H.pseudos.push({parser:A,argument:J});}else{H.attributes.push({name:C,operator:"=",value:J});}}else{if(G){H.attributes.push({name:G,operator:F,value:B});
}}}}if(!H.classes.length){delete H.classes;}if(!H.attributes.length){delete H.attributes;}if(!H.pseudos.length){delete H.pseudos;}if(!H.classes&&!H.attributes&&!H.pseudos){H=null;
}return Selectors.Cache.parsed[E]=H;},parseTagAndID:function(B){var A=B.match(Selectors.RegExps.tag);var C=B.match(Selectors.RegExps.id);return[(A)?A[1]:"*",(C)?C[1]:false];
},filter:function(F,C,E){var D;if(C.classes){for(D=C.classes.length;D--;D){var G=C.classes[D];if(!Selectors.Filters.byClass(F,G)){return false;}}}if(C.attributes){for(D=C.attributes.length;
D--;D){var B=C.attributes[D];if(!Selectors.Filters.byAttribute(F,B.name,B.operator,B.value)){return false;}}}if(C.pseudos){for(D=C.pseudos.length;D--;D){var A=C.pseudos[D];
if(!Selectors.Filters.byPseudo(F,A.parser,A.argument,E)){return false;}}}return true;},getByTagAndID:function(B,A,D){if(D){var C=(B.getElementById)?B.getElementById(D,true):Element.getElementById(B,D,true);
return(C&&Selectors.Filters.byTag(C,A))?[C]:[];}else{return B.getElementsByTagName(A);}},search:function(I,H,N){var B=[];var C=H.trim().replace(Selectors.RegExps.splitter,function(Y,X,W){B.push(X);
return":)"+W;}).split(":)");var J,E,U;for(var T=0,P=C.length;T<P;T++){var S=C[T];if(T==0&&Selectors.RegExps.quick.test(S)){J=I.getElementsByTagName(S);
continue;}var A=B[T-1];var K=Selectors.Utils.parseTagAndID(S);var V=K[0],L=K[1];if(T==0){J=Selectors.Utils.getByTagAndID(I,V,L);}else{var D={},G=[];for(var R=0,Q=J.length;
R<Q;R++){G=Selectors.Getters[A](G,J[R],V,L,D);}J=G;}var F=Selectors.Utils.parseSelector(S);if(F){E=[];for(var O=0,M=J.length;O<M;O++){U=J[O];if(Selectors.Utils.filter(U,F,N)){E.push(U);
}}J=E;}}return J;}};Selectors.Getters={" ":function(H,G,I,A,E){var D=Selectors.Utils.getByTagAndID(G,I,A);for(var C=0,B=D.length;C<B;C++){var F=D[C];if(Selectors.Utils.chk(F,E)){H.push(F);
}}return H;},">":function(H,G,I,A,F){var C=Selectors.Utils.getByTagAndID(G,I,A);for(var E=0,D=C.length;E<D;E++){var B=C[E];if(B.parentNode==G&&Selectors.Utils.chk(B,F)){H.push(B);
}}return H;},"+":function(C,B,A,E,D){while((B=B.nextSibling)){if(B.nodeType==1){if(Selectors.Utils.chk(B,D)&&Selectors.Filters.byTag(B,A)&&Selectors.Filters.byID(B,E)){C.push(B);
}break;}}return C;},"~":function(C,B,A,E,D){while((B=B.nextSibling)){if(B.nodeType==1){if(!Selectors.Utils.chk(B,D)){break;}if(Selectors.Filters.byTag(B,A)&&Selectors.Filters.byID(B,E)){C.push(B);
}}}return C;}};Selectors.Filters={byTag:function(B,A){return(A=="*"||(B.tagName&&B.tagName.toLowerCase()==A));},byID:function(A,B){return(!B||(A.id&&A.id==B));
},byClass:function(B,A){return(B.className&&B.className.contains(A," "));},byPseudo:function(A,D,C,B){return D.call(A,C,B);},byAttribute:function(C,D,B,E){var A=Element.prototype.getProperty.call(C,D);
if(!A){return(B=="!=");}if(!B||E==undefined){return true;}switch(B){case"=":return(A==E);case"*=":return(A.contains(E));case"^=":return(A.substr(0,E.length)==E);
case"$=":return(A.substr(A.length-E.length)==E);case"!=":return(A!=E);case"~=":return A.contains(E," ");case"|=":return A.contains(E,"-");}return false;
}};Selectors.Pseudo=new Hash({checked:function(){return this.checked;},empty:function(){return !(this.innerText||this.textContent||"").length;},not:function(A){return !Element.match(this,A);
},contains:function(A){return(this.innerText||this.textContent||"").contains(A);},"first-child":function(){return Selectors.Pseudo.index.call(this,0);},"last-child":function(){var A=this;
while((A=A.nextSibling)){if(A.nodeType==1){return false;}}return true;},"only-child":function(){var B=this;while((B=B.previousSibling)){if(B.nodeType==1){return false;
}}var A=this;while((A=A.nextSibling)){if(A.nodeType==1){return false;}}return true;},"nth-child":function(G,E){G=(G==undefined)?"n":G;var C=Selectors.Utils.parseNthArgument(G);
if(C.special!="n"){return Selectors.Pseudo[C.special].call(this,C.a,E);}var F=0;E.positions=E.positions||{};var D=$uid(this);if(!E.positions[D]){var B=this;
while((B=B.previousSibling)){if(B.nodeType!=1){continue;}F++;var A=E.positions[$uid(B)];if(A!=undefined){F=A+F;break;}}E.positions[D]=F;}return(E.positions[D]%C.a==C.b);
},index:function(A){var B=this,C=0;while((B=B.previousSibling)){if(B.nodeType==1&&++C>A){return false;}}return(C==A);},even:function(B,A){return Selectors.Pseudo["nth-child"].call(this,"2n+1",A);
},odd:function(B,A){return Selectors.Pseudo["nth-child"].call(this,"2n",A);}});

/*
[Clientcide Trunk 700]
Clientcide Copyright (c) 2006-2008, http://www.clientcide.com/wiki/cnet-libraries#license
*/
Element.implement({tidy:function(){try{this.set('value',this.get('value').tidy())}catch(e){dbug.log('element.tidy error: %o',e)}},
getTextInRange:function(start,end){return this.get('value').substring(start,end)},
getSelectedText:function(){if(Browser.Engine.trident)return document.selection.createRange().text;return this.get('value').substring(this.getSelectionStart(),this.getSelectionEnd())},
getIERanges:function(){this.focus();var range=document.selection.createRange();var re=this.createTextRange();var dupe=re.duplicate();re.moveToBookmark(range.getBookmark());dupe.setEndPoint('EndToStart',re);return{start:dupe.text.length,end:dupe.text.length+range.text.length,length:range.text.length,text:range.text}},
getSelectionStart:function(){if(Browser.Engine.trident)return this.getIERanges().start;return this.selectionStart},
getSelectionEnd:function(){if(Browser.Engine.trident)return this.getIERanges().end;return this.selectionEnd},
getSelectedRange:function(){return{start:this.getSelectionStart(),end:this.getSelectionEnd()}},
setCaretPosition:function(pos){if(pos=='end')pos=this.get('value').length;this.selectRange(pos,pos);return this},
getCaretPosition:function(){return this.getSelectedRange().start},
selectRange:function(start,end){this.focus();if(Browser.Engine.trident){var range=this.createTextRange();range.collapse(true);range.moveStart('character',start);range.moveEnd('character',end-start);range.select();return this}this.setSelectionRange(start,end);return this},
insertAtCursor:function(value,select){var start=this.getSelectionStart();var end=this.getSelectionEnd();this.set('value',this.get('value').substring(0,start)+value+this.get('value').substring(end,this.get('value').length));if($pick(select,true))this.selectRange(start,start+value.length);else this.setCaretPosition(start+value.length);return this},
insertAroundCursor:function(options,select){options=$extend({before:'',defaultMiddle:'SOMETHING HERE',after:''},options);value=this.getSelectedText()||options.defaultMiddle;var start=this.getSelectionStart();var end=this.getSelectionEnd();if(start==end){var text=this.get('value');this.set('value',text.substring(0,start)+options.before+value+options.after+text.substring(end,text.length));this.selectRange(start+options.before.length,end+options.before.length+value.length);text=null}else{text=this.get('value').substring(start,end);this.set('value',this.get('value').substring(0,start)+options.before+text+options.after+this.get('value').substring(end,this.get('value').length));var selStart=start+options.before.length;if($pick(select,true))this.selectRange(selStart,selStart+text.length);else this.setCaretPosition(selStart+text.length)}return this}});Element.Properties.inputValue={get:function(){switch(this.get('tag')){case'select':vals=this.getSelected().map(function(op){var v=$pick(op.get('value'),op.get('text'));return(v=="")?op.get('text'):v});return this.get('multiple')?vals:vals[0];case'input':switch(this.get('type')){case'checkbox':return this.get('checked')?this.get('value'):false;case'radio':var checked;if(this.get('checked'))return this.get('value');$(this.getParent('form')||document.body).getElements('input').each(function(input){if(input.get('name')==this.get('name')&&input.get('checked'))checked=input.get('value')},this);return checked||null}case'input':case'textarea':return this.get('value');default:return this.get('inputValue')}},set:function(value){switch(this.get('tag')){case'select':this.getElements('option').each(function(op){var v=$pick(op.get('value'),op.get('text'));if(v=="")v=op.get('text');op.set('selected',$splat(value).contains(v))});break;case'input':if(['radio','checkbox'].contains(this.get('type'))){this.set('checked',$type(value)=="boolean"?value:$splat(value).contains(this.get('value')));break}case'textarea':case'input':this.set('value',value);break;default:this.set('inputValue',value)}return this},
erase:function(){switch(this.get('tag')){case'select':this.getElements('option').each(function(op){op.erase('selected')});break;case'input':if(['radio','checkbox'].contains(this.get('type'))){this.set('checked',false);break}case'input':case'textarea':this.set('value','');break;default:this.set('inputValue','')}return this}};

/* BBEditor - Main Functionality */

// General settings
bbeSettings=new Hash({
  position: 'before',  // Note: You can change the alignment in CSS if required!
  imageBase: 'icons/'
});

// Buttons definitions!
bbeButtons=new Hash({
  bold: new Hash({
    title: 'Embolden Text',
    icon: bbeSettings.get('imageBase') + 'text_bold.png'
  }),
  italic: new Hash({
    title: 'Italicise Text',
    icon: bbeSettings.get('imageBase') + 'text_italic.png'
  }),
  underline: new Hash({
    title: 'Underline Text',
    icon: bbeSettings.get('imageBase') + 'text_underline.png'
  }),
  strikethrough: new Hash({
    title: 'Strikethrough Text',
    icon: bbeSettings.get('imageBase') + 'text_strikethrough.png'
  }),
  link: new Hash({
    title: 'Add Link',
    icon: bbeSettings.get('imageBase') + 'link.png'
  }),
  quote: new Hash({
    title: 'Quote Text',
    icon: bbeSettings.get('imageBase') + 'comment.png'
  }),
  code: new Hash({
    title: 'Codify Text',
    icon: bbeSettings.get('imageBase') + 'page_white_code.png'
  }),
  image: new Hash({
    title: 'Add Image',
    icon: bbeSettings.get('imageBase') + '/image.png'
  })
});

// Perform an action, determined by the href of the followed link
function bbeAction(el, et) {
  var et=$(et);
  var action=el.get('href');
  switch(action) {
    case '#bold':
      et.insertAroundCursor({'before': '[b]', 'after': '[/b]'});
      break;
    case '#italic':
      et.insertAroundCursor({'before': '[i]', 'after': '[/i]'});
      break;
    case '#underline':
      et.insertAroundCursor({'before': '[u]', 'after': '[/u]'});
      break;
    case '#strikethrough':
      et.insertAroundCursor({'before': '[s]', 'after': '[/s]'});
      break;
    case '#link':
      var url=prompt('Please enter the link URL', 'http://');
      var range=et.getSelectedRange();
      if (range.start==range.end) {
        et.insertAtCursor('[url]' + url + '[/url]');
      } else {
        et.insertAroundCursor({'before': '[url=' + url + ']', 'after': '[/url]'});
      }
      break;
    case '#quote':
      et.insertAroundCursor({'before': '[quote]', 'after': '[/quote]'});
      break;
    case '#code':
      et.insertAroundCursor({'before': '[code]', 'after': '[/code]'});
      break;
    case '#image':
      var url=prompt('Please enter the image URL', 'http://');
      et.insertAtCursor('[img]' + url + '[/img]');
      break;
    default:
      alert('Sorry, I don\'t know what that button does!');
      break;
  }
}
// Add a load event to add the buttons to all textareas in the 'bbeditor' class
window.addEvent('load', function() {
  var index=0;
  $(document.body).getElements('textarea.bbeditor').each(function(e) {
    bbeAddButtonBar(e, index++);
  });
});

// Add the button bar
function bbeAddButtonBar(e, index) {
  // Create and insert the bar
  var barId='bbebar_' + index;
  var bar=new Element('div', {id: 'barId', 'class': 'bbebar'});
  bar.inject(e, bbeSettings.get('position'));
  // Create and add each button in turn
  bbeButtons.each(function(value, key) {
    // Create the link and insert it into the link bar
    var link=new Element('a', {href: '#' + key});
    link.addEvent('click', function(event) { event.stop(); bbeAction(this, e.id) });
    var button=new Element('img', {id: 'button', src: value.get('icon'), alt: value.get('title'), title: value.get('title')});
    link.grab(button);
    link.inject(bar);
  });
}
