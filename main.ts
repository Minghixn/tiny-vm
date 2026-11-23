import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
import{join}from"node:path";
const Q="#4d')-.2!!!!!!!!,,,,,,,(,,,(,,,!,,,!!!!!!!!!!!!!CGGC#!!!!!!!!!!!(+!!!!!!!!!!!!!!''$'";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const d of readdirSync(I).sort()){
const P=readFileSync(join(I,d,"program.bin")),N=readFileSync(join(I,d,"input.bin")),L=P.length;
const S=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),U=[];
let p=0,s=0,c=0,q=0,t=0,e=0;
X:for(;;){
if(t>=1e6){e=10;break}
if(p<0||p>=L){e=9;break}
const o=P[p],k=Q.charCodeAt(o)-35;
if(!(k>=0&&k<=79)){e=5;break}
const g=k>>4,w=k>>2&3,v=k&3;
if(p+g>=L){e=9;break}
t++;
const n=p+1+g;
if(s<w){e=2;break}
if(s-w+v>256){e=3;break}
p=n;
if(o>=16&&o<=34&&o!=23&&o!=27){
const b=S[s-1],a=S[s-2];
if(o>=19&&o<=22&&!b){e=4;break X}
const r=o==16?a+b|0:o==17?a-b|0:o==18?Math.imul(a,b):o==19?(a/b)|0:o==20?a%b|0:o==21?(a>>>0)/(b>>>0)|0:o==22?(a>>>0)%(b>>>0)|0:o==24?a&b:o==25?a|b:o==26?a^b:o==28?a<<(b&31):o==29?a>>(b&31):o==30?(a>>>(b&31))|0:o==32?a==b?1:0:o==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
s-=2;S[s++]=r;continue X;
}
switch(o){
case 0:e=0;break X;
case 1:S[s++]=(P[n-1]<<24)>>24;break;
case 2:S[s++]=P[n-4]|P[n-3]<<8|P[n-2]<<16|P[n-1]<<24;break;
case 3:s--;break;
case 4:S[s]=S[s-1];s++;break;
case 5:[S[s-1],S[s-2]]=[S[s-2],S[s-1]];break;
case 6:S[s]=S[s-2];s++;break;
case 7:[S[s-3],S[s-2],S[s-1]]=[S[s-2],S[s-1],S[s-3]];break;
case 23:case 27:S[s-1]=o==23?-S[s-1]|0:~S[s-1];break;
case 48:case 49:case 50:{const r=((P[n-2]|P[n-1]<<8)<<16)>>16;let f=o==48;if(o!=48){const y=S[--s];f=o==49?y==0:y!=0}if(f)p=n+r;break}
case 51:if(c==64){e=7;break X}C[c++]=n;p=P[n-2]|P[n-1]<<8;break;
case 52:if(!c){e=8;break X}p=C[--c];break;
case 64:{const a=S[s-1];if(a<0||a>255){e=6;break X}S[s-1]=M[a];break}
case 65:{const a=S[s-1];if(a<0||a>255){e=6;break X}M[a]=S[s-2];s-=2;break}
case 80:{const y=String(S[s-1]);if(U.length+y.length>65536){e=11;break X}s--;for(const ch of y)U.push(ch.charCodeAt(0));break}
case 81:if(U.length>=65536){e=11;break X}U.push(S[--s]&255);break;
case 82:S[s++]=q<N.length?N[q++]:-1;break;
case 83:e=S[--s]&255;break X;
}
}
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,"stdout.bin"),Buffer.from(U));
writeFileSync(join(O,d,"exit.txt"),e+"\n");
}
