import{b as I}from"./chunk-OFTEXQ5P.js";import{c as k,d as p,f as o,i as m}from"./chunk-T7VJLMO5.js";import{F as w}from"./chunk-FMY7REJO.js";import{Ab as x,Cb as C,Fc as F,Lc as S,Ob as l,Pb as M,Sa as b,Ua as a,Va as c,Wb as O,ha as u,hb as y,lb as s,qa as g,ra as v,sb as r,tb as n,ub as _,xb as h,ya as E}from"./chunk-VJ2SRRAC.js";import{j as f}from"./chunk-4ZZIO3ZI.js";function D(i,t){if(i&1){let e=h();r(0,"div",5)(1,"div",6)(2,"h5"),l(3),n(),r(4,"button",7),x("click",function(){let j=g(e).$implicit,R=C();return v(R.seleccionarEspecialista(j))}),_(5,"img",8),n()()()}if(i&2){let e=t.$implicit;a(3),M(e.nombre),a(2),s("src",e.urlFotoPerfil,b)}}var P=class i{constructor(t,e){this.firestoreService=t;this.router=e}especialistas=[];selectEspecialista=new E;ngOnInit(){this.loadEspecialistas()}loadEspecialistas(){return f(this,null,function*(){try{this.especialistas=yield this.firestoreService.getEspecialistas()}catch(t){console.error("Error al cargar los especialistas:",t)}})}seleccionarEspecialista(t){console.log("Especialista seleccionado:",t),this.selectEspecialista.emit(t)}static \u0275fac=function(e){return new(e||i)(c(w),c(I))};static \u0275cmp=u({type:i,selectors:[["app-mostrar-especialistas"]],outputs:{selectEspecialista:"selectEspecialista"},standalone:!0,features:[O],decls:6,vars:2,consts:[[1,"fondo"],[1,"container"],[1,"text-center","mt-5"],[1,"row","justify-content-center","mt-4"],["class","col-md-3 mb-4 text-center",4,"ngFor","ngForOf"],[1,"col-md-3","mb-4","text-center"],[1,"especialista-card"],[1,"especialista-button",3,"click"],["alt","Foto del especialista",1,"img-redonda",3,"src"]],template:function(e,d){e&1&&(r(0,"section",0)(1,"div",1)(2,"h3",2),l(3,"Seleccione Especialista"),n(),r(4,"div",3),y(5,D,6,2,"div",4),n()()()),e&2&&(s("@slideInRight",void 0),a(5),s("ngForOf",d.especialistas))},dependencies:[S,F],styles:[".fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;background:linear-gradient(45deg,gold,#e48080);background-attachment:fixed;background-size:cover;background-repeat:no-repeat}.especialista-card[_ngcontent-%COMP%]{text-align:center}.especialista-button[_ngcontent-%COMP%]{border:none;background:transparent;cursor:pointer;margin-top:10px}.img-redonda[_ngcontent-%COMP%]{width:100px;height:100px;object-fit:cover;border-radius:50%;border:2px solid #343a40;transition:transform .3s ease}.img-redonda[_ngcontent-%COMP%]:hover{transform:scale(1.1);border-color:gold}"],data:{animation:[k("slideInRight",[m(":enter",[o({transform:"translateX(100%)",opacity:0}),p("1000ms ease-in",o({transform:"translateX(0)",opacity:1}))]),m(":leave",[p("1000ms ease-out",o({transform:"translateX(-100%)",opacity:0}))])])]}})};export{P as a};