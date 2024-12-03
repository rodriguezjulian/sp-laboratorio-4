import{b as A,d as u,f as N,g as U,k as G,m as T,n as V,r as D,t as z}from"./chunk-LDTLK62Q.js";import{a as Y}from"./chunk-WRE3YE3W.js";import{a as B}from"./chunk-WJDROLUP.js";import{b as I}from"./chunk-5PFTZWDM.js";import"./chunk-3JXLYIF6.js";import{c as L,d as x,f,i as C}from"./chunk-EJJBCPAK.js";import{F as q}from"./chunk-JRXB4MSQ.js";import{Bb as j,Eb as g,Gb as v,Jb as k,Kc as M,Lc as w,Qc as R,Sb as s,Tb as S,Ua as y,Ub as O,Wa as l,Xa as p,_b as P,ia as _,kb as h,ob as m,ra as F,sa as E,wb as i,xb as t,yb as d}from"./chunk-SLHCDPS3.js";import{j as b}from"./chunk-4ZZIO3ZI.js";function H(a,o){if(a&1){let e=j();i(0,"button",15),g("click",function(){let n=F(e).$implicit,c=v();return E(c.rellenarUsuario(n))}),d(1,"img",16),i(2,"span"),s(3),t()()}if(a&2){let e=o.$implicit;l(),k("alt",e.nombre),m("src",e.imagen,y),l(2),S(e.nombre)}}function J(a,o){if(a&1&&(i(0,"div")(1,"strong")(2,"label",17),s(3),t()()()),a&2){let e=v();l(3),O(" ",e.msjError," ")}}var $=class a{constructor(o,e,r,n){this.router=o;this.fb=e;this.auth=r;this.firestore=n;this.loginForm=this.fb.group({correo:["",[u.required,u.email]],contrasena:["",[u.required,u.minLength(6)]]})}loginForm;msjError="";usuariosRapidos=[{nombre:"Paciente 1",correo:"dominic@gmail.com",contrasena:"12345678",imagen:"https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732603765425-dominic.jpeg?alt=media&token=4011e3c4-f6df-4ef7-bf09-c4a70de63649"},{nombre:"Paciente 2",correo:"jordana@gmail.com",contrasena:"12345678",imagen:"https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732603941641-jordana.jpg?alt=media&token=74093de3-77e4-4c42-b98c-9af6c07515ac"},{nombre:"Paciente 3",correo:"hugh@gmail.com",contrasena:"12345678",imagen:"https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732604105493-drHouse.jpeg?alt=media&token=081d7297-81a3-4be3-9dcd-12e90705978f"},{nombre:"Especialista 1",correo:"david@gmail.com",contrasena:"12345678",imagen:"https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732603526550-davo.jpeg?alt=media&token=4ef21d52-ea70-4ce6-a77a-dd20689c7fe0"},{nombre:"Especialista 2",correo:"messi@gmail.com",contrasena:"12345645",imagen:"https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732603014197-messi.jpg?alt=media&token=df6986b1-34b6-4014-b6cc-11e6deac5031"},{nombre:"Admin",correo:"julianAdmin@gmail.com",contrasena:"12345678",imagen:"https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732605540296-illia.jpeg?alt=media&token=dcd34edb-55dc-4342-aefc-407790cde3cc"}];rellenarUsuario(o){this.loginForm.setValue({correo:o.correo,contrasena:o.contrasena})}onLogin(){this.loginForm.valid?(this.Login(),this.GuardarRegistroExitoso()):console.log("Formulario inv\xE1lido")}Login(){let o=["dominic@gmail.com","jordana@gmail.com","hugh@gmail.com","david@gmail.com","messi@gmail.com","julianAdmin@gmail.com"],e=this.loginForm.get("correo")?.value,r=this.loginForm.get("contrasena")?.value;this.firestore.getEspecialistaByCorreo(e).then(n=>{if(n&&!n.habilitado){this.msjError="El especialista no est\xE1 habilitado para iniciar sesi\xF3n.";return}this.auth.login(e,r).then(c=>b(this,null,function*(){if(!o.includes(e)&&!c.user.emailVerified){this.msjError="Debe confirmar su correo electr\xF3nico antes de iniciar sesi\xF3n.";return}console.log("Usuario logueado:",c.user),this.router.navigate(["/home"])})).catch(c=>{switch(c.code){case"auth/invalid-credential":this.msjError="Email o contrase\xF1a incorrectos";break;case"auth/invalid-email":this.msjError="EMAIL INCORRECTO.";break;default:this.msjError="ERROR al ingresar sesi\xF3n, verifique datos ingresados.";break}console.error("Error en el login:",c)})}).catch(n=>{console.error("Error al verificar el especialista:",n),this.msjError="Ocurri\xF3 un problema al validar el usuario."})}bienvenida(){this.router.navigate(["/"])}obtenerUsuarioActual(){let o=this.auth.obtenerUsuarioActual();console.log("Usuario actual:",o)}GuardarRegistroExitoso(){return b(this,null,function*(){let o={usuario:this.loginForm.get("correo")?.value};yield this.firestore.createDocument("logueos",o)})}static \u0275fac=function(e){return new(e||a)(p(I),p(D),p(Y),p(q))};static \u0275cmp=_({type:a,selectors:[["app-login"]],standalone:!0,features:[P],decls:22,vars:4,consts:[[1,"login-container"],[1,"usuarios-rapidos"],[1,"usuarios"],["pasaPorArriba","Click para autocompletar","class","usuario-boton",3,"click",4,"ngFor","ngForOf"],[1,"login-form"],[3,"ngSubmit","formGroup"],[1,"form-group"],["for","correo"],["id","correo","formControlName","correo","type","email","placeholder","Correo electr\xF3nico",1,"form-input"],["for","contrasena"],["id","contrasena","formControlName","contrasena","type","password","placeholder","Contrase\xF1a",1,"form-input"],["type","submit",1,"submit-button"],[1,"d-flex","justify-content-center","mt-4"],[1,"btn","btn-primary","btn-lg","px-5","mb-4",2,"background-color","brown","color","white",3,"click"],[4,"ngIf"],["pasaPorArriba","Click para autocompletar",1,"usuario-boton",3,"click"],[1,"usuario-imagen",3,"src","alt"],[1,"form-label",2,"color","red"]],template:function(e,r){e&1&&(i(0,"div",0)(1,"div",1)(2,"div",2),h(3,H,4,3,"button",3),t()(),i(4,"div",4)(5,"h2"),s(6,"Iniciar Sesi\xF3n"),t(),i(7,"form",5),g("ngSubmit",function(){return r.onLogin()}),i(8,"div",6)(9,"label",7),s(10,"Correo"),t(),d(11,"input",8),t(),i(12,"div",6)(13,"label",9),s(14,"Contrase\xF1a"),t(),d(15,"input",10),t(),i(16,"button",11),s(17,"Ingresar"),t(),i(18,"div",12)(19,"button",13),g("click",function(){return r.bienvenida()}),s(20,"ATR\xC1S"),t()()(),h(21,J,4,1,"div",14),t()()),e&2&&(m("@slideUp",void 0),l(3),m("ngForOf",r.usuariosRapidos),l(4),m("formGroup",r.loginForm),l(14),m("ngIf",r.msjError!=""))},dependencies:[R,M,w,z,G,A,N,U,T,V,B],styles:[".login-container[_ngcontent-%COMP%]{display:flex;height:100vh;justify-content:space-around;align-items:center;background:linear-gradient(45deg,gold,#e48080);padding:20px}.usuarios-rapidos[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:15px}.usuarios[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:15px}.usuario-boton[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:8px;padding:10px;cursor:pointer;width:120px;height:120px;text-align:center;transition:transform .3s}.usuario-boton[_ngcontent-%COMP%]:hover{transform:scale(1.1)}.usuario-imagen[_ngcontent-%COMP%]{width:80px;height:80px}.login-form[_ngcontent-%COMP%]{background-color:#fff;padding:30px;border-radius:8px;box-shadow:0 4px 10px #0000004d}h2[_ngcontent-%COMP%]{text-align:center;margin-bottom:20px}.form-group[_ngcontent-%COMP%]{margin-bottom:20px}label[_ngcontent-%COMP%]{display:block;margin-bottom:5px;font-size:14px;font-weight:700}.form-input[_ngcontent-%COMP%]{width:100%;padding:10px;border:1px solid #ccc;border-radius:5px;font-size:16px}.submit-button[_ngcontent-%COMP%]{width:100%;padding:10px;background-color:#4caf50;color:#fff;border:none;border-radius:5px;font-size:16px;cursor:pointer;transition:background-color .3s}.submit-button[_ngcontent-%COMP%]:hover{background-color:#45a045}"],data:{animation:[L("slideUp",[C(":enter",[f({transform:"translateY(50px)",opacity:0}),x("1400ms cubic-bezier(0.25, 0.8, 0.25, 1)",f({transform:"translateY(0)",opacity:1}))]),C(":leave",[x("1400ms cubic-bezier(0.25, 0.8, 0.25, 1)",f({transform:"translateY(50px)",opacity:0}))])])]}})};export{$ as LoginComponent};