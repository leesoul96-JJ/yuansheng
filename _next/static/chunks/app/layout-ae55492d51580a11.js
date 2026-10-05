(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{1743:()=>{},5041:()=>{},6982:(e,t,r)=>{"use strict";r.d(t,{default:()=>s});var a=r(5155),i=r(2115);let n=`#version 300 es
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
}`;function l(e,t,r){let a=e.createShader(t);if(!a)throw Error("Unable to create a WebGL shader.");if(e.shaderSource(a,r),e.compileShader(a),!e.getShaderParameter(a,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(a)??"Shader compilation failed.");return a}function s(){let e=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t=e.current,r=t?.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1});if(!t||!r)return;let a=r.createProgram();if(!a)return;let i=l(r,r.VERTEX_SHADER,n),s=l(r,r.FRAGMENT_SHADER,o);if(r.attachShader(a,i),r.attachShader(a,s),r.linkProgram(a),!r.getProgramParameter(a,r.LINK_STATUS))return;r.useProgram(a);let c=r.getUniformLocation(a,"iResolution"),u=r.getUniformLocation(a,"iTime"),f=window.matchMedia("(prefers-reduced-motion: reduce)"),d=0,h=performance.now(),m=e=>{let a=Math.min(window.devicePixelRatio||1,1.5),i=Math.min(1800,Math.max(1,Math.floor(window.innerWidth*a))),n=Math.min(1200,Math.max(1,Math.floor(window.innerHeight*a)));(t.width!==i||t.height!==n)&&(t.width=i,t.height=n),r.viewport(0,0,i,n),r.uniform2f(c,i,n),r.uniform1f(u,(e-h)/1e3),r.drawArrays(r.TRIANGLES,0,3),f.matches||document.hidden||(d=requestAnimationFrame(m))},v=()=>{cancelAnimationFrame(d),m(h=performance.now())};return document.addEventListener("visibilitychange",v),window.addEventListener("resize",v),f.addEventListener("change",v),m(h),()=>{cancelAnimationFrame(d),document.removeEventListener("visibilitychange",v),window.removeEventListener("resize",v),f.removeEventListener("change",v),r.deleteProgram(a),r.deleteShader(i),r.deleteShader(s)}},[]),(0,a.jsx)("canvas",{ref:e,className:"field-background","aria-hidden":"true"})}},7194:(e,t,r)=>{"use strict";r.d(t,{ReactLenis:()=>s});var a=r(5792),i=r(2115),n=r(5155);let o=(0,i.createContext)(null),l=new class{constructor(e){this.listeners=[],this.state=e}set(e){for(let t of(this.state=e,this.listeners))t(this.state)}subscribe(e){return this.listeners=[...this.listeners,e],()=>{this.listeners=this.listeners.filter(t=>t!==e)}}get(){return this.state}}(null),s=(0,i.forwardRef)(({children:e,root:t=!1,options:r={},autoRaf:s=!0,className:c="",...u},f)=>{let d=(0,i.useRef)(null),h=(0,i.useRef)(null),[m,v]=(0,i.useState)(void 0);(0,i.useImperativeHandle)(f,()=>({wrapper:d.current,content:h.current,lenis:m}),[m]),(0,i.useEffect)(()=>{let e=new a.A({...r,...d.current&&h.current&&{wrapper:d.current,content:h.current},autoRaf:r?.autoRaf??s});return v(e),()=>{e.destroy(),v(void 0)}},[s,JSON.stringify({...r,wrapper:null,content:null})]);let p=(0,i.useRef)([]),y=(0,i.useCallback)((e,t)=>{p.current.push({callback:e,priority:t}),p.current.sort((e,t)=>e.priority-t.priority)},[]),g=(0,i.useCallback)(e=>{p.current=p.current.filter(t=>t.callback!==e)},[]);return((0,i.useEffect)(()=>{if(t&&m)return l.set({lenis:m,addCallback:y,removeCallback:g}),()=>l.set(null)},[t,m,y,g]),(0,i.useEffect)(()=>{if(!m)return;let e=e=>{for(let{callback:t}of p.current)t(e)};return m.on("scroll",e),()=>{m.off("scroll",e)}},[m]),e)?(0,n.jsx)(o.Provider,{value:{lenis:m,addCallback:y,removeCallback:g},children:t&&"asChild"!==t?e:(0,n.jsx)("div",{ref:d,className:`${c} ${m?.className??""}`.trim(),...u,children:(0,n.jsx)("div",{ref:h,children:e})})}):null})},7219:(e,t,r)=>{"use strict";r.d(t,{default:()=>n});var a=r(5155),i=r(2115);function n(){let e=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t=e.current;if(!t||window.matchMedia("(pointer: coarse)").matches)return;let r=Array.from({length:16},()=>({x:-100,y:-100})),a={x:-100,y:-100},i=0,n=!1,o=e=>{a={x:e.clientX,y:e.clientY},n=!0,t.dataset.active="true"},l=()=>{n=!1,t.dataset.active="false"},s=()=>{r[0].x+=(a.x-r[0].x)*.28,r[0].y+=(a.y-r[0].y)*.28;for(let e=1;e<r.length;e+=1)r[e].x+=(r[e-1].x-r[e].x)*(.22-.006*e),r[e].y+=(r[e-1].y-r[e].y)*(.22-.006*e);t.style.setProperty("--cursor-x",`${r[0].x}px`),t.style.setProperty("--cursor-y",`${r[0].y}px`),t.style.setProperty("--cursor-opacity",n?"1":"0"),t.querySelectorAll("[data-trail]").forEach((e,t)=>{let a=r[t+2];e.style.transform=`translate(${a.x}px, ${a.y}px) translate(-50%, -50%) scale(${1-.045*t})`,e.style.opacity=`${.72-.04*t}`}),i=requestAnimationFrame(s)};return window.addEventListener("pointermove",o,{passive:!0}),document.documentElement.addEventListener("mouseleave",l),i=requestAnimationFrame(s),()=>{cancelAnimationFrame(i),window.removeEventListener("pointermove",o),document.documentElement.removeEventListener("mouseleave",l)}},[]),(0,a.jsx)("div",{ref:e,className:"glow-cursor","data-active":"false","aria-hidden":"true",children:Array.from({length:10},(e,t)=>(0,a.jsx)("i",{"data-trail":!0},t))})}},7833:(e,t,r)=>{Promise.resolve().then(r.bind(r,7194)),Promise.resolve().then(r.t.bind(r,1743,23)),Promise.resolve().then(r.t.bind(r,5041,23)),Promise.resolve().then(r.bind(r,6982)),Promise.resolve().then(r.bind(r,7219))}},e=>{e.O(0,[63,411,441,794,358],()=>e(e.s=7833)),_N_E=e.O()}]);