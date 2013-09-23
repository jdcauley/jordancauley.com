/*!
 * jQuery Feeds v0.5
 * https://camagu.github.com/jquery-feeds
 * 
 * Copyright (c) 2013, Camilo Aguilar
 * Dual licensed under the MIT and GPL licenses:
 *     http://www.opensource.org/licenses/mit-license.php
 *     http://www.gnu.org/licenses/gpl.html
 * 
 * Includes a modified version of Simple JavaScript Templating
 * http://ejohn.org/blog/javascript-micro-templating/
 * Copyright (c) John Resig (http://ejohn.org)
 * MIT licensed
 * 
 * Date: 2013-02-18
 */
(function(e){var t={};e.fn.feeds=function(n){var r={service:"//ajax.googleapis.com/ajax/services/feed/load?v=1.0",settings:{loadingTemplate:'<div class="feeds-loader">Loading entries ...</div>',entryTemplate:'<div class="feeds-entry feeds-source-<!=source!>"><a class="feeds-entry-title" target="_blank" href="<!=link!>" title="<!=title!>"><!=title!></a><div class="feeds-entry-date"><!=publishedDate!></div><div class="feeds-entry-contentSnippet"><!=contentSnippet!></div></div>',feeds:{},max:-1,xml:!1,ssl:"auto",onComplete:function(e){},preprocess:function(e){}},feeds:{},entries:[],feedsLength:0,feedsLoaded:0,$element:null,$loader:null,init:function(t,n){this.settings=e.extend(this.settings,n),this.feeds=this.settings.feeds;for(var r in this.feeds)this.feeds.hasOwnProperty(r)&&this.feedsLength++;var i=this.settings.ssl==="auto"?document.location.protocol:this.settings.ssl?"https:":"http:";e.inArray(i,["http:","https"])===-1&&(i="https:"),this.service=i+this.service,this.$element=e(t);var s=typeof this.settings.loadingTemplate=="function"?this.settings.loadingTemplate:this.tmpl(this.settings.loadingTemplate);this.$loader=e(s.call(this,{})),this.$element.html(this.$loader);var o=this.settings.xml?"json_xml":"json";for(var u in this.feeds)this.fetchFeed(u,this.feeds[u],this.settings.max,o)},fetchFeed:function(n,r,i,s){var o=this,u=r+"**"+i+"**"+s;if(typeof t[u]!="undefined"){o.processResponse(t[u],n,r);return}e.ajax({url:this.service,dataType:"jsonp",data:{q:r,num:i,output:s},beforeSend:function(){this.feed=r,this.key=n},success:function(e){t[u]=e,o.processResponse(e,this.key,this.feed)}})},processResponse:function(t,n,r){if(t.responseStatus!==200)window.console&&window.console.log&&console.log("Unable to load feed "+r+": ("+t.responseStatus+") "+t.responseDetails);else{var i=t.responseData.feed,s=i.entries,o=t.responseData.feed.type;if(this.settings.xml){var u=e(t.responseData.xmlString);o.match(/^rss.*/)?u=u.filter("rss").find("channel"):o.match(/^atom.*/)&&(u=u.filter("feed")),i.xml=u}for(var a in s){var f=e.extend({},s[a]);f.source=n,f.publishedDateRaw=f.publishedDate,f.feedUrl=i.feedUrl,f.feedTitle=i.title,f.feedLink=i.link,f.feedDescription=i.description,f.feedAuthor=i.author,this.settings.xml&&(o.match(/^rss.*/)?f.xml=i.xml.find("item").eq(a):o.match(/^atom.*/)?f.xml=i.xml.find("entry").eq(a):f.xml={}),this.settings.preprocess.call(f,i)!==!1&&this.entries.push(f)}}this.feedsLoaded++,this.checkComplete()},checkComplete:function(){if(this.feedsLoaded===this.feedsLength){this.$loader.remove(),this.entries.sort(function(e,t){var n=(new Date(e.publishedDateRaw)).getTime(),r=(new Date(t.publishedDateRaw)).getTime();return r-n});var e=typeof this.settings.entryTemplate=="function"?this.settings.entryTemplate:this.tmpl(this.settings.entryTemplate);for(var t in this.entries){var n=this.entries[t],r=e.call(this,n);this.$element.append(r)}this.settings.onComplete.call(this.$element[0],this.entries)}},tmplCache:{},tmpl:function(t,n){var r=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<!").join("	").replace(/((^|!>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)!>/g,"',typeof $1 != 'undefined' ? $1 : '','").split("	").join("');").split("!>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):this.tmplCache[t]=this.tmplCache[t]||this.tmpl(document.getElementById(t).innerHTML);return n?r(n):r}};return e(this).each(function(){r.init(this,n)})}})(jQuery);


$('#feed').feeds({
    feeds: {
        me: 'http://jordancauley.com/feed.xml'
    },
    entryTemplate: '<!=content!>'
});