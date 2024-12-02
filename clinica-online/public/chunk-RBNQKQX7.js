import{a as oe}from"./chunk-Z6TYFYPI.js";import{b as Q,f as Z,i as ee,r as te}from"./chunk-Y6YT2LEC.js";import{a as le}from"./chunk-OLWY7DYE.js";import{c as K,d as V,f as D,i as z}from"./chunk-T7VJLMO5.js";import{F as ae,u as ne,z as ie}from"./chunk-FMY7REJO.js";import{$b as G,Ab as b,Cb as u,Fc as X,Gc as Y,Jc as U,Lc as J,Ob as c,Pb as E,Qb as R,Rb as O,Sb as H,Tb as N,Ua as d,Ub as q,Va as M,Wb as j,_b as P,ac as W,ha as F,hb as v,ka as $,lb as _,pb as L,qa as h,ra as x,sb as r,tb as s,vb as S,wb as A,xb as y}from"./chunk-VJ2SRRAC.js";import{a as w,b as k,g as ce,j as T}from"./chunk-4ZZIO3ZI.js";var f=ce(le());var I=class a{transform(t,e){if(!e)return t;let n=e.toLowerCase();return t.filter(i=>{console.log("desde pipe ",t);let o=i.nombre.toLowerCase().includes(n),l=i.especialidad.toLowerCase().includes(n),m=i.historiaClinica?.altura.toLowerCase().includes(n),g=i.historiaClinica?.peso.toLowerCase().includes(n),p=i.historiaClinica?.presion.toLowerCase().includes(n),C=i.historiaClinica?.temperatura.toLowerCase().includes(n),se=i.historiaClinica?.datosDinamicos?.some(B=>B.clave.toLowerCase().includes(n)||B.valor.toLowerCase().includes(n));return o||l||se||m||g||p||C})}static \u0275fac=function(e){return new(e||a)};static \u0275pipe=$({name:"buscarPacienteEspecialidad",type:a,pure:!0,standalone:!0})};function me(a,t){if(a&1){let e=y();r(0,"button",16),b("click",function(){h(e);let i=u(2).$implicit,o=u(2);return x(o.abrirHistoriaClinica(i))}),c(1," Historia Cl\xEDnica "),s()}}function ue(a,t){a&1&&(r(0,"button",15),c(1," Historia completada "),s())}function pe(a,t){if(a&1&&v(0,me,2,0,"button",14)(1,ue,2,0,"button",15),a&2){let e=u().$implicit;L(e.historiaClinica?1:0)}}function _e(a,t){if(a&1){let e=y();r(0,"button",17),b("click",function(){h(e);let i=u().$implicit,o=u(2);return x(o.verResenia(i))}),c(1," Ver Rese\xF1a "),s()}}function ge(a,t){if(a&1){let e=y();r(0,"button",18),b("click",function(){h(e);let i=u().$implicit,o=u(2);return x(o.verDiagnostico(i))}),c(1," Diagn\xF3stico "),s()}}function fe(a,t){if(a&1){let e=y();r(0,"button",20),b("click",function(){h(e);let i=u(2).$implicit,o=u(2);return x(o.abrirModal("Finalizar",i))}),c(1," Finalizar "),s()}}function be(a,t){if(a&1){let e=y();r(0,"button",24),b("click",function(){h(e);let i=u(3).$implicit,o=u(2);return x(o.abrirModal("Cancelar",i))}),c(1," Cancelar "),s()}}function Ce(a,t){if(a&1){let e=y();r(0,"button",25),b("click",function(){h(e);let i=u(3).$implicit,o=u(2);return x(o.abrirModal("Rechazar",i))}),c(1," Rechazar "),s()}}function he(a,t){if(a&1){let e=y();r(0,"button",26),b("click",function(){h(e);let i=u(3).$implicit,o=u(2);return x(o.actualizarEstadoTurno(i,"Aceptado"))}),c(1," Aceptar "),s()}}function xe(a,t){if(a&1&&(S(0),v(1,be,2,0,"button",21)(2,Ce,2,0,"button",22)(3,he,2,0,"button",23),A()),a&2){let e=u(2).$implicit;d(),_("ngIf",e.estado!=="Realizado"),d(),_("ngIf",e.estado!=="Realizado"),d(),_("ngIf",e.estado!=="Realizado")}}function ye(a,t){if(a&1&&(S(0),v(1,fe,2,0,"button",19)(2,xe,4,3,"ng-container",10),A()),a&2){let e=u().$implicit;d(),_("ngIf",e.estado==="Aceptado"),d(),_("ngIf",e.estado!=="Aceptado"&&e.estado!=="Realizado")}}function ve(a,t){if(a&1&&(r(0,"tr")(1,"td"),c(2),s(),r(3,"td"),c(4),s(),r(5,"td"),c(6),s(),r(7,"td"),c(8),s(),r(9,"td"),c(10),s(),r(11,"td",11)(12,"strong"),c(13),P(14,"titlecase"),s()(),r(15,"td"),v(16,pe,2,1)(17,_e,2,0,"button",12)(18,ge,2,0,"button",13)(19,ye,3,2,"ng-container",10),s()()),a&2){let e=t.$implicit,n=u().$implicit;d(2),E(e.nombre),d(2),E(e.especialidad),d(2),E(n.dia),d(2),E(n.fecha),d(2),O("",e.desde," - ",e.hasta,""),d(),_("EstadoTurnoColor",e.estado),d(2),R(" ",G(14,12,e.estado)," "),d(3),L(e.estado==="Realizado"?16:-1),d(),_("ngIf",(e.estado==="Cancelado"||e.estado==="Rechazado")&&(e.comentario==null?null:e.comentario.length)>0),d(),_("ngIf",e.estado==="Realizado"),d(),_("ngIf",e.estado!=="Cancelado"&&e.estado!=="Rechazado")}}function Te(a,t){if(a&1&&(S(0),v(1,ve,20,14,"tr",9),P(2,"buscarPacienteEspecialidad"),A()),a&2){let e=t.$implicit,n=u();d(),_("ngForOf",W(2,1,e.turnos,n.buscar))}}function Ee(a,t){a&1&&(r(0,"tr")(1,"td",27),c(2,"No hay turnos asignados para esta semana."),s()())}var re=class a{constructor(t,e){this.firestoreService=t;this.auth=e}usuarioLogueado=null;buscar="";turnos=[];turnosAsignados=[];BuscarEspecialistaEspecialidad="";diasDisponibles=[];mostrandoProximaSemana=!1;diasSemana=["Lunes","Martes","Mi\xE9rcoles","Jueves","Viernes","S\xE1bado"];especialidades=[];especialidadSeleccionada=null;ngOnInit(){return T(this,null,function*(){ie(this.auth,t=>T(this,null,function*(){t&&(this.usuarioLogueado=t,yield this.cargarEspecialidades(),this.configurarDiasDisponibles(),yield this.cargarTurnosAsignados())}))})}cargarEspecialidades(){return T(this,null,function*(){if(this.usuarioLogueado)try{let t=yield this.firestoreService.getDocument(`especialista/${this.usuarioLogueado.uid}`),e=t.exists()?t.data():null;if(e?.especialidad){let i=(yield this.firestoreService.getCollection("especialidades")).map(o=>w({id:o.id},o));this.especialidades=i.filter(o=>e.especialidad.includes(o.id)),this.especialidades.length>0&&(this.especialidadSeleccionada=this.especialidades[0].id),console.log("carga especia ",this.especialidades)}}catch(t){console.error("Error al cargar especialidades:",t)}})}configurarDiasDisponibles(){let t=new Date,e=t.getDay(),n=this.mostrandoProximaSemana?new Date(t.setDate(t.getDate()+(7-e+1))):new Date(t.setDate(t.getDate()-e+1));this.diasDisponibles=this.diasSemana.map((i,o)=>{let l=new Date(n);return l.setDate(n.getDate()+o),{dia:i,fecha:l.toISOString().split("T")[0],turnos:[]}})}cargarTurnosAsignados(){return T(this,null,function*(){if(this.usuarioLogueado)try{let e=(yield this.firestoreService.getCollection("turnos",{where:[{field:"uidEspecialista",op:"==",value:this.usuarioLogueado.uid}]})).map(l=>l),n=yield this.firestoreService.getPacientes(),i=yield this.firestoreService.getEspecialidades();e.forEach(l=>{n.forEach(m=>{l.uidPaciente==m.id&&(l.nombre=m.nombre+" "+m.apellido)}),i.forEach(m=>{l.uidEspecialidad==m.id&&(l.especialidad=m.descripcion)})}),console.log("a ver como quedan asi los turnos :",e);let o={};e.forEach(l=>{o[l.fecha]||(o[l.fecha]=[]),o[l.fecha].push(l)}),Object.keys(o).forEach(l=>{o[l].sort((m,g)=>{let p=m.desde,C=g.desde;return p.localeCompare(C)})}),this.diasDisponibles.forEach(l=>{l.turnos=o[l.fecha]||[]})}catch(t){console.error("Error al cargar turnos asignados:",t),f.default.fire("Error","Hubo un problema al cargar los turnos asignados.","error")}})}cambiarSemana(t){this.mostrandoProximaSemana=t,this.configurarDiasDisponibles(),this.cargarTurnosAsignados()}verResenia(t){f.default.fire({title:"Rese\xF1a del Turno",text:t.comentario,icon:"info",confirmButtonText:"Cerrar"})}verDiagnostico(t){f.default.fire({title:"Diagn\xF3stico",text:t.diagonostico,icon:"info",confirmButtonText:"Cerrar"})}tieneTurnosAsignados(){return this.diasDisponibles.some(t=>t.turnos.length>0)}abrirModal(t,e){f.default.fire({title:`${t} Turno`,input:"textarea",inputLabel:`Escribe un comentario para ${t.toLowerCase()} el turno`,inputPlaceholder:"Escribe tu comentario aqu\xED...",showCancelButton:!0,confirmButtonText:"Guardar",cancelButtonText:"Cancelar"}).then(n=>{if(n.isConfirmed&&n.value){let i=n.value.trim();t==="Cancelar"?this.actualizarEstadoTurno(e,"Cancelado",i):t==="Rechazar"?this.actualizarEstadoTurno(e,"Rechazado",i):t==="Finalizar"&&this.actualizarEstadoTurno(e,"Realizado",i)}})}actualizarEstadoTurno(t,e,n=""){return T(this,null,function*(){try{let i;e=="Realizado"?i=k(w({},t),{estado:e,diagonostico:n}):i=k(w({},t),{estado:e,comentario:n||t.comentario}),console.log("todo bien.",i),yield this.firestoreService.updateDocument(`turnos/${t.id}`,i),console.log("despues del update."),f.default.fire("\xC9xito",`El turno fue ${e.toLowerCase()} exitosamente.`,"success"),this.cargarTurnosAsignados()}catch(i){console.error(`Error al ${e.toLowerCase()} el turno:`,i),f.default.fire("Error",`No se pudo ${e.toLowerCase()} el turno. Intenta de nuevo.`,"error")}})}abrirHistoriaClinica(t){let e="",n="",i="",o="",l=[];f.default.fire({title:"Historia Cl\xEDnica",html:`
        <div class="container">
          <div class="mb-3">
            <label class="form-label fw-bold">Altura (cm):</label>
            <input type="number" id="altura" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Peso (kg):</label>
            <input type="number" id="peso" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Temperatura (\xB0C):</label>
            <input type="number" id="temperatura" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Presi\xF3n arterial:</label>
            <input type="text" id="presion" class="form-control" />
          </div>
          <div id="datos-dinamicos-container">
            <label class="form-label fw-bold">Datos Din\xE1micos (m\xE1ximo 3):</label>
            <div class="input-group mb-2">
              <input type="text" placeholder="Clave" class="form-control clave-dinamico" />
              <input type="text" placeholder="Valor" class="form-control valor-dinamico" />
            </div>
          </div>
          <button id="add-dynamic" class="btn btn-primary btn-sm w-100 mb-3">Agregar Dato Din\xE1mico</button>
        </div>
      `,showCancelButton:!0,cancelButtonText:"Cancelar",confirmButtonText:"Guardar",preConfirm:()=>{e=document.getElementById("altura").value,n=document.getElementById("peso").value,i=document.getElementById("temperatura").value,o=document.getElementById("presion").value;let m=Array.from(document.querySelectorAll(".clave-dinamico")).map(p=>p.value.trim()),g=Array.from(document.querySelectorAll(".valor-dinamico")).map(p=>p.value.trim());if(m.forEach((p,C)=>{p&&g[C]&&l.push({clave:p,valor:g[C]})}),!e||!n||!i||!o){f.default.showValidationMessage("Por favor completa todos los campos obligatorios.");return}if(m.length>3||g.length>3){f.default.showValidationMessage("Solo puedes agregar hasta 3 datos din\xE1micos.");return}if(m.some((p,C)=>p&&!g[C]||!p&&g[C])){f.default.showValidationMessage("Cada clave debe tener un valor correspondiente.");return}return{altura:e,peso:n,temperatura:i,presion:o,datosDinamicos:l}}}).then(m=>{if(m.isConfirmed){let g=m.value;t.historiaClinica=g,this.firestoreService.updateDocument(`turnos/${t.id}`,{historiaClinica:g}).then(()=>{f.default.fire("Guardado","Historia cl\xEDnica guardada con \xE9xito.","success")})}}),document.getElementById("add-dynamic")?.addEventListener("click",()=>{let m=document.getElementById("datos-dinamicos-container");if((m?.querySelectorAll(".clave-dinamico").length||0)>=3){f.default.fire("L\xEDmite alcanzado","Solo puedes agregar hasta 3 datos din\xE1micos.","error");return}let p=document.createElement("div");p.className="input-group mb-2",p.innerHTML=`
        <input type="text" placeholder="Clave" class="form-control clave-dinamico" />
        <input type="text" placeholder="Valor" class="form-control valor-dinamico" />
      `,m?.appendChild(p)})}static \u0275fac=function(e){return new(e||a)(M(ae),M(ne))};static \u0275cmp=F({type:a,selectors:[["app-turnos-asignados"]],standalone:!0,features:[j],decls:31,vars:4,consts:[[1,"fondo"],[1,"container"],[1,"text-center","mt-4"],[1,"row","d-flex","justify-content-center","align-items-center","row-input","mb-2"],["type","text","placeholder","Buscar paciente o especialidad",1,"form-control",3,"ngModelChange","ngModel"],[1,"text-center","mb-3"],[1,"btn","btn-secondary",3,"click"],[1,"btn","btn-secondary","mx-4",3,"click"],[1,"table","table-striped"],[4,"ngFor","ngForOf"],[4,"ngIf"],[3,"EstadoTurnoColor"],["class","btn btn-info btn-sm",3,"click",4,"ngIf"],["class","btn btn-success btn-sm mx-2",3,"click",4,"ngIf"],[1,"btn","btn-warning","btn-sm"],["disabled","",1,"btn","btn-secondary","btn-sm"],[1,"btn","btn-warning","btn-sm",3,"click"],[1,"btn","btn-info","btn-sm",3,"click"],[1,"btn","btn-success","btn-sm","mx-2",3,"click"],["class","btn btn-primary btn-sm mx-1",3,"click",4,"ngIf"],[1,"btn","btn-primary","btn-sm","mx-1",3,"click"],["class","btn btn-danger btn-sm",3,"click",4,"ngIf"],["class","btn btn-warning btn-sm mx-1",3,"click",4,"ngIf"],["class","btn btn-success btn-sm",3,"click",4,"ngIf"],[1,"btn","btn-danger","btn-sm",3,"click"],[1,"btn","btn-warning","btn-sm","mx-1",3,"click"],[1,"btn","btn-success","btn-sm",3,"click"],["colspan","7",1,"text-center"]],template:function(e,n){e&1&&(r(0,"section",0)(1,"div",1)(2,"h2",2),c(3,"Turnos Asignados"),s(),r(4,"div",3)(5,"input",4),q("ngModelChange",function(o){return N(n.buscar,o)||(n.buscar=o),o}),s()(),r(6,"div",5)(7,"button",6),b("click",function(){return n.cambiarSemana(!1)}),c(8,"Semana Actual"),s(),r(9,"button",7),b("click",function(){return n.cambiarSemana(!0)}),c(10,"Pr\xF3xima Semana"),s()(),r(11,"table",8)(12,"thead")(13,"tr")(14,"th"),c(15,"Paciente"),s(),r(16,"th"),c(17,"Especialidad"),s(),r(18,"th"),c(19,"D\xEDa"),s(),r(20,"th"),c(21,"Fecha"),s(),r(22,"th"),c(23,"Horarios"),s(),r(24,"th"),c(25,"Estado"),s(),r(26,"th"),c(27,"Acciones"),s()()(),r(28,"tbody"),v(29,Te,3,4,"ng-container",9)(30,Ee,3,0,"tr",10),s()()()()),e&2&&(_("@slideFlip",void 0),d(5),H("ngModel",n.buscar),d(24),_("ngForOf",n.diasDisponibles),d(),_("ngIf",!n.tieneTurnosAsignados()))},dependencies:[J,X,Y,U,oe,I,te,Q,Z,ee],styles:["h2[_ngcontent-%COMP%]{color:#036}.table[_ngcontent-%COMP%]{background-color:#fff}.text-muted[_ngcontent-%COMP%]{font-style:italic}.container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%], ul[_ngcontent-%COMP%]{list-style-type:none;padding:0;margin:0}.fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column;align-items:center;margin:0;padding:0;background:linear-gradient(45deg,gold,#e48080);background-attachment:fixed;background-size:cover;background-repeat:no-repeat}"],data:{animation:[K("slideFlip",[z(":enter",[D({transform:"translateX(-100%) rotateY(90deg)",opacity:0}),V("1000ms ease-out",D({transform:"translateX(0) rotateY(0)",opacity:1}))]),z(":leave",[V("1000ms ease-in",D({transform:"translateX(100%) rotateY(-90deg)",opacity:0}))])])]}})};export{re as TurnosAsignadosComponent};
