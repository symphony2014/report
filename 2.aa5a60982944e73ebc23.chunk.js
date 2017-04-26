webpackJsonp([ 2 ], {
    /***/
    1471: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        }, core_1 = __webpack_require__(3), common_1 = __webpack_require__(19), forms_1 = __webpack_require__(26), nga_module_1 = __webpack_require__(83), dashboard_component_1 = __webpack_require__(1479), dashboard_routing_1 = __webpack_require__(1490), ipsosComponent_1 = __webpack_require__(573), angular_service_1 = __webpack_require__(14), DashboardModule = (function() {
            function DashboardModule() {}
            return DashboardModule;
        })();
        DashboardModule = __decorate([ core_1.NgModule({
            imports: [ common_1.CommonModule, forms_1.FormsModule, nga_module_1.NgaModule, dashboard_routing_1.routing ],
            declarations: [ dashboard_component_1.Dashboard, ipsosComponent_1.IpsosComponent ],
            providers: [ angular_service_1.ComponentService, angular_service_1.AlgorithmService ]
        }) ], DashboardModule), exports.DashboardModule = DashboardModule;
    },
    /***/
    1479: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        }, __metadata = this && this.__metadata || function(k, v) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
        }, core_1 = __webpack_require__(3), router_1 = __webpack_require__(13), angular_service_1 = __webpack_require__(14), Dashboard = (function() {
            function Dashboard(route, componentService, local) {
                this.route = route, this.componentService = componentService, this.local = local, 
                this.pjId = local.get("id");
            }
            return Dashboard.prototype.ngOnInit = function() {
                var _this = this;
                //  this.route.params
                //     .switchMap((params: Params) => {
                //         this.pjId=params["id"];
                //         return this.componentService.GetComponents(params['id']);
                //     }).subscribe((res:ComponentInfo[])=>{
                //         this.components=res.filter(c=>c.ModuleType==ModuleType.Dashboard);
                //         console.log("after filter");
                //         console.log(this.components);
                //     });
                this.componentService.GetComponents(this.pjId).subscribe((function(res) {
                    _this.components = res.filter((function(c) {
                        return 2 == c.ModuleType;
                    }));
                }));
            }, Dashboard;
        })();
        Dashboard = __decorate([ core_1.Component({
            selector: "dashboard",
            styles: [ __webpack_require__(1504) ],
            template: __webpack_require__(1510)
        }), __metadata("design:paramtypes", [ router_1.ActivatedRoute, angular_service_1.ComponentService, angular_service_1.LocalStorageService ]) ], Dashboard), 
        exports.Dashboard = Dashboard;
    },
    /***/
    1490: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var router_1 = __webpack_require__(13), dashboard_component_1 = __webpack_require__(1479);
        // noinspection TypeScriptValidateTypes
        exports.routes = [ {
            path: "",
            component: dashboard_component_1.Dashboard,
            children: []
        } ], exports.routing = router_1.RouterModule.forChild(exports.routes);
    },
    /***/
    1504: /***/
    function(module, exports) {
        module.exports = "@media screen and (min-width: 1620px){.row.shift-up>*{margin-top:-573px}}@media screen and (max-width: 1620px){.card.feed-panel.large-card{height:824px}}.user-stats-card .card-title{padding:0 0 15px}.blurCalendar{height:475px}\n";
    },
    /***/
    1510: /***/
    function(module, exports) {
        module.exports = '<div *ngFor="let item of components ">\r\n<ipsos-component *ngIf="item.Show" [component]=\'item\'></ipsos-component>\r\n</div>';
    }
});