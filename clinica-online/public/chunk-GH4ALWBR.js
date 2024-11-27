import{a as R}from"./chunk-QOANCHMX.js";import{a as D}from"./chunk-U5ESRCY2.js";import{c as P}from"./chunk-CCRCX4NM.js";import{a as S,b as o,c as C,d as _,e as y,f as O,g as E,h as F,l as M,n as k,p as w}from"./chunk-763VRSXQ.js";import"./chunk-MJ2ACKOT.js";import{m as x}from"./chunk-NZXCED3C.js";import{Da as b,Ea as c,Ra as v,Ta as t,Ua as e,Va as a,Xa as d,_a as r,cb as h,d as I,f as s,fa as g}from"./chunk-F5QWAULN.js";var p=I(D());var N=class f{constructor(i,l,n,m){this.fb=i;this.authService=l;this.router=n;this.imagenService=m;this.registroForm=this.fb.group({nombre:["",o.required],apellido:["",o.required],edad:["",[o.required,o.min(1),o.max(120)]],dni:["",[o.required,o.pattern("^[0-9]{8}$")]],obraSocial:["",o.required],correo:["",[o.required,o.email]],contrasena:["",[o.required,o.minLength(8)]],fotoPerfilUno:["",[o.required]],fotoPerfilDos:["",[o.required]]})}registroForm;file1;file2;ngOnInit(){return s(this,null,function*(){})}onSubmit(){return s(this,null,function*(){this.registroForm.valid?(yield this.crearPaciente(),this.registroForm.reset()):p.default.fire({title:"ERROR",html:"Por favor verifica los datos ingresados.",icon:"error",didOpen:()=>{document.documentElement.classList.remove("swal2-height-auto"),document.body.classList.remove("swal2-height-auto")}})})}Home(){this.router.navigate([""])}uploadImageUno(i){this.file1=i.target.files[0]}uploadImageDos(i){this.file2=i.target.files[0]}crearPaciente(){return s(this,null,function*(){let i=yield this.imagenService.subirImg(this.file1),l=yield this.imagenService.subirImg(this.file2),n={nombre:this.registroForm.get("nombre")?.value,apellido:this.registroForm.get("apellido")?.value,edad:this.registroForm.get("edad")?.value,dni:this.registroForm.get("dni")?.value,obraSocial:this.registroForm.get("obraSocial")?.value,correo:this.registroForm.get("correo")?.value,contrasena:this.registroForm.get("contrasena")?.value,autorizado:"no",urlFotoPerfil:i,urlFotoPerfilDos:l};try{yield this.authService.createUser("paciente",n,this.registroForm.get("correo")?.value,this.registroForm.get("contrasena")?.value),p.default.fire({title:"Paciente registrado",text:"\xA1Ya puede empezar a usar nuestro sitio!",icon:"success",confirmButtonText:"Aceptar",backdrop:"rgba(0,0,0,0.8)",didOpen:()=>{document.documentElement.classList.remove("swal2-height-auto"),document.body.classList.remove("swal2-height-auto")}}),this.router.navigate(["/login"])}catch{p.default.fire({title:"ERROR",html:"Hubo un problema al registrar al paciente.",icon:"error",didOpen:()=>{document.documentElement.classList.remove("swal2-height-auto"),document.body.classList.remove("swal2-height-auto")}})}})}static \u0275fac=function(l){return new(l||f)(c(M),c(w),c(P),c(R))};static \u0275cmp=g({type:f,selectors:[["app-registro-paciente"]],standalone:!0,features:[h],decls:53,vars:1,consts:[[1,"fondo"],[1,"container"],[1,"form-container"],[1,"card"],[1,"card-body"],[1,"title"],[1,"subtitle"],[3,"ngSubmit","formGroup"],[1,"form-group"],["for","nombre"],["id","nombre","formControlName","nombre","type","text",1,"form-input"],["for","apellido"],["id","apellido","formControlName","apellido","type","text",1,"form-input"],["for","edad"],["id","edad","formControlName","edad","type","number",1,"form-input"],["for","dni"],["id","dni","formControlName","dni","type","text",1,"form-input"],["for","obraSocial"],["id","obraSocial","formControlName","obraSocial","type","text",1,"form-input"],["for","correo"],["id","correo","formControlName","correo","type","email",1,"form-input"],["for","contrasena"],["id","contrasena","formControlName","contrasena","type","password",1,"form-input"],[1,"row","mb-2"],[1,"col-md-6","form-floating","form-control-group","p-1","mb-2"],["type","file","id","fotoPerfilUno","formControlName","fotoPerfilUno",1,"form-control","small-input",3,"change"],["for","fotoPerfil1",1,"form-label","small-label"],["type","file","id","fotoPerfilDos","formControlName","fotoPerfilDos",1,"form-control","small-input",3,"change"],["for","fotoPerfil2",1,"form-label","small-label"],[1,"button-container"],["type","submit",1,"submit-button"],[1,"text-end"],[1,"btn","btn-primary","btn-lg","px-5","mb-4",2,"background-color","brown","color","white",3,"click"]],template:function(l,n){l&1&&(t(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h2",5),r(6,"Registro de Paciente"),e(),t(7,"p",6),r(8,"Por favor ingrese los datos requeridos"),e(),t(9,"form",7),d("ngSubmit",function(){return n.onSubmit()}),t(10,"div",8)(11,"label",9),r(12,"Nombre"),e(),a(13,"input",10),e(),t(14,"div",8)(15,"label",11),r(16,"Apellido"),e(),a(17,"input",12),e(),t(18,"div",8)(19,"label",13),r(20,"Edad"),e(),a(21,"input",14),e(),t(22,"div",8)(23,"label",15),r(24,"DNI"),e(),a(25,"input",16),e(),t(26,"div",8)(27,"label",17),r(28,"Obra Social"),e(),a(29,"input",18),e(),t(30,"div",8)(31,"label",19),r(32,"Correo"),e(),a(33,"input",20),e(),t(34,"div",8)(35,"label",21),r(36,"Contrase\xF1a"),e(),a(37,"input",22),e(),t(38,"div",23)(39,"div",24)(40,"input",25),d("change",function(u){return n.uploadImageUno(u)}),e(),t(41,"label",26),r(42,"Primera foto de perfil"),e()(),t(43,"div",24)(44,"input",27),d("change",function(u){return n.uploadImageDos(u)}),e(),t(45,"label",28),r(46,"Segunda foto de perfil"),e()()(),t(47,"div",29)(48,"button",30),r(49,"Registrar Paciente"),e()()()(),t(50,"div",31)(51,"button",32),d("click",function(){return n.Home()}),r(52," ATRAS "),e()()()()()()),l&2&&(b(9),v("formGroup",n.registroForm))},dependencies:[k,y,S,O,C,_,E,F,x],styles:[".fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column;align-items:center;margin:0;padding:0;background:linear-gradient(45deg,gold,#e48080);background-attachment:fixed;background-size:cover;background-repeat:no-repeat}.especialidad[_ngcontent-%COMP%]{color:black !}.container[_ngcontent-%COMP%]{max-width:600px;width:100%;padding:20px}.select-black[_ngcontent-%COMP%]{color:#000;background-color:#fff;border:1px solid #ffee00;border-radius:5px;padding:10px;appearance:none;-webkit-appearance:none;-moz-appearance:none}.select-black[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{color:#000;background-color:#fff}.card[_ngcontent-%COMP%]{background-color:#343a40;border-radius:1rem;padding:2rem;color:#fff;text-align:center;box-shadow:0 8px 20px #0003}.form-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:20px}label[_ngcontent-%COMP%]{margin-bottom:5px;font-size:.9rem;color:#ccc;text-align:left}.form-input[_ngcontent-%COMP%]{padding:10px;border:1px solid rgba(255,255,255,.3);border-radius:5px;background-color:#ffffff1a;color:#fff;font-size:1rem;transition:border .3s}.form-input[_ngcontent-%COMP%]:focus{outline:none;border:1px solid #ffee00}.new-specialty[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px}.specialty-container[_ngcontent-%COMP%]{display:flex;gap:10px}.specialty-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{padding:10px 15px;border:none;background-color:#fe0;color:#000;border-radius:5px;cursor:pointer;font-size:.9rem;transition:background-color .3s ease}.specialty-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover{background-color:#e6d000}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:20px}.submit-button[_ngcontent-%COMP%]{padding:10px 20px;font-size:1rem;border:none;background-color:#4caf50;color:#fff;border-radius:5px;cursor:pointer;transition:background-color .3s ease}.submit-button[_ngcontent-%COMP%]:hover{background-color:#45a045}"]})};export{N as RegistroPacienteComponent};
