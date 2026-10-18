// NOTE: caption says "0.8 increase" but the scale spans 8.10 to 7.00 (1.1). Flagged for the author to verify against the source.
// The even day-to-pH mapping below is illustrative; replace PH/day mapping with real data when available.
var PH=[8.10,8.04,7.98,7.93,7.87,7.81,7.75,7.69,7.64,7.58,7.52,7.46,7.41,7.35,7.29,7.23,7.17,7.12,7.06,7.00],N=20;
var COL=[[1,65,175],[0,126,223],[0,168,230],[0,209,232],[66,229,238],[157,245,247],[192,252,252],[191,249,250],[197,245,205],[200,192,93],[252,147,82],[247,165,29],[246,125,20],[211,75,85],[246,61,77],[223,0,1],[223,0,1],[185,1,1],[56,2,25],[25,6,28]];
var YS=[183,238,292,346,400,454,508,562,616,669,722,776,830,884,938,992,1046,1100,1153,1215];
var $=function(i){return document.getElementById(i)};
var cv=$("cv"),ctx=cv.getContext("2d"),img=new Image(),base,lab,X0=40,Y0=1010,W=980,H=790,hs=[];
YS.forEach(function(y,i){var b=document.createElement("button");b.type="button";b.className="hs";b.style.top=(y/1307*100)+"%";b.setAttribute("aria-label","pH "+PH[i].toFixed(2));b.onclick=function(){set(Math.round(i/(N-1)*45))};$("info").appendChild(b);hs.push(b)});
img.onload=function(){
  cv.width=img.width;cv.height=img.height;ctx.drawImage(img,0,0);base=ctx.getImageData(0,0,img.width,img.height);
  var d=base.data,w=img.width,L=new Int8Array(W*H).fill(-1),x,y,i,j;
  for(y=0;y<H;y++)for(x=0;x<W;x++){var p=((y+Y0)*w+x+X0)*4,best=-1,bd=676;for(i=0;i<N;i++){var dr=d[p]-COL[i][0],dg=d[p+1]-COL[i][1],db=d[p+2]-COL[i][2],q=dr*dr+dg*dg+db*db;if(q<bd){bd=q;best=i}}L[y*W+x]=best}
  var L2=L.slice();for(y=2;y<H-2;y++)for(x=2;x<W-2;x++){if(L[y*W+x]>=0)continue;var p=((y+Y0)*w+x+X0)*4;if(d[p]+d[p+1]+d[p+2]<140)continue;var c=0,cnt={},m=-1,mc=0;for(j=-2;j<=2;j++)for(i=-2;i<=2;i++){var v=L[(y+j)*W+x+i];if(v>=0){c++;cnt[v]=(cnt[v]||0)+1;if(cnt[v]>mc){mc=cnt[v];m=v}}}if(c>=11)L2[y*W+x]=m}lab=L2;set(45);
};
img.src="../assets/sagarm/infographic.jpg";
function paint(k){var o=new ImageData(new Uint8ClampedArray(base.data),base.width,base.height),d=o.data,w=base.width,x,y;for(y=0;y<H;y++)for(x=0;x<W;x++){var l=lab[y*W+x];if(l>k){var p=((y+Y0)*w+x+X0)*4;d[p]=d[p]*.2+44*.8;d[p+1]=d[p+1]*.2+112*.8;d[p+2]=d[p+2]*.2+140*.8}}ctx.putImageData(o,0,0)}
function set(dv){dv=+dv;var ph=8.10-dv/45*1.10,k=0;for(var i=0;i<N;i++)if(PH[i]>=ph-1e-9)k=i;if(base)paint(k);hs.forEach(function(b,i){b.classList.toggle("off",i>k);b.classList.toggle("sel",i===k)});$("day").value=dv;$("dv").textContent=dv;$("pv").textContent=ph.toFixed(2);$("slider-ph").textContent="pH "+ph.toFixed(2);$("bubble").classList.toggle("on",dv>=40);target=dv/45;go()}
var route=$("route"),RL=route.getTotalLength(),FN=14,fs=[],cur=0,target=1,raf=0,SNS="http://www.w3.org/2000/svg";for(var fi=0;fi<FN;fi++){var g=document.createElementNS(SNS,"path");g.setAttribute("d","M0 0C5-6 14-6 20 0C14 6 5 6 0 0ZM-1 0L-8-5V5Z");g.setAttribute("fill","#4b3f4c");g.style.display="none";$("fish").appendChild(g);fs.push(g)}
function draw(){fs.forEach(function(g,i){var a=i/FN*.6,t=Math.min(1,Math.max(0,(cur-a)/.35))*(1-.8*i/FN);if(t<=0){g.style.display="none";return}var L=t*RL,p=route.getPointAtLength(L),q=route.getPointAtLength(Math.min(RL,L+2)),ang=Math.atan2(q.y-p.y,q.x-p.x),off=(i%3-1)*7+Math.sin(cur*30+i)*2.5;g.style.display="";g.setAttribute("opacity",Math.min(1,t*10));g.setAttribute("transform","translate("+(p.x-Math.sin(ang)*off)+" "+(p.y+Math.cos(ang)*off)+") rotate("+(ang*180/Math.PI)+") scale("+(1.1+.5*(i%4)/3)+")")})}
function go(){cancelAnimationFrame(raf);if(matchMedia("(prefers-reduced-motion: reduce)").matches){cur=target;draw();return}(function step(){cur+=(target-cur)*.12;if(Math.abs(target-cur)<.002)cur=target;draw();if(cur!==target)raf=requestAnimationFrame(step)})()}
var timer=null;function stop(){clearInterval(timer);timer=null;$("play").textContent="▶ Play"}
$("play").onclick=function(){if(timer){stop();return}if(matchMedia("(prefers-reduced-motion: reduce)").matches){set(45);return}if(+$('day').value>=45)set(0);$("play").textContent="Ⅱ Pause";timer=setInterval(function(){var v=+$('day').value+1;set(v);if(v>=45)stop()},160)};
$("day").oninput=function(){stop();set(this.value)};$("hours").oninput=function(){$("hrs").textContent=this.value;$("co2").textContent=(2047*this.value).toLocaleString("en-US")};
