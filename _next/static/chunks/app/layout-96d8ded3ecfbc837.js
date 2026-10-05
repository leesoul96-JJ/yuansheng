(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{1743:()=>{},3661:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});var i=r(5155),a=r(2115);let n=(0,a.memo)(function(){let e=(0,a.useRef)(null),t=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let r=e.current,i=t.current;if(!r)return;let a=r.getContext("2d");if(!a)return;let n=[],o={x:-9999,y:-9999,previousX:-9999,previousY:-9999,speed:0},l=0,s=0,c=0,d=0,u=()=>{let e=Math.min(window.devicePixelRatio||1,1.5);l=window.innerWidth,s=window.innerHeight,r.width=Math.floor(l*e),r.height=Math.floor(s*e),a.setTransform(e,0,0,e,0,0),n.length=0;let t=l<700?21:25;for(let e=t/2;e<s;e+=t)for(let r=t/2;r<l;r+=t)n.push({ax:r,ay:e,x:r,y:e})},f=e=>{o.x=e.clientX,o.y=e.clientY},h=e=>{let t=Math.min(o.speed/8,1);a.clearRect(0,0,l,s),a.fillStyle="rgba(151, 195, 220, .25)",a.beginPath();let r=l<700?180:260;for(let e of n){let i=Math.hypot(o.x-e.ax,o.y-e.ay),n=i<r?(1-i/r)**2*t:0;e.x+=(e.ax-(o.x-e.ax)*n*.42-e.x)*.12,e.y+=(e.ay-(o.y-e.ay)*n*.42-e.y)*.12;let l=.7+1.7*n;a.moveTo(e.x+l,e.y),a.arc(e.x,e.y,l,0,2*Math.PI)}a.fill(),i&&(i.setAttribute("cx",String(o.x)),i.setAttribute("cy",String(o.y)),i.style.opacity=String(.45*t)),c=requestAnimationFrame(h)};return u(),window.addEventListener("resize",u),window.addEventListener("mousemove",f,{passive:!0}),d=window.setInterval(()=>{let e=o.x-o.previousX,t=o.y-o.previousY;o.speed+=(Math.hypot(e,t)-o.speed)*.5,o.previousX=o.x,o.previousY=o.y},24),c=requestAnimationFrame(h),()=>{cancelAnimationFrame(c),window.clearInterval(d),window.removeEventListener("resize",u),window.removeEventListener("mousemove",f)}},[]),(0,i.jsxs)("div",{className:"dot-field","aria-hidden":"true",children:[(0,i.jsx)("canvas",{ref:e}),(0,i.jsxs)("svg",{children:[(0,i.jsx)("defs",{children:(0,i.jsxs)("radialGradient",{id:"dot-field-glow",children:[(0,i.jsx)("stop",{offset:"0%",stopColor:"#7dd3fc",stopOpacity:".18"}),(0,i.jsx)("stop",{offset:"100%",stopColor:"#8b5cf6",stopOpacity:"0"})]})}),(0,i.jsx)("circle",{ref:t,cx:"-9999",cy:"-9999",r:"170",fill:"url(#dot-field-glow)"})]})]})});n.displayName="DotField";let o=n},5041:()=>{},5044:(e,t,r)=>{Promise.resolve().then(r.bind(r,7194)),Promise.resolve().then(r.t.bind(r,1743,23)),Promise.resolve().then(r.t.bind(r,5041,23)),Promise.resolve().then(r.bind(r,3661)),Promise.resolve().then(r.bind(r,6982)),Promise.resolve().then(r.bind(r,7219))},6982:(e,t,r)=>{"use strict";r.d(t,{default:()=>s});var i=r(5155),a=r(2115);let n=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,o=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
out vec4 fragColor;

const float TAU = 6.28318530718;

vec3 oklch(float L, float C, float h) {
  float a = C * cos(h), b = C * sin(h);
  float l = L + 0.3963377774 * a + 0.2158037573 * b;
  float m = L - 0.1055613458 * a - 0.0638541728 * b;
  float s = L - 0.0894841775 * a - 1.2914855480 * b;
  vec3 v = vec3(l * l * l, m * m * m, s * s * s);
  return mat3(4.0767416621, -1.2684380046, -0.0041960863,
              -3.3077115913, 2.6097574011, -0.7034186147,
              0.2309699292, -0.3413193965, 1.7076147010) * v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;
  float t = iTime * .19;
  vec2 p = uv - vec2(-.32, .04);
  float breath = sin(iTime * .22) * .045;
  float c = cos(-1.12), s = sin(-1.12);
  p = mat2(c, s, -s, c) * p * (1.0 + breath);
  vec3 field = vec3(0.0);

  for (float layer = 1.0; layer <= 56.0; layer++) {
    p.x += sin(p.y * .72 + t + layer * .018) * .13;
    p.y += sin(p.x * 2.35 - t + layer * .025) * .033;
    p = mat2(-.51, .86, -.93, -.51) * p * .955;
    vec2 q = p - vec2(.38 + breath, .03);
    vec2 oval = vec2(q.x * 2.02, q.y * .19);
    float glow = .0027 / (dot(oval, oval) + .0028);
    float echo = .001 / (dot(vec2((q.x + .19) * 2.02, oval.y), vec2((q.x + .19) * 2.02, oval.y)) + .0028);
    float wave = sin(layer * .164 + t * 1.2 + length(p) * 2.58) * .5 + .5;
    float hue = mix(.46, .82, wave) * TAU;
    vec3 tint = clamp(oklch(.52 + wave * .2, .12, hue), 0.0, 1.0);
    field += (glow + echo * .36) * tint * exp2(-length(p) * .42);
  }
  field = (field * (2.51 * field + .03)) / (field * (2.43 * field + .59) + .14);
  field = pow(clamp(field, 0.0, 1.0), vec3(.88, .94, 1.0));
  float vignette = smoothstep(.5, 1.55, length(uv));
  vec3 base = vec3(.008, .01, .018);
  // Keep the light field atmospheric; content remains the visual priority.
  fragColor = vec4(base + field * .22 * (1.0 - vignette * .72), 1.0);
}`;function l(e,t,r){let i=e.createShader(t);if(!i)throw Error("Unable to create a WebGL shader.");if(e.shaderSource(i,r),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(i)??"Shader compilation failed.");return i}function s(){let e=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=e.current,r=t?.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1});if(!t||!r)return;let i=r.createProgram();if(!i)return;let a=l(r,r.VERTEX_SHADER,n),s=l(r,r.FRAGMENT_SHADER,o);if(r.attachShader(i,a),r.attachShader(i,s),r.linkProgram(i),!r.getProgramParameter(i,r.LINK_STATUS))return;r.useProgram(i);let c=r.getUniformLocation(i,"iResolution"),d=r.getUniformLocation(i,"iTime"),u=window.matchMedia("(prefers-reduced-motion: reduce)"),f=0,h=performance.now(),v=e=>{let i=Math.min(window.devicePixelRatio||1,1.5),a=Math.min(1800,Math.max(1,Math.floor(window.innerWidth*i))),n=Math.min(1200,Math.max(1,Math.floor(window.innerHeight*i)));(t.width!==a||t.height!==n)&&(t.width=a,t.height=n),r.viewport(0,0,a,n),r.uniform2f(c,a,n),r.uniform1f(d,(e-h)/1e3),r.drawArrays(r.TRIANGLES,0,3),u.matches||document.hidden||(f=requestAnimationFrame(v))},m=()=>{cancelAnimationFrame(f),v(h=performance.now())};return document.addEventListener("visibilitychange",m),window.addEventListener("resize",m),u.addEventListener("change",m),v(h),()=>{cancelAnimationFrame(f),document.removeEventListener("visibilitychange",m),window.removeEventListener("resize",m),u.removeEventListener("change",m),r.deleteProgram(i),r.deleteShader(a),r.deleteShader(s)}},[]),(0,i.jsx)("canvas",{ref:e,className:"field-background","aria-hidden":"true"})}},7194:(e,t,r)=>{"use strict";r.d(t,{ReactLenis:()=>s});var i=r(5792),a=r(2115),n=r(5155);let o=(0,a.createContext)(null),l=new class{constructor(e){this.listeners=[],this.state=e}set(e){for(let t of(this.state=e,this.listeners))t(this.state)}subscribe(e){return this.listeners=[...this.listeners,e],()=>{this.listeners=this.listeners.filter(t=>t!==e)}}get(){return this.state}}(null),s=(0,a.forwardRef)(({children:e,root:t=!1,options:r={},autoRaf:s=!0,className:c="",...d},u)=>{let f=(0,a.useRef)(null),h=(0,a.useRef)(null),[v,m]=(0,a.useState)(void 0);(0,a.useImperativeHandle)(u,()=>({wrapper:f.current,content:h.current,lenis:v}),[v]),(0,a.useEffect)(()=>{let e=new i.A({...r,...f.current&&h.current&&{wrapper:f.current,content:h.current},autoRaf:r?.autoRaf??s});return m(e),()=>{e.destroy(),m(void 0)}},[s,JSON.stringify({...r,wrapper:null,content:null})]);let p=(0,a.useRef)([]),y=(0,a.useCallback)((e,t)=>{p.current.push({callback:e,priority:t}),p.current.sort((e,t)=>e.priority-t.priority)},[]),x=(0,a.useCallback)(e=>{p.current=p.current.filter(t=>t.callback!==e)},[]);return((0,a.useEffect)(()=>{if(t&&v)return l.set({lenis:v,addCallback:y,removeCallback:x}),()=>l.set(null)},[t,v,y,x]),(0,a.useEffect)(()=>{if(!v)return;let e=e=>{for(let{callback:t}of p.current)t(e)};return v.on("scroll",e),()=>{v.off("scroll",e)}},[v]),e)?(0,n.jsx)(o.Provider,{value:{lenis:v,addCallback:y,removeCallback:x},children:t&&"asChild"!==t?e:(0,n.jsx)("div",{ref:f,className:`${c} ${v?.className??""}`.trim(),...d,children:(0,n.jsx)("div",{ref:h,children:e})})}):null})},7219:(e,t,r)=>{"use strict";r.d(t,{default:()=>n});var i=r(5155),a=r(2115);function n(){let e=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=e.current;if(!t||window.matchMedia("(pointer: coarse)").matches)return;let r=Array.from({length:16},()=>({x:-100,y:-100})),i={x:-100,y:-100},a=0,n=!1,o=e=>{i={x:e.clientX,y:e.clientY},n=!0,t.dataset.active="true"},l=()=>{n=!1,t.dataset.active="false"},s=()=>{r[0].x+=(i.x-r[0].x)*.28,r[0].y+=(i.y-r[0].y)*.28;for(let e=1;e<r.length;e+=1)r[e].x+=(r[e-1].x-r[e].x)*(.22-.006*e),r[e].y+=(r[e-1].y-r[e].y)*(.22-.006*e);t.style.setProperty("--cursor-x",`${r[0].x}px`),t.style.setProperty("--cursor-y",`${r[0].y}px`),t.style.setProperty("--cursor-opacity",n?"1":"0"),t.querySelectorAll("[data-trail]").forEach((e,t)=>{let i=r[t+2];e.style.transform=`translate(${i.x}px, ${i.y}px) translate(-50%, -50%) scale(${1-.045*t})`,e.style.opacity=`${.72-.04*t}`}),a=requestAnimationFrame(s)};return window.addEventListener("pointermove",o,{passive:!0}),document.documentElement.addEventListener("mouseleave",l),a=requestAnimationFrame(s),()=>{cancelAnimationFrame(a),window.removeEventListener("pointermove",o),document.documentElement.removeEventListener("mouseleave",l)}},[]),(0,i.jsx)("div",{ref:e,className:"glow-cursor","data-active":"false","aria-hidden":"true",children:Array.from({length:10},(e,t)=>(0,i.jsx)("i",{"data-trail":!0},t))})}}},e=>{e.O(0,[63,411,441,794,358],()=>e(e.s=5044)),_N_E=e.O()}]);