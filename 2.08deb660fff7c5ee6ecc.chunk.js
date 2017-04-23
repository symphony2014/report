webpackJsonp([ 2 ], {
    1449: function(e, t, o) {
        "use strict";
        var n = this && this.__decorate || function(e, t, o, n) {
            var r, i = arguments.length, c = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (c = (i < 3 ? r(c) : i > 3 ? r(t, o, c) : r(t, o)) || c);
            return i > 3 && c && Object.defineProperty(t, o, c), c;
        }, r = o(3), i = o(17), c = o(25), a = o(81), s = o(1457), p = o(1468), d = o(561), u = o(14), f = (function() {
            function e() {}
            return e;
        })();
        f = n([ r.NgModule({
            imports: [ i.CommonModule, c.FormsModule, a.NgaModule, p.routing ],
            declarations: [ s.Dashboard, d.IpsosComponent ],
            providers: [ u.ComponentService, u.AlgorithmService ]
        }) ], f), t.DashboardModule = f;
    },
    1457: function(e, t, o) {
        "use strict";
        var n = this && this.__decorate || function(e, t, o, n) {
            var r, i = arguments.length, c = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (c = (i < 3 ? r(c) : i > 3 ? r(t, o, c) : r(t, o)) || c);
            return i > 3 && c && Object.defineProperty(t, o, c), c;
        }, r = this && this.__metadata || function(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
        }, i = o(3), c = o(13), a = o(14), s = (function() {
            function e(e, t, o) {
                this.route = e, this.componentService = t, this.local = o, this.pjId = o.get("id");
            }
            return e.prototype.ngOnInit = function() {
                var e = this;
                this.componentService.GetComponents(this.pjId).subscribe((function(t) {
                    e.components = t.filter((function(e) {
                        return 2 == e.ModuleType;
                    }));
                }));
            }, e;
        })();
        s = n([ i.Component({
            selector: "dashboard",
            styles: [ o(1482) ],
            template: o(1488)
        }), r("design:paramtypes", [ c.ActivatedRoute, a.ComponentService, a.LocalStorageService ]) ], s), 
        t.Dashboard = s;
    },
    1468: function(e, t, o) {
        "use strict";
        var n = o(13), r = o(1457);
        t.routes = [ {
            path: "",
            component: r.Dashboard,
            children: []
        } ], t.routing = n.RouterModule.forChild(t.routes);
    },
    1482: function(e, t) {
        e.exports = "@media screen and (min-width: 1620px){.row.shift-up>*{margin-top:-573px}}@media screen and (max-width: 1620px){.card.feed-panel.large-card{height:824px}}.user-stats-card .card-title{padding:0 0 15px}.blurCalendar{height:475px}\n";
    },
    1488: function(e, t) {
        e.exports = '<div *ngFor="let item of components ">\r\n<ipsos-component *ngIf="item.Show" [component]=\'item\'></ipsos-component>\r\n</div>';
    }
});