import{a as k,b as s,c as O,d as S,e as j,g as w,h as E,l as N,m as L}from"./chunk-ODYPTALN.js";import{Aa as b,Ab as P,Ca as a,Da as x,Ma as h,Pa as l,Ra as o,Sa as t,Ta as m,Ua as C,Va as p,Wa as _,Xa as v,Ya as i,Za as F,ab as y,ea as g,ma as u,na as f,zb as M}from"./chunk-WNKIDOVC.js";function I(r,n){if(r&1){let e=C();o(0,"button",12),p("click",function(){let d=u(e).$implicit,G=_();return f(G.rellenarUsuario(d))}),m(1,"img",13),o(2,"span"),i(3),t()()}if(r&2){let e=n.$implicit;a(),v("alt",e.nombre),l("src",e.imagen,b),a(2),F(e.nombre)}}var V=class r{constructor(n){this.fb=n;this.loginForm=this.fb.group({correo:["",[s.required,s.email]],contrasena:["",[s.required,s.minLength(6)]]})}loginForm;usuariosRapidos=[{nombre:"Paciente 1",correo:"dominic@gmail.com",contrasena:"12345678",imagen:"https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732603765425-dominic.jpeg?alt=media&token=4011e3c4-f6df-4ef7-bf09-c4a70de63649"},{nombre:"Paciente 2",correo:"jordana@gmail.com",contrasena:"12345678",imagen:"https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732603941641-jordana.jpg?alt=media&token=74093de3-77e4-4c42-b98c-9af6c07515ac"},{nombre:"Paciente 3",correo:"hugh@gmail.com",contrasena:"12345678",imagen:"https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732604105493-drHouse.jpeg?alt=media&token=081d7297-81a3-4be3-9dcd-12e90705978f"},{nombre:"Especialista 1",correo:"david@gmail.com",contrasena:"12345678",imagen:"https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732603526550-davo.jpeg?alt=media&token=4ef21d52-ea70-4ce6-a77a-dd20689c7fe0"},{nombre:"Especialista 2",correo:"messi@gmail.com",contrasena:"123456",imagen:"https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732603014197-messi.jpg?alt=media&token=df6986b1-34b6-4014-b6cc-11e6deac5031"},{nombre:"Admin",correo:"julianAdmin@gmail.com",contrasena:"12345678",imagen:"https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732605540296-illia.jpeg?alt=media&token=dcd34edb-55dc-4342-aefc-407790cde3cc"}];rellenarUsuario(n){this.loginForm.setValue({correo:n.correo,contrasena:n.contrasena})}onLogin(){this.loginForm.valid?console.log("Usuario logueado:",this.loginForm.value):console.log("Formulario inv\xE1lido")}static \u0275fac=function(e){return new(e||r)(x(N))};static \u0275cmp=g({type:r,selectors:[["app-login"]],standalone:!0,features:[y],decls:18,vars:2,consts:[[1,"login-container"],[1,"usuarios-rapidos"],[1,"usuarios"],["class","usuario-boton",3,"click",4,"ngFor","ngForOf"],[1,"login-form"],[3,"ngSubmit","formGroup"],[1,"form-group"],["for","correo"],["id","correo","formControlName","correo","type","email","placeholder","Correo electr\xF3nico",1,"form-input"],["for","contrasena"],["id","contrasena","formControlName","contrasena","type","password","placeholder","Contrase\xF1a",1,"form-input"],["type","submit",1,"submit-button"],[1,"usuario-boton",3,"click"],[1,"usuario-imagen",3,"src","alt"]],template:function(e,c){e&1&&(o(0,"div",0)(1,"div",1)(2,"div",2),h(3,I,4,3,"button",3),t()(),o(4,"div",4)(5,"h2"),i(6,"Iniciar Sesi\xF3n"),t(),o(7,"form",5),p("ngSubmit",function(){return c.onLogin()}),o(8,"div",6)(9,"label",7),i(10,"Correo"),t(),m(11,"input",8),t(),o(12,"div",6)(13,"label",9),i(14,"Contrase\xF1a"),t(),m(15,"input",10),t(),o(16,"button",11),i(17,"Ingresar"),t()()()()),e&2&&(a(3),l("ngForOf",c.usuariosRapidos),a(4),l("formGroup",c.loginForm))},dependencies:[P,M,L,j,k,O,S,w,E],styles:[".login-container[_ngcontent-%COMP%]{display:flex;height:100vh;justify-content:space-around;align-items:center;background:linear-gradient(45deg,gold,#e48080);padding:20px}.usuarios-rapidos[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:15px}.usuarios[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:15px}.usuario-boton[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:8px;padding:10px;cursor:pointer;width:120px;height:120px;text-align:center;transition:transform .3s}.usuario-boton[_ngcontent-%COMP%]:hover{transform:scale(1.1)}.usuario-imagen[_ngcontent-%COMP%]{width:80px;height:80px}.login-form[_ngcontent-%COMP%]{background-color:#fff;padding:30px;border-radius:8px;box-shadow:0 4px 10px #0000004d}h2[_ngcontent-%COMP%]{text-align:center;margin-bottom:20px}.form-group[_ngcontent-%COMP%]{margin-bottom:20px}label[_ngcontent-%COMP%]{display:block;margin-bottom:5px;font-size:14px;font-weight:700}.form-input[_ngcontent-%COMP%]{width:100%;padding:10px;border:1px solid #ccc;border-radius:5px;font-size:16px}.submit-button[_ngcontent-%COMP%]{width:100%;padding:10px;background-color:#4caf50;color:#fff;border:none;border-radius:5px;font-size:16px;cursor:pointer;transition:background-color .3s}.submit-button[_ngcontent-%COMP%]:hover{background-color:#45a045}"]})};export{V as LoginComponent};