import{C as nt,D as ot,E as B,F as st,G as lt,H as F,J as ct,L as dt,M as pt,N as mt,O as G,P as ut,Q as ht,R as gt,X as re,Y as ne,Z as oe,_ as ft,g as te,k as Ze,l as ie,m as Je,o as et,s as tt,t as it,u as ae,v as at,z as rt}from"./chunk-IVRNZD3C.js";import{a as Ye,b as $e,c as Xe,d as _t}from"./chunk-2DCWAD4R.js";import"./chunk-JTZ6XII4.js";import{b as Te,d as m,e as De,f as Pe,g as Le,h as Ve,i as Ne,k as qe,l as We,m as z,n as ze,r as Be,t as Ge}from"./chunk-LDTLK62Q.js";import{a as Ue}from"./chunk-WRE3YE3W.js";import{a as wt}from"./chunk-OLWY7DYE.js";import{a as Qe}from"./chunk-7FG5ZD4D.js";import{b as Ie}from"./chunk-5PFTZWDM.js";import"./chunk-3JXLYIF6.js";import{c as J,d as ee,f as q,g as Fe,i as W,j as Re,k as Ae}from"./chunk-EJJBCPAK.js";import{F as He,u as Ke,z as je}from"./chunk-JRXB4MSQ.js";import{$ as pe,A as R,B as j,Bb as Y,Ca as fe,Eb as _,Gb as S,H as ce,Hb as be,Ib as $,J as de,Jc as Me,Kc as Oe,Lb as L,Lc as we,Mb as V,Nb as E,Ob as x,Qc as ke,Rb as Ce,Sb as l,T as H,Tb as X,U,Ub as Se,V as y,Wa as d,Xa as v,Zb as Ee,_b as N,ba as A,ea as u,f as I,gb as _e,ia as T,ja as me,kb as h,nb as P,ob as p,qa as ue,qb as ve,qc as xe,ra as b,s as K,sa as C,sb as ye,sc as M,ta as he,tb as Q,tc as Z,wb as s,x as le,xa as ge,xb as r,yb as f,za as D}from"./chunk-SLHCDPS3.js";import{g as Ot,j as k}from"./chunk-4ZZIO3ZI.js";var w=Ot(wt());var At=["trigger"],Tt=["panel"],Dt=[[["mat-select-trigger"]],"*"],Pt=["mat-select-trigger","*"];function Lt(a,n){if(a&1&&(s(0,"span",4),l(1),r()),a&2){let e=S();d(),X(e.placeholder)}}function Vt(a,n){a&1&&$(0)}function Nt(a,n){if(a&1&&(s(0,"span",11),l(1),r()),a&2){let e=S(2);d(),X(e.triggerValue)}}function qt(a,n){if(a&1&&(s(0,"span",5),h(1,Vt,1,0)(2,Nt,2,1,"span",11),r()),a&2){let e=S();d(),Q(e.customTrigger?1:2)}}function Wt(a,n){if(a&1){let e=Y();s(0,"div",12,1),_("@transformPanel.done",function(i){b(e);let o=S();return C(o._panelDoneAnimatingStream.next(i.toState))})("keydown",function(i){b(e);let o=S();return C(o._handleKeydown(i))}),$(2,1),r()}if(a&2){let e=S();ye("mat-mdc-select-panel mdc-menu-surface mdc-menu-surface--open ",e._getPanelTheme(),""),p("ngClass",e.panelClass)("@transformPanel","showing"),P("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}var zt={transformPanelWrap:J("transformPanelWrap",[W("* => void",Ae("@transformPanel",[Re()],{optional:!0}))]),transformPanel:J("transformPanel",[Fe("void",q({opacity:0,transform:"scale(1, 0.8)"})),W("void => showing",ee("120ms cubic-bezier(0, 0, 0.2, 1)",q({opacity:1,transform:"scale(1, 1)"}))),W("* => void",ee("100ms linear",q({opacity:0})))])};var St=new A("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let a=u(re);return()=>a.scrollStrategies.reposition()}});function Bt(a){return()=>a.scrollStrategies.reposition()}var Gt=new A("MAT_SELECT_CONFIG"),Kt={provide:St,deps:[re],useFactory:Bt},jt=new A("MatSelectTrigger"),se=class{source;value;constructor(n,e){this.source=n,this.value=e}},Et=(()=>{class a{_viewportRuler=u(ht);_changeDetectorRef=u(xe);_elementRef=u(fe);_dir=u(it,{optional:!0});_idGenerator=u(tt);_parentFormField=u(pt,{optional:!0});ngControl=u(De,{self:!0,optional:!0});_liveAnnouncer=u(et);_defaultOptions=u(Gt,{optional:!0});options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let i=this.panel.nativeElement,o=st(e,this.options,this.optionGroups),c=t._getHostElement();e===0&&o===1?i.scrollTop=0:i.scrollTop=lt(c.offsetTop,c.offsetHeight,i.scrollTop,i.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new se(this,e)}_scrollStrategyFactory=u(St);_panelOpen=!1;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new I;_errorStateTracker;stateChanges=new I;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_panelDoneAnimatingStream=new I;_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=!1;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=!1;disableRipple=!1;tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(m.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";_initialized=new I;optionSelectionChanges=le(()=>{let e=this.options;return e?e.changes.pipe(H(e),U(()=>R(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(U(()=>this.optionSelectionChanges))});openedChange=new D;_openedStream=this.openedChange.pipe(j(e=>e),K(()=>{}));_closedStream=this.openedChange.pipe(j(e=>!e),K(()=>{}));selectionChange=new D;valueChange=new D;constructor(){let e=u(rt),t=u(Ve,{optional:!0}),i=u(z,{optional:!0}),o=u(new ge("tabindex"),{optional:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new at(e,this.ngControl,i,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=o==null?0:parseInt(o)||0,this.id=this.id}ngOnInit(){this._selectionModel=new ut(this.multiple),this.stateChanges.next(),this._panelDoneAnimatingStream.pipe(de(),y(this._destroy)).subscribe(()=>this._panelDoneAnimating(this.panelOpen)),this._viewportRuler.change().pipe(y(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(y(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect())}),this.options.changes.pipe(H(null),y(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let i=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?i.setAttribute("aria-labelledby",e):i.removeAttribute("aria-labelledby")}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval)}ngOnDestroy(){this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}_trackedModal=null;_applyModalPanelOwnership(){let e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let t=`${this.id}-panel`;this._trackedModal&&ie(this._trackedModal,"aria-owns",t),Ze(e,"aria-owns",t),this._trackedModal=e}_clearFromModal(){if(!this._trackedModal)return;let e=`${this.id}-panel`;ie(this._trackedModal,"aria-owns",e),this._trackedModal=null}close(){this._panelOpen&&(this._panelOpen=!1,this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next())}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value==="rtl":!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let t=e.keyCode,i=t===40||t===38||t===37||t===39,o=t===13||t===32,c=this._keyManager;if(!c.isTyping()&&o&&!te(e)||(this.multiple||e.altKey)&&i)e.preventDefault(),this.open();else if(!this.multiple){let O=this.selected;c.onKeydown(e);let g=this.selected;g&&O!==g&&this._liveAnnouncer.announce(g.viewValue,1e4)}}_handleOpenKeydown(e){let t=this._keyManager,i=e.keyCode,o=i===40||i===38,c=t.isTyping();if(o&&e.altKey)e.preventDefault(),this.close();else if(!c&&(i===13||i===32)&&t.activeItem&&!te(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!c&&this._multiple&&i===65&&e.ctrlKey){e.preventDefault();let O=this.options.some(g=>!g.disabled&&!g.selected);this.options.forEach(g=>{g.disabled||(O?g.select():g.deselect())})}else{let O=t.activeItemIndex;t.onKeydown(e),this._multiple&&o&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==O&&t.activeItem._selectViaInteraction()}}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}_onAttached(){this._overlayDir.positionChange.pipe(ce(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()})}_getPanelTheme(){return this._parentFormField?`mat-${this._parentFormField.color}`:""}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else{let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let t=this.options.find(i=>{if(this._selectionModel.isSelected(i))return!1;try{return i.value!=null&&this._compareWith(i.value,e)}catch{return!1}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof ne?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new Je(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=R(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(y(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),R(...this.options.map(t=>t._stateChanges)).pipe(y(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,t){let i=this._selectionModel.isSelected(e);e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(i!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),i!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,i)=>this.sortComparator?this.sortComparator(t,i,e):e.indexOf(t)-e.indexOf(i)),this.stateChanges.next()}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(i=>i.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+" ":"";return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId(),t=(e?e+" ":"")+this._valueId;return this.ariaLabelledby&&(t+=" "+this.ariaLabelledby),t}_panelDoneAnimating(e){this.openedChange.emit(e)}setDescribedByIds(e){e.length?this._elementRef.nativeElement.setAttribute("aria-describedby",e.join(" ")):this._elementRef.nativeElement.removeAttribute("aria-describedby")}onContainerClick(){this.focus(),this.open()}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=T({type:a,selectors:[["mat-select"]],contentQueries:function(t,i,o){if(t&1&&(L(o,jt,5),L(o,B,5),L(o,ot,5)),t&2){let c;E(c=x())&&(i.customTrigger=c.first),E(c=x())&&(i.options=c),E(c=x())&&(i.optionGroups=c)}},viewQuery:function(t,i){if(t&1&&(V(At,5),V(Tt,5),V(oe,5)),t&2){let o;E(o=x())&&(i.trigger=o.first),E(o=x())&&(i.panel=o.first),E(o=x())&&(i._overlayDir=o.first)}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:19,hostBindings:function(t,i){t&1&&_("keydown",function(c){return i._handleKeydown(c)})("focus",function(){return i._onFocus()})("blur",function(){return i._onBlur()}),t&2&&(P("id",i.id)("tabindex",i.disabled?-1:i.tabIndex)("aria-controls",i.panelOpen?i.id+"-panel":null)("aria-expanded",i.panelOpen)("aria-label",i.ariaLabel||null)("aria-required",i.required.toString())("aria-disabled",i.disabled.toString())("aria-invalid",i.errorState)("aria-activedescendant",i._getAriaActiveDescendant()),ve("mat-mdc-select-disabled",i.disabled)("mat-mdc-select-invalid",i.errorState)("mat-mdc-select-required",i.required)("mat-mdc-select-empty",i.empty)("mat-mdc-select-multiple",i.multiple))},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",M],disableRipple:[2,"disableRipple","disableRipple",M],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:Z(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",M],placeholder:"placeholder",required:[2,"required","required",M],multiple:[2,"multiple","multiple",M],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",M],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",Z],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth"},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],standalone:!0,features:[Ee([{provide:dt,useExisting:a},{provide:nt,useExisting:a}]),_e,ue,N],ngContentSelectors:Pt,decls:11,vars:8,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayLockPosition","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"backdropClick","attach","detach","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayOpen","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",3,"keydown","ngClass"]],template:function(t,i){if(t&1){let o=Y();be(Dt),s(0,"div",2,0),_("click",function(){return b(o),C(i.open())}),s(3,"div",3),h(4,Lt,2,1,"span",4)(5,qt,3,1,"span",5),r(),s(6,"div",6)(7,"div",7),he(),s(8,"svg",8),f(9,"path",9),r()()()(),h(10,Wt,3,9,"ng-template",10),_("backdropClick",function(){return b(o),C(i.close())})("attach",function(){return b(o),C(i._onAttached())})("detach",function(){return b(o),C(i.close())})}if(t&2){let o=Ce(1);d(3),P("id",i._valueId),d(),Q(i.empty?4:5),d(6),p("cdkConnectedOverlayPanelClass",i._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",i._scrollStrategy)("cdkConnectedOverlayOrigin",i._preferredOverlayOrigin||o)("cdkConnectedOverlayOpen",i.panelOpen)("cdkConnectedOverlayPositions",i._positions)("cdkConnectedOverlayWidth",i._overlayWidth)}},dependencies:[ne,oe,Me],styles:['.mat-mdc-select{display:inline-block;width:100%;outline:none;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));font-family:var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));line-height:var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking))}div.mat-mdc-select-panel{box-shadow:var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-select-disabled{color:var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-select-trigger{display:inline-flex;align-items:center;cursor:pointer;position:relative;box-sizing:border-box;width:100%}.mat-mdc-select-disabled .mat-mdc-select-trigger{-webkit-user-select:none;user-select:none;cursor:default}.mat-mdc-select-value{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-mdc-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-mdc-select-arrow-wrapper{height:24px;flex-shrink:0;display:inline-flex;align-items:center}.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper{transform:none}.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after{color:var(--mat-select-invalid-arrow-color, var(--mat-sys-error))}.mat-mdc-select-arrow{width:10px;height:5px;position:relative;color:var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant))}.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow{color:var(--mat-select-focused-arrow-color, var(--mat-sys-primary))}.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow{color:var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-select-arrow svg{fill:currentColor;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}@media(forced-colors: active){.mat-mdc-select-arrow svg{fill:CanvasText}.mat-mdc-select-disabled .mat-mdc-select-arrow svg{fill:GrayText}}div.mat-mdc-select-panel{width:100%;max-height:275px;outline:0;overflow:auto;padding:8px 0;border-radius:4px;box-sizing:border-box;position:static;background-color:var(--mat-select-panel-background-color, var(--mat-sys-surface-container))}@media(forced-colors: active){div.mat-mdc-select-panel{outline:solid 1px}}.cdk-overlay-pane:not(.mat-mdc-select-panel-above) div.mat-mdc-select-panel{border-top-left-radius:0;border-top-right-radius:0;transform-origin:top center}.mat-mdc-select-panel-above div.mat-mdc-select-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:bottom center}div.mat-mdc-select-panel .mat-mdc-option{--mdc-list-list-item-container-color: var(--mat-select-panel-background-color)}.mat-mdc-select-placeholder{transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);color:var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant))}._mat-animation-noopable .mat-mdc-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-mdc-select-placeholder{color:rgba(0,0,0,0);-webkit-text-fill-color:rgba(0,0,0,0);transition:none;display:block}.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper{cursor:pointer}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label{max-width:calc(100% - 18px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 24px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch{max-width:calc(100% - 24px)}.mat-mdc-select-min-line:empty::before{content:" ";white-space:pre;width:1px;display:inline-block;visibility:hidden}.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper{transform:var(--mat-select-arrow-transform, translateY(-8px))}'],encapsulation:2,data:{animation:[zt.transformPanel]},changeDetection:0})}return a})();var xt=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=me({type:a});static \u0275inj=pe({providers:[Kt],imports:[ft,F,ae,gt,G,F,ae]})}return a})();function Ut(a,n){a&1&&(s(0,"span",35),l(1," El nombre es obligatorio. "),r())}function Qt(a,n){a&1&&(s(0,"span",35),l(1," Solo se permiten letras. "),r())}function Yt(a,n){a&1&&(s(0,"span",35),l(1," El apellido es obligatorio. "),r())}function $t(a,n){a&1&&(s(0,"span",35),l(1," Solo se permiten letras. "),r())}function Xt(a,n){a&1&&(s(0,"span",35),l(1," La edad es obligatoria. "),r())}function Zt(a,n){a&1&&(s(0,"span",35),l(1," La edad m\xEDnima es 18 a\xF1os. "),r())}function Jt(a,n){a&1&&(s(0,"span",35),l(1," La edad m\xE1xima es 100 a\xF1os. "),r())}function ei(a,n){a&1&&(s(0,"span",35),l(1," El DNI es obligatorio. "),r())}function ti(a,n){a&1&&(s(0,"span",35),l(1," Debe contener exactamente 8 n\xFAmeros. "),r())}function ii(a,n){if(a&1&&(s(0,"mat-option",36),l(1),r()),a&2){let e=n.$implicit;p("value",e),d(),Se(" ",e," ")}}function ai(a,n){a&1&&(s(0,"span",35),l(1," Debes seleccionar al menos una especialidad. "),r())}function ri(a,n){a&1&&(s(0,"span",35),l(1," El correo es obligatorio. "),r())}function ni(a,n){a&1&&(s(0,"span",35),l(1," Formato de correo inv\xE1lido. "),r())}function oi(a,n){a&1&&(s(0,"span",35),l(1," La contrase\xF1a es obligatoria. "),r())}function si(a,n){a&1&&(s(0,"span",35),l(1," M\xEDnimo 8 caracteres. "),r())}function li(a,n){a&1&&(s(0,"span",35),l(1," La foto de perfil es obligatoria. "),r())}var Mt=class a{constructor(n,e,t,i,o,c,O){this.firestoreService=n;this.fb=e;this.loader=t;this.authService=i;this.router=o;this.imagenService=c;this.auth=O;this.registroForm=this.fb.group({nombre:["",[m.required,m.pattern("^[a-zA-Z\xC0-\xFF\\s]+$")]],apellido:["",[m.required,m.pattern("^[a-zA-Z\xC0-\xFF\\s]+$")]],edad:["",[m.required,m.min(18),m.max(100)]],dni:["",[m.required,m.pattern("^[0-9]{8}$")]],especialidad:["",m.required],nuevaEspecialidad:[""],correo:["",[m.required,m.email]],contrasena:["",[m.required,m.minLength(8)]],fotoPerfil:["",m.required]})}especialidades=[""];registroForm;imagenPerfil=null;file;msjError="";token=!1;usuarioLogueado=null;ngOnInit(){return k(this,null,function*(){let n=yield this.firestoreService.getEspecialidades();this.especialidades=n.map(e=>e.descripcion),je(this.auth,e=>{e?this.usuarioLogueado=e:this.usuarioLogueado=null})})}hasError(n,e){let t=this.registroForm.get(n);return!!t&&t.hasError(e)&&(t.dirty||t.touched)}Home(){this.router.navigate([""])}uploadImageUno(n){this.file=n.target.files[0]}agregarEspecialidad(){return k(this,null,function*(){if(this.registroForm.get("nuevaEspecialidad")?.value!=""){let n={descripcion:this.registroForm.get("nuevaEspecialidad")?.value};yield this.firestoreService.createDocument("especialidades",n);let e=yield this.firestoreService.getEspecialidades();this.especialidades=e.map(t=>t.descripcion),w.default.fire({title:"Especilidad creada",html:"Gracias por contribuir a nuestra base de datos.",icon:"success",didOpen:()=>{document.documentElement.classList.remove("swal2-height-auto"),document.body.classList.remove("swal2-height-auto")}}),this.registroForm.reset("nuevaEspecialidad")}})}executeRecaptchaVisible(n){this.token=!this.token}onSubmit(){return k(this,null,function*(){this.loader.setLoader(!0);for(let n in this.registroForm.controls){let e=this.registroForm.get(n);e?.invalid&&(this.msjError=`Campo inv\xE1lido: ${n}`,console.log(`Campo inv\xE1lido: ${n}`,e.errors))}if(console.log("recien toque el boton"),this.registroForm.valid)if(console.log("previo a llamar a crearEspecialista()"),this.token)yield this.crearEspecialista(),this.registroForm.reset();else{this.loader.setLoader(!1),w.default.fire({title:"Error",text:"Verifica que no es un robot para continuar",icon:"error"});return}else w.default.fire({title:"ERROR",html:"Por favor verifica los datos ingresados.",icon:"error",didOpen:()=>{document.documentElement.classList.remove("swal2-height-auto"),document.body.classList.remove("swal2-height-auto")}});this.loader.setLoader(!1)})}onCheckboxChange(n){let e=this.registroForm.get("especialidad");if(n.target.checked)e.push(new Ne(n.target.value));else{let t=e.controls.findIndex(i=>i.value===n.target.value);t!==-1&&e.removeAt(t)}console.log(this.registroForm.get("especialidad")?.value)}crearEspecialista(){return k(this,null,function*(){let n=[],e=yield this.firestoreService.getEspecialidades();this.registroForm.get("especialidad")?.value.forEach(o=>{e.forEach(c=>{c.descripcion==o&&n.push(c.id)})}),console.log("antes de subir la imagen");let t=yield this.imagenService.subirImg(this.file);console.log("despues de subir la img");let i={nombre:this.registroForm.get("nombre")?.value,apellido:this.registroForm.get("apellido")?.value,edad:this.registroForm.get("edad")?.value,dni:this.registroForm.get("dni")?.value,especialidad:n,correo:this.registroForm.get("correo")?.value,contrasena:this.registroForm.get("contrasena")?.value,habilitado:!1,urlFotoPerfil:t,rol:"especialista"};console.log("cree la constante del cliente"),console.log(i);try{if(this.usuarioLogueado!=null){let o=this.usuarioLogueado.uid,c=yield this.firestoreService.getUsuarioInfo(o);yield this.authService.createUser("especialista",i,this.registroForm.get("correo")?.value,this.registroForm.get("contrasena")?.value,c.correo,c.contrasena)}else yield this.authService.createUser("especialista",i,this.registroForm.get("correo")?.value,this.registroForm.get("contrasena")?.value);w.default.fire({title:"Especialista creado",text:"\xA1Ya puede empezar a usar nuestro sitio!",icon:"success",confirmButtonText:"Aceptar",backdrop:"rgba(0,0,0,0.8)",didOpen:()=>{document.documentElement.classList.remove("swal2-height-auto"),document.body.classList.remove("swal2-height-auto")}}),this.usuarioLogueado==null?this.router.navigate(["/login"]):this.router.navigate(["/home"])}catch{w.default.fire({title:"ERROR",html:"Por favor verifica los datos ingresados.",icon:"error",didOpen:()=>{document.documentElement.classList.remove("swal2-height-auto"),document.body.classList.remove("swal2-height-auto")}})}finally{this.loader.setLoader(!1)}})}SeccionUsuarios(){this.router.navigate(["/seccionUsuarios"])}static \u0275fac=function(e){return new(e||a)(v(He),v(Be),v(Qe),v(Ue),v(Ie),v(_t),v(Ke))};static \u0275cmp=T({type:a,selectors:[["app-registro-especialista"]],standalone:!0,features:[N],decls:71,vars:18,consts:[[1,"fondo"],[1,"container"],[1,"form-container"],[1,"card"],[1,"card-body"],[1,"title"],[1,"subtitle"],[3,"ngSubmit","formGroup"],[1,"form-group"],["for","nombre"],["id","nombre","formControlName","nombre","type","text",1,"form-input"],["class","error",4,"ngIf"],["for","apellido"],["id","apellido","formControlName","apellido","type","text",1,"form-input"],["for","edad"],["id","edad","formControlName","edad","type","number",1,"form-input"],["for","dni"],["id","dni","formControlName","dni","type","text",1,"form-input"],["for","especialidad"],["appearance","outline",1,"form-full-width"],[1,"x"],["formControlName","especialidad","multiple","",1,"x",3,"disableOptionCentering"],[3,"value",4,"ngFor","ngForOf"],["for","nuevaEspecialidad"],[1,"specialty-container"],["id","nuevaEspecialidad","formControlName","nuevaEspecialidad","type","text",1,"form-input"],["type","button",1,"btn","btn-secondary",3,"click"],["for","correo"],["id","correo","formControlName","correo","type","email",1,"form-input"],["for","contrasena"],["id","contrasena","formControlName","contrasena","type","password",1,"form-input"],["for","fotoPerfil"],["type","file","id","fotoPerfil","formControlName","fotoPerfil",3,"change"],["siteKey","6LfBWIoqAAAAAG9GDoRLUsrzEVeUtSbt1F7z--Y7",3,"resolved"],["type","submit",1,"mt-1","submit-button"],[1,"error"],[3,"value"]],template:function(e,t){e&1&&(s(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h2",5),l(6,"Registro de Especialista"),r(),s(7,"p",6),l(8,"Por favor ingrese los datos requeridos"),r(),s(9,"form",7),_("ngSubmit",function(){return t.onSubmit()}),s(10,"div",8)(11,"label",9),l(12,"Nombre"),r(),f(13,"input",10),h(14,Ut,2,0,"span",11)(15,Qt,2,0,"span",11),r(),s(16,"div",8)(17,"label",12),l(18,"Apellido"),r(),f(19,"input",13),h(20,Yt,2,0,"span",11)(21,$t,2,0,"span",11),r(),s(22,"div",8)(23,"label",14),l(24,"Edad"),r(),f(25,"input",15),h(26,Xt,2,0,"span",11)(27,Zt,2,0,"span",11)(28,Jt,2,0,"span",11),r(),s(29,"div",8)(30,"label",16),l(31,"DNI"),r(),f(32,"input",17),h(33,ei,2,0,"span",11)(34,ti,2,0,"span",11),r(),s(35,"div",8)(36,"label",18),l(37,"Especialidades"),r(),s(38,"mat-form-field",19)(39,"mat-label",20),l(40,"Seleccionar Especialidades"),r(),s(41,"mat-select",21),h(42,ii,2,2,"mat-option",22),r()(),h(43,ai,2,0,"span",11),r(),s(44,"div",8)(45,"label",23),l(46,"Nueva Especialidad"),r(),s(47,"div",24),f(48,"input",25),s(49,"button",26),_("click",function(){return t.agregarEspecialidad()}),l(50,"Agregar"),r()()(),s(51,"div",8)(52,"label",27),l(53,"Correo"),r(),f(54,"input",28),h(55,ri,2,0,"span",11)(56,ni,2,0,"span",11),r(),s(57,"div",8)(58,"label",29),l(59,"Contrase\xF1a"),r(),f(60,"input",30),h(61,oi,2,0,"span",11)(62,si,2,0,"span",11),r(),s(63,"div",8)(64,"label",31),l(65,"Foto de perfil"),r(),s(66,"input",32),_("change",function(o){return t.uploadImageUno(o)}),r(),h(67,li,2,0,"span",11),r(),s(68,"re-captcha",33),_("resolved",function(o){return t.executeRecaptchaVisible(o)}),r(),s(69,"button",34),l(70,"Registrar Especialista"),r()()()()()()()),e&2&&(d(9),p("formGroup",t.registroForm),d(5),p("ngIf",t.hasError("nombre","required")),d(),p("ngIf",t.hasError("nombre","pattern")),d(5),p("ngIf",t.hasError("apellido","required")),d(),p("ngIf",t.hasError("apellido","pattern")),d(5),p("ngIf",t.hasError("edad","required")),d(),p("ngIf",t.hasError("edad","min")),d(),p("ngIf",t.hasError("edad","max")),d(5),p("ngIf",t.hasError("dni","required")),d(),p("ngIf",t.hasError("dni","pattern")),d(7),p("disableOptionCentering",!0),d(),p("ngForOf",t.especialidades),d(),p("ngIf",t.hasError("especialidad","required")),d(12),p("ngIf",t.hasError("correo","required")),d(),p("ngIf",t.hasError("correo","email")),d(5),p("ngIf",t.hasError("contrasena","required")),d(),p("ngIf",t.hasError("contrasena","minlength")),d(5),p("ngIf",t.hasError("fotoPerfil","required")))},dependencies:[Ge,qe,Te,We,Pe,Le,z,ze,ke,Oe,we,$e,Ye,Xe,G,mt,ct,xt,Et,B,F],styles:[".fondo[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column;align-items:center;margin:0;padding:0;background:linear-gradient(45deg,gold,#e48080);background-attachment:fixed;background-size:cover;background-repeat:no-repeat}.especialidad[_ngcontent-%COMP%]{color:#000}.container[_ngcontent-%COMP%]{max-width:600px;width:100%;padding:20px}.select-black[_ngcontent-%COMP%]{height:auto;min-height:150px;overflow-y:auto;border:1px solid #ccc;border-radius:5px;padding:10px;background-color:#fff;color:#000}.select-black[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding:5px;cursor:pointer}.select-black[_ngcontent-%COMP%]{color:#000;background-color:#fff;border:1px solid #ffee00;border-radius:5px;padding:10px;appearance:none;-webkit-appearance:none;-moz-appearance:none}.select-black[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{color:#000;background-color:#fff}.card[_ngcontent-%COMP%]{background-color:#343a40;border-radius:1rem;padding:2rem;color:#fff;text-align:center;box-shadow:0 8px 20px #0003}.form-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:20px}.x[_ngcontent-%COMP%]{color:#fff!important}label[_ngcontent-%COMP%]{margin-bottom:5px;font-size:.9rem;color:#ccc;text-align:left}.error[_ngcontent-%COMP%]{color:red}.form-input[_ngcontent-%COMP%]{padding:10px;border:1px solid rgba(255,255,255,.3);border-radius:5px;background-color:#ffffff1a;color:#fff;font-size:1rem;transition:border .3s}.form-input[_ngcontent-%COMP%]:focus{outline:none;border:1px solid #ffee00}.new-specialty[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px}.specialty-container[_ngcontent-%COMP%]{display:flex;gap:10px}.specialty-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{padding:10px 15px;border:none;background-color:#fe0;color:#000;border-radius:5px;cursor:pointer;font-size:.9rem;transition:background-color .3s ease}.specialty-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover{background-color:#e6d000}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:20px}.submit-button[_ngcontent-%COMP%]{padding:10px 20px;font-size:1rem;border:none;background-color:#4caf50;color:#fff;border-radius:5px;cursor:pointer;transition:background-color .3s ease}.submit-button[_ngcontent-%COMP%]:hover{background-color:#45a045}.mat-form-field[_ngcontent-%COMP%]{width:100%;color:#fff}.mat-option[_ngcontent-%COMP%]{text-align:left;color:#fff}"]})};export{Mt as RegistroEspecialistaComponent};
