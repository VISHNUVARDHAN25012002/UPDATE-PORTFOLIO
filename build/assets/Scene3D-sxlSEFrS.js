import{a as r,j as o}from"./motion-DiqrjmS_.js";import{R as I,u as g,_ as S,M as T,a as P,C as _,A as G,V as A,S as L,b as C,e as V,c as D,d as H,f as $,g as O}from"./extends-qjlYs4YS.js";const W=()=>parseInt(I.replace(/\D+/g,"")),k=W();var Y=`#define GLSLIFY 1
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}`;class B extends T{constructor(t={}){super(t),this.setValues(t),this._time={value:0},this._distort={value:.4},this._radius={value:1}}onBeforeCompile(t){t.uniforms.time=this._time,t.uniforms.radius=this._radius,t.uniforms.distort=this._distort,t.vertexShader=`
      uniform float time;
      uniform float radius;
      uniform float distort;
      ${Y}
      ${t.vertexShader}
    `,t.vertexShader=t.vertexShader.replace("#include <begin_vertex>",`
        float updateTime = time / 50.0;
        float noise = snoise(vec3(position / 2.0 + updateTime * 5.0));
        vec3 transformed = vec3(position * (noise * pow(distort, 2.0) + radius));
        `)}get time(){return this._time.value}set time(t){this._time.value=t}get distort(){return this._distort.value}set distort(t){this._distort.value=t}get radius(){return this._radius.value}set radius(t){this._radius.value=t}}const N=r.forwardRef(({speed:e=1,...t},i)=>{const[s]=r.useState(()=>new B);return g(n=>s&&(s.time=n.clock.elapsedTime*e)),r.createElement("primitive",S({object:s,ref:i,attach:"material"},t))}),q=r.forwardRef(({children:e,enabled:t=!0,speed:i=1,rotationIntensity:s=1,floatIntensity:n=1,floatingRange:c=[-.1,.1],autoInvalidate:a=!1,...f},u)=>{const m=r.useRef(null);r.useImperativeHandle(u,()=>m.current,[]);const p=r.useRef(Math.random()*1e4);return g(b=>{var v,d;if(!t||i===0)return;a&&b.invalidate();const x=p.current+b.clock.elapsedTime;m.current.rotation.x=Math.cos(x/4*i)/8*s,m.current.rotation.y=Math.sin(x/4*i)/8*s,m.current.rotation.z=Math.sin(x/4*i)/20*s;let y=Math.sin(x/4*i)/10;y=P.mapLinear(y,-.1,.1,(v=c==null?void 0:c[0])!==null&&v!==void 0?v:-.1,(d=c==null?void 0:c[1])!==null&&d!==void 0?d:.1),m.current.position.y=y*n,m.current.updateMatrix()}),r.createElement("group",f,r.createElement("group",{ref:m,matrixAutoUpdate:!1},e))});class U extends C{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${k>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const J=e=>new A().setFromSpherical(new L(e,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),K=r.forwardRef(({radius:e=100,depth:t=50,count:i=5e3,saturation:s=0,factor:n=4,fade:c=!1,speed:a=1},f)=>{const u=r.useRef(),[m,p,b]=r.useMemo(()=>{const d=[],x=[],y=Array.from({length:i},()=>(.5+.5*Math.random())*n),w=new _;let j=e+t;const M=t/i;for(let h=0;h<i;h++)j-=M*Math.random(),d.push(...J(j).toArray()),w.setHSL(h/i,s,.9),x.push(w.r,w.g,w.b);return[new Float32Array(d),new Float32Array(x),new Float32Array(y)]},[i,t,n,e,s]);g(d=>u.current&&(u.current.uniforms.time.value=d.clock.elapsedTime*a));const[v]=r.useState(()=>new U);return r.createElement("points",{ref:f},r.createElement("bufferGeometry",null,r.createElement("bufferAttribute",{attach:"attributes-position",args:[m,3]}),r.createElement("bufferAttribute",{attach:"attributes-color",args:[p,3]}),r.createElement("bufferAttribute",{attach:"attributes-size",args:[b,1]})),r.createElement("primitive",{ref:u,object:v,attach:"material",blending:G,"uniforms-fade-value":c,depthWrite:!1,transparent:!0,vertexColors:!0}))});class X extends C{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${k>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(t){this.uniforms.pixelRatio.value=t}}const E=e=>e&&e.constructor===Float32Array,Q=e=>[e.r,e.g,e.b],R=e=>e instanceof H||e instanceof A||e instanceof $,F=e=>Array.isArray(e)?e:R(e)?e.toArray():[e,e,e];function z(e,t,i){return r.useMemo(()=>{if(t!==void 0){if(E(t))return t;if(t instanceof _){const s=Array.from({length:e*3},()=>Q(t)).flat();return Float32Array.from(s)}else if(R(t)||Array.isArray(t)){const s=Array.from({length:e*3},()=>F(t)).flat();return Float32Array.from(s)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},i)},[t])}const Z=r.forwardRef(({noise:e=1,count:t=100,speed:i=1,opacity:s=1,scale:n=1,size:c,color:a,children:f,...u},m)=>{r.useMemo(()=>V({SparklesImplMaterial:X}),[]);const p=r.useRef(null),b=D(h=>h.viewport.dpr),v=F(n),d=r.useMemo(()=>Float32Array.from(Array.from({length:t},()=>v.map(P.randFloatSpread)).flat()),[t,...v]),x=z(t,c,Math.random),y=z(t,s),w=z(t,i),j=z(t*3,e),M=z(a===void 0?t*3:t,E(a)?a:new _(a),()=>1);return g(h=>{p.current&&p.current.material&&(p.current.material.time=h.clock.elapsedTime)}),r.useImperativeHandle(m,()=>p.current,[]),r.createElement("points",S({key:`particle-${t}-${JSON.stringify(n)}`},u,{ref:p}),r.createElement("bufferGeometry",null,r.createElement("bufferAttribute",{attach:"attributes-position",args:[d,3]}),r.createElement("bufferAttribute",{attach:"attributes-size",args:[x,1]}),r.createElement("bufferAttribute",{attach:"attributes-opacity",args:[y,1]}),r.createElement("bufferAttribute",{attach:"attributes-speed",args:[w,1]}),r.createElement("bufferAttribute",{attach:"attributes-color",args:[M,3]}),r.createElement("bufferAttribute",{attach:"attributes-noise",args:[j,3]})),f||r.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:b,depthWrite:!1}))}),l={x:0,y:0,scroll:0,hero:0},ee=new A;typeof window<"u"&&(window.addEventListener("pointermove",e=>{l.x=e.clientX/window.innerWidth*2-1,l.y=-(e.clientY/window.innerHeight)*2+1}),window.addEventListener("scroll",()=>{const e=document.documentElement.scrollHeight-window.innerHeight;l.scroll=e>0?window.scrollY/e:0,l.hero=Math.min(window.scrollY/window.innerHeight,1)},{passive:!0}));function te(){return g(({camera:e},t)=>{const i=1-Math.pow(.001,t);e.position.x+=(l.x*.8-e.position.x)*i,e.position.y+=(l.y*.5-l.scroll*6-e.position.y)*i,e.lookAt(0,-l.scroll*6,0)}),null}function re(){const e=r.useRef(null),t=r.useRef(null),i=r.useRef(null);return g((s,n)=>{const c=s.clock.elapsedTime;if(e.current){const a=e.current.position;a.x+=(2.6+l.hero*3.4-a.x)*.06,a.y+=(.3-l.scroll*6+l.hero*1.2-a.y)*.06}if(t.current){t.current.rotation.x+=n*.12,t.current.rotation.y+=n*.18;const a=1+Math.abs(l.x)*.15;t.current.scale.lerp(ee.setScalar(a),.05)}i.current&&(i.current.rotation.y=-c*.1,i.current.rotation.z=c*.05)}),o.jsxs("group",{ref:e,position:[2.6,.3,-1.5],children:[o.jsxs("mesh",{ref:t,children:[o.jsx("icosahedronGeometry",{args:[1.35,24]}),o.jsx(N,{color:"#10b981",emissive:"#064e3b",emissiveIntensity:.35,roughness:.08,metalness:.9,clearcoat:1,distort:.42,speed:1.6})]}),o.jsxs("mesh",{ref:i,scale:2.15,children:[o.jsx("icosahedronGeometry",{args:[1,1]}),o.jsx("meshBasicMaterial",{color:"#34d399",wireframe:!0,transparent:!0,opacity:.12})]})]})}const oe=[{pos:[-8.6,2.4,-5],color:"#22d3ee",kind:"torus"},{pos:[-8.2,-3.2,-4.5],color:"#f5e6c8",kind:"octa"},{pos:[8.8,-4.6,-5.5],color:"#34d399",kind:"knot"},{pos:[-8.8,-7.4,-5],color:"#34d399",kind:"ico"},{pos:[8.4,-9.6,-4.5],color:"#22d3ee",kind:"octa"},{pos:[-8.4,-12,-5.5],color:"#f5e6c8",kind:"torus"},{pos:[8.6,-14,-5],color:"#34d399",kind:"knot"}];function ie(){return o.jsx(o.Fragment,{children:oe.map((e,t)=>o.jsx(q,{speed:1.2+t*.15,rotationIntensity:1.4,floatIntensity:1.6,children:o.jsxs("mesh",{position:[...e.pos],children:[e.kind==="torus"&&o.jsx("torusGeometry",{args:[.55,.18,24,64]}),e.kind==="octa"&&o.jsx("octahedronGeometry",{args:[.6]}),e.kind==="knot"&&o.jsx("torusKnotGeometry",{args:[.45,.14,128,16]}),e.kind==="ico"&&o.jsx("icosahedronGeometry",{args:[.6]}),o.jsx("meshStandardMaterial",{color:e.color,metalness:.6,roughness:.25,emissive:e.color,emissiveIntensity:.15,wireframe:t%3===1})]})},t))})}function se(){const e=r.useRef(null),t=r.useMemo(()=>{const s=new Float32Array(6600);for(let n=0;n<2200;n++){const c=3+Math.random()*12,a=n%3*(Math.PI*2/3),f=c*.35,u=()=>(Math.random()-.5)*1.6;s[n*3]=Math.cos(a+f)*c+u(),s[n*3+1]=u()*.6-6,s[n*3+2]=Math.sin(a+f)*c+u()-8}return s},[]);return g((i,s)=>{e.current&&(e.current.rotation.y+=s*.03)}),o.jsxs("points",{ref:e,rotation:[.5,0,0],children:[o.jsx("bufferGeometry",{children:o.jsx("bufferAttribute",{attach:"attributes-position",args:[t,3]})}),o.jsx("pointsMaterial",{size:.035,color:"#9ff5d6",transparent:!0,opacity:.7,depthWrite:!1})]})}function ce({reducedMotion:e}){return o.jsx("div",{className:"scene","aria-hidden":"true",children:o.jsxs(O,{camera:{position:[0,0,7],fov:55},dpr:[1,1.6],gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},frameloop:e?"demand":"always",children:[o.jsx("fog",{attach:"fog",args:["#05070d",9,26]}),o.jsx("ambientLight",{intensity:.35}),o.jsx("pointLight",{position:[5,4,4],intensity:40,color:"#34d399"}),o.jsx("pointLight",{position:[-6,-2,2],intensity:30,color:"#22d3ee"}),o.jsx("pointLight",{position:[0,-10,3],intensity:25,color:"#f5e6c8"}),o.jsx(K,{radius:60,depth:40,count:2500,factor:3,saturation:0,fade:!0,speed:e?0:.6}),o.jsx(Z,{count:60,scale:[14,20,6],position:[0,-5,-2],size:2.2,speed:.3,color:"#a7f3d0"}),o.jsx(re,{}),o.jsx(ie,{}),o.jsx(se,{}),!e&&o.jsx(te,{})]})})}export{ce as default};
