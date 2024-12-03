import{a as V}from"./chunk-THKDPX3H.js";import{a as L}from"./chunk-2O5U3XFP.js";import{a as T}from"./chunk-FHJPSFEO.js";import"./chunk-OLWY7DYE.js";import{a as I}from"./chunk-7FG5ZD4D.js";import"./chunk-5PFTZWDM.js";import"./chunk-3JXLYIF6.js";import"./chunk-EJJBCPAK.js";import{F as O}from"./chunk-JRXB4MSQ.js";import{Bb as u,Eb as f,Gb as r,Kc as S,Lc as M,Qc as x,Sb as C,Vb as w,Wa as l,Xa as b,_b as P,ia as _,kb as g,ob as a,ra as d,sa as m,wb as s,xb as o,yb as v,za as h}from"./chunk-SLHCDPS3.js";import{j as y}from"./chunk-4ZZIO3ZI.js";function D(i,t){if(i&1){let e=u();s(0,"li",5)(1,"span"),C(2),o(),s(3,"button",6),f("click",function(){let c=d(e).$implicit,p=r();return m(p.seleccionarPaciente(c))}),C(4," Seleccionar "),o()()}if(i&2){let e=t.$implicit;l(2),w("",e.nombre," ",e.apellido,"")}}var E=class i{constructor(t,e){this.firestoreService=t;this.loader=e}pacientes=[];selectPaciente=new h;ngOnInit(){return y(this,null,function*(){this.loader.setLoader(!0),yield this.cargarPacientes(),this.loader.setLoader(!1)})}cargarPacientes(){return y(this,null,function*(){try{this.pacientes=yield this.firestoreService.getCollection("paciente")}catch(t){console.error("Error al cargar los pacientes:",t)}})}seleccionarPaciente(t){this.selectPaciente.emit(t)}static \u0275fac=function(e){return new(e||i)(b(O),b(I))};static \u0275cmp=_({type:i,selectors:[["app-lista-usuarios"]],outputs:{selectPaciente:"selectPaciente"},standalone:!0,features:[P],decls:6,vars:1,consts:[[1,"fondo"],[1,"container","mt-4","mb-4"],[1,"text-center"],[1,"list-group","mt-4"],["class","list-group-item d-flex justify-content-between align-items-center",4,"ngFor","ngForOf"],[1,"list-group-item","d-flex","justify-content-between","align-items-center"],[1,"btn","btn-primary","btn-sm",3,"click"]],template:function(e,n){e&1&&(s(0,"section",0)(1,"div",1)(2,"h2",2),C(3,"Lista de Pacientes"),o(),s(4,"ul",3),g(5,D,5,2,"li",4),o()()()),e&2&&(l(5),a("ngForOf",n.pacientes))},dependencies:[x,S],styles:[".fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;background:linear-gradient(45deg,gold,#e48080);background-attachment:fixed;background-size:cover;background-repeat:no-repeat}.container[_ngcontent-%COMP%]{background-color:#fff;border-radius:10px;padding:20px;box-shadow:0 4px 8px #0003}.text-center[_ngcontent-%COMP%]{font-size:1.5rem;color:#333;margin-bottom:20px}.list-group[_ngcontent-%COMP%]{list-style:none;padding:0}.list-group[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{padding:15px;border:1px solid #ccc;border-radius:5px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;background-color:#f9f9f9}.list-group[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:1rem;color:#555}.list-group[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]   .btn-sm[_ngcontent-%COMP%]{font-size:.9rem;padding:5px 10px}.list-group[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:hover{background-color:#f1f1f1}"]})};function N(i,t){if(i&1){let e=u();s(0,"app-lista-usuarios",4),f("selectPaciente",function(c){d(e);let p=r();return m(p.onPacienteSelected(c))}),o()}}function U(i,t){if(i&1){let e=u();s(0,"app-mostrar-especialistas",5),f("selectEspecialista",function(c){d(e);let p=r();return m(p.onEspecialistaSelected(c))}),o()}}function z(i,t){if(i&1){let e=u();s(0,"app-mostrar-especialidades",6),f("selectEspecialidad",function(c){d(e);let p=r();return m(p.onEspecialidadSelected(c))}),o()}if(i&2){let e=r();a("especialista",e.selectedEspecialista)}}function $(i,t){if(i&1&&v(0,"app-generar-turno",7),i&2){let e=r();a("paciente",e.selectedPaciente)("especialista",e.selectedEspecialista)("especialidad",e.selectedEspecialidad)}}var F=class i{selectedPaciente=null;selectedEspecialista=null;selectedEspecialidad=null;showEspecialistas=!1;showEspecialidades=!1;onPacienteSelected(t){this.selectedPaciente=t,console.log("paciente desde parent-admint :",t),this.showEspecialistas=!0}onEspecialistaSelected(t){this.selectedEspecialista=t,this.showEspecialidades=!0}onEspecialidadSelected(t){this.selectedEspecialidad=t,this.showEspecialidades=!1}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=_({type:i,selectors:[["app-parent-admin"]],standalone:!0,features:[P],decls:4,vars:4,consts:[[3,"selectPaciente",4,"ngIf"],[3,"selectEspecialista",4,"ngIf"],[3,"especialista","selectEspecialidad",4,"ngIf"],[3,"paciente","especialista","especialidad",4,"ngIf"],[3,"selectPaciente"],[3,"selectEspecialista"],[3,"selectEspecialidad","especialista"],[3,"paciente","especialista","especialidad"]],template:function(e,n){e&1&&g(0,N,1,0,"app-lista-usuarios",0)(1,U,1,0,"app-mostrar-especialistas",1)(2,z,1,1,"app-mostrar-especialidades",2)(3,$,1,3,"app-generar-turno",3),e&2&&(a("ngIf",!n.selectedPaciente),l(),a("ngIf",n.selectedPaciente&&!n.selectedEspecialista),l(),a("ngIf",n.selectedEspecialista&&n.showEspecialidades),l(),a("ngIf",n.selectedEspecialidad))},dependencies:[x,M,E,L,T,V],encapsulation:2})};export{F as ParentAdminComponent};
