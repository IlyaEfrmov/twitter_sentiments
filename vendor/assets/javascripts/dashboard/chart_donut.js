window.Chart=function(e){function u(a,b,c,d){function f(){g+=e;var h=a.animation?q(k(g),null,0):1;d.clearRect(0,0,m,n);a.scaleOverlay?(c(h),b()):(b(),c(h));if(1>=g)r(f);else if("function"==typeof a.onAnimationComplete)a.onAnimationComplete()}var e=a.animation?1/q(a.animationSteps,Number.MAX_VALUE,1):1,k=l[a.animationEasing],g=a.animation?0:1;"function"!==typeof b&&(b=function(){});r(f)}function v(a){return Math.min.apply(Math,a)}function t(a){return!isNaN(parseFloat(a))&&isFinite(a)}function q(a, b,c){return t(b)&&a>b?b:t(c)&&a<c?c:a}var p=this,l={linear:function(a){return a},easeInQuad:function(a){return a*a},easeOutQuad:function(a){return-1*a*(a-2)},easeInOutQuad:function(a){return 1>(a/=.5)?.5*a*a:-.5*(--a*(a-2)-1)},easeInCubic:function(a){return a*a*a},easeOutCubic:function(a){return 1*((a=a/1-1)*a*a+1)},easeInOutCubic:function(a){return 1>(a/=.5)?.5*a*a*a:.5*((a-=2)*a*a+2)},easeInQuart:function(a){return a*a*a*a},easeOutQuart:function(a){return-1*((a=a/1-1)*a*a*a-1)},easeInOutQuart:function(a){return 1> (a/=.5)?.5*a*a*a*a:-.5*((a-=2)*a*a*a-2)},easeInQuint:function(a){return 1*(a/=1)*a*a*a*a},easeOutQuint:function(a){return 1*((a=a/1-1)*a*a*a*a+1)},easeInOutQuint:function(a){return 1>(a/=.5)?.5*a*a*a*a*a:.5*((a-=2)*a*a*a*a+2)},easeInSine:function(a){return-1*Math.cos(a/1*(Math.PI/2))+1},easeOutSine:function(a){return 1*Math.sin(a/1*(Math.PI/2))},easeInOutSine:function(a){return-.5*(Math.cos(Math.PI*a/1)-1)},easeInExpo:function(a){return 0==a?1:1*Math.pow(2,10*(a/1-1))},easeOutExpo:function(a){return 1== a?1:1*(-Math.pow(2,-10*a/1)+1)},easeInOutExpo:function(a){return 0==a?0:1==a?1:1>(a/=.5)?.5*Math.pow(2,10*(a-1)):.5*(-Math.pow(2,-10*--a)+2)},easeInCirc:function(a){return 1<=a?a:-1*(Math.sqrt(1-(a/=1)*a)-1)},easeOutCirc:function(a){return 1*Math.sqrt(1-(a=a/1-1)*a)},easeInOutCirc:function(a){return 1>(a/=.5)?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)},easeInElastic:function(a){var b=1.70158,c=0,d=1;if(0==a)return 0;if(1==(a/=1))return 1;c||(c=.3);d<Math.abs(1)?(d=1,b=c/4):b=c/(2*Math.PI)* Math.asin(1/d);return-(d*Math.pow(2,10*--a)*Math.sin(2*(1*a-b)*Math.PI/c))},easeOutElastic:function(a){var b=1.70158,c=0,d=1;if(0==a)return 0;if(1==(a/=1))return 1;c||(c=.3);d<Math.abs(1)?(d=1,b=c/4):b=c/(2*Math.PI)*Math.asin(1/d);return d*Math.pow(2,-10*a)*Math.sin(2*(1*a-b)*Math.PI/c)+1},easeInOutElastic:function(a){var b=1.70158,c=0,d=1;if(0==a)return 0;if(2==(a/=.5))return 1;c||(c=.3*1.5);d<Math.abs(1)?(d=1,b=c/4):b=c/(2*Math.PI)*Math.asin(1/d);return 1>a?-.5*d*Math.pow(2,10*--a)*Math.sin(2*(1* a-b)*Math.PI/c):d*Math.pow(2,-10*--a)*Math.sin(2*(1*a-b)*Math.PI/c)*.5+1},easeInBack:function(a){return 1*(a/=1)*a*(2.70158*a-1.70158)},easeOutBack:function(a){return 1*((a=a/1-1)*a*(2.70158*a+1.70158)+1)},easeInOutBack:function(a){var b=1.70158;return 1>(a/=.5)?.5*a*a*(((b*=1.525)+1)*a-b):.5*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},easeInBounce:function(a){return 1-l.easeOutBounce(1-a)},easeOutBounce:function(a){return(a/=1)<1/2.75?7.5625*a*a:a<2/2.75?1*(7.5625*(a-=1.5/2.75)*a+.75):a<2.5/2.75?1*(7.5625* (a-=2.25/2.75)*a+.9375):1*(7.5625*(a-=2.625/2.75)*a+.984375)},easeInOutBounce:function(a){return.5>a?.5*l.easeInBounce(2*a):.5*l.easeOutBounce(2*a-1)+.5}},m=e.canvas.width,n=e.canvas.height;window.devicePixelRatio&&(e.canvas.style.width=m+"px",e.canvas.style.height=n+"px",e.canvas.height=n*window.devicePixelRatio,e.canvas.width=m*window.devicePixelRatio,e.scale(window.devicePixelRatio,window.devicePixelRatio));this.Doughnut=function(a,b){p.Doughnut.defaults={segmentShowStroke:!0,segmentStrokeColor:"#fff", segmentStrokeWidth:2,percentageInnerCutout:50,animation:!0,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,onAnimationComplete:null,labelFontFamily:"Arial",labelFontStyle:"normal",labelFontSize:"24px",labelFontColor:"#666",showTextInside:!1,doughnutText:"",degreeStart:-90,counterClockwise:!1};var c;if(b){c=p.Doughnut.defaults;var d={},f;for(f in c)d[f]=c[f];for(f in b)d[f]=b[f];c=d}else c=p.Doughnut.defaults;return new w(a,c,e)};var w=function(a,b,c){for(var d= 0,f=v([n/2,m/2])-5,e=b.percentageInnerCutout/100*f,k=0;k<a.length;k++)d+=a[k].value;u(b,null,function(g){!0===b.showTextInside&&(c.font=b.labelFontStyle+" "+b.labelFontSize+" "+b.labelFontFamily,c.fillStyle=b.labelFontColor,c.textBaseline="middle",""!=b.doughnutText&&c.fillText(b.doughnutText,m/2-b.labelFontOffset,m/2,200));var h;h=radians=b.degreeStart*Math.PI/180;rotateAnimation=scaleAnimation=1;b.animation&&(b.animateScale&&(scaleAnimation=g),b.animateRotate&&(rotateAnimation=g));g=b.counterClockwise; for(var k=0;k<a.length;k++){var l=a[k].value/d*rotateAnimation*2*Math.PI;c.beginPath();c.arc(m/2,n/2,scaleAnimation*f,h,h+l,g);c.arc(m/2,n/2,scaleAnimation*e,h+l,h,!g);c.closePath();c.fillStyle=a[k].color;c.fill();b.segmentShowStroke&&(c.lineWidth=b.segmentStrokeWidth,c.strokeStyle=b.segmentStrokeColor,c.stroke());h=!0===g?h-l:h+l}},c)},r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame|| function(a){window.setTimeout(a,1E3/60)}}()};