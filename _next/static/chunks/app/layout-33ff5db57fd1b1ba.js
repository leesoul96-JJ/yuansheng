(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{1743:()=>{},5041:()=>{},6982:(e,t,r)=>{"use strict";r.d(t,{default:()=>s});var i=r(5155),a=r(2115);let n=`#version 300 es
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
}`;function l(e,t,r){let i=e.createShader(t);if(!i)throw Error("Unable to create a WebGL shader.");if(e.shaderSource(i,r),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(i)??"Shader compilation failed.");return i}function s(){let e=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=e.current,r=t?.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1});if(!t||!r)return;let i=r.createProgram();if(!i)return;let a=l(r,r.VERTEX_SHADER,n),s=l(r,r.FRAGMENT_SHADER,o);if(r.attachShader(i,a),r.attachShader(i,s),r.linkProgram(i),!r.getProgramParameter(i,r.LINK_STATUS))return;r.useProgram(i);let c=r.getUniformLocation(i,"iResolution"),f=r.getUniformLocation(i,"iTime"),u=window.matchMedia("(prefers-reduced-motion: reduce)"),h=0,d=performance.now(),v=e=>{let i=Math.min(window.devicePixelRatio||1,1.5),a=Math.min(1800,Math.max(1,Math.floor(window.innerWidth*i))),n=Math.min(1200,Math.max(1,Math.floor(window.innerHeight*i)));(t.width!==a||t.height!==n)&&(t.width=a,t.height=n),r.viewport(0,0,a,n),r.uniform2f(c,a,n),r.uniform1f(f,(e-d)/1e3),r.drawArrays(r.TRIANGLES,0,3),u.matches||document.hidden||(h=requestAnimationFrame(v))},m=()=>{cancelAnimationFrame(h),v(d=performance.now())};return document.addEventListener("visibilitychange",m),window.addEventListener("resize",m),u.addEventListener("change",m),v(d),()=>{cancelAnimationFrame(h),document.removeEventListener("visibilitychange",m),window.removeEventListener("resize",m),u.removeEventListener("change",m),r.deleteProgram(i),r.deleteShader(a),r.deleteShader(s)}},[]),(0,i.jsx)("canvas",{ref:e,className:"field-background","aria-hidden":"true"})}},7194:(e,t,r)=>{"use strict";r.d(t,{ReactLenis:()=>s});var i=r(5792),a=r(2115),n=r(5155);let o=(0,a.createContext)(null),l=new class{constructor(e){this.listeners=[],this.state=e}set(e){for(let t of(this.state=e,this.listeners))t(this.state)}subscribe(e){return this.listeners=[...this.listeners,e],()=>{this.listeners=this.listeners.filter(t=>t!==e)}}get(){return this.state}}(null),s=(0,a.forwardRef)(({children:e,root:t=!1,options:r={},autoRaf:s=!0,className:c="",...f},u)=>{let h=(0,a.useRef)(null),d=(0,a.useRef)(null),[v,m]=(0,a.useState)(void 0);(0,a.useImperativeHandle)(u,()=>({wrapper:h.current,content:d.current,lenis:v}),[v]),(0,a.useEffect)(()=>{let e=new i.A({...r,...h.current&&d.current&&{wrapper:h.current,content:d.current},autoRaf:r?.autoRaf??s});return m(e),()=>{e.destroy(),m(void 0)}},[s,JSON.stringify({...r,wrapper:null,content:null})]);let p=(0,a.useRef)([]),g=(0,a.useCallback)((e,t)=>{p.current.push({callback:e,priority:t}),p.current.sort((e,t)=>e.priority-t.priority)},[]),w=(0,a.useCallback)(e=>{p.current=p.current.filter(t=>t.callback!==e)},[]);return((0,a.useEffect)(()=>{if(t&&v)return l.set({lenis:v,addCallback:g,removeCallback:w}),()=>l.set(null)},[t,v,g,w]),(0,a.useEffect)(()=>{if(!v)return;let e=e=>{for(let{callback:t}of p.current)t(e)};return v.on("scroll",e),()=>{v.off("scroll",e)}},[v]),e)?(0,n.jsx)(o.Provider,{value:{lenis:v,addCallback:g,removeCallback:w},children:t&&"asChild"!==t?e:(0,n.jsx)("div",{ref:h,className:`${c} ${v?.className??""}`.trim(),...f,children:(0,n.jsx)("div",{ref:d,children:e})})}):null})},9992:(e,t,r)=>{Promise.resolve().then(r.bind(r,7194)),Promise.resolve().then(r.t.bind(r,1743,23)),Promise.resolve().then(r.t.bind(r,5041,23)),Promise.resolve().then(r.bind(r,6982))}},e=>{e.O(0,[63,411,441,794,358],()=>e(e.s=9992)),_N_E=e.O()}]);