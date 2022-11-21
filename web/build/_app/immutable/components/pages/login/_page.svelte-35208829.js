import{S as le,i as re,s as ne,k as m,q as b,a as I,l as h,m as g,r as y,h as f,c as N,n as r,b as G,I as s,V as C,O as V,W as te,N as se,X as ie,u as oe}from"../../../chunks/singletons-f2c6cb84.js";import{g as ae}from"../../../chunks/navigation-5f0d6e36.js";import{a as A,P as ce}from"../../../chunks/public-9d42eb47.js";function ue(p){let e,o,l=p[2].detail+"",n;return{c(){e=m("p"),o=b("The action was unsuccessful. "),n=b(l),this.h()},l(a){e=h(a,"P",{class:!0});var t=g(e);o=y(t,"The action was unsuccessful. "),n=y(t,l),t.forEach(f),this.h()},h(){r(e,"class","error svelte-4q3sgo")},m(a,t){G(a,e,t),s(e,o),s(e,n)},p(a,t){t&4&&l!==(l=a[2].detail+"")&&oe(n,l)},d(a){a&&f(e)}}}function fe(p){let e,o,l=p[2].detail+"",n;return{c(){e=m("p"),o=b("The action was successful. "),n=b(l)},l(a){e=h(a,"P",{});var t=g(e);o=y(t,"The action was successful. "),n=y(t,l),t.forEach(f)},m(a,t){G(a,e,t),s(e,o),s(e,n)},p(a,t){t&4&&l!==(l=a[2].detail+"")&&oe(n,l)},d(a){a&&f(e)}}}function pe(p){let e,o,l,n,a,t,d,J,T,L,v,_,u,U,E,D,M,P,O,z,F,S,H,W,X,K;function Q(c,w){if(c[2].success)return fe;if(c[2].detail)return ue}let q=Q(p),i=q&&q(p);return{c(){e=m("main"),o=m("form"),l=m("h1"),n=b("Login or create a new User Account"),a=I(),t=m("div"),d=m("input"),J=I(),T=m("label"),L=b("Email address"),v=I(),_=m("div"),u=m("input"),U=I(),E=m("label"),D=b("Password"),M=I(),P=m("div"),O=m("button"),z=b("Sign in"),F=I(),S=m("button"),H=b("Register"),W=I(),i&&i.c(),this.h()},l(c){e=h(c,"MAIN",{class:!0});var w=g(e);o=h(w,"FORM",{});var k=g(o);l=h(k,"H1",{class:!0});var Y=g(l);n=y(Y,"Login or create a new User Account"),Y.forEach(f),a=N(k),t=h(k,"DIV",{class:!0});var j=g(t);d=h(j,"INPUT",{name:!0,type:!0,class:!0,id:!0,placeholder:!0}),J=N(j),T=h(j,"LABEL",{for:!0});var Z=g(T);L=y(Z,"Email address"),Z.forEach(f),j.forEach(f),v=N(k),_=h(k,"DIV",{class:!0});var B=g(_);u=h(B,"INPUT",{name:!0,type:!0,class:!0,id:!0,placeholder:!0}),U=N(B),E=h(B,"LABEL",{for:!0});var $=g(E);D=y($,"Password"),$.forEach(f),B.forEach(f),M=N(k),P=h(k,"DIV",{class:!0});var R=g(P);O=h(R,"BUTTON",{class:!0,type:!0});var x=g(O);z=y(x,"Sign in"),x.forEach(f),F=N(R),S=h(R,"BUTTON",{class:!0});var ee=g(S);H=y(ee,"Register"),ee.forEach(f),R.forEach(f),k.forEach(f),W=N(w),i&&i.l(w),w.forEach(f),this.h()},h(){r(l,"class","h3 mb-3 fw-normal"),r(d,"name","email"),r(d,"type","email"),r(d,"class","form-control svelte-4q3sgo"),r(d,"id","floatingInput"),r(d,"placeholder","name@example.com"),r(T,"for","floatingInput"),r(t,"class","form-floating svelte-4q3sgo"),r(u,"name","password"),r(u,"type","password"),r(u,"class","form-control svelte-4q3sgo"),r(u,"id","floatingPassword"),r(u,"placeholder","Password"),r(E,"for","floatingPassword"),r(_,"class","form-floating svelte-4q3sgo"),r(O,"class","btn btn-lg btn-primary"),r(O,"type","submit"),r(S,"class","btn btn-lg btn-secondary"),r(P,"class","d-grid gap-2"),r(e,"class","form-signin w-100 m-auto svelte-4q3sgo")},m(c,w){G(c,e,w),s(e,o),s(o,l),s(l,n),s(o,a),s(o,t),s(t,d),C(d,p[0]),s(t,J),s(t,T),s(T,L),s(o,v),s(o,_),s(_,u),C(u,p[1]),s(_,U),s(_,E),s(E,D),s(o,M),s(o,P),s(P,O),s(O,z),s(P,F),s(P,S),s(S,H),s(e,W),i&&i.m(e,null),X||(K=[V(d,"input",p[5]),V(u,"input",p[6]),V(S,"click",te(p[4])),V(o,"submit",te(p[3]))],X=!0)},p(c,[w]){w&1&&d.value!==c[0]&&C(d,c[0]),w&2&&u.value!==c[1]&&C(u,c[1]),q===(q=Q(c))&&i?i.p(c,w):(i&&i.d(1),i=q&&q(c),i&&(i.c(),i.m(e,null)))},i:se,o:se,d(c){c&&f(e),i&&i.d(),X=!1,ie(K)}}}function de(p,e,o){let l=ce,n,a,t={};async function d(){const v=await fetch(l+"token/",{method:"POST",body:"grant_type=password&username="+n+"&password="+a,headers:{"Content-Type":"application/x-www-form-urlencoded"}});let _=await v.json();o(2,t={success:v.ok,detail:JSON.stringify(_)}),v.ok&&A.set("jwt",_.access_token,{path:"/",sameSite:"strict"});const u=await fetch(l+"users/me",{headers:{Authorization:"Bearer "+A.get("jwt")}});let U=await u.json();if(u.ok){if(A.set("user",JSON.stringify(U),{path:"/",sameSite:"strict"}),A.get("routeTo")){let E=A.get("routeTo");A.remove("routeTo"),await ae(E)}await ae("/")}}async function J(){console.log("register",n,a);const v=await fetch(l+"users/",{method:"POST",body:JSON.stringify({email:n,password:a}),headers:{"Content-Type":"application/json"}});let _=await v.json();o(2,t={success:v.ok,detail:v.ok?"Please login.":JSON.stringify(_)})}function T(){n=this.value,o(0,n)}function L(){a=this.value,o(1,a)}return[n,a,t,d,J,T,L]}class ge extends le{constructor(e){super(),re(this,e,de,pe,ne,{})}}export{ge as default};
