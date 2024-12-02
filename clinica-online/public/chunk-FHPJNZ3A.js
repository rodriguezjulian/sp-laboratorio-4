import{a as D,b as z,c as B,d as $}from"./chunk-MZH57SVV.js";import"./chunk-GWYKRNKQ.js";import{b as k,d as n,f as w,g as N,j as P,k as M,l as O,m as V,q as j,s as T}from"./chunk-Y6YT2LEC.js";import{a as G}from"./chunk-2VMLSOPW.js";import{a as K}from"./chunk-OLWY7DYE.js";import{b as I}from"./chunk-OFTEXQ5P.js";import"./chunk-QCL7JASP.js";import{F as L,u as U,z as q}from"./chunk-FMY7REJO.js";import{Ab as c,Cb as b,Gc as y,Lc as R,Ob as o,Qb as E,Ua as u,Va as s,Wb as F,ha as S,hb as x,lb as _,pb as A,qa as v,ra as h,sb as i,tb as e,ub as d,xb as C}from"./chunk-VJ2SRRAC.js";import{g as Y,j as g}from"./chunk-4ZZIO3ZI.js";var p=Y(K());function W(m,t){if(m&1&&(i(0,"div")(1,"strong")(2,"label",30),o(3),e()()()),m&2){let r=b();u(3),E(" ",r.msjError," ")}}function J(m,t){if(m&1){let r=C();i(0,"button",31),c("click",function(){v(r);let l=b();return h(l.SeccionUsuarios())}),o(1," ATRAS "),e()}}function Q(m,t){if(m&1){let r=C();i(0,"button",31),c("click",function(){v(r);let l=b();return h(l.Home())}),o(1," ATRAS "),e()}}var H=class m{constructor(t,r,a,l,f,X){this.fb=t;this.authService=r;this.router=a;this.imagenService=l;this.auth=f;this.firestore=X;this.registroForm=this.fb.group({nombre:["",n.required],apellido:["",n.required],edad:["",[n.required,n.min(18),n.max(100)]],dni:["",[n.required,n.pattern("^[0-9]{8}$")]],correo:["",[n.required,n.email]],contrasena:["",[n.required,n.minLength(8)]],fotoPerfil:["",n.required]})}registroForm;file;showCaptchaError=!1;captcha="";token=!1;msjError="";usuarioLogueado=null;ngOnInit(){return g(this,null,function*(){q(this.auth,t=>{t?this.usuarioLogueado=t:this.usuarioLogueado=null})})}Home(){this.router.navigate([""])}uploadImageUno(t){this.file=t.target.files[0]}onSubmit(){return g(this,null,function*(){for(let t in this.registroForm.controls){let r=this.registroForm.get(t);r?.invalid&&(this.msjError=`Campo inv\xE1lido: ${t}`,console.log(`Campo inv\xE1lido: ${t}`,r.errors))}if(this.registroForm.valid)if(this.token)yield this.crearAdministrador(),this.registroForm.reset();else{p.default.fire({title:"Error",text:"Verifica que no es un robot para continuar",icon:"error"});return}else p.default.fire({title:"Error",text:"Por favor verifica los datos ingresados.",icon:"error"})})}executeRecaptchaVisible(t){this.token=!this.token}SeccionUsuarios(){this.router.navigate(["/seccionUsuarios"])}crearAdministrador(){return g(this,null,function*(){try{console.log("dentro de crear Admin");let t=yield this.imagenService.subirImg(this.file);console.log("ya subi la img "+t);let r={nombre:this.registroForm.get("nombre")?.value,apellido:this.registroForm.get("apellido")?.value,edad:this.registroForm.get("edad")?.value,dni:this.registroForm.get("dni")?.value,correo:this.registroForm.get("correo")?.value,contrasena:this.registroForm.get("contrasena")?.value,urlFotoPerfil:t},a=this.usuarioLogueado.uid,l=yield this.firestore.getUsuarioInfo(a);yield this.authService.createUser("administrador",r,r.correo,r.contrasena,l.correo,l.contrasena),p.default.fire({title:"Administrador creado",text:"\xA1Ya puede iniciar sesi\xF3n!",icon:"success"}),this.usuarioLogueado==null?this.router.navigate(["/login"]):this.router.navigate(["/home"])}catch{p.default.fire({title:"Error",text:"Ocurri\xF3 un problema al crear el administrador.",icon:"error"})}})}static \u0275fac=function(r){return new(r||m)(s(j),s(G),s(I),s($),s(U),s(L))};static \u0275cmp=S({type:m,selectors:[["app-registro-admin"]],standalone:!0,features:[F],decls:46,vars:3,consts:[[1,"fondo"],[1,"container"],[1,"form-container"],[1,"card"],[1,"card-body"],[1,"title"],[1,"subtitle"],[3,"ngSubmit","formGroup"],[1,"form-group"],["for","nombre"],["id","nombre","formControlName","nombre","type","text",1,"form-input"],["for","apellido"],["id","apellido","formControlName","apellido","type","text",1,"form-input"],["for","edad"],["id","edad","formControlName","edad","type","number",1,"form-input"],["for","dni"],["id","dni","formControlName","dni","type","text",1,"form-input"],["for","correo"],["id","correo","formControlName","correo","type","email",1,"form-input"],["for","contrasena"],["id","contrasena","formControlName","contrasena","type","password",1,"form-input"],[1,"col-md-6","form-floating","form-control-group","p-1","mb-2"],["type","file","id","fotoPerfil","formControlName","fotoPerfil",1,"form-control","small-input",3,"change"],["for","fotoPerfil",1,"form-label","small-label"],["siteKey","6LfBWIoqAAAAAG9GDoRLUsrzEVeUtSbt1F7z--Y7",3,"resolved"],[1,"button-container"],["type","submit",1,"submit-button"],[4,"ngIf"],[1,"text-end"],[1,"btn","btn-primary","btn-lg","px-5","mb-4",2,"background-color","brown","color","white"],[1,"form-label",2,"color","red"],[1,"btn","btn-primary","btn-lg","px-5","mb-4",2,"background-color","brown","color","white",3,"click"]],template:function(r,a){r&1&&(i(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h2",5),o(6,"Registro de Administrador"),e(),i(7,"p",6),o(8,"Por favor ingrese los datos requeridos"),e(),i(9,"form",7),c("ngSubmit",function(){return a.onSubmit()}),i(10,"div",8)(11,"label",9),o(12,"Nombre"),e(),d(13,"input",10),e(),i(14,"div",8)(15,"label",11),o(16,"Apellido"),e(),d(17,"input",12),e(),i(18,"div",8)(19,"label",13),o(20,"Edad"),e(),d(21,"input",14),e(),i(22,"div",8)(23,"label",15),o(24,"DNI"),e(),d(25,"input",16),e(),i(26,"div",8)(27,"label",17),o(28,"Correo"),e(),d(29,"input",18),e(),i(30,"div",8)(31,"label",19),o(32,"Contrase\xF1a"),e(),d(33,"input",20),e(),i(34,"div",21)(35,"input",22),c("change",function(f){return a.uploadImageUno(f)}),e(),i(36,"label",23),o(37,"Foto de perfil"),e()(),i(38,"re-captcha",24),c("resolved",function(f){return a.executeRecaptchaVisible(f)}),e(),i(39,"div",25)(40,"button",26),o(41," Registrar Administrador "),e()(),x(42,W,4,1,"div",27),e()(),i(43,"div",28),x(44,J,2,0,"button",29)(45,Q,2,0,"button",29),e()()()()()),r&2&&(u(9),_("formGroup",a.registroForm),u(33),_("ngIf",a.msjError!=""),u(2),A(a.usuarioLogueado!=null?44:45))},dependencies:[T,P,k,M,w,N,O,V,R,y,z,D,B],styles:[".fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column;align-items:center;margin:0;padding:0;background:linear-gradient(45deg,gold,#e48080);background-attachment:fixed;background-size:cover;background-repeat:no-repeat}.container[_ngcontent-%COMP%]{max-width:600px;width:100%;padding:20px}.card[_ngcontent-%COMP%]{background-color:#343a40;border-radius:1rem;padding:2rem;color:#fff;text-align:center;box-shadow:0 8px 20px #0003}.form-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:20px}label[_ngcontent-%COMP%]{margin-bottom:5px;font-size:.9rem;color:#ccc;text-align:left}.form-input[_ngcontent-%COMP%]{padding:10px;border:1px solid rgba(255,255,255,.3);border-radius:5px;background-color:#ffffff1a;color:#fff;font-size:1rem;transition:border .3s}.form-input[_ngcontent-%COMP%]:focus{outline:none;border:1px solid #ffee00}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:20px}.submit-button[_ngcontent-%COMP%]{padding:10px 20px;font-size:1rem;border:none;background-color:#4caf50;color:#fff;border-radius:5px;cursor:pointer;transition:background-color .3s ease}.submit-button[_ngcontent-%COMP%]:hover{background-color:#45a045}"]})};export{H as RegistroAdminComponent};
