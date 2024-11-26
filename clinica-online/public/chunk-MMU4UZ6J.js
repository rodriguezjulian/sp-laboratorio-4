import{a as j,b as L,c as z,d as T}from"./chunk-RQVWLE5H.js";import"./chunk-QATDBSHS.js";import{c as y}from"./chunk-YJ3AL5KU.js";import{a as _,b as r,c as F,d as O,e as P,f as k,g as w,h as M,i as N,j as R,k as I,l as A,m as q}from"./chunk-ODYPTALN.js";import{Ab as C,Ca as g,Da as s,Ma as h,Pa as f,Ra as t,Sa as e,Ta as l,Va as m,Ya as i,_a as x,ab as E,d as G,ea as v,f as d,zb as S}from"./chunk-WNKIDOVC.js";var p=G(j());function V(c,n){if(c&1&&(t(0,"option",37),i(1),e()),c&2){let o=n.$implicit;f("value",o),g(),x(" ",o," ")}}var D=class c{constructor(n,o,a,u,b){this.firestoreService=n;this.fb=o;this.authService=a;this.router=u;this.imagenService=b;this.registroForm=this.fb.group({nombre:["",r.required],apellido:["",r.required],edad:["",[r.required,r.min(18),r.max(100)]],dni:["",[r.required,r.pattern("^[0-9]{8}$")]],especialidad:["",r.required],nuevaEspecialidad:[""],correo:["",[r.required,r.email]],contrasena:["",[r.required,r.minLength(8)]],fotoPerfil:["",[r.required]]})}especialidades=[""];registroForm;imagenPerfil=null;file;ngOnInit(){return d(this,null,function*(){let n=yield this.firestoreService.getEspecialidades();this.especialidades=n.map(o=>o.descripcion)})}Home(){this.router.navigate([""])}uploadImageUno(n){this.file=n.target.files[0]}agregarEspecialidad(){return d(this,null,function*(){if(this.registroForm.get("nuevaEspecialidad")?.value!=""){let n={descripcion:this.registroForm.get("nuevaEspecialidad")?.value};yield this.firestoreService.createDocument("especialidades",n);let o=yield this.firestoreService.getEspecialidades();this.especialidades=o.map(a=>a.descripcion),p.default.fire({title:"Especilidad creada",html:"Gracias por contribuir a nuestra base de datos.",icon:"success",didOpen:()=>{document.documentElement.classList.remove("swal2-height-auto"),document.body.classList.remove("swal2-height-auto")}})}})}onSubmit(){return d(this,null,function*(){console.log("recien toque el boton"),this.registroForm.valid?(console.log("previo a llamar a crearEspecialista()"),yield this.crearEspecialista(),this.registroForm.reset()):p.default.fire({title:"ERROR",html:"Por favor verifica los datos ingresados.",icon:"error",didOpen:()=>{document.documentElement.classList.remove("swal2-height-auto"),document.body.classList.remove("swal2-height-auto")}})})}crearEspecialista(){return d(this,null,function*(){console.log("antes de subir la imagen");let n=yield this.imagenService.subirImg(this.file);console.log("despues de subir la img");let o={nombre:this.registroForm.get("nombre")?.value,apellido:this.registroForm.get("apellido")?.value,edad:this.registroForm.get("edad")?.value,dni:this.registroForm.get("dni")?.value,especialidad:this.registroForm.get("especialidad")?.value,correo:this.registroForm.get("correo")?.value,contrasena:this.registroForm.get("contrasena")?.value,autorizado:"no",urlFotoPerfil:n};console.log("cree la constante del cliente"),console.log(o);try{this.authService.createUser("especialista",o,this.registroForm.get("correo")?.value,this.registroForm.get("contrasena")?.value),p.default.fire({title:"Especialista creado",text:"\xA1Ya puede empezar a usar nuestro sitio!",icon:"success",confirmButtonText:"Aceptar",backdrop:"rgba(0,0,0,0.8)",didOpen:()=>{document.documentElement.classList.remove("swal2-height-auto"),document.body.classList.remove("swal2-height-auto")}}),this.router.navigate(["/login"])}catch{p.default.fire({title:"ERROR",html:"Por favor verifica los datos ingresados.",icon:"error",didOpen:()=>{document.documentElement.classList.remove("swal2-height-auto"),document.body.classList.remove("swal2-height-auto")}})}})}static \u0275fac=function(o){return new(o||c)(s(L),s(A),s(z),s(y),s(T))};static \u0275cmp=v({type:c,selectors:[["app-registro-especialista"]],standalone:!0,features:[E],decls:58,vars:2,consts:[[1,"fondo"],[1,"container"],[1,"form-container"],[1,"card"],[1,"card-body"],[1,"title"],[1,"subtitle"],[3,"ngSubmit","formGroup"],[1,"form-group"],["for","nombre"],["id","nombre","formControlName","nombre","type","text",1,"form-input"],["for","apellido"],["id","apellido","formControlName","apellido","type","text",1,"form-input"],["for","edad"],["id","edad","formControlName","edad","type","number",1,"form-input"],["for","dni"],["id","dni","formControlName","dni","type","text",1,"form-input"],["for","especialidad"],["id","especialidad","formControlName","especialidad",1,"form-input","select-black"],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],[1,"form-group","new-specialty"],["for","nuevaEspecialidad"],[1,"specialty-container"],["id","nuevaEspecialidad","formControlName","nuevaEspecialidad","type","text",1,"form-input"],["type","button",1,"btn","btn-secondary",3,"click"],["for","correo"],["id","correo","formControlName","correo","type","email",1,"form-input"],["for","contrasena"],["id","contrasena","formControlName","contrasena","type","password",1,"form-input"],[1,"col-md-6","form-floating","form-control-group","p-1","mb-2"],["type","file","id","fotoPerfil","formControlName","fotoPerfil",1,"form-control","small-input",3,"change"],["for","fotoPerfil",1,"form-label","small-label"],[1,"button-container"],["type","submit",1,"submit-button"],[1,"text-end"],[1,"btn","btn-primary","btn-lg","px-5","mb-4",2,"background-color","brown","color","white",3,"click"],[3,"value"]],template:function(o,a){o&1&&(t(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h2",5),i(6,"Registro de Especialista"),e(),t(7,"p",6),i(8,"Por favor ingrese los datos requeridos"),e(),t(9,"form",7),m("ngSubmit",function(){return a.onSubmit()}),t(10,"div",8)(11,"label",9),i(12,"Nombre"),e(),l(13,"input",10),e(),t(14,"div",8)(15,"label",11),i(16,"Apellido"),e(),l(17,"input",12),e(),t(18,"div",8)(19,"label",13),i(20,"Edad"),e(),l(21,"input",14),e(),t(22,"div",8)(23,"label",15),i(24,"DNI"),e(),l(25,"input",16),e(),t(26,"div",8)(27,"label",17),i(28,"Especialidad"),e(),t(29,"select",18)(30,"option",19),i(31,"Seleccione una especialidad"),e(),h(32,V,2,2,"option",20),e()(),t(33,"div",21)(34,"label",22),i(35,"Nueva Especialidad"),e(),t(36,"div",23),l(37,"input",24),t(38,"button",25),m("click",function(){return a.agregarEspecialidad()}),i(39,"Agregar"),e()()(),t(40,"div",8)(41,"label",26),i(42,"Correo"),e(),l(43,"input",27),e(),t(44,"div",8)(45,"label",28),i(46,"Contrase\xF1a"),e(),l(47,"input",29),e(),t(48,"div",30)(49,"input",31),m("change",function(b){return a.uploadImageUno(b)}),e(),t(50,"label",32),i(51,"Foto de perfil"),e()(),t(52,"div",33)(53,"button",34),i(54,"Registrar Especialista"),e()()()(),t(55,"div",35)(56,"button",36),m("click",function(){return a.Home()}),i(57," ATRAS "),e()()()()()()),o&2&&(g(9),f("formGroup",a.registroForm),g(23),f("ngForOf",a.especialidades))},dependencies:[q,P,R,I,_,k,N,F,O,w,M,C,S],styles:[".fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column;align-items:center;margin:0;padding:0;background:linear-gradient(45deg,gold,#e48080);background-attachment:fixed;background-size:cover;background-repeat:no-repeat}.especialidad[_ngcontent-%COMP%]{color:black !}.container[_ngcontent-%COMP%]{max-width:600px;width:100%;padding:20px}.select-black[_ngcontent-%COMP%]{color:#000;background-color:#fff;border:1px solid #ffee00;border-radius:5px;padding:10px;appearance:none;-webkit-appearance:none;-moz-appearance:none}.select-black[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{color:#000;background-color:#fff}.card[_ngcontent-%COMP%]{background-color:#343a40;border-radius:1rem;padding:2rem;color:#fff;text-align:center;box-shadow:0 8px 20px #0003}.form-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:20px}label[_ngcontent-%COMP%]{margin-bottom:5px;font-size:.9rem;color:#ccc;text-align:left}.form-input[_ngcontent-%COMP%]{padding:10px;border:1px solid rgba(255,255,255,.3);border-radius:5px;background-color:#ffffff1a;color:#fff;font-size:1rem;transition:border .3s}.form-input[_ngcontent-%COMP%]:focus{outline:none;border:1px solid #ffee00}.new-specialty[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px}.specialty-container[_ngcontent-%COMP%]{display:flex;gap:10px}.specialty-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{padding:10px 15px;border:none;background-color:#fe0;color:#000;border-radius:5px;cursor:pointer;font-size:.9rem;transition:background-color .3s ease}.specialty-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover{background-color:#e6d000}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:20px}.submit-button[_ngcontent-%COMP%]{padding:10px 20px;font-size:1rem;border:none;background-color:#4caf50;color:#fff;border-radius:5px;cursor:pointer;transition:background-color .3s ease}.submit-button[_ngcontent-%COMP%]:hover{background-color:#45a045}"]})};export{D as RegistroEspecialistaComponent};
