import{S as ye,i as Ie,s as we,P as me,k as c,a as I,q as w,l as i,m as u,c as D,r as T,h as o,n as d,b as B,I as s,Q as De,u as x,N as Q,p as Xe,R as be,f as ie,t as ue,o as xe,Y as et,w as Fe,x as Qe,Z as tt,V as Ae,_ as Ne,y as Ye,O as Ee,W as lt,g as at,d as rt,T as st,z as Ze,X as nt}from"../../../../chunks/singletons-1c29ffd9.js";import{g as Ue}from"../../../../chunks/navigation-f29fa994.js";import{a as oe,P as ot}from"../../../../chunks/public-9d42eb47.js";function ct(r){let t,l=r[3].message+"",e;return{c(){t=c("p"),e=w(l),this.h()},l(a){t=i(a,"P",{style:!0});var n=u(t);e=T(n,l),n.forEach(o),this.h()},h(){Xe(t,"color","red")},m(a,n){B(a,t,n),s(t,e)},p(a,n){n&1&&l!==(l=a[3].message+"")&&x(e,l)},d(a){a&&o(t)}}}function it(r){let t,l;return{c(){t=c("img"),this.h()},l(e){t=i(e,"IMG",{class:!0,width:!0,height:!0,src:!0,alt:!0}),this.h()},h(){d(t,"class","bd-placeholder-img flex-shrink-0 me-2 rounded"),d(t,"width","48"),d(t,"height","48"),be(t.src,l=r[2])||d(t,"src",l),d(t,"alt","gravatar-img")},m(e,a){B(e,t,a)},p(e,a){a&1&&!be(t.src,l=e[2])&&d(t,"src",l)},d(e){e&&o(t)}}}function dt(r){let t,l;return{c(){t=c("p"),l=w("...")},l(e){t=i(e,"P",{});var a=u(t);l=T(a,"..."),a.forEach(o)},m(e,a){B(e,t,a),s(t,l)},p:Q,d(e){e&&o(t)}}}function ut(r){let t,l=r[0].body+"",e;return{c(){t=c("p"),e=w(l)},l(a){t=i(a,"P",{});var n=u(t);e=T(n,l),n.forEach(o)},m(a,n){B(a,t,n),s(t,e)},p(a,n){n&1&&l!==(l=a[0].body+"")&&x(e,l)},d(a){a&&o(t)}}}function mt(r){let t,l=r[1].render(r[0].body)+"";return{c(){t=c("p")},l(e){t=i(e,"P",{});var a=u(t);a.forEach(o)},m(e,a){B(e,t,a),t.innerHTML=l},p(e,a){a&3&&l!==(l=e[1].render(e[0].body)+"")&&(t.innerHTML=l)},d(e){e&&o(t)}}}function ft(r){let t,l,e,a,n,k,S,f=r[0].submitted_by+"",E,U,M,V,H,Y=new Date(r[0].created_at).toISOString().match(/(\d|-|:)+/g)[0]+"",q,J,K,le,Z=new Date(r[0].created_at).toISOString().match(/(\d|-|:)+/g)[1]+"",$,G,O,_,L,W,X,N=r[0].status.toUpperCase()+"",b,j={ctx:r,current:null,token:null,hasCatch:!0,pending:dt,then:it,catch:ct,value:2,error:3};me(a=qe(r[0].submitted_by,48),j);function ae(g,C){return g[1]?mt:ut}let P=ae(r),v=P(r);return{c(){t=c("div"),l=c("div"),e=c("div"),j.block.c(),n=I(),k=c("br"),S=I(),E=w(f),U=I(),M=c("br"),V=c("br"),H=I(),q=w(Y),J=I(),K=c("br"),le=I(),$=w(Z),G=I(),O=c("div"),_=c("div"),v.c(),L=I(),W=c("div"),X=w("Ticket state set to: "),b=w(N),this.h()},l(g){t=i(g,"DIV",{class:!0});var C=u(t);l=i(C,"DIV",{class:!0});var p=u(l);e=i(p,"DIV",{class:!0});var h=u(e);j.block.l(h),n=D(h),k=i(h,"BR",{}),S=D(h),E=T(h,f),U=D(h),M=i(h,"BR",{}),V=i(h,"BR",{}),H=D(h),q=T(h,Y),J=D(h),K=i(h,"BR",{}),le=D(h),$=T(h,Z),h.forEach(o),G=D(p),O=i(p,"DIV",{class:!0});var ee=u(O);_=i(ee,"DIV",{class:!0});var z=u(_);v.l(z),z.forEach(o),L=D(ee),W=i(ee,"DIV",{class:!0});var se=u(W);X=T(se,"Ticket state set to: "),b=T(se,N),se.forEach(o),ee.forEach(o),p.forEach(o),C.forEach(o),this.h()},h(){d(e,"class","col-md-3 pt-2 pb-2 text-center comment-info svelte-rvquzj"),d(_,"class","card-body w-100"),d(W,"class","card-footer w-100 text-muted"),d(O,"class","col-md-9 d-flex align-items-start flex-column"),d(l,"class","row g-0"),d(t,"class","card mb-3")},m(g,C){B(g,t,C),s(t,l),s(l,e),j.block.m(e,j.anchor=null),j.mount=()=>e,j.anchor=n,s(e,n),s(e,k),s(e,S),s(e,E),s(e,U),s(e,M),s(e,V),s(e,H),s(e,q),s(e,J),s(e,K),s(e,le),s(e,$),s(l,G),s(l,O),s(O,_),v.m(_,null),s(O,L),s(O,W),s(W,X),s(W,b)},p(g,[C]){r=g,j.ctx=r,C&1&&a!==(a=qe(r[0].submitted_by,48))&&me(a,j)||De(j,r,C),C&1&&f!==(f=r[0].submitted_by+"")&&x(E,f),C&1&&Y!==(Y=new Date(r[0].created_at).toISOString().match(/(\d|-|:)+/g)[0]+"")&&x(q,Y),C&1&&Z!==(Z=new Date(r[0].created_at).toISOString().match(/(\d|-|:)+/g)[1]+"")&&x($,Z),P===(P=ae(r))&&v?v.p(r,C):(v.d(1),v=P(r),v&&(v.c(),v.m(_,null))),C&1&&N!==(N=r[0].status.toUpperCase()+"")&&x(b,N)},i:Q,o:Q,d(g){g&&o(t),j.block.d(),j.token=null,j=null,v.d()}}}async function ht(r){return(await(await fetch("https://api.hashify.net/hash/md5/hex",{method:"POST",body:r})).json()).Digest}async function qe(r,t,l,e,a){return r=typeof r<"u"?r:"john.doe@example.com",t=t>=1&&t<=2048?t:80,l=typeof l<"u"?l:"mm",e=typeof e<"u"?e:"g",a=a===!0?"y":"n","https://secure.gravatar.com/avatar/"+await ht(r.toLowerCase().trim())+"?size="+t+"&default="+encodeURIComponent(l)+"&rating="+e+(a==="y"?"&forcedefault="+a:"")}function _t(r,t,l){let{comment:e}=t,{md:a}=t;return r.$$set=n=>{"comment"in n&&l(0,e=n.comment),"md"in n&&l(1,a=n.md)},[e,a]}class vt extends ye{constructor(t){super(),Ie(this,t,_t,ft,we,{comment:0,md:1})}}function pt(r){let t,l=r[3].message+"",e;return{c(){t=c("p"),e=w(l),this.h()},l(a){t=i(a,"P",{style:!0});var n=u(t);e=T(n,l),n.forEach(o),this.h()},h(){Xe(t,"color","red")},m(a,n){B(a,t,n),s(t,e)},p(a,n){n&1&&l!==(l=a[3].message+"")&&x(e,l)},d(a){a&&o(t)}}}function bt(r){let t,l;return{c(){t=c("img"),this.h()},l(e){t=i(e,"IMG",{class:!0,width:!0,height:!0,src:!0,alt:!0}),this.h()},h(){d(t,"class","bd-placeholder-img flex-shrink-0 me-2 rounded"),d(t,"width","48"),d(t,"height","48"),be(t.src,l=r[2])||d(t,"src",l),d(t,"alt","gravatar-img")},m(e,a){B(e,t,a)},p(e,a){a&1&&!be(t.src,l=e[2])&&d(t,"src",l)},d(e){e&&o(t)}}}function gt(r){let t,l;return{c(){t=c("p"),l=w("...")},l(e){t=i(e,"P",{});var a=u(t);l=T(a,"..."),a.forEach(o)},m(e,a){B(e,t,a),s(t,l)},p:Q,d(e){e&&o(t)}}}function kt(r){let t,l=r[0].body+"",e;return{c(){t=c("p"),e=w(l)},l(a){t=i(a,"P",{});var n=u(t);e=T(n,l),n.forEach(o)},m(a,n){B(a,t,n),s(t,e)},p(a,n){n&1&&l!==(l=a[0].body+"")&&x(e,l)},d(a){a&&o(t)}}}function Et(r){let t,l=r[1].render(r[0].body)+"";return{c(){t=c("p")},l(e){t=i(e,"P",{});var a=u(t);a.forEach(o)},m(e,a){B(e,t,a),t.innerHTML=l},p(e,a){a&3&&l!==(l=e[1].render(e[0].body)+"")&&(t.innerHTML=l)},d(e){e&&o(t)}}}function yt(r){let t,l,e,a,n,k,S,f=r[0].submitted_by+"",E,U,M,V,H,Y=new Date(r[0].created_at).toISOString().match(/(\d|-|:)+/g)[0]+"",q,J,K,le,Z=new Date(r[0].created_at).toISOString().match(/(\d|-|:)+/g)[1]+"",$,G,O,_,L=r[0].subject+"",W,X,N,b={ctx:r,current:null,token:null,hasCatch:!0,pending:gt,then:bt,catch:pt,value:2,error:3};me(a=Je(r[0].submitted_by,48),b);function j(v,g){return v[1]?Et:kt}let ae=j(r),P=ae(r);return{c(){t=c("div"),l=c("div"),e=c("div"),b.block.c(),n=I(),k=c("br"),S=I(),E=w(f),U=I(),M=c("br"),V=c("br"),H=I(),q=w(Y),J=I(),K=c("br"),le=I(),$=w(Z),G=I(),O=c("div"),_=c("h5"),W=w(L),X=I(),N=c("div"),P.c(),this.h()},l(v){t=i(v,"DIV",{class:!0});var g=u(t);l=i(g,"DIV",{class:!0});var C=u(l);e=i(C,"DIV",{class:!0});var p=u(e);b.block.l(p),n=D(p),k=i(p,"BR",{}),S=D(p),E=T(p,f),U=D(p),M=i(p,"BR",{}),V=i(p,"BR",{}),H=D(p),q=T(p,Y),J=D(p),K=i(p,"BR",{}),le=D(p),$=T(p,Z),p.forEach(o),G=D(C),O=i(C,"DIV",{class:!0});var h=u(O);_=i(h,"H5",{class:!0});var ee=u(_);W=T(ee,L),ee.forEach(o),X=D(h),N=i(h,"DIV",{class:!0});var z=u(N);P.l(z),z.forEach(o),h.forEach(o),C.forEach(o),g.forEach(o),this.h()},h(){d(e,"class","col-md-3 pt-2 pb-2 text-center comment-info svelte-rvquzj"),d(_,"class","card-header"),d(N,"class","card-body"),d(O,"class","col-md-9"),d(l,"class","row g-0"),d(t,"class","card mb-3")},m(v,g){B(v,t,g),s(t,l),s(l,e),b.block.m(e,b.anchor=null),b.mount=()=>e,b.anchor=n,s(e,n),s(e,k),s(e,S),s(e,E),s(e,U),s(e,M),s(e,V),s(e,H),s(e,q),s(e,J),s(e,K),s(e,le),s(e,$),s(l,G),s(l,O),s(O,_),s(_,W),s(O,X),s(O,N),P.m(N,null)},p(v,[g]){r=v,b.ctx=r,g&1&&a!==(a=Je(r[0].submitted_by,48))&&me(a,b)||De(b,r,g),g&1&&f!==(f=r[0].submitted_by+"")&&x(E,f),g&1&&Y!==(Y=new Date(r[0].created_at).toISOString().match(/(\d|-|:)+/g)[0]+"")&&x(q,Y),g&1&&Z!==(Z=new Date(r[0].created_at).toISOString().match(/(\d|-|:)+/g)[1]+"")&&x($,Z),g&1&&L!==(L=r[0].subject+"")&&x(W,L),ae===(ae=j(r))&&P?P.p(r,g):(P.d(1),P=ae(r),P&&(P.c(),P.m(N,null)))},i:Q,o:Q,d(v){v&&o(t),b.block.d(),b.token=null,b=null,P.d()}}}async function It(r){return(await(await fetch("https://api.hashify.net/hash/md5/hex",{method:"POST",body:r})).json()).Digest}async function Je(r,t,l,e,a){return r=typeof r<"u"?r:"john.doe@example.com",t=t>=1&&t<=2048?t:80,l=typeof l<"u"?l:"mm",e=typeof e<"u"?e:"g",a=a===!0?"y":"n","https://secure.gravatar.com/avatar/"+await It(r.toLowerCase().trim())+"?size="+t+"&default="+encodeURIComponent(l)+"&rating="+e+(a==="y"?"&forcedefault="+a:"")}function wt(r,t,l){let{ticket:e}=t,{md:a}=t;return r.$$set=n=>{"ticket"in n&&l(0,e=n.ticket),"md"in n&&l(1,a=n.md)},[e,a]}class Dt extends ye{constructor(t){super(),Ie(this,t,wt,yt,we,{ticket:0,md:1})}}function $e(r,t,l){const e=r.slice();return e[10]=t[l],e}function Tt(r){return{c:Q,l:Q,m:Q,p:Q,i:Q,o:Q,d:Q}}function St(r){let t,l,e,a,n,k,S=r[2].subject+"",f,E,U,M,V,H,Y,q,J,K,le,Z,$,G,O,_,L,W,X,N,b,j,ae,P,v,g,C,p,h,ee,z,se,ce,de,ge,Te,F=r[0]&&Ge(r),ne=r[2].comments,R=[];for(let m=0;m<ne.length;m+=1)R[m]=We($e(r,ne,m));const Ke=m=>ue(R[m],1,1,()=>{R[m]=null});return z=new Dt({props:{ticket:r[2],md:r[0]}}),{c(){t=c("form"),l=c("div"),e=c("div"),a=c("div"),n=c("h4"),k=w('Ticket: "'),f=w(S),E=w('"'),U=I(),M=c("div"),V=c("textarea"),H=I(),F&&F.c(),Y=I(),q=c("div"),J=c("div"),K=c("h4"),le=w("Update"),Z=I(),$=c("div"),G=c("div"),O=c("div"),_=c("select"),L=c("option"),W=w("Open"),X=c("option"),N=w("With Customer"),b=c("option"),j=w("Closed"),ae=I(),P=c("div"),v=c("button"),g=w("Submit"),C=I(),p=c("div"),h=c("div");for(let m=0;m<R.length;m+=1)R[m].c();ee=I(),Fe(z.$$.fragment),se=I(),ce=c("div"),this.h()},l(m){t=i(m,"FORM",{});var y=u(t);l=i(y,"DIV",{class:!0});var te=u(l);e=i(te,"DIV",{class:!0});var A=u(e);a=i(A,"DIV",{class:!0});var re=u(a);n=i(re,"H4",{class:!0});var fe=u(n);k=T(fe,'Ticket: "'),f=T(fe,S),E=T(fe,'"'),fe.forEach(o),U=D(re),M=i(re,"DIV",{class:!0});var Se=u(M);V=i(Se,"TEXTAREA",{class:!0,name:!0,rows:!0,placeholder:!0}),u(V).forEach(o),Se.forEach(o),H=D(re),F&&F.l(re),re.forEach(o),A.forEach(o),Y=D(te),q=i(te,"DIV",{class:!0});var Oe=u(q);J=i(Oe,"DIV",{class:!0});var he=u(J);K=i(he,"H4",{class:!0});var Ve=u(K);le=T(Ve,"Update"),Ve.forEach(o),Z=D(he),$=i(he,"DIV",{class:!0});var Pe=u($);G=i(Pe,"DIV",{class:!0});var _e=u(G);O=i(_e,"DIV",{class:!0});var Ce=u(O);_=i(Ce,"SELECT",{class:!0,name:!0,id:!0});var ve=u(_);L=i(ve,"OPTION",{});var Re=u(L);W=T(Re,"Open"),Re.forEach(o),X=i(ve,"OPTION",{});var je=u(X);N=T(je,"With Customer"),je.forEach(o),b=i(ve,"OPTION",{});var Be=u(b);j=T(Be,"Closed"),Be.forEach(o),ve.forEach(o),Ce.forEach(o),ae=D(_e),P=i(_e,"DIV",{class:!0});var Me=u(P);v=i(Me,"BUTTON",{class:!0});var He=u(v);g=T(He,"Submit"),He.forEach(o),Me.forEach(o),_e.forEach(o),Pe.forEach(o),he.forEach(o),Oe.forEach(o),te.forEach(o),y.forEach(o),C=D(m),p=i(m,"DIV",{class:!0});var Le=u(p);h=i(Le,"DIV",{class:!0});var pe=u(h);for(let ke=0;ke<R.length;ke+=1)R[ke].l(pe);ee=D(pe),Qe(z.$$.fragment,pe),pe.forEach(o),Le.forEach(o),se=D(m),ce=i(m,"DIV",{class:!0});var ze=u(ce);ze.forEach(o),this.h()},h(){d(n,"class","card-header"),d(V,"class","form-control"),d(V,"name","body"),d(V,"rows","5"),d(V,"placeholder","Add a comment to this ticket."),d(M,"class","card-body"),d(a,"class","card"),d(e,"class","col-md-8 comment-textarea"),d(K,"class","card-header"),L.__value="open",L.value=L.__value,X.__value="pending",X.value=X.__value,b.__value="closed",b.value=b.__value,d(_,"class","form-select comment-submit-select"),d(_,"name","status"),d(_,"id","exampleSelect"),r[3]===void 0&&tt(()=>r[8].call(_)),d(O,"class","col-md-8"),d(v,"class","btn btn-secondary bg-indigo-400 svelte-grsov"),d(P,"class","col-md-4"),d(G,"class","row"),d($,"class","card-body"),d(J,"class","card"),d(q,"class","col-md-4 comment-submit"),d(l,"class","row mb-4 comment-form"),d(h,"class","col-md-8 ticket-comments"),d(p,"class","row"),d(ce,"class","col-md-4 ticket-info")},m(m,y){B(m,t,y),s(t,l),s(l,e),s(e,a),s(a,n),s(n,k),s(n,f),s(n,E),s(a,U),s(a,M),s(M,V),Ae(V,r[1]),s(a,H),F&&F.m(a,null),s(l,Y),s(l,q),s(q,J),s(J,K),s(K,le),s(J,Z),s(J,$),s($,G),s(G,O),s(O,_),s(_,L),s(L,W),s(_,X),s(X,N),s(_,b),s(b,j),Ne(_,r[3]),s(G,ae),s(G,P),s(P,v),s(v,g),B(m,C,y),B(m,p,y),s(p,h);for(let te=0;te<R.length;te+=1)R[te].m(h,null);s(h,ee),Ye(z,h,null),B(m,se,y),B(m,ce,y),de=!0,ge||(Te=[Ee(V,"input",r[7]),Ee(_,"change",r[8]),Ee(t,"submit",lt(r[5]))],ge=!0)},p(m,y){if((!de||y&4)&&S!==(S=m[2].subject+"")&&x(f,S),y&2&&Ae(V,m[1]),m[0]?F?F.p(m,y):(F=Ge(m),F.c(),F.m(a,null)):F&&(F.d(1),F=null),y&8&&Ne(_,m[3]),y&5){ne=m[2].comments;let A;for(A=0;A<ne.length;A+=1){const re=$e(m,ne,A);R[A]?(R[A].p(re,y),ie(R[A],1)):(R[A]=We(re),R[A].c(),ie(R[A],1),R[A].m(h,ee))}for(at(),A=ne.length;A<R.length;A+=1)Ke(A);rt()}const te={};y&4&&(te.ticket=m[2]),y&1&&(te.md=m[0]),z.$set(te)},i(m){if(!de){for(let y=0;y<ne.length;y+=1)ie(R[y]);ie(z.$$.fragment,m),de=!0}},o(m){R=R.filter(Boolean);for(let y=0;y<R.length;y+=1)ue(R[y]);ue(z.$$.fragment,m),de=!1},d(m){m&&o(t),F&&F.d(),m&&o(C),m&&o(p),st(R,m),Ze(z),m&&o(se),m&&o(ce),ge=!1,nt(Te)}}}function Ge(r){let t,l,e,a,n,k,S=r[0].render(r[1])+"";return{c(){t=c("div"),l=c("p"),e=c("strong"),a=w("Preview:"),n=I(),k=c("p"),this.h()},l(f){t=i(f,"DIV",{class:!0});var E=u(t);l=i(E,"P",{});var U=u(l);e=i(U,"STRONG",{});var M=u(e);a=T(M,"Preview:"),M.forEach(o),U.forEach(o),n=D(E),k=i(E,"P",{});var V=u(k);V.forEach(o),E.forEach(o),this.h()},h(){d(t,"class","card-footer")},m(f,E){B(f,t,E),s(t,l),s(l,e),s(e,a),s(t,n),s(t,k),k.innerHTML=S},p(f,E){E&3&&S!==(S=f[0].render(f[1])+"")&&(k.innerHTML=S)},d(f){f&&o(t)}}}function We(r){let t,l;return t=new vt({props:{comment:r[10],md:r[0]}}),{c(){Fe(t.$$.fragment)},l(e){Qe(t.$$.fragment,e)},m(e,a){Ye(t,e,a),l=!0},p(e,a){const n={};a&4&&(n.comment=e[10]),a&1&&(n.md=e[0]),t.$set(n)},i(e){l||(ie(t.$$.fragment,e),l=!0)},o(e){ue(t.$$.fragment,e),l=!1},d(e){Ze(t,e)}}}function Ot(r){let t,l;return{c(){t=c("h4"),l=w("..Retrieving ticket")},l(e){t=i(e,"H4",{});var a=u(t);l=T(a,"..Retrieving ticket"),a.forEach(o)},m(e,a){B(e,t,a),s(t,l)},p:Q,i:Q,o:Q,d(e){e&&o(t)}}}function Vt(r){let t,l,e={ctx:r,current:null,token:null,hasCatch:!1,pending:Ot,then:St,catch:Tt,blocks:[,,,]};return me(r[4](),e),{c(){t=c("main"),e.block.c(),this.h()},l(a){t=i(a,"MAIN",{class:!0});var n=u(t);e.block.l(n),n.forEach(o),this.h()},h(){d(t,"class","container svelte-grsov")},m(a,n){B(a,t,n),e.block.m(t,e.anchor=null),e.mount=()=>t,e.anchor=null,l=!0},p(a,[n]){r=a,De(e,r,n)},i(a){l||(ie(e.block),l=!0)},o(a){for(let n=0;n<3;n+=1){const k=e.blocks[n];ue(k)}l=!1},d(a){a&&o(t),e.block.d(),e.token=null,e=null}}}function Pt(r,t,l){let{data:e}=t,a=ot,n;xe(async()=>{l(0,n=new window.remarkable.Remarkable)});let k="",S,f;async function E(){if(oe.get("jwt")){const H=await fetch(a+"tickets/"+e.slug,{headers:{Authorization:"Bearer "+oe.get("jwt")}});return H.status===401&&(oe.remove("jwt"),oe.remove("user"),await Ue("/login",{invalidateAll:!0})),l(2,S=await H.json()),l(3,f=S.status),S}}async function U(){(await fetch(a+"tickets/"+S.key+"/comments",{method:"POST",body:JSON.stringify({body:k,status:f}),headers:{Authorization:"Bearer "+oe.get("jwt"),"Content-Type":"application/json"}})).status===401&&(oe.remove("jwt"),oe.remove("user"),await Ue("/login",{invalidateAll:!0})),await E(),l(1,k="")}function M(){k=this.value,l(1,k)}function V(){f=et(this),l(3,f)}return r.$$set=H=>{"data"in H&&l(6,e=H.data)},[n,k,S,f,E,U,e,M,V]}class Bt extends ye{constructor(t){super(),Ie(this,t,Pt,Vt,we,{data:6})}}export{Bt as default};
