import{a as P}from"./chunk-OQ2KCSLO.js";import{a as w}from"./chunk-35GPCCRZ.js";import{a as h}from"./chunk-Z2BPKKNE.js";import"./chunk-OLWY7DYE.js";import"./chunk-OFTEXQ5P.js";import"./chunk-QCL7JASP.js";import"./chunk-T7VJLMO5.js";import"./chunk-FMY7REJO.js";import{Ab as f,Cb as n,Gc as x,Lc as y,Ua as l,Wb as g,ha as E,hb as u,lb as s,qa as c,ra as r,sb as d,tb as m,ub as C,xb as _}from"./chunk-VJ2SRRAC.js";import"./chunk-4ZZIO3ZI.js";function S(t,a){if(t&1){let e=_();d(0,"app-mostrar-especialistas",3),f("selectEspecialista",function(p){c(e);let o=n();return r(o.onEspecialistaSelected(p))}),m()}}function T(t,a){if(t&1){let e=_();d(0,"app-mostrar-especialidades",4),f("selectEspecialidad",function(p){c(e);let o=n();return r(o.onEspecialidadSelected(p))}),m()}if(t&2){let e=n();s("especialista",e.selectedEspecialista)}}function V(t,a){if(t&1&&C(0,"app-generar-turno",5),t&2){let e=n();s("especialista",e.selectedEspecialista)("especialidad",e.selectedEspecialidad)}}var I=class t{selectedEspecialista=null;selectedEspecialidad=null;showEspecialidades=!1;onEspecialistaSelected(a){this.selectedEspecialista=a,this.showEspecialidades=!0}onEspecialidadSelected(a){this.selectedEspecialidad=a,this.showEspecialidades=!1}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-parent"]],standalone:!0,features:[g],decls:3,vars:3,consts:[[3,"selectEspecialista",4,"ngIf"],[3,"especialista","selectEspecialidad",4,"ngIf"],[3,"especialista","especialidad",4,"ngIf"],[3,"selectEspecialista"],[3,"selectEspecialidad","especialista"],[3,"especialista","especialidad"]],template:function(e,i){e&1&&u(0,S,1,0,"app-mostrar-especialistas",0)(1,T,1,1,"app-mostrar-especialidades",1)(2,V,1,2,"app-generar-turno",2),e&2&&(s("ngIf",!i.selectedEspecialista),l(),s("ngIf",i.selectedEspecialista&&i.showEspecialidades),l(),s("ngIf",i.selectedEspecialidad))},dependencies:[y,x,w,h,P],encapsulation:2})};export{I as ParentComponent};