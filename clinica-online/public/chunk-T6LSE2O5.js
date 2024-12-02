import{a as V}from"./chunk-OLWY7DYE.js";import{F as G,u as F,z as $}from"./chunk-FMY7REJO.js";import{Ab as _,Cb as c,Fc as I,Gb as b,Lc as w,Ob as r,Pb as H,Qb as u,Rb as O,Sa as S,Ua as s,Va as v,Wb as M,ha as y,hb as g,lb as d,qa as x,ra as C,sb as o,tb as n,ub as P,xb as D}from"./chunk-VJ2SRRAC.js";import{a as E,g as L,j as m}from"./chunk-4ZZIO3ZI.js";var h=L(V());function A(l,i){if(l&1&&(o(0,"option",15),r(1),n()),l&2){let e=i.$implicit,t=c().$implicit,a=c();d("value",e.id)("selected",(a.horariosPorDia[t]==null?null:a.horariosPorDia[t].especialidad)===e.id),s(),u(" ",e.descripcion," ")}}function j(l,i){if(l&1&&(o(0,"option",16),r(1),n()),l&2){let e=i.$implicit,t=c().$implicit,a=c();d("selected",(a.horariosPorDia[t]==null?null:a.horariosPorDia[t].desde)===e),s(),u(" ",e," ")}}function k(l,i){if(l&1&&(o(0,"option",16),r(1),n()),l&2){let e=i.$implicit,t=c().$implicit,a=c();d("selected",(a.horariosPorDia[t]==null?null:a.horariosPorDia[t].hasta)===e),s(),u(" ",e," ")}}function z(l,i){if(l&1){let e=D();o(0,"tr")(1,"td"),r(2),n(),o(3,"td")(4,"select",11),_("change",function(a){let p=x(e).$implicit,f=c();return C(f.seleccionarEspecialidad(p,a))}),o(5,"option",12),r(6,"Seleccione una especialidad"),n(),g(7,A,2,3,"option",13),n()(),o(8,"td")(9,"select",11),_("change",function(a){let p=x(e).$implicit,f=c();return C(f.cambiarHorario(p,"desde",a))}),o(10,"option",12),r(11,"Desde"),n(),g(12,j,2,2,"option",14),n()(),o(13,"td")(14,"select",11),_("change",function(a){let p=x(e).$implicit,f=c();return C(f.cambiarHorario(p,"hasta",a))}),o(15,"option",12),r(16,"Hasta"),n(),g(17,k,2,2,"option",14),n()()()}if(l&2){let e=i.$implicit,t=c();s(2),H(e),s(2),b("id","especialidad-",e,""),s(3),d("ngForOf",t.especialidades),s(2),b("id","desde-",e,""),s(3),d("ngForOf",t.turnos),s(2),b("id","hasta-",e,""),s(3),d("ngForOf",t.turnos)}}var T=class l{constructor(i,e){this.firestoreService=i;this.auth=e}especialista;especialidades=[];dias=["Lunes","Martes","Mi\xE9rcoles","Jueves","Viernes","S\xE1bado"];turnos=["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00"];horariosPorDia={};huboCambios=!1;usuarioLogueado=null;ngOnInit(){return m(this,null,function*(){$(this.auth,i=>m(this,null,function*(){i?(this.usuarioLogueado=i,yield this.cargarEspecialista(),yield this.cargarEspecialidades()):this.usuarioLogueado=null}))})}cargarEspecialista(){return m(this,null,function*(){if(!this.usuarioLogueado)return;let i=this.usuarioLogueado.uid,e=yield this.firestoreService.getDocument(`especialista/${i}`);this.especialista=e.exists()?e.data():null,this.especialista?.horarios&&(this.horariosPorDia=this.especialista.horarios,this.actualizarCamposHorarios())})}cargarEspecialidades(){return m(this,null,function*(){if(!this.especialista?.especialidad)return;let i=this.especialista.especialidad,t=(yield this.firestoreService.getDocuments("especialidades")).docs.map(a=>E({id:a.id},a.data()));this.especialidades=t.filter(a=>i.includes(a.id))})}actualizarCamposHorarios(){for(let i of this.dias){let e=this.horariosPorDia[i];if(e){let t=document.getElementById(`desde-${i}`);t&&e.desde&&(t.value=e.desde);let a=document.getElementById(`hasta-${i}`);a&&e.hasta&&(a.value=e.hasta);let p=document.getElementById(`especialidad-${i}`);p&&e.especialidad&&(p.value=e.especialidad)}}}seleccionarEspecialidad(i,e){let t=e.target.value;this.horariosPorDia[i]=this.horariosPorDia[i]||{},this.horariosPorDia[i].especialidad=t,this.huboCambios=!0}cambiarHorario(i,e,t){let a=t.target.value;this.horariosPorDia[i]=this.horariosPorDia[i]||{},this.horariosPorDia[i][e]=a,this.huboCambios=!0}guardarCambios(){return m(this,null,function*(){try{for(let i of this.dias){let e=this.horariosPorDia[i];if(e){if(!e.desde||!e.hasta){yield h.default.fire({icon:"error",title:"Error",text:`Debe seleccionar horarios v\xE1lidos para el d\xEDa ${i}`});return}let t=this.convertirHoraAEntero(e.desde),a=this.convertirHoraAEntero(e.hasta);if(a<=t||a-t<.5){yield h.default.fire({icon:"error",title:"Error",text:`El horario "Hasta" debe ser al menos 30 minutos despu\xE9s del horario "Desde" para el d\xEDa ${i}.`});return}if(!e.especialidad){yield h.default.fire({icon:"error",title:"Error",text:`Debe seleccionar una especialidad para el d\xEDa ${i}`});return}}}yield this.firestoreService.updateDocument(`especialista/${this.especialista.id}`,{horarios:this.horariosPorDia}),this.huboCambios=!1,yield h.default.fire({icon:"success",title:"Guardado",text:"Horarios y especialidades guardados exitosamente"})}catch(i){console.error("Error al guardar cambios:",i),yield h.default.fire({icon:"error",title:"Error",text:"Hubo un problema al guardar los cambios"})}})}convertirHoraAEntero(i){let[e,t]=i.split(":").map(Number);return e+t/60}static \u0275fac=function(e){return new(e||l)(v(G),v(F))};static \u0275cmp=y({type:l,selectors:[["app-gestion-horarios"]],standalone:!0,features:[M],decls:35,vars:7,consts:[[1,"fondo"],[1,"container"],[1,"text-center","mt-4"],[1,"especialista-info","d-flex","align-items-center","justify-content-center","my-4"],[1,"foto-container","text-center"],["alt","Foto del Especialista",1,"perfil-img",3,"src"],[1,"datos-container","ms-4"],[1,"horarios-container"],[1,"table","table-bordered"],[4,"ngFor","ngForOf"],[1,"btn","btn-primary","px-4",3,"click","disabled"],[1,"form-select",3,"change","id"],["value","","disabled","","selected",""],[3,"value","selected",4,"ngFor","ngForOf"],[3,"selected",4,"ngFor","ngForOf"],[3,"value","selected"],[3,"selected"]],template:function(e,t){e&1&&(o(0,"section",0)(1,"div",1)(2,"h2",2),r(3,"Gesti\xF3n de Horarios y Especialidades"),n(),o(4,"div",3)(5,"div",4),P(6,"img",5),n(),o(7,"div",6)(8,"h3"),r(9),n(),o(10,"p")(11,"strong"),r(12,"DNI:"),n(),r(13),n(),o(14,"p")(15,"strong"),r(16,"Correo:"),n(),r(17),n()()(),o(18,"div",7)(19,"table",8)(20,"thead")(21,"tr")(22,"th"),r(23,"D\xEDa"),n(),o(24,"th"),r(25,"Especialidad"),n(),o(26,"th"),r(27,"Desde"),n(),o(28,"th"),r(29,"Hasta"),n()()(),o(30,"tbody"),g(31,z,18,10,"tr",9),n()()(),o(32,"div",2)(33,"button",10),_("click",function(){return t.guardarCambios()}),r(34," Guardar Cambios "),n()()()()),e&2&&(s(6),d("src",(t.especialista==null?null:t.especialista.urlFotoPerfil)||"https://via.placeholder.com/150",S),s(3),O("",t.especialista==null?null:t.especialista.nombre," ",t.especialista==null?null:t.especialista.apellido,""),s(4),u(" ",t.especialista==null?null:t.especialista.dni,""),s(4),u(" ",t.especialista==null?null:t.especialista.correo,""),s(14),d("ngForOf",t.dias),s(2),d("disabled",!t.huboCambios))},dependencies:[w,I],styles:[".fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(45deg,#ffde59,#ff6b6b);padding:20px}.perfil-img[_ngcontent-%COMP%]{width:150px;height:150px;border-radius:50%;margin-bottom:15px}.horarios-container[_ngcontent-%COMP%]{margin-top:20px}.fondo[_ngcontent-%COMP%]{padding:20px;background-color:#f8f9fa}.especialista-info[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.foto-container[_ngcontent-%COMP%]   img.perfil-img[_ngcontent-%COMP%]{width:150px;height:150px;border-radius:50%;object-fit:cover}.datos-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}.datos-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0;font-size:1.5rem}.datos-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px 0;font-size:1rem}.table[_ngcontent-%COMP%]{margin-top:20px;background:#fff}.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:center;vertical-align:middle}"]})};export{T as GestionHorariosComponent};
