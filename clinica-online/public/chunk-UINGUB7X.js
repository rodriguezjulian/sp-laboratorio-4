import{a as w,b as D,c as j,d as U}from"./chunk-2DCWAD4R.js";import"./chunk-JTZ6XII4.js";import{b as C,d as l,f as y,g as A,k as I,l as F,m as R,n as L,r as P,t as N}from"./chunk-LDTLK62Q.js";import{a as k}from"./chunk-WRE3YE3W.js";import{a as z}from"./chunk-OLWY7DYE.js";import{a as O}from"./chunk-7FG5ZD4D.js";import{b as S}from"./chunk-5PFTZWDM.js";import"./chunk-3JXLYIF6.js";import{F as M,u as T,z as q}from"./chunk-JRXB4MSQ.js";import{Eb as v,Lc as E,Qc as x,Sb as n,Wa as a,Xa as p,_b as _,ia as b,kb as d,ob as s,wb as i,xb as e,yb as c}from"./chunk-SLHCDPS3.js";import{g as V,j as h}from"./chunk-4ZZIO3ZI.js";var f=V(z());function B(r,t){r&1&&(i(0,"span",28),n(1,"El nombre es obligatorio."),e())}function $(r,t){r&1&&(i(0,"span",28),n(1,"Solo se permiten letras."),e())}function Y(r,t){r&1&&(i(0,"span",28),n(1,"El apellido es obligatorio."),e())}function H(r,t){r&1&&(i(0,"span",28),n(1,"Solo se permiten letras."),e())}function K(r,t){r&1&&(i(0,"span",28),n(1,"La edad es obligatoria."),e())}function W(r,t){r&1&&(i(0,"span",28),n(1,"La edad m\xEDnima es 18 a\xF1os."),e())}function J(r,t){r&1&&(i(0,"span",28),n(1,"La edad m\xE1xima es 100 a\xF1os."),e())}function Q(r,t){r&1&&(i(0,"span",28),n(1,"El DNI es obligatorio."),e())}function X(r,t){r&1&&(i(0,"span",28),n(1,"Debe contener exactamente 8 n\xFAmeros."),e())}function Z(r,t){r&1&&(i(0,"span",28),n(1,"El correo es obligatorio."),e())}function ee(r,t){r&1&&(i(0,"span",28),n(1,"Formato de correo inv\xE1lido."),e())}function te(r,t){r&1&&(i(0,"span",28),n(1,"La contrase\xF1a es obligatoria."),e())}function re(r,t){r&1&&(i(0,"span",28),n(1,"M\xEDnimo 8 caracteres."),e())}function ie(r,t){r&1&&(i(0,"span",28),n(1,"La foto de perfil es obligatoria."),e())}function oe(r,t){r&1&&(i(0,"div",29),n(1," Por favor verifica que no eres un robot. "),e())}var G=class r{constructor(t,m,o,u,g,ne,ae){this.fb=t;this.authService=m;this.router=o;this.imagenService=u;this.auth=g;this.firestore=ne;this.loader=ae;this.registroForm=this.fb.group({nombre:["",l.required],apellido:["",l.required],edad:["",[l.required,l.min(18),l.max(100)]],dni:["",[l.required,l.pattern("^[0-9]{8}$")]],correo:["",[l.required,l.email]],contrasena:["",[l.required,l.minLength(8)]],fotoPerfil:["",l.required]})}registroForm;file;showCaptchaError=!1;captcha="";token=!1;msjError="";usuarioLogueado=null;ngOnInit(){return h(this,null,function*(){q(this.auth,t=>{t?this.usuarioLogueado=t:this.usuarioLogueado=null})})}Home(){this.router.navigate([""])}uploadImageUno(t){this.file=t.target.files[0]}onSubmit(){return h(this,null,function*(){this.loader.setLoader(!0);for(let t in this.registroForm.controls){let m=this.registroForm.get(t);m?.invalid&&(this.msjError=`Campo inv\xE1lido: ${t}`,console.log(`Campo inv\xE1lido: ${t}`,m.errors))}if(this.registroForm.valid)if(this.token)yield this.crearAdministrador(),this.registroForm.reset();else{this.loader.setLoader(!1),f.default.fire({title:"Error",text:"Verifica que no es un robot para continuar",icon:"error"});return}else f.default.fire({title:"Error",text:"Por favor verifica los datos ingresados.",icon:"error"});this.loader.setLoader(!1)})}executeRecaptchaVisible(t){this.token=!this.token}SeccionUsuarios(){this.router.navigate(["/seccionUsuarios"])}crearAdministrador(){return h(this,null,function*(){try{console.log("dentro de crear Admin");let t=yield this.imagenService.subirImg(this.file);console.log("ya subi la img "+t);let m={nombre:this.registroForm.get("nombre")?.value,apellido:this.registroForm.get("apellido")?.value,edad:this.registroForm.get("edad")?.value,dni:this.registroForm.get("dni")?.value,correo:this.registroForm.get("correo")?.value,contrasena:this.registroForm.get("contrasena")?.value,urlFotoPerfil:t},o=this.usuarioLogueado.uid,u=yield this.firestore.getUsuarioInfo(o);yield this.authService.createUser("administrador",m,m.correo,m.contrasena,u.correo,u.contrasena),f.default.fire({title:"Administrador creado",text:"\xA1Ya puede iniciar sesi\xF3n!",icon:"success"}),this.usuarioLogueado==null?this.router.navigate(["/login"]):this.router.navigate(["/home"])}catch{this.loader.setLoader(!1),f.default.fire({title:"Error",text:"Ocurri\xF3 un problema al crear el administrador.",icon:"error"})}})}hasError(t,m){let o=this.registroForm.get(t);return!!o&&o.hasError(m)&&(o.dirty||o.touched)}static \u0275fac=function(m){return new(m||r)(p(P),p(k),p(S),p(U),p(T),p(M),p(O))};static \u0275cmp=b({type:r,selectors:[["app-registro-admin"]],standalone:!0,features:[_],decls:57,vars:16,consts:[[1,"fondo"],[1,"container"],[1,"form-container"],[1,"card"],[1,"card-body"],[1,"title"],[1,"subtitle"],[3,"ngSubmit","formGroup"],[1,"form-group"],["for","nombre"],["id","nombre","formControlName","nombre","type","text",1,"form-input"],["class","error",4,"ngIf"],["for","apellido"],["id","apellido","formControlName","apellido","type","text",1,"form-input"],["for","edad"],["id","edad","formControlName","edad","type","number",1,"form-input"],["for","dni"],["id","dni","formControlName","dni","type","text",1,"form-input"],["for","correo"],["id","correo","formControlName","correo","type","email",1,"form-input"],["for","contrasena"],["id","contrasena","formControlName","contrasena","type","password",1,"form-input"],["for","fotoPerfil"],["type","file","id","fotoPerfil","formControlName","fotoPerfil",3,"change"],["siteKey","6LfBWIoqAAAAAG9GDoRLUsrzEVeUtSbt1F7z--Y7",3,"resolved"],["class","captcha-error",4,"ngIf"],[1,"button-container"],["type","submit",1,"submit-button"],[1,"error"],[1,"captcha-error"]],template:function(m,o){m&1&&(i(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h2",5),n(6,"Registro de Administrador"),e(),i(7,"p",6),n(8,"Por favor ingrese los datos requeridos"),e(),i(9,"form",7),v("ngSubmit",function(){return o.onSubmit()}),i(10,"div",8)(11,"label",9),n(12,"Nombre"),e(),c(13,"input",10),d(14,B,2,0,"span",11)(15,$,2,0,"span",11),e(),i(16,"div",8)(17,"label",12),n(18,"Apellido"),e(),c(19,"input",13),d(20,Y,2,0,"span",11)(21,H,2,0,"span",11),e(),i(22,"div",8)(23,"label",14),n(24,"Edad"),e(),c(25,"input",15),d(26,K,2,0,"span",11)(27,W,2,0,"span",11)(28,J,2,0,"span",11),e(),i(29,"div",8)(30,"label",16),n(31,"DNI"),e(),c(32,"input",17),d(33,Q,2,0,"span",11)(34,X,2,0,"span",11),e(),i(35,"div",8)(36,"label",18),n(37,"Correo"),e(),c(38,"input",19),d(39,Z,2,0,"span",11)(40,ee,2,0,"span",11),e(),i(41,"div",8)(42,"label",20),n(43,"Contrase\xF1a"),e(),c(44,"input",21),d(45,te,2,0,"span",11)(46,re,2,0,"span",11),e(),i(47,"div",8)(48,"label",22),n(49,"Foto de perfil"),e(),i(50,"input",23),v("change",function(g){return o.uploadImageUno(g)}),e(),d(51,ie,2,0,"span",11),e(),i(52,"re-captcha",24),v("resolved",function(g){return o.executeRecaptchaVisible(g)}),e(),d(53,oe,2,0,"div",25),i(54,"div",26)(55,"button",27),n(56,"Registrar Administrador"),e()()()()()()()()),m&2&&(a(9),s("formGroup",o.registroForm),a(5),s("ngIf",o.hasError("nombre","required")),a(),s("ngIf",o.hasError("nombre","pattern")),a(5),s("ngIf",o.hasError("apellido","required")),a(),s("ngIf",o.hasError("apellido","pattern")),a(5),s("ngIf",o.hasError("edad","required")),a(),s("ngIf",o.hasError("edad","min")),a(),s("ngIf",o.hasError("edad","max")),a(5),s("ngIf",o.hasError("dni","required")),a(),s("ngIf",o.hasError("dni","pattern")),a(5),s("ngIf",o.hasError("correo","required")),a(),s("ngIf",o.hasError("correo","email")),a(5),s("ngIf",o.hasError("contrasena","required")),a(),s("ngIf",o.hasError("contrasena","minlength")),a(5),s("ngIf",o.hasError("fotoPerfil","required")),a(2),s("ngIf",!o.token&&o.showCaptchaError))},dependencies:[N,I,C,F,y,A,R,L,x,E,D,w,j],styles:[".fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column;align-items:center;margin:0;padding:0;background:linear-gradient(45deg,gold,#e48080);background-attachment:fixed;background-size:cover;background-repeat:no-repeat}.error[_ngcontent-%COMP%]{color:red}.container[_ngcontent-%COMP%]{max-width:600px;width:100%;padding:20px}.card[_ngcontent-%COMP%]{background-color:#343a40;border-radius:1rem;padding:2rem;color:#fff;text-align:center;box-shadow:0 8px 20px #0003}.form-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:20px}label[_ngcontent-%COMP%]{margin-bottom:5px;font-size:.9rem;color:#ccc;text-align:left}.form-input[_ngcontent-%COMP%]{padding:10px;border:1px solid rgba(255,255,255,.3);border-radius:5px;background-color:#ffffff1a;color:#fff;font-size:1rem;transition:border .3s}.form-input[_ngcontent-%COMP%]:focus{outline:none;border:1px solid #ffee00}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:20px}.submit-button[_ngcontent-%COMP%]{padding:10px 20px;font-size:1rem;border:none;background-color:#4caf50;color:#fff;border-radius:5px;cursor:pointer;transition:background-color .3s ease}.submit-button[_ngcontent-%COMP%]:hover{background-color:#45a045}"]})};export{G as RegistroAdminComponent};