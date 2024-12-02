import{a as O,b as g}from"./chunk-P4PAYY2C.js";import{a as L}from"./chunk-WJDROLUP.js";import{a as V}from"./chunk-OLWY7DYE.js";import{b as I}from"./chunk-5PFTZWDM.js";import"./chunk-3JXLYIF6.js";import{c as R,d as k,f as w,i as N}from"./chunk-EJJBCPAK.js";import{F as z}from"./chunk-JRXB4MSQ.js";import{Bb as A,Eb as u,Gb as S,Jc as U,Kc as X,Qc as F,Sb as c,Ua as C,Vb as E,Wa as d,Xa as P,_b as D,ia as T,kb as v,ob as m,ra as _,sa as x,wb as n,xb as r,yb as y}from"./chunk-SLHCDPS3.js";import{g as H,j as f}from"./chunk-4ZZIO3ZI.js";var j=H(V());function B(l,e){if(l&1){let t=A();n(0,"div",8)(1,"button",9),u("click",function(){let i=_(t).$implicit,p=S();return x(p.descargarTurnosPaciente(i))}),y(2,"img",10),n(3,"p",11),c(4),r()(),n(5,"button",12),u("click",function(){let i=_(t).$implicit,p=S();return x(p.verHistoria(i))}),c(6,"Historia"),r()()}if(l&2){let t=e.$implicit;d(2),m("src",t.urlFotoPerfil,C),d(2),E("",t.nombre," ",t.apellido,"")}}function Y(l,e){if(l&1){let t=A();n(0,"div",8)(1,"button",13)(2,"img",14),u("click",function(){let i=_(t).$implicit,p=S();return x(p.toggleHabilitado(i))}),r(),n(3,"p",11),c(4),r()()()}if(l&2){let t=e.$implicit;d(2),m("src",t.urlFotoPerfil,C)("ngClass",t.habilitado?"border-success":"border-danger"),d(2),E("",t.nombre," ",t.apellido,"")}}function W(l,e){if(l&1&&(n(0,"div",8)(1,"button",13),y(2,"img",15),n(3,"p",11),c(4),r()()()),l&2){let t=e.$implicit;d(2),m("src",t.urlFotoPerfil,C),d(2),E("",t.nombre," ",t.apellido,"")}}var G=class l{constructor(e,t){this.router=e;this.firestoreService=t}pacientes=[];especialistas=[];turnos=[];administradores=[];navigateTo(e){switch(e){case"paciente":this.router.navigate(["/registroPaciente"]);break;case"especialista":this.router.navigate(["/registroEspecialista"]);break;case"admin":this.router.navigate(["/registroAdmin"]);break;default:console.error("Ruta no definida para:",e)}}ngOnInit(){this.loadUsers(),this.loadTurnos()}verHistoria(e){return f(this,null,function*(){let t=yield this.firestoreService.getCollection("turnos",{where:[{field:"uidPaciente",op:"==",value:e.id},{field:"estado",op:"==",value:"Realizado"}]});console.log("Paciente seleccionado: ",e),console.log("Turnos obtenidos: ",t);let a=[];t.forEach(o=>{let b={fecha:o.fecha||"N/A",estado:o.estado||"N/A",diagnostico:o.diagonostico||"N/A",altura:o.historiaClinica?.altura||"N/A",peso:o.historiaClinica?.peso||"N/A",presion:o.historiaClinica?.presion||"N/A",temperatura:o.historiaClinica?.temperatura||"N/A",dato1:o.historiaClinica?.datosDinamicos?.[0]?`${o.historiaClinica.datosDinamicos[0].clave??"N/A"} ${o.historiaClinica.datosDinamicos[0].valor??"N/A"}`:"N/A",dato2:o.historiaClinica?.datosDinamicos?.[1]?`${o.historiaClinica.datosDinamicos[1].clave??"N/A"} ${o.historiaClinica.datosDinamicos[1].valor??"N/A"}`:"N/A",dato3:o.historiaClinica?.datosDinamicos?.[2]?`${o.historiaClinica.datosDinamicos[2].clave??"N/A"} ${o.historiaClinica.datosDinamicos[2].valor??"N/A"}`:"N/A"};a.push(b)});let p=`
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; text-align: left; table-layout: fixed;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="min-width: 100px;">Fecha</th>
            <th style="min-width: 100px;">Estado</th>
            <th style="min-width: 200px;">Diagn\xF3stico</th>
            <th style="min-width: 100px;">Altura</th>
            <th style="min-width: 100px;">Peso</th>
            <th style="min-width: 100px;">Presi\xF3n</th>
            <th style="min-width: 120px;">Temperatura</th>
            <th style="min-width: 200px;">Dato 1</th>
            <th style="min-width: 200px;">Dato 2</th>
            <th style="min-width: 200px;">Dato 3</th>
          </tr>
        </thead>
        <tbody>
          ${a.map(o=>`
      <tr>
        <td>${o.fecha}</td>
        <td>${o.estado}</td>
        <td>${o.diagnostico}</td>
        <td>${o.altura}</td>
        <td>${o.peso}</td>
        <td>${o.presion}</td>
        <td>${o.temperatura}</td>
        <td>${o.dato1}</td>
        <td>${o.dato2}</td>
        <td>${o.dato3}</td>
      </tr>
    `).join("")}
        </tbody>
      </table>
    </div>
  `;j.default.fire({title:"Historia Cl\xEDnica",html:p,width:"1500px",showCloseButton:!0,confirmButtonText:"Cerrar",scrollbarPadding:!1})})}toggleHabilitado(e){return f(this,null,function*(){e.habilitado=!e.habilitado;try{yield this.firestoreService.updateDocument(`especialista/${e.id}`,{habilitado:e.habilitado}),console.log("Estado actualizado correctamente")}catch(t){console.error("Error al actualizar el estado:",t)}})}loadTurnos(){return f(this,null,function*(){try{this.turnos=yield this.firestoreService.getCollection("turnos")}catch(e){console.error("Error al cargar los turnos:",e)}})}descargarTurnosPaciente(e){return f(this,null,function*(){let t=this.turnos.filter(s=>s.uidPaciente===e.id);if(t.length===0){console.warn("No se encontraron turnos para este paciente.");return}let a=yield this.firestoreService.getEspecialidades(),i=yield this.firestoreService.getEspecialistas();t.forEach(s=>{let M,$;a.forEach(h=>{s.uidEspecialidad==h.id&&(M=h.descripcion)}),i.forEach(h=>{s.uidEspecialista==h.id&&($=`${h.nombre} ${h.apellido}`)}),s.especialidadNombre=M,s.especialistaNombre=$});let p=t.map(s=>({Fecha:s.fecha,Hora:`${s.desde} - ${s.hasta}`,Especialista:`${s.especialistaNombre}`,Especialidad:s.especialidadNombre,Estado:s.estado})),o=g.json_to_sheet(p),b=g.book_new();g.book_append_sheet(b,o,"TurnosPaciente"),O(b,`Turnos_${e.nombre}_${e.apellido}.xlsx`)})}loadUsers(){return f(this,null,function*(){try{this.pacientes=yield this.firestoreService.getPacientes(),this.especialistas=yield this.firestoreService.getEspecialistas(),this.administradores=yield this.firestoreService.getAdministradores()}catch(e){console.error("Error al cargar los usuarios:",e)}})}exportarUsuariosExcel(){let e=[];e.push(["Pacientes"]),e.push(["Nombre","Apellido","Correo","DNI","Edad","Obra Social"]),this.pacientes.forEach(i=>{e.push([i.nombre,i.apellido,i.correo,i.dni,i.edad,i.obraSocial||"N/A"])}),e.push([]),e.push(["Especialistas"]),e.push(["Nombre","Apellido","Correo","DNI","Edad","Especialidades","Habilitado"]),this.especialistas.forEach(i=>{e.push([i.nombre,i.apellido,i.correo,i.dni,i.edad,i.especialidades,i.habilitado?"S\xED":"No"])}),e.push([]),e.push(["Administradores"]),e.push(["Nombre","Apellido","Correo","DNI","Edad"]),this.administradores.forEach(i=>{e.push([i.nombre,i.apellido,i.correo,i.dni,i.edad])});let t=g.aoa_to_sheet(e),a=g.book_new();g.book_append_sheet(a,t,"Usuarios"),O(a,"usuarios.xlsx")}static \u0275fac=function(t){return new(t||l)(P(I),P(z))};static \u0275cmp=T({type:l,selectors:[["app-seccion-usuarios"]],standalone:!0,features:[D],decls:26,vars:4,consts:[[1,"fondo"],[1,"container"],[1,"button-container","mb-4"],[1,"action-button",3,"click"],["pasaPorArriba","Descarga datos de TODOS los usuarios",1,"descargaGral",3,"click"],[1,"text-center","mt-5"],[1,"row","text-center"],["class","col-6 col-sm-4 col-md-3 col-lg-2 mb-4",4,"ngFor","ngForOf"],[1,"col-6","col-sm-4","col-md-3","col-lg-2","mb-4"],["pasaPorArriba","Click en imagen para descargar turnos del paciente",1,"btn-usuario",2,"border","none",3,"click"],["alt","Foto del paciente",1,"rounded-circle","img-fluid",3,"src"],[1,"mt-2"],[1,"x",3,"click"],[1,"btn-usuario",2,"border","none"],["alt","Foto del especialista",1,"rounded-circle","img-fluid",2,"border","3px solid",3,"click","src","ngClass"],["alt","Foto del administrador",1,"rounded-circle","img-fluid",3,"src"]],template:function(t,a){t&1&&(n(0,"section",0)(1,"div",1)(2,"div",2)(3,"button",3),u("click",function(){return a.navigateTo("paciente")}),c(4,"AGREGAR PACIENTE"),r(),n(5,"button",3),u("click",function(){return a.navigateTo("especialista")}),c(6,"AGREGAR ESPECIALISTA"),r(),n(7,"button",3),u("click",function(){return a.navigateTo("admin")}),c(8,"AGREGAR ADMIN"),r(),n(9,"button",4),u("click",function(){return a.exportarUsuariosExcel()}),c(10,"DESCARGAR EXCEL GRAL"),r()(),n(11,"h3",5)(12,"strong"),c(13,"PACIENTES"),r()(),n(14,"div",6),v(15,B,7,3,"div",7),r(),n(16,"h3",5)(17,"strong"),c(18,"ESPECIALISTAS"),r()(),n(19,"div",6),v(20,Y,5,4,"div",7),r(),n(21,"h3",5)(22,"strong"),c(23,"ADMINISTRADORES"),r()(),n(24,"div",6),v(25,W,5,3,"div",7),r()()()),t&2&&(m("@fadeInUp",void 0),d(15),m("ngForOf",a.pacientes),d(5),m("ngForOf",a.especialistas),d(5),m("ngForOf",a.administradores))},dependencies:[F,U,X,L],styles:[".fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(45deg,#ffde59,#ff6b6b)}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;gap:20px;margin-top:20px}.action-button[_ngcontent-%COMP%]{padding:15px 30px;font-size:1.2rem;font-weight:700;color:#fff;background-color:#343a40;border:none;border-radius:8px;cursor:pointer;transition:all .3s ease-in-out}.x[_ngcontent-%COMP%]{font-size:1rem!important;border-radius:6px;background-color:#000;color:#fff}.x[_ngcontent-%COMP%]:hover{background-color:green}.action-button[_ngcontent-%COMP%]:hover{background-color:#f0f;color:#000;transform:scale(1.1)}.descargaGral[_ngcontent-%COMP%]{padding:15px 30px;font-size:1.2rem;font-weight:700;color:#fff;background-color:#343a40;border:none;border-radius:8px;cursor:pointer;transition:all .3s ease-in-out;background-color:#adff2f;color:red;transform:scale(1.1)}.descargaGral[_ngcontent-%COMP%]:hover{background-color:#0ff}.action-button[_ngcontent-%COMP%]:active{transform:scale(1)}.fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;align-items:flex-start;justify-content:center;background:linear-gradient(45deg,#ffde59,#ff6b6b)}.container[_ngcontent-%COMP%]{text-align:center}.card-img-top[_ngcontent-%COMP%]{height:200px;object-fit:cover}.card[_ngcontent-%COMP%]{box-shadow:0 4px 8px #0003;border:none;border-radius:15px}h3[_ngcontent-%COMP%]{color:#343a40;margin-bottom:20px}.fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column;align-items:center;margin:0;padding:0;background:linear-gradient(45deg,gold,#e48080);background-attachment:fixed;background-size:cover;background-repeat:no-repeat}.habilitado[_ngcontent-%COMP%]{border:8px solid #28a745}.deshabilitado[_ngcontent-%COMP%]{border:8px solid #dc3545}.badge[_ngcontent-%COMP%]{padding:5px 10px;font-size:.9rem;cursor:pointer}.btn-usuario[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;background-color:transparent}.btn-usuario[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100px;height:100px;object-fit:cover}.btn-usuario[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:8px;font-weight:700;color:#333}.border-success[_ngcontent-%COMP%]{border-color:#28a745!important}.border-danger[_ngcontent-%COMP%]{border-color:#dc3545!important}"],data:{animation:[R("fadeInUp",[N(":enter",[w({transform:"translateY(20px)",opacity:0}),k("500ms ease-in",w({transform:"translateY(0)",opacity:1}))]),N(":leave",[k("500ms ease-out",w({transform:"translateY(20px)",opacity:0}))])])]}})};export{G as SeccionUsuariosComponent};
