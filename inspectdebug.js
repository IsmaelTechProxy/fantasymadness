<html>
<head>
  <title></title>
</head>
<body>
  (function(){/*!*************************************************************
  * * Firebug Lite 1.4.0a1 * * Copyright (c) 2007, Parakey Inc. *
  Released under BSD license. * More information:
  http://getfirebug.com/firebuglite *
  **************************************************************//*!
  * CSS selectors powered by: * * Sizzle CSS Selector Engine - v1.0
  * Copyright 2009, The Dojo Foundation * Released under the MIT,
  BSD, and GPL Licenses. * More information: http://sizzlejs.com/
  */var FBL={};(function(){var
  productionDir="https://luphoria.com/fbl/fbl";var
  bookmarkletVersion=4;var reNotWhitespace=/[^\s]/;var
  reSplitFile=/:\/{1,3}(.*?)\/([^\/]*?)\/?($|\?.*)/;this.reJavascript=/\s*javascript:\s*(.*)/;this.reChrome=/chrome:\/\/([^\/]*)\//;this.reFile=/file:\/\/([^\/]*)\//;var
  userAgent=navigator.userAgent.toLowerCase();this.isFirefox=/firefox/.test(userAgent);this.isOpera=/opera/.test(userAgent);this.isSafari=/webkit/.test(userAgent);this.isIE=/msie/.test(userAgent)&&!/opera/.test(userAgent);this.isIE6=/msie
  6/i.test(navigator.appVersion);this.browserVersion=(userAgent.match(/.+(?:rv|it|ra|ie)[\/:
  ]([\d.]+)/)||[0,'0'])[1];this.isIElt8=this.isIE&&(this.browserVersion-0<8);this.NS=null;this.pixelsPerInch=null;var
  namespaces=[];this.ns=function(fn) {var
  ns={};namespaces.push(fn,ns);return ns;};var
  FBTrace=null;this.initialize=function()
  {if(window.firebug&&firebug.firebuglite||window.console&&console.firebuglite)
  return;if(FBL.FBTrace) FBTrace=FBL.FBTrace;else
  FBTrace=FBL.FBTrace={};FBL.Ajax.initialize();var
  isChromeContext=window.Firebug&&typeof
  window.Firebug.SharedEnv=="object";if(isChromeContext)
  {sharedEnv=window.Firebug.SharedEnv;delete
  window.Firebug.SharedEnv;FBL.Env=sharedEnv;FBL.Env.isChromeContext=true;FBTrace.messageQueue=FBL.Env.traceMessageQueue;}
  else
  {FBL.NS=document.documentElement.namespaceURI;FBL.Env.browser=window;FBL.Env.destroy=destroyEnvironment;if(document.documentElement.getAttribute("debug")=="true")
  FBL.Env.Options.startOpened=true;findLocation();var
  prefs=eval("("+FBL.readCookie("FirebugLite")+")");if(prefs)
  {FBL.Env.Options.startOpened=prefs.startOpened;FBL.Env.Options.enableTrace=prefs.enableTrace;FBL.Env.Options.enablePersistent=prefs.enablePersistent;FBL.Env.Options.disableXHRListener=prefs.disableXHRListener;}
  if(FBL.isFirefox&&typeof
  FBL.Env.browser.console=="object"&&FBL.Env.browser.console.firebug&&FBL.Env.Options.disableWhenFirebugActive)
  return;} if(FBL.Env.isDebugMode) {FBL.Env.browser.FBL=FBL;}
  this.isQuiksMode=FBL.Env.browser.document.compatMode=="BackCompat";this.isIEQuiksMode=this.isIE&&this.isQuiksMode;this.isIEStantandMode=this.isIE&&!this.isQuiksMode;this.noFixedPosition=this.isIE6||this.isIEQuiksMode;if(FBL.Env.Options.enableTrace)FBTrace.initialize();if(FBTrace.DBG_INITIALIZE&&isChromeContext)FBTrace.sysout("FBL.initialize
  - persistent application","initialize chrome
  context");if(FBTrace.DBG_INITIALIZE)FBTrace.sysout("FBL.initialize",namespaces.length/2+"
  namespaces BEGIN");for(var i=0;i0)
  path=reLastDir.exec(path)[1];path+=backDir[2];} else
  if(src.indexOf("/")!=-1) {if(/^\.\/./.test(src))
  {path+=src.substring(2);} else if(/^\/./.test(src)) {var
  domain=/^(\w+:\/\/[^\/]+)/.exec(path);path=domain[1]+src;} else
  {path+=src;}}}}
  FBL.Env.isChromeExtension=script&&script.getAttribute("extension")=="Chrome";if(FBL.Env.isChromeExtension)
  {path=productionDir;FBL.Env.bookmarkletOutdated=false;script={innerHTML:"{showIconWhenHidden:false}"};}
  var
  m=path&&path.match(/([^\/]+)\/$/)||null;if(path&&m)
  {var
  Env=FBL.Env;Env.useLocalSkin=path.indexOf(location.protocol+"//"+location.host+"/")==0;if(fileName=="firebug-lite-dev.js")
  {Env.isDevelopmentMode=true;Env.isDebugMode=true;} else
  if(fileName=="firebug-lite-debug.js") {Env.isDebugMode=true;}
  if(Env.browser.document.documentElement.getAttribute("debug")=="true")
  {Env.Options.startOpened=true;} if(fileOptions) {var
  options=fileOptions.split(",");for(var
  i=0,length=options.length;i1) {for(var i=0;i":return ">";case
  "&":return "&";case "'":return "'";case '"':return """;}
  return "?";};return
  String(value).replace(/[<>&"']/g,replaceChars);}
  this.escapeHTML=escapeHTML;this.cropString=function(text,limit)
  {text=text+"";if(!limit) var halfLimit=50;else var
  halfLimit=limit/2;if(text.length>limit) return
  this.escapeNewLines(text.substr(0,halfLimit)+"..."+text.substr(text.length-halfLimit));else
  return
  this.escapeNewLines(text);};this.isWhitespace=function(text)
  {return!reNotWhitespace.exec(text);};this.splitLines=function(text)
  {var reSplitLines2=/.*(:?\r\n|\n|\r)?/mg;var lines;if(text.match)
  {lines=text.match(reSplitLines2);} else {var
  str=text+"";lines=str.match(reSplitLines2);} lines.pop();return
  lines;};this.safeToString=function(ob) {if(this.isIE) return
  ob+"";try {if(ob&&"toString"in ob&&typeof
  ob.toString=="function") return ob.toString();} catch(exc)
  {return ob+"";}};this.hasProperties=function(ob) {try {for(var
  name in ob) return true;}catch(exc){} return false;};var
  reTrim=/^\s+|\s+$/g;this.trim=function(s) {return
  s.replace(reTrim,"");};this.emptyFn=function(){};this.isVisible=function(elt)
  {return
  this.getStyle(elt,"visibility")!="hidden"&&(elt.offsetWidth>0||elt.offsetHeight>0||elt.tagName
  in
  invisibleTags||elt.namespaceURI=="http://www.w3.org/2000/svg"||elt.namespaceURI=="http://www.w3.org/1998/Math/MathML");};this.collapse=function(elt,collapsed)
  {if(this.isIElt8) {if(collapsed)
  this.setClass(elt,"collapsed");else
  this.removeClass(elt,"collapsed");} else
  elt.setAttribute("collapsed",collapsed?"true":"false");};this.obscure=function(elt,obscured)
  {if(obscured) this.setClass(elt,"obscured");else
  this.removeClass(elt,"obscured");};this.hide=function(elt,hidden)
  {elt.style.visibility=hidden?"hidden":"visible";};this.clearNode=function(node)
  {var nodeName=" "+node.nodeName.toLowerCase()+" ";var
  ignoreTags=" table tbody thead tfoot th tr td
  ";if(this.isIE&&ignoreTags.indexOf(nodeName)!=-1)
  this.eraseNode(node);else
  node.innerHTML="";};this.eraseNode=function(node)
  {while(node.lastChild)
  node.removeChild(node.lastChild);};this.iterateWindows=function(win,handler)
  {if(!win||!win.document)
  return;handler(win);if(win==top||!win.frames)return;for(var
  i=0;iscrollParent.offsetHeight) return
  scrollParent;}};this.isScrolledToBottom=function(element) {var
  onBottom=(element.scrollTop+element.offsetHeight)==element.scrollHeight;if(FBTrace.DBG_CONSOLE)
  FBTrace.sysout("isScrolledToBottom offsetHeight:
  "+element.offsetHeight+" onBottom:"+onBottom);return
  onBottom;};this.scrollToBottom=function(element)
  {element.scrollTop=element.scrollHeight;if(FBTrace.DBG_CONSOLE)
  {FBTrace.sysout("scrollToBottom reset scrollTop
  "+element.scrollTop+" =
  "+element.scrollHeight);if(element.scrollHeight==element.offsetHeight)
  FBTrace.sysout("scrollToBottom attempt to scroll non-scrollable
  element "+element,element);}
  return(element.scrollTop==element.scrollHeight);};this.move=function(element,x,y)
  {element.style.left=x+"px";element.style.top=y+"px";};this.resize=function(element,w,h)
  {element.style.width=w+"px";element.style.height=h+"px";};this.linesIntoCenterView=function(element,scrollBox)
  {if(!scrollBox)
  scrollBox=this.getOverflowParent(element);if(!scrollBox)
  return;var offset=this.getClientOffset(element);var
  topSpace=offset.y-scrollBox.scrollTop;var
  bottomSpace=(scrollBox.scrollTop+scrollBox.clientHeight)
  -(offset.y+element.offsetHeight);if(topSpace<0||bottomSpace<0)
  {var split=(scrollBox.clientHeight/2);var
  centerY=offset.y-split;scrollBox.scrollTop=centerY;topSpace=split;bottomSpace=split-element.offsetHeight;}
  return{before:Math.round((topSpace/element.offsetHeight)+0.5),after:Math.round((bottomSpace/element.offsetHeight)+0.5)};};this.scrollIntoCenterView=function(element,scrollBox,notX,notY)
  {if(!element) return;if(!scrollBox)
  scrollBox=this.getOverflowParent(element);if(!scrollBox)
  return;var offset=this.getClientOffset(element);if(!notY) {var
  topSpace=offset.y-scrollBox.scrollTop;var
  bottomSpace=(scrollBox.scrollTop+scrollBox.clientHeight)
  -(offset.y+element.offsetHeight);if(topSpace<0||bottomSpace<0)
  {var
  centerY=offset.y-(scrollBox.clientHeight/2);scrollBox.scrollTop=centerY;}}
  if(!notX) {var leftSpace=offset.x-scrollBox.scrollLeft;var
  rightSpace=(scrollBox.scrollLeft+scrollBox.clientWidth)
  -(offset.x+element.clientWidth);if(leftSpace<0||rightSpace<0)
  {var
  centerX=offset.x-(scrollBox.clientWidth/2);scrollBox.scrollLeft=centerX;}}
  if(FBTrace.DBG_SOURCEFILES)
  FBTrace.sysout("lib.scrollIntoCenterView
  ","Element:"+element.innerHTML);};var cssKeywordMap=null;var
  cssPropNames=null;var cssColorNames=null;var
  imageRules=null;this.getCSSKeywordsByProperty=function(propName)
  {if(!cssKeywordMap) {cssKeywordMap={};for(var name in
  this.cssInfo) {var list=[];var types=this.cssInfo[name];for(var
  i=0;i<',elt.nodeName.toLowerCase());for(var i=0;i');var
  pureText=true;for(var
  child=element.firstChild;child;child=child.nextSibling)
  pureText=pureText&&(child.nodeType==Node.TEXT_NODE);if(pureText)
  html.push(escapeForHtmlEditor(elt.textContent));else{for(var
  child=elt.firstChild;child;child=child.nextSibling)
  toHTML(child);}
  html.push('</',elt.nodeName.toLowerCase(),'>');} else
  if(isElementSVG(elt)||isElementMathML(elt)) {html.push('/>');}
  else if(self.isSelfClosing(elt))
  {html.push((isElementXHTML(elt))?'/>':'>');} else
  {html.push('></',elt.nodeName.toLowerCase(),'>');}} else
  if(elt.nodeType==Node.TEXT_NODE)
  html.push(escapeForTextNode(elt.textContent));else
  if(elt.nodeType==Node.CDATA_SECTION_NODE) html.push('
<![CDATA[',elt.nodeValue,']]>
');else if(elt.nodeType==Node.COMMENT_NODE) html.push('
<!--',elt.nodeValue,'-->');} var html=[];toHTML(element);return
html.join("");};this.getElementXML=function(element) {function
toXML(elt) {if(elt.nodeType==Node.ELEMENT_NODE)
{if(unwrapObject(elt).firebugIgnore)
return;xml.push('<',elt.nodeName.toLowerCase());for(var
i=0;i');for(var child=elt.firstChild;child;child=child.nextSibling)
toXML(child);xml.push('</',elt.nodeName.toLowerCase(),'>');}
else xml.push('/>');} else if(elt.nodeType==Node.TEXT_NODE)
xml.push(elt.nodeValue);else
if(elt.nodeType==Node.CDATA_SECTION_NODE) xml.push('
<![CDATA[',elt.nodeValue,']]>
');else if(elt.nodeType==Node.COMMENT_NODE) xml.push('
<!--',elt.nodeValue,'-->');} var xml=[];toXML(element);return
xml.join("");};this.hasClass=function(node,name)
{if(arguments.length==2) return(' '+node.className+' ').indexOf('
'+name+' ')!=-1;if(!node||node.nodeType!=1) return false;else
{for(var i=1;i=0) {var
size=name.length;node.className=node.className.substr(0,index-1)+node.className.substr(index+size);}}};this.toggleClass=function(elt,name)
{if((' '+elt.className+' ').indexOf(' '+name+' ')!=-1)
this.removeClass(elt,name);else
this.setClass(elt,name);};this.setClassTimed=function(elt,name,context,timeout)
{if(!timeout) timeout=1300;if(elt.__setClassTimeout)
context.clearTimeout(elt.__setClassTimeout);else
this.setClass(elt,name);elt.__setClassTimeout=context.setTimeout(function()
{delete
elt.__setClassTimeout;FBL.removeClass(elt,name);},timeout);};this.cancelClassTimed=function(elt,name,context)
{if(elt.__setClassTimeout)
{FBL.removeClass(elt,name);context.clearTimeout(elt.__setClassTimeout);delete
elt.__setClassTimeout;}};this.$=function(id,doc) {if(doc) return
doc.getElementById(id);else {return
FBL.Firebug.chrome.document.getElementById(id);}};this.$$=function(selector,doc)
{if(doc||!FBL.Firebug.chrome) return
FBL.Firebug.Selector(selector,doc);else {return
FBL.Firebug.Selector(selector,FBL.Firebug.chrome.document);}};this.getChildByClass=function(node)
{for(var i=1;i<mark return="" props=
"{encodedContent:url.substr(point+1)};var" metadatabuffer=
"url.substr(mark+1,point);var" metadata=
"metadataBuffer.split(';');for(var" i="0;i">'+hint;} else
{props['name']=caller_split.name;props['path']=caller_split.path;}}
else {if(!props.hasOwnProperty('path'))
props['path']="data:";if(!props.hasOwnProperty('name'))
props['name']=decodeURIComponent(props['encodedContent'].substr(0,200)).replace(/\s*$/,"");}
return props;};this.splitURLTrue=function(url) {var
m=reSplitFile.exec(url);if(!m) return{name:url,path:url};else
if(!m[2]) return{path:m[1],name:m[1]};else
return{path:m[1],name:m[2]+m[3]};};this.getFileExtension=function(url)
{if(!url) return null;var
queryString=url.indexOf("?");if(queryString!=-1)
url=url.substr(0,queryString);var
lastDot=url.lastIndexOf(".");return
url.substr(lastDot+1);};this.isSystemURL=function(url)
{if(!url)return true;if(url.length==0)return
true;if(url[0]=='h')return false;if(url.substr(0,9)=="resource:")
return true;else if(url.substr(0,16)=="chrome://firebug") return
true;else if(url=="XPCSafeJSObjectWrapper.cpp") return true;else
if(url.substr(0,6)=="about:") return true;else
if(url.indexOf("firebug-service.js")!=-1) return true;else return
false;};this.isSystemPage=function(win) {try {var
doc=win.document;if(!doc) return
false;if((doc.styleSheets.length&&doc.styleSheets[0].href=="chrome://global/content/xml/XMLPrettyPrint.css")||(doc.styleSheets.length>1&&doc.styleSheets[1].href=="chrome://browser/skin/feeds/subscribe.css"))
return true;return FBL.isSystemURL(win.location.href);} catch(exc)
{ERROR("tabWatcher.isSystemPage document not ready:"+exc);return
false;}};this.isSystemStyleSheet=function(sheet) {var
href=sheet&&sheet.href;return
href&&FBL.isSystemURL(href);};this.getURIHost=function(uri)
{try {if(uri) return uri.host;else return "";} catch(exc) {return
"";}};this.isLocalURL=function(url) {if(url.substr(0,5)=="file:")
return true;else if(url.substr(0,8)=="wyciwyg:") return true;else
return false;};this.isDataURL=function(url)
{return(url&&url.substr(0,5)=="data:");};this.getLocalPath=function(url)
{if(this.isLocalURL(url)) {var
fileHandler=ioService.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler);var
file=fileHandler.getFileFromURLSpec(url);return
file.path;}};this.getURLFromLocalFile=function(file) {var
fileHandler=ioService.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler);var
URL=fileHandler.getURLSpecFromFile(file);return
URL;};this.getDataURLForContent=function(content,url) {var
uri="data:text/html;";uri+="fileName="+encodeURIComponent(url)+",";uri+=encodeURIComponent(content);return
uri;},this.getDomain=function(url) {var
m=/[^:]+:\/{1,3}([^\/]+)/.exec(url);return
m?m[1]:"";};this.getURLPath=function(url) {var
m=/[^:]+:\/{1,3}[^\/]+(\/.*?)$/.exec(url);return
m?m[1]:"";};this.getPrettyDomain=function(url) {var
m=/[^:]+:\/{1,3}(www\.)?([^\/]+)/.exec(url);return
m?m[2]:"";};this.absoluteURL=function(url,baseURL) {return
this.absoluteURLWithDots(url,baseURL).replace("/./","/","g");};this.absoluteURLWithDots=function(url,baseURL)
{if(url[0]=="?") return baseURL+url;var
reURL=/(([^:]+:)\/{1,2}[^\/]*)(.*?)$/;var m=reURL.exec(url);if(m)
return url;var m=reURL.exec(baseURL);if(!m) return "";var
head=m[1];var tail=m[3];if(url.substr(0,2)=="//") return
m[2]+url;else if(url[0]=="/") {return head+url;} else
if(tail[tail.length-1]=="/") return baseURL+url;else {var
parts=tail.split("/");return
head+parts.slice(0,parts.length-1).join("/")+"/"+url;}};this.normalizeURL=function(url)
{if(!url) return "";if(url.length<255)
{url=url.replace(/[^\/]+\/\.\.\//,"","g");url=url.replace(/#.*/,"");url=url.replace(/file:\/([^\/])/g,"file:///$1");if(url.indexOf('chrome:')==0)
{var m=reChromeCase.exec(url);if(m)
{url="chrome://"+m[1].toLowerCase()+"/"+m[2];}}} return
url;};this.denormalizeURL=function(url) {return
url.replace(/file:\/\/\//g,"file:/");};this.parseURLParams=function(url)
{var q=url?url.indexOf("?"):-1;if(q==-1) return[];var
search=url.substr(q+1);var h=search.lastIndexOf("#");if(h!=-1)
search=search.substr(0,h);if(!search) return[];return
this.parseURLEncodedText(search);};this.parseURLEncodedText=function(text)
{var maxValueLength=25000;var params=[];text=text.replace(/\+/g,"
");var args=text.split("&");for(var i=0;imaxValueLength)
parts[1]=this.$STR("LargeData");params.push({name:decodeURIComponent(parts[0]),value:decodeURIComponent(parts[1])});}
else params.push({name:decodeURIComponent(parts[0]),value:""});}
catch(e) {if(FBTrace.DBG_ERRORS)
{FBTrace.sysout("parseURLEncodedText EXCEPTION
",e);FBTrace.sysout("parseURLEncodedText EXCEPTION
URI",args[i]);}}} params.sort(function(a,b){return
a.name<=b.name?-1:1;});return
params;};this.parseURLParamsArray=function(url) {var
q=url?url.indexOf("?"):-1;if(q==-1) return[];var
search=url.substr(q+1);var h=search.lastIndexOf("#");if(h!=-1)
search=search.substr(0,h);if(!search) return[];return
this.parseURLEncodedTextArray(search);};this.parseURLEncodedTextArray=function(text)
{var maxValueLength=25000;var params=[];text=text.replace(/\+/g,"
");var args=text.split("&");for(var i=0;imaxValueLength)
parts[1]=this.$STR("LargeData");params.push({name:decodeURIComponent(parts[0]),value:[decodeURIComponent(parts[1])]});}
else params.push({name:decodeURIComponent(parts[0]),value:[""]});}
catch(e) {if(FBTrace.DBG_ERRORS)
{FBTrace.sysout("parseURLEncodedText EXCEPTION
",e);FBTrace.sysout("parseURLEncodedText EXCEPTION
URI",args[i]);}}} params.sort(function(a,b){return
a.name<=b.name?-1:1;});return
params;};this.reEncodeURL=function(file,text) {var
lines=text.split("\n");var
params=this.parseURLEncodedText(lines[lines.length-1]);var
args=[];for(var
i=0;i=200&&status<300||status==304,response=this.getResponse(o);if(fn=o["onUpdate"])
fn(response,o);if(fn=o["on"+(success?"Success":"Failure")])
fn(response,o);t.onreadystatechange=FBL.emptyFn;if(this.requests.length>0)
setTimeout(this.sendRequest,10);}},getResponse:function(options)
{var t=this.transport,type=options.dataType;var
status=t.status==1223?204:t.status;if(status>=200&&status<300||status==304)return
t.statusText;else if(type=="text")return t.responseText;else
if(type=="html")return t.responseText;else if(type=="xml")return
t.responseXML;else if(type=="json")return
eval("("+t.responseText+")");},getState:function() {return
this.states[this.transport.readyState];}};this.createCookie=function(name,value,days)
{if('cookie'in document) {if(days) {var date=new
Date();date.setTime(date.getTime()+(days*24*60*60*1000));var
expires="; expires="+date.toGMTString();} else var
expires="";document.cookie=name+"="+value+expires+";
path=/";}};this.readCookie=function(name) {if('cookie'in document)
{var nameEQ=name+"=";var ca=document.cookie.split(';');for(var
i=0;iobjects.length)
{format="";objIndex=-1;parts.length=0;break;}}} var
result=[];for(var i=0;i<=0) return parts;var
reg=/((^%|.%)(\d+)?(\.)([a-zA-Z]))|((^%|.%)([a-zA-Z]))/;for(var
m=reg.exec(format);m;m=reg.exec(format))
{if(m[0].substr(0,2)=="%%")
{parts.push(format.substr(0,m.index));parts.push(m[0].substr(1));}
else {var type=m[8]?m[8]:m[5];var
precision=m[3]?parseInt(m[3]):(m[4]=="."?-1:0);var
rep=null;switch(type) {case "s":rep=FirebugReps.Text;break;case
"f":case "i":case "d":rep=FirebugReps.Number;break;case
"o":rep=null;break;}
parts.push(format.substr(0,m[0][0]=="%"?m.index:m.index+1));parts.push({rep:rep,precision:precision,type:("%"+type)});}
format=format.substr(m.index+m[0].length);}
parts.push(format);return
parts;};}});FBL.ns(function(){with(FBL){var modules=[];var
panelTypes=[];var panelTypeMap={};var reps=[];var
parentPanelMap={};FBL.Firebug={version:"Firebug Lite
1.4.0a1",revision:"$Revision$",modules:modules,panelTypes:panelTypes,panelTypeMap:panelTypeMap,reps:reps,initialize:function()
{if(FBTrace.DBG_INITIALIZE)FBTrace.sysout("Firebug.initialize","initializing
application");Firebug.browser=new
Context(Env.browser);Firebug.context=Firebug.browser;cacheDocument();if(Firebug.Inspector&&Firebug.Inspector.create)
Firebug.Inspector.create();if(FBL.processAllStyleSheets)
processAllStyleSheets(Firebug.browser.document);FirebugChrome.initialize();dispatch(modules,"initialize",[]);if(Env.onLoad)
{var onLoad=Env.onLoad;delete
Env.onLoad;setTimeout(onLoad,200);}},shutdown:function()
{if(Firebug.Inspector)
Firebug.Inspector.destroy();dispatch(modules,"shutdown",[]);var
chromeMap=FirebugChrome.chromeMap;for(var name in chromeMap)
{if(chromeMap.hasOwnProperty(name)) {try
{chromeMap[name].destroy();} catch(E)
{if(FBTrace.DBG_ERRORS)FBTrace.sysout("chrome.destroy() failed to:
"+name);}}}
Firebug.Lite.Cache.Element.clear();Firebug.Lite.Cache.StyleSheet.clear();Firebug.browser=null;Firebug.context=null;},registerModule:function()
{modules.push.apply(modules,arguments);if(FBTrace.DBG_INITIALIZE)FBTrace.sysout("Firebug.registerModule");},registerPanel:function()
{panelTypes.push.apply(panelTypes,arguments);for(var
i=0,panelType;panelType=arguments[i];++i)
{panelTypeMap[panelType.prototype.name]=arguments[i];if(panelType.prototype.parentPanel)
parentPanelMap[panelType.prototype.parentPanel]=1;}
if(FBTrace.DBG_INITIALIZE) for(var
i=0;i<",create:function(context,doc)
{this.hasSidePanel=parentPanelMap.hasOwnProperty(this.name);this.panelBarNode=$("fbPanelBar1");this.sidePanelBarBoxNode=$("fbPanelBar2");if(this.hasSidePanel)
{this.sidePanelBar=extend({},PanelBar);this.sidePanelBar.create(this);}
var
options=this.options=extend(Firebug.Panel.options,this.options);var
panelId="fb"+this.name;if(options.isPreRendered)
{this.panelNode=$(panelId);this.tabNode=$(panelId+"Tab");this.tabNode.style.display="block";if(options.hasToolButtons)
{this.toolButtonsNode=$(panelId+"Buttons");}
if(options.hasStatusBar)
{this.statusBarBox=$("fbStatusBarBox");this.statusBarNode=$(panelId+"StatusBar");}}
else {var containerSufix=this.parentPanel?"2":"1";var
panelNode=this.panelNode=createElement("div",{id:panelId,className:"fbPanel"});$("fbPanel"+containerSufix).appendChild(panelNode);var
tabHTML='<span class="fbTabText">'+ this.title+'</span>';var
tabNode=this.tabNode=createElement("a",{id:panelId+"Tab",className:"fbTab
fbHover",innerHTML:tabHTML});if(isIE6)
{tabNode.href="javascript:void(0)";} var
panelBarNode=this.parentPanel?Firebug.chrome.getPanel(this.parentPanel).sidePanelBarNode:this.panelBarNode;panelBarNode.appendChild(tabNode);tabNode.style.display="block";if(options.hasToolButtons)
{this.toolButtonsNode=createElement("span",{id:panelId+"Buttons",className:"fbToolbarButtons"});$("fbToolbarButtons").appendChild(this.toolButtonsNode);}
if(options.hasStatusBar)
{this.statusBarBox=$("fbStatusBarBox");this.statusBarNode=createElement("span",{id:panelId+"StatusBar",className:"fbToolbarButtons
fbStatusBar"});this.statusBarBox.appendChild(this.statusBarNode);}}
this.containerNode=this.panelNode.parentNode;if(FBTrace.DBG_INITIALIZE)FBTrace.sysout("Firebug.Panel.create",this.name);this.onContextMenu=bind(this.onContextMenu,this);},destroy:function(state)
{if(FBTrace.DBG_INITIALIZE)FBTrace.sysout("Firebug.Panel.destroy",this.name);if(this.hasSidePanel)
{this.sidePanelBar.destroy();this.sidePanelBar=null;}
this.options=null;this.name=null;this.parentPanel=null;this.tabNode=null;this.panelNode=null;this.containerNode=null;this.toolButtonsNode=null;this.statusBarBox=null;this.statusBarNode=null;},initialize:function()
{if(FBTrace.DBG_INITIALIZE)FBTrace.sysout("Firebug.Panel.initialize",this.name);if(this.hasSidePanel)
{this.sidePanelBar.initialize();} var
options=this.options=extend(Firebug.Panel.options,this.options);var
panelId="fb"+this.name;this.panelNode=$(panelId);this.tabNode=$(panelId+"Tab");this.tabNode.style.display="block";if(options.hasStatusBar)
{this.statusBarBox=$("fbStatusBarBox");this.statusBarNode=$(panelId+"StatusBar");}
if(options.hasToolButtons)
{this.toolButtonsNode=$(panelId+"Buttons");}
this.containerNode=this.panelNode.parentNode;this.containerNode.scrollTop=this.lastScrollTop;addEvent(this.containerNode,"contextmenu",this.onContextMenu);Firebug.chrome.currentPanel=Firebug.chrome.selectedPanel&&Firebug.chrome.selectedPanel.sidePanelBar?Firebug.chrome.selectedPanel.sidePanelBar.selectedPanel:Firebug.chrome.selectedPanel;Firebug.showInfoTips=true;Firebug.InfoTip.initializeBrowser(Firebug.chrome);},shutdown:function()
{if(FBTrace.DBG_INITIALIZE)FBTrace.sysout("Firebug.Panel.shutdown",this.name);Firebug.InfoTip.uninitializeBrowser(Firebug.chrome);if(Firebug.chrome.largeCommandLineVisible)
Firebug.chrome.hideLargeCommandLine();if(this.hasSidePanel) {}
this.lastScrollTop=this.containerNode.scrollTop;removeEvent(this.containerNode,"contextmenu",this.onContextMenu);},detach:function(oldChrome,newChrome)
{if(oldChrome.selectedPanel.name==this.name)
this.lastScrollTop=oldChrome.selectedPanel.containerNode.scrollTop;},reattach:function(doc)
{if(this.options.innerHTMLSync)
this.synchronizeUI();},synchronizeUI:function()
{this.containerNode.scrollTop=this.lastScrollTop||0;},show:function(state)
{var options=this.options;if(options.hasStatusBar)
{this.statusBarBox.style.display="inline";this.statusBarNode.style.display="inline";}
if(options.hasToolButtons)
{this.toolButtonsNode.style.display="inline";}
this.panelNode.style.display="block";this.visible=true;if(!this.parentPanel)
Firebug.chrome.layout(this);},hide:function(state) {var
options=this.options;if(options.hasStatusBar)
{this.statusBarBox.style.display="none";this.statusBarNode.style.display="none";}
if(options.hasToolButtons)
{this.toolButtonsNode.style.display="none";}
this.panelNode.style.display="none";this.visible=false;},watchWindow:function(win)
{},unwatchWindow:function(win) {},updateOption:function(name,value)
{},showToolbarButtons:function(buttonsId,show) {try
{if(!this.context.browser) {if(FBTrace.DBG_ERRORS)
FBTrace.sysout("firebug.Panel showToolbarButtons this.context has
no browser, this:",this);return;} var
buttons=this.context.browser.chrome.$(buttonsId);if(buttons)
collapse(buttons,show?"false":"true");} catch(exc)
{if(FBTrace.DBG_ERRORS) {FBTrace.dumpProperties("firebug.Panel
showToolbarButtons
FAILS",exc);if(!this.context.browser)FBTrace.dumpStack("firebug.Panel
showToolbarButtons no browser");}}},supportsObject:function(object)
{return 0;},hasObject:function(object) {return
false;},select:function(object,forceUpdate) {if(!object)
object=this.getDefaultSelection(this.context);if(FBTrace.DBG_PANELS)
FBTrace.sysout("firebug.select "+this.name+" forceUpdate:
"+forceUpdate+"
"+object+((object==this.selection)?"==":"!=")+this.selection);if(forceUpdate||object!=this.selection)
{this.selection=object;this.updateSelection(object);}},updateSelection:function(object)
{},markChange:function(skipSelf) {if(this.dependents) {if(skipSelf)
{for(var i=0;ilocB.path) return 1;if(locA.pathlocB.name) return
1;if(locA.name<0?allLocs.length:0)+intermediate;}else{return(curPos+index+1)%allLocs.length;}};for(var
next=0;next<"532";var
evalError="___firebug_evaluation_error___";var pixelsPerInch;var
resetStyle="margin:0; padding:0; border:0; position:absolute;
overflow:hidden; display:block;";var
offscreenStyle=resetStyle+"top:-1234px;
left:-1234px;";FBL.Context=function(win)
{this.window=win.window;this.document=win.document;this.browser=Env.browser;if(isIE&&!this.window.eval)
{this.window.execScript("null");if(!this.window.eval) throw new
Error("Firebug Error: eval() method not found in this window");}
this.eval=this.window.eval("new Function('"+ "try{ return
window.eval.apply(window,arguments) }catch(E){
E."+evalError+"=true; return E }"+
"')");};FBL.Context.prototype={browser:null,loaded:true,setTimeout:function(fn,delay)
{var win=this.window;if(win.setTimeout==this.setTimeout) throw new
Error("setTimeout recursion");var
timeout=win.setTimeout.apply?win.setTimeout.apply(win,arguments):win.setTimeout(fn,delay);if(!this.timeouts)
this.timeouts={};this.timeouts[timeout]=1;return
timeout;},clearTimeout:function(timeout)
{clearTimeout(timeout);if(this.timeouts) delete
this.timeouts[timeout];},setInterval:function(fn,delay) {var
win=this.window;var
timeout=win.setInterval.apply?win.setInterval.apply(win,arguments):win.setInterval(fn,delay);if(!this.intervals)
this.intervals={};this.intervals[timeout]=1;return
timeout;},clearInterval:function(timeout)
{clearInterval(timeout);if(this.intervals) delete
this.intervals[timeout];},invalidatePanels:function()
{if(!this.invalidPanels) this.invalidPanels={};for(var
i=0;iwidth||el.scrollHeight>height))
{width=el.scrollWidth;height=el.scrollHeight;}
return{width:width,height:height};},getWindowScrollPosition:function()
{var top=0,left=0,el;if(typeof this.window.pageYOffset=="number")
{top=this.window.pageYOffset;left=this.window.pageXOffset;} else
if((el=this.document.body)&&(el.scrollTop||el.scrollLeft))
{top=el.scrollTop;left=el.scrollLeft;} else
if((el=this.document.documentElement)&&(el.scrollTop||el.scrollLeft))
{top=el.scrollTop;left=el.scrollLeft;}
return{top:top,left:left};},getElementFromPoint:function(x,y)
{if(shouldFixElementFromPoint) {var
scroll=this.getWindowScrollPosition();return
this.document.elementFromPoint(x+scroll.left,y+scroll.top);} else
return
this.document.elementFromPoint(x,y);},getElementPosition:function(el)
{var left=0 var top=0;do {left+=el.offsetLeft;top+=el.offsetTop;}
while(el=el.offsetParent);return{left:left,top:top};},getElementBox:function(el)
{var result={};if(el.getBoundingClientRect) {var
rect=el.getBoundingClientRect();var
offset=isIE?this.document.body.clientTop||this.document.documentElement.clientTop:0;var
scroll=this.getWindowScrollPosition();result.top=Math.round(rect.top-offset+scroll.top);result.left=Math.round(rect.left-offset+scroll.left);result.height=Math.round(rect.bottom-rect.top);result.width=Math.round(rect.right-rect.left);}
else {var
position=this.getElementPosition(el);result.top=position.top;result.left=position.left;result.height=el.offsetHeight;result.width=el.offsetWidth;}
return result;},getMeasurement:function(el,name) {var
result={value:0,unit:"px"};var
cssValue=this.getStyle(el,name);if(!cssValue)return
result;if(cssValue.toLowerCase()=="auto")return result;var
reMeasure=/(\d+\.?\d*)(.*)/;var m=cssValue.match(reMeasure);if(m)
{result.value=m[1]-0;result.unit=m[2].toLowerCase();} return
result;},getMeasurementInPixels:function(el,name) {if(!el)return
null;var m=this.getMeasurement(el,name);var value=m.value;var
unit=m.unit;if(unit=="px") return value;else if(unit=="pt") return
this.pointsToPixels(name,value);if(unit=="em") return
this.emToPixels(el,value);else if(unit=="%") return
this.percentToPixels(el,value);},getMeasurementBox1:function(el,name)
{var sufixes=["Top","Left","Bottom","Right"];var result=[];for(var
i=0,sufix;sufix=sufixes[i];i++)
result[i]=Math.round(this.getMeasurementInPixels(el,name+sufix));return{top:result[0],left:result[1],bottom:result[2],right:result[3]};},getMeasurementBox:function(el,name)
{var result=[];var
sufixes=name=="border"?["TopWidth","LeftWidth","BottomWidth","RightWidth"]:["Top","Left","Bottom","Right"];if(isIE)
{var propName,cssValue;var autoMargin=null;for(var
i=0,sufix;sufix=sufixes[i];i++)
{propName=name+sufix;cssValue=el.currentStyle[propName]||el.style[propName];if(cssValue=="auto")
{if(!autoMargin)
autoMargin=this.getCSSAutoMarginBox(el);result[i]=autoMargin[sufix.toLowerCase()];}
else result[i]=this.getMeasurementInPixels(el,propName);}} else
{for(var i=0,sufix;sufix=sufixes[i];i++)
result[i]=this.getMeasurementInPixels(el,name+sufix);}
return{top:result[0],left:result[1],bottom:result[2],right:result[3]};},getCSSAutoMarginBox:function(el)
{if(isIE&&" meta title input script link a ".indexOf("
"+el.nodeName.toLowerCase()+" ")!=-1)
return{top:0,left:0,bottom:0,right:0};if(isIE&&" h1 h2 h3
h4 h5 h6 h7 ul p ".indexOf(" "+el.nodeName.toLowerCase()+" ")==-1)
return{top:0,left:0,bottom:0,right:0};var
offsetTop=0;if(false&&isIEStantandMode) {var
scrollSize=Firebug.browser.getWindowScrollSize();offsetTop=scrollSize.height;}
var
box=this.document.createElement("div");box.style.cssText="margin:0;
padding:1px; border: 0; visibility: hidden;";var
clone=el.cloneNode(false);var
text=this.document.createTextNode(" ");clone.appendChild(text);box.appendChild(clone);this.document.body.appendChild(box);var
marginTop=clone.offsetTop-box.offsetTop-1;var
marginBottom=box.offsetHeight-clone.offsetHeight-2-marginTop;var
marginLeft=clone.offsetLeft-box.offsetLeft-1;var
marginRight=box.offsetWidth-clone.offsetWidth-2-marginLeft;this.document.body.removeChild(box);return{top:marginTop+offsetTop,left:marginLeft,bottom:marginBottom-offsetTop,right:marginRight};},getFontSizeInPixels:function(el)
{var
size=this.getMeasurement(el,"fontSize");if(size.unit=="px")return
size.value;var computeDirtyFontSize=function(el,calibration) {var
div=this.document.createElement("div");var
divStyle=offscreenStyle;if(calibration) divStyle+="
font-size:"+calibration+"px;";div.style.cssText=divStyle;div.innerHTML="A";el.appendChild(div);var
value=div.offsetHeight;el.removeChild(div);return value;} var
rate=200/225;var value=computeDirtyFontSize(el);return
value*rate;},pointsToPixels:function(name,value,returnFloat) {var
axis=/Top$|Bottom$/.test(name)?"y":"x";var
result=value*pixelsPerInch[axis]/72;return
returnFloat?result:Math.round(result);},emToPixels:function(el,value)
{if(!el)return null;var
fontSize=this.getFontSizeInPixels(el);return
Math.round(value*fontSize);},exToPixels:function(el,value)
{if(!el)return null;var
div=this.document.createElement("div");div.style.cssText=offscreenStyle+"width:"+value+"ex;";el.appendChild(div);var
value=div.offsetWidth;el.removeChild(div);return
value;},percentToPixels:function(el,value) {if(!el)return null;var
div=this.document.createElement("div");div.style.cssText=offscreenStyle+"width:"+value+"%;";el.appendChild(div);var
value=div.offsetWidth;el.removeChild(div);return
value;},getStyle:isIE?function(el,name) {return
el.currentStyle[name]||el.style[name]||undefined;}:function(el,name)
{return
this.document.defaultView.getComputedStyle(el,null)[name]||el.style[name]||undefined;}};}});FBL.ns(function(){with(FBL){var
WindowDefaultOptions={type:"frame",id:"FirebugUI",height:250},commandLine,fbTop,fbContent,fbContentStyle,fbBottom,fbBtnInspect,fbToolbar,fbPanelBox1,fbPanelBox1Style,fbPanelBox2,fbPanelBox2Style,fbPanelBar2Box,fbPanelBar2BoxStyle,fbHSplitter,fbVSplitter,fbVSplitterStyle,fbPanel1,fbPanel1Style,fbPanel2,fbPanel2Style,fbConsole,fbConsoleStyle,fbHTML,fbCommandLine,fbLargeCommandLine,fbLargeCommandButtons,topHeight,topPartialHeight,chromeRedrawSkipRate=isIE?75:isOpera?80:75,lastSelectedPanelName,focusCommandLineState=0,lastFocusedPanelName,lastHSplitterMouseMove=0,onHSplitterMouseMoveBuffer=null,onHSplitterMouseMoveTimer=null,lastVSplitterMouseMove=0;FBL.FirebugChrome={isOpen:false,height:250,sidePanelWidth:350,selectedPanelName:"Console",selectedHTMLElementId:null,chromeMap:{},htmlSelectionStack:[],consoleMessageQueue:[],create:function()
{if(FBTrace.DBG_INITIALIZE)FBTrace.sysout("FirebugChrome.create","creating
chrome window");createChromeWindow();},initialize:function()
{if(FBTrace.DBG_INITIALIZE)FBTrace.sysout("FirebugChrome.initialize","initializing
chrome
window");if(Env.chrome.type=="frame"||Env.chrome.type=="div")
ChromeMini.create(Env.chrome);var chrome=Firebug.chrome=new
Chrome(Env.chrome);FirebugChrome.chromeMap[chrome.type]=chrome;addGlobalEvent("keydown",onGlobalKeyDown);if(Env.Options.enablePersistent&&chrome.type=="popup")
{var frame=FirebugChrome.chromeMap.frame;if(frame)
frame.close();chrome.initialize();}},clone:function(FBChrome)
{for(var name in FBChrome) {var
prop=FBChrome[name];if(FBChrome.hasOwnProperty(name)&&!isFunction(prop))
{this[name]=prop;}}}};var createChromeWindow=function(options)
{options=extend(WindowDefaultOptions,options||{});var
chrome={},context=options.context||Env.browser,type=chrome.type=Env.Options.enablePersistent?"popup":options.type,isChromeFrame=type=="frame",useLocalSkin=Env.useLocalSkin,url=useLocalSkin?Env.Location.skin:"about:blank",body=context.document.getElementsByTagName("body")[0],formatNode=function(node)
{if(!Env.isDebugMode) {node.firebugIgnore=true;}
node.style.border="0";node.style.visibility="hidden";node.style.zIndex="2147483647";node.style.position=noFixedPosition?"absolute":"fixed";node.style.width="100%";node.style.left="0";node.style.bottom=noFixedPosition?"-1px":"0";node.style.height=options.height+"px";if(isFirefox)
node.style.display="none";},createChromeDiv=function() {var
node=chrome.node=createGlobalElement("div"),style=createGlobalElement("style"),css=FirebugChrome.Skin.CSS,rules=".fbBody
*{margin:0;padding:0;font-size:11px;line-height:13px;color:inherit;}"+
css+ ".fbBody #fbHSplitter{position:absolute !important;} .fbBody
#fbHTML span{line-height:14px;} .fbBody .lineNo
div{line-height:inherit
!important;}";style.type="text/css";if(style.styleSheet)
style.styleSheet.cssText=rules;else
style.appendChild(context.document.createTextNode(rules));document.getElementsByTagName("head")[0].appendChild(style);node.className="fbBody";node.style.overflow="hidden";node.innerHTML=getChromeDivTemplate();if(isIE)
{setTimeout(function(){node.firstChild.style.height="1px";node.firstChild.style.position="static";},0);}
formatNode(node);body.appendChild(node);chrome.window=window;chrome.document=document;onChromeLoad(chrome);};try
{if(type=="div") {createChromeDiv();return;} else if(isChromeFrame)
{var
node=chrome.node=createGlobalElement("iframe");node.setAttribute("src",url);node.setAttribute("frameBorder","0");formatNode(node);body.appendChild(node);node.id=options.id;}
else {var
height=FirebugChrome.height||options.height,options=["true,top=",Math.max(screen.availHeight-height-61,0),",left=0,height=",height,",width=",screen.availWidth-10,",resizable"].join(""),node=chrome.node=context.window.open(url,"popup",options);if(node)
{try {node.focus();} catch(E) {alert("Firebug Error: Firebug popup
was blocked.");return;}} else {alert("Firebug Error: Firebug popup
was blocked.");return;}} if(!useLocalSkin) {var
tpl=getChromeTemplate(!isChromeFrame),doc=isChromeFrame?node.contentWindow.document:node.document;doc.write(tpl);doc.close();}
var
win,waitDelay=useLocalSkin?isChromeFrame?200:300:100,waitForWindow=function()
{if(isChromeFrame&&(win=node.contentWindow)&&node.contentWindow.document.getElementById("fbCommandLine")||!isChromeFrame&&(win=node.window)&&node.document&&node.document.getElementById("fbCommandLine"))
{chrome.window=win.window;chrome.document=win.document;setTimeout(function(){onChromeLoad(chrome);},useLocalSkin?200:0);}
else setTimeout(waitForWindow,waitDelay);};waitForWindow();}
catch(e) {var msg=e.message||e;if(/access/i.test(msg))
{if(isChromeFrame) body.removeChild(node);else if(type=="popup")
node.close();createChromeDiv();} else {alert("Firebug Error:
Firebug GUI could not be created.");}}};var onChromeLoad=function
onChromeLoad(chrome)
{Env.chrome=chrome;if(FBTrace.DBG_INITIALIZE)FBTrace.sysout("Chrome
onChromeLoad","chrome window
loaded");if(Env.Options.enablePersistent)
{Env.FirebugChrome=FirebugChrome;chrome.window.Firebug=chrome.window.Firebug||{};chrome.window.Firebug.SharedEnv=Env;if(Env.isDevelopmentMode)
{Env.browser.window.FBDev.loadChromeApplication(chrome);} else {var
doc=chrome.document;var
script=doc.createElement("script");script.src=Env.Location.app+"#remote,persist";doc.getElementsByTagName("head")[0].appendChild(script);}}
else {if(chrome.type=="frame"||chrome.type=="div")
{setTimeout(function(){FBL.Firebug.initialize();},0);} else
if(chrome.type=="popup") {var
oldChrome=FirebugChrome.chromeMap.frame;var newChrome=new
Chrome(chrome);dispatch(newChrome.panelMap,"detach",[oldChrome,newChrome]);if(oldChrome)
oldChrome.close();newChrome.reattach(oldChrome,newChrome);}}};var
getChromeDivTemplate=function() {return
FirebugChrome.Skin.HTML;};var getChromeTemplate=function(isPopup)
{var tpl=FirebugChrome.Skin;var r=[],i=-1;r[++i]='';r[++i]='</mark>
  <head>
    <title>';r[++i]=Firebug.version;r[++i]='</title>
    <style>
    html,body{margin:0;padding:0;overflow:hidden;}';r[++i]=tpl.CSS;r[++i]='
    </style>
  </head><mark return="" props=
  "{encodedContent:url.substr(point+1)};var" metadatabuffer=
  "url.substr(mark+1,point);var" metadata=
  "metadataBuffer.split(';');for(var" i=
  "0;i">';r[++i]='</mark>';r[++i]=tpl.HTML;r[++i]='';return
  r.join("");};var Chrome=function Chrome(chrome) {var
  type=chrome.type;var
  Base=type=="frame"||type=="div"?ChromeFrameBase:ChromePopupBase;append(this,Base);append(this,chrome);append(this,new
  Context(chrome.window));FirebugChrome.chromeMap[type]=this;Firebug.chrome=this;Env.chrome=chrome.window;this.commandLineVisible=false;this.sidePanelVisible=false;this.create();return
  this;};var
  ChromeBase={};append(ChromeBase,Controller);append(ChromeBase,PanelBar);append(ChromeBase,{node:null,type:null,document:null,window:null,sidePanelVisible:false,commandLineVisible:false,largeCommandLineVisible:false,inspectButton:null,create:function()
  {PanelBar.create.call(this);if(Firebug.Inspector)
  this.inspectButton=new
  Button({type:"toggle",element:$("fbChrome_btInspect"),owner:Firebug.Inspector,onPress:Firebug.Inspector.startInspecting,onUnpress:Firebug.Inspector.stopInspecting});},destroy:function()
  {if(Firebug.Inspector)
  this.inspectButton.destroy();PanelBar.destroy.call(this);this.shutdown();},testMenu:function()
  {var firebugMenu=new Menu({id:"fbFirebugMenu",items:[{label:"Open
  Firebug",type:"shortcut",key:isFirefox?"Shift+F12":"F12",checked:true,command:"toggleChrome"},{label:"Open
  Firebug in New
  Window",type:"shortcut",key:isFirefox?"Ctrl+Shift+F12":"Ctrl+F12",command:"openPopup"},{label:"Inspect
  Element",type:"shortcut",key:"Ctrl+Shift+C",command:"toggleInspect"},{label:"Command
  Line",type:"shortcut",key:"Ctrl+Shift+L",command:"focusCommandLine"},"-",{label:"Options",type:"group",child:"fbFirebugOptionsMenu"},"-",{label:"Firebug
  Lite Website...",command:"visitWebsite"},{label:"Discussion
  Group...",command:"visitDiscussionGroup"},{label:"Issue
  Tracker...",command:"visitIssueTracker"}],onHide:function()
  {iconButton.restore();},toggleChrome:function()
  {Firebug.chrome.toggle();},openPopup:function()
  {Firebug.chrome.toggle(true,true);},toggleInspect:function()
  {Firebug.Inspector.toggleInspect();},focusCommandLine:function()
  {Firebug.chrome.focusCommandLine();},visitWebsite:function()
  {this.visit("http://getfirebug.com/lite.html");},visitDiscussionGroup:function()
  {this.visit("http://groups.google.com/group/firebug");},visitIssueTracker:function()
  {this.visit("http://code.google.com/p/fbug/issues/list");},visit:function(url)
  {window.open(url);}});var
  firebugOptionsMenu={id:"fbFirebugOptionsMenu",getItems:function()
  {var cookiesDisabled=!Firebug.saveCookies;return[{label:"Save
  Options in
  Cookies",type:"checkbox",value:"saveCookies",checked:Firebug.saveCookies,command:"saveOptions"},"-",{label:"Start
  Opened",type:"checkbox",value:"startOpened",checked:Firebug.startOpened,disabled:cookiesDisabled},{label:"Start
  in New
  Window",type:"checkbox",value:"startInNewWindow",checked:Firebug.startInNewWindow,disabled:cookiesDisabled},{label:"Show
  Icon When
  Hidden",type:"checkbox",value:"showIconWhenHidden",checked:Firebug.showIconWhenHidden,disabled:cookiesDisabled},{label:"Override
  Console
  Object",type:"checkbox",value:"overrideConsole",checked:Firebug.overrideConsole,disabled:cookiesDisabled},{label:"Ignore
  Firebug
  Elements",type:"checkbox",value:"ignoreFirebugElements",checked:Firebug.ignoreFirebugElements,disabled:cookiesDisabled},{label:"Disable
  When Firebug
  Active",type:"checkbox",value:"disableWhenFirebugActive",checked:Firebug.disableWhenFirebugActive,disabled:cookiesDisabled},{label:"Disable
  XHR
  Listener",type:"checkbox",value:"disableXHRListener",checked:Firebug.disableXHRListener,disabled:cookiesDisabled},{label:"Enable
  Trace
  Mode",type:"checkbox",value:"enableTrace",checked:Firebug.enableTrace,disabled:cookiesDisabled},{label:"Enable
  Persistent Mode
  (experimental)",type:"checkbox",value:"enablePersistent",checked:Firebug.enablePersistent,disabled:cookiesDisabled},"-",{label:"Reset
  All Firebug
  Options",command:"restorePrefs",disabled:cookiesDisabled}];},onCheck:function(target,value,checked)
  {Firebug.setPref(value,checked);},saveOptions:function(target)
  {var
  saveEnabled=target.getAttribute("checked");if(!saveEnabled)this.restorePrefs();this.updateMenu(target);return
  false;},restorePrefs:function(target)
  {Firebug.restorePrefs();if(Firebug.saveCookies)
  Firebug.savePrefs();else Firebug.erasePrefs();if(target)
  this.updateMenu(target);return
  false;},updateMenu:function(target) {var
  options=getElementsByClass(target.parentNode,"fbMenuOption");var
  firstOption=options[0];var
  enabled=Firebug.saveCookies;if(enabled)
  Menu.check(firstOption);else
  Menu.uncheck(firstOption);if(enabled) Menu.check(options[0]);else
  Menu.uncheck(options[0]);for(var
  i=1,length=options.length;ichromeRedrawSkipRate)
  {lastHSplitterMouseMove=new
  Date().getTime();handleHSplitterMouseMove();} else
  if(!onHSplitterMouseMoveTimer)
  onHSplitterMouseMoveTimer=setTimeout(handleHSplitterMouseMove,chromeRedrawSkipRate);cancelEvent(event,true);return
  false;};var handleHSplitterMouseMove=function()
  {if(onHSplitterMouseMoveTimer)
  {clearTimeout(onHSplitterMouseMoveTimer);onHSplitterMouseMoveTimer=null;}
  var clientY=onHSplitterMouseMoveBuffer;var
  windowSize=Firebug.browser.getWindowSize();var
  scrollSize=Firebug.browser.getWindowScrollSize();var
  commandLineHeight=Firebug.chrome.commandLineVisible?fbCommandLine.offsetHeight:0;var
  fixedHeight=topHeight+commandLineHeight;var
  chromeNode=Firebug.chrome.node;var
  scrollbarSize=!isIE&&(scrollSize.width>windowSize.width)?17:0;var
  height=windowSize.height;var
  chromeHeight=Math.max(height-clientY+5-scrollbarSize,fixedHeight);chromeHeight=Math.min(chromeHeight,windowSize.height-scrollbarSize);FirebugChrome.height=chromeHeight;chromeNode.style.height=chromeHeight+"px";if(noFixedPosition)
  Firebug.chrome.fixIEPosition();Firebug.chrome.draw();};var
  onHSplitterMouseUp=function onHSplitterMouseUp(event)
  {removeGlobalEvent("mousemove",onHSplitterMouseMove);removeGlobalEvent("mouseup",onHSplitterMouseUp);if(isIE)
  removeEvent(Firebug.browser.document.documentElement,"mouseleave",onHSplitterMouseUp);fbHSplitter.className="";Firebug.chrome.draw();return
  false;};var onVSplitterMouseDown=function
  onVSplitterMouseDown(event)
  {addGlobalEvent("mousemove",onVSplitterMouseMove);addGlobalEvent("mouseup",onVSplitterMouseUp);return
  false;};var onVSplitterMouseMove=function
  onVSplitterMouseMove(event) {if(new
  Date().getTime()-lastVSplitterMouseMove>chromeRedrawSkipRate)
  {var
  target=event.target||event.srcElement;if(target&&target.ownerDocument)
  {var clientX=event.clientX;var
  win=document.all?event.srcElement.ownerDocument.parentWindow:event.target.ownerDocument.defaultView;if(win!=win.parent)
  clientX+=win.frameElement?win.frameElement.offsetLeft:0;var
  size=Firebug.chrome.getSize();var
  x=Math.max(size.width-clientX+3,6);FirebugChrome.sidePanelWidth=x;Firebug.chrome.draw();}
  lastVSplitterMouseMove=new Date().getTime();}
  cancelEvent(event,true);return false;};var
  onVSplitterMouseUp=function onVSplitterMouseUp(event)
  {removeGlobalEvent("mousemove",onVSplitterMouseMove);removeGlobalEvent("mouseup",onVSplitterMouseUp);Firebug.chrome.draw();};}});FBL.ns(function(){with(FBL){Firebug.Lite={};}});FBL.ns(function(){with(FBL){Firebug.Lite.Browser=function(window)
  {this.contentWindow=window;this.contentDocument=window.document;this.currentURI={spec:window.location.href};};Firebug.Lite.Browser.prototype={toString:function()
  {return
  "Firebug.Lite.Browser";}};}});FBL.ns(function(){with(FBL){Firebug.Lite.Cache={ID:"firebug-"+new
  Date().getTime()};var cacheUID=0;var createCache=function() {var
  map={};var data={};var CID=Firebug.Lite.Cache.ID;var
  supportsDeleteExpando=!document.all;var
  cacheFunction=function(element) {return
  cacheAPI.set(element);};var cacheAPI={get:function(key) {return
  map.hasOwnProperty(key)?map[key]:null;},set:function(element)
  {var id=getValidatedKey(element);if(!id)
  {id=++cacheUID;element[CID]=id;} if(!map.hasOwnProperty(id))
  {map[id]=element;data[id]={};} return
  id;},unset:function(element) {var
  id=getValidatedKey(element);if(!id)return;if(supportsDeleteExpando)
  {delete element[CID];} else if(element.removeAttribute)
  {element.removeAttribute(CID);} delete map[id];delete
  data[id];},key:function(element) {return
  getValidatedKey(element);},has:function(element) {var
  id=getValidatedKey(element);return
  id&&map.hasOwnProperty(id);},each:function(callback)
  {for(var key in map) {if(map.hasOwnProperty(key))
  {callback(key,map[key]);}}},data:function(element,name,value)
  {if(value) {if(!name)return null;var
  id=cacheAPI.set(element);return data[id][name]=value;} else {var
  id=cacheAPI.key(element);return
  data.hasOwnProperty(id)&&data[id].hasOwnProperty(name)?data[id][name]:null;}},clear:function()
  {for(var id in map) {var
  element=map[id];cacheAPI.unset(element);}}};var
  getValidatedKey=function(element) {var
  id=element[CID];if(!supportsDeleteExpando&&id&&map.hasOwnProperty(id)&&map[id]!=element)
  {element.removeAttribute(CID);id=null;} return id;}
  FBL.append(cacheFunction,cacheAPI);return
  cacheFunction;};Firebug.Lite.Cache.StyleSheet=createCache();Firebug.Lite.Cache.Element=createCache();Firebug.Lite.Cache.Event=createCache();}});FBL.ns(function(){with(FBL){Firebug.Lite.Proxy={_callbacks:{},load:function(url)
  {var resourceDomain=getDomain(url);var
  isLocalResource=!resourceDomain||resourceDomain==Firebug.context.window.location.host;return
  isLocalResource?fetchResource(url):fetchProxyResource(url);},loadJSONP:function(url,callback)
  {var
  script=createGlobalElement("script"),doc=Firebug.context.document,uid=""+new
  Date().getTime(),callbackName="callback=Firebug.Lite.Proxy._callbacks."+uid,jsonpURL=url.indexOf("?")!=-1?url+"&"+callbackName:url+"?"+callbackName;Firebug.Lite.Proxy._callbacks[uid]=function(data)
  {if(callback)
  callback(data);script.parentNode.removeChild(script);delete
  Firebug.Lite.Proxy._callbacks[uid];};script.src=jsonpURL;if(doc.documentElement)
  doc.documentElement.appendChild(script);},YQL:function(url,callback)
  {var
  yql="http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22"+
  encodeURIComponent(url)+"%22&format=xml";this.loadJSONP(yql,function(data)
  {var source=data.results[0];var match=/\s+
  <p><mark return="" props=
  "{encodedContent:url.substr(point+1)};var" metadatabuffer=
  "url.substr(mark+1,point);var" metadata=
  "metadataBuffer.split(';');for(var" i=
  "0;i">([\s\S]+)<\/p>\s+<\/body>$/.exec(source);if(match)
  source=match[1];console.log(source);});}};var
  fetchResource=function(url) {var
  xhr=FBL.Ajax.getXHRObject();xhr.open("get",url,false);xhr.send();return
  xhr.responseText;};var fetchProxyResource=function(url) {var
  proxyURL=Env.Location.baseDir+"plugin/proxy/proxy.php?url="+encodeURIComponent(url);var
  response=fetchResource(proxyURL);try {var
  data=eval("("+response+")");} catch(E) {return "ERROR: Firebug
  Lite Proxy plugin returned an invalid response.";} return
  data?data.contents:"";};}});FBL.ns(function(){with(FBL){Firebug.Lite.Script=function(window)
  {this.fileName=null;this.isValid=null;this.baseLineNumber=null;this.lineExtent=null;this.tag=null;this.functionName=null;this.functionSource=null;};Firebug.Lite.Script.prototype={isLineExecutable:function(){},pcToLine:function(){},lineToPc:function(){},toString:function()
  {return
  "Firebug.Lite.Script";}};}});FBL.ns(function(){with(FBL){Firebug.Lite.Style={};}});FBL.ns(function(){with(FBL){var
  chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^
  >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;[0,0].sort(function(){baseHasDuplicate=false;return
  0;});var
  Sizzle=function(selector,context,results,seed){results=results||[];var
  origContext=context=context||document;if(context.nodeType!==1&&context.nodeType!==9){return[];}
  if(!selector||typeof selector!=="string"){return results;} var
  parts=[],m,set,checkSet,check,mode,extra,prune=true,contextXML=isXML(context),soFar=selector;while((chunker.exec(""),m=chunker.exec(soFar))!==null){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];break;}}
  if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context);}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);while(parts.length){selector=parts.shift();if(Expr.relative[selector])
  selector+=parts.shift();set=posProcess(selector,set);}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){var
  ret=Sizzle.find(parts.shift(),context,contextXML);context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0];}
  if(context){var
  ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set);}else{prune=false;}
  while(parts.length){var
  cur=parts.pop(),pop=cur;if(!Expr.relative[cur]){cur="";}else{pop=parts.pop();}
  if(pop==null){pop=context;}
  Expr.relative[cur](checkSet,pop,contextXML);}}else{checkSet=parts=[];}}
  if(!checkSet){checkSet=set;} if(!checkSet){throw "Syntax error,
  unrecognized expression: "+(cur||selector);}
  if(toString.call(checkSet)==="[object
  Array]"){if(!prune){results.push.apply(results,checkSet);}else
  if(context&&context.nodeType===1){for(var
  i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&contains(context,checkSet[i]))){results.push(set[i]);}}}else{for(var
  i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i]);}}}}else{makeArray(checkSet,results);}
  if(extra){Sizzle(extra,origContext,results,seed);Sizzle.uniqueSort(results);}
  return
  results;};Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;results.sort(sortOrder);if(hasDuplicate){for(var
  i=1;i":function(checkSet,part,isXML){var isPartStr=typeof
  part==="string";if(isPartStr&&!/\W/.test(part)){part=isXML?part:part.toUpperCase();for(var
  i=0,l=checkSet.length;i=0)){if(!inplace) result.push(elem);}else
  if(inplace){curLoop[i]=false;}}} return
  false;},ID:function(match){return
  match[1].replace(/\\/g,"");},TAG:function(match,curLoop){for(var
  i=0;curLoop[i]===false;i++){} return
  curLoop[i]&&isXML(curLoop[i])?match[1]:match[1].toUpperCase();},CHILD:function(match){if(match[1]=="nth"){var
  test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]=="even"&&"2n"||match[2]=="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0;}
  match[0]=done++;return
  match;},ATTR:function(match,curLoop,inplace,result,not,isXML){var
  name=match[1].replace(/\\/g,"");if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name];}
  if(match[2]==="~="){match[4]=" "+match[4]+" ";} return
  match;},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop);}else{var
  ret=Sizzle.filter(match[3],curLoop,inplace,true^not);if(!inplace){result.push.apply(result,ret);}
  return false;}}else
  if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return
  true;} return
  match;},POS:function(match){match.unshift(true);return
  match;}},filters:{enabled:function(elem){return
  elem.disabled===false&&elem.type!=="hidden";},disabled:function(elem){return
  elem.disabled===true;},checked:function(elem){return
  elem.checked===true;},selected:function(elem){elem.parentNode.selectedIndex;return
  elem.selected===true;},parent:function(elem){return!!elem.firstChild;},empty:function(elem){return!elem.firstChild;},has:function(elem,i,match){return!!Sizzle(match[3],elem).length;},header:function(elem){return
  /h\d/i.test(elem.nodeName);},text:function(elem){return
  "text"===elem.type;},radio:function(elem){return
  "radio"===elem.type;},checkbox:function(elem){return
  "checkbox"===elem.type;},file:function(elem){return
  "file"===elem.type;},password:function(elem){return
  "password"===elem.type;},submit:function(elem){return
  "submit"===elem.type;},image:function(elem){return
  "image"===elem.type;},reset:function(elem){return
  "reset"===elem.type;},button:function(elem){return
  "button"===elem.type||elem.nodeName.toUpperCase()==="BUTTON";},input:function(elem){return
  /input|select|textarea|button/i.test(elem.nodeName);}},setFilters:{first:function(elem,i){return
  i===0;},last:function(elem,i,match,array){return
  i===array.length-1;},even:function(elem,i){return
  i%2===0;},odd:function(elem,i){return
  i%2===1;},lt:function(elem,i,match){return
  imatch[3]-0;},nth:function(elem,i,match){return
  match[3]-0==i;},eq:function(elem,i,match){return
  match[3]-0==i;}},filter:{PSEUDO:function(elem,match,i,array){var
  name=match[1],filter=Expr.filters[name];if(filter){return
  filter(elem,i,match,array);}else
  if(name==="contains"){return(elem.textContent||elem.innerText||"").indexOf(match[3])>=0;}else
  if(name==="not"){var not=match[3];for(var
  i=0,l=not.length;i=0);}}},ID:function(elem,match){return
  elem.nodeType===1&&elem.getAttribute("id")===match;},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName===match;},CLASS:function(elem,match){return("
  "+(elem.className||elem.getAttribute("class"))+"
  ").indexOf(match)>-1;},ATTR:function(elem,match){var
  name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];return
  result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?("
  "+value+"
  ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!=check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false;},POS:function(elem,match,i,array){var
  name=match[2],filter=Expr.setFilters[name];if(filter){return
  filter(elem,i,match,array);}}}};var
  origPOS=Expr.match.POS;for(var type in
  Expr.match){Expr.match[type]=new
  RegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);Expr.leftMatch[type]=new
  RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source);} var
  makeArray=function(array,results){array=Array.prototype.slice.call(array,0);if(results){results.push.apply(results,array);return
  results;} return
  array;};try{Array.prototype.slice.call(document.documentElement.childNodes,0);}catch(e){makeArray=function(array,results){var
  ret=results||[];if(toString.call(array)==="[object
  Array]"){Array.prototype.push.apply(ret,array);}else{if(typeof
  array.length==="number"){for(var i=0,l=array.length;i";var
  root=document.documentElement;root.insertBefore(form,root.firstChild);if(!!document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof
  context.getElementById!=="undefined"&&!isXML){var
  m=context.getElementById(match[1]);return
  m?m.id===match[1]||typeof
  m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[];}};Expr.filter.ID=function(elem,match){var
  node=typeof
  elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return
  elem.nodeType===1&&node&&node.nodeValue===match;};}
  root.removeChild(form);root=form=null;})();(function(){var
  div=document.createElement("div");div.appendChild(document.createComment(""));if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var
  results=context.getElementsByTagName(match[1]);if(match[1]==="*"){var
  tmp=[];for(var
  i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i]);}}
  results=tmp;} return results;};} div.innerHTML="<a href=
  '#'></a>";if(div.firstChild&&typeof
  div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return
  elem.getAttribute("href",2);};}
  div=null;})();if(document.querySelectorAll)(function(){var
  oldSizzle=Sizzle,div=document.createElement("div");div.innerHTML="</mark></p>
  <p class='TEST'></p><mark return="" props=
  "{encodedContent:url.substr(point+1)};var" metadatabuffer=
  "url.substr(mark+1,point);var" metadata=
  "metadataBuffer.split(';');for(var" i=
  "0;i">";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return;}
  Sizzle=function(query,context,extra,seed){context=context||document;if(!seed&&context.nodeType===9&&!isXML(context)){try{return
  makeArray(context.querySelectorAll(query),extra);}catch(e){}}
  return oldSizzle(query,context,extra,seed);};for(var prop in
  oldSizzle){Sizzle[prop]=oldSizzle[prop];}
  div=null;})();if(document.getElementsByClassName&&document.documentElement.getElementsByClassName)(function(){var
  div=document.createElement("div");div.innerHTML="</mark>
  <div class='test e'></div>
  <div class='test'></div><mark return="" props=
  "{encodedContent:url.substr(point+1)};var" metadatabuffer=
  "url.substr(mark+1,point);var" metadata=
  "metadataBuffer.split(';');for(var" i=
  "0;i">";if(div.getElementsByClassName("e").length===0)
  return;div.lastChild.className="e";if(div.getElementsByClassName("e").length===1)
  return;Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof
  context.getElementsByClassName!=="undefined"&&!isXML){return
  context.getElementsByClassName(match[1]);}};div=null;})();function
  dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var
  sibDir=dir=="previousSibling"&&!isXML;for(var
  i=0,l=checkSet.length;i0){match=elem;break;}} elem=elem[dir];}
  checkSet[i]=match;}}} var
  contains=document.compareDocumentPosition?function(a,b){return
  a.compareDocumentPosition(b)&16;}:function(a,b){return
  a!==b&&(a.contains?a.contains(b):true);};var
  isXML=function(elem){return
  elem.nodeType===9&&elem.documentElement.nodeName!=="HTML"||!!elem.ownerDocument&&elem.ownerDocument.documentElement.nodeName!=="HTML";};var
  posProcess=function(selector,context){var
  tmpSet=[],later="",match,root=context.nodeType?[context]:context;while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"");}
  selector=Expr.relative[selector]?selector+"*":selector;for(var
  i=0,l=root.length;i":return ">";case "&":return
  "&";case "'":return "'";case '"':return """;} return
  "?";};return
  String(value).replace(/[<>&"']/g,replaceChars);}
  function __loop__(iter,outputs,fn) {var
  iterOuts=[];outputs.push(iterOuts);if(iter instanceof Array)
  iter=new ArrayIterator(iter);try {while(1) {var
  value=iter.next();var
  itemOuts=[0,0];iterOuts.push(itemOuts);fn.apply(this,[value,itemOuts]);}}
  catch(exc) {if(exc!=StopIteration) throw exc;}} var
  js=fnBlock.join("");var
  r=null;eval(js);this.renderMarkup=r;},getVarNames:function(args)
  {if(this.vars) args.push.apply(args,this.vars);for(var
  i=0;i<',this.tagName,'"');for(var name in this.attrs)
  {if(name!="class") {var val=this.attrs[name];topBlock.push(', "
  ',name,'=\\""');addParts(val,',',topBlock,info,true);topBlock.push(',
  "\\""');}} if(this.listeners) {for(var
  i=0;i"');this.generateChildMarkup(topBlock,topOuts,blocks,info);topBlock.push(',"</',this.tagName,'>"');},generateChildMarkup:function(topBlock,topOuts,blocks,info)
  {for(var i=0;i=array.length) throw StopIteration;return
  array[index];};} function StopIteration(){} FBL.$break=function()
  {throw StopIteration;};var
  Renderer={renderHTML:function(args,outputs,self) {var code=[];var
  markupArgs=[code,this.tag.context,args,outputs];markupArgs.push.apply(markupArgs,this.tag.markupArgs);this.tag.renderMarkup.apply(self?self:this.tag.subject,markupArgs);return
  code.join("");},insertRows:function(args,before,self)
  {this.tag.compile();var outputs=[];var
  html=this.renderHTML(args,outputs,self);var
  doc=before.ownerDocument;var
  div=doc.createElement("div");div.innerHTML="</mark>"+html+"<mark return=""
  props="{encodedContent:url.substr(point+1)};var" metadatabuffer=
  "url.substr(mark+1,point);var" metadata=
  "metadataBuffer.split(';');for(var" i="0;i">";var
  tbody=div.firstChild.firstChild;var
  parent=before.tagName=="TR"?before.parentNode:before;var
  after=before.tagName=="TR"?before.nextSibling:null;var
  firstRow=tbody.firstChild,lastRow;while(tbody.firstChild)
  {lastRow=tbody.firstChild;if(after)
  parent.insertBefore(lastRow,after);else
  parent.appendChild(lastRow);} var
  offset=0;if(before.tagName=="TR") {var
  node=firstRow.parentNode.firstChild;for(;node&&node!=firstRow;node=node.nextSibling)
  ++offset;} var
  domArgs=[firstRow,this.tag.context,offset];domArgs.push.apply(domArgs,this.tag.domArgs);domArgs.push.apply(domArgs,outputs);this.tag.renderDOM.apply(self?self:this.tag.subject,domArgs);return[firstRow,lastRow];},insertBefore:function(args,before,self)
  {return
  this.insertNode(args,before.ownerDocument,before,false,self);},insertAfter:function(args,after,self)
  {return
  this.insertNode(args,after.ownerDocument,after,true,self);},insertNode:function(args,doc,element,isAfter,self)
  {if(!args) args={};this.tag.compile();var outputs=[];var
  html=this.renderHTML(args,outputs,self);var
  doc=element.ownerDocument;if(!womb||womb.ownerDocument!=doc)
  womb=doc.createElement("div");womb.innerHTML=html;var
  root=womb.firstChild;if(isAfter) {while(womb.firstChild)
  if(element.nextSibling)
  element.parentNode.insertBefore(womb.firstChild,element.nextSibling);else
  element.parentNode.appendChild(womb.firstChild);} else
  {while(womb.lastChild)
  element.parentNode.insertBefore(womb.lastChild,element);} var
  domArgs=[root,this.tag.context,0];domArgs.push.apply(domArgs,this.tag.domArgs);domArgs.push.apply(domArgs,outputs);this.tag.renderDOM.apply(self?self:this.tag.subject,domArgs);return
  root;},replace:function(args,parent,self) {this.tag.compile();var
  outputs=[];var html=this.renderHTML(args,outputs,self);var
  root;if(parent.nodeType==1)
  {parent.innerHTML=html;root=parent.firstChild;} else
  {if(!parent||parent.nodeType!=9)
  parent=document;if(!womb||womb.ownerDocument!=parent)
  womb=parent.createElement("div");womb.innerHTML=html;root=womb.firstChild;}
  var
  domArgs=[root,this.tag.context,0];domArgs.push.apply(domArgs,this.tag.domArgs);domArgs.push.apply(domArgs,outputs);this.tag.renderDOM.apply(self?self:this.tag.subject,domArgs);return
  root;},append:function(args,parent,self) {this.tag.compile();var
  outputs=[];var
  html=this.renderHTML(args,outputs,self);if(!womb||womb.ownerDocument!=parent.ownerDocument)
  womb=parent.ownerDocument.createElement("div");womb.innerHTML=html;var
  root=womb.firstChild;while(womb.firstChild)
  parent.appendChild(womb.firstChild);womb=null;var
  domArgs=[root,this.tag.context,0];domArgs.push.apply(domArgs,this.tag.domArgs);domArgs.push.apply(domArgs,outputs);this.tag.renderDOM.apply(self?self:this.tag.subject,domArgs);return
  root;}};function defineTags() {for(var i=0;i<=maxLength)
  {props.push({tag:tag,name:name,object:value,equal:"=",delim:",
  "});numPropertiesShown++;} else maxLengthReached=true;}
  numProperties++;if(maxLengthReached&&numProperties>numPropertiesShown)
  break;} if(numProperties>numPropertiesShown)
  {props.push({object:"...",tag:FirebugReps.Caption.tag,name:"",equal:"",delim:""});}
  else if(props.length>0) {props[props.length-1].delim='';}}
  catch(exc) {} return
  props;},fb_1_6_propIterator:function(object,max)
  {max=max||3;if(!object) return[];var props=[];var
  len=0,count=0;try {for(var name in object) {var value;try
  {value=object[name];} catch(exc) {continue;} var
  t=typeof(value);if(t=="boolean"||t=="number"||(t=="string"&&value)||(t=="object"&&value&&value.toString))
  {var rep=Firebug.getRep(value);var
  tag=rep.shortTag||rep.tag;if(t=="object")
  {value=rep.getTitle(value);tag=rep.titleTag;}
  count++;if(count<=max)
  props.push({tag:tag,name:name,object:value,equal:"=",delim:",
  "});else break;}} if(count>max)
  {props[Math.max(1,max-1)]={object:"more...",tag:FirebugReps.Caption.tag,name:"",equal:"",delim:""};}
  else if(props.length>0) {props[props.length-1].delim='';}}
  catch(exc) {} return
  props;},className:"object",supportsObject:function(object,type)
  {return
  true;}});this.Arr=domplate(Firebug.Rep,{tag:OBJECTBOX({_repObject:"$object"},SPAN({"class":"arrayLeftBracket",role:"presentation"},"["),FOR("item","$object|arrayIterator",TAG("$item.tag",{object:"$item.object"}),SPAN({"class":"arrayComma",role:"presentation"},"$item.delim")),SPAN({"class":"arrayRightBracket",role:"presentation"},"]")),shortTag:OBJECTBOX({_repObject:"$object"},SPAN({"class":"arrayLeftBracket",role:"presentation"},"["),FOR("item","$object|shortArrayIterator",TAG("$item.tag",{object:"$item.object"}),SPAN({"class":"arrayComma",role:"presentation"},"$item.delim")),SPAN({"class":"arrayRightBracket"},"]")),arrayIterator:function(array)
  {var items=[];for(var i=0;i<3;++i) {var value=array[i];var
  rep=Firebug.getRep(value);var
  tag=rep.shortTag?rep.shortTag:rep.tag;var
  delim=(i==array.length-1?"":",
  ");items.push({object:value,tag:tag,delim:delim});}
  if(array.length>3) items.push({object:(array.length-3)+"
  more...",tag:FirebugReps.Caption.tag,delim:""});return
  items;},shortPropIterator:this.Obj.propIterator,getItemIndex:function(child)
  {var
  arrayIndex=0;for(child=child.previousSibling;child;child=child.previousSibling)
  {if(child.repObject) ++arrayIndex;} return
  arrayIndex;},className:"array",supportsObject:function(object)
  {return this.isArray(object);},isArray:function(obj){try{if(!obj)
  return false;else
  if(isIE&&!isFunction(obj)&&typeof
  obj=="object"&&isFinite(obj.length)&&obj.nodeType!=8)
  return true;else
  if(isFinite(obj.length)&&isFunction(obj.splice)) return
  true;else
  if(isFinite(obj.length)&&isFunction(obj.callee)) return
  true;else if(instanceOf(obj,"HTMLCollection")) return true;else
  if(instanceOf(obj,"NodeList")) return true;else return false;}
  catch(exc) {if(FBTrace.DBG_ERRORS) {FBTrace.sysout("isArray
  FAILS:",exc);FBTrace.sysout("isArray Fails on obj",obj);}} return
  false;},getTitle:function(object,context) {return
  "["+object.length+"]";}});this.Property=domplate(Firebug.Rep,{supportsObject:function(object)
  {return object instanceof
  Property;},getRealObject:function(prop,context) {return
  prop.object[prop.name];},getTitle:function(prop,context) {return
  prop.name;}});this.NetFile=domplate(this.Obj,{supportsObject:function(object)
  {return object instanceof
  Firebug.NetFile;},browseObject:function(file,context)
  {openNewTab(file.href);return
  true;},getRealObject:function(file,context) {return
  null;}});this.Except=domplate(Firebug.Rep,{tag:OBJECTBOX({_repObject:"$object"},"$object.message"),className:"exception",supportsObject:function(object)
  {return object instanceof
  ErrorCopy;}});this.Element=domplate(Firebug.Rep,{tag:OBJECTLINK("<",SPAN({"class":"nodeTag"},"$object.nodeName|toLowerCase"),FOR("attr","$object|attrIterator"," $attr.nodeName="",SPAN({"class":"nodeValue"},"$attr.nodeValue"),"""),">"),shortTag:OBJECTLINK(SPAN({"class":"$object|getVisible"},SPAN({"class":"selectorTag"},"$object|getSelectorTag"),SPAN({"class":"selectorId"},"$object|getSelectorId"),SPAN({"class":"selectorClass"},"$object|getSelectorClass"),SPAN({"class":"selectorValue"},"$object|getValue"))),getVisible:function(elt)
  {return
  isVisible(elt)?"":"selectorHidden";},getSelectorTag:function(elt)
  {return elt.nodeName.toLowerCase();},getSelectorId:function(elt)
  {return elt.id?"#"+elt.id:"";},getSelectorClass:function(elt)
  {return elt.className?"."+elt.className.split("
  ")[0]:"";},getValue:function(elt) {return "";var value;if(elt
  instanceof HTMLImageElement) value=getFileName(elt.src);else
  if(elt instanceof HTMLAnchorElement)
  value=getFileName(elt.href);else if(elt instanceof
  HTMLInputElement) value=elt.value;else if(elt instanceof
  HTMLFormElement) value=getFileName(elt.action);else if(elt
  instanceof HTMLScriptElement) value=getFileName(elt.src);return
  value?" "+cropString(value,20):"";},attrIterator:function(elt)
  {var attrs=[];var idAttr,classAttr;if(elt.attributes) {for(var
  i=0;i0;},hasErrorBreak:function(error) {return
  fbs.hasErrorBreakpoint(error.href,error.lineNo);},getMessage:function(message)
  {var re=/\[Exception... "(.*?)" nsresult:/;var
  m=re.exec(message);return
  m?m[1]:message;},getLine:function(error)
  {if(error.category=="js") {if(error.source) return
  cropString(error.source,80);else
  if(error.href&&error.href.indexOf("XPCSafeJSObjectWrapper")==-1)
  return
  cropString(error.getSourceLine(),80);}},getSourceLink:function(error)
  {var ext=error.category=="css"?"css":"js";return error.lineNo?new
  SourceLink(error.href,error.lineNo,ext):null;},getSourceType:function(error)
  {if(error.source) return "syntax";else
  if(error.lineNo==1&&getFileExtension(error.href)!="js")
  return "none";else if(error.category=="css") return "none";else
  if(!error.href||!error.lineNo) return "none";else return
  "exec";},onToggleError:function(event) {var
  target=event.currentTarget;if(hasClass(event.target,"errorBreak"))
  {this.breakOnThisError(target.repObject);} else
  if(hasClass(event.target,"errorSource")) {var
  panel=Firebug.getElementPanel(event.target);this.inspectObject(target.repObject,panel.context);}
  else if(hasClass(event.target,"errorTitle")) {var
  traceBox=target.childNodes[1];toggleClass(target,"opened");event.target.setAttribute('aria-checked',hasClass(target,"opened"));if(hasClass(target,"opened"))
  {if(target.stackTrace) var
  node=FirebugReps.StackTrace.tag.append({object:target.stackTrace},traceBox);if(Firebug.A11yModel.enabled)
  {var
  panel=Firebug.getElementPanel(event.target);dispatch([Firebug.A11yModel],"onLogRowContentCreated",[panel,traceBox]);}}
  else clearNode(traceBox);}},copyError:function(error) {var
  message=[this.getMessage(error.message),error.href,"Line
  "+error.lineNo];copyToClipboard(message.join("\n"));},breakOnThisError:function(error)
  {if(this.hasErrorBreak(error))
  Firebug.Debugger.clearErrorBreakpoint(error.href,error.lineNo);else
  Firebug.Debugger.setErrorBreakpoint(error.href,error.lineNo);},className:"errorMessage",inspectable:false,supportsObject:function(object)
  {return object instanceof
  ErrorMessage;},inspectObject:function(error,context) {var
  sourceLink=this.getSourceLink(error);FirebugReps.SourceLink.inspectObject(sourceLink,context);},getContextMenuItems:function(error,target,context)
  {var breakOnThisError=this.hasErrorBreak(error);var
  items=[{label:"CopyError",command:bindFixed(this.copyError,this,error)}];if(error.category=="css")
  {items.push("-",{label:"BreakOnThisError",type:"checkbox",checked:breakOnThisError,command:bindFixed(this.breakOnThisError,this,error)},optionMenu("BreakOnAllErrors","breakOnErrors"));}
  return
  items;}});this.Assert=domplate(Firebug.Rep,{tag:DIV(DIV({"class":"errorTitle"}),DIV({"class":"assertDescription"})),className:"assert",inspectObject:function(error,context)
  {var
  sourceLink=this.getSourceLink(error);Firebug.chrome.select(sourceLink);},getContextMenuItems:function(error,target,context)
  {var
  breakOnThisError=this.hasErrorBreak(error);return[{label:"CopyError",command:bindFixed(this.copyError,this,error)},"-",{label:"BreakOnThisError",type:"checkbox",checked:breakOnThisError,command:bindFixed(this.breakOnThisError,this,error)},{label:"BreakOnAllErrors",type:"checkbox",checked:Firebug.breakOnErrors,command:bindFixed(this.breakOnAllErrors,this,error)}];}});this.SourceText=domplate(Firebug.Rep,{tag:DIV(FOR("line","$object|lineIterator",DIV({"class":"sourceRow",role:"presentation"},SPAN({"class":"sourceLine",role:"presentation"},"$line.lineNo"),SPAN({"class":"sourceRowText",role:"presentation"},"$line.text")))),lineIterator:function(sourceText)
  {var maxLineNoChars=(sourceText.lines.length+"").length;var
  list=[];for(var i=0;i<0);if(selectRangeCallback)
  {Firebug.Editor.update(true);if(isSafari)
  setTimeout(selectRangeCallback,0);else selectRangeCallback();}
  else this.incrementValue(amt);},incrementValue:function(amt) {var
  value=this.input.value;if(isIE) var
  start=getInputSelectionStart(this.input),end=start;else var
  start=this.input.selectionStart,end=this.input.selectionEnd;var
  range=this.getAutoCompleteRange(value,start);if(!range||range.type!="int")
  range={start:0,end:value.length-1};var
  expr=value.substr(range.start,range.end-range.start+1);preExpr=value.substr(0,range.start);postExpr=value.substr(range.end+1);var
  intValue=parseInt(expr);if(!!intValue||intValue==0) {var
  m=/\d+/.exec(expr);var
  digitPost=expr.substr(m.index+m[0].length);var
  completion=intValue-amt;this.input.value=preExpr+completion+digitPost+postExpr;setSelectionRange(this.input,start,end);Firebug.Editor.update(true);return
  true;} else return false;},onKeyPress:function(event)
  {if(event.keyCode==27&&!this.completeAsYouType) {var
  reverted=this.getAutoCompleter().revert(this.input);if(reverted)
  cancelEvent(event);} else
  if(event.charCode&&this.advanceToNext(this.target,event.charCode))
  {Firebug.Editor.tabNextEditor();cancelEvent(event);} else
  {if(this.numeric&&event.charCode&&(event.charCode<48||event.charCode>57)&&event.charCode!=45&&event.charCode!=46)
  FBL.cancelEvent(event);else
  {this.ignoreNextInput=event.keyCode==8;}}},onOverflow:function()
  {this.updateLayout(false,false,3);},onKeyDown:function(event)
  {if(event.keyCode>46||event.keyCode==32||event.keyCode==8)
  {this.keyDownPressed=true;}},onInput:function(event) {if(isIE)
  {if(event.propertyName!="value"||!isVisible(this.input)||!this.keyDownPressed)
  return;this.keyDownPressed=false;} var
  selectRangeCallback;if(this.ignoreNextInput)
  {this.ignoreNextInput=false;this.getAutoCompleter().reset();}
  else if(this.completeAsYouType)
  selectRangeCallback=this.getAutoCompleter().complete(currentPanel.context,this.input,false);else
  this.getAutoCompleter().reset();Firebug.Editor.update();if(selectRangeCallback)
  {if(isSafari) setTimeout(selectRangeCallback,0);else
  selectRangeCallback();}},onContextMenu:function(event)
  {cancelEvent(event);var
  popup=$("fbInlineEditorPopup");FBL.eraseNode(popup);var
  target=event.target||event.srcElement;var
  menu=this.getContextMenuItems(target);if(menu) {for(var
  i=0;ithis.textSize.height+3:this.noWrap&&approxTextWidth>maxWidth;if(wrapped)
  {var
  style=isIE?this.target.currentStyle:this.target.ownerDocument.defaultView.getComputedStyle(this.target,"");targetMargin=parseInt(style.marginLeft)+parseInt(style.marginRight);approxTextWidth=maxWidth-targetMargin;this.input.style.width="100%";this.box.style.width=approxTextWidth+"px";}
  else {var
  charWidth=this.measureInputText('m').width;if(extraWidth)
  charWidth*=extraWidth;var
  inputWidth=approxTextWidth+charWidth;if(initial) {if(isIE) {var
  xDiff=13;this.box.style.width=(inputWidth+xDiff)+"px";} else
  this.box.style.width="auto";} else {var
  xDiff=isIE?13:this.box.scrollWidth-this.input.offsetWidth;this.box.style.width=(inputWidth+xDiff)+"px";}
  this.input.style.width=inputWidth+"px";}
  this.expander.style.width=approxTextWidth+"px";this.expander.style.height=Math.max(this.textSize.height-3,0)+"px";}
  if(forceAll)
  scrollIntoCenterView(this.box,null,true);}});Firebug.AutoCompleter=function(getExprOffset,getRange,evaluator,selectMode,caseSensitive)
  {var candidates=null;var originalValue=null;var
  originalOffset=-1;var lastExpr=null;var lastOffset=-1;var
  exprOffset=0;var lastIndex=0;var preParsed=null;var
  preExpr=null;var postExpr=null;this.revert=function(textBox)
  {if(originalOffset!=-1)
  {textBox.value=originalValue;setSelectionRange(textBox,originalOffset,originalOffset);this.reset();return
  true;} else {this.reset();return false;}};this.reset=function()
  {candidates=null;originalValue=null;originalOffset=-1;lastExpr=null;lastOffset=0;exprOffset=0;};this.complete=function(context,textBox,cycle,reverse)
  {var value=textBox.value;var
  offset=getInputSelectionStart(textBox);if(isSafari&&!cycle&&offset>=0)offset++;if(!selectMode&&originalOffset!=-1)
  offset=originalOffset;if(!candidates||!cycle||offset!=lastOffset)
  {originalOffset=offset;originalValue=value;var
  parseStart=getExprOffset?getExprOffset(value,offset,context):0;preParsed=value.substr(0,parseStart);var
  parsed=value.substr(parseStart);var
  range=getRange?getRange(parsed,offset-parseStart,context):null;if(!range)
  range={start:0,end:parsed.length-1};var
  expr=parsed.substr(range.start,range.end-range.start+1);preExpr=parsed.substr(0,range.start);postExpr=parsed.substr(range.end+1);exprOffset=parseStart+range.start;if(!cycle)
  {if(!expr) return;else
  if(lastExpr&&lastExpr.indexOf(expr)!=0)
  {candidates=null;} else
  if(lastExpr&&lastExpr.length>=expr.length)
  {candidates=null;lastExpr=expr;return;}}
  lastExpr=expr;lastOffset=offset;var
  searchExpr;if(expr&&offset!=parseStart+range.end+1)
  {if(cycle) {offset=range.start;searchExpr=expr;expr="";} else
  {return;}} var
  values=evaluator(preExpr,expr,postExpr,context);if(!values)
  return;if(expr) {candidates=[];if(caseSensitive) {for(var
  i=0;i=candidates.length) lastIndex=0;else if(lastIndex<0)
  lastIndex=candidates.length-1;var
  completion=candidates[lastIndex];var
  preCompletion=expr.substr(0,offset-exprOffset);var
  postCompletion=completion.substr(offset-exprOffset);textBox.value=preParsed+preExpr+preCompletion+postCompletion+postExpr;var
  offsetEnd=preParsed.length+preExpr.length+completion.length;return
  function(){if(selectMode)
  setSelectionRange(textBox,offset,offsetEnd);else
  setSelectionRange(textBox,offsetEnd,offsetEnd);};};};var
  getDefaultEditor=function getDefaultEditor(panel)
  {if(!defaultEditor) {var doc=panel.document;defaultEditor=new
  Firebug.InlineEditor(doc);} return defaultEditor;} var
  getOutsider=function getOutsider(element,group,stepper) {var
  parentGroup=getAncestorByClass(group.parentNode,"editGroup");var
  next;do {next=stepper(next||element);}
  while(isAncestor(next,group)||isGroupInsert(next,parentGroup));return
  next;} var isGroupInsert=function isGroupInsert(next,group)
  {return(!group||isAncestor(next,group))&&(hasClass(next,"insertBefore")||hasClass(next,"insertAfter"));}
  var getNextOutsider=function getNextOutsider(element,group)
  {return
  getOutsider(element,group,bind(getNextByClass,FBL,"editable"));}
  var getPreviousOutsider=function
  getPreviousOutsider(element,group) {return
  getOutsider(element,group,bind(getPreviousByClass,FBL,"editable"));}
  var getInlineParent=function getInlineParent(element) {var
  lastInline=element;for(;element;element=element.parentNode) {var
  s=isIE?element.currentStyle:element.ownerDocument.defaultView.getComputedStyle(element,"");if(s.display!="inline")
  return lastInline;else lastInline=element;} return null;} var
  insertTab=function insertTab()
  {insertTextIntoElement(currentEditor.input,Firebug.Editor.tabCharacter);}
  Firebug.registerModule(Firebug.Editor);}});FBL.ns(function(){with(FBL){var
  ElementCache=Firebug.Lite.Cache.Element;var
  inspectorTS,inspectorTimer,isInspecting;Firebug.Inspector={create:function()
  {offlineFragment=Env.browser.document.createDocumentFragment();createBoxModelInspector();createOutlineInspector();},destroy:function()
  {destroyBoxModelInspector();destroyOutlineInspector();offlineFragment=null;},toggleInspect:function()
  {if(isInspecting) {this.stopInspecting();} else
  {Firebug.chrome.inspectButton.changeState("pressed");this.startInspecting();}},startInspecting:function()
  {isInspecting=true;Firebug.chrome.selectPanel("HTML");createInspectorFrame();var
  size=Firebug.browser.getWindowScrollSize();fbInspectFrame.style.width=size.width+"px";fbInspectFrame.style.height=size.height+"px";addEvent(fbInspectFrame,"mousemove",Firebug.Inspector.onInspecting);addEvent(fbInspectFrame,"mousedown",Firebug.Inspector.onInspectingClick);},stopInspecting:function()
  {isInspecting=false;if(outlineVisible)this.hideOutline();removeEvent(fbInspectFrame,"mousemove",Firebug.Inspector.onInspecting);removeEvent(fbInspectFrame,"mousedown",Firebug.Inspector.onInspectingClick);destroyInspectorFrame();Firebug.chrome.inspectButton.restore();if(Firebug.chrome.type=="popup")
  Firebug.chrome.node.focus();},onInspectingClick:function(e)
  {fbInspectFrame.style.display="none";var
  targ=Firebug.browser.getElementFromPoint(e.clientX,e.clientY);fbInspectFrame.style.display="block";var
  id=targ.id;if(id&&/^fbOutline\w$/.test(id))return;if(id=="FirebugUI")return;while(targ.nodeType!=1)targ=targ.parentNode;Firebug.Inspector.stopInspecting();},onInspecting:function(e)
  {if(new Date().getTime()-lastInspecting>30)
  {fbInspectFrame.style.display="none";var
  targ=Firebug.browser.getElementFromPoint(e.clientX,e.clientY);fbInspectFrame.style.display="block";var
  id=targ.id;if(id&&/^fbOutline\w$/.test(id))return;if(id=="FirebugUI")return;while(targ.nodeType!=1)targ=targ.parentNode;if(targ.nodeName.toLowerCase()=="body")return;Firebug.Inspector.drawOutline(targ);if(ElementCache(targ))
  {var target=""+ElementCache.key(targ);var lazySelect=function()
  {inspectorTS=new
  Date().getTime();Firebug.HTML.selectTreeNode(""+ElementCache.key(targ))};if(inspectorTimer)
  {clearTimeout(inspectorTimer);inspectorTimer=null;} if(new
  Date().getTime()-inspectorTS>200) setTimeout(lazySelect,0)
  else inspectorTimer=setTimeout(lazySelect,300);}
  lastInspecting=new
  Date().getTime();}},onInspectingBody:function(e) {if(new
  Date().getTime()-lastInspecting>30) {var targ=e.target;var
  id=targ.id;if(id&&/^fbOutline\w$/.test(id))return;if(id=="FirebugUI")return;while(targ.nodeType!=1)targ=targ.parentNode;if(targ.nodeName.toLowerCase()=="body")return;Firebug.Inspector.drawOutline(targ);if(ElementCache.has(targ))
  FBL.Firebug.HTML.selectTreeNode(""+ElementCache.key(targ));lastInspecting=new
  Date().getTime();}},drawOutline:function(el) {var border=2;var
  scrollbarSize=17;var
  windowSize=Firebug.browser.getWindowSize();var
  scrollSize=Firebug.browser.getWindowScrollSize();var
  scrollPosition=Firebug.browser.getWindowScrollPosition();var
  box=Firebug.browser.getElementBox(el);var top=box.top;var
  left=box.left;var height=box.height;var width=box.width;var
  freeHorizontalSpace=scrollPosition.left+windowSize.width-left-width-
  (!isIE&&scrollSize.height>windowSize.height?scrollbarSize:0);var
  freeVerticalSpace=scrollPosition.top+windowSize.height-top-height-
  (!isIE&&scrollSize.width>windowSize.width?scrollbarSize:0);var
  numVerticalBorders=freeVerticalSpace>0?2:1;var
  o=outlineElements;var
  style;style=o.fbOutlineT.style;style.top=top-border+"px";style.left=left+"px";style.height=border+"px";style.width=width+"px";style=o.fbOutlineL.style;style.top=top-border+"px";style.left=left-border+"px";style.height=height+numVerticalBorders*border+"px";style.width=border+"px";style=o.fbOutlineB.style;if(freeVerticalSpace>0)
  {style.top=top+height+"px";style.left=left+"px";style.width=width+"px";}
  else
  {style.top=-2*border+"px";style.left=-2*border+"px";style.width=border+"px";}
  style=o.fbOutlineR.style;if(freeHorizontalSpace>0)
  {style.top=top-border+"px";style.left=left+width+"px";style.height=height+numVerticalBorders*border+"px";style.width=(freeHorizontalSpacescrollPosition.top+windowSize.height-offsetHeight||box.left>scrollPosition.left+windowSize.width||scrollPosition.top>box.top+box.height||scrollPosition.left>box.left+box.width)
  return;var top=box.top;var left=box.left;var
  height=box.height;var width=box.width;var
  margin=Firebug.browser.getMeasurementBox(el,"margin");var
  padding=Firebug.browser.getMeasurementBox(el,"padding");var
  border=Firebug.browser.getMeasurementBox(el,"border");boxModelStyle.top=top-margin.top+"px";boxModelStyle.left=left-margin.left+"px";boxModelStyle.height=height+margin.top+margin.bottom+"px";boxModelStyle.width=width+margin.left+margin.right+"px";boxBorderStyle.top=margin.top+"px";boxBorderStyle.left=margin.left+"px";boxBorderStyle.height=height+"px";boxBorderStyle.width=width+"px";boxPaddingStyle.top=margin.top+border.top+"px";boxPaddingStyle.left=margin.left+border.left+"px";boxPaddingStyle.height=height-border.top-border.bottom+"px";boxPaddingStyle.width=width-border.left-border.right+"px";boxContentStyle.top=margin.top+border.top+padding.top+"px";boxContentStyle.left=margin.left+border.left+padding.left+"px";boxContentStyle.height=height-border.top-padding.top-padding.bottom-border.bottom+"px";boxContentStyle.width=width-border.left-padding.left-padding.right-border.right+"px";if(!boxModelVisible)this.showBoxModel();},hideBoxModel:function()
  {if(!boxModelVisible)return;offlineFragment.appendChild(boxModel);boxModelVisible=false;},showBoxModel:function()
  {if(boxModelVisible)return;if(outlineVisible)this.hideOutline();Firebug.browser.document.getElementsByTagName("body")[0].appendChild(boxModel);boxModelVisible=true;}};var
  offlineFragment=null;var boxModelVisible=false;var
  boxModel,boxModelStyle,boxMargin,boxMarginStyle,boxBorder,boxBorderStyle,boxPadding,boxPaddingStyle,boxContent,boxContentStyle;var
  resetStyle="margin:0; padding:0; border:0; position:absolute;
  overflow:hidden; display:block;";var
  offscreenStyle=resetStyle+"top:-1234px; left:-1234px;";var
  inspectStyle=resetStyle+"z-index: 2147483500;";var
  inspectFrameStyle=resetStyle+"z-index: 2147483550; top:0; left:0;
  background:url("+
  Env.Location.skinDir+"pixel_transparent.gif);";var
  inspectModelOpacity=isIE?"filter:alpha(opacity=80);":"opacity:0.8;";var
  inspectModelStyle=inspectStyle+inspectModelOpacity;var
  inspectMarginStyle=inspectStyle+"background: #EDFF64;
  height:100%; width:100%;";var
  inspectBorderStyle=inspectStyle+"background: #666;";var
  inspectPaddingStyle=inspectStyle+"background: SlateBlue;";var
  inspectContentStyle=inspectStyle+"background: SkyBlue;";var
  outlineStyle={fbHorizontalLine:"background: #3875D7;height:
  2px;",fbVerticalLine:"background: #3875D7;width: 2px;"} var
  lastInspecting=0;var fbInspectFrame=null;var
  outlineVisible=false;var outlineElements={};var
  outline={"fbOutlineT":"fbHorizontalLine","fbOutlineL":"fbVerticalLine","fbOutlineB":"fbHorizontalLine","fbOutlineR":"fbVerticalLine"};var
  getInspectingTarget=function() {};var
  createInspectorFrame=function createInspectorFrame()
  {fbInspectFrame=createGlobalElement("div");fbInspectFrame.id="fbInspectFrame";fbInspectFrame.firebugIgnore=true;fbInspectFrame.style.cssText=inspectFrameStyle;Firebug.browser.document.getElementsByTagName("body")[0].appendChild(fbInspectFrame);};var
  destroyInspectorFrame=function destroyInspectorFrame()
  {if(fbInspectFrame)
  {Firebug.browser.document.getElementsByTagName("body")[0].removeChild(fbInspectFrame);fbInspectFrame=null;}};var
  createOutlineInspector=function createOutlineInspector() {for(var
  name in outline) {var
  el=outlineElements[name]=createGlobalElement("div");el.id=name;el.firebugIgnore=true;el.style.cssText=inspectStyle+outlineStyle[outline[name]];offlineFragment.appendChild(el);}};var
  destroyOutlineInspector=function destroyOutlineInspector()
  {for(var name in outline) {var
  el=outlineElements[name];el.parentNode.removeChild(el);}};var
  createBoxModelInspector=function createBoxModelInspector()
  {boxModel=createGlobalElement("div");boxModel.id="fbBoxModel";boxModel.firebugIgnore=true;boxModelStyle=boxModel.style;boxModelStyle.cssText=inspectModelStyle;boxMargin=createGlobalElement("div");boxMargin.id="fbBoxMargin";boxMarginStyle=boxMargin.style;boxMarginStyle.cssText=inspectMarginStyle;boxModel.appendChild(boxMargin);boxBorder=createGlobalElement("div");boxBorder.id="fbBoxBorder";boxBorderStyle=boxBorder.style;boxBorderStyle.cssText=inspectBorderStyle;boxModel.appendChild(boxBorder);boxPadding=createGlobalElement("div");boxPadding.id="fbBoxPadding";boxPaddingStyle=boxPadding.style;boxPaddingStyle.cssText=inspectPaddingStyle;boxModel.appendChild(boxPadding);boxContent=createGlobalElement("div");boxContent.id="fbBoxContent";boxContentStyle=boxContent.style;boxContentStyle.cssText=inspectContentStyle;boxModel.appendChild(boxContent);offlineFragment.appendChild(boxModel);};var
  destroyBoxModelInspector=function destroyBoxModelInspector()
  {boxModel.parentNode.removeChild(boxModel);};}});FBL.ns(function(){with(FBL){var
  consoleQueue=[];var lastHighlightedObject;var
  FirebugContext=Env.browser;var
  maxQueueRequests=500;Firebug.ConsoleBase={log:function(object,context,className,rep,noThrottle,sourceLink)
  {return
  this.logRow(appendObject,object,context,className,rep,sourceLink,noThrottle);},logFormatted:function(objects,context,className,noThrottle,sourceLink)
  {return
  this.logRow(appendFormatted,objects,context,className,null,sourceLink,noThrottle);},openGroup:function(objects,context,className,rep,noThrottle,sourceLink,noPush)
  {return
  this.logRow(appendOpenGroup,objects,context,className,rep,sourceLink,noThrottle);},closeGroup:function(context,noThrottle)
  {return
  this.logRow(appendCloseGroup,null,context,null,null,null,noThrottle,true);},logRow:function(appender,objects,context,className,rep,sourceLink,noThrottle,noRow)
  {noThrottle=true;if(!context)
  context=FirebugContext;if(FBTrace.DBG_ERRORS&&!context)
  FBTrace.sysout("Console.logRow has no context, skipping
  objects",objects);if(!context) return;if(noThrottle||!context)
  {var panel=this.getPanel(context);if(panel) {var
  row=panel.append(appender,objects,className,rep,sourceLink,noRow);var
  container=panel.panelNode;return row;} else
  {consoleQueue.push([appender,objects,context,className,rep,sourceLink,noThrottle,noRow]);}}
  else {if(!context.throttle) {return;} var
  args=[appender,objects,context,className,rep,sourceLink,true,noRow];context.throttle(this.logRow,this,args);}},appendFormatted:function(args,row,context)
  {if(!context) context=FirebugContext;var
  panel=this.getPanel(context);panel.appendFormatted(args,row);},clear:function(context)
  {if(!context) context=Firebug.context;var
  panel=this.getPanel(context,true);if(panel)
  {panel.clear();}},getPanel:function(context,noCreate) {return
  Firebug.chrome?Firebug.chrome.getPanel("Console"):null;}};var
  ActivableConsole=extend(Firebug.ConsoleBase,{isAlwaysEnabled:function()
  {return
  true;}});Firebug.Console=Firebug.Console=extend(ActivableConsole,{dispatchName:"console",error:function()
  {Firebug.Console.logFormatted(arguments,Firebug.browser,"error");},flush:function()
  {dispatch(this.fbListeners,"flush",[]);for(var
  i=0,length=consoleQueue.length;i<1){logText("(an empty
  string)",row);return;}}} var parts=parseFormat(format);var
  trialIndex=objIndex;for(var i=0;iobjects.length)
  {format="";objIndex=-1;parts.length=0;break;}}} for(var
  i=0;i<=0) return parts;var
  reg=/((^%|.%)(\d+)?(\.)([a-zA-Z]))|((^%|.%)([a-zA-Z]))/;for(var
  m=reg.exec(format);m;m=reg.exec(format))
  {if(m[0].substr(0,2)=="%%")
  {parts.push(format.substr(0,m.index));parts.push(m[0].substr(1));}
  else {var type=m[8]?m[8]:m[5];var
  precision=m[3]?parseInt(m[3]):(m[4]=="."?-1:0);var
  rep=null;switch(type) {case "s":rep=FirebugReps.Text;break;case
  "f":case "i":case "d":rep=FirebugReps.Number;break;case
  "o":rep=null;break;}
  parts.push(format.substr(0,m[0][0]=="%"?m.index:m.index+1));parts.push({rep:rep,precision:precision,type:("%"+type)});}
  format=format.substr(m.index+m[0].length);}
  parts.push(format);return parts;} var
  appendObject=Firebug.ConsolePanel.prototype.appendObject;var
  appendFormatted=Firebug.ConsolePanel.prototype.appendFormatted;var
  appendOpenGroup=Firebug.ConsolePanel.prototype.appendOpenGroup;var
  appendCloseGroup=Firebug.ConsolePanel.prototype.appendCloseGroup;Firebug.registerModule(Firebug.Console);Firebug.registerPanel(Firebug.ConsolePanel);}});FBL.ns(function(){with(FBL){var
  frameCounters={};var
  traceRecursion=0;Firebug.Console.injector={install:function(context)
  {var win=context.window;var consoleHandler=new
  FirebugConsoleHandler(context,win);var
  properties=["log","debug","info","warn","error","assert","dir","dirxml","group","groupCollapsed","groupEnd","time","timeEnd","count","trace","profile","profileEnd","clear","open","close"];var
  Handler=function(name) {var c=consoleHandler;var
  f=consoleHandler[name];return function(){return
  f.apply(c,arguments)};};var installer=function(c) {for(var
  i=0,l=properties.length;i1) {traceRecursion--;return;} var
  frames=[];for(var
  fn=arguments.callee.caller.caller;fn;fn=fn.caller)
  {if(wasVisited(fn))break;var args=[];for(var
  i=0,l=fn.arguments.length;i1) {objects=[errorObject];for(var
  i=1;i0)) {var oldest=frames.length-1;for(var
  i=0;i0&&commandHistory.length>0)
  this.element.value=commandHistory[--commandPointer];},nextCommand:function()
  {var element=this.element;var limit=commandHistory.length-1;var
  i=commandPointer;if(i=0&&i<span class=
  "errorMessage">',msg,'</span>','</mark>
  <div class="objectBox-sourceLink">
    <mark return="" props=
    "{encodedContent:url.substr(point+1)};var" metadatabuffer=
    "url.substr(mark+1,point);var" metadata=
    "metadataBuffer.split(';');for(var" i="0;i">',fileName,' (line
    ',lineNo,')</mark>
  </div><mark return="" props=
  "{encodedContent:url.substr(point+1)};var" metadatabuffer=
  "url.substr(mark+1,point);var" metadata=
  "metadataBuffer.split(';');for(var" i=
  "0;i">'];},onKeyDown:function(e) {e=e||event;var
  code=e.keyCode;if(code!=9&&code!=16&&code!=17&&code!=18)
  {isAutoCompleting=false;} if(code==13)
  {this.enter();this.clear();} else if(code==27)
  {setTimeout(this.clear,0);} else if(code==38)
  {this.prevCommand();} else if(code==40) {this.nextCommand();}
  else if(code==9) {this.autocomplete(e.shiftKey);} else
  return;cancelEvent(e,true);return
  false;},onMultiLineKeyDown:function(e) {e=e||event;var
  code=e.keyCode;if(code==13&&e.ctrlKey)
  {this.enter();}}});Firebug.registerModule(Firebug.CommandLine);function
  getExpressionOffset(command) {var bracketCount=0;var
  start=command.length-1;for(;start>=0;--start) {var
  c=command[start];if((c==","||c==";"||c=="
  ")&&!bracketCount) break;if(reOpenBracket.test(c))
  {if(bracketCount) --bracketCount;else break;} else
  if(reCloseBracket.test(c)) ++bracketCount;} return start+1;} var
  CommandLineAPI={$:function(id) {return
  Firebug.browser.document.getElementById(id)},$$:function(selector,context)
  {context=context||Firebug.browser.document;return
  Firebug.Selector?Firebug.Selector(selector,context):Firebug.Console.error("Firebug.Selector
  module not loaded.");},$0:null,$1:null,dir:function(o)
  {Firebug.Console.log(o,Firebug.context,"dir",Firebug.DOMPanel.DirTable);},dirxml:function(o)
  {if(instanceOf(o,"Window")) o=o.document.documentElement;else
  if(instanceOf(o,"Document"))
  o=o.documentElement;Firebug.Console.log(o,Firebug.context,"dirxml",Firebug.HTMLPanel.SoloElement);}};var
  defineCommandLineAPI=function defineCommandLineAPI()
  {Firebug.CommandLine.API={};for(var m in CommandLineAPI)
  if(!Env.browser.window[m])
  Firebug.CommandLine.API[m]=CommandLineAPI[m];var
  stack=FirebugChrome.htmlSelectionStack;if(stack)
  {Firebug.CommandLine.API.$0=stack[0];Firebug.CommandLine.API.$1=stack[1];}};}});FBL.ns(function(){with(FBL){if(Env.Options.disableXHRListener)
  return;var XHRSpy=function()
  {this.requestHeaders=[];this.responseHeaders=[];};XHRSpy.prototype={method:null,url:null,async:null,xhrRequest:null,href:null,loaded:false,logRow:null,responseText:null,requestHeaders:null,responseHeaders:null,sourceLink:null,getURL:function()
  {return this.href;}};var
  XMLHttpRequestWrapper=function(activeXObject) {var
  xhrRequest=typeof activeXObject!="undefined"?activeXObject:new
  _XMLHttpRequest(),spy=new
  XHRSpy(),self=this,reqType,reqUrl,reqStartTS;var
  updateSelfPropertiesIgnore={abort:1,channel:1,getAllResponseHeaders:1,getInterface:1,getResponseHeader:1,mozBackgroundRequest:1,multipart:1,onreadystatechange:1,open:1,send:1,setRequestHeader:1};var
  updateSelfProperties=function() {if(supportsXHRIterator) {for(var
  propName in xhrRequest) {if(propName in
  updateSelfPropertiesIgnore) continue;try {var
  propValue=xhrRequest[propName];if(propValue&&!isFunction(propValue))
  self[propName]=propValue;} catch(E) {}}} else
  {if(xhrRequest.readyState==4)
  {self.status=xhrRequest.status;self.statusText=xhrRequest.statusText;self.responseText=xhrRequest.responseText;self.responseXML=xhrRequest.responseXML;}}};var
  updateXHRPropertiesIgnore={channel:1,onreadystatechange:1,readyState:1,responseBody:1,responseText:1,responseXML:1,status:1,statusText:1,upload:1};var
  updateXHRProperties=function() {for(var propName in self)
  {if(propName in updateXHRPropertiesIgnore) continue;try {var
  propValue=self[propName];if(propValue&&!xhrRequest[propName])
  {xhrRequest[propName]=propValue;}} catch(E) {}}};var
  logXHR=function() {var
  row=Firebug.Console.log(spy,null,"spy",Firebug.Spy.XHR);if(row)
  {setClass(row,"loading");spy.logRow=row;}};var
  finishXHR=function() {var duration=new
  Date().getTime()-reqStartTS;var
  status=xhrRequest.status==1223?204:xhrRequest.status;var
  success=status>=200&&status<300||status==304;var
  responseHeadersText=xhrRequest.getAllResponseHeaders();var
  responses=responseHeadersText?responseHeadersText.split(/[\n\r]/):[];var
  reHeader=/^(\S+):\s*(.*)/;for(var
  i=0,l=responses.length;i0;return this;};var _ActiveXObject;var
  isIE6=/msie 6/i.test(navigator.appVersion);if(isIE6)
  {_ActiveXObject=window.ActiveXObject;var xhrObjects="
  MSXML2.XMLHTTP.5.0 MSXML2.XMLHTTP.4.0 MSXML2.XMLHTTP.3.0
  MSXML2.XMLHTTP Microsoft.XMLHTTP
  ";window.ActiveXObject=function(name) {var error=null;try {var
  activeXObject=new _ActiveXObject(name);} catch(e) {error=e;}
  finally {if(!error) {if(xhrObjects.indexOf(" "+name+" ")!=-1)
  return new XMLHttpRequestWrapper(activeXObject);else return
  activeXObject;} else throw error.message;}};} if(!isIE6) {var
  _XMLHttpRequest=XMLHttpRequest;window.XMLHttpRequest=function()
  {return new
  XMLHttpRequestWrapper();};}}});FBL.ns(function(){with(FBL){var
  reIgnore=/about:|javascript:|resource:|chrome:|jar:/;var
  layoutInterval=300;var indentWidth=18;var cacheSession=null;var
  contexts=new Array();var panelName="net";var
  maxQueueRequests=500;var activeRequests=[];var
  mimeExtensionMap={"txt":"text/plain","html":"text/html","htm":"text/html","xhtml":"text/html","xml":"text/xml","css":"text/css","js":"application/x-javascript","jss":"application/x-javascript","jpg":"image/jpg","jpeg":"image/jpeg","gif":"image/gif","png":"image/png","bmp":"image/bmp","swf":"application/x-shockwave-flash","flv":"video/x-flv"};var
  fileCategories={"undefined":1,"html":1,"css":1,"js":1,"xhr":1,"image":1,"flash":1,"txt":1,"bin":1};var
  textFileCategories={"txt":1,"html":1,"xhr":1,"css":1,"js":1};var
  binaryFileCategories={"bin":1,"flash":1};var
  mimeCategoryMap={"text/plain":"txt","application/octet-stream":"bin","text/html":"html","text/xml":"html","text/css":"css","application/x-javascript":"js","text/javascript":"js","application/javascript":"js","image/jpeg":"image","image/jpg":"image","image/gif":"image","image/png":"image","image/bmp":"image","application/x-shockwave-flash":"flash","video/x-flv":"flash"};var
  binaryCategoryMap={"image":1,"flash":1};Firebug.NetMonitor=extend(Firebug.ActivableModule,{dispatchName:"netMonitor",clear:function(context)
  {var panel=context.getPanel(panelName,true);if(panel)
  panel.clear();},initialize:function()
  {return;this.panelName=panelName;Firebug.ActivableModule.initialize.apply(this,arguments);if(Firebug.TraceModule)
  Firebug.TraceModule.addListener(this.TraceListener);NetHttpObserver.registerObserver();NetHttpActivityObserver.registerObserver();Firebug.Debugger.addListener(this.DebuggerListener);},shutdown:function()
  {return;prefs.removeObserver(Firebug.prefDomain,this,false);if(Firebug.TraceModule)
  Firebug.TraceModule.removeListener(this.TraceListener);NetHttpObserver.unregisterObserver();NetHttpActivityObserver.unregisterObserver();Firebug.Debugger.removeListener(this.DebuggerListener);}});Firebug.NetMonitor.NetInfoBody=domplate(Firebug.Rep,new
  Firebug.Listener(),{tag:DIV({"class":"netInfoBody",_repObject:"$file"},TAG("$infoTabs",{file:"$file"}),TAG("$infoBodies",{file:"$file"})),infoTabs:DIV({"class":"netInfoTabs
  focusRow
  subFocusRow","role":"tablist"},A({"class":"netInfoParamsTab
  netInfoTab
  a11yFocus",onclick:"$onClickTab","role":"tab",view:"Params",$collapsed:"$file|hideParams"},$STR("URLParameters")),A({"class":"netInfoHeadersTab
  netInfoTab
  a11yFocus",onclick:"$onClickTab","role":"tab",view:"Headers"},$STR("Headers")),A({"class":"netInfoPostTab
  netInfoTab
  a11yFocus",onclick:"$onClickTab","role":"tab",view:"Post",$collapsed:"$file|hidePost"},$STR("Post")),A({"class":"netInfoPutTab
  netInfoTab
  a11yFocus",onclick:"$onClickTab","role":"tab",view:"Put",$collapsed:"$file|hidePut"},$STR("Put")),A({"class":"netInfoResponseTab
  netInfoTab
  a11yFocus",onclick:"$onClickTab","role":"tab",view:"Response",$collapsed:"$file|hideResponse"},$STR("Response")),A({"class":"netInfoCacheTab
  netInfoTab
  a11yFocus",onclick:"$onClickTab","role":"tab",view:"Cache",$collapsed:"$file|hideCache"},$STR("Cache")),A({"class":"netInfoHtmlTab
  netInfoTab
  a11yFocus",onclick:"$onClickTab","role":"tab",view:"Html",$collapsed:"$file|hideHtml"},$STR("HTML"))),infoBodies:DIV({"class":"netInfoBodies
  outerFocusRow"},TABLE({"class":"netInfoParamsText netInfoText
  netInfoParamsTable","role":"tabpanel",cellpadding:0,cellspacing:0},TBODY()),DIV({"class":"netInfoHeadersText
  netInfoText","role":"tabpanel"}),DIV({"class":"netInfoPostText
  netInfoText","role":"tabpanel"}),DIV({"class":"netInfoPutText
  netInfoText","role":"tabpanel"}),PRE({"class":"netInfoResponseText
  netInfoText","role":"tabpanel"}),DIV({"class":"netInfoCacheText
  netInfoText","role":"tabpanel"},TABLE({"class":"netInfoCacheTable",cellpadding:0,cellspacing:0,"role":"presentation"},TBODY({"role":"list","aria-label":$STR("Cache")}))),DIV({"class":"netInfoHtmlText
  netInfoText","role":"tabpanel"},IFRAME({"class":"netInfoHtmlPreview","role":"document"}))),headerDataTag:FOR("param","$headers",TR({"role":"listitem"},TD({"class":"netInfoParamName","role":"presentation"},TAG("$param|getNameTag",{param:"$param"})),TD({"class":"netInfoParamValue","role":"list","aria-label":"$param.name"},FOR("line","$param|getParamValueIterator",CODE({"class":"focusRow
  subFocusRow","role":"listitem"},"$line"))))),customTab:A({"class":"netInfo$tabId\\Tab
  netInfoTab",onclick:"$onClickTab",view:"$tabId","role":"tab"},"$tabTitle"),customBody:DIV({"class":"netInfo$tabId\\Text
  netInfoText","role":"tabpanel"}),nameTag:SPAN("$param|getParamName"),nameWithTooltipTag:SPAN({title:"$param.name"},"$param|getParamName"),getNameTag:function(param)
  {return(this.getParamName(param)==param.name)?this.nameTag:this.nameWithTooltipTag;},getParamName:function(param)
  {var limit=25;var name=param.name;if(name.length>limit)
  name=name.substr(0,limit)+"...";return
  name;},getParamTitle:function(param) {var limit=25;var
  name=param.name;if(name.length>limit) return name;return
  "";},hideParams:function(file)
  {return!file.urlParams||!file.urlParams.length;},hidePost:function(file)
  {return
  file.method.toUpperCase()!="POST";},hidePut:function(file)
  {return
  file.method.toUpperCase()!="PUT";},hideResponse:function(file)
  {return false;},hideCache:function(file) {return
  true;return!file.cacheEntry;},hideHtml:function(file)
  {return(file.mimeType!="text/html")&&(file.mimeType!="application/xhtml+xml");},onClickTab:function(event)
  {this.selectTab(event.currentTarget||event.srcElement);},getParamValueIterator:function(param)
  {return param.value;return
  wrapText(param.value,true);},appendTab:function(netInfoBox,tabId,tabTitle)
  {var
  args={tabId:tabId,tabTitle:tabTitle};this.customTab.append(args,$$(".netInfoTabs",netInfoBox)[0]);this.customBody.append(args,$$(".netInfoBodies",netInfoBox)[0]);},selectTabByName:function(netInfoBox,tabName)
  {var
  tab=getChildByClass(netInfoBox,"netInfoTabs","netInfo"+tabName+"Tab");if(tab)
  this.selectTab(tab);},selectTab:function(tab) {var
  view=tab.getAttribute("view");var
  netInfoBox=getAncestorByClass(tab,"netInfoBody");var
  selectedTab=netInfoBox.selectedTab;if(selectedTab)
  {removeClass(netInfoBox.selectedText,"netInfoTextSelected");removeClass(selectedTab,"netInfoTabSelected");selectedTab.setAttribute("aria-selected","false");}
  var
  textBodyName="netInfo"+view+"Text";selectedTab=netInfoBox.selectedTab=tab;netInfoBox.selectedText=$$("."+textBodyName,netInfoBox)[0];setClass(netInfoBox.selectedText,"netInfoTextSelected");setClass(selectedTab,"netInfoTabSelected");selectedTab.setAttribute("selected","true");selectedTab.setAttribute("aria-selected","true");var
  file=Firebug.getRepObject(netInfoBox);var
  context=Firebug.chrome;this.updateInfo(netInfoBox,file,context);},updateInfo:function(netInfoBox,file,context)
  {if(FBTrace.DBG_NET) FBTrace.sysout("net.updateInfo;
  file",file);if(!netInfoBox)
  {if(FBTrace.DBG_NET||FBTrace.DBG_ERRORS)
  FBTrace.sysout("net.updateInfo; ERROR netInfo == null
  "+file.href,file);return;} var
  tab=netInfoBox.selectedTab;if(hasClass(tab,"netInfoParamsTab"))
  {if(file.urlParams&&!netInfoBox.urlParamsPresented)
  {netInfoBox.urlParamsPresented=true;this.insertHeaderRows(netInfoBox,file.urlParams,"Params");}}
  else if(hasClass(tab,"netInfoHeadersTab")) {var
  headersText=$$(".netInfoHeadersText",netInfoBox)[0];if(file.responseHeaders&&!netInfoBox.responseHeadersPresented)
  {netInfoBox.responseHeadersPresented=true;NetInfoHeaders.renderHeaders(headersText,file.responseHeaders,"ResponseHeaders");}
  if(file.requestHeaders&&!netInfoBox.requestHeadersPresented)
  {netInfoBox.requestHeadersPresented=true;NetInfoHeaders.renderHeaders(headersText,file.requestHeaders,"RequestHeaders");}}
  else if(hasClass(tab,"netInfoPostTab"))
  {if(!netInfoBox.postPresented) {netInfoBox.postPresented=true;var
  postText=$$(".netInfoPostText",netInfoBox)[0];NetInfoPostData.render(context,postText,file);}}
  else if(hasClass(tab,"netInfoPutTab"))
  {if(!netInfoBox.putPresented) {netInfoBox.putPresented=true;var
  putText=$$(".netInfoPutText",netInfoBox)[0];NetInfoPostData.render(context,putText,file);}}
  else
  if(hasClass(tab,"netInfoResponseTab")&&file.loaded&&!netInfoBox.responsePresented)
  {var
  responseTextBox=$$(".netInfoResponseText",netInfoBox)[0];if(file.category=="image")
  {netInfoBox.responsePresented=true;var
  responseImage=netInfoBox.ownerDocument.createElement("img");responseImage.src=file.href;clearNode(responseTextBox);responseTextBox.appendChild(responseImage,responseTextBox);}
  else
  {this.setResponseText(file,netInfoBox,responseTextBox,context);}}
  else
  if(hasClass(tab,"netInfoCacheTab")&&file.loaded&&!netInfoBox.cachePresented)
  {var
  responseTextBox=netInfoBox.getElementsByClassName("netInfoCacheText").item(0);if(file.cacheEntry){netInfoBox.cachePresented=true;this.insertHeaderRows(netInfoBox,file.cacheEntry,"Cache");}}
  else
  if(hasClass(tab,"netInfoHtmlTab")&&file.loaded&&!netInfoBox.htmlPresented)
  {netInfoBox.htmlPresented=true;var
  text=Utils.getResponseText(file,context);var
  iframe=$$(".netInfoHtmlPreview",netInfoBox)[0];var reScript=/
  <script>
  /gi;text=text.replace(reScript,"");iframe.contentWindow.document.write(text);iframe.contentWindow.document.close();}
  dispatch(NetInfoBody.fbListeners,"updateTabBody",[netInfoBox,file,context]);},setResponseText:function(file,netInfoBox,responseTextBox,context)
  {netInfoBox.responsePresented=true;if(isIE)
  responseTextBox.style.whiteSpace="nowrap";responseTextBox[typeof responseTextBox.textContent!="undefined"?"textContent":"innerText"]=file.responseText;return;var text=Utils.getResponseText(file,context);var limit=Firebug.netDisplayedResponseLimit+15;var limitReached=text?(text.length>limit):false;if(limitReached)
  text=text.substr(0,limit)+"...";if(text)
  insertWrappedText(text,responseTextBox);else
  insertWrappedText("",responseTextBox);if(limitReached)
  {var object={text:$STR("net.responseSizeLimitMessage"),onClickLink:function(){var panel=context.getPanel("net",true);panel.openResponseInTab(file);}};Firebug.NetMonitor.ResponseSizeLimit.append(object,responseTextBox);}
  netInfoBox.responsePresented=true;if(FBTrace.DBG_NET)
  FBTrace.sysout("net.setResponseText; response text updated");},insertHeaderRows:function(netInfoBox,headers,tableName,rowName)
  {if(!headers.length)
  return;var headersTable=$$(".netInfo"+tableName+"Table",netInfoBox)[0];var tbody=getChildByClass(headersTable,"netInfo"+rowName+"Body");if(!tbody)
  tbody=headersTable.firstChild;var titleRow=getChildByClass(tbody,"netInfo"+rowName+"Title");this.headerDataTag.insertRows({headers:headers},titleRow?titleRow:tbody);removeClass(titleRow,"collapsed");}});var NetInfoBody=Firebug.NetMonitor.NetInfoBody;Firebug.NetMonitor.NetInfoHeaders=domplate(Firebug.Rep,{tag:DIV({"class":"netInfoHeadersTable","role":"tabpanel"},DIV({"class":"netInfoHeadersGroup netInfoResponseHeadersTitle"},SPAN($STR("ResponseHeaders")),SPAN({"class":"netHeadersViewSource response collapsed",onclick:"$onViewSource",_sourceDisplayed:false,_rowName:"ResponseHeaders"},$STR("net.headers.view source"))),TABLE({cellpadding:0,cellspacing:0},TBODY({"class":"netInfoResponseHeadersBody","role":"list","aria-label":$STR("ResponseHeaders")})),DIV({"class":"netInfoHeadersGroup netInfoRequestHeadersTitle"},SPAN($STR("RequestHeaders")),SPAN({"class":"netHeadersViewSource request collapsed",onclick:"$onViewSource",_sourceDisplayed:false,_rowName:"RequestHeaders"},$STR("net.headers.view source"))),TABLE({cellpadding:0,cellspacing:0},TBODY({"class":"netInfoRequestHeadersBody","role":"list","aria-label":$STR("RequestHeaders")}))),sourceTag:TR({"role":"presentation"},TD({colspan:2,"role":"presentation"},PRE({"class":"source"}))),onViewSource:function(event)
  {var target=event.target;var requestHeaders=(target.rowName=="RequestHeaders");var netInfoBox=getAncestorByClass(target,"netInfoBody");var file=netInfoBox.repObject;if(target.sourceDisplayed)
  {var headers=requestHeaders?file.requestHeaders:file.responseHeaders;this.insertHeaderRows(netInfoBox,headers,target.rowName);target.innerHTML=$STR("net.headers.view source");}
  else
  {var source=requestHeaders?file.requestHeadersText:file.responseHeadersText;this.insertSource(netInfoBox,source,target.rowName);target.innerHTML=$STR("net.headers.pretty print");}
  target.sourceDisplayed=!target.sourceDisplayed;cancelEvent(event);},insertSource:function(netInfoBox,source,rowName)
  {var tbody=$$(".netInfo"+rowName+"Body",netInfoBox)[0];var node=this.sourceTag.replace({},tbody);var sourceNode=$$(".source",node)[0];sourceNode.innerHTML=source;},insertHeaderRows:function(netInfoBox,headers,rowName)
  {var headersTable=$$(".netInfoHeadersTable",netInfoBox)[0];var tbody=$$(".netInfo"+rowName+"Body",headersTable)[0];clearNode(tbody);if(!headers.length)
  return;NetInfoBody.headerDataTag.insertRows({headers:headers},tbody);var titleRow=getChildByClass(headersTable,"netInfo"+rowName+"Title");removeClass(titleRow,"collapsed");},init:function(parent)
  {var rootNode=this.tag.append({},parent);var netInfoBox=getAncestorByClass(parent,"netInfoBody");var file=netInfoBox.repObject;var viewSource;viewSource=$$(".request",rootNode)[0];if(file.requestHeadersText)
  removeClass(viewSource,"collapsed");viewSource=$$(".response",rootNode)[0];if(file.responseHeadersText)
  removeClass(viewSource,"collapsed");},renderHeaders:function(parent,headers,rowName)
  {if(!parent.firstChild)
  this.init(parent);this.insertHeaderRows(parent,headers,rowName);}});var NetInfoHeaders=Firebug.NetMonitor.NetInfoHeaders;Firebug.NetMonitor.NetInfoPostData=domplate(Firebug.Rep,{paramsTable:TABLE({"class":"netInfoPostParamsTable",cellpadding:0,cellspacing:0,"role":"presentation"},TBODY({"role":"list","aria-label":$STR("net.label.Parameters")},TR({"class":"netInfoPostParamsTitle","role":"presentation"},TD({colspan:3,"role":"presentation"},DIV({"class":"netInfoPostParams"},$STR("net.label.Parameters"),SPAN({"class":"netInfoPostContentType"},"application/x-www-form-urlencoded")))))),partsTable:TABLE({"class":"netInfoPostPartsTable",cellpadding:0,cellspacing:0,"role":"presentation"},TBODY({"role":"list","aria-label":$STR("net.label.Parts")},TR({"class":"netInfoPostPartsTitle","role":"presentation"},TD({colspan:2,"role":"presentation"},DIV({"class":"netInfoPostParams"},$STR("net.label.Parts"),SPAN({"class":"netInfoPostContentType"},"multipart/form-data")))))),jsonTable:TABLE({"class":"netInfoPostJSONTable",cellpadding:0,cellspacing:0,"role":"presentation"},TBODY({"role":"list","aria-label":$STR("JSON")},TR({"class":"netInfoPostJSONTitle","role":"presentation"},TD({"role":"presentation"},DIV({"class":"netInfoPostParams"},$STR("JSON")))),TR(TD({"class":"netInfoPostJSONBody"})))),xmlTable:TABLE({"class":"netInfoPostXMLTable",cellpadding:0,cellspacing:0,"role":"presentation"},TBODY({"role":"list","aria-label":$STR("xmlviewer.tab.XML")},TR({"class":"netInfoPostXMLTitle","role":"presentation"},TD({"role":"presentation"},DIV({"class":"netInfoPostParams"},$STR("xmlviewer.tab.XML")))),TR(TD({"class":"netInfoPostXMLBody"})))),sourceTable:TABLE({"class":"netInfoPostSourceTable",cellpadding:0,cellspacing:0,"role":"presentation"},TBODY({"role":"list","aria-label":$STR("net.label.Source")},TR({"class":"netInfoPostSourceTitle","role":"presentation"},TD({colspan:2,"role":"presentation"},DIV({"class":"netInfoPostSource"},$STR("net.label.Source")))))),sourceBodyTag:TR({"role":"presentation"},TD({colspan:2,"role":"presentation"},FOR("line","$param|getParamValueIterator",CODE({"class":"focusRow subFocusRow","role":"listitem"},"$line")))),getParamValueIterator:function(param)
  {return NetInfoBody.getParamValueIterator(param);},render:function(context,parentNode,file)
  {var spy=getAncestorByClass(parentNode,"spyHead");var spyObject=spy.repObject;var data=spyObject.data;var contentType=file.mimeType;if(contentType&&contentType=="application/x-www-form-urlencoded"||data&&data.indexOf("=")!=-1)
  {var params=parseURLEncodedTextArray(data);if(params)
  this.insertParameters(parentNode,params);}
  var jsonData={responseText:data};if(Firebug.JSONViewerModel.isJSON(contentType,data))
  this.insertJSON(parentNode,jsonData,context);var postText=data;if(postText)
  this.insertSource(parentNode,postText);},insertParameters:function(parentNode,params)
  {if(!params||!params.length)
  return;var paramTable=this.paramsTable.append({object:{}},parentNode);var row=$$(".netInfoPostParamsTitle",paramTable)[0];var tbody=paramTable.getElementsByTagName("tbody")[0];NetInfoBody.headerDataTag.insertRows({headers:params},row);},insertParts:function(parentNode,data)
  {if(!data.params||!data.params.length)
  return;var partsTable=this.partsTable.append({object:{}},parentNode);var row=$$(".netInfoPostPartsTitle",paramTable)[0];NetInfoBody.headerDataTag.insertRows({headers:data.params},row);},insertJSON:function(parentNode,file,context)
  {var text=file.responseText;var data=parseJSONString(text);if(!data)
  return;var jsonTable=this.jsonTable.append({},parentNode);var jsonBody=$$(".netInfoPostJSONBody",jsonTable)[0];if(!this.toggles)
  this.toggles={};Firebug.DOMPanel.DirTable.tag.replace({object:data,toggles:this.toggles},jsonBody);},insertXML:function(parentNode,file,context)
  {var text=Utils.getPostText(file,context);var jsonTable=this.xmlTable.append(null,parentNode);var jsonBody=$$(".netInfoPostXMLBody",jsonTable)[0];Firebug.XMLViewerModel.insertXML(jsonBody,text);},insertSource:function(parentNode,text)
  {var sourceTable=this.sourceTable.append({object:{}},parentNode);var row=$$(".netInfoPostSourceTitle",sourceTable)[0];var param={value:[text]};this.sourceBodyTag.insertRows({param:param},row);},parseMultiPartText:function(file,context)
  {var text=Utils.getPostText(file,context);if(text==undefined)
  return null;FBTrace.sysout("net.parseMultiPartText; boundary: ",text);var boundary=text.match(/\s*boundary=\s*(.*)/)[1];var divider="\r\n\r\n";var bodyStart=text.indexOf(divider);var body=text.substr(bodyStart+divider.length);var postData={};postData.mimeType="multipart/form-data";postData.params=[];var parts=body.split("--"+boundary);for(var i=0;i<parts.length;i++)
  {var part=parts[i].split(divider);if(part.length!=2)
  continue;var m=part[0].match(/\s*name=\"(.*)\"(;|$)/);postData.params.push({name:(m&&m.length>1)?m[1]:"",value:trim(part[1])});}
  return postData;}});var NetInfoPostData=Firebug.NetMonitor.NetInfoPostData;var $STRP=function(a){return a;};Firebug.NetMonitor.NetLimit=domplate(Firebug.Rep,{collapsed:true,tableTag:DIV(TABLE({width:"100%",cellpadding:0,cellspacing:0},TBODY())),limitTag:TR({"class":"netRow netLimitRow",$collapsed:"$isCollapsed"},TD({"class":"netCol netLimitCol",colspan:6},TABLE({cellpadding:0,cellspacing:0},TBODY(TR(TD(SPAN({"class":"netLimitLabel"},$STRP("plural.Limit_Exceeded",[0]))),TD({style:"width:100%"}),TD(BUTTON({"class":"netLimitButton",title:"$limitPrefsTitle",onclick:"$onPreferences"},$STR("LimitPrefs"))),TD(" ")))))),isCollapsed:function()
  {return this.collapsed;},onPreferences:function(event)
  {openNewTab("about:config");},updateCounter:function(row)
  {removeClass(row,"collapsed");var limitLabel=row.getElementsByClassName("netLimitLabel").item(0);limitLabel.firstChild.nodeValue=$STRP("plural.Limit_Exceeded",[row.limitInfo.totalCount]);},createTable:function(parent,limitInfo)
  {var table=this.tableTag.replace({},parent);var row=this.createRow(table.firstChild.firstChild,limitInfo);return[table,row];},createRow:function(parent,limitInfo)
  {var row=this.limitTag.insertRows(limitInfo,parent,this)[0];row.limitInfo=limitInfo;return row;},observe:function(subject,topic,data)
  {if(topic!="nsPref:changed")
  return;if(data.indexOf("net.logLimit")!=-1)
  this.updateMaxLimit();},updateMaxLimit:function()
  {var value=Firebug.getPref(Firebug.prefDomain,"net.logLimit");maxQueueRequests=value?value:maxQueueRequests;}});var NetLimit=Firebug.NetMonitor.NetLimit;Firebug.NetMonitor.ResponseSizeLimit=domplate(Firebug.Rep,{tag:DIV({"class":"netInfoResponseSizeLimit"},SPAN("$object.beforeLink"),A({"class":"objectLink",onclick:"$onClickLink"},"$object.linkText"),SPAN("$object.afterLink")),reLink:/^(.*)<a>(.*)<\/a>(.*$)/,append:function(obj,parent)
  {var m=obj.text.match(this.reLink);return this.tag.append({onClickLink:obj.onClickLink,object:{beforeLink:m[1],linkText:m[2],afterLink:m[3]}},parent,this);}});Firebug.NetMonitor.Utils={findHeader:function(headers,name)
  {if(!headers)
  return null;name=name.toLowerCase();for(var i=0;i<headers.length;++i)
  {var headerName=headers[i].name.toLowerCase();if(headerName==name)
  return headers[i].value;}},formatPostText:function(text)
  {if(text instanceof XMLDocument)
  return getElementXML(text.documentElement);else
  return text;},getPostText:function(file,context,noLimit)
  {if(!file.postText)
  {file.postText=readPostTextFromRequest(file.request,context);if(!file.postText&&context)
  file.postText=readPostTextFromPage(file.href,context);}
  if(!file.postText)
  return file.postText;var limit=Firebug.netDisplayedPostBodyLimit;if(file.postText.length>limit&&!noLimit)
  {return cropString(file.postText,limit,"\n\n... "+$STR("net.postDataSizeLimitMessage")+" ...\n\n");}
  return file.postText;},getResponseText:function(file,context)
  {return(typeof(file.responseText)!="undefined")?file.responseText:context.sourceCache.loadText(file.href,file.method,file);},isURLEncodedRequest:function(file,context)
  {var text=Utils.getPostText(file,context);if(text&&text.toLowerCase().indexOf("content-type: application/x-www-form-urlencoded")==0)
  return true;var headerValue=Utils.findHeader(file.requestHeaders,"content-type");if(headerValue&&headerValue.indexOf("application/x-www-form-urlencoded")==0)
  return true;return false;},isMultiPartRequest:function(file,context)
  {var text=Utils.getPostText(file,context);if(text&&text.toLowerCase().indexOf("content-type: multipart/form-data")==0)
  return true;return false;},getMimeType:function(mimeType,uri)
  {if(!mimeType||!(mimeCategoryMap.hasOwnProperty(mimeType)))
  {var ext=getFileExtension(uri);if(!ext)
  return mimeType;else
  {var extMimeType=mimeExtensionMap[ext.toLowerCase()];return extMimeType?extMimeType:mimeType;}}
  else
  return mimeType;},getDateFromSeconds:function(s)
  {var d=new Date();d.setTime(s*1000);return d;},getHttpHeaders:function(request,file)
  {try
  {var http=QI(request,Ci.nsIHttpChannel);file.status=request.responseStatus;file.method=http.requestMethod;file.urlParams=parseURLParams(file.href);file.mimeType=Utils.getMimeType(request.contentType,request.name);if(!file.responseHeaders&&Firebug.collectHttpHeaders)
  {var requestHeaders=[],responseHeaders=[];http.visitRequestHeaders({visitHeader:function(name,value)
  {requestHeaders.push({name:name,value:value});}});http.visitResponseHeaders({visitHeader:function(name,value)
  {responseHeaders.push({name:name,value:value});}});file.requestHeaders=requestHeaders;file.responseHeaders=responseHeaders;}}
  catch(exc)
  {if(FBTrace.DBG_ERRORS)
  FBTrace.sysout("net.getHttpHeaders FAILS "+file.href,exc);}},isXHR:function(request)
  {try
  {var callbacks=request.notificationCallbacks;var xhrRequest=callbacks?callbacks.getInterface(Ci.nsIXMLHttpRequest):null;if(FBTrace.DBG_NET)
  FBTrace.sysout("net.isXHR; "+(xhrRequest!=null)+", "+safeGetName(request));return(xhrRequest!=null);}
  catch(exc)
  {}
  return false;},getFileCategory:function(file)
  {if(file.category)
  {if(FBTrace.DBG_NET)
  FBTrace.sysout("net.getFileCategory; current: "+file.category+" for: "+file.href,file);return file.category;}
  if(file.isXHR)
  {if(FBTrace.DBG_NET)
  FBTrace.sysout("net.getFileCategory; XHR for: "+file.href,file);return file.category="xhr";}
  if(!file.mimeType)
  {var ext=getFileExtension(file.href);if(ext)
  file.mimeType=mimeExtensionMap[ext.toLowerCase()];}
  if(!file.mimeType)
  return "";var mimeType=file.mimeType;if(mimeType)
  mimeType=mimeType.split(";")[0];return(file.category=mimeCategoryMap[mimeType]);}};var Utils=Firebug.NetMonitor.Utils;Firebug.registerModule(Firebug.NetMonitor);}});FBL.ns(function(){with(FBL){var contexts=[];Firebug.Spy=extend(Firebug.Module,{dispatchName:"spy",initialize:function()
  {if(Firebug.TraceModule)
  Firebug.TraceModule.addListener(this.TraceListener);Firebug.Module.initialize.apply(this,arguments);},shutdown:function()
  {Firebug.Module.shutdown.apply(this,arguments);if(Firebug.TraceModule)
  Firebug.TraceModule.removeListener(this.TraceListener);},initContext:function(context)
  {context.spies=[];if(Firebug.showXMLHttpRequests&&Firebug.Console.isAlwaysEnabled())
  this.attachObserver(context,context.window);if(FBTrace.DBG_SPY)
  FBTrace.sysout("spy.initContext "+contexts.length+" ",context.getName());},destroyContext:function(context)
  {this.detachObserver(context,null);if(FBTrace.DBG_SPY&&context.spies.length)
  FBTrace.sysout("spy.destroyContext; ERROR There are leaking Spies ("
  +context.spies.length+") "+context.getName());delete context.spies;if(FBTrace.DBG_SPY)
  FBTrace.sysout("spy.destroyContext "+contexts.length+" ",context.getName());},watchWindow:function(context,win)
  {if(Firebug.showXMLHttpRequests&&Firebug.Console.isAlwaysEnabled())
  this.attachObserver(context,win);},unwatchWindow:function(context,win)
  {try
  {this.detachObserver(context,win);}
  catch(ex)
  {ERROR(ex);}},updateOption:function(name,value)
  {if(name=="showXMLHttpRequests")
  {var tach=value?this.attachObserver:this.detachObserver;for(var i=0;i<TabWatcher.contexts.length;++i)
  {var context=TabWatcher.contexts[i];iterateWindows(context.window,function(win)
  {tach.apply(this,[context,win]);});}}},skipSpy:function(win)
  {if(!win)
  return true;var uri=safeGetWindowLocation(win);if(uri&&(uri.indexOf("about:")==0||uri.indexOf("chrome:")==0))
  return true;},attachObserver:function(context,win)
  {if(Firebug.Spy.skipSpy(win))
  return;for(var i=0;i<contexts.length;++i)
  {if((contexts[i].context==context)&&(contexts[i].win==win))
  return;}
  if(contexts.length==0)
  {httpObserver.addObserver(SpyHttpObserver,"firebug-http-event",false);SpyHttpActivityObserver.registerObserver();}
  contexts.push({context:context,win:win});if(FBTrace.DBG_SPY)
  FBTrace.sysout("spy.attachObserver (HTTP) "+contexts.length+" ",context.getName());},detachObserver:function(context,win)
  {for(var i=0;i<contexts.length;++i)
  {if(contexts[i].context==context)
  {if(win&&(contexts[i].win!=win))
  continue;contexts.splice(i,1);if(contexts.length==0)
  {httpObserver.removeObserver(SpyHttpObserver,"firebug-http-event");SpyHttpActivityObserver.unregisterObserver();}
  if(FBTrace.DBG_SPY)
  FBTrace.sysout("spy.detachObserver (HTTP) "+contexts.length+" ",context.getName());return;}}},getXHR:function(request)
  {if(!(request instanceof Ci.nsIHttpChannel))
  return null;try
  {var callbacks=request.notificationCallbacks;return(callbacks?callbacks.getInterface(Ci.nsIXMLHttpRequest):null);}
  catch(exc)
  {if(exc.name=="NS_NOINTERFACE")
  {if(FBTrace.DBG_SPY)
  FBTrace.sysout("spy.getXHR; Request is not nsIXMLHttpRequest: "+
  safeGetRequestName(request));}}
  return null;}});Firebug.Spy.XHR=domplate(Firebug.Rep,{tag:DIV({"class":"spyHead",_repObject:"$object"},TABLE({"class":"spyHeadTable focusRow outerFocusRow",cellpadding:0,cellspacing:0,"role":"listitem","aria-expanded":"false"},TBODY({"role":"presentation"},TR({"class":"spyRow"},TD({"class":"spyTitleCol spyCol",onclick:"$onToggleBody"},DIV({"class":"spyTitle"},"$object|getCaption"),DIV({"class":"spyFullTitle spyTitle"},"$object|getFullUri")),TD({"class":"spyCol"},DIV({"class":"spyStatus"},"$object|getStatus")),TD({"class":"spyCol"},SPAN({"class":"spyIcon"})),TD({"class":"spyCol"},SPAN({"class":"spyTime"})),TD({"class":"spyCol"},TAG(FirebugReps.SourceLink.tag,{object:"$object.sourceLink"})))))),getCaption:function(spy)
  {return spy.method.toUpperCase()+" "+cropString(spy.getURL(),100);},getFullUri:function(spy)
  {return spy.method.toUpperCase()+" "+spy.getURL();},getStatus:function(spy)
  {var statusCode=spy.statusCode==1223?204:spy.statusCode;var text="";if(statusCode)
  text+=statusCode+" ";if(spy.statusText)
  return text+=spy.statusText;return text;},onToggleBody:function(event)
  {var target=event.currentTarget||event.srcElement;var logRow=getAncestorByClass(target,"logRow-spy");if(isLeftClick(event))
  {toggleClass(logRow,"opened");var spy=getChildByClass(logRow,"spyHead").repObject;var spyHeadTable=getAncestorByClass(target,"spyHeadTable");if(hasClass(logRow,"opened"))
  {updateHttpSpyInfo(spy,logRow);if(spyHeadTable)
  spyHeadTable.setAttribute('aria-expanded','true');}
  else
  {}}},copyURL:function(spy)
  {copyToClipboard(spy.getURL());},copyParams:function(spy)
  {var text=spy.postText;if(!text)
  return;var url=reEncodeURL(spy,text,true);copyToClipboard(url);},copyResponse:function(spy)
  {copyToClipboard(spy.responseText);},openInTab:function(spy)
  {openNewTab(spy.getURL(),spy.postText);},supportsObject:function(object)
  {return false;return object instanceof Firebug.Spy.XMLHttpRequestSpy;},browseObject:function(spy,context)
  {var url=spy.getURL();openNewTab(url);return true;},getRealObject:function(spy,context)
  {return spy.xhrRequest;},getContextMenuItems:function(spy)
  {var items=[{label:"CopyLocation",command:bindFixed(this.copyURL,this,spy)}];if(spy.postText)
  {items.push({label:"CopyLocationParameters",command:bindFixed(this.copyParams,this,spy)});}
  items.push({label:"CopyResponse",command:bindFixed(this.copyResponse,this,spy)},"-",{label:"OpenInTab",command:bindFixed(this.openInTab,this,spy)});return items;}});function updateTime(spy)
  {var timeBox=spy.logRow.getElementsByClassName("spyTime").item(0);if(spy.responseTime)
  timeBox.textContent=" "+formatTime(spy.responseTime);}
  function updateLogRow(spy)
  {updateTime(spy);var statusBox=spy.logRow.getElementsByClassName("spyStatus").item(0);statusBox.textContent=Firebug.Spy.XHR.getStatus(spy);removeClass(spy.logRow,"loading");setClass(spy.logRow,"loaded");try
  {var errorRange=Math.floor(spy.xhrRequest.status/100);if(errorRange==4||errorRange==5)
  setClass(spy.logRow,"error");}
  catch(exc)
  {}}
  var updateHttpSpyInfo=function updateHttpSpyInfo(spy,logRow)
  {if(!spy.logRow&&logRow)
  spy.logRow=logRow;if(!spy.logRow||!hasClass(spy.logRow,"opened"))
  return;if(!spy.params)
  spy.params=parseURLParams(spy.href+"");if(!spy.requestHeaders)
  spy.requestHeaders=getRequestHeaders(spy);if(!spy.responseHeaders&&spy.loaded)
  spy.responseHeaders=getResponseHeaders(spy);var template=Firebug.NetMonitor.NetInfoBody;var netInfoBox=getChildByClass(spy.logRow,"spyHead","netInfoBody");if(!netInfoBox)
  {var head=getChildByClass(spy.logRow,"spyHead");netInfoBox=template.tag.append({"file":spy},head);dispatch(template.fbListeners,"initTabBody",[netInfoBox,spy]);template.selectTabByName(netInfoBox,"Response");}
  else
  {template.updateInfo(netInfoBox,spy,spy.context);}};function getRequestHeaders(spy)
  {var headers=[];var channel=spy.xhrRequest.channel;if(channel instanceof Ci.nsIHttpChannel)
  {channel.visitRequestHeaders({visitHeader:function(name,value)
  {headers.push({name:name,value:value});}});}
  return headers;}
  function getResponseHeaders(spy)
  {var headers=[];try
  {var channel=spy.xhrRequest.channel;if(channel instanceof Ci.nsIHttpChannel)
  {channel.visitResponseHeaders({visitHeader:function(name,value)
  {headers.push({name:name,value:value});}});}}
  catch(exc)
  {if(FBTrace.DBG_SPY||FBTrace.DBG_ERRORS)
  FBTrace.sysout("spy.getResponseHeaders; EXCEPTION "+
  safeGetRequestName(spy.request),exc);}
  return headers;}
  Firebug.registerModule(Firebug.Spy);}});FBL.ns(function(){with(FBL){var contentTypes={"text/plain":1,"text/javascript":1,"text/x-javascript":1,"text/json":1,"text/x-json":1,"application/json":1,"application/x-json":1,"application/javascript":1,"application/x-javascript":1,"application/json-rpc":1};Firebug.JSONViewerModel=extend(Firebug.Module,{dispatchName:"jsonViewer",initialize:function()
  {Firebug.NetMonitor.NetInfoBody.addListener(this);this.toggles={};},shutdown:function()
  {Firebug.NetMonitor.NetInfoBody.removeListener(this);},initTabBody:function(infoBox,file)
  {if(FBTrace.DBG_JSONVIEWER)
  FBTrace.sysout("jsonviewer.initTabBody",infoBox);dispatch(this.fbListeners,"onParseJSON",[file]);if(!file.jsonObject)
  {if(this.isJSON(file.mimeType,file.responseText))
  file.jsonObject=this.parseJSON(file);}
  if(file.jsonObject&&hasProperties(file.jsonObject))
  {Firebug.NetMonitor.NetInfoBody.appendTab(infoBox,"JSON",$STR("JSON"));if(FBTrace.DBG_JSONVIEWER)
  FBTrace.sysout("jsonviewer.initTabBody; JSON object available "+
  (typeof(file.jsonObject)!="undefined"),file.jsonObject);}},isJSON:function(contentType,data)
  {var responseText=data?trim(data):null;if(responseText&&responseText.indexOf("{")==0)
  return true;if(!contentType)
  return false;contentType=contentType.split(";")[0];contentType=trim(contentType);return contentTypes[contentType];},updateTabBody:function(infoBox,file,context)
  {var tab=infoBox.selectedTab;var tabBody=$$(".netInfoJSONText",infoBox)[0];if(!hasClass(tab,"netInfoJSONTab")||tabBody.updated)
  return;tabBody.updated=true;if(file.jsonObject){Firebug.DOMPanel.DirTable.tag.replace({object:file.jsonObject,toggles:this.toggles},tabBody);}},parseJSON:function(file)
  {var jsonString=new String(file.responseText);return parseJSONString(jsonString);}});Firebug.registerModule(Firebug.JSONViewerModel);}});FBL.ns(function(){with(FBL){var xmlContentTypes=["text/xml","application/xml","application/xhtml+xml","application/rss+xml","application/atom+xml",,"application/vnd.mozilla.maybe.feed","application/rdf+xml","application/vnd.mozilla.xul+xml"];Firebug.XMLViewerModel=extend(Firebug.Module,{dispatchName:"xmlViewer",initialize:function()
  {Firebug.Module.initialize.apply(this,arguments);Firebug.NetMonitor.NetInfoBody.addListener(this);},shutdown:function()
  {Firebug.Module.shutdown.apply(this,arguments);Firebug.NetMonitor.NetInfoBody.removeListener(this);},initTabBody:function(infoBox,file)
  {if(FBTrace.DBG_XMLVIEWER)
  FBTrace.sysout("xmlviewer.initTabBody",infoBox);if(this.isXML(file.mimeType,file.responseText))
  {Firebug.NetMonitor.NetInfoBody.appendTab(infoBox,"XML",$STR("XML"));if(FBTrace.DBG_XMLVIEWER)
  FBTrace.sysout("xmlviewer.initTabBody; XML response available");}},isXML:function(contentType)
  {if(!contentType)
  return false;for(var i=0;i<xmlContentTypes.length;i++)
  {if(contentType.indexOf(xmlContentTypes[i])==0)
  return true;}
  return false;},updateTabBody:function(infoBox,file,context)
  {var tab=infoBox.selectedTab;var tabBody=$$(".netInfoXMLText",infoBox)[0];if(!hasClass(tab,"netInfoXMLTab")||tabBody.updated)
  return;tabBody.updated=true;this.insertXML(tabBody,Firebug.NetMonitor.Utils.getResponseText(file,context));},insertXML:function(parentNode,text)
  {var xmlText=text.replace(/^\s*<?.+?>\s*/,"");var div=parentNode.ownerDocument.createElement("div");div.innerHTML=xmlText;var root=div.getElementsByTagName("*")[0];if(FBTrace.DBG_XMLVIEWER)
  FBTrace.sysout("xmlviewer.updateTabBody; XML response parsed",doc);var html=[];Firebug.Reps.appendNode(root,html);parentNode.innerHTML=html.join("");}});Firebug.XMLViewerModel.ParseError=domplate(Firebug.Rep,{tag:DIV({"class":"xmlInfoError"},DIV({"class":"xmlInfoErrorMsg"},"$error.message"),PRE({"class":"xmlInfoErrorSource"},"$error|getSource")),getSource:function(error)
  {var parts=error.source.split("\n");if(parts.length!=2)
  return error.source;var limit=50;var column=parts[1].length;if(column>=limit){parts[0]="..."+parts[0].substr(column-limit);parts[1]="..."+parts[1].substr(column-limit);}
  if(parts[0].length>80)
  parts[0]=parts[0].substr(0,80)+"...";return parts.join("\n");}});Firebug.registerModule(Firebug.XMLViewerModel);}});FBL.ns(function(){with(FBL){var ElementCache=Firebug.Lite.Cache.Element;var cacheID=Firebug.Lite.Cache.ID;var ignoreHTMLProps={sizcache:1,sizset:1};ignoreHTMLProps[cacheID]=1;Firebug.HTML=extend(Firebug.Module,{appendTreeNode:function(nodeArray,html)
  {var reTrim=/^\s+|\s+$/g;if(!nodeArray.length)nodeArray=[nodeArray];for(var n=0,node;node=nodeArray[n];n++)
  {if(node.nodeType==1)
  {if(Firebug.ignoreFirebugElements&&node.firebugIgnore)continue;var uid=ElementCache(node);var child=node.childNodes;var childLength=child.length;var nodeName=node.nodeName.toLowerCase();var nodeVisible=isVisible(node);var hasSingleTextChild=childLength==1&&node.firstChild.nodeType==3&&nodeName!="script"&&nodeName!="style";var nodeControl=!hasSingleTextChild&&childLength>0?('<div class="nodeControl"><\/div>'):'';var isIE=false;if(isIE&&nodeControl)
  html.push(nodeControl);if(typeof uid!='undefined')
  html.push('<div class="objectBox-element" ','id="',uid,'">',!isIE&&nodeControl?nodeControl:"",'<span ',cacheID,'="',uid,'"  class="nodeBox',nodeVisible?"":" nodeHidden",'"><<span class="nodeTag">',nodeName,'<\/span>');else
  html.push('<div class="objectBox-element"><span class="nodeBox',nodeVisible?"":" nodeHidden",'"><<span class="nodeTag">',nodeName,'<\/span>');for(var i=0;i<node.attributes.length;++i)
  {var attr=node.attributes[i];if(!attr.specified||Firebug.ignoreFirebugElements&&ignoreHTMLProps.hasOwnProperty(attr.nodeName)||attr.nodeName.substr(0,1)=="_"||typeof attr.nodeValue==="function"||attr.nodeValue&&attr.nodeValue.toString()==="[object Object]")
  continue;var name=attr.nodeName.toLowerCase();var value=name=="style"?formatStyles(node.style.cssText):attr.nodeValue;html.push(' <span class="nodeName">',name,'<\/span>="<span class="nodeValue">',escapeHTML(value),'<\/span>"')}
  if(hasSingleTextChild)
  {var value=child[0].nodeValue.replace(reTrim,'');if(value)
  {html.push('><span class="nodeText">',escapeHTML(value),'<\/span></<span class="nodeTag">',nodeName,'<\/span>><\/span><\/div>');}
  else
  html.push('/><\/span><\/div>');}
  else if(childLength>0)
  {html.push('><\/span><\/div>');}
  else
  html.push('/><\/span><\/div>');}
  else if(node.nodeType==3)
  {if(node.parentNode&&(node.parentNode.nodeName.toLowerCase()=="script"||node.parentNode.nodeName.toLowerCase()=="style"))
  {var value=node.nodeValue.replace(reTrim,'');if(isIE){var src=value+'\n';}else{var src='\n'+value+'\n';}
  var match=src.match(/\n/g);var num=match?match.length:0;var s=[],sl=0;for(var c=1;c<num;c++){s[sl++]='<div line="'+c+'">'+c+'<\/div>';}
  html.push('<div class="lineNo">',s.join(''),'<\/div><pre class="sourceCode">',escapeHTML(src),'<\/pre>');}
  else
  {var value=node.nodeValue.replace(reTrim,'');if(value)
  html.push('<div class="nodeText">',escapeHTML(value),'<\/div>');}}}},appendTreeChildren:function(treeNode)
  {var doc=Firebug.chrome.document;var uid=treeNode.id;var parentNode=ElementCache.get(uid);if(parentNode.childNodes.length==0)return;var treeNext=treeNode.nextSibling;var treeParent=treeNode.parentNode;var isIE=false;var control=isIE?treeNode.previousSibling:treeNode.firstChild;control.className='nodeControl nodeMaximized';var html=[];var children=doc.createElement("div");children.className="nodeChildren";this.appendTreeNode(parentNode.childNodes,html);children.innerHTML=html.join("");treeParent.insertBefore(children,treeNext);var closeElement=doc.createElement("div");closeElement.className="objectBox-element";closeElement.innerHTML='</<span class="nodeTag">'+
  parentNode.nodeName.toLowerCase()+'><\/span>'
  treeParent.insertBefore(closeElement,treeNext);},removeTreeChildren:function(treeNode)
  {var children=treeNode.nextSibling;var closeTag=children.nextSibling;var isIE=false;var control=isIE?treeNode.previousSibling:treeNode.firstChild;control.className='nodeControl';children.parentNode.removeChild(children);closeTag.parentNode.removeChild(closeTag);},isTreeNodeVisible:function(id)
  {return $(id);},select:function(el)
  {var id=el&&ElementCache(el);if(id)
  this.selectTreeNode(id);},selectTreeNode:function(id)
  {id=""+id;var node,stack=[];while(id&&!this.isTreeNodeVisible(id))
  {stack.push(id);var node=ElementCache.get(id).parentNode;if(node)
  id=ElementCache(node);else
  break;}
  stack.push(id);while(stack.length>0)
  {id=stack.pop();node=$(id);if(stack.length>0&&ElementCache.get(id).childNodes.length>0)
  this.appendTreeChildren(node);}
  selectElement(node);if(fbPanel1)
  fbPanel1.scrollTop=Math.round(node.offsetTop-fbPanel1.clientHeight/2);}});Firebug.registerModule(Firebug.HTML);function HTMLPanel(){};HTMLPanel.prototype=extend(Firebug.Panel,{name:"HTML",title:"HTML",options:{hasSidePanel:true,isPreRendered:true,innerHTMLSync:true},create:function(){Firebug.Panel.create.apply(this,arguments);this.panelNode.style.padding="4px 3px 1px 15px";this.panelNode.style.minWidth="500px";if(Env.Options.enablePersistent||Firebug.chrome.type!="popup")
  this.createUI();if(!this.sidePanelBar.selectedPanel)
  {this.sidePanelBar.selectPanel("css");}},destroy:function()
  {selectedElement=null
  fbPanel1=null;selectedSidePanelTS=null;selectedSidePanelTimer=null;Firebug.Panel.destroy.apply(this,arguments);},createUI:function()
  {var rootNode=Firebug.browser.document.documentElement;var html=[];Firebug.HTML.appendTreeNode(rootNode,html);this.panelNode.innerHTML=html.join("");},initialize:function()
  {Firebug.Panel.initialize.apply(this,arguments);addEvent(this.panelNode,'click',Firebug.HTML.onTreeClick);fbPanel1=$("fbPanel1");if(!selectedElement)
  {Firebug.HTML.selectTreeNode(ElementCache(Firebug.browser.document.body));}
  addEvent(fbPanel1,'mousemove',Firebug.HTML.onListMouseMove);addEvent($("fbContent"),'mouseout',Firebug.HTML.onListMouseMove);addEvent(Firebug.chrome.node,'mouseout',Firebug.HTML.onListMouseMove);},shutdown:function()
  {removeEvent(fbPanel1,'mousemove',Firebug.HTML.onListMouseMove);removeEvent($("fbContent"),'mouseout',Firebug.HTML.onListMouseMove);removeEvent(Firebug.chrome.node,'mouseout',Firebug.HTML.onListMouseMove);removeEvent(this.panelNode,'click',Firebug.HTML.onTreeClick);fbPanel1=null;Firebug.Panel.shutdown.apply(this,arguments);},reattach:function()
  {if(FirebugChrome.selectedHTMLElementId)
  Firebug.HTML.selectTreeNode(FirebugChrome.selectedHTMLElementId);},updateSelection:function(object)
  {var id=ElementCache(object);if(id)
  {Firebug.HTML.selectTreeNode(id);}}});Firebug.registerPanel(HTMLPanel);var formatStyles=function(styles)
  {return isIE?styles.replace(/([^\s]+)\s*:/g,function(m,g){return g.toLowerCase()+":"}):styles;};var selectedElement=null
  var fbPanel1=null;var selectedSidePanelTS,selectedSidePanelTimer;var selectElement=function selectElement(e)
  {if(e!=selectedElement)
  {if(selectedElement)
  selectedElement.className="objectBox-element";e.className=e.className+" selectedElement";if(FBL.isFirefox)
  e.style.MozBorderRadius="2px";else if(FBL.isSafari)
  e.style.WebkitBorderRadius="2px";selectedElement=e;FirebugChrome.selectedHTMLElementId=e.id;var target=ElementCache.get(e.id);var selectedSidePanel=Firebug.chrome.getPanel("HTML").sidePanelBar.selectedPanel;var stack=FirebugChrome.htmlSelectionStack;stack.unshift(target);if(stack.length>2)
  stack.pop();var lazySelect=function()
  {selectedSidePanelTS=new Date().getTime();selectedSidePanel.select(target,true);};if(selectedSidePanelTimer)
  {clearTimeout(selectedSidePanelTimer);selectedSidePanelTimer=null;}
  if(new Date().getTime()-selectedSidePanelTS>100)
  setTimeout(lazySelect,0)
  else
  selectedSidePanelTimer=setTimeout(lazySelect,150);}}
  Firebug.HTML.onTreeClick=function(e)
  {e=e||event;var targ;if(e.target)targ=e.target;else if(e.srcElement)targ=e.srcElement;if(targ.nodeType==3)
  targ=targ.parentNode;if(targ.className.indexOf('nodeControl')!=-1||targ.className=='nodeTag')
  {var isIE=false;if(targ.className=='nodeTag')
  {var control=isIE?(targ.parentNode.previousSibling||targ):(targ.parentNode.previousSibling||targ);selectElement(targ.parentNode.parentNode);if(control.className.indexOf('nodeControl')==-1)
  return;}else
  control=targ;FBL.cancelEvent(e);var treeNode=isIE?control.nextSibling:control.parentNode;if(control.className.indexOf(' nodeMaximized')!=-1){FBL.Firebug.HTML.removeTreeChildren(treeNode);}else{FBL.Firebug.HTML.appendTreeChildren(treeNode);}}
  else if(targ.className=='nodeValue'||targ.className=='nodeName')
  {}}
  function onListMouseOut(e)
  {e=e||event||window;var targ;if(e.target)targ=e.target;else if(e.srcElement)targ=e.srcElement;if(targ.nodeType==3)
  targ=targ.parentNode;if(hasClass(targ,"fbPanel")){FBL.Firebug.Inspector.hideBoxModel();hoverElement=null;}};var hoverElement=null;var hoverElementTS=0;Firebug.HTML.onListMouseMove=function onListMouseMove(e)
  {try
  {e=e||event||window;var targ;if(e.target)targ=e.target;else if(e.srcElement)targ=e.srcElement;if(targ.nodeType==3)
  targ=targ.parentNode;var found=false;while(targ&&!found){if(!/\snodeBox\s|\sobjectBox-selector\s/.test(" "+targ.className+" "))
  targ=targ.parentNode;else
  found=true;}
  if(!targ)
  {FBL.Firebug.Inspector.hideBoxModel();hoverElement=null;return;}
  if(typeof targ.attributes[cacheID]=='undefined')return;var uid=targ.attributes[cacheID];if(!uid)return;var el=ElementCache.get(uid.value);var nodeName=el.nodeName.toLowerCase();if(FBL.isIE&&" meta title script link ".indexOf(" "+nodeName+" ")!=-1)
  return;if(!/\snodeBox\s|\sobjectBox-selector\s/.test(" "+targ.className+" "))return;if(el.id=="FirebugUI"||" html head body br script link iframe ".indexOf(" "+nodeName+" ")!=-1){FBL.Firebug.Inspector.hideBoxModel();hoverElement=null;return;}
  if((new Date().getTime()-hoverElementTS>40)&&hoverElement!=el){hoverElementTS=new Date().getTime();hoverElement=el;FBL.Firebug.Inspector.drawBoxModel(el);}}
  catch(E)
  {}}
  Firebug.Reps={appendText:function(object,html)
  {html.push(escapeHTML(objectToString(object)));},appendNull:function(object,html)
  {html.push('<span class="objectBox-null">',escapeHTML(objectToString(object)),'<\/span>');},appendString:function(object,html)
  {html.push('<span class="objectBox-string">"',escapeHTML(objectToString(object)),'"<\/span>');},appendInteger:function(object,html)
  {html.push('<span class="objectBox-number">',escapeHTML(objectToString(object)),'<\/span>');},appendFloat:function(object,html)
  {html.push('<span class="objectBox-number">',escapeHTML(objectToString(object)),'<\/span>');},appendFunction:function(object,html)
  {var reName=/function ?(.*?)\(/;var m=reName.exec(objectToString(object));var name=m&&m[1]?m[1]:"function";html.push('<span class="objectBox-function">',escapeHTML(name),'()<\/span>');},appendObject:function(object,html)
  {try
  {if(object==undefined)
  this.appendNull("undefined",html);else if(object==null)
  this.appendNull("null",html);else if(typeof object=="string")
  this.appendString(object,html);else if(typeof object=="number")
  this.appendInteger(object,html);else if(typeof object=="boolean")
  this.appendInteger(object,html);else if(typeof object=="function")
  this.appendFunction(object,html);else if(object.nodeType==1)
  this.appendSelector(object,html);else if(typeof object=="object")
  {if(typeof object.length!="undefined")
  this.appendArray(object,html);else
  this.appendObjectFormatted(object,html);}
  else
  this.appendText(object,html);}
  catch(exc)
  {}},appendObjectFormatted:function(object,html)
  {var text=objectToString(object);var reObject=/\[object (.*?)\]/;var m=reObject.exec(text);html.push('<span class="objectBox-object">',m?m[1]:text,'<\/span>')},appendSelector:function(object,html)
  {var uid=ElementCache(object);var uidString=uid?[cacheID,'="',uid,'"'].join(""):"";html.push('<span class="objectBox-selector"',uidString,'>');html.push('<span class="selectorTag">',escapeHTML(object.nodeName.toLowerCase()),'<\/span>');if(object.id)
  html.push('<span class="selectorId">#',escapeHTML(object.id),'<\/span>');if(object.className)
  html.push('<span class="selectorClass">.',escapeHTML(object.className),'<\/span>');html.push('<\/span>');},appendNode:function(node,html)
  {if(node.nodeType==1)
  {var uid=ElementCache(node);var uidString=uid?[cacheID,'="',uid,'"'].join(""):"";html.push('<div class="objectBox-element"',uidString,'">','<span ',cacheID,'="',uid,'" class="nodeBox">','<<span class="nodeTag">',node.nodeName.toLowerCase(),'<\/span>');for(var i=0;i<node.attributes.length;++i)
  {var attr=node.attributes[i];if(!attr.specified||attr.nodeName==cacheID)
  continue;var name=attr.nodeName.toLowerCase();var value=name=="style"?node.style.cssText:attr.nodeValue;html.push(' <span class="nodeName">',name,'<\/span>="<span class="nodeValue">',escapeHTML(value),'<\/span>"')}
  if(node.firstChild)
  {html.push('><\/div><div class="nodeChildren">');for(var child=node.firstChild;child;child=child.nextSibling)
  this.appendNode(child,html);html.push('<\/div><div class="objectBox-element"></<span class="nodeTag">',node.nodeName.toLowerCase(),'><\/span><\/span><\/div>');}
  else
  html.push('/><\/span><\/div>');}
  else if(node.nodeType==3)
  {var value=trim(node.nodeValue);if(value)
  html.push('<div class="nodeText">',escapeHTML(value),'<\/div>');}},appendArray:function(object,html)
  {html.push('<span class="objectBox-array"><b>[<\/b> ');for(var i=0,l=object.length,obj;i<l;++i)
  {this.appendObject(object[i],html);if(i<l-1)
  html.push(', ');}
  html.push(' <b>]<\/b><\/span>');}};}});FBL.ns(function(){with(FBL){var maxWidth=100,maxHeight=80;var infoTipMargin=10;var infoTipWindowPadding=25;Firebug.InfoTip=extend(Firebug.Module,{dispatchName:"infoTip",tags:domplate({infoTipTag:DIV({"class":"infoTip"}),colorTag:DIV({style:"background: $rgbValue; width: 100px; height: 40px"}," "),imgTag:DIV({"class":"infoTipImageBox infoTipLoading"},IMG({"class":"infoTipImage",src:"$urlValue",repeat:"$repeat",onload:"$onLoadImage"}),IMG({"class":"infoTipBgImage",collapsed:true,src:"blank.gif"}),DIV({"class":"infoTipCaption"})),onLoadImage:function(event)
  {var img=event.currentTarget||event.srcElement;var innerBox=img.parentNode;var caption=getElementByClass(innerBox,"infoTipCaption");var bgImg=getElementByClass(innerBox,"infoTipBgImage");if(!bgImg)
  return;if(isIE)
  removeClass(innerBox,"infoTipLoading");var updateInfoTip=function(){var w=img.naturalWidth||img.width||10,h=img.naturalHeight||img.height||10;var repeat=img.getAttribute("repeat");if(repeat=="repeat-x"||(w==1&&h>1))
  {collapse(img,true);collapse(bgImg,false);bgImg.style.background="url("+img.src+") repeat-x";bgImg.style.width=maxWidth+"px";if(h>maxHeight)
  bgImg.style.height=maxHeight+"px";else
  bgImg.style.height=h+"px";}
  else if(repeat=="repeat-y"||(h==1&&w>1))
  {collapse(img,true);collapse(bgImg,false);bgImg.style.background="url("+img.src+") repeat-y";bgImg.style.height=maxHeight+"px";if(w>maxWidth)
  bgImg.style.width=maxWidth+"px";else
  bgImg.style.width=w+"px";}
  else if(repeat=="repeat"||(w==1&&h==1))
  {collapse(img,true);collapse(bgImg,false);bgImg.style.background="url("+img.src+") repeat";bgImg.style.width=maxWidth+"px";bgImg.style.height=maxHeight+"px";}
  else
  {if(w>maxWidth||h>maxHeight)
  {if(w>h)
  {img.style.width=maxWidth+"px";img.style.height=Math.round((h/w)*maxWidth)+"px";}
  else
  {img.style.width=Math.round((w/h)*maxHeight)+"px";img.style.height=maxHeight+"px";}}}
  caption.innerHTML=$STRF(w+" x "+h);};if(isIE)
  setTimeout(updateInfoTip,0);else
  {updateInfoTip();removeClass(innerBox,"infoTipLoading");}}}),initializeBrowser:function(browser)
  {browser.onInfoTipMouseOut=bind(this.onMouseOut,this,browser);browser.onInfoTipMouseMove=bind(this.onMouseMove,this,browser);var doc=browser.document;if(!doc)
  return;addEvent(doc,"mouseover",browser.onInfoTipMouseMove);addEvent(doc,"mouseout",browser.onInfoTipMouseOut);addEvent(doc,"mousemove",browser.onInfoTipMouseMove);return browser.infoTip=this.tags.infoTipTag.append({},getBody(doc));},uninitializeBrowser:function(browser)
  {if(browser.infoTip)
  {var doc=browser.document;removeEvent(doc,"mouseover",browser.onInfoTipMouseMove);removeEvent(doc,"mouseout",browser.onInfoTipMouseOut);removeEvent(doc,"mousemove",browser.onInfoTipMouseMove);browser.infoTip.parentNode.removeChild(browser.infoTip);delete browser.infoTip;delete browser.onInfoTipMouseMove;}},showInfoTip:function(infoTip,panel,target,x,y,rangeParent,rangeOffset)
  {if(!Firebug.showInfoTips)
  return;var scrollParent=getOverflowParent(target);var scrollX=x+(scrollParent?scrollParent.scrollLeft:0);if(panel.showInfoTip(infoTip,target,scrollX,y,rangeParent,rangeOffset))
  {var htmlElt=infoTip.ownerDocument.documentElement;var panelWidth=htmlElt.clientWidth;var panelHeight=htmlElt.clientHeight;if(x+infoTip.offsetWidth+infoTipMargin>panelWidth)
  {infoTip.style.left=Math.max(0,panelWidth-(infoTip.offsetWidth+infoTipMargin))+"px";infoTip.style.right="auto";}
  else
  {infoTip.style.left=(x+infoTipMargin)+"px";infoTip.style.right="auto";}
  if(y+infoTip.offsetHeight+infoTipMargin>panelHeight)
  {infoTip.style.top=Math.max(0,panelHeight-(infoTip.offsetHeight+infoTipMargin))+"px";infoTip.style.bottom="auto";}
  else
  {infoTip.style.top=(y+infoTipMargin)+"px";infoTip.style.bottom="auto";}
  if(FBTrace.DBG_INFOTIP)
  FBTrace.sysout("infotip.showInfoTip; top: "+infoTip.style.top+
  ", left: "+infoTip.style.left+", bottom: "+infoTip.style.bottom+
  ", right:"+infoTip.style.right+", offsetHeight: "+infoTip.offsetHeight+
  ", offsetWidth: "+infoTip.offsetWidth+
  ", x: "+x+", panelWidth: "+panelWidth+
  ", y: "+y+", panelHeight: "+panelHeight);infoTip.setAttribute("active","true");}
  else
  this.hideInfoTip(infoTip);},hideInfoTip:function(infoTip)
  {if(infoTip)
  infoTip.removeAttribute("active");},onMouseOut:function(event,browser)
  {if(!event.relatedTarget)
  this.hideInfoTip(browser.infoTip);},onMouseMove:function(event,browser)
  {if(getAncestorByClass(event.target,"infoTip"))
  return;if(browser.currentPanel)
  {var x=event.clientX,y=event.clientY,target=event.target||event.srcElement;this.showInfoTip(browser.infoTip,browser.currentPanel,target,x,y,event.rangeParent,event.rangeOffset);}
  else
  this.hideInfoTip(browser.infoTip);},populateColorInfoTip:function(infoTip,color)
  {this.tags.colorTag.replace({rgbValue:color},infoTip);return true;},populateImageInfoTip:function(infoTip,url,repeat)
  {if(!repeat)
  repeat="no-repeat";this.tags.imgTag.replace({urlValue:url,repeat:repeat},infoTip);return true;},disable:function()
  {},showPanel:function(browser,panel)
  {if(panel)
  {var infoTip=panel.panelBrowser.infoTip;if(!infoTip)
  infoTip=this.initializeBrowser(panel.panelBrowser);this.hideInfoTip(infoTip);}},showSidePanel:function(browser,panel)
  {this.showPanel(browser,panel);}});Firebug.registerModule(Firebug.InfoTip);}});(function(){this.getElementXPath=function(element)
  {if(element&&element.id)
  return '//*[@id="'+element.id+'"]';else
  return this.getElementTreeXPath(element);};this.getElementTreeXPath=function(element)
  {var paths=[];for(;element&&element.nodeType==1;element=element.parentNode)
  {var index=0;var nodeName=element.nodeName;for(var sibling=element.previousSibling;sibling;sibling=sibling.previousSibling)
  {if(sibling.nodeType!=1)continue;if(sibling.nodeName==nodeName)
  ++index;}
  var tagName=element.nodeName.toLowerCase();var pathIndex=(index?"["+(index+1)+"]":"");paths.splice(0,0,tagName+pathIndex);}
  return paths.length?"/"+paths.join("/"):null;};this.getElementsByXPath=function(doc,xpath)
  {var nodes=[];try{var result=doc.evaluate(xpath,doc,null,XPathResult.ANY_TYPE,null);for(var item=result.iterateNext();item;item=result.iterateNext())
  nodes.push(item);}
  catch(exc)
  {}
  return nodes;};this.getRuleMatchingElements=function(rule,doc)
  {var css=rule.selectorText;var xpath=this.cssToXPath(css);return this.getElementsByXPath(doc,xpath);};}).call(FBL);FBL.ns(function(){with(FBL){var toCamelCase=function toCamelCase(s)
  {return s.replace(reSelectorCase,toCamelCaseReplaceFn);};var toSelectorCase=function toSelectorCase(s)
  {return s.replace(reCamelCase,"-$1").toLowerCase();};var reCamelCase=/([A-Z])/g;var reSelectorCase=/\-(.)/g;var toCamelCaseReplaceFn=function toCamelCaseReplaceFn(m,g)
  {return g.toUpperCase();};var ElementCache=Firebug.Lite.Cache.Element;var StyleSheetCache=Firebug.Lite.Cache.StyleSheet;var globalCSSRuleIndex;var externalStyleSheetURLs=[];var externalStyleSheetWarning=domplate(Firebug.Rep,{tag:DIV({"class":"warning focusRow",style:"font-weight:normal;",role:'listitem'},SPAN("$object|STR"),A({"href":"$href",target:"_blank"},"$link|STR"))});var processAllStyleSheetsTimeout=null;var loadExternalStylesheet=function(doc,styleSheetIterator,styleSheet)
  {var url=styleSheet.href;styleSheet.firebugIgnore=true;var source=Firebug.Lite.Proxy.load(url);source=source.replace(/url\(([^\)]+)\)/g,function(a,name){var hasDomain=/\w+:\/\/./.test(name);if(!hasDomain)
  {name=name.replace(/^(["'])(.+)\1$/,"$2");var first=name.charAt(0);if(first=="/")
  {var m=/^([^:]+:\/{1,3}[^\/]+)/.exec(url);return m?"url("+m[1]+name+")":"url("+name+")";}
  else
  {var path=url.replace(/[^\/]+\.[\w\d]+(\?.+|#.+)?$/g,"");path=path+name;var reBack=/[^\/]+\/\.\.\//;while(reBack.test(path))
  {path=path.replace(reBack,"");}
  return "url("+path+")";}}
  return a;});var oldStyle=styleSheet.ownerNode;if(!oldStyle)return;if(!oldStyle.parentNode)return;var style=createGlobalElement("style");style.setAttribute("charset","utf-8");style.setAttribute("type","text/css");style.innerHTML=source;oldStyle.parentNode.insertBefore(style,oldStyle.nextSibling);oldStyle.parentNode.removeChild(oldStyle);doc.styleSheets[doc.styleSheets.length-1].externalURL=url;console.log(url,"call "+externalStyleSheetURLs.length,source);externalStyleSheetURLs.pop();if(processAllStyleSheetsTimeout)
  {clearTimeout(processAllStyleSheetsTimeout);}
  processAllStyleSheetsTimeout=setTimeout(function(){console.log("processing");FBL.processAllStyleSheets(doc,styleSheetIterator);processAllStyleSheetsTimeout=null;},200);};FBL.processAllStyleSheets=function(doc,styleSheetIterator)
  {styleSheetIterator=styleSheetIterator||processStyleSheet;globalCSSRuleIndex=-1;var styleSheets=doc.styleSheets;var importedStyleSheets=[];if(FBTrace.DBG_CSS)
  var start=new Date().getTime();for(var i=0,length=styleSheets.length;i<length;i++)
  {try
  {var styleSheet=styleSheets[i];if("firebugIgnore"in styleSheet)continue;var rules=isIE?styleSheet.rules:styleSheet.cssRules;rules.length;}
  catch(e)
  {externalStyleSheetURLs.push(styleSheet.href);styleSheet.restricted=true;var ssid=StyleSheetCache(styleSheet);}
  styleSheetIterator(doc,styleSheet);var importedStyleSheet,importedRules;if(isIE)
  {var imports=styleSheet.imports;for(var j=0,importsLength=imports.length;j<importsLength;j++)
  {try
  {importedStyleSheet=imports[j];importedRules=importedStyleSheet.rules;importedRules.length;}
  catch(e)
  {externalStyleSheetURLs.push(styleSheet.href);importedStyleSheet.restricted=true;var ssid=StyleSheetCache(importedStyleSheet);}
  styleSheetIterator(doc,importedStyleSheet);}}
  else if(rules)
  {for(var j=0,rulesLength=rules.length;j<rulesLength;j++)
  {try
  {var rule=rules[j];importedStyleSheet=rule.styleSheet;if(importedStyleSheet)
  {importedRules=importedStyleSheet.cssRules;importedRules.length;}
  else
  break;}
  catch(e)
  {externalStyleSheetURLs.push(styleSheet.href);importedStyleSheet.restricted=true;var ssid=StyleSheetCache(importedStyleSheet);}
  styleSheetIterator(doc,importedStyleSheet);}}};if(FBTrace.DBG_CSS)
  {FBTrace.sysout("FBL.processAllStyleSheets","all stylesheet rules processed in "+(new Date().getTime()-start)+"ms");}};var CSSRuleMap={};var ElementCSSRulesMap={};var processStyleSheet=function(doc,styleSheet)
  {if(styleSheet.restricted)
  return;var rules=isIE?styleSheet.rules:styleSheet.cssRules;var ssid=StyleSheetCache(styleSheet);for(var i=0,length=rules.length;i<length;i++)
  {var rid=ssid+":"+i;var rule=rules[i];var selector=rule.selectorText;if(isIE)
  {selector=selector.replace(reSelectorTag,function(s){return s.toLowerCase();});}
  CSSRuleMap[rid]={styleSheetId:ssid,styleSheetIndex:i,order:++globalCSSRuleIndex,specificity:selector&&selector.indexOf(",")!=-1?getCSSRuleSpecificity(selector):0,rule:rule,selector:selector,cssText:rule.style?rule.style.cssText:rule.cssText?rule.cssText:""};var elements=Firebug.Selector(selector,doc);for(var j=0,elementsLength=elements.length;j<elementsLength;j++)
  {var element=elements[j];var eid=ElementCache(element);if(!ElementCSSRulesMap[eid])
  ElementCSSRulesMap[eid]=[];ElementCSSRulesMap[eid].push(rid);}}};FBL.getElementCSSRules=function(element)
  {var eid=ElementCache(element);var rules=ElementCSSRulesMap[eid];if(!rules)return;var arr=[element];var Selector=Firebug.Selector;var ruleId,rule;for(var i=0,length=rules.length;i<length;i++)
  {ruleId=rules[i];rule=CSSRuleMap[ruleId];if(rule.selector.indexOf(",")!=-1)
  {var selectors=rule.selector.split(",");var maxSpecificity=-1;var sel,spec,mostSpecificSelector;for(var j,len=selectors.length;j<len;j++)
  {sel=selectors[j];if(Selector.matches(sel,arr).length==1)
  {spec=getCSSRuleSpecificity(sel);if(spec>maxSpecificity)
  {maxSpecificity=spec;mostSpecificSelector=sel;}}}
  rule.specificity=maxSpecificity;}}
  rules.sort(sortElementRules);return rules;};var sortElementRules=function(a,b)
  {var ruleA=CSSRuleMap[a];var ruleB=CSSRuleMap[b];var specificityA=ruleA.specificity;var specificityB=ruleB.specificity;if(specificityA>specificityB)
  return 1;else if(specificityA<specificityB)
  return-1;else
  return ruleA.order>ruleB.order?1:-1;};var solveRulesTied=function(a,b)
  {var ruleA=CSSRuleMap[a];var ruleB=CSSRuleMap[b];if(ruleA.specificity==ruleB.specificity)
  return ruleA.order>ruleB.order?1:-1;return null;};var reSelectorTag=/(^|\s)(?:\w+)/g;var reSelectorClass=/\.[\w\d_-]+/g;var reSelectorId=/#[\w\d_-]+/g;var getCSSRuleSpecificity=function(selector)
  {var match=selector.match(reSelectorTag);var tagCount=match?match.length:0;match=selector.match(reSelectorClass);var classCount=match?match.length:0;match=selector.match(reSelectorId);var idCount=match?match.length:0;return tagCount+10*classCount+100*idCount;};Firebug.SourceBoxPanel=Firebug.Panel;var domUtils=null;var textContent=isIE?"innerText":"textContent";var CSSDomplateBase={isEditable:function(rule)
  {return!rule.isSystemSheet;},isSelectorEditable:function(rule)
  {return rule.isSelectorEditable&&this.isEditable(rule);}};var CSSPropTag=domplate(CSSDomplateBase,{tag:DIV({"class":"cssProp focusRow",$disabledStyle:"$prop.disabled",$editGroup:"$rule|isEditable",$cssOverridden:"$prop.overridden",role:"option"},A({"class":"cssPropDisable"},"  "),SPAN({"class":"cssPropName",$editable:"$rule|isEditable"},"$prop.name"),SPAN({"class":"cssColon"},":"),SPAN({"class":"cssPropValue",$editable:"$rule|isEditable"},"$prop.value$prop.important"),SPAN({"class":"cssSemi"},";"))});var CSSRuleTag=TAG("$rule.tag",{rule:"$rule"});var CSSImportRuleTag=domplate({tag:DIV({"class":"cssRule insertInto focusRow importRule",_repObject:"$rule.rule"},"@import "",A({"class":"objectLink",_repObject:"$rule.rule.styleSheet"},"$rule.rule.href"),"";")});var CSSStyleRuleTag=domplate(CSSDomplateBase,{tag:DIV({"class":"cssRule insertInto",$cssEditableRule:"$rule|isEditable",$editGroup:"$rule|isSelectorEditable",_repObject:"$rule.rule","ruleId":"$rule.id",role:'presentation'},DIV({"class":"cssHead focusRow",role:'listitem'},SPAN({"class":"cssSelector",$editable:"$rule|isSelectorEditable"},"$rule.selector")," {"),DIV({role:'group'},DIV({"class":"cssPropertyListBox",role:'listbox'},FOR("prop","$rule.props",TAG(CSSPropTag.tag,{rule:"$rule",prop:"$prop"})))),DIV({"class":"editable insertBefore",role:"presentation"},"}"))});var reSplitCSS=/(url\("?[^"\)]+?"?\))|(rgb\(.*?\))|(#[\dA-Fa-f]+)|(-?\d+(\.\d+)?(%|[a-z]{1,2})?)|([^,\s]+)|"(.*?)"/;var reURL=/url\("?([^"\)]+)?"?\)/;var reRepeat=/no-repeat|repeat-x|repeat-y|repeat/;var sothinkInstalled=false;var styleGroups={text:["font-family","font-size","font-weight","font-style","color","text-transform","text-decoration","letter-spacing","word-spacing","line-height","text-align","vertical-align","direction","column-count","column-gap","column-width"],background:["background-color","background-image","background-repeat","background-position","background-attachment","opacity"],box:["width","height","top","right","bottom","left","margin-top","margin-right","margin-bottom","margin-left","padding-top","padding-right","padding-bottom","padding-left","border-top-width","border-right-width","border-bottom-width","border-left-width","border-top-color","border-right-color","border-bottom-color","border-left-color","border-top-style","border-right-style","border-bottom-style","border-left-style","-moz-border-top-radius","-moz-border-right-radius","-moz-border-bottom-radius","-moz-border-left-radius","outline-top-width","outline-right-width","outline-bottom-width","outline-left-width","outline-top-color","outline-right-color","outline-bottom-color","outline-left-color","outline-top-style","outline-right-style","outline-bottom-style","outline-left-style"],layout:["position","display","visibility","z-index","overflow-x","overflow-y","overflow-clip","white-space","clip","float","clear","-moz-box-sizing"],other:["cursor","list-style-image","list-style-position","list-style-type","marker-offset","user-focus","user-select","user-modify","user-input"]};var styleGroupTitles={text:"Text",background:"Background",box:"Box Model",layout:"Layout",other:"Other"};Firebug.CSSModule=extend(Firebug.Module,{freeEdit:function(styleSheet,value)
  {if(!styleSheet.editStyleSheet)
  {var ownerNode=getStyleSheetOwnerNode(styleSheet);styleSheet.disabled=true;var url=CCSV("@mozilla.org/network/standard-url;1",Components.interfaces.nsIURL);url.spec=styleSheet.href;var editStyleSheet=ownerNode.ownerDocument.createElementNS("http://www.w3.org/1999/xhtml","style");unwrapObject(editStyleSheet).firebugIgnore=true;editStyleSheet.setAttribute("type","text/css");editStyleSheet.setAttributeNS("http://www.w3.org/XML/1998/namespace","base",url.directory);if(ownerNode.hasAttribute("media"))
  {editStyleSheet.setAttribute("media",ownerNode.getAttribute("media"));}
  ownerNode.parentNode.insertBefore(editStyleSheet,ownerNode.nextSibling);styleSheet.editStyleSheet=editStyleSheet;}
  styleSheet.editStyleSheet.innerHTML=value;if(FBTrace.DBG_CSS)
  FBTrace.sysout("css.saveEdit styleSheet.href:"+styleSheet.href+" got innerHTML:"+value+"\n");dispatch(this.fbListeners,"onCSSFreeEdit",[styleSheet,value]);},insertRule:function(styleSheet,cssText,ruleIndex)
  {if(FBTrace.DBG_CSS)FBTrace.sysout("Insert: "+ruleIndex+" "+cssText);var insertIndex=styleSheet.insertRule(cssText,ruleIndex);dispatch(this.fbListeners,"onCSSInsertRule",[styleSheet,cssText,ruleIndex]);return insertIndex;},deleteRule:function(styleSheet,ruleIndex)
  {if(FBTrace.DBG_CSS)FBTrace.sysout("deleteRule: "+ruleIndex+" "+styleSheet.cssRules.length,styleSheet.cssRules);dispatch(this.fbListeners,"onCSSDeleteRule",[styleSheet,ruleIndex]);styleSheet.deleteRule(ruleIndex);},setProperty:function(rule,propName,propValue,propPriority)
  {var style=rule.style||rule;var baseText=style.cssText;if(style.getPropertyValue)
  {var prevValue=style.getPropertyValue(propName);var prevPriority=style.getPropertyPriority(propName);style.removeProperty(propName);style.setProperty(propName,propValue,propPriority);}
  else
  {style[toCamelCase(propName)]=propValue;}
  if(propName){dispatch(this.fbListeners,"onCSSSetProperty",[style,propName,propValue,propPriority,prevValue,prevPriority,rule,baseText]);}},removeProperty:function(rule,propName,parent)
  {var style=rule.style||rule;var baseText=style.cssText;if(style.getPropertyValue)
  {var prevValue=style.getPropertyValue(propName);var prevPriority=style.getPropertyPriority(propName);style.removeProperty(propName);}
  else
  {style[toCamelCase(propName)]="";}
  if(propName){dispatch(this.fbListeners,"onCSSRemoveProperty",[style,propName,prevValue,prevPriority,rule,baseText]);}}});Firebug.CSSStyleSheetPanel=function(){};Firebug.CSSStyleSheetPanel.prototype=extend(Firebug.SourceBoxPanel,{template:domplate({tag:DIV({"class":"cssSheet insertInto a11yCSSView"},FOR("rule","$rules",CSSRuleTag),DIV({"class":"cssSheet editable insertBefore"},""))}),refresh:function()
  {if(this.location)
  this.updateLocation(this.location);else if(this.selection)
  this.updateSelection(this.selection);},toggleEditing:function()
  {if(!this.stylesheetEditor)
  this.stylesheetEditor=new StyleSheetEditor(this.document);if(this.editing)
  Firebug.Editor.stopEditing();else
  {if(!this.location)
  return;var styleSheet=this.location.editStyleSheet?this.location.editStyleSheet.sheet:this.location;var css=getStyleSheetCSS(styleSheet,this.context);this.stylesheetEditor.styleSheet=this.location;Firebug.Editor.startEditing(this.panelNode,css,this.stylesheetEditor);}},getStylesheetURL:function(rule)
  {if(this.location.href)
  return this.location.href;else
  return this.context.window.location.href;},getRuleByLine:function(styleSheet,line)
  {if(!domUtils)
  return null;var cssRules=styleSheet.cssRules;for(var i=0;i<cssRules.length;++i)
  {var rule=cssRules[i];if(rule instanceof CSSStyleRule)
  {var ruleLine=domUtils.getRuleLine(rule);if(ruleLine>=line)
  return rule;}}},highlightRule:function(rule)
  {var ruleElement=Firebug.getElementByRepObject(this.panelNode.firstChild,rule);if(ruleElement)
  {scrollIntoCenterView(ruleElement,this.panelNode);setClassTimed(ruleElement,"jumpHighlight",this.context);}},getStyleSheetRules:function(context,styleSheet)
  {var isSystemSheet=isSystemStyleSheet(styleSheet);function appendRules(cssRules)
  {for(var i=0;i<cssRules.length;++i)
  {var rule=cssRules[i];if(instanceOf(rule,"CSSStyleRule"))
  {var props=this.getRuleProperties(context,rule);var line=null;var selector=rule.selectorText;if(isIE)
  {selector=selector.replace(reSelectorTag,function(s){return s.toLowerCase();});}
  var ruleId=rule.selectorText+"/"+line;rules.push({tag:CSSStyleRuleTag.tag,rule:rule,id:ruleId,selector:selector,props:props,isSystemSheet:isSystemSheet,isSelectorEditable:true});}
  else if(instanceOf(rule,"CSSImportRule"))
  rules.push({tag:CSSImportRuleTag.tag,rule:rule});else if(instanceOf(rule,"CSSMediaRule"))
  appendRules.apply(this,[rule.cssRules]);else
  {if(FBTrace.DBG_ERRORS||FBTrace.DBG_CSS)
  FBTrace.sysout("css getStyleSheetRules failed to classify a rule ",rule);}}}
  var rules=[];appendRules.apply(this,[styleSheet.cssRules||styleSheet.rules]);return rules;},parseCSSProps:function(style,inheritMode)
  {var props=[];if(Firebug.expandShorthandProps)
  {var count=style.length-1,index=style.length;while(index--)
  {var propName=style.item(count-index);this.addProperty(propName,style.getPropertyValue(propName),!!style.getPropertyPriority(propName),false,inheritMode,props);}}
  else
  {var lines=style.cssText.match(/(?:[^;\(]*(?:\([^\)]*?\))?[^;\(]*)*;?/g);var propRE=/\s*([^:\s]*)\s*:\s*(.*?)\s*(! important)?;?$/;var line,i=0;var m;while(line=lines[i++]){m=propRE.exec(line);if(!m)
  continue;if(m[2])
  this.addProperty(m[1],m[2],!!m[3],false,inheritMode,props);};}
  return props;},getRuleProperties:function(context,rule,inheritMode)
  {var props=this.parseCSSProps(rule.style,inheritMode);var line;var ruleId=rule.selectorText+"/"+line;this.addOldProperties(context,ruleId,inheritMode,props);sortProperties(props);return props;},addOldProperties:function(context,ruleId,inheritMode,props)
  {if(context.selectorMap&&context.selectorMap.hasOwnProperty(ruleId))
  {var moreProps=context.selectorMap[ruleId];for(var i=0;i<moreProps.length;++i)
  {var prop=moreProps[i];this.addProperty(prop.name,prop.value,prop.important,true,inheritMode,props);}}},addProperty:function(name,value,important,disabled,inheritMode,props)
  {name=name.toLowerCase();if(inheritMode&&!inheritedStyleNames[name])
  return;name=this.translateName(name,value);if(name)
  {value=stripUnits(rgbToHex(value));important=important?" !important":"";var prop={name:name,value:value,important:important,disabled:disabled};props.push(prop);}},translateName:function(name,value)
  {if((value=="-moz-initial"&&(name=="-moz-background-clip"||name=="-moz-background-origin"||name=="-moz-background-inline-policy"))||(value=="physical"&&(name=="margin-left-ltr-source"||name=="margin-left-rtl-source"||name=="margin-right-ltr-source"||name=="margin-right-rtl-source"))||(value=="physical"&&(name=="padding-left-ltr-source"||name=="padding-left-rtl-source"||name=="padding-right-ltr-source"||name=="padding-right-rtl-source")))
  return null;if(name=="margin-left-value")
  return "margin-left";else if(name=="margin-right-value")
  return "margin-right";else if(name=="margin-top-value")
  return "margin-top";else if(name=="margin-bottom-value")
  return "margin-bottom";else if(name=="padding-left-value")
  return "padding-left";else if(name=="padding-right-value")
  return "padding-right";else if(name=="padding-top-value")
  return "padding-top";else if(name=="padding-bottom-value")
  return "padding-bottom";else
  return name;},editElementStyle:function()
  {var rulesBox=$$(".cssElementRuleContainer",this.panelNode)[0];var styleRuleBox=rulesBox&&Firebug.getElementByRepObject(rulesBox,this.selection);if(!styleRuleBox)
  {var rule={rule:this.selection,inherited:false,selector:"element.style",props:[]};if(!rulesBox)
  {styleRuleBox=this.template.cascadedTag.replace({rules:[rule],inherited:[],inheritLabel:"Inherited from"},this.panelNode);styleRuleBox=$$(".cssElementRuleContainer",styleRuleBox)[0];}
  else
  styleRuleBox=this.template.ruleTag.insertBefore({rule:rule},rulesBox);styleRuleBox=$$(".insertInto",styleRuleBox)[0];}
  Firebug.Editor.insertRowForObject(styleRuleBox);},insertPropertyRow:function(row)
  {Firebug.Editor.insertRowForObject(row);},insertRule:function(row)
  {var location=getAncestorByClass(row,"cssRule");if(!location)
  {location=getChildByClass(this.panelNode,"cssSheet");Firebug.Editor.insertRowForObject(location);}
  else
  {Firebug.Editor.insertRow(location,"before");}},editPropertyRow:function(row)
  {var propValueBox=getChildByClass(row,"cssPropValue");Firebug.Editor.startEditing(propValueBox);},deletePropertyRow:function(row)
  {var rule=Firebug.getRepObject(row);var propName=getChildByClass(row,"cssPropName")[textContent];Firebug.CSSModule.removeProperty(rule,propName);var ruleId=Firebug.getRepNode(row).getAttribute("ruleId");if(this.context.selectorMap&&this.context.selectorMap.hasOwnProperty(ruleId))
  {var map=this.context.selectorMap[ruleId];for(var i=0;i<map.length;++i)
  {if(map[i].name==propName)
  {map.splice(i,1);break;}}}
  if(this.name=="stylesheet")
  dispatch([Firebug.A11yModel],'onInlineEditorClose',[this,row.firstChild,true]);row.parentNode.removeChild(row);this.markChange(this.name=="stylesheet");},disablePropertyRow:function(row)
  {toggleClass(row,"disabledStyle");var rule=Firebug.getRepObject(row);var propName=getChildByClass(row,"cssPropName")[textContent];if(!this.context.selectorMap)
  this.context.selectorMap={};var ruleId=Firebug.getRepNode(row).getAttribute("ruleId");if(!(this.context.selectorMap.hasOwnProperty(ruleId)))
  this.context.selectorMap[ruleId]=[];var map=this.context.selectorMap[ruleId];var propValue=getChildByClass(row,"cssPropValue")[textContent];var parsedValue=parsePriority(propValue);if(hasClass(row,"disabledStyle"))
  {Firebug.CSSModule.removeProperty(rule,propName);map.push({"name":propName,"value":parsedValue.value,"important":parsedValue.priority});}
  else
  {Firebug.CSSModule.setProperty(rule,propName,parsedValue.value,parsedValue.priority);var index=findPropByName(map,propName);map.splice(index,1);}
  this.markChange(this.name=="stylesheet");},onMouseDown:function(event)
  {var offset=event.clientX-this.panelNode.parentNode.offsetLeft;if(!isLeftClick(event)||offset>20)
  return;var target=event.target||event.srcElement;if(hasClass(target,"textEditor"))
  return;var row=getAncestorByClass(target,"cssProp");if(row&&hasClass(row,"editGroup"))
  {this.disablePropertyRow(row);cancelEvent(event);}},onDoubleClick:function(event)
  {var offset=event.clientX-this.panelNode.parentNode.offsetLeft;if(!isLeftClick(event)||offset<=20)
  return;var target=event.target||event.srcElement;if(hasClass(target,"textEditorInner"))
  return;var row=getAncestorByClass(target,"cssRule");if(row&&!getAncestorByClass(target,"cssPropName")&&!getAncestorByClass(target,"cssPropValue"))
  {this.insertPropertyRow(row);cancelEvent(event);}},name:"stylesheet",title:"CSS",parentPanel:null,searchable:true,dependents:["css","stylesheet","dom","domSide","layout"],options:{hasToolButtons:true},create:function()
  {Firebug.Panel.create.apply(this,arguments);this.onMouseDown=bind(this.onMouseDown,this);this.onDoubleClick=bind(this.onDoubleClick,this);if(this.name=="stylesheet")
  {this.onChangeSelect=bind(this.onChangeSelect,this);var doc=Firebug.browser.document;var selectNode=this.selectNode=createElement("select");processAllStyleSheets(doc,function(doc,styleSheet)
  {var key=StyleSheetCache.key(styleSheet);var fileName=getFileName(styleSheet.href)||getFileName(doc.location.href);var option=createElement("option",{value:key});option.appendChild(Firebug.chrome.document.createTextNode(fileName));selectNode.appendChild(option);});this.toolButtonsNode.appendChild(selectNode);}},onChangeSelect:function(event)
  {event=event||window.event;var target=event.srcElement||event.currentTarget;var key=target.value;var styleSheet=StyleSheetCache.get(key);this.updateLocation(styleSheet);},initialize:function()
  {Firebug.Panel.initialize.apply(this,arguments);this.context=Firebug.chrome;this.document=Firebug.chrome.document;this.initializeNode();if(this.name=="stylesheet")
  {var styleSheets=Firebug.browser.document.styleSheets;if(styleSheets.length>0)
  {addEvent(this.selectNode,"change",this.onChangeSelect);this.updateLocation(styleSheets[0]);}}},shutdown:function()
  {Firebug.Editor.stopEditing();if(this.name=="stylesheet")
  {removeEvent(this.selectNode,"change",this.onChangeSelect);}
  this.destroyNode();Firebug.Panel.shutdown.apply(this,arguments);},destroy:function(state)
  {Firebug.Panel.destroy.apply(this,arguments);},initializeNode:function(oldPanelNode)
  {addEvent(this.panelNode,"mousedown",this.onMouseDown);addEvent(this.panelNode,"dblclick",this.onDoubleClick);},destroyNode:function()
  {removeEvent(this.panelNode,"mousedown",this.onMouseDown);removeEvent(this.panelNode,"dblclick",this.onDoubleClick);},ishow:function(state)
  {Firebug.Inspector.stopInspecting(true);this.showToolbarButtons("fbCSSButtons",true);if(this.context.loaded&&!this.location)
  {restoreObjects(this,state);if(!this.location)
  this.location=this.getDefaultLocation();if(state&&state.scrollTop)
  this.panelNode.scrollTop=state.scrollTop;}},ihide:function()
  {this.showToolbarButtons("fbCSSButtons",false);this.lastScrollTop=this.panelNode.scrollTop;},supportsObject:function(object)
  {if(object instanceof CSSStyleSheet)
  return 1;else if(object instanceof CSSStyleRule)
  return 2;else if(object instanceof CSSStyleDeclaration)
  return 2;else if(object instanceof SourceLink&&object.type=="css"&&reCSS.test(object.href))
  return 2;else
  return 0;},updateLocation:function(styleSheet)
  {if(!styleSheet)
  return;if(styleSheet.editStyleSheet)
  styleSheet=styleSheet.editStyleSheet.sheet;if(styleSheet.restricted)
  {FirebugReps.Warning.tag.replace({object:"AccessRestricted"},this.panelNode);externalStyleSheetWarning.tag.append({object:"The stylesheet could not be loaded due to access restrictions. ",link:"more...",href:"http://getfirebug.com/wiki/index.php/Firebug_Lite_FAQ#I_keep_seeing_.22Access_to_restricted_URI_denied.22"},this.panelNode);return;}
  var rules=this.getStyleSheetRules(this.context,styleSheet);var result;if(rules.length)
  result=this.template.tag.replace({rules:rules},this.panelNode);else
  result=FirebugReps.Warning.tag.replace({object:"EmptyStyleSheet"},this.panelNode);},updateSelection:function(object)
  {this.selection=null;if(object instanceof CSSStyleDeclaration){object=object.parentRule;}
  if(object instanceof CSSStyleRule)
  {this.navigate(object.parentStyleSheet);this.highlightRule(object);}
  else if(object instanceof CSSStyleSheet)
  {this.navigate(object);}
  else if(object instanceof SourceLink)
  {try
  {var sourceLink=object;var sourceFile=getSourceFileByHref(sourceLink.href,this.context);if(sourceFile)
  {clearNode(this.panelNode);this.showSourceFile(sourceFile);var lineNo=object.line;if(lineNo)
  this.scrollToLine(lineNo,this.jumpHighlightFactory(lineNo,this.context));}
  else
  {var stylesheet=getStyleSheetByHref(sourceLink.href,this.context);if(stylesheet)
  this.navigate(stylesheet);else
  {if(FBTrace.DBG_CSS)
  FBTrace.sysout("css.updateSelection no sourceFile for "+sourceLink.href,sourceLink);}}}
  catch(exc){if(FBTrace.DBG_CSS)
  FBTrace.sysout("css.upDateSelection FAILS "+exc,exc);}}},updateOption:function(name,value)
  {if(name=="expandShorthandProps")
  this.refresh();},getLocationList:function()
  {var styleSheets=getAllStyleSheets(this.context);return styleSheets;},getOptionsMenuItems:function()
  {return[{label:"Expand Shorthand Properties",type:"checkbox",checked:Firebug.expandShorthandProps,command:bindFixed(Firebug.togglePref,Firebug,"expandShorthandProps")},"-",{label:"Refresh",command:bind(this.refresh,this)}];},getContextMenuItems:function(style,target)
  {var items=[];if(this.infoTipType=="color")
  {items.push({label:"CopyColor",command:bindFixed(copyToClipboard,FBL,this.infoTipObject)});}
  else if(this.infoTipType=="image")
  {items.push({label:"CopyImageLocation",command:bindFixed(copyToClipboard,FBL,this.infoTipObject)},{label:"OpenImageInNewTab",command:bindFixed(openNewTab,FBL,this.infoTipObject)});}
  if(isElement(this.selection))
  {items.push({label:"EditStyle",command:bindFixed(this.editElementStyle,this)});}
  else if(!isSystemStyleSheet(this.selection))
  {items.push({label:"NewRule",command:bindFixed(this.insertRule,this,target)});}
  var cssRule=getAncestorByClass(target,"cssRule");if(cssRule&&hasClass(cssRule,"cssEditableRule"))
  {items.push("-",{label:"NewProp",command:bindFixed(this.insertPropertyRow,this,target)});var propRow=getAncestorByClass(target,"cssProp");if(propRow)
  {var propName=getChildByClass(propRow,"cssPropName")[textContent];var isDisabled=hasClass(propRow,"disabledStyle");items.push({label:$STRF("EditProp",[propName]),nol10n:true,command:bindFixed(this.editPropertyRow,this,propRow)},{label:$STRF("DeleteProp",[propName]),nol10n:true,command:bindFixed(this.deletePropertyRow,this,propRow)},{label:$STRF("DisableProp",[propName]),nol10n:true,type:"checkbox",checked:isDisabled,command:bindFixed(this.disablePropertyRow,this,propRow)});}}
  items.push("-",{label:"Refresh",command:bind(this.refresh,this)});return items;},browseObject:function(object)
  {if(this.infoTipType=="image")
  {openNewTab(this.infoTipObject);return true;}},showInfoTip:function(infoTip,target,x,y)
  {var propValue=getAncestorByClass(target,"cssPropValue");if(propValue)
  {var offset=getClientOffset(propValue);var offsetX=x-offset.x;var text=propValue[textContent];var charWidth=propValue.offsetWidth/text.length;var charOffset=Math.floor(offsetX/charWidth);var cssValue=parseCSSValue(text,charOffset);if(cssValue)
  {if(cssValue.value==this.infoTipValue)
  return true;this.infoTipValue=cssValue.value;if(cssValue.type=="rgb"||(!cssValue.type&&isColorKeyword(cssValue.value)))
  {this.infoTipType="color";this.infoTipObject=cssValue.value;return Firebug.InfoTip.populateColorInfoTip(infoTip,cssValue.value);}
  else if(cssValue.type=="url")
  {var propNameNode=getElementByClass(target.parentNode,"cssPropName");if(propNameNode&&isImageRule(propNameNode[textContent]))
  {var rule=Firebug.getRepObject(target);var baseURL=this.getStylesheetURL(rule);var relURL=parseURLValue(cssValue.value);var absURL=isDataURL(relURL)?relURL:absoluteURL(relURL,baseURL);var repeat=parseRepeatValue(text);this.infoTipType="image";this.infoTipObject=absURL;return Firebug.InfoTip.populateImageInfoTip(infoTip,absURL,repeat);}}}}
  delete this.infoTipType;delete this.infoTipValue;delete this.infoTipObject;},getEditor:function(target,value)
  {if(target==this.panelNode||hasClass(target,"cssSelector")||hasClass(target,"cssRule")||hasClass(target,"cssSheet"))
  {if(!this.ruleEditor)
  this.ruleEditor=new CSSRuleEditor(this.document);return this.ruleEditor;}
  else
  {if(!this.editor)
  this.editor=new CSSEditor(this.document);return this.editor;}},getDefaultLocation:function()
  {try
  {var styleSheets=this.context.window.document.styleSheets;if(styleSheets.length)
  {var sheet=styleSheets[0];return(Firebug.filterSystemURLs&&isSystemURL(getURLForStyleSheet(sheet)))?null:sheet;}}
  catch(exc)
  {if(FBTrace.DBG_LOCATIONS)
  FBTrace.sysout("css.getDefaultLocation FAILS "+exc,exc);}},getObjectDescription:function(styleSheet)
  {var url=getURLForStyleSheet(styleSheet);var instance=getInstanceForStyleSheet(styleSheet);var baseDescription=splitURLBase(url);if(instance){baseDescription.name=baseDescription.name+" #"+(instance+1);}
  return baseDescription;},search:function(text,reverse)
  {var curDoc=this.searchCurrentDoc(!Firebug.searchGlobal,text,reverse);if(!curDoc&&Firebug.searchGlobal)
  {return this.searchOtherDocs(text,reverse);}
  return curDoc;},searchOtherDocs:function(text,reverse)
  {var scanRE=Firebug.Search.getTestingRegex(text);function scanDoc(styleSheet){for(var i=0;i<styleSheet.cssRules.length;i++)
  {if(scanRE.test(styleSheet.cssRules[i].cssText))
  {return true;}}}
  if(this.navigateToNextDocument(scanDoc,reverse))
  {return this.searchCurrentDoc(true,text,reverse);}},searchCurrentDoc:function(wrapSearch,text,reverse)
  {if(!text)
  {delete this.currentSearch;return false;}
  var row;if(this.currentSearch&&text==this.currentSearch.text)
  {row=this.currentSearch.findNext(wrapSearch,false,reverse,Firebug.Search.isCaseSensitive(text));}
  else
  {if(this.editing)
  {this.currentSearch=new TextSearch(this.stylesheetEditor.box);row=this.currentSearch.find(text,reverse,Firebug.Search.isCaseSensitive(text));if(row)
  {var sel=this.document.defaultView.getSelection();sel.removeAllRanges();sel.addRange(this.currentSearch.range);scrollSelectionIntoView(this);return true;}
  else
  return false;}
  else
  {function findRow(node){return node.nodeType==1?node:node.parentNode;}
  this.currentSearch=new TextSearch(this.panelNode,findRow);row=this.currentSearch.find(text,reverse,Firebug.Search.isCaseSensitive(text));}}
  if(row)
  {this.document.defaultView.getSelection().selectAllChildren(row);scrollIntoCenterView(row,this.panelNode);dispatch([Firebug.A11yModel],'onCSSSearchMatchFound',[this,text,row]);return true;}
  else
  {dispatch([Firebug.A11yModel],'onCSSSearchMatchFound',[this,text,null]);return false;}},getSearchOptionsMenuItems:function()
  {return[Firebug.Search.searchOptionMenu("search.Case_Sensitive","searchCaseSensitive"),Firebug.Search.searchOptionMenu("search.Multiple_Files","searchGlobal")];}});function CSSElementPanel(){}
  CSSElementPanel.prototype=extend(Firebug.CSSStyleSheetPanel.prototype,{template:domplate({cascadedTag:DIV({"class":"a11yCSSView",role:'presentation'},DIV({role:'list','aria-label':$STR('aria.labels.style rules')},FOR("rule","$rules",TAG("$ruleTag",{rule:"$rule"}))),DIV({role:"list",'aria-label':$STR('aria.labels.inherited style rules')},FOR("section","$inherited",H1({"class":"cssInheritHeader groupHeader focusRow",role:'listitem'},SPAN({"class":"cssInheritLabel"},"$inheritLabel"),TAG(FirebugReps.Element.shortTag,{object:"$section.element"})),DIV({role:'group'},FOR("rule","$section.rules",TAG("$ruleTag",{rule:"$rule"})))))),ruleTag:isIE?DIV({"class":"cssElementRuleContainer"},TAG(FirebugReps.SourceLink.tag,{object:"$rule.sourceLink"}),TAG(CSSStyleRuleTag.tag,{rule:"$rule"})):DIV({"class":"cssElementRuleContainer"},TAG(CSSStyleRuleTag.tag,{rule:"$rule"}),TAG(FirebugReps.SourceLink.tag,{object:"$rule.sourceLink"}))}),updateCascadeView:function(element)
  {var rules=[],sections=[],usedProps={};this.getInheritedRules(element,sections,usedProps);this.getElementRules(element,rules,usedProps);if(rules.length||sections.length)
  {var inheritLabel="Inherited from";var result=this.template.cascadedTag.replace({rules:rules,inherited:sections,inheritLabel:inheritLabel},this.panelNode);}
  else
  {var result=FirebugReps.Warning.tag.replace({object:"EmptyElementCSS"},this.panelNode);}
  if(externalStyleSheetURLs.length>0)
  externalStyleSheetWarning.tag.append({object:"The results here may be inaccurate because some "+
  "stylesheets could not be loaded due to access restrictions. ",link:"more...",href:"http://getfirebug.com/wiki/index.php/Firebug_Lite_FAQ#I_keep_seeing_.22This_element_has_no_style_rules.22"},this.panelNode);},getStylesheetURL:function(rule)
  {if(rule&&rule.parentStyleSheet&&rule.parentStyleSheet.href)
  return rule.parentStyleSheet.href;else
  return this.selection.ownerDocument.location.href;},getInheritedRules:function(element,sections,usedProps)
  {var parent=element.parentNode;if(parent&&parent.nodeType==1)
  {this.getInheritedRules(parent,sections,usedProps);var rules=[];this.getElementRules(parent,rules,usedProps,true);if(rules.length)
  sections.splice(0,0,{element:parent,rules:rules});}},getElementRules:function(element,rules,usedProps,inheritMode)
  {var inspectedRules,displayedRules={};inspectedRules=getElementCSSRules(element);if(inspectedRules)
  {for(var i=0,length=inspectedRules.length;i<length;++i)
  {var ruleId=inspectedRules[i];var ruleData=CSSRuleMap[ruleId];var rule=ruleData.rule;var ssid=ruleData.styleSheetId;var parentStyleSheet=StyleSheetCache.get(ssid);var href=parentStyleSheet.externalURL?parentStyleSheet.externalURL:parentStyleSheet.href;var instance=null;var isSystemSheet=false;if(!Firebug.showUserAgentCSS&&isSystemSheet)
  continue;if(!href)
  href=element.ownerDocument.location.href;var props=this.getRuleProperties(this.context,rule,inheritMode);if(inheritMode&&!props.length)
  continue;var line;var ruleId=rule.selectorText+"/"+line;var sourceLink=new SourceLink(href,line,"css",rule,instance);this.markOverridenProps(props,usedProps,inheritMode);rules.splice(0,0,{rule:rule,id:ruleId,selector:ruleData.selector,sourceLink:sourceLink,props:props,inherited:inheritMode,isSystemSheet:isSystemSheet});}}
  if(element.style)
  this.getStyleProperties(element,rules,usedProps,inheritMode);if(FBTrace.DBG_CSS)
  FBTrace.sysout("getElementRules "+rules.length+" rules for "+getElementXPath(element),rules);},markOverridenProps:function(props,usedProps,inheritMode)
  {for(var i=0;i<props.length;++i)
  {var prop=props[i];if(usedProps.hasOwnProperty(prop.name))
  {var deadProps=usedProps[prop.name];for(var j=0;j<deadProps.length;++j)
  {var deadProp=deadProps[j];if(!deadProp.disabled&&!deadProp.wasInherited&&deadProp.important&&!prop.important)
  prop.overridden=true;else if(!prop.disabled)
  deadProp.overridden=true;}}
  else
  usedProps[prop.name]=[];prop.wasInherited=inheritMode?true:false;usedProps[prop.name].push(prop);}},getStyleProperties:function(element,rules,usedProps,inheritMode)
  {var props=this.parseCSSProps(element.style,inheritMode);this.addOldProperties(this.context,getElementXPath(element),inheritMode,props);sortProperties(props);this.markOverridenProps(props,usedProps,inheritMode);if(props.length)
  rules.splice(0,0,{rule:element,id:getElementXPath(element),selector:"element.style",props:props,inherited:inheritMode});},name:"css",title:"Style",parentPanel:"HTML",order:0,initialize:function()
  {this.context=Firebug.chrome;this.document=Firebug.chrome.document;Firebug.CSSStyleSheetPanel.prototype.initialize.apply(this,arguments);var selection=ElementCache.get(FirebugChrome.selectedHTMLElementId);if(selection)
  this.select(selection,true);},ishow:function(state)
  {},watchWindow:function(win)
  {if(domUtils)
  {var doc=win.document;}},unwatchWindow:function(win)
  {var doc=win.document;if(isAncestor(this.stateChangeEl,doc))
  {this.removeStateChangeHandlers();}},supportsObject:function(object)
  {return object instanceof Element?1:0;},updateView:function(element)
  {this.updateCascadeView(element);if(domUtils)
  {this.contentState=safeGetContentState(element);this.addStateChangeHandlers(element);}},updateSelection:function(element)
  {if(!instanceOf(element,"Element"))
  return;if(sothinkInstalled)
  {FirebugReps.Warning.tag.replace({object:"SothinkWarning"},this.panelNode);return;}
  if(!element)
  return;this.updateView(element);},updateOption:function(name,value)
  {if(name=="showUserAgentCSS"||name=="expandShorthandProps")
  this.refresh();},getOptionsMenuItems:function()
  {var ret=[{label:"Show User Agent CSS",type:"checkbox",checked:Firebug.showUserAgentCSS,command:bindFixed(Firebug.togglePref,Firebug,"showUserAgentCSS")},{label:"Expand Shorthand Properties",type:"checkbox",checked:Firebug.expandShorthandProps,command:bindFixed(Firebug.togglePref,Firebug,"expandShorthandProps")}];if(domUtils&&this.selection)
  {var state=safeGetContentState(this.selection);ret.push("-");ret.push({label:":active",type:"checkbox",checked:state&STATE_ACTIVE,command:bindFixed(this.updateContentState,this,STATE_ACTIVE,state&STATE_ACTIVE)});ret.push({label:":hover",type:"checkbox",checked:state&STATE_HOVER,command:bindFixed(this.updateContentState,this,STATE_HOVER,state&STATE_HOVER)});}
  return ret;},updateContentState:function(state,remove)
  {domUtils.setContentState(remove?this.selection.ownerDocument.documentElement:this.selection,state);this.refresh();},addStateChangeHandlers:function(el)
  {this.removeStateChangeHandlers();this.stateChangeEl=el;},removeStateChangeHandlers:function()
  {var sel=this.stateChangeEl;if(sel)
  {}},contentStateCheck:function(state)
  {if(!state||this.contentState&state)
  {var timeoutRunner=bindFixed(function()
  {var newState=safeGetContentState(this.selection);if(newState!=this.contentState)
  {this.context.invalidatePanels(this.name);}},this);setTimeout(timeoutRunner,0);}}});function safeGetContentState(selection)
  {try
  {return domUtils.getContentState(selection);}
  catch(e)
  {if(FBTrace.DBG_ERRORS)
  FBTrace.sysout("css.safeGetContentState; EXCEPTION",e);}}
  function CSSComputedElementPanel(){}
  CSSComputedElementPanel.prototype=extend(CSSElementPanel.prototype,{template:domplate({computedTag:DIV({"class":"a11yCSSView",role:"list","aria-label":$STR('aria.labels.computed styles')},FOR("group","$groups",H1({"class":"cssInheritHeader groupHeader focusRow",role:"listitem"},SPAN({"class":"cssInheritLabel"},"$group.title")),TABLE({width:"100%",role:'group'},TBODY({role:'presentation'},FOR("prop","$group.props",TR({"class":'focusRow computedStyleRow',role:'listitem'},TD({"class":"stylePropName",role:'presentation'},"$prop.name"),TD({"class":"stylePropValue",role:'presentation'},"$prop.value")))))))}),updateComputedView:function(element)
  {var win=isIE?element.ownerDocument.parentWindow:element.ownerDocument.defaultView;var style=isIE?element.currentStyle:win.getComputedStyle(element,"");var groups=[];for(var groupName in styleGroups)
  {var title=styleGroupTitles[groupName];var group={title:title,props:[]};groups.push(group);var props=styleGroups[groupName];for(var i=0;i<props.length;++i)
  {var propName=props[i];var propValue=style.getPropertyValue?style.getPropertyValue(propName):""+style[toCamelCase(propName)];if(propValue===undefined||propValue===null)
  continue;propValue=stripUnits(rgbToHex(propValue));if(propValue)
  group.props.push({name:propName,value:propValue});}}
  var result=this.template.computedTag.replace({groups:groups},this.panelNode);},name:"computed",title:"Computed",parentPanel:"HTML",order:1,updateView:function(element)
  {this.updateComputedView(element);},getOptionsMenuItems:function()
  {return[{label:"Refresh",command:bind(this.refresh,this)}];}});function CSSEditor(doc)
  {this.initializeInline(doc);}
  CSSEditor.prototype=domplate(Firebug.InlineEditor.prototype,{insertNewRow:function(target,insertWhere)
  {var rule=Firebug.getRepObject(target);var emptyProp={name:"",value:"",important:""};if(insertWhere=="before")
  return CSSPropTag.tag.insertBefore({prop:emptyProp,rule:rule},target);else
  return CSSPropTag.tag.insertAfter({prop:emptyProp,rule:rule},target);},saveEdit:function(target,value,previousValue)
  {if(!value)return;target.innerHTML=escapeForCss(value);var row=getAncestorByClass(target,"cssProp");if(hasClass(row,"disabledStyle"))
  toggleClass(row,"disabledStyle");var rule=Firebug.getRepObject(target);if(hasClass(target,"cssPropName"))
  {if(value&&previousValue!=value)
  {var propValue=getChildByClass(row,"cssPropValue")[textContent];var parsedValue=parsePriority(propValue);if(propValue&&propValue!="undefined"){if(FBTrace.DBG_CSS)
  FBTrace.sysout("CSSEditor.saveEdit : "+previousValue+"->"+value+" = "+propValue+"\n");if(previousValue)
  Firebug.CSSModule.removeProperty(rule,previousValue);Firebug.CSSModule.setProperty(rule,value,parsedValue.value,parsedValue.priority);}}
  else if(!value)
  Firebug.CSSModule.removeProperty(rule,previousValue);}
  else if(getAncestorByClass(target,"cssPropValue"))
  {var propName=getChildByClass(row,"cssPropName")[textContent];var propValue=getChildByClass(row,"cssPropValue")[textContent];if(FBTrace.DBG_CSS)
  {FBTrace.sysout("CSSEditor.saveEdit propName=propValue: "+propName+" = "+propValue+"\n");}
  if(value&&value!="null")
  {var parsedValue=parsePriority(value);Firebug.CSSModule.setProperty(rule,propName,parsedValue.value,parsedValue.priority);}
  else if(previousValue&&previousValue!="null")
  Firebug.CSSModule.removeProperty(rule,propName);}
  this.panel.markChange(this.panel.name=="stylesheet");},advanceToNext:function(target,charCode)
  {if(charCode==58&&hasClass(target,"cssPropName"))
  return true;},getAutoCompleteRange:function(value,offset)
  {if(hasClass(this.target,"cssPropName"))
  return{start:0,end:value.length-1};else
  return parseCSSValue(value,offset);},getAutoCompleteList:function(preExpr,expr,postExpr)
  {if(hasClass(this.target,"cssPropName"))
  {return getCSSPropertyNames();}
  else
  {var row=getAncestorByClass(this.target,"cssProp");var propName=getChildByClass(row,"cssPropName")[textContent];return getCSSKeywordsByProperty(propName);}}});function CSSRuleEditor(doc)
  {this.initializeInline(doc);this.completeAsYouType=false;}
  CSSRuleEditor.uniquifier=0;CSSRuleEditor.prototype=domplate(Firebug.InlineEditor.prototype,{insertNewRow:function(target,insertWhere)
  {var emptyRule={selector:"",id:"",props:[],isSelectorEditable:true};if(insertWhere=="before")
  return CSSStyleRuleTag.tag.insertBefore({rule:emptyRule},target);else
  return CSSStyleRuleTag.tag.insertAfter({rule:emptyRule},target);},saveEdit:function(target,value,previousValue)
  {if(FBTrace.DBG_CSS)
  FBTrace.sysout("CSSRuleEditor.saveEdit: '"+value+"'  '"+previousValue+"'",target);target.innerHTML=escapeForCss(value);if(value===previousValue)return;var row=getAncestorByClass(target,"cssRule");var styleSheet=this.panel.location;styleSheet=styleSheet.editStyleSheet?styleSheet.editStyleSheet.sheet:styleSheet;var cssRules=styleSheet.cssRules;var rule=Firebug.getRepObject(target),oldRule=rule;var ruleIndex=cssRules.length;if(rule||Firebug.getRepObject(row.nextSibling))
  {var searchRule=rule||Firebug.getRepObject(row.nextSibling);for(ruleIndex=0;ruleIndex<cssRules.length&&searchRule!=cssRules[ruleIndex];ruleIndex++){}}
  if(oldRule)
  {Firebug.CSSModule.deleteRule(styleSheet,ruleIndex);}
  if(value)
  {var cssText=[value,"{"];var props=row.getElementsByClassName("cssProp");for(var i=0;i<props.length;i++){var propEl=props[i];if(!hasClass(propEl,"disabledStyle")){cssText.push(getChildByClass(propEl,"cssPropName")[textContent]);cssText.push(":");cssText.push(getChildByClass(propEl,"cssPropValue")[textContent]);cssText.push(";");}}
  cssText.push("}");cssText=cssText.join("");try
  {var insertLoc=Firebug.CSSModule.insertRule(styleSheet,cssText,ruleIndex);rule=cssRules[insertLoc];ruleIndex++;}
  catch(err)
  {if(FBTrace.DBG_CSS||FBTrace.DBG_ERRORS)
  FBTrace.sysout("CSS Insert Error: "+err,err);target.innerHTML=escapeForCss(previousValue);row.repObject=undefined;return;}}else{rule=undefined;}
  row.repObject=rule;if(!oldRule)
  {var ruleId="new/"+value+"/"+(++CSSRuleEditor.uniquifier);row.setAttribute("ruleId",ruleId);}
  this.panel.markChange(this.panel.name=="stylesheet");}});function StyleSheetEditor(doc)
  {this.box=this.tag.replace({},doc,this);this.input=this.box.firstChild;}
  StyleSheetEditor.prototype=domplate(Firebug.BaseEditor,{multiLine:true,tag:DIV(TEXTAREA({"class":"styleSheetEditor fullPanelEditor",oninput:"$onInput"})),getValue:function()
  {return this.input.value;},setValue:function(value)
  {return this.input.value=value;},show:function(target,panel,value,textSize,targetSize)
  {this.target=target;this.panel=panel;this.panel.panelNode.appendChild(this.box);this.input.value=value;this.input.focus();var command=Firebug.chrome.$("cmd_toggleCSSEditing");command.setAttribute("checked",true);},hide:function()
  {var command=Firebug.chrome.$("cmd_toggleCSSEditing");command.setAttribute("checked",false);if(this.box.parentNode==this.panel.panelNode)
  this.panel.panelNode.removeChild(this.box);delete this.target;delete this.panel;delete this.styleSheet;},saveEdit:function(target,value,previousValue)
  {Firebug.CSSModule.freeEdit(this.styleSheet,value);},endEditing:function()
  {this.panel.refresh();return true;},onInput:function()
  {Firebug.Editor.update();},scrollToLine:function(line,offset)
  {this.startMeasuring(this.input);var lineHeight=this.measureText().height;this.stopMeasuring();this.input.scrollTop=(line*lineHeight)+offset;}});var rgbToHex=function rgbToHex(value)
  {return value.replace(/\brgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/gi,rgbToHexReplacer);};var rgbToHexReplacer=function(_,r,g,b){return '#'+((1<<24)+(r<<16)+(g<<8)+(b<<0)).toString(16).substr(-6).toUpperCase();};var stripUnits=function stripUnits(value)
  {return value.replace(/(url\(.*?\)|[^0]\S*\s*)|0(%|em|ex|px|in|cm|mm|pt|pc)(\s|$)/gi,stripUnitsReplacer);};var stripUnitsReplacer=function(_,skip,remove,whitespace){return skip||('0'+whitespace);};function parsePriority(value)
  {var rePriority=/(.*?)\s*(!important)?$/;var m=rePriority.exec(value);var propValue=m?m[1]:"";var priority=m&&m[2]?"important":"";return{value:propValue,priority:priority};}
  function parseURLValue(value)
  {var m=reURL.exec(value);return m?m[1]:"";}
  function parseRepeatValue(value)
  {var m=reRepeat.exec(value);return m?m[0]:"";}
  function parseCSSValue(value,offset)
  {var start=0;var m;while(1)
  {m=reSplitCSS.exec(value);if(m&&m.index+m[0].length<offset)
  {value=value.substr(m.index+m[0].length);start+=m.index+m[0].length;offset-=m.index+m[0].length;}
  else
  break;}
  if(m)
  {var type;if(m[1])
  type="url";else if(m[2]||m[3])
  type="rgb";else if(m[4])
  type="int";return{value:m[0],start:start+m.index,end:start+m.index+(m[0].length-1),type:type};}}
  function findPropByName(props,name)
  {for(var i=0;i<props.length;++i)
  {if(props[i].name==name)
  return i;}}
  function sortProperties(props)
  {props.sort(function(a,b)
  {return a.name>b.name?1:-1;});}
  function getTopmostRuleLine(panelNode)
  {for(var child=panelNode.firstChild;child;child=child.nextSibling)
  {if(child.offsetTop+child.offsetHeight>panelNode.scrollTop)
  {var rule=child.repObject;if(rule)
  return{line:domUtils.getRuleLine(rule),offset:panelNode.scrollTop-child.offsetTop};}}
  return 0;}
  function getStyleSheetCSS(sheet,context)
  {if(sheet.ownerNode instanceof HTMLStyleElement)
  return sheet.ownerNode.innerHTML;else
  return context.sourceCache.load(sheet.href).join("");}
  function getStyleSheetOwnerNode(sheet){for(;sheet&&!sheet.ownerNode;sheet=sheet.parentStyleSheet);return sheet.ownerNode;}
  function scrollSelectionIntoView(panel)
  {var selCon=getSelectionController(panel);selCon.scrollSelectionIntoView(nsISelectionController.SELECTION_NORMAL,nsISelectionController.SELECTION_FOCUS_REGION,true);}
  function getSelectionController(panel)
  {var browser=Firebug.chrome.getPanelBrowser(panel);return browser.docShell.QueryInterface(nsIInterfaceRequestor).getInterface(nsISelectionDisplay).QueryInterface(nsISelectionController);}
  Firebug.registerModule(Firebug.CSSModule);Firebug.registerPanel(Firebug.CSSStyleSheetPanel);Firebug.registerPanel(CSSElementPanel);Firebug.registerPanel(CSSComputedElementPanel);}});FBL.ns(function(){with(FBL){Firebug.Script=extend(Firebug.Module,{getPanel:function()
  {return Firebug.chrome?Firebug.chrome.getPanel("Script"):null;},selectSourceCode:function(index)
  {this.getPanel().selectSourceCode(index);}});Firebug.registerModule(Firebug.Script);function ScriptPanel(){};ScriptPanel.prototype=extend(Firebug.Panel,{name:"Script",title:"Script",selectIndex:0,sourceIndex:-1,options:{hasToolButtons:true},create:function()
  {Firebug.Panel.create.apply(this,arguments);this.onChangeSelect=bind(this.onChangeSelect,this);var doc=Firebug.browser.document;var scripts=doc.getElementsByTagName("script");var selectNode=this.selectNode=createElement("select");for(var i=0,script;script=scripts[i];i++)
  {if(Firebug.ignoreFirebugElements&&script.getAttribute("firebugIgnore"))
  continue;var fileName=getFileName(script.src)||getFileName(doc.location.href);var option=createElement("option",{value:i});option.appendChild(Firebug.chrome.document.createTextNode(fileName));selectNode.appendChild(option);};this.toolButtonsNode.appendChild(selectNode);},initialize:function()
  {this.selectSourceCode(this.selectIndex);Firebug.Panel.initialize.apply(this,arguments);addEvent(this.selectNode,"change",this.onChangeSelect);},shutdown:function()
  {removeEvent(this.selectNode,"change",this.onChangeSelect);Firebug.Panel.shutdown.apply(this,arguments);},detach:function(oldChrome,newChrome)
  {Firebug.Panel.detach.apply(this,arguments);var oldPanel=oldChrome.getPanel("Script");var index=oldPanel.selectIndex;this.selectNode.selectedIndex=index;this.selectIndex=index;this.sourceIndex=-1;},onChangeSelect:function(event)
  {var select=this.selectNode;this.selectIndex=select.selectedIndex;var option=select.options[select.selectedIndex];if(!option)
  return;var selectedSourceIndex=parseInt(option.value);this.renderSourceCode(selectedSourceIndex);},selectSourceCode:function(index)
  {var select=this.selectNode;select.selectedIndex=index;var option=select.options[index];if(!option)
  return;var selectedSourceIndex=parseInt(option.value);this.renderSourceCode(selectedSourceIndex);},renderSourceCode:function(index)
  {if(this.sourceIndex!=index)
  {var renderProcess=function renderProcess(src)
  {var html=[],hl=0;src=isIE&&!isExternal?src+'\n':'\n'+src;src=src.replace(/\n\r|\r\n/g,"\n");var match=src.match(/[\n]/g);var lines=match?match.length:0;html[hl++]='<div><div class="sourceBox" style="left:';html[hl++]=35+7*(lines+'').length;html[hl++]='px;"><pre class="sourceCode">';html[hl++]=escapeHTML(src);html[hl++]='<\/pre><\/div><div class="lineNo">';for(var l=1,lines;l<=lines;l++)
  {html[hl++]='<div line="';html[hl++]=l;html[hl++]='">';html[hl++]=l;html[hl++]='<\/div>';}
  html[hl++]='<\/div><\/div>';updatePanel(html);};var updatePanel=function(html)
  {self.panelNode.innerHTML=html.join("");setTimeout(function(){self.synchronizeUI();},0);};var onFailure=function()
  {FirebugReps.Warning.tag.replace({object:"AccessRestricted"},self.panelNode);};var self=this;var doc=Firebug.browser.document;var script=doc.getElementsByTagName("script")[index];var url=getScriptURL(script);var isExternal=url&&url!=doc.location.href;try
  {if(isExternal)
  {Ajax.request({url:url,onSuccess:renderProcess,onFailure:onFailure});}
  else
  {var src=script.innerHTML;renderProcess(src);}}
  catch(e)
  {onFailure();}
  this.sourceIndex=index;}}});Firebug.registerPanel(ScriptPanel);var getScriptURL=function getScriptURL(script)
  {var reFile=/([^\/\?#]+)(#.+)?$/;var rePath=/^(.*\/)/;var reProtocol=/^\w+:\/\//;var path=null;var doc=Firebug.browser.document;var file=reFile.exec(script.src);if(file)
  {var fileName=file[1];var fileOptions=file[2];if(reProtocol.test(script.src)){path=rePath.exec(script.src)[1];}
  else
  {var r=rePath.exec(script.src);var src=r?r[1]:script.src;var backDir=/^((?:\.\.\/)+)(.*)/.exec(src);var reLastDir=/^(.*\/)[^\/]+\/$/;path=rePath.exec(doc.location.href)[1];if(backDir)
  {var j=backDir[1].length/3;var p;while(j-->0)
  path=reLastDir.exec(path)[1];path+=backDir[2];}
  else if(src.indexOf("/")!=-1)
  {if(/^\.\/./.test(src))
  {path+=src.substring(2);}
  else if(/^\/./.test(src))
  {var domain=/^(\w+:\/\/[^\/]+)/.exec(path);path=domain[1]+src;}
  else
  {path+=src;}}}}
  var m=path&&path.match(/([^\/]+)\/$/)||null;if(path&&m)
  {return path+fileName;}};var getFileName=function getFileName(path)
  {if(!path)return "";var match=path&&path.match(/[^\/]+(\?.*)?(#.*)?$/);return match&&match[0]||path;};}});FBL.ns(function(){with(FBL){var ElementCache=Firebug.Lite.Cache.Element;var insertSliceSize=18;var insertInterval=40;var ignoreVars={"__firebug__":1,"eval":1,"java":1,"sun":1,"Packages":1,"JavaArray":1,"JavaMember":1,"JavaObject":1,"JavaClass":1,"JavaPackage":1,"_firebug":1,"_FirebugConsole":1,"_FirebugCommandLine":1};if(Firebug.ignoreFirebugElements)
  ignoreVars[Firebug.Lite.Cache.ID]=1;var memberPanelRep=isIE6?{"class":"memberLabel $member.type\\Label",href:"javacript:void(0)"}:{"class":"memberLabel $member.type\\Label"};var RowTag=TR({"class":"memberRow $member.open $member.type\\Row",$hasChildren:"$member.hasChildren",role:'presentation',level:"$member.level"},TD({"class":"memberLabelCell",style:"padding-left: $member.indent\\px",role:'presentation'},A(memberPanelRep,SPAN({},"$member.name"))),TD({"class":"memberValueCell",role:'presentation'},TAG("$member.tag",{object:"$member.value"})));var WatchRowTag=TR({"class":"watchNewRow",level:0},TD({"class":"watchEditCell",colspan:2},DIV({"class":"watchEditBox a11yFocusNoTab",role:"button",'tabindex':'0','aria-label':$STR('press enter to add new watch expression')},$STR("NewWatch"))));var SizerRow=TR({role:'presentation'},TD({width:"30%"}),TD({width:"70%"}));var domTableClass=isIElt8?"domTable domTableIE":"domTable";var DirTablePlate=domplate(Firebug.Rep,{tag:TABLE({"class":domTableClass,cellpadding:0,cellspacing:0,onclick:"$onClick",role:"tree"},TBODY({role:'presentation'},SizerRow,FOR("member","$object|memberIterator",RowTag))),watchTag:TABLE({"class":domTableClass,cellpadding:0,cellspacing:0,_toggles:"$toggles",_domPanel:"$domPanel",onclick:"$onClick",role:'tree'},TBODY({role:'presentation'},SizerRow,WatchRowTag)),tableTag:TABLE({"class":domTableClass,cellpadding:0,cellspacing:0,_toggles:"$toggles",_domPanel:"$domPanel",onclick:"$onClick",role:'tree'},TBODY({role:'presentation'},SizerRow)),rowTag:FOR("member","$members",RowTag),memberIterator:function(object,level)
  {return getMembers(object,level);},onClick:function(event)
  {if(!isLeftClick(event))
  return;var target=event.target||event.srcElement;var row=getAncestorByClass(target,"memberRow");var label=getAncestorByClass(target,"memberLabel");if(label&&hasClass(row,"hasChildren"))
  {var row=label.parentNode.parentNode;this.toggleRow(row);}
  else
  {var object=Firebug.getRepObject(target);if(typeof(object)=="function")
  {try{Firebug.chrome.select(object,"script");}catch(e){}
  cancelEvent(event);}
  else if(event.detail==2&&!object)
  {var panel=row.parentNode.parentNode.domPanel;if(panel)
  {var rowValue=panel.getRowPropertyValue(row);if(typeof(rowValue)=="boolean")
  panel.setPropertyValue(row,!rowValue);else
  panel.editProperty(row);cancelEvent(event);}}}
  return false;},toggleRow:function(row)
  {var level=parseInt(row.getAttribute("level"));var toggles=row.parentNode.parentNode.toggles;if(hasClass(row,"opened"))
  {removeClass(row,"opened");if(toggles)
  {var path=getPath(row);for(var i=0;i<path.length;++i)
  {if(i==path.length-1)
  delete toggles[path[i]];else
  toggles=toggles[path[i]];}}
  var rowTag=this.rowTag;var tbody=row.parentNode;setTimeout(function()
  {for(var firstRow=row.nextSibling;firstRow;firstRow=row.nextSibling)
  {if(parseInt(firstRow.getAttribute("level"))<=level)
  break;tbody.removeChild(firstRow);}},row.insertTimeout?row.insertTimeout:0);}
  else
  {setClass(row,"opened");if(toggles)
  {var path=getPath(row);for(var i=0;i<path.length;++i)
  {var name=path[i];if(toggles.hasOwnProperty(name))
  toggles=toggles[name];else
  toggles=toggles[name]={};}}
  var value=row.lastChild.firstChild.repObject;var members=getMembers(value,level+1);var rowTag=this.rowTag;var lastRow=row;var delay=0;while(members.length)
  {with({slice:members.splice(0,insertSliceSize),isLast:!members.length})
  {setTimeout(function()
  {if(lastRow.parentNode)
  {var result=rowTag.insertRows({members:slice},lastRow);lastRow=result[1];}
  if(isLast)
  row.removeAttribute("insertTimeout");},delay);}
  delay+=insertInterval;}
  row.insertTimeout=delay;}}});Firebug.DOMBasePanel=function(){}
  Firebug.DOMBasePanel.prototype=extend(Firebug.Panel,{tag:DirTablePlate.tableTag,getRealObject:function(object)
  {if(!object)return object;if(object.wrappedJSObject)return object.wrappedJSObject;return object;},rebuild:function(update,scrollTop)
  {var members=getMembers(this.selection);expandMembers(members,this.toggles,0,0);this.showMembers(members,update,scrollTop);if(!this.parentPanel)
  updateStatusBar(this);},showMembers:function(members,update,scrollTop)
  {if(this.timeouts)
  {for(var i=0;i<this.timeouts.length;++i)
  this.context.clearTimeout(this.timeouts[i]);delete this.timeouts;}
  if(!members.length)
  return this.showEmptyMembers();var panelNode=this.panelNode;var priorScrollTop=scrollTop==undefined?panelNode.scrollTop:scrollTop;var offscreen=update&&panelNode.firstChild;var dest=offscreen?panelNode.ownerDocument:panelNode;var table=this.tag.replace({domPanel:this,toggles:this.toggles},dest);var tbody=table.lastChild;var rowTag=DirTablePlate.rowTag;var panel=this;var result;var timeouts=[];var delay=0;var renderStart=new Date().getTime();while(members.length)
  {with({slice:members.splice(0,insertSliceSize),isLast:!members.length})
  {timeouts.push(this.context.setTimeout(function()
  {if(!tbody.lastChild)return;result=rowTag.insertRows({members:slice},tbody.lastChild);if((panelNode.scrollHeight+panelNode.offsetHeight)>=priorScrollTop)
  panelNode.scrollTop=priorScrollTop;},delay));delay+=insertInterval;}}
  if(offscreen)
  {timeouts.push(this.context.setTimeout(function()
  {if(panelNode.firstChild)
  panelNode.replaceChild(table,panelNode.firstChild);else
  panelNode.appendChild(table);panelNode.scrollTop=priorScrollTop;},delay));}
  else
  {timeouts.push(this.context.setTimeout(function()
  {panelNode.scrollTop=scrollTop==undefined?0:scrollTop;},delay));}
  this.timeouts=timeouts;},showEmptyMembers:function()
  {FirebugReps.Warning.tag.replace({object:"NoMembersWarning"},this.panelNode);},findPathObject:function(object)
  {var pathIndex=-1;for(var i=0;i<this.objectPath.length;++i)
  {if(this.getPathObject(i)===object)
  return i;}
  return-1;},getPathObject:function(index)
  {var object=this.objectPath[index];if(object instanceof Property)
  return object.getObject();else
  return object;},getRowObject:function(row)
  {var object=getRowOwnerObject(row);return object?object:this.selection;},getRowPropertyValue:function(row)
  {var object=this.getRowObject(row);object=this.getRealObject(object);if(object)
  {var propName=getRowName(row);if(object instanceof jsdIStackFrame)
  return Firebug.Debugger.evaluate(propName,this.context);else
  return object[propName];}},onMouseMove:function(event)
  {var target=event.srcElement||event.target;var object=getAncestorByClass(target,"objectLink-element");object=object?object.repObject:null;if(object&&instanceOf(object,"Element")&&object.nodeType==1)
  {if(object!=lastHighlightedObject)
  {Firebug.Inspector.drawBoxModel(object);object=lastHighlightedObject;}}
  else
  Firebug.Inspector.hideBoxModel();},create:function()
  {this.context=Firebug.browser;this.objectPath=[];this.propertyPath=[];this.viewPath=[];this.pathIndex=-1;this.toggles={};Firebug.Panel.create.apply(this,arguments);this.panelNode.style.padding="0 1px";},initialize:function(){Firebug.Panel.initialize.apply(this,arguments);addEvent(this.panelNode,"mousemove",this.onMouseMove);},shutdown:function()
  {removeEvent(this.panelNode,"mousemove",this.onMouseMove);Firebug.Panel.shutdown.apply(this,arguments);},ishow:function(state)
  {if(this.context.loaded&&!this.selection)
  {if(!state)
  {this.select(null);return;}
  if(state.viewPath)
  this.viewPath=state.viewPath;if(state.propertyPath)
  this.propertyPath=state.propertyPath;var defaultObject=this.getDefaultSelection(this.context);var selectObject=defaultObject;if(state.firstSelection)
  {var restored=state.firstSelection(this.context);if(restored)
  {selectObject=restored;this.objectPath=[defaultObject,restored];}
  else
  this.objectPath=[defaultObject];}
  else
  this.objectPath=[defaultObject];if(this.propertyPath.length>1)
  {for(var i=1;i<this.propertyPath.length;++i)
  {var name=this.propertyPath[i];if(!name)
  continue;var object=selectObject;try
  {selectObject=object[name];}
  catch(exc)
  {selectObject=null;}
  if(selectObject)
  {this.objectPath.push(new Property(object,name));}
  else
  {this.viewPath.splice(i);this.propertyPath.splice(i);this.objectPath.splice(i);selectObject=this.getPathObject(this.objectPath.length-1);break;}}}
  var selection=state.pathIndex<=this.objectPath.length-1?this.getPathObject(state.pathIndex):this.getPathObject(this.objectPath.length-1);this.select(selection);}},supportsObject:function(object)
  {if(object==null)
  return 1000;if(typeof(object)=="undefined")
  return 1000;else if(object instanceof SourceLink)
  return 0;else
  return 1;},refresh:function()
  {this.rebuild(true);},updateSelection:function(object)
  {var previousIndex=this.pathIndex;var previousView=previousIndex==-1?null:this.viewPath[previousIndex];var newPath=this.pathToAppend;delete this.pathToAppend;var pathIndex=this.findPathObject(object);if(newPath||pathIndex==-1)
  {this.toggles={};if(newPath)
  {if(previousView)
  {if(this.panelNode.scrollTop)
  previousView.scrollTop=this.panelNode.scrollTop;var start=previousIndex+1,length=this.objectPath.length-start;this.objectPath.splice(start,length);this.propertyPath.splice(start,length);this.viewPath.splice(start,length);}
  var value=this.getPathObject(previousIndex);if(!value)
  {if(FBTrace.DBG_ERRORS)
  FBTrace.sysout("dom.updateSelection no pathObject for "+previousIndex+"\n");return;}
  for(var i=0,length=newPath.length;i<length;++i)
  {var name=newPath[i];var object=value;try
  {value=value[name];}
  catch(exc)
  {if(FBTrace.DBG_ERRORS)
  FBTrace.sysout("dom.updateSelection FAILS at path_i="+i+" for name:"+name+"\n");return;}
  ++this.pathIndex;this.objectPath.push(new Property(object,name));this.propertyPath.push(name);this.viewPath.push({toggles:this.toggles,scrollTop:0});}}
  else
  {this.toggles={};var win=Firebug.browser.window;if(object===win)
  {this.pathIndex=0;this.objectPath=[win];this.propertyPath=[null];this.viewPath=[{toggles:this.toggles,scrollTop:0}];}
  else
  {this.pathIndex=1;this.objectPath=[win,object];this.propertyPath=[null,null];this.viewPath=[{toggles:{},scrollTop:0},{toggles:this.toggles,scrollTop:0}];}}
  this.panelNode.scrollTop=0;this.rebuild();}
  else
  {this.pathIndex=pathIndex;var view=this.viewPath[pathIndex];this.toggles=view.toggles;if(previousView&&this.panelNode.scrollTop)
  previousView.scrollTop=this.panelNode.scrollTop;this.rebuild(false,view.scrollTop);}},getObjectPath:function(object)
  {return this.objectPath;},getDefaultSelection:function()
  {return Firebug.browser.window;}});var updateStatusBar=function(panel)
  {var path=panel.propertyPath;var index=panel.pathIndex;var r=[];for(var i=0,l=path.length;i<l;i++)
  {r.push(i==index?'<a class="fbHover fbButton fbBtnSelected" ':'<a class="fbHover fbButton" ');r.push('pathIndex=');r.push(i);if(isIE6)
  r.push(' href="javascript:void(0)"');r.push('>');r.push(i==0?"window":path[i]||"Object");r.push('<\/a>');if(i<l-1)
  r.push('<span class="fbStatusSeparator">><\/span>');}
  panel.statusBarNode.innerHTML=r.join("");};var DOMMainPanel=Firebug.DOMPanel=function(){};Firebug.DOMPanel.DirTable=DirTablePlate;DOMMainPanel.prototype=extend(Firebug.DOMBasePanel.prototype,{onClickStatusBar:function(event)
  {var target=event.srcElement||event.target;var element=getAncestorByClass(target,"fbHover");if(element)
  {var pathIndex=element.getAttribute("pathIndex");if(pathIndex)
  {this.select(this.getPathObject(pathIndex));}}},selectRow:function(row,target)
  {if(!target)
  target=row.lastChild.firstChild;if(!target||!target.repObject)
  return;this.pathToAppend=getPath(row);var valueBox=row.lastChild.firstChild;if(hasClass(valueBox,"objectBox-array"))
  {var arrayIndex=FirebugReps.Arr.getItemIndex(target);this.pathToAppend.push(arrayIndex);}
  this.select(target.repObject,true);},onClick:function(event)
  {var target=event.srcElement||event.target;var repNode=Firebug.getRepNode(target);if(repNode)
  {var row=getAncestorByClass(target,"memberRow");if(row)
  {this.selectRow(row,repNode);cancelEvent(event);}}},name:"DOM",title:"DOM",searchable:true,statusSeparator:">",options:{hasToolButtons:true,hasStatusBar:true},create:function()
  {Firebug.DOMBasePanel.prototype.create.apply(this,arguments);this.onClick=bind(this.onClick,this);this.onClickStatusBar=bind(this.onClickStatusBar,this);this.panelNode.style.padding="0 1px";},initialize:function(oldPanelNode)
  {Firebug.DOMBasePanel.prototype.initialize.apply(this,arguments);addEvent(this.panelNode,"click",this.onClick);this.ishow();addEvent(this.statusBarNode,"click",this.onClickStatusBar);},shutdown:function()
  {removeEvent(this.panelNode,"click",this.onClick);Firebug.DOMBasePanel.prototype.shutdown.apply(this,arguments);}});Firebug.registerPanel(DOMMainPanel);var getMembers=function getMembers(object,level)
  {if(!level)
  level=0;var ordinals=[],userProps=[],userClasses=[],userFuncs=[],domProps=[],domFuncs=[],domConstants=[];try
  {var domMembers=getDOMMembers(object);if(object.wrappedJSObject)
  var insecureObject=object.wrappedJSObject;else
  var insecureObject=object;if(isIE&&isFunction(object))
  addMember("user",userProps,"prototype",object.prototype,level);for(var name in insecureObject)
  {if(ignoreVars[name]==1)
  continue;var val;try
  {val=insecureObject[name];}
  catch(exc)
  {if(FBTrace.DBG_ERRORS&&FBTrace.DBG_DOM)
  FBTrace.sysout("dom.getMembers cannot access "+name,exc);}
  var ordinal=parseInt(name);if(ordinal||ordinal==0)
  {addMember("ordinal",ordinals,name,val,level);}
  else if(isFunction(val))
  {if(isClassFunction(val)&&!(name in domMembers))
  addMember("userClass",userClasses,name,val,level);else if(name in domMembers)
  addMember("domFunction",domFuncs,name,val,level,domMembers[name]);else
  addMember("userFunction",userFuncs,name,val,level);}
  else
  {var prefix="";if(name in domMembers&&!(name in domConstantMap))
  addMember("dom",domProps,(prefix+name),val,level,domMembers[name]);else if(name in domConstantMap)
  addMember("dom",domConstants,(prefix+name),val,level);else
  addMember("user",userProps,(prefix+name),val,level);}}}
  catch(exc)
  {throw exc;if(FBTrace.DBG_ERRORS&&FBTrace.DBG_DOM)
  FBTrace.sysout("dom.getMembers FAILS: ",exc);}
  function sortName(a,b){return a.name>b.name?1:-1;}
  function sortOrder(a,b){return a.order>b.order?1:-1;}
  var members=[];members.push.apply(members,ordinals);Firebug.showUserProps=true;Firebug.showUserFuncs=true;Firebug.showDOMProps=true;Firebug.showDOMFuncs=true;Firebug.showDOMConstants=true;if(Firebug.showUserProps)
  {userProps.sort(sortName);members.push.apply(members,userProps);}
  if(Firebug.showUserFuncs)
  {userClasses.sort(sortName);members.push.apply(members,userClasses);userFuncs.sort(sortName);members.push.apply(members,userFuncs);}
  if(Firebug.showDOMProps)
  {domProps.sort(sortName);members.push.apply(members,domProps);}
  if(Firebug.showDOMFuncs)
  {domFuncs.sort(sortName);members.push.apply(members,domFuncs);}
  if(Firebug.showDOMConstants)
  members.push.apply(members,domConstants);return members;}
  function expandMembers(members,toggles,offset,level)
  {var expanded=0;for(var i=offset;i<members.length;++i)
  {var member=members[i];if(member.level>level)
  break;if(toggles.hasOwnProperty(member.name))
  {member.open="opened";var newMembers=getMembers(member.value,level+1);var args=[i+1,0];args.push.apply(args,newMembers);members.splice.apply(members,args);expanded+=newMembers.length;i+=newMembers.length+expandMembers(members,toggles[member.name],i+1,level+1);}}
  return expanded;}
  function isClassFunction(fn)
  {try
  {for(var name in fn.prototype)
  return true;}catch(exc){}
  return false;}
  var hasProperties=function hasProperties(ob)
  {try
  {for(var name in ob)
  return true;}catch(exc){}
  if(isFunction(ob))return true;return false;}
  FBL.ErrorCopy=function(message)
  {this.message=message;};var addMember=function addMember(type,props,name,value,level,order)
  {var rep=Firebug.getRep(value);var tag=rep.shortTag?rep.shortTag:rep.tag;var ErrorCopy=function(){};var valueType=typeof(value);var hasChildren=hasProperties(value)&&!(value instanceof ErrorCopy)&&(isFunction(value)||(valueType=="object"&&value!=null)||(valueType=="string"&&value.length>Firebug.stringCropLength));props.push({name:name,value:value,type:type,rowClass:"memberRow-"+type,open:"",order:order,level:level,indent:level*16,hasChildren:hasChildren,tag:tag});}
  var getWatchRowIndex=function getWatchRowIndex(row)
  {var index=-1;for(;row&&hasClass(row,"watchRow");row=row.previousSibling)
  ++index;return index;}
  var getRowName=function getRowName(row)
  {var node=row.firstChild;return node.textContent?node.textContent:node.innerText;}
  var getRowValue=function getRowValue(row)
  {return row.lastChild.firstChild.repObject;}
  var getRowOwnerObject=function getRowOwnerObject(row)
  {var parentRow=getParentRow(row);if(parentRow)
  return getRowValue(parentRow);}
  var getParentRow=function getParentRow(row)
  {var level=parseInt(row.getAttribute("level"))-1;for(row=row.previousSibling;row;row=row.previousSibling)
  {if(parseInt(row.getAttribute("level"))==level)
  return row;}}
  var getPath=function getPath(row)
  {var name=getRowName(row);var path=[name];var level=parseInt(row.getAttribute("level"))-1;for(row=row.previousSibling;row;row=row.previousSibling)
  {if(parseInt(row.getAttribute("level"))==level)
  {var name=getRowName(row);path.splice(0,0,name);--level;}}
  return path;}
  Firebug.DOM=extend(Firebug.Module,{getPanel:function()
  {return Firebug.chrome?Firebug.chrome.getPanel("DOM"):null;}});Firebug.registerModule(Firebug.DOM);var lastHighlightedObject;function DOMSidePanel(){};DOMSidePanel.prototype=extend(Firebug.DOMBasePanel.prototype,{selectRow:function(row,target)
  {if(!target)
  target=row.lastChild.firstChild;if(!target||!target.repObject)
  return;this.pathToAppend=getPath(row);var valueBox=row.lastChild.firstChild;if(hasClass(valueBox,"objectBox-array"))
  {var arrayIndex=FirebugReps.Arr.getItemIndex(target);this.pathToAppend.push(arrayIndex);}
  var object=target.repObject;if(instanceOf(object,"Element"))
  {Firebug.HTML.selectTreeNode(ElementCache(object));}
  else
  {Firebug.chrome.selectPanel("DOM");Firebug.chrome.getPanel("DOM").select(object,true);}},onClick:function(event)
  {var target=event.srcElement||event.target;var repNode=Firebug.getRepNode(target);if(repNode)
  {var row=getAncestorByClass(target,"memberRow");if(row)
  {this.selectRow(row,repNode);cancelEvent(event);}}},name:"DOMSidePanel",parentPanel:"HTML",title:"DOM",options:{hasToolButtons:true},isInitialized:false,create:function()
  {Firebug.DOMBasePanel.prototype.create.apply(this,arguments);this.onClick=bind(this.onClick,this);},initialize:function(){Firebug.DOMBasePanel.prototype.initialize.apply(this,arguments);addEvent(this.panelNode,"click",this.onClick);var selection=ElementCache.get(FirebugChrome.selectedHTMLElementId);if(selection)
  this.select(selection,true);},shutdown:function()
  {removeEvent(this.panelNode,"click",this.onClick);Firebug.DOMBasePanel.prototype.shutdown.apply(this,arguments);},reattach:function(oldChrome)
  {this.toggles=oldChrome.getPanel("DOMSidePanel").toggles;}});Firebug.registerPanel(DOMSidePanel);}});FBL.FBTrace={};(function(){var traceOptions={DBG_TIMESTAMP:1,DBG_INITIALIZE:1,DBG_CHROME:1,DBG_ERRORS:1,DBG_DISPATCH:1,DBG_CSS:1};this.module=null;this.initialize=function()
  {if(!this.messageQueue)
  this.messageQueue=[];for(var name in traceOptions)
  this[name]=traceOptions[name];};this.sysout=function()
  {return this.logFormatted(arguments,"");};this.dumpProperties=function(title,object)
  {return this.logFormatted("dumpProperties() not supported.","warning");};this.dumpStack=function()
  {return this.logFormatted("dumpStack() not supported.","warning");};this.flush=function(module)
  {this.module=module;var queue=this.messageQueue;this.messageQueue=[];for(var i=0;i<queue.length;++i)
  this.writeMessage(queue[i][0],queue[i][1],queue[i][2]);};this.getPanel=function()
  {return this.module?this.module.getPanel():null;};this.logFormatted=function(objects,className)
  {var html=this.DBG_TIMESTAMP?[getTimestamp()," | "]:[];var length=objects.length;for(var i=0;i<length;++i)
  {appendText(" ",html);var object=objects[i];if(i==0)
  {html.push("<b>");appendText(object,html);html.push("<\/b>");}
  else
  appendText(object,html);}
  return this.logRow(html,className);};this.logRow=function(message,className)
  {var panel=this.getPanel();if(panel&&panel.panelNode)
  this.writeMessage(message,className);else
  {this.messageQueue.push([message,className]);}
  return this.LOG_COMMAND;};this.writeMessage=function(message,className)
  {var container=this.getPanel().containerNode;var isScrolledToBottom=container.scrollTop+container.offsetHeight>=container.scrollHeight;this.writeRow.call(this,message,className);if(isScrolledToBottom)
  container.scrollTop=container.scrollHeight-container.offsetHeight;};this.appendRow=function(row)
  {var container=this.getPanel().panelNode;container.appendChild(row);};this.writeRow=function(message,className)
  {var row=this.getPanel().panelNode.ownerDocument.createElement("div");row.className="logRow"+(className?" logRow-"+className:"");row.innerHTML=message.join("");this.appendRow(row);};function appendText(object,html)
  {html.push(escapeHTML(objectToString(object)));};function getTimestamp()
  {var now=new Date();var ms=""+(now.getMilliseconds()/1000).toFixed(3);ms=ms.substr(2);return now.toLocaleTimeString()+"."+ms;};var HTMLtoEntity={"<":"<",">":">","&":"&","'":"'",'"':"""};function replaceChars(ch)
  {return HTMLtoEntity[ch];};function escapeHTML(value)
  {return(value+"").replace(/[<>&"']/g,replaceChars);};function objectToString(object)
  {try
  {return object+"";}
  catch(exc)
  {return null;}};}).apply(FBL.FBTrace);FBL.ns(function(){with(FBL){if(!Env.Options.enableTrace)return;Firebug.Trace=extend(Firebug.Module,{getPanel:function()
  {return Firebug.chrome?Firebug.chrome.getPanel("Trace"):null;},clear:function()
  {this.getPanel().panelNode.innerHTML="";}});Firebug.registerModule(Firebug.Trace);function TracePanel(){};TracePanel.prototype=extend(Firebug.Panel,{name:"Trace",title:"Trace",options:{hasToolButtons:true,innerHTMLSync:true},create:function(){Firebug.Panel.create.apply(this,arguments);this.clearButton=new Button({caption:"Clear",title:"Clear FBTrace logs",owner:Firebug.Trace,onClick:Firebug.Trace.clear});},initialize:function(){Firebug.Panel.initialize.apply(this,arguments);this.clearButton.initialize();},shutdown:function()
  {this.clearButton.shutdown();Firebug.Panel.shutdown.apply(this,arguments);}});Firebug.registerPanel(TracePanel);}});FBL.ns(function(){with(FBL){var modules=[];var panelTypes=[];var panelTypeMap={};var parentPanelMap={};var registerModule=Firebug.registerModule;var registerPanel=Firebug.registerPanel;append(Firebug,{extend:function(fn)
  {if(Firebug.chrome&&Firebug.chrome.addPanel)
  {var namespace=ns(fn);fn.call(namespace,FBL);}
  else
  {setTimeout(function(){Firebug.extend(fn);},100);}},registerModule:function()
  {registerModule.apply(Firebug,arguments);modules.push.apply(modules,arguments);dispatch(modules,"initialize",[]);if(FBTrace.DBG_INITIALIZE)FBTrace.sysout("Firebug.registerModule");},registerPanel:function()
  {registerPanel.apply(Firebug,arguments);panelTypes.push.apply(panelTypes,arguments);for(var i=0,panelType;panelType=arguments[i];++i)
  {if(panelType.prototype.name=="Dev")continue;panelTypeMap[panelType.prototype.name]=arguments[i];var parentPanelName=panelType.prototype.parentPanel;if(parentPanelName)
  {parentPanelMap[parentPanelName]=1;}
  else
  {var panelName=panelType.prototype.name;var chrome=Firebug.chrome;chrome.addPanel(panelName);var onTabClick=function onTabClick()
  {chrome.selectPanel(panelName);return false;};chrome.addController([chrome.panelMap[panelName].tabNode,"mousedown",onTabClick]);}}
  if(FBTrace.DBG_INITIALIZE)
  for(var i=0;i<arguments.length;++i)
  FBTrace.sysout("Firebug.registerPanel",arguments[i].prototype.name);}});}});FBL.ns(function(){with(FBL){var productionDir="https://luphoria.com/fbl/fbl";FirebugChrome.Skin={CSS:'.obscured{left:-999999px !important;}.collapsed{display:none;}[collapsed="true"]{display:none;}#fbCSS{padding:0 !important;}.cssPropDisable{float:left;display:block;width:2em;cursor:default;}.infoTip{z-index:2147483647;position:fixed;padding:2px 3px;border:1px solid #CBE087;background:LightYellow;font-family:Monaco,monospace;color:#000000;display:none;white-space:nowrap;pointer-events:none;}.infoTip[active="true"]{display:block;}.infoTipLoading{width:16px;height:16px;background:url('+productionDir+'/skin/xp/loading_16.gif) no-repeat;}.infoTipImageBox{font-size:11px;min-width:100px;text-align:center;}.infoTipCaption{font-size:11px;font:Monaco,monospace;}.infoTipLoading > .infoTipImage,.infoTipLoading > .infoTipCaption{display:none;}h1.groupHeader{padding:2px 4px;margin:0 0 4px 0;border-top:1px solid #CCCCCC;border-bottom:1px solid #CCCCCC;background:#eee url('+productionDir+'/skin/xp/group.gif) repeat-x;font-size:11px;font-weight:bold;_position:relative;}.inlineEditor,.fixedWidthEditor{z-index:2147483647;position:absolute;display:none;}.inlineEditor{margin-left:-6px;margin-top:-3px;}.textEditorInner,.fixedWidthEditor{margin:0 0 0 0 !important;padding:0;border:none !important;font:inherit;text-decoration:inherit;background-color:#FFFFFF;}.fixedWidthEditor{border-top:1px solid #888888 !important;border-bottom:1px solid #888888 !important;}.textEditorInner{position:relative;top:-7px;left:-5px;outline:none;resize:none;}.textEditorInner1{padding-left:11px;background:url('+productionDir+'/skin/xp/textEditorBorders.png) repeat-y;_background:url('+productionDir+'/skin/xp/textEditorBorders.gif) repeat-y;_overflow:hidden;}.textEditorInner2{position:relative;padding-right:2px;background:url('+productionDir+'/skin/xp/textEditorBorders.png) repeat-y 100% 0;_background:url('+productionDir+'/skin/xp/textEditorBorders.gif) repeat-y 100% 0;_position:fixed;}.textEditorTop1{background:url('+productionDir+'/skin/xp/textEditorCorners.png) no-repeat 100% 0;margin-left:11px;height:10px;_background:url('+productionDir+'/skin/xp/textEditorCorners.gif) no-repeat 100% 0;_overflow:hidden;}.textEditorTop2{position:relative;left:-11px;width:11px;height:10px;background:url('+productionDir+'/skin/xp/textEditorCorners.png) no-repeat;_background:url('+productionDir+'/skin/xp/textEditorCorners.gif) no-repeat;}.textEditorBottom1{position:relative;background:url('+productionDir+'/skin/xp/textEditorCorners.png) no-repeat 100% 100%;margin-left:11px;height:12px;_background:url('+productionDir+'/skin/xp/textEditorCorners.gif) no-repeat 100% 100%;}.textEditorBottom2{position:relative;left:-11px;width:11px;height:12px;background:url('+productionDir+'/skin/xp/textEditorCorners.png) no-repeat 0 100%;_background:url('+productionDir+'/skin/xp/textEditorCorners.gif) no-repeat 0 100%;}.panelNode-css{overflow-x:hidden;}.cssSheet > .insertBefore{height:1.5em;}.cssRule{position:relative;margin:0;padding:1em 0 0 6px;font-family:Monaco,monospace;color:#000000;}.cssRule:first-child{padding-top:6px;}.cssElementRuleContainer{position:relative;}.cssHead{padding-right:150px;}.cssProp{}.cssPropName{color:DarkGreen;}.cssPropValue{margin-left:8px;color:DarkBlue;}.cssOverridden span{text-decoration:line-through;}.cssInheritedRule{}.cssInheritLabel{margin-right:0.5em;font-weight:bold;}.cssRule .objectLink-sourceLink{top:0;}.cssProp.editGroup:hover{background:url('+productionDir+'/skin/xp/disable.png) no-repeat 2px 1px;_background:url('+productionDir+'/skin/xp/disable.gif) no-repeat 2px 1px;}.cssProp.editGroup.editing{background:none;}.cssProp.disabledStyle{background:url('+productionDir+'/skin/xp/disableHover.png) no-repeat 2px 1px;_background:url('+productionDir+'/skin/xp/disableHover.gif) no-repeat 2px 1px;opacity:1;color:#CCCCCC;}.disabledStyle .cssPropName,.disabledStyle .cssPropValue{color:#CCCCCC;}.cssPropValue.editing + .cssSemi,.inlineExpander + .cssSemi{display:none;}.cssPropValue.editing{white-space:nowrap;}.stylePropName{font-weight:bold;padding:0 4px 4px 4px;width:50%;}.stylePropValue{width:50%;}.panelNode-net{overflow-x:hidden;}.netTable{width:100%;}.hideCategory-undefined .category-undefined,.hideCategory-html .category-html,.hideCategory-css .category-css,.hideCategory-js .category-js,.hideCategory-image .category-image,.hideCategory-xhr .category-xhr,.hideCategory-flash .category-flash,.hideCategory-txt .category-txt,.hideCategory-bin .category-bin{display:none;}.netHeadRow{background:url('+productionDir+'/skin/xp/chrome://firebug/skin/group.gif) repeat-x #FFFFFF;}.netHeadCol{border-bottom:1px solid #CCCCCC;padding:2px 4px 2px 18px;font-weight:bold;}.netHeadLabel{white-space:nowrap;overflow:hidden;}.netHeaderRow{height:16px;}.netHeaderCell{cursor:pointer;-moz-user-select:none;border-bottom:1px solid #9C9C9C;padding:0 !important;font-weight:bold;background:#BBBBBB url('+productionDir+'/skin/xp/chrome://firebug/skin/tableHeader.gif) repeat-x;white-space:nowrap;}.netHeaderRow > .netHeaderCell:first-child > .netHeaderCellBox{padding:2px 14px 2px 18px;}.netHeaderCellBox{padding:2px 14px 2px 10px;border-left:1px solid #D9D9D9;border-right:1px solid #9C9C9C;}.netHeaderCell:hover:active{background:#959595 url('+productionDir+'/skin/xp/chrome://firebug/skin/tableHeaderActive.gif) repeat-x;}.netHeaderSorted{background:#7D93B2 url('+productionDir+'/skin/xp/chrome://firebug/skin/tableHeaderSorted.gif) repeat-x;}.netHeaderSorted > .netHeaderCellBox{border-right-color:#6B7C93;background:url('+productionDir+'/skin/xp/chrome://firebug/skin/arrowDown.png) no-repeat right;}.netHeaderSorted.sortedAscending > .netHeaderCellBox{background-image:url('+productionDir+'/skin/xp/chrome://firebug/skin/arrowUp.png);}.netHeaderSorted:hover:active{background:#536B90 url('+productionDir+'/skin/xp/chrome://firebug/skin/tableHeaderSortedActive.gif) repeat-x;}.panelNode-net .netRowHeader{display:block;}.netRowHeader{cursor:pointer;display:none;height:15px;margin-right:0 !important;}.netRow .netRowHeader{background-position:5px 1px;}.netRow[breakpoint="true"] .netRowHeader{background-image:url('+productionDir+'/skin/xp/chrome://firebug/skin/breakpoint.png);}.netRow[breakpoint="true"][disabledBreakpoint="true"] .netRowHeader{background-image:url('+productionDir+'/skin/xp/chrome://firebug/skin/breakpointDisabled.png);}.netRow.category-xhr:hover .netRowHeader{background-color:#F6F6F6;}#netBreakpointBar{max-width:38px;}#netHrefCol > .netHeaderCellBox{border-left:0px;}.netRow .netRowHeader{width:3px;}.netInfoRow .netRowHeader{display:table-cell;}.netTable[hiddenCols~=netHrefCol] TD[id="netHrefCol"],.netTable[hiddenCols~=netHrefCol] TD.netHrefCol,.netTable[hiddenCols~=netStatusCol] TD[id="netStatusCol"],.netTable[hiddenCols~=netStatusCol] TD.netStatusCol,.netTable[hiddenCols~=netDomainCol] TD[id="netDomainCol"],.netTable[hiddenCols~=netDomainCol] TD.netDomainCol,.netTable[hiddenCols~=netSizeCol] TD[id="netSizeCol"],.netTable[hiddenCols~=netSizeCol] TD.netSizeCol,.netTable[hiddenCols~=netTimeCol] TD[id="netTimeCol"],.netTable[hiddenCols~=netTimeCol] TD.netTimeCol{display:none;}.netRow{background:LightYellow;}.netRow.loaded{background:#FFFFFF;}.netRow.loaded:hover{background:#EFEFEF;}.netCol{padding:0;vertical-align:top;border-bottom:1px solid #EFEFEF;white-space:nowrap;height:17px;}.netLabel{width:100%;}.netStatusCol{padding-left:10px;color:rgb(128,128,128);}.responseError > .netStatusCol{color:red;}.netDomainCol{padding-left:5px;}.netSizeCol{text-align:right;padding-right:10px;}.netHrefLabel{-moz-box-sizing:padding-box;overflow:hidden;z-index:10;position:absolute;padding-left:18px;padding-top:1px;max-width:15%;font-weight:bold;}.netFullHrefLabel{display:none;-moz-user-select:none;padding-right:10px;padding-bottom:3px;max-width:100%;background:#FFFFFF;z-index:200;}.netHrefCol:hover > .netFullHrefLabel{display:block;}.netRow.loaded:hover .netCol > .netFullHrefLabel{background-color:#EFEFEF;}.useA11y .a11yShowFullLabel{display:block;background-image:none !important;border:1px solid #CBE087;background-color:LightYellow;font-family:Monaco,monospace;color:#000000;font-size:10px;z-index:2147483647;}.netSizeLabel{padding-left:6px;}.netStatusLabel,.netDomainLabel,.netSizeLabel,.netBar{padding:1px 0 2px 0 !important;}.responseError{color:red;}.hasHeaders .netHrefLabel:hover{cursor:pointer;color:blue;text-decoration:underline;}.netLoadingIcon{position:absolute;border:0;margin-left:14px;width:16px;height:16px;background:transparent no-repeat 0 0;background-image:url('+productionDir+'/skin/xp/chrome://firebug/skin/loading_16.gif);display:inline-block;}.loaded .netLoadingIcon{display:none;}.netBar,.netSummaryBar{position:relative;border-right:50px solid transparent;}.netResolvingBar{position:absolute;left:0;top:0;bottom:0;background:#FFFFFF url('+productionDir+'/skin/xp/chrome://firebug/skin/netBarResolving.gif) repeat-x;z-index:60;}.netConnectingBar{position:absolute;left:0;top:0;bottom:0;background:#FFFFFF url('+productionDir+'/skin/xp/chrome://firebug/skin/netBarConnecting.gif) repeat-x;z-index:50;}.netBlockingBar{position:absolute;left:0;top:0;bottom:0;background:#FFFFFF url('+productionDir+'/skin/xp/chrome://firebug/skin/netBarWaiting.gif) repeat-x;z-index:40;}.netSendingBar{position:absolute;left:0;top:0;bottom:0;background:#FFFFFF url('+productionDir+'/skin/xp/chrome://firebug/skin/netBarSending.gif) repeat-x;z-index:30;}.netWaitingBar{position:absolute;left:0;top:0;bottom:0;background:#FFFFFF url('+productionDir+'/skin/xp/chrome://firebug/skin/netBarResponded.gif) repeat-x;z-index:20;min-width:1px;}.netReceivingBar{position:absolute;left:0;top:0;bottom:0;background:#38D63B url('+productionDir+'/skin/xp/chrome://firebug/skin/netBarLoading.gif) repeat-x;z-index:10;}.netWindowLoadBar,.netContentLoadBar{position:absolute;left:0;top:0;bottom:0;width:1px;background-color:red;z-index:70;opacity:0.5;display:none;margin-bottom:-1px;}.netContentLoadBar{background-color:Blue;}.netTimeLabel{-moz-box-sizing:padding-box;position:absolute;top:1px;left:100%;padding-left:6px;color:#444444;min-width:16px;}.loaded .netReceivingBar,.loaded.netReceivingBar{background:#B6B6B6 url('+productionDir+'/skin/xp/chrome://firebug/skin/netBarLoaded.gif) repeat-x;border-color:#B6B6B6;}.fromCache .netReceivingBar,.fromCache.netReceivingBar{background:#D6D6D6 url('+productionDir+'/skin/xp/chrome://firebug/skin/netBarCached.gif) repeat-x;border-color:#D6D6D6;}.netSummaryRow .netTimeLabel,.loaded .netTimeLabel{background:transparent;}.timeInfoTip{width:150px; height:40px}.timeInfoTipBar,.timeInfoTipEventBar{position:relative;display:block;margin:0;opacity:1;height:15px;width:4px;}.timeInfoTipEventBar{width:1px !important;}.timeInfoTipCell.startTime{padding-right:8px;}.timeInfoTipCell.elapsedTime{text-align:right;padding-right:8px;}.sizeInfoLabelCol{font-weight:bold;padding-right:10px;font-family:Lucida Grande,Tahoma,sans-serif;font-size:11px;}.sizeInfoSizeCol{font-weight:bold;}.sizeInfoDetailCol{color:gray;text-align:right;}.sizeInfoDescCol{font-style:italic;}.netSummaryRow .netReceivingBar{background:#BBBBBB;border:none;}.netSummaryLabel{color:#222222;}.netSummaryRow{background:#BBBBBB !important;font-weight:bold;}.netSummaryRow .netBar{border-right-color:#BBBBBB;}.netSummaryRow > .netCol{border-top:1px solid #999999;border-bottom:2px solid;-moz-border-bottom-colors:#EFEFEF #999999;padding-top:1px;padding-bottom:2px;}.netSummaryRow > .netHrefCol:hover{background:transparent !important;}.netCountLabel{padding-left:18px;}.netTotalSizeCol{text-align:right;padding-right:10px;}.netTotalTimeCol{text-align:right;}.netCacheSizeLabel{position:absolute;z-index:1000;left:0;top:0;}.netLimitRow{background:rgb(255,255,225) !important;font-weight:normal;color:black;font-weight:normal;}.netLimitLabel{padding-left:18px;}.netLimitRow > .netCol{border-bottom:2px solid;-moz-border-bottom-colors:#EFEFEF #999999;vertical-align:middle !important;padding-top:2px;padding-bottom:2px;}.netLimitButton{font-size:11px;padding-top:1px;padding-bottom:1px;}.netInfoCol{border-top:1px solid #EEEEEE;background:url('+productionDir+'/skin/xp/chrome://firebug/skin/group.gif) repeat-x #FFFFFF;}.netInfoBody{margin:10px 0 4px 10px;}.netInfoTabs{position:relative;padding-left:17px;}.netInfoTab{position:relative;top:-3px;margin-top:10px;padding:4px 6px;border:1px solid transparent;border-bottom:none;_border:none;font-weight:bold;color:#565656;cursor:pointer;}.netInfoTabSelected{cursor:default !important;border:1px solid #D7D7D7 !important;border-bottom:none !important;-moz-border-radius:4px 4px 0 0;-webkit-border-radius:4px 4px 0 0;border-radius:4px 4px 0 0;background-color:#FFFFFF;}.logRow-netInfo.error .netInfoTitle{color:red;}.logRow-netInfo.loading .netInfoResponseText{font-style:italic;color:#888888;}.loading .netInfoResponseHeadersTitle{display:none;}.netInfoResponseSizeLimit{font-family:Lucida Grande,Tahoma,sans-serif;padding-top:10px;font-size:11px;}.netInfoText{display:none;margin:0;border:1px solid #D7D7D7;border-right:none;padding:8px;background-color:#FFFFFF;font-family:Monaco,monospace;white-space:pre-wrap;}.netInfoTextSelected{display:block;}.netInfoParamName{padding-right:10px;font-family:Lucida Grande,Tahoma,sans-serif;font-weight:bold;vertical-align:top;text-align:right;white-space:nowrap;}.netInfoPostText .netInfoParamName{width:1px;}.netInfoParamValue{width:100%;}.netInfoHeadersText,.netInfoPostText,.netInfoPutText{padding-top:0;}.netInfoHeadersGroup,.netInfoPostParams,.netInfoPostSource{margin-bottom:4px;border-bottom:1px solid #D7D7D7;padding-top:8px;padding-bottom:2px;font-family:Lucida Grande,Tahoma,sans-serif;font-weight:bold;color:#565656;}.netInfoPostParamsTable,.netInfoPostPartsTable,.netInfoPostJSONTable,.netInfoPostXMLTable,.netInfoPostSourceTable{margin-bottom:10px;width:100%;}.netInfoPostContentType{color:#bdbdbd;padding-left:50px;font-weight:normal;}.netInfoHtmlPreview{border:0;width:100%;height:100%;}.netHeadersViewSource{color:#bdbdbd;margin-left:200px;font-weight:normal;}.netHeadersViewSource:hover{color:blue;cursor:pointer;}.netActivationRow,.netPageSeparatorRow{background:rgb(229,229,229) !important;font-weight:normal;color:black;}.netActivationLabel{background:url('+productionDir+'/skin/xp/chrome://firebug/skin/infoIcon.png) no-repeat 3px 2px;padding-left:22px;}.netPageSeparatorRow{height:5px !important;}.netPageSeparatorLabel{padding-left:22px;height:5px !important;}.netPageRow{background-color:rgb(255,255,255);}.netPageRow:hover{background:#EFEFEF;}.netPageLabel{padding:1px 0 2px 18px !important;font-weight:bold;}.netActivationRow > .netCol{border-bottom:2px solid;-moz-border-bottom-colors:#EFEFEF #999999;padding-top:2px;padding-bottom:3px;}.twisty,.logRow-errorMessage > .hasTwisty > .errorTitle,.logRow-log > .objectBox-array.hasTwisty,.logRow-spy .spyHead .spyTitle,.logGroup > .logRow,.memberRow.hasChildren > .memberLabelCell > .memberLabel,.hasHeaders .netHrefLabel,.netPageRow > .netCol > .netPageTitle{background-image:url('+productionDir+'/skin/xp/tree_open.gif);background-repeat:no-repeat;background-position:2px 2px;min-height:12px;}.logRow-errorMessage > .hasTwisty.opened > .errorTitle,.logRow-log > .objectBox-array.hasTwisty.opened,.logRow-spy.opened .spyHead .spyTitle,.logGroup.opened > .logRow,.memberRow.hasChildren.opened > .memberLabelCell > .memberLabel,.nodeBox.highlightOpen > .nodeLabel > .twisty,.nodeBox.open > .nodeLabel > .twisty,.netRow.opened > .netCol > .netHrefLabel,.netPageRow.opened > .netCol > .netPageTitle{background-image:url('+productionDir+'/skin/xp/tree_close.gif);}.twisty{background-position:4px 4px;}* html .logRow-spy .spyHead .spyTitle,* html .logGroup .logGroupLabel,* html .hasChildren .memberLabelCell .memberLabel,* html .hasHeaders .netHrefLabel{background-image:url('+productionDir+'/skin/xp/tree_open.gif);background-repeat:no-repeat;background-position:2px 2px;}* html .opened .spyHead .spyTitle,* html .opened .logGroupLabel,* html .opened .memberLabelCell .memberLabel{background-image:url('+productionDir+'/skin/xp/tree_close.gif);background-repeat:no-repeat;background-position:2px 2px;}.panelNode-console{overflow-x:hidden;}.objectLink{text-decoration:none;}.objectLink:hover{cursor:pointer;text-decoration:underline;}.logRow{position:relative;margin:0;border-bottom:1px solid #D7D7D7;padding:2px 4px 1px 6px;background-color:#FFFFFF;overflow:hidden !important;}.useA11y .logRow:focus{border-bottom:1px solid #000000 !important;outline:none !important;background-color:#FFFFAD !important;}.useA11y .logRow:focus a.objectLink-sourceLink{background-color:#FFFFAD;}.useA11y .a11yFocus:focus,.useA11y .objectBox:focus{outline:2px solid #FF9933;background-color:#FFFFAD;}.useA11y .objectBox-null:focus,.useA11y .objectBox-undefined:focus{background-color:#888888 !important;}.useA11y .logGroup.opened > .logRow{border-bottom:1px solid #ffffff;}.logGroup{background:url('+productionDir+'/skin/xp/group.gif) repeat-x #FFFFFF;padding:0 !important;border:none !important;}.logGroupBody{display:none;margin-left:16px;border-left:1px solid #D7D7D7;border-top:1px solid #D7D7D7;background:#FFFFFF;}.logGroup > .logRow{background-color:transparent !important;font-weight:bold;}.logGroup.opened > .logRow{border-bottom:none;}.logGroup.opened > .logGroupBody{display:block;}.logRow-command > .objectBox-text{font-family:Monaco,monospace;color:#0000FF;white-space:pre-wrap;}.logRow-info,.logRow-warn,.logRow-error,.logRow-assert,.logRow-warningMessage,.logRow-errorMessage{padding-left:22px;background-repeat:no-repeat;background-position:4px 2px;}.logRow-assert,.logRow-warningMessage,.logRow-errorMessage{padding-top:0;padding-bottom:0;}.logRow-info,.logRow-info .objectLink-sourceLink{background-color:#FFFFFF;}.logRow-warn,.logRow-warningMessage,.logRow-warn .objectLink-sourceLink,.logRow-warningMessage .objectLink-sourceLink{background-color:cyan;}.logRow-error,.logRow-assert,.logRow-errorMessage,.logRow-error .objectLink-sourceLink,.logRow-errorMessage .objectLink-sourceLink{background-color:LightYellow;}.logRow-error,.logRow-assert,.logRow-errorMessage{color:#FF0000;}.logRow-info{}.logRow-warn,.logRow-warningMessage{}.logRow-error,.logRow-assert,.logRow-errorMessage{}.objectBox-string,.objectBox-text,.objectBox-number,.objectLink-element,.objectLink-textNode,.objectLink-function,.objectBox-stackTrace,.objectLink-profile{font-family:Monaco,monospace;}.objectBox-string,.objectBox-text,.objectLink-textNode{white-space:pre-wrap;}.objectBox-number,.objectLink-styleRule,.objectLink-element,.objectLink-textNode{color:#000088;}.objectBox-string{color:#FF0000;}.objectLink-function,.objectBox-stackTrace,.objectLink-profile{color:DarkGreen;}.objectBox-null,.objectBox-undefined{padding:0 2px;border:1px solid #666666;background-color:#888888;color:#FFFFFF;}.objectBox-exception{padding:0 2px 0 18px;color:red;}.objectLink-sourceLink{position:absolute;right:4px;top:2px;padding-left:8px;font-family:Lucida Grande,sans-serif;font-weight:bold;color:#0000FF;}.errorTitle{margin-top:0px;margin-bottom:1px;padding-top:2px;padding-bottom:2px;}.errorTrace{margin-left:17px;}.errorSourceBox{margin:2px 0;}.errorSource-none{display:none;}.errorSource-syntax > .errorBreak{visibility:hidden;}.errorSource{cursor:pointer;font-family:Monaco,monospace;color:DarkGreen;}.errorSource:hover{text-decoration:underline;}.errorBreak{cursor:pointer;display:none;margin:0 6px 0 0;width:13px;height:14px;vertical-align:bottom;opacity:0.1;}.hasBreakSwitch .errorBreak{display:inline;}.breakForError .errorBreak{opacity:1;}.assertDescription{margin:0;}.logRow-profile > .logRow > .objectBox-text{font-family:Lucida Grande,Tahoma,sans-serif;color:#000000;}.logRow-profile > .logRow > .objectBox-text:last-child{color:#555555;font-style:italic;}.logRow-profile.opened > .logRow{padding-bottom:4px;}.profilerRunning > .logRow{padding-left:22px !important;}.profileSizer{width:100%;overflow-x:auto;overflow-y:scroll;}.profileTable{border-bottom:1px solid #D7D7D7;padding:0 0 4px 0;}.profileTable tr[odd="1"]{background-color:#F5F5F5;vertical-align:middle;}.profileTable a{vertical-align:middle;}.profileTable td{padding:1px 4px 0 4px;}.headerCell{cursor:pointer;-moz-user-select:none;border-bottom:1px solid #9C9C9C;padding:0 !important;font-weight:bold;}.headerCellBox{padding:2px 4px;border-left:1px solid #D9D9D9;border-right:1px solid #9C9C9C;}.headerCell:hover:active{}.headerSorted{}.headerSorted > .headerCellBox{border-right-color:#6B7C93;}.headerSorted.sortedAscending > .headerCellBox{}.headerSorted:hover:active{}.linkCell{text-align:right;}.linkCell > .objectLink-sourceLink{position:static;}.logRow-stackTrace{padding-top:0;background:#f8f8f8;}.logRow-stackTrace > .objectBox-stackFrame{position:relative;padding-top:2px;}.objectLink-object{font-family:Lucida Grande,sans-serif;font-weight:bold;color:DarkGreen;white-space:pre-wrap;}.objectProp-object{color:DarkGreen;}.objectProps{color:#000;font-weight:normal;}.objectPropName{color:#777;}.objectProps .objectProp-string{color:#f55;}.objectProps .objectProp-number{color:#55a;}.objectProps .objectProp-object{color:#585;}.selectorTag,.selectorId,.selectorClass{font-family:Monaco,monospace;font-weight:normal;}.selectorTag{color:#0000FF;}.selectorId{color:DarkBlue;}.selectorClass{color:red;}.selectorHidden > .selectorTag{color:#5F82D9;}.selectorHidden > .selectorId{color:#888888;}.selectorHidden > .selectorClass{color:#D86060;}.selectorValue{font-family:Lucida Grande,sans-serif;font-style:italic;color:#555555;}.panelNode.searching .logRow{display:none;}.logRow.matched{display:block !important;}.logRow.matching{position:absolute;left:-1000px;top:-1000px;max-width:0;max-height:0;overflow:hidden;}.objectLeftBrace,.objectRightBrace,.objectEqual,.objectComma,.arrayLeftBracket,.arrayRightBracket,.arrayComma{font-family:Monaco,monospace;}.objectLeftBrace,.objectRightBrace,.arrayLeftBracket,.arrayRightBracket{font-weight:bold;}.objectLeftBrace,.arrayLeftBracket{margin-right:4px;}.objectRightBrace,.arrayRightBracket{margin-left:4px;}.logRow-dir{padding:0;}.logRow-errorMessage .hasTwisty .errorTitle,.logRow-spy .spyHead .spyTitle,.logGroup .logRow{cursor:pointer;padding-left:18px;background-repeat:no-repeat;background-position:3px 3px;}.logRow-errorMessage > .hasTwisty > .errorTitle{background-position:2px 3px;}.logRow-errorMessage > .hasTwisty > .errorTitle:hover,.logRow-spy .spyHead .spyTitle:hover,.logGroup > .logRow:hover{text-decoration:underline;}.logRow-spy{padding:0 !important;}.logRow-spy,.logRow-spy .objectLink-sourceLink{background:url('+productionDir+'/skin/xp/group.gif) repeat-x #FFFFFF;padding-right:4px;right:0;}.logRow-spy.opened{padding-bottom:4px;border-bottom:none;}.spyTitle{color:#000000;font-weight:bold;-moz-box-sizing:padding-box;overflow:hidden;z-index:100;padding-left:18px;}.spyCol{padding:0;white-space:nowrap;height:16px;}.spyTitleCol:hover > .objectLink-sourceLink,.spyTitleCol:hover > .spyTime,.spyTitleCol:hover > .spyStatus,.spyTitleCol:hover > .spyTitle{display:none;}.spyFullTitle{display:none;-moz-user-select:none;max-width:100%;background-color:Transparent;}.spyTitleCol:hover > .spyFullTitle{display:block;}.spyStatus{padding-left:10px;color:rgb(128,128,128);}.spyTime{margin-left:4px;margin-right:4px;color:rgb(128,128,128);}.spyIcon{margin-right:4px;margin-left:4px;width:16px;height:16px;vertical-align:middle;background:transparent no-repeat 0 0;display:none;}.loading .spyHead .spyRow .spyIcon{background-image:url('+productionDir+'/skin/xp/loading_16.gif);display:block;}.logRow-spy.loaded:not(.error) .spyHead .spyRow .spyIcon{width:0;margin:0;}.logRow-spy.error .spyHead .spyRow .spyIcon{background-image:url('+productionDir+'/skin/xp/errorIcon-sm.png);display:block;background-position:2px 2px;}.logRow-spy .spyHead .netInfoBody{display:none;}.logRow-spy.opened .spyHead .netInfoBody{margin-top:10px;display:block;}.logRow-spy.error .spyTitle,.logRow-spy.error .spyStatus,.logRow-spy.error .spyTime{color:red;}.logRow-spy.loading .spyResponseText{font-style:italic;color:#888888;}.caption{font-family:Lucida Grande,Tahoma,sans-serif;font-weight:bold;color:#444444;}.warning{padding:10px;font-family:Lucida Grande,Tahoma,sans-serif;font-weight:bold;color:#888888;}.panelNode-dom{overflow-x:hidden !important;}.domTable{font-size:1em;width:100%;table-layout:fixed;background:#fff;}.domTableIE{width:auto;}.memberLabelCell{padding:2px 0 2px 0;vertical-align:top;}.memberValueCell{padding:1px 0 1px 5px;display:block;overflow:hidden;}.memberLabel{display:block;cursor:default;-moz-user-select:none;overflow:hidden;padding-left:18px;background-color:#FFFFFF;text-decoration:none;}.memberRow.hasChildren .memberLabelCell .memberLabel:hover{cursor:pointer;color:blue;text-decoration:underline;}.userLabel{color:#000000;font-weight:bold;}.userClassLabel{color:#E90000;font-weight:bold;}.userFunctionLabel{color:#025E2A;font-weight:bold;}.domLabel{color:#000000;}.domFunctionLabel{color:#025E2A;}.ordinalLabel{color:SlateBlue;font-weight:bold;}.scopesRow{padding:2px 18px;background-color:LightYellow;border-bottom:5px solid #BEBEBE;color:#666666;}.scopesLabel{background-color:LightYellow;}.watchEditCell{padding:2px 18px;background-color:LightYellow;border-bottom:1px solid #BEBEBE;color:#666666;}.editor-watchNewRow,.editor-memberRow{font-family:Monaco,monospace !important;}.editor-memberRow{padding:1px 0 !important;}.editor-watchRow{padding-bottom:0 !important;}.watchRow > .memberLabelCell{font-family:Monaco,monospace;padding-top:1px;padding-bottom:1px;}.watchRow > .memberLabelCell > .memberLabel{background-color:transparent;}.watchRow > .memberValueCell{padding-top:2px;padding-bottom:2px;}.watchRow > .memberLabelCell,.watchRow > .memberValueCell{background-color:#F5F5F5;border-bottom:1px solid #BEBEBE;}.watchToolbox{z-index:2147483647;position:absolute;right:0;padding:1px 2px;}#fbConsole{overflow-x:hidden !important;}#fbCSS{font:1em Monaco,monospace;padding:0 7px;}#fbstylesheetButtons select,#fbScriptButtons select{font:11px Lucida Grande,Tahoma,sans-serif;margin-top:1px;padding-left:3px;background:#fafafa;border:1px inset #fff;width:220px;outline:none;}.Selector{margin-top:10px}.CSSItem{margin-left:4%}.CSSText{padding-left:20px;}.CSSProperty{color:#005500;}.CSSValue{padding-left:5px; color:#000088;}#fbHTMLStatusBar{display:inline;}.fbToolbarButtons{display:none;}.fbStatusSeparator{display:block;float:left;padding-top:4px;}#fbStatusBarBox{display:none;}#fbToolbarContent{display:block;position:absolute;_position:absolute;top:0;padding-top:4px;height:23px;clip:rect(0,2048px,27px,0);}.fbTabMenuTarget{display:none !important;float:left;width:10px;height:10px;margin-top:6px;background:url('+productionDir+'/skin/xp/tabMenuTarget.png);}.fbTabMenuTarget:hover{background:url('+productionDir+'/skin/xp/tabMenuTargetHover.png);}.fbShadow{float:left;background:url('+productionDir+'/skin/xp/shadowAlpha.png) no-repeat bottom right !important;background:url('+productionDir+'/skin/xp/shadow2.gif) no-repeat bottom right;margin:10px 0 0 10px !important;margin:10px 0 0 5px;}.fbShadowContent{display:block;position:relative;background-color:#fff;border:1px solid #a9a9a9;top:-6px;left:-6px;}.fbMenu{display:none;position:absolute;font-size:11px;z-index:2147483647;}.fbMenuContent{padding:2px;}.fbMenuSeparator{display:block;position:relative;padding:1px 18px 0;text-decoration:none;color:#000;cursor:default;background:#ACA899;margin:4px 0;}.fbMenuOption{display:block;position:relative;padding:2px 18px;text-decoration:none;color:#000;cursor:default;}.fbMenuOption:hover{color:#fff;background:#316AC5;}.fbMenuGroup{background:transparent url('+productionDir+'/skin/xp/tabMenuPin.png) no-repeat right 0;}.fbMenuGroup:hover{background:#316AC5 url('+productionDir+'/skin/xp/tabMenuPin.png) no-repeat right -17px;}.fbMenuGroupSelected{color:#fff;background:#316AC5 url('+productionDir+'/skin/xp/tabMenuPin.png) no-repeat right -17px;}.fbMenuChecked{background:transparent url('+productionDir+'/skin/xp/tabMenuCheckbox.png) no-repeat 4px 0;}.fbMenuChecked:hover{background:#316AC5 url('+productionDir+'/skin/xp/tabMenuCheckbox.png) no-repeat 4px -17px;}.fbMenuRadioSelected{background:transparent url('+productionDir+'/skin/xp/tabMenuRadio.png) no-repeat 4px 0;}.fbMenuRadioSelected:hover{background:#316AC5 url('+productionDir+'/skin/xp/tabMenuRadio.png) no-repeat 4px -17px;}.fbMenuShortcut{padding-right:85px;}.fbMenuShortcutKey{position:absolute;right:0;top:2px;width:77px;}#fbFirebugMenu{top:22px;left:0;}.fbMenuDisabled{color:#ACA899 !important;}#fbFirebugSettingsMenu{left:245px;top:99px;}#fbConsoleMenu{top:42px;left:48px;}.fbIconButton{display:block;}.fbIconButton{display:block;}.fbIconButton{display:block;float:left;height:20px;width:20px;color:#000;margin-right:2px;text-decoration:none;cursor:default;}.fbIconButton:hover{position:relative;top:-1px;left:-1px;margin-right:0;_margin-right:1px;color:#333;border:1px solid #fff;border-bottom:1px solid #bbb;border-right:1px solid #bbb;}.fbIconPressed{position:relative;margin-right:0;_margin-right:1px;top:0 !important;left:0 !important;height:19px;color:#333 !important;border:1px solid #bbb !important;border-bottom:1px solid #cfcfcf !important;border-right:1px solid #ddd !important;}#fbErrorPopup{position:absolute;right:0;bottom:0;height:19px;width:75px;background:url('+productionDir+'/skin/xp/sprite.png) #f1f2ee 0 0;z-index:999;}#fbErrorPopupContent{position:absolute;right:0;top:1px;height:18px;width:75px;_width:74px;border-left:1px solid #aca899;}#fbErrorIndicator{position:absolute;top:2px;right:5px;}.fbBtnInspectActive{background:#aaa;color:#fff !important;}.fbBody{margin:0;padding:0;overflow:hidden;font-family:Lucida Grande,Tahoma,sans-serif;font-size:11px;background:#fff;}.clear{clear:both;}#fbMiniChrome{display:none;right:0;height:27px;background:url('+productionDir+'/skin/xp/sprite.png) #f1f2ee 0 0;margin-left:1px;}#fbMiniContent{display:block;position:relative;left:-1px;right:0;top:1px;height:25px;border-left:1px solid #aca899;}#fbToolbarSearch{float:right;border:1px solid #ccc;margin:0 5px 0 0;background:#fff url('+productionDir+'/skin/xp/search.png) no-repeat 4px 2px !important;background:#fff url('+productionDir+'/skin/xp/search.gif) no-repeat 4px 2px;padding-left:20px;font-size:11px;}#fbToolbarErrors{float:right;margin:1px 4px 0 0;font-size:11px;}#fbLeftToolbarErrors{float:left;margin:7px 0px 0 5px;font-size:11px;}.fbErrors{padding-left:20px;height:14px;background:url('+productionDir+'/skin/xp/errorIcon.png) no-repeat !important;background:url('+productionDir+'/skin/xp/errorIcon.gif) no-repeat;color:#f00;font-weight:bold;}#fbMiniErrors{display:inline;display:none;float:right;margin:5px 2px 0 5px;}#fbMiniIcon{float:right;margin:3px 4px 0;height:20px;width:20px;float:right;background:url('+productionDir+'/skin/xp/sprite.png) 0 -135px;cursor:pointer;}#fbChrome{font-family:Lucida Grande,Tahoma,sans-serif;font-size:11px;position:absolute;_position:static;top:0;left:0;height:100%;width:100%;border-collapse:collapse;border-spacing:0;background:#fff;overflow:hidden;}#fbChrome > tbody > tr > td{padding:0;}#fbTop{height:49px;}#fbToolbar{background:url('+productionDir+'/skin/xp/sprite.png) #f1f2ee 0 0;height:27px;font-size:11px;}#fbPanelBarBox{background:url('+productionDir+'/skin/xp/sprite.png) #dbd9c9 0 -27px;height:22px;}#fbContent{height:100%;vertical-align:top;}#fbBottom{height:18px;background:#fff;}#fbToolbarIcon{float:left;padding:0 5px 0;}#fbToolbarIcon a{background:url('+productionDir+'/skin/xp/sprite.png) 0 -135px;}#fbToolbarButtons{padding:0 2px 0 5px;}#fbToolbarButtons{padding:0 2px 0 5px;}.fbButton{text-decoration:none;display:block;float:left;color:#000;padding:4px 6px 4px 7px;cursor:default;}.fbButton:hover{color:#333;background:#f5f5ef url('+productionDir+'/skin/xp/buttonBg.png);padding:3px 5px 3px 6px;border:1px solid #fff;border-bottom:1px solid #bbb;border-right:1px solid #bbb;}.fbBtnPressed{background:#e3e3db url('+productionDir+'/skin/xp/buttonBgHover.png) !important;padding:3px 4px 2px 6px !important;margin:1px 0 0 1px !important;border:1px solid #ACA899 !important;border-color:#ACA899 #ECEBE3 #ECEBE3 #ACA899 !important;}#fbStatusBarBox{top:4px;cursor:default;}.fbToolbarSeparator{overflow:hidden;border:1px solid;border-color:transparent #fff transparent #777;_border-color:#eee #fff #eee #777;height:7px;margin:6px 3px;float:left;}.fbBtnSelected{font-weight:bold;}.fbStatusBar{color:#aca899;}.fbStatusBar a{text-decoration:none;color:black;}.fbStatusBar a:hover{color:blue;cursor:pointer;}#fbWindowButtons{position:absolute;white-space:nowrap;right:0;top:0;height:17px;width:48px;padding:5px;z-index:6;background:url('+productionDir+'/skin/xp/sprite.png) #f1f2ee 0 0;}#fbPanelBar1{width:1024px; z-index:8;left:0;white-space:nowrap;background:url('+productionDir+'/skin/xp/sprite.png) #dbd9c9 0 -27px;position:absolute;left:4px;}#fbPanelBar2Box{background:url('+productionDir+'/skin/xp/sprite.png) #dbd9c9 0 -27px;position:absolute;height:22px;width:300px; z-index:9;right:0;}#fbPanelBar2{position:absolute;width:290px; height:22px;padding-left:4px;}.fbPanel{display:none;}#fbPanelBox1,#fbPanelBox2{max-height:inherit;height:100%;font-size:1em;}#fbPanelBox2{background:#fff;}#fbPanelBox2{width:300px;background:#fff;}#fbPanel2{margin-left:6px;background:#fff;}#fbLargeCommandLine{display:none;position:absolute;z-index:9;top:27px;right:0;width:294px;height:201px;border-width:0;margin:0;padding:2px 0 0 2px;resize:none;outline:none;font-size:11px;overflow:auto;border-top:1px solid #B9B7AF;_right:-1px;_border-left:1px solid #fff;}#fbLargeCommandButtons{display:none;background:#ECE9D8;bottom:0;right:0;width:294px;height:21px;padding-top:1px;position:fixed;border-top:1px solid #ACA899;z-index:9;}#fbSmallCommandLineIcon{background:url('+productionDir+'/skin/xp/down.png) no-repeat;position:absolute;right:2px;bottom:3px;z-index:99;}#fbSmallCommandLineIcon:hover{background:url('+productionDir+'/skin/xp/downHover.png) no-repeat;}.hide{overflow:hidden !important;position:fixed !important;display:none !important;visibility:hidden !important;}#fbCommand{height:18px;}#fbCommandBox{position:fixed;_position:absolute;width:100%;height:18px;bottom:0;overflow:hidden;z-index:9;background:#fff;border:0;border-top:1px solid #ccc;}#fbCommandIcon{position:absolute;color:#00f;top:2px;left:6px;display:inline;font:11px Monaco,monospace;z-index:10;}#fbCommandLine{position:absolute;width:100%;top:0;left:0;border:0;margin:0;padding:2px 0 2px 32px;font:11px Monaco,monospace;z-index:9;outline:none;}#fbLargeCommandLineIcon{background:url('+productionDir+'/skin/xp/up.png) no-repeat;position:absolute;right:1px;bottom:1px;z-index:10;}#fbLargeCommandLineIcon:hover{background:url('+productionDir+'/skin/xp/upHover.png) no-repeat;}div.fbFitHeight{overflow:auto;position:relative;}.fbSmallButton{overflow:hidden;width:16px;height:16px;display:block;text-decoration:none;cursor:default;}#fbWindowButtons .fbSmallButton{float:right;}#fbWindow_btClose{background:url('+productionDir+'/skin/xp/min.png);}#fbWindow_btClose:hover{background:url('+productionDir+'/skin/xp/minHover.png);}#fbWindow_btDetach{background:url('+productionDir+'/skin/xp/detach.png);}#fbWindow_btDetach:hover{background:url('+productionDir+'/skin/xp/detachHover.png);}#fbWindow_btDeactivate{background:url('+productionDir+'/skin/xp/off.png);}#fbWindow_btDeactivate:hover{background:url('+productionDir+'/skin/xp/offHover.png);}.fbTab{text-decoration:none;display:none;float:left;width:auto;float:left;cursor:default;font-family:Lucida Grande,Tahoma,sans-serif;font-size:11px;font-weight:bold;height:22px;color:#565656;}.fbPanelBar span{float:left;}.fbPanelBar .fbTabL,.fbPanelBar .fbTabR{height:22px;width:8px;}.fbPanelBar .fbTabText{padding:4px 1px 0;}a.fbTab:hover{background:url('+productionDir+'/skin/xp/sprite.png) 0 -73px;}a.fbTab:hover .fbTabL{background:url('+productionDir+'/skin/xp/sprite.png) -16px -96px;}a.fbTab:hover .fbTabR{background:url('+productionDir+'/skin/xp/sprite.png) -24px -96px;}.fbSelectedTab{background:url('+productionDir+'/skin/xp/sprite.png) #f1f2ee 0 -50px !important;color:#000;}.fbSelectedTab .fbTabL{background:url('+productionDir+'/skin/xp/sprite.png) 0 -96px !important;}.fbSelectedTab .fbTabR{background:url('+productionDir+'/skin/xp/sprite.png) -8px -96px !important;}#fbHSplitter{position:fixed;_position:absolute;left:0;top:0;width:100%;height:5px;overflow:hidden;cursor:n-resize !important;background:url('+productionDir+'/skin/xp/pixel_transparent.gif);z-index:9;}#fbHSplitter.fbOnMovingHSplitter{height:100%;z-index:100;}.fbVSplitter{background:#ece9d8;color:#000;border:1px solid #716f64;border-width:0 1px;border-left-color:#aca899;width:4px;cursor:e-resize;overflow:hidden;right:294px;text-decoration:none;z-index:10;position:absolute;height:100%;top:27px;}div.lineNo{font:1em Monaco,monospace;position:relative;float:left;top:0;left:0;margin:0 5px 0 0;padding:0 5px 0 10px;background:#eee;color:#888;border-right:1px solid #ccc;text-align:right;}.sourceBox{position:absolute;}.sourceCode{font:1em Monaco,monospace;overflow:hidden;white-space:pre;display:inline;}.nodeControl{margin-top:3px;margin-left:-14px;float:left;width:9px;height:9px;overflow:hidden;cursor:default;background:url('+productionDir+'/skin/xp/tree_open.gif);_float:none;_display:inline;_position:absolute;}div.nodeMaximized{background:url('+productionDir+'/skin/xp/tree_close.gif);}div.objectBox-element{padding:1px 3px;}.objectBox-selector{cursor:default;}.selectedElement{background:highlight;color:#fff !important;}.selectedElement span{color:#fff !important;}* html .selectedElement{position:relative;}@media screen and (-webkit-min-device-pixel-ratio:0){.selectedElement{background:#316AC5;color:#fff !important;}}.logRow *{font-size:1em;}.logRow{position:relative;border-bottom:1px solid #D7D7D7;padding:2px 4px 1px 6px;zbackground-color:#FFFFFF;}.logRow-command{font-family:Monaco,monospace;color:blue;}.objectBox-string,.objectBox-text,.objectBox-number,.objectBox-function,.objectLink-element,.objectLink-textNode,.objectLink-function,.objectBox-stackTrace,.objectLink-profile{font-family:Monaco,monospace;}.objectBox-null{padding:0 2px;border:1px solid #666666;background-color:#888888;color:#FFFFFF;}.objectBox-string{color:red;}.objectBox-number{color:#000088;}.objectBox-function{color:DarkGreen;}.objectBox-object{color:DarkGreen;font-weight:bold;font-family:Lucida Grande,sans-serif;}.objectBox-array{color:#000;}.logRow-info,.logRow-error,.logRow-warn{background:#fff no-repeat 2px 2px;padding-left:20px;padding-bottom:3px;}.logRow-info{background-image:url('+productionDir+'/skin/xp/infoIcon.png) !important;background-image:url('+productionDir+'/skin/xp/infoIcon.gif);}.logRow-warn{background-color:cyan;background-image:url('+productionDir+'/skin/xp/warningIcon.png) !important;background-image:url('+productionDir+'/skin/xp/warningIcon.gif);}.logRow-error{background-color:LightYellow;background-image:url('+productionDir+'/skin/xp/errorIcon.png) !important;background-image:url('+productionDir+'/skin/xp/errorIcon.gif);color:#f00;}.errorMessage{vertical-align:top;color:#f00;}.objectBox-sourceLink{position:absolute;right:4px;top:2px;padding-left:8px;font-family:Lucida Grande,sans-serif;font-weight:bold;color:#0000FF;}.selectorTag,.selectorId,.selectorClass{font-family:Monaco,monospace;font-weight:normal;}.selectorTag{color:#0000FF;}.selectorId{color:DarkBlue;}.selectorClass{color:red;}.objectBox-element{font-family:Monaco,monospace;color:#000088;}.nodeChildren{padding-left:26px;}.nodeTag{color:blue;cursor:pointer;}.nodeValue{color:#FF0000;font-weight:normal;}.nodeText,.nodeComment{margin:0 2px;vertical-align:top;}.nodeText{color:#333333;font-family:Monaco,monospace;}.nodeComment{color:DarkGreen;}.nodeHidden,.nodeHidden *{color:#888888;}.nodeHidden .nodeTag{color:#5F82D9;}.nodeHidden .nodeValue{color:#D86060;}.selectedElement .nodeHidden,.selectedElement .nodeHidden *{color:SkyBlue !important;}.log-object{}.property{position:relative;clear:both;height:15px;}.propertyNameCell{vertical-align:top;float:left;width:28%;position:absolute;left:0;z-index:0;}.propertyValueCell{float:right;width:68%;background:#fff;position:absolute;padding-left:5px;display:table-cell;right:0;z-index:1;}.propertyName{font-weight:bold;}.FirebugPopup{height:100% !important;}.FirebugPopup #fbWindowButtons{display:none !important;}.FirebugPopup #fbHSplitter{display:none !important;}',HTML:'<table id="fbChrome" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td id="fbTop" colspan="2"><div id="fbWindowButtons"><a id="fbWindow_btDeactivate" class="fbSmallButton fbHover" title="Deactivate Firebug for this web page"> <\/a><a id="fbWindow_btDetach" class="fbSmallButton fbHover" title="Open Firebug in popup window"> <\/a><a id="fbWindow_btClose" class="fbSmallButton fbHover" title="Minimize Firebug"> <\/a><\/div><div id="fbToolbar"><div id="fbToolbarContent"><span id="fbToolbarIcon"><a id="fbFirebugButton" class="fbIconButton" class="fbHover" target="_blank"> <\/a><\/span><span id="fbToolbarButtons"><span id="fbFixedButtons"><a id="fbChrome_btInspect" class="fbButton fbHover" title="Click an element in the page to inspect">Inspect<\/a><\/span><span id="fbConsoleButtons" class="fbToolbarButtons"><a id="fbConsole_btClear" class="fbButton fbHover" title="Clear the console">Clear<\/a><\/span><\/span><span id="fbStatusBarBox"><span class="fbToolbarSeparator"><\/span><\/span><\/div><\/div><div id="fbPanelBarBox"><div id="fbPanelBar1" class="fbPanelBar"><a id="fbConsoleTab" class="fbTab fbHover"><span class="fbTabL"><\/span><span class="fbTabText">Console<\/span><span class="fbTabMenuTarget"><\/span><span class="fbTabR"><\/span><\/a><a id="fbHTMLTab" class="fbTab fbHover"><span class="fbTabL"><\/span><span class="fbTabText">HTML<\/span><span class="fbTabR"><\/span><\/a><a class="fbTab fbHover"><span class="fbTabL"><\/span><span class="fbTabText">CSS<\/span><span class="fbTabR"><\/span><\/a><a class="fbTab fbHover"><span class="fbTabL"><\/span><span class="fbTabText">Script<\/span><span class="fbTabR"><\/span><\/a><a class="fbTab fbHover"><span class="fbTabL"><\/span><span class="fbTabText">DOM<\/span><span class="fbTabR"><\/span><\/a><\/div><div id="fbPanelBar2Box" class="hide"><div id="fbPanelBar2" class="fbPanelBar"><\/div><\/div><\/div><div id="fbHSplitter"> <\/div><\/td><\/tr><tr id="fbContent"><td id="fbPanelBox1"><div id="fbPanel1" class="fbFitHeight"><div id="fbConsole" class="fbPanel"><\/div><div id="fbHTML" class="fbPanel"><\/div><\/div><\/td><td id="fbPanelBox2" class="hide"><div id="fbVSplitter" class="fbVSplitter"> <\/div><div id="fbPanel2" class="fbFitHeight"><div id="fbHTML_Style" class="fbPanel"><\/div><div id="fbHTML_Layout" class="fbPanel"><\/div><div id="fbHTML_DOM" class="fbPanel"><\/div><\/div><textarea id="fbLargeCommandLine" class="fbFitHeight"><\/textarea><div id="fbLargeCommandButtons"><a id="fbCommand_btRun" class="fbButton fbHover">Run<\/a><a id="fbCommand_btClear" class="fbButton fbHover">Clear<\/a><a id="fbSmallCommandLineIcon" class="fbSmallButton fbHover"><\/a><\/div><\/td><\/tr><tr id="fbBottom" class="hide"><td id="fbCommand" colspan="2"><div id="fbCommandBox"><div id="fbCommandIcon">>>><\/div><input id="fbCommandLine" name="fbCommandLine" type="text"/><a id="fbLargeCommandLineIcon" class="fbSmallButton fbHover"><\/a><\/div><\/td><\/tr><\/tbody><\/table><span id="fbMiniChrome"><span id="fbMiniContent"><span id="fbMiniIcon" title="Open Firebug Lite"><\/span><span id="fbMiniErrors" class="fbErrors">2 errors<\/span><\/span><\/span>'};}});FBL.initialize();})();
  </script></mark>
</body>
</html>
