import{a as ie,c as $,d as Y}from"./chunk-RQVWLE5H.js";import"./chunk-QATDBSHS.js";import{c as T}from"./chunk-YJ3AL5KU.js";import{a as z,b as c,c as L,d as q,e as V,f as H,g as U,h as K,l as G,m as W}from"./chunk-ODYPTALN.js";import{$ as p,Ab as D,Ca as O,Cb as B,Da as l,F as j,Oa as N,Pa as P,Ra as s,Sa as o,Ta as f,Va as g,W as M,X as E,Ya as d,Z as h,ab as k,d as te,ea as v,f as C,fa as w,m as R,ra as x,sa as _,u as A,ua as I,ya as F}from"./chunk-WNKIDOVC.js";var y=te(ie());var oe=new h("recaptcha-language"),ne=new h("recaptcha-base-url"),se=new h("recaptcha-nonce-tag"),ae=new h("recaptcha-settings"),ce=new h("recaptcha-v3-site-key"),de=new h("recaptcha-loader-options");function le(t,n,e,{url:i,lang:r,nonce:a}={}){window.ng2recaptchaloaded=()=>{e(grecaptcha)};let u=document.createElement("script");u.innerHTML="";let{url:m,nonce:b}=n(new URL(i||"https://www.google.com/recaptcha/api.js"));m.searchParams.set("render",t==="explicit"?t:t.key),m.searchParams.set("onload","ng2recaptchaloaded"),m.searchParams.set("trustedtypes","true"),r&&m.searchParams.set("hl",r),u.src=m.href;let S=b||a;S&&u.setAttribute("nonce",S),u.async=!0,u.defer=!0,document.head.appendChild(u)}function ue({v3SiteKey:t,onBeforeLoad:n,onLoaded:e}){let i=t?{key:t}:"explicit";Z.loadScript(i,n,e)}var Z={loadScript:le,newLoadScript:ue};function me(t){return t.asObservable().pipe(j(n=>n!==null))}var J=(()=>{class t{static{this.ready=null}constructor(e,i,r,a,u,m){this.platformId=e,this.language=i,this.baseUrl=r,this.nonce=a,this.v3SiteKey=u,this.options=m;let b=this.init();this.ready=b?me(b):A()}init(){if(t.ready)return t.ready;if(!B(this.platformId))return;let e=new R(null);return t.ready=e,Z.newLoadScript({v3SiteKey:this.v3SiteKey,onBeforeLoad:i=>{if(this.options?.onBeforeLoad)return this.options.onBeforeLoad(i);let r=new URL(this.baseUrl??i);return this.language&&r.searchParams.set("hl",this.language),{url:r,nonce:this.nonce}},onLoaded:i=>{let r=i;this.options?.onLoaded&&(r=this.options.onLoaded(i)),e.next(r)}}),e}static{this.\u0275fac=function(i){return new(i||t)(p(F),p(oe,8),p(ne,8),p(se,8),p(ce,8),p(de,8))}}static{this.\u0275prov=M({token:t,factory:t.\u0275fac})}}return t})(),he=0,Q=(()=>{class t{constructor(e,i,r,a){this.elementRef=e,this.loader=i,this.zone=r,this.id=`ngrecaptcha-${he++}`,this.errorMode="default",this.resolved=new x,this.error=new x,this.errored=new x,a&&(this.siteKey=a.siteKey,this.theme=a.theme,this.type=a.type,this.size=a.size,this.badge=a.badge)}ngAfterViewInit(){this.subscription=this.loader.ready.subscribe(e=>{e!=null&&e.render instanceof Function&&(this.grecaptcha=e,this.renderRecaptcha())})}ngOnDestroy(){this.grecaptchaReset(),this.subscription&&this.subscription.unsubscribe()}execute(){this.size==="invisible"&&(this.widget!=null?this.grecaptcha.execute(this.widget):this.executeRequested=!0)}reset(){this.widget!=null&&(this.grecaptcha.getResponse(this.widget)&&this.resolved.emit(null),this.grecaptchaReset())}get __unsafe_widgetValue(){return this.widget!=null?this.grecaptcha.getResponse(this.widget):null}expired(){this.resolved.emit(null)}onError(e){this.error.emit(e),this.errored.emit(e)}captchaResponseCallback(e){this.resolved.emit(e)}grecaptchaReset(){this.widget!=null&&this.zone.runOutsideAngular(()=>this.grecaptcha.reset(this.widget))}renderRecaptcha(){let e={badge:this.badge,callback:i=>{this.zone.run(()=>this.captchaResponseCallback(i))},"expired-callback":()=>{this.zone.run(()=>this.expired())},sitekey:this.siteKey,size:this.size,tabindex:this.tabIndex,theme:this.theme,type:this.type};this.errorMode==="handled"&&(e["error-callback"]=(...i)=>{this.zone.run(()=>this.onError(i))}),this.widget=this.grecaptcha.render(this.elementRef.nativeElement,e),this.executeRequested===!0&&(this.executeRequested=!1,this.execute())}static{this.\u0275fac=function(i){return new(i||t)(l(I),l(J),l(_),l(ae,8))}}static{this.\u0275cmp=v({type:t,selectors:[["re-captcha"]],hostVars:1,hostBindings:function(i,r){i&2&&N("id",r.id)},inputs:{id:"id",siteKey:"siteKey",theme:"theme",type:"type",size:"size",tabIndex:"tabIndex",badge:"badge",errorMode:"errorMode"},outputs:{resolved:"resolved",error:"error",errored:"errored"},exportAs:["reCaptcha"],decls:0,vars:0,template:function(i,r){},encapsulation:2})}}return t})(),pe=(()=>{class t{static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275mod=w({type:t})}static{this.\u0275inj=E({})}}return t})(),X=(()=>{class t{static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275mod=w({type:t})}static{this.\u0275inj=E({providers:[J],imports:[pe]})}}return t})();var ee=class t{constructor(n,e,i,r){this.fb=n;this.authService=e;this.router=i;this.imagenService=r;this.registroForm=this.fb.group({nombre:["",c.required],apellido:["",c.required],edad:["",[c.required,c.min(18),c.max(100)]],dni:["",[c.required,c.pattern("^[0-9]{8}$")]],correo:["",[c.required,c.email]],contrasena:["",[c.required,c.minLength(8)]],fotoPerfil:["",c.required],recaptcha:["",c.required]})}registroForm;file;showCaptchaError=!1;captcha="";resolved(n){this.captcha=n,this.showCaptchaError=!1}ngOnInit(){}Home(){this.router.navigate([""])}uploadImageUno(n){this.file=n.target.files[0]}onSubmit(){return C(this,null,function*(){for(let n in this.registroForm.controls){let e=this.registroForm.get(n);e?.invalid&&console.log(`Campo inv\xE1lido: ${n}`,e.errors)}this.registroForm.valid?(yield this.crearAdministrador(),this.registroForm.reset()):y.default.fire({title:"Error",text:"Por favor verifica los datos ingresados.",icon:"error"})})}crearAdministrador(){return C(this,null,function*(){try{console.log("dentro de crear Admin");let n=yield this.imagenService.subirImg(this.file);console.log("ya subi la img "+n);let e={nombre:this.registroForm.get("nombre")?.value,apellido:this.registroForm.get("apellido")?.value,edad:this.registroForm.get("edad")?.value,dni:this.registroForm.get("dni")?.value,correo:this.registroForm.get("correo")?.value,contrasena:this.registroForm.get("contrasena")?.value,urlFotoPerfil:n};yield this.authService.createUser("administrador",e,e.correo,e.contrasena),y.default.fire({title:"Administrador creado",text:"\xA1Ya puede iniciar sesi\xF3n!",icon:"success"}),this.router.navigate(["/login"])}catch{y.default.fire({title:"Error",text:"Ocurri\xF3 un problema al crear el administrador.",icon:"error"})}})}static \u0275fac=function(e){return new(e||t)(l(G),l($),l(T),l(Y))};static \u0275cmp=v({type:t,selectors:[["app-registro-admin"]],standalone:!0,features:[k],decls:45,vars:1,consts:[[1,"fondo"],[1,"container"],[1,"form-container"],[1,"card"],[1,"card-body"],[1,"title"],[1,"subtitle"],[3,"ngSubmit","formGroup"],[1,"form-group"],["for","nombre"],["id","nombre","formControlName","nombre","type","text",1,"form-input"],["for","apellido"],["id","apellido","formControlName","apellido","type","text",1,"form-input"],["for","edad"],["id","edad","formControlName","edad","type","number",1,"form-input"],["for","dni"],["id","dni","formControlName","dni","type","text",1,"form-input"],["for","correo"],["id","correo","formControlName","correo","type","email",1,"form-input"],["for","contrasena"],["id","contrasena","formControlName","contrasena","type","password",1,"form-input"],[1,"col-md-6","form-floating","form-control-group","p-1","mb-2"],["type","file","id","fotoPerfil","formControlName","fotoPerfil",1,"form-control","small-input",3,"change"],["for","fotoPerfil",1,"form-label","small-label"],["siteKey","6Le48wMqAAAAAC_31gEUMff59BrnUN89d5xx9zPS",3,"resolved"],[1,"button-container"],["type","submit",1,"submit-button"],[1,"text-end"],[1,"btn","btn-primary","btn-lg","px-5","mb-4",2,"background-color","brown","color","white",3,"click"]],template:function(e,i){e&1&&(s(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h2",5),d(6,"Registro de Administrador"),o(),s(7,"p",6),d(8,"Por favor ingrese los datos requeridos"),o(),s(9,"form",7),g("ngSubmit",function(){return i.onSubmit()}),s(10,"div",8)(11,"label",9),d(12,"Nombre"),o(),f(13,"input",10),o(),s(14,"div",8)(15,"label",11),d(16,"Apellido"),o(),f(17,"input",12),o(),s(18,"div",8)(19,"label",13),d(20,"Edad"),o(),f(21,"input",14),o(),s(22,"div",8)(23,"label",15),d(24,"DNI"),o(),f(25,"input",16),o(),s(26,"div",8)(27,"label",17),d(28,"Correo"),o(),f(29,"input",18),o(),s(30,"div",8)(31,"label",19),d(32,"Contrase\xF1a"),o(),f(33,"input",20),o(),s(34,"div",21)(35,"input",22),g("change",function(a){return i.uploadImageUno(a)}),o(),s(36,"label",23),d(37,"Foto de perfil"),o()(),s(38,"re-captcha",24),g("resolved",function(a){return i.resolved(a)}),o(),s(39,"div",25)(40,"button",26),d(41," Registrar Administrador "),o()()()(),s(42,"div",27)(43,"button",28),g("click",function(){return i.Home()}),d(44," ATR\xC1S "),o()()()()()()),e&2&&(O(9),P("formGroup",i.registroForm))},dependencies:[W,V,z,H,L,q,U,K,D,X,Q],styles:[".fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column;align-items:center;margin:0;padding:0;background:linear-gradient(45deg,gold,#e48080);background-attachment:fixed;background-size:cover;background-repeat:no-repeat}.container[_ngcontent-%COMP%]{max-width:600px;width:100%;padding:20px}.card[_ngcontent-%COMP%]{background-color:#343a40;border-radius:1rem;padding:2rem;color:#fff;text-align:center;box-shadow:0 8px 20px #0003}.form-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:20px}label[_ngcontent-%COMP%]{margin-bottom:5px;font-size:.9rem;color:#ccc;text-align:left}.form-input[_ngcontent-%COMP%]{padding:10px;border:1px solid rgba(255,255,255,.3);border-radius:5px;background-color:#ffffff1a;color:#fff;font-size:1rem;transition:border .3s}.form-input[_ngcontent-%COMP%]:focus{outline:none;border:1px solid #ffee00}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:20px}.submit-button[_ngcontent-%COMP%]{padding:10px 20px;font-size:1rem;border:none;background-color:#4caf50;color:#fff;border-radius:5px;cursor:pointer;transition:background-color .3s ease}.submit-button[_ngcontent-%COMP%]:hover{background-color:#45a045}"]})};export{ee as RegistroAdminComponent};
