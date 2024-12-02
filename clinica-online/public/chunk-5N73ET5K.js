import{a as R}from"./chunk-NEDSM3HF.js";import{a as H}from"./chunk-Z6TYFYPI.js";import{b as A,f as V,i as $,r as L}from"./chunk-Y6YT2LEC.js";import{a as J}from"./chunk-OLWY7DYE.js";import{F as W}from"./chunk-FMY7REJO.js";import{$b as y,Ab as P,Cb as E,Fc as F,Gc as z,Jc as N,Lc as j,Ob as a,Pb as p,Rb as _,Sb as O,Tb as D,Ua as c,Ub as B,Va as T,Wb as I,_b as f,ac as k,ha as v,hb as C,lb as u,qa as w,ra as S,sb as t,tb as n,xb as M}from"./chunk-VJ2SRRAC.js";import{a as b,b as x,g as G,j as d}from"./chunk-4ZZIO3ZI.js";var g=G(J());function K(l,o){if(l&1){let e=M();t(0,"button",9),P("click",function(){w(e);let r=E().$implicit,s=E();return S(s.CancelarTurno(r))}),a(1," Cancelar Turno "),n()}}function Q(l,o){if(l&1&&(t(0,"tr")(1,"td"),a(2),n(),t(3,"td"),a(4),n(),t(5,"td"),a(6),n(),t(7,"td"),a(8),f(9,"titlecase"),n(),t(10,"td"),a(11),n(),t(12,"td",7)(13,"strong"),a(14),f(15,"titlecase"),n()(),t(16,"td"),C(17,K,2,0,"button",8),n()()),l&2){let e=o.$implicit;c(2),_("",e.especialista.nombre," ",e.especialista.apellido,""),c(2),_("",e.paciente.nombre," ",e.paciente.apellido,""),c(2),p(e.fecha),c(2),p(y(9,10,e.especialidad)),c(3),p(e.desde),c(),u("EstadoTurnoColor",e.estado),c(2),p(y(15,12,e.estado)),c(3),u("ngIf",e.estado==="pendiente")}}var U=class l{constructor(o){this.firestoreService=o}turnos=[];BuscarEspecialistaEspecialidad="";ngOnInit(){return d(this,null,function*(){yield this.cargarTurnos()})}cargarTurnos(){return d(this,null,function*(){try{let o=yield this.firestoreService.getCollection("turnos");this.turnos=yield Promise.all(o.map(e=>d(this,null,function*(){let i=yield this.firestoreService.getDocument(`especialista/${e.uidEspecialista}`),r=i.exists()?i.data():{nombre:"Desconocido",apellido:""},s=yield this.firestoreService.getDocument(`especialidades/${e.uidEspecialidad}`),h=s.exists()?s.data():{descripcion:"Desconocida"},m=yield this.firestoreService.getDocument(`paciente/${e.uidPaciente}`),q=m.exists()?m.data():{nombre:"Desconocida",apellido:"Desconocido"};return x(b({},e),{especialista:r,especialidad:h.descripcion,paciente:q})}))),this.turnos.sort((e,i)=>{let r=new Date(e.fecha).getTime(),s=new Date(i.fecha).getTime();if(r!==s)return r-s;let h=e.desde,m=i.desde;return h.localeCompare(m)}),console.log("Turnos obtenidos: ",this.turnos)}catch(o){console.error("Error al cargar los turnos:",o)}})}CancelarTurno(o){g.default.fire({title:"Cancelar Turno",input:"textarea",inputLabel:"Motivo de la cancelaci\xF3n",inputPlaceholder:"Escribe tu comentario...",showCancelButton:!0,confirmButtonText:"Cancelar Turno",cancelButtonText:"Cerrar"}).then(e=>d(this,null,function*(){if(e.isConfirmed&&e.value){let i=e.value.trim();yield this.actualizarEstadoTurno(o,"Cancelado",i)}}))}actualizarEstadoTurno(o,e,i=""){return d(this,null,function*(){try{let r=x(b({},o),{estado:e,comentario:i||o.comentario});yield this.firestoreService.updateDocument(`turnos/${o.id}`,r),g.default.fire("\xC9xito","El turno fue cancelado exitosamente.","success"),yield this.cargarTurnos()}catch(r){console.error("Error al actualizar el turno:",r),g.default.fire("Error","No se pudo cancelar el turno. Intenta de nuevo.","error")}})}static \u0275fac=function(e){return new(e||l)(T(W))};static \u0275cmp=v({type:l,selectors:[["app-turnos"]],standalone:!0,features:[I],decls:26,vars:5,consts:[[1,"container-fluid","cont-primary","fondo"],[1,"h2-turnos-clinica"],[1,"row","d-flex","justify-content-center","align-items-center","row-input","mb-2"],["type","text","placeholder","Buscar especialista o especialidad","id","input-buscar-esp",1,"mb-2",3,"ngModelChange","ngModel"],[1,"mb-5","row","d-flex","justify-content-center","align-items-start","row-table","fondotabla"],[1,"table-mis-horarios"],[4,"ngFor","ngForOf"],[3,"EstadoTurnoColor"],["class","btn btn-danger btn-sm",3,"click",4,"ngIf"],[1,"btn","btn-danger","btn-sm",3,"click"]],template:function(e,i){e&1&&(t(0,"div",0)(1,"h2",1),a(2,"Turnos de la cl\xEDnica"),n(),t(3,"div",2)(4,"input",3),B("ngModelChange",function(s){return D(i.BuscarEspecialistaEspecialidad,s)||(i.BuscarEspecialistaEspecialidad=s),s}),n()(),t(5,"div",4)(6,"table",5)(7,"thead")(8,"tr")(9,"th"),a(10,"Especialista"),n(),t(11,"th"),a(12,"Paciente"),n(),t(13,"th"),a(14,"D\xEDa"),n(),t(15,"th"),a(16,"Especialidad"),n(),t(17,"th"),a(18,"Horario"),n(),t(19,"th"),a(20,"Estado"),n(),t(21,"th"),a(22,"Acci\xF3n"),n()()(),t(23,"tbody"),C(24,Q,18,14,"tr",6),f(25,"buscarEspecialistaEspecialidad"),n()()()()),e&2&&(c(4),O("ngModel",i.BuscarEspecialistaEspecialidad),c(20),u("ngForOf",k(25,2,i.turnos,i.BuscarEspecialistaEspecialidad)))},dependencies:[j,F,z,N,L,A,V,$,R,H],styles:[".fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column;margin:0;padding:0;background:linear-gradient(45deg,gold,#e48080);background-attachment:fixed;background-size:cover;background-repeat:no-repeat}.fondotabla[_ngcontent-%COMP%]{background-color:#fff;margin:0 15%;padding:15px;border-radius:8px;box-shadow:0 4px 8px #0003}.table-mis-horarios[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;background-color:#fff}.table-mis-horarios[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-mis-horarios[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:12px 15px;border-bottom:1px solid #ddd;text-align:center}.table-mis-horarios[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%]{border-bottom:none}.table-mis-horarios[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#f4f4f4;text-transform:uppercase;font-weight:700}.table-mis-horarios[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#f9f9f9}.h2-turnos-clinica[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;font-size:2rem;color:#333;text-shadow:0 2px 3px rgba(0,0,0,.2);margin-bottom:20px}#input-buscar-esp[_ngcontent-%COMP%]{border:1px solid #ccc;border-radius:4px;background-color:#fff;padding:10px;font-size:1rem;width:30%;transition:box-shadow .3s}#input-buscar-esp[_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0 10px #0003}"]})};export{U as TurnosComponent};
