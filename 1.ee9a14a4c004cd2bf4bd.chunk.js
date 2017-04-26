webpackJsonp([ 1 ], {
    /***/
    1470: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        }, core_1 = __webpack_require__(3), common_1 = __webpack_require__(19), nga_module_1 = __webpack_require__(83), ng2_tree_1 = __webpack_require__(1482), config_component_1 = __webpack_require__(1472), config_routing_1 = __webpack_require__(1488), modal_1 = __webpack_require__(574), forms_1 = __webpack_require__(26), angular_service_1 = __webpack_require__(14), material_1 = __webpack_require__(568), dialog_algorithm_component_1 = __webpack_require__(1478), config_1 = __webpack_require__(1489), ConfigModule = (function() {
            function ConfigModule() {}
            return ConfigModule;
        })();
        ConfigModule = __decorate([ core_1.NgModule({
            imports: [ forms_1.FormsModule, common_1.CommonModule, nga_module_1.NgaModule, config_routing_1.routing, ng2_tree_1.TreeModule, modal_1.ModalModule, material_1.MdSelectModule, material_1.MdCheckboxModule, material_1.MdOptionModule, material_1.MdDialogModule, material_1.MdButtonModule, material_1.MdInputModule, material_1.MdIconModule, material_1.MdSnackBarModule, material_1.MdCardModule, material_1.MdSlideToggleModule ],
            declarations: [ config_component_1.Config, dialog_algorithm_component_1.DialogAlgorithm, config_1.DialogTemplate ],
            entryComponents: [ dialog_algorithm_component_1.DialogAlgorithm, config_1.DialogTemplate ],
            providers: [ angular_service_1.ComponentService, angular_service_1.AlgorithmService, angular_service_1.VariableService, material_1.MdSnackBar, angular_service_1.TempService ]
        }) ], ConfigModule), exports.ConfigModule = ConfigModule;
    },
    /***/
    1472: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        }, __metadata = this && this.__metadata || function(k, v) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
        }, __param = this && this.__param || function(paramIndex, decorator) {
            return function(target, key) {
                decorator(target, key, paramIndex);
            };
        }, ng2_tree_1 = __webpack_require__(1482), core_1 = __webpack_require__(3), angular_service_1 = __webpack_require__(14), router_1 = __webpack_require__(13), material_1 = __webpack_require__(568), dialog_algorithm_component_1 = __webpack_require__(1478), util_service_1 = __webpack_require__(569), Config = Config_1 = (function() {
            function Config(snackBar, dialog, route, temp, componentService, algorithmService, variableService) {
                var _this = this;
                this.snackBar = snackBar, this.dialog = dialog, this.route = route, this.temp = temp, 
                this.componentService = componentService, this.algorithmService = algorithmService, 
                this.variableService = variableService, this.ALGORITHMMATCH = /"?AlgorithmId"?:\s*"(\w+)"/g, 
                this.componentTypes = [ "Cord", "Filter", "Table", "Pie", "Gauge", "Map", "Radar", "Heatmap", "Graphic" ], 
                this.route.params.switchMap((function(params) {
                    return _this.pjId = params.id, _this.componentService.GetComponents(params.id);
                })).subscribe((function(components) {
                    return _this.toTree(components);
                }));
            }
            return Config.prototype.updateAlgorithm = function(algorithm) {
                var index = this.currentNode.node.component.algorithms.findIndex((function(o) {
                    return algorithm.MapKey == o.MapKey;
                }));
                this.currentNode.node.component.algorithms[index] = algorithm;
            }, Config.prototype.addTemp = function(schema) {
                var json = JSON.parse(util_service_1.JsonUtil.format(schema)), temp = Object.assign({}, json.series[0]);
                temp.AlgorithmId = "" + json.series.length, json.series.push(temp), this.currentNode.node.component.Schema = JSON.stringify(json, null, 2), 
                this.schemaChange(this.currentNode.node.component.Schema);
            }, Config.prototype.showTemplate = function(algorithm) {
                var _this = this;
                this.dialog.open(DialogTemplate, {
                    data: this.componentTypes
                }).afterClosed().switchMap((function(key) {
                    return _this.key = key, _this.temp.getTemp(key);
                })).subscribe((function(a) {
                    if (a) {
                        var newComponent = {
                            ShowText: "",
                            Schema: a.text(),
                            Style: "col-xlg-6 col-xl-6 col-lg-12 col-sm-12 col-xs-12",
                            Type: _this.key,
                            Pjid: _this.pjId,
                            ComponentParentId: _this.currentNode.node.component.ComponentParentId,
                            ModuleType: _this.currentNode.node.component.ModuleType,
                            Show: !0
                        }, tree = new ng2_tree_1.Tree({
                            value: _this.key,
                            component: newComponent
                        }, null, !0);
                        tree.markAsNew(), _this.currentNode.addChild(tree);
                    }
                }));
            }, Config.prototype.showAlgorithm = function(algorithm) {
                var _this = this, open = function(input) {
                    _this.dialog.open(dialog_algorithm_component_1.DialogAlgorithm, {
                        data: input
                    }).afterClosed().subscribe((function(a) {
                        a && _this.updateAlgorithm(a);
                    }));
                };
                algorithm.AlgorithmId.length > 10 ? this.algorithmService.GetAlgorithmView(algorithm.AlgorithmId).subscribe((function(a) {
                    _this.updateAlgorithm(a), open(a);
                })) : open(algorithm);
            }, Config.prototype.schemaChange = function(value) {
                var _this = this;
                this.currentNode.node.component.Schema = value, value && value.match(this.ALGORITHMMATCH) && (this.currentNode.node.component.algorithms = value.match(this.ALGORITHMMATCH).map((function(a, i) {
                    var id = a.match(/\d+/g);
                    return id && id.length && (id = id.pop()), {
                        AlgorithmGroupId: 0,
                        Pjid: _this.pjId,
                        Text: id + "算法",
                        AlgorithmType: 0,
                        MapKey: a,
                        AlgorithmId: id
                    };
                })), this.currentNode.node.component.algorithms.map((function(a) {
                    a.AlgorithmId > 20 && 0 == a.AlgorithmType && _this.algorithmService.GetAlgorithmView(a.AlgorithmId).subscribe((function(n) {
                        return _this.updateAlgorithm(n);
                    }));
                })));
            }, Config.prototype.save = function(component) {
                var _this = this;
                this.componentService.AddComponent(component).switchMap((function(id) {
                    return _this.currentNode.node.component.algorithms.map((function(a) {
                        return a.AlgorithmGroupId = id;
                    })), _this.currentNode.node.component.ComponentId = id, _this.algorithmService.SaveAlgorithmView(_this.currentNode.node.component.algorithms);
                })).subscribe((function(e) {
                    e && 0 != e.length || _this.snackBar.openFromComponent(Config_1, {
                        duration: 500
                    }), e.map((function(id, i) {
                        _this.currentNode.node.component.Schema = _this.currentNode.node.component.Schema.replace(_this.currentNode.node.component.algorithms[i].MapKey, 'AlgorithmId:"' + id + '"');
                    })), _this.componentService.AddComponent(_this.currentNode.node.component).subscribe((function(e) {
                        return _this.snackBar.openFromComponent(Config_1, {
                            duration: 500
                        });
                    }));
                }));
            }, Config.prototype.toTree = function(components) {
                var findChildren = function(components, type) {
                    return components.filter((function(c) {
                        return c.ModuleType == type;
                    })).map((function(c) {
                        return {
                            value: c.ShowText,
                            component: c,
                            children: findChildren(c.ChildComponents, c.ModuleType)
                        };
                    }));
                };
                this.website = {
                    value: "website",
                    children: [ {
                        value: "summary",
                        component: {
                            ModuleType: 1,
                            ComponentParentId: -1
                        },
                        children: findChildren(components, 1)
                    }, {
                        value: "dashboard",
                        component: {
                            ModuleType: 2,
                            ComponentParentId: -1
                        },
                        children: findChildren(components, 2)
                    }, {
                        value: "overview",
                        component: {
                            ModuleType: 4,
                            ComponentParentId: -1
                        },
                        children: findChildren(components, 4)
                    }, {
                        value: "sampleData",
                        component: {
                            ModuleType: 8,
                            ComponentParentId: -1
                        },
                        children: findChildren(components, 8)
                    }, {
                        value: "export",
                        component: {
                            ModuleType: 16,
                            ComponentParentId: -1
                        },
                        children: findChildren(components, 16)
                    }, {
                        value: "closeCycle",
                        component: {
                            ModuleType: 32,
                            ComponentParentId: -1
                        },
                        children: findChildren(components, 32)
                    } ]
                };
            }, Config.prototype.onNodeCreated = function(event) {
                this.newName = event.node.value;
            }, Config.prototype.onNodeSelected = function(event) {
                this.currentNode = event.node, this.currentNode.node.component.ShowText || (this.currentNode.node.component.ShowText = this.newName), 
                this.currentNode.node.component.Index = event.node.positionInParent, this.schemaChange(this.currentNode.node.component.Schema);
            }, Config.prototype.onNodeRemoved = function(event) {
                this.componentService.Delete(event.node.node.component).subscribe((function(r) {
                    return console.log(r);
                }));
            }, Config.prototype.onNodeRenamed = function(event) {}, Config.prototype.onNodeMoved = function(event) {}, 
            Config;
        })();
        Config = Config_1 = __decorate([ core_1.Component({
            selector: "config",
            template: __webpack_require__(1509),
            styles: [ __webpack_require__(1503) ],
            encapsulation: core_1.ViewEncapsulation.None
        }), __metadata("design:paramtypes", [ material_1.MdSnackBar, material_1.MdDialog, router_1.ActivatedRoute, angular_service_1.TempService, angular_service_1.ComponentService, angular_service_1.AlgorithmService, angular_service_1.VariableService ]) ], Config), 
        exports.Config = Config;
        var DialogTemplate = (function() {
            function DialogTemplate(data, dialogRef) {
                this.data = data, this.dialogRef = dialogRef;
            }
            return DialogTemplate;
        })();
        DialogTemplate = __decorate([ core_1.Component({
            selector: "dialog-template",
            template: '\n  <h1 md-dialog-title>选择模板</h1>\n<div md-dialog-actions>\n  <button *ngFor="let temp of data" md-button (click)="dialogRef.close(temp)">{{temp}}</button>\n  <button md-button class="btn-danger">customize</button>\n</div>\n'
        }), __param(0, core_1.Inject(material_1.MD_DIALOG_DATA)), __metadata("design:paramtypes", [ Array, material_1.MdDialogRef ]) ], DialogTemplate), 
        exports.DialogTemplate = DialogTemplate;
        var Config_1;
    },
    /***/
    1473: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var core_1 = __webpack_require__(3), Rx_1 = __webpack_require__(567), draggable_events_1 = __webpack_require__(1497), NodeDraggableService = (function() {
            function NodeDraggableService() {
                this.draggableNodeEvents$ = new Rx_1.Subject();
            }
            return NodeDraggableService.prototype.fireNodeDragged = function(captured, target) {
                captured.tree && !captured.tree.isStatic() && this.draggableNodeEvents$.next(new draggable_events_1.NodeDraggableEvent(captured, target));
            }, NodeDraggableService.prototype.captureNode = function(node) {
                this.capturedNode = node;
            }, NodeDraggableService.prototype.getCapturedNode = function() {
                return this.capturedNode;
            }, NodeDraggableService.prototype.releaseCapturedNode = function() {
                this.capturedNode = null;
            }, NodeDraggableService.decorators = [ {
                type: core_1.Injectable
            } ], NodeDraggableService.ctorParameters = function() {
                return [];
            }, NodeDraggableService;
        })();
        exports.NodeDraggableService = NodeDraggableService;
    },
    /***/
    1474: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        !(function(NodeMenuItemAction) {
            NodeMenuItemAction[NodeMenuItemAction.NewFolder = 0] = "NewFolder", NodeMenuItemAction[NodeMenuItemAction.NewTag = 1] = "NewTag", 
            NodeMenuItemAction[NodeMenuItemAction.Rename = 2] = "Rename", NodeMenuItemAction[NodeMenuItemAction.Remove = 3] = "Remove";
        })(exports.NodeMenuItemAction || (exports.NodeMenuItemAction = {}));
        var NodeMenuItemAction = exports.NodeMenuItemAction;
        !(function(NodeMenuAction) {
            NodeMenuAction[NodeMenuAction.Close = 0] = "Close";
        })(exports.NodeMenuAction || (exports.NodeMenuAction = {}));
        var NodeMenuAction = exports.NodeMenuAction;
    },
    /***/
    1475: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var core_1 = __webpack_require__(3), Rx_1 = __webpack_require__(567), menu_events_1 = __webpack_require__(1474), NodeMenuService = (function() {
            function NodeMenuService() {
                this.nodeMenuEvents$ = new Rx_1.Subject();
            }
            return NodeMenuService.prototype.fireMenuEvent = function(sender, action) {
                var nodeMenuEvent = {
                    sender: sender,
                    action: action
                };
                this.nodeMenuEvents$.next(nodeMenuEvent);
            }, NodeMenuService.prototype.hideMenuStream = function(treeElementRef) {
                return this.nodeMenuEvents$.filter((function(e) {
                    return treeElementRef.nativeElement !== e.sender;
                })).filter((function(e) {
                    return e.action === menu_events_1.NodeMenuAction.Close;
                }));
            }, NodeMenuService.prototype.hideMenuForAllNodesExcept = function(treeElementRef) {
                this.nodeMenuEvents$.next({
                    sender: treeElementRef.nativeElement,
                    action: menu_events_1.NodeMenuAction.Close
                });
            }, NodeMenuService.decorators = [ {
                type: core_1.Injectable
            } ], NodeMenuService.ctorParameters = function() {
                return [];
            }, NodeMenuService;
        })();
        exports.NodeMenuService = NodeMenuService;
    },
    /***/
    1476: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var _ = __webpack_require__(176), rxjs_1 = __webpack_require__(567), tree_types_1 = __webpack_require__(1486), ChildrenLoadingState;
        !(function(ChildrenLoadingState) {
            ChildrenLoadingState[ChildrenLoadingState.NotStarted = 0] = "NotStarted", ChildrenLoadingState[ChildrenLoadingState.Loading = 1] = "Loading", 
            ChildrenLoadingState[ChildrenLoadingState.Completed = 2] = "Completed";
        })(ChildrenLoadingState || (ChildrenLoadingState = {}));
        var Tree = (function() {
            function Tree(node, parent, isBranch) {
                void 0 === parent && (parent = null), void 0 === isBranch && (isBranch = !1), this._childrenLoadingState = ChildrenLoadingState.NotStarted, 
                this.buildTreeFromModel(node, parent, isBranch);
            }
            return Tree.prototype.buildTreeFromModel = function(model, parent, isBranch) {
                var _this = this;
                this.parent = parent, this.node = _.extend(_.omit(model, "children"), {
                    settings: tree_types_1.TreeModelSettings.merge(model, _.get(parent, "node"))
                }), _.isFunction(this.node.loadChildren) ? this._loadChildren = this.node.loadChildren : _.forEach(_.get(model, "children"), (function(child, index) {
                    _this._addChild(new Tree(child, _this), index);
                })), Array.isArray(this._children) || (this._children = this.node.loadChildren || isBranch ? [] : null);
            }, Tree.prototype.childrenAreBeingLoaded = function() {
                return this._childrenLoadingState === ChildrenLoadingState.Loading;
            }, Tree.prototype.canLoadChildren = function() {
                return this._childrenLoadingState === ChildrenLoadingState.NotStarted && this.foldingType === tree_types_1.FoldingType.Expanded && !!this._loadChildren;
            }, Tree.prototype.childrenShouldBeLoaded = function() {
                return !!this._loadChildren;
            }, Object.defineProperty(Tree.prototype, "children", {
                get: function() {
                    return this._children;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(Tree.prototype, "childrenAsync", {
                get: function() {
                    var _this = this;
                    return this.canLoadChildren() ? (setTimeout((function() {
                        return _this._childrenLoadingState = ChildrenLoadingState.Loading;
                    })), new rxjs_1.Observable(function(observer) {
                        _this._loadChildren((function(children) {
                            _this._children = _.map(children, (function(child) {
                                return new Tree(child, _this);
                            })), _this._childrenLoadingState = ChildrenLoadingState.Completed, observer.next(_this.children), 
                            observer.complete();
                        }));
                    })) : rxjs_1.Observable.of(this.children);
                },
                enumerable: !0,
                configurable: !0
            }), Tree.prototype.createNode = function(isBranch) {
                var tree = new Tree({
                    value: ""
                }, null, isBranch);
                return tree.markAsNew(), this.isLeaf() ? this.addSibling(tree) : this.addChild(tree);
            }, Object.defineProperty(Tree.prototype, "value", {
                get: function() {
                    return this.node.value;
                },
                set: function(value) {
                    if ("string" == typeof value || Tree.isRenamable(value)) if (Tree.isRenamable(this.value)) {
                        var newValue = "string" == typeof value ? value : _.toString(value);
                        this.node.value = Tree.applyNewValueToRenamable(this.value, newValue);
                    } else this.node.value = Tree.isValueEmpty(value) ? this.node.value : _.toString(value);
                },
                enumerable: !0,
                configurable: !0
            }), Tree.prototype.addSibling = function(sibling, position) {
                return _.isArray(_.get(this.parent, "children")) ? this.parent.addChild(sibling, position) : null;
            }, Tree.prototype.addChild = function(child, position) {
                return this._addChild(Tree.cloneTreeShallow(child), position);
            }, Tree.prototype._addChild = function(child, position) {
                return void 0 === position && (position = _.size(this._children) || 0), child.parent = this, 
                Array.isArray(this._children) ? this._children.splice(position, 0, child) : this._children = [ child ], 
                child;
            }, Tree.prototype.swapWithSibling = function(sibling) {
                if (this.hasSibling(sibling)) {
                    var siblingIndex = sibling.positionInParent, thisTreeIndex = this.positionInParent;
                    this.parent._children[siblingIndex] = this, this.parent._children[thisTreeIndex] = sibling;
                }
            }, Object.defineProperty(Tree.prototype, "positionInParent", {
                get: function() {
                    return _.indexOf(this.parent.children, this);
                },
                enumerable: !0,
                configurable: !0
            }), Tree.prototype.isStatic = function() {
                return _.get(this.node.settings, "static", !1);
            }, Tree.prototype.isLeaf = function() {
                return !this.isBranch();
            }, Tree.prototype.isBranch = function() {
                return Array.isArray(this._children);
            }, Tree.prototype.isRoot = function() {
                return null === this.parent;
            }, Tree.prototype.hasSibling = function(tree) {
                return !this.isRoot() && _.includes(this.parent.children, tree);
            }, Tree.prototype.hasChild = function(tree) {
                return _.includes(this._children, tree);
            }, Tree.prototype.removeChild = function(tree) {
                var childIndex = _.findIndex(this._children, (function(child) {
                    return child === tree;
                }));
                childIndex >= 0 && this._children.splice(childIndex, 1);
            }, Tree.prototype.removeItselfFromParent = function() {
                this.parent && this.parent.removeChild(this);
            }, Tree.prototype.switchFoldingType = function() {
                this.isLeaf() || (this.node._foldingType = this.isNodeExpanded() ? tree_types_1.FoldingType.Collapsed : tree_types_1.FoldingType.Expanded);
            }, Tree.prototype.isNodeExpanded = function() {
                return this.foldingType === tree_types_1.FoldingType.Expanded;
            }, Object.defineProperty(Tree.prototype, "foldingType", {
                get: function() {
                    return this.node._foldingType || (this.childrenShouldBeLoaded() ? this.node._foldingType = tree_types_1.FoldingType.Collapsed : this._children ? this.node._foldingType = tree_types_1.FoldingType.Expanded : this.node._foldingType = tree_types_1.FoldingType.Leaf), 
                    this.node._foldingType;
                },
                enumerable: !0,
                configurable: !0
            }), Tree.prototype.isNew = function() {
                return this.node._status === tree_types_1.TreeStatus.New;
            }, Tree.prototype.markAsNew = function() {
                this.node._status = tree_types_1.TreeStatus.New;
            }, Tree.prototype.isBeingRenamed = function() {
                return this.node._status === tree_types_1.TreeStatus.IsBeingRenamed;
            }, Tree.prototype.markAsBeingRenamed = function() {
                this.node._status = tree_types_1.TreeStatus.IsBeingRenamed;
            }, Tree.prototype.isModified = function() {
                return this.node._status === tree_types_1.TreeStatus.Modified;
            }, Tree.prototype.markAsModified = function() {
                this.node._status = tree_types_1.TreeStatus.Modified;
            }, Tree.isValueEmpty = function(value) {
                return _.isEmpty(_.trim(value));
            }, Tree.isRenamable = function(value) {
                return _.has(value, "setName") && _.isFunction(value.setName) && _.has(value, "toString") && _.isFunction(value.toString) && value.toString !== Object.toString;
            }, Tree.cloneTreeShallow = function(origin) {
                var tree = new Tree(_.clone(origin.node));
                return tree._children = origin._children, tree;
            }, Tree.applyNewValueToRenamable = function(value, newValue) {
                var renamableValue = _.merge({}, value);
                return renamableValue.setName(newValue), renamableValue;
            }, Tree;
        })();
        exports.Tree = Tree;
    },
    /***/
    1477: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var tree_events_1 = __webpack_require__(1485), Rx_1 = __webpack_require__(567), core_1 = __webpack_require__(3), node_draggable_service_1 = __webpack_require__(1473), TreeService = (function() {
            function TreeService(nodeDraggableService) {
                this.nodeDraggableService = nodeDraggableService, this.nodeMoved$ = new Rx_1.Subject(), 
                this.nodeRemoved$ = new Rx_1.Subject(), this.nodeRenamed$ = new Rx_1.Subject(), 
                this.nodeCreated$ = new Rx_1.Subject(), this.nodeSelected$ = new Rx_1.Subject(), 
                this.nodeRemoved$.subscribe((function(e) {
                    return e.node.removeItselfFromParent();
                }));
            }
            return TreeService.prototype.unselectStream = function(tree) {
                return this.nodeSelected$.filter((function(e) {
                    return tree !== e.node;
                }));
            }, TreeService.prototype.fireNodeRemoved = function(tree) {
                this.nodeRemoved$.next(new tree_events_1.NodeRemovedEvent(tree));
            }, TreeService.prototype.fireNodeCreated = function(tree) {
                this.nodeCreated$.next(new tree_events_1.NodeCreatedEvent(tree));
            }, TreeService.prototype.fireNodeSelected = function(tree) {
                this.nodeSelected$.next(new tree_events_1.NodeSelectedEvent(tree));
            }, TreeService.prototype.fireNodeRenamed = function(oldValue, tree) {
                this.nodeRenamed$.next(new tree_events_1.NodeRenamedEvent(tree, oldValue, tree.value));
            }, TreeService.prototype.fireNodeMoved = function(tree, parent) {
                this.nodeMoved$.next(new tree_events_1.NodeMovedEvent(tree, parent));
            }, TreeService.prototype.draggedStream = function(tree, element) {
                return this.nodeDraggableService.draggableNodeEvents$.filter((function(e) {
                    return e.target === element;
                })).filter((function(e) {
                    return !e.captured.tree.hasChild(tree);
                }));
            }, TreeService.decorators = [ {
                type: core_1.Injectable
            } ], TreeService.ctorParameters = function() {
                return [ {
                    type: node_draggable_service_1.NodeDraggableService,
                    decorators: [ {
                        type: core_1.Inject,
                        args: [ node_draggable_service_1.NodeDraggableService ]
                    } ]
                } ];
            }, TreeService;
        })();
        exports.TreeService = TreeService;
    },
    /***/
    1478: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        }, __metadata = this && this.__metadata || function(k, v) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
        }, __param = this && this.__param || function(paramIndex, decorator) {
            return function(target, key) {
                decorator(target, key, paramIndex);
            };
        }, core_1 = __webpack_require__(3), angular_service_1 = __webpack_require__(14), material_1 = __webpack_require__(568), DialogAlgorithm = (function() {
            function DialogAlgorithm(data, dialogRef, variableService, algorithmService) {
                this.data = data, this.dialogRef = dialogRef, this.variableService = variableService, 
                this.algorithmService = algorithmService, this.properties = [ "None", "MapVar", "CountVar", "GruopVar", "ConditionVar", "ShowQuantity", "ShowDateUnitType" ];
            }
            return DialogAlgorithm.prototype.ngOnChanges = function(changes) {
                console.log(changes);
            }, DialogAlgorithm.prototype.ngOnInit = function() {
                var _this = this;
                console.log(this.data), this.variableService.GetVariables(this.data.Pjid).subscribe((function(res) {
                    return _this.variables = res;
                })), this.algorithmService.GetAlgorithmTypeList().subscribe((function(res) {
                    return _this.types = res;
                }));
            }, DialogAlgorithm.prototype.update = function(view, type) {
                var _this = this;
                this.algorithmService.GetAlgorithmNewView(view.Pjid, view.AlgorithmGroupId, view.AlgorithmType, view.AlgorithmId).subscribe((function(view) {
                    view && (_this.data.AlgorithmProperties = view.AlgorithmProperties);
                }));
            }, DialogAlgorithm;
        })();
        DialogAlgorithm = __decorate([ core_1.Component({
            selector: "dialog-algorithm",
            template: __webpack_require__(1508)
        }), __param(0, core_1.Inject(material_1.MD_DIALOG_DATA)), __metadata("design:paramtypes", [ Object, material_1.MdDialogRef, angular_service_1.VariableService, angular_service_1.AlgorithmService ]) ], DialogAlgorithm), 
        exports.DialogAlgorithm = DialogAlgorithm;
    },
    /***/
    1482: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var tree_types_1 = __webpack_require__(1486);
        exports.TreeModelSettings = tree_types_1.TreeModelSettings, exports.FoldingType = tree_types_1.FoldingType;
        var tree_1 = __webpack_require__(1476);
        exports.Tree = tree_1.Tree;
        var tree_events_1 = __webpack_require__(1485);
        exports.NodeEvent = tree_events_1.NodeEvent, exports.NodeCreatedEvent = tree_events_1.NodeCreatedEvent, 
        exports.NodeRemovedEvent = tree_events_1.NodeRemovedEvent, exports.NodeRenamedEvent = tree_events_1.NodeRenamedEvent, 
        exports.NodeMovedEvent = tree_events_1.NodeMovedEvent, exports.NodeSelectedEvent = tree_events_1.NodeSelectedEvent, 
        exports.NodeDestructiveEvent = tree_events_1.NodeDestructiveEvent;
        var tree_component_1 = __webpack_require__(1484);
        exports.TreeComponent = tree_component_1.TreeComponent;
        var tree_module_1 = __webpack_require__(1502);
        exports.TreeModule = tree_module_1.TreeModule;
    },
    /***/
    1483: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        !(function(NodeEditableEventAction) {
            NodeEditableEventAction[NodeEditableEventAction.Cancel = 0] = "Cancel";
        })(exports.NodeEditableEventAction || (exports.NodeEditableEventAction = {}));
        var NodeEditableEventAction = exports.NodeEditableEventAction;
    },
    /***/
    1484: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var core_1 = __webpack_require__(3), tree_service_1 = __webpack_require__(1477), tree_1 = __webpack_require__(1476), TreeComponent = (function() {
            function TreeComponent(treeService) {
                this.treeService = treeService, this.nodeCreated = new core_1.EventEmitter(), this.nodeRemoved = new core_1.EventEmitter(), 
                this.nodeRenamed = new core_1.EventEmitter(), this.nodeSelected = new core_1.EventEmitter(), 
                this.nodeMoved = new core_1.EventEmitter();
            }
            return TreeComponent.prototype.ngOnChanges = function(changes) {
                this.treeModel ? this.tree = new tree_1.Tree(this.treeModel) : this.tree = TreeComponent.EMPTY_TREE;
            }, TreeComponent.prototype.ngOnInit = function() {
                var _this = this;
                this.treeService.nodeRemoved$.subscribe((function(e) {
                    _this.nodeRemoved.emit(e);
                })), this.treeService.nodeRenamed$.subscribe((function(e) {
                    _this.nodeRenamed.emit(e);
                })), this.treeService.nodeCreated$.subscribe((function(e) {
                    _this.nodeCreated.emit(e);
                })), this.treeService.nodeSelected$.subscribe((function(e) {
                    _this.nodeSelected.emit(e);
                })), this.treeService.nodeMoved$.subscribe((function(e) {
                    _this.nodeMoved.emit(e);
                }));
            }, TreeComponent.EMPTY_TREE = new tree_1.Tree({
                value: ""
            }), TreeComponent.decorators = [ {
                type: core_1.Component,
                args: [ {
                    selector: "tree",
                    template: '<tree-internal [tree]="tree" [settings]="settings"></tree-internal>',
                    providers: [ tree_service_1.TreeService ]
                } ]
            } ], TreeComponent.ctorParameters = function() {
                return [ {
                    type: tree_service_1.TreeService,
                    decorators: [ {
                        type: core_1.Inject,
                        args: [ tree_service_1.TreeService ]
                    } ]
                } ];
            }, TreeComponent.propDecorators = {
                treeModel: [ {
                    type: core_1.Input,
                    args: [ "tree" ]
                } ],
                settings: [ {
                    type: core_1.Input
                } ],
                nodeCreated: [ {
                    type: core_1.Output
                } ],
                nodeRemoved: [ {
                    type: core_1.Output
                } ],
                nodeRenamed: [ {
                    type: core_1.Output
                } ],
                nodeSelected: [ {
                    type: core_1.Output
                } ],
                nodeMoved: [ {
                    type: core_1.Output
                } ]
            }, TreeComponent;
        })();
        exports.TreeComponent = TreeComponent;
    },
    /***/
    1485: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            function __() {
                this.constructor = d;
            }
            for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
        }, NodeEvent = (function() {
            function NodeEvent(node) {
                this.node = node;
            }
            return NodeEvent;
        })();
        exports.NodeEvent = NodeEvent;
        var NodeSelectedEvent = (function(_super) {
            function NodeSelectedEvent(node) {
                _super.call(this, node);
            }
            return __extends(NodeSelectedEvent, _super), NodeSelectedEvent;
        })(NodeEvent);
        exports.NodeSelectedEvent = NodeSelectedEvent;
        var NodeDestructiveEvent = (function(_super) {
            function NodeDestructiveEvent(node) {
                _super.call(this, node);
            }
            return __extends(NodeDestructiveEvent, _super), NodeDestructiveEvent;
        })(NodeEvent);
        exports.NodeDestructiveEvent = NodeDestructiveEvent;
        var NodeMovedEvent = (function(_super) {
            function NodeMovedEvent(node, previousParent) {
                _super.call(this, node), this.previousParent = previousParent;
            }
            return __extends(NodeMovedEvent, _super), NodeMovedEvent;
        })(NodeDestructiveEvent);
        exports.NodeMovedEvent = NodeMovedEvent;
        var NodeRemovedEvent = (function(_super) {
            function NodeRemovedEvent(node) {
                _super.call(this, node);
            }
            return __extends(NodeRemovedEvent, _super), NodeRemovedEvent;
        })(NodeDestructiveEvent);
        exports.NodeRemovedEvent = NodeRemovedEvent;
        var NodeCreatedEvent = (function(_super) {
            function NodeCreatedEvent(node) {
                _super.call(this, node);
            }
            return __extends(NodeCreatedEvent, _super), NodeCreatedEvent;
        })(NodeDestructiveEvent);
        exports.NodeCreatedEvent = NodeCreatedEvent;
        var NodeRenamedEvent = (function(_super) {
            function NodeRenamedEvent(node, oldValue, newValue) {
                _super.call(this, node), this.oldValue = oldValue, this.newValue = newValue;
            }
            return __extends(NodeRenamedEvent, _super), NodeRenamedEvent;
        })(NodeDestructiveEvent);
        exports.NodeRenamedEvent = NodeRenamedEvent;
    },
    /***/
    1486: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var _ = __webpack_require__(176), FoldingType = (function() {
            function FoldingType(_cssClass) {
                this._cssClass = _cssClass;
            }
            return Object.defineProperty(FoldingType.prototype, "cssClass", {
                get: function() {
                    return this._cssClass;
                },
                enumerable: !0,
                configurable: !0
            }), FoldingType.Expanded = new FoldingType("node-expanded"), FoldingType.Collapsed = new FoldingType("node-collapsed"), 
            FoldingType.Leaf = new FoldingType("node-leaf"), FoldingType;
        })();
        exports.FoldingType = FoldingType;
        var TreeModelSettings = (function() {
            function TreeModelSettings() {}
            return TreeModelSettings.merge = function(sourceA, sourceB) {
                return _.defaults({}, _.get(sourceA, "settings"), _.get(sourceB, "settings"), {
                    static: !1
                });
            }, TreeModelSettings;
        })();
        exports.TreeModelSettings = TreeModelSettings, (function(TreeStatus) {
            TreeStatus[TreeStatus.New = 0] = "New", TreeStatus[TreeStatus.Modified = 1] = "Modified", 
            TreeStatus[TreeStatus.IsBeingRenamed = 2] = "IsBeingRenamed";
        })(exports.TreeStatus || (exports.TreeStatus = {}));
        var TreeStatus = exports.TreeStatus;
    },
    /***/
    1487: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function isLeftButtonClicked(e) {
            return e.button === MouseButtons.Left;
        }
        function isRightButtonClicked(e) {
            return e.button === MouseButtons.Right;
        }
        function isEscapePressed(e) {
            return e.keyCode === Keys.Escape;
        }
        exports.isLeftButtonClicked = isLeftButtonClicked, exports.isRightButtonClicked = isRightButtonClicked, 
        exports.isEscapePressed = isEscapePressed, (function(Keys) {
            Keys[Keys.Escape = 27] = "Escape";
        })(exports.Keys || (exports.Keys = {}));
        var Keys = exports.Keys;
        !(function(MouseButtons) {
            MouseButtons[MouseButtons.Left = 0] = "Left", MouseButtons[MouseButtons.Right = 2] = "Right";
        })(exports.MouseButtons || (exports.MouseButtons = {}));
        var MouseButtons = exports.MouseButtons;
    },
    /***/
    1488: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var router_1 = __webpack_require__(13), config_component_1 = __webpack_require__(1472);
        // noinspection TypeScriptValidateTypes
        exports.routes = [ {
            path: "",
            component: config_component_1.Config,
            children: []
        } ], exports.routing = router_1.RouterModule.forChild(exports.routes);
    },
    /***/
    1489: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) exports.hasOwnProperty(p) || (exports[p] = m[p]);
        }
        __export(__webpack_require__(1472));
    },
    /***/
    1496: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var CapturedNode = (function() {
            function CapturedNode(anElement, aTree) {
                this.anElement = anElement, this.aTree = aTree;
            }
            return CapturedNode.prototype.canBeDroppedAt = function(element) {
                return !this.sameAs(element) && !this.contains(element);
            }, CapturedNode.prototype.contains = function(other) {
                return this.element.nativeElement.contains(other.nativeElement);
            }, CapturedNode.prototype.sameAs = function(other) {
                return this.element === other;
            }, Object.defineProperty(CapturedNode.prototype, "element", {
                get: function() {
                    return this.anElement;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(CapturedNode.prototype, "tree", {
                get: function() {
                    return this.aTree;
                },
                enumerable: !0,
                configurable: !0
            }), CapturedNode;
        })();
        exports.CapturedNode = CapturedNode;
    },
    /***/
    1497: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var NodeDraggableEvent = (function() {
            function NodeDraggableEvent(captured, target) {
                this.captured = captured, this.target = target;
            }
            return NodeDraggableEvent;
        })();
        exports.NodeDraggableEvent = NodeDraggableEvent;
    },
    /***/
    1498: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var core_1 = __webpack_require__(3), node_draggable_service_1 = __webpack_require__(1473), captured_node_1 = __webpack_require__(1496), NodeDraggableDirective = (function() {
            function NodeDraggableDirective(element, nodeDraggableService, renderer) {
                this.element = element, this.nodeDraggableService = nodeDraggableService, this.renderer = renderer, 
                this.disposersForDragListeners = [], this.nodeNativeElement = element.nativeElement;
            }
            return NodeDraggableDirective.prototype.ngOnInit = function() {
                this.tree.isStatic() || (this.renderer.setElementAttribute(this.nodeNativeElement, "draggable", "true"), 
                this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, "dragenter", this.handleDragEnter.bind(this))), 
                this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, "dragover", this.handleDragOver.bind(this))), 
                this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, "dragstart", this.handleDragStart.bind(this))), 
                this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, "dragleave", this.handleDragLeave.bind(this))), 
                this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, "drop", this.handleDrop.bind(this))), 
                this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, "dragend", this.handleDragEnd.bind(this))));
            }, NodeDraggableDirective.prototype.ngOnDestroy = function() {
                this.disposersForDragListeners.forEach((function(dispose) {
                    return dispose();
                }));
            }, NodeDraggableDirective.prototype.handleDragStart = function(e) {
                e.stopPropagation(), this.nodeDraggableService.captureNode(new captured_node_1.CapturedNode(this.nodeDraggable, this.tree)), 
                e.dataTransfer.setData("text", NodeDraggableDirective.DATA_TRANSFER_STUB_DATA), 
                e.dataTransfer.effectAllowed = "move";
            }, NodeDraggableDirective.prototype.handleDragOver = function(e) {
                e.preventDefault(), e.dataTransfer.dropEffect = "move";
            }, NodeDraggableDirective.prototype.handleDragEnter = function(e) {
                e.preventDefault(), this.containsElementAt(e) && this.addClass("over-drop-target");
            }, NodeDraggableDirective.prototype.handleDragLeave = function(e) {
                this.containsElementAt(e) || this.removeClass("over-drop-target");
            }, NodeDraggableDirective.prototype.handleDrop = function(e) {
                return e.preventDefault(), e.stopPropagation(), this.removeClass("over-drop-target"), 
                !!this.isDropPossible(e) && (this.nodeDraggableService.getCapturedNode() ? this.notifyThatNodeWasDropped() : void 0);
            }, NodeDraggableDirective.prototype.isDropPossible = function(e) {
                var capturedNode = this.nodeDraggableService.getCapturedNode();
                return capturedNode && capturedNode.canBeDroppedAt(this.nodeDraggable) && this.containsElementAt(e);
            }, NodeDraggableDirective.prototype.handleDragEnd = function(e) {
                this.removeClass("over-drop-target"), this.nodeDraggableService.releaseCapturedNode();
            }, NodeDraggableDirective.prototype.containsElementAt = function(e) {
                var _a = e.x, x = void 0 === _a ? e.clientX : _a, _b = e.y, y = void 0 === _b ? e.clientY : _b;
                return this.nodeNativeElement.contains(document.elementFromPoint(x, y));
            }, NodeDraggableDirective.prototype.addClass = function(className) {
                this.nodeNativeElement.classList.add(className);
            }, NodeDraggableDirective.prototype.removeClass = function(className) {
                this.nodeNativeElement.classList.remove(className);
            }, NodeDraggableDirective.prototype.notifyThatNodeWasDropped = function() {
                this.nodeDraggableService.fireNodeDragged(this.nodeDraggableService.getCapturedNode(), this.nodeDraggable);
            }, NodeDraggableDirective.DATA_TRANSFER_STUB_DATA = "some browsers enable drag-n-drop only when dataTransfer has data", 
            NodeDraggableDirective.decorators = [ {
                type: core_1.Directive,
                args: [ {
                    selector: "[nodeDraggable]"
                } ]
            } ], NodeDraggableDirective.ctorParameters = function() {
                return [ {
                    type: core_1.ElementRef,
                    decorators: [ {
                        type: core_1.Inject,
                        args: [ core_1.ElementRef ]
                    } ]
                }, {
                    type: node_draggable_service_1.NodeDraggableService,
                    decorators: [ {
                        type: core_1.Inject,
                        args: [ node_draggable_service_1.NodeDraggableService ]
                    } ]
                }, {
                    type: core_1.Renderer,
                    decorators: [ {
                        type: core_1.Inject,
                        args: [ core_1.Renderer ]
                    } ]
                } ];
            }, NodeDraggableDirective.propDecorators = {
                nodeDraggable: [ {
                    type: core_1.Input
                } ],
                tree: [ {
                    type: core_1.Input
                } ]
            }, NodeDraggableDirective;
        })();
        exports.NodeDraggableDirective = NodeDraggableDirective;
    },
    /***/
    1499: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var core_1 = __webpack_require__(3), editable_events_1 = __webpack_require__(1483), NodeEditableDirective = (function() {
            function NodeEditableDirective(renderer, elementRef) {
                this.renderer = renderer, this.elementRef = elementRef, this.valueChanged = new core_1.EventEmitter(!1);
            }
            return NodeEditableDirective.prototype.ngOnInit = function() {
                var nativeElement = this.elementRef.nativeElement;
                this.renderer.invokeElementMethod(nativeElement, "focus", []), this.renderer.setElementProperty(nativeElement, "value", this.nodeValue);
            }, NodeEditableDirective.prototype.applyNewValue = function(newNodeValue) {
                this.valueChanged.emit({
                    type: "keyup",
                    value: newNodeValue
                });
            }, NodeEditableDirective.prototype.applyNewValueByLoosingFocus = function(newNodeValue) {
                this.valueChanged.emit({
                    type: "blur",
                    value: newNodeValue
                });
            }, NodeEditableDirective.prototype.cancelEditing = function() {
                this.valueChanged.emit({
                    type: "keyup",
                    value: this.nodeValue,
                    action: editable_events_1.NodeEditableEventAction.Cancel
                });
            }, NodeEditableDirective.decorators = [ {
                type: core_1.Directive,
                args: [ {
                    selector: "[nodeEditable]"
                } ]
            } ], NodeEditableDirective.ctorParameters = function() {
                return [ {
                    type: core_1.Renderer,
                    decorators: [ {
                        type: core_1.Inject,
                        args: [ core_1.Renderer ]
                    } ]
                }, {
                    type: core_1.ElementRef,
                    decorators: [ {
                        type: core_1.Inject,
                        args: [ core_1.ElementRef ]
                    } ]
                } ];
            }, NodeEditableDirective.propDecorators = {
                nodeValue: [ {
                    type: core_1.Input,
                    args: [ "nodeEditable" ]
                } ],
                valueChanged: [ {
                    type: core_1.Output
                } ],
                applyNewValue: [ {
                    type: core_1.HostListener,
                    args: [ "keyup.enter", [ "$event.target.value" ] ]
                } ],
                applyNewValueByLoosingFocus: [ {
                    type: core_1.HostListener,
                    args: [ "blur", [ "$event.target.value" ] ]
                } ],
                cancelEditing: [ {
                    type: core_1.HostListener,
                    args: [ "keyup.esc" ]
                } ]
            }, NodeEditableDirective;
        })();
        exports.NodeEditableDirective = NodeEditableDirective;
    },
    /***/
    1500: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var core_1 = __webpack_require__(3), node_menu_service_1 = __webpack_require__(1475), menu_events_1 = __webpack_require__(1474), event_utils_1 = __webpack_require__(1487), NodeMenuComponent = (function() {
            function NodeMenuComponent(renderer, nodeMenuService) {
                this.renderer = renderer, this.nodeMenuService = nodeMenuService, this.menuItemSelected = new core_1.EventEmitter(), 
                this.availableMenuItems = [ {
                    name: "New tag",
                    action: menu_events_1.NodeMenuItemAction.NewTag,
                    cssClass: "new-tag"
                }, {
                    name: "New folder",
                    action: menu_events_1.NodeMenuItemAction.NewFolder,
                    cssClass: "new-folder"
                }, {
                    name: "Rename",
                    action: menu_events_1.NodeMenuItemAction.Rename,
                    cssClass: "rename"
                }, {
                    name: "Remove",
                    action: menu_events_1.NodeMenuItemAction.Remove,
                    cssClass: "remove"
                } ], this.disposersForGlobalListeners = [];
            }
            return NodeMenuComponent.prototype.ngOnInit = function() {
                this.disposersForGlobalListeners.push(this.renderer.listenGlobal("document", "keyup", this.closeMenu.bind(this))), 
                this.disposersForGlobalListeners.push(this.renderer.listenGlobal("document", "click", this.closeMenu.bind(this)));
            }, NodeMenuComponent.prototype.ngOnDestroy = function() {
                this.disposersForGlobalListeners.forEach((function(dispose) {
                    return dispose();
                }));
            }, NodeMenuComponent.prototype.onMenuItemSelected = function(e, selectedMenuItem) {
                event_utils_1.isLeftButtonClicked(e) && this.menuItemSelected.emit({
                    nodeMenuItemAction: selectedMenuItem.action
                });
            }, NodeMenuComponent.prototype.closeMenu = function(e) {
                (e instanceof MouseEvent || event_utils_1.isEscapePressed(e)) && this.nodeMenuService.fireMenuEvent(e.target, menu_events_1.NodeMenuAction.Close);
            }, NodeMenuComponent.decorators = [ {
                type: core_1.Component,
                args: [ {
                    selector: "node-menu",
                    template: '\n    <div class="node-menu">\n      <ul class="node-menu-content">\n        <li class="node-menu-item" *ngFor="let menuItem of availableMenuItems"\n            (click)="onMenuItemSelected($event, menuItem)">\n          <div class="node-menu-item-icon {{menuItem.cssClass}}"></div>\n          <span class="node-menu-item-value">{{menuItem.name}}</span>\n        </li>\n      </ul>\n    </div>\n  '
                } ]
            } ], NodeMenuComponent.ctorParameters = function() {
                return [ {
                    type: core_1.Renderer,
                    decorators: [ {
                        type: core_1.Inject,
                        args: [ core_1.Renderer ]
                    } ]
                }, {
                    type: node_menu_service_1.NodeMenuService,
                    decorators: [ {
                        type: core_1.Inject,
                        args: [ node_menu_service_1.NodeMenuService ]
                    } ]
                } ];
            }, NodeMenuComponent.propDecorators = {
                menuItemSelected: [ {
                    type: core_1.Output
                } ]
            }, NodeMenuComponent;
        })();
        exports.NodeMenuComponent = NodeMenuComponent;
    },
    /***/
    1501: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var core_1 = __webpack_require__(3), tree_1 = __webpack_require__(1476), node_menu_service_1 = __webpack_require__(1475), menu_events_1 = __webpack_require__(1474), editable_events_1 = __webpack_require__(1483), tree_service_1 = __webpack_require__(1477), EventUtils = __webpack_require__(1487), TreeInternalComponent = (function() {
            function TreeInternalComponent(nodeMenuService, treeService, element) {
                this.nodeMenuService = nodeMenuService, this.treeService = treeService, this.element = element, 
                this.isSelected = !1, this.isMenuVisible = !1;
            }
            return TreeInternalComponent.prototype.ngOnInit = function() {
                var _this = this;
                this.settings = this.settings || {
                    rootIsVisible: !0
                }, this.nodeMenuService.hideMenuStream(this.element).subscribe((function() {
                    return _this.isMenuVisible = !1;
                })), this.treeService.unselectStream(this.tree).subscribe((function() {
                    return _this.isSelected = !1;
                })), this.treeService.draggedStream(this.tree, this.element).subscribe((function(e) {
                    _this.tree.hasSibling(e.captured.tree) ? _this.swapWithSibling(e.captured.tree, _this.tree) : _this.tree.isBranch() ? _this.moveNodeToThisTreeAndRemoveFromPreviousOne(e, _this.tree) : _this.moveNodeToParentTreeAndRemoveFromPreviousOne(e, _this.tree);
                }));
            }, TreeInternalComponent.prototype.swapWithSibling = function(sibling, tree) {
                tree.swapWithSibling(sibling), this.treeService.fireNodeMoved(sibling, sibling.parent);
            }, TreeInternalComponent.prototype.moveNodeToThisTreeAndRemoveFromPreviousOne = function(e, tree) {
                this.treeService.fireNodeRemoved(e.captured.tree);
                var addedChild = tree.addChild(e.captured.tree);
                this.treeService.fireNodeMoved(addedChild, e.captured.tree.parent);
            }, TreeInternalComponent.prototype.moveNodeToParentTreeAndRemoveFromPreviousOne = function(e, tree) {
                this.treeService.fireNodeRemoved(e.captured.tree);
                var addedSibling = tree.addSibling(e.captured.tree, tree.positionInParent);
                this.treeService.fireNodeMoved(addedSibling, e.captured.tree.parent);
            }, TreeInternalComponent.prototype.onNodeSelected = function(e) {
                EventUtils.isLeftButtonClicked(e) && (this.isSelected = !0, this.treeService.fireNodeSelected(this.tree));
            }, TreeInternalComponent.prototype.showMenu = function(e) {
                this.tree.isStatic() || (EventUtils.isRightButtonClicked(e) && (this.isMenuVisible = !this.isMenuVisible, 
                this.nodeMenuService.hideMenuForAllNodesExcept(this.element)), e.preventDefault());
            }, TreeInternalComponent.prototype.onMenuItemSelected = function(e) {
                switch (e.nodeMenuItemAction) {
                  case menu_events_1.NodeMenuItemAction.NewTag:
                    this.onNewSelected(e);
                    break;

                  case menu_events_1.NodeMenuItemAction.NewFolder:
                    this.onNewSelected(e);
                    break;

                  case menu_events_1.NodeMenuItemAction.Rename:
                    this.onRenameSelected();
                    break;

                  case menu_events_1.NodeMenuItemAction.Remove:
                    this.onRemoveSelected();
                    break;

                  default:
                    throw new Error("Chosen menu item doesn't exist");
                }
            }, TreeInternalComponent.prototype.onNewSelected = function(e) {
                this.tree.createNode(e.nodeMenuItemAction === menu_events_1.NodeMenuItemAction.NewFolder), 
                this.isMenuVisible = !1;
            }, TreeInternalComponent.prototype.onRenameSelected = function() {
                this.tree.markAsBeingRenamed(), this.isMenuVisible = !1;
            }, TreeInternalComponent.prototype.onRemoveSelected = function() {
                this.treeService.fireNodeRemoved(this.tree);
            }, TreeInternalComponent.prototype.applyNewValue = function(e) {
                if ((e.action === editable_events_1.NodeEditableEventAction.Cancel || this.tree.isNew()) && tree_1.Tree.isValueEmpty(e.value)) return this.treeService.fireNodeRemoved(this.tree);
                if (this.tree.isNew() && (this.tree.value = e.value, this.treeService.fireNodeCreated(this.tree)), 
                this.tree.isBeingRenamed()) {
                    var oldValue = this.tree.value;
                    this.tree.value = e.value, this.treeService.fireNodeRenamed(oldValue, this.tree);
                }
                this.tree.markAsModified();
            }, TreeInternalComponent.prototype.shouldShowInputForTreeValue = function() {
                return this.tree.isNew() || this.tree.isBeingRenamed();
            }, TreeInternalComponent.prototype.isRootHidden = function() {
                return this.tree.isRoot() && !this.settings.rootIsVisible;
            }, TreeInternalComponent.decorators = [ {
                type: core_1.Component,
                args: [ {
                    selector: "tree-internal",
                    template: '\n  <ul class="tree" *ngIf="tree" [ngClass]="{rootless: isRootHidden()}">\n    <li>\n      <div class="value-container"\n        [ngClass]="{rootless: isRootHidden()}"\n        (contextmenu)="showMenu($event)"\n        [nodeDraggable]="element"\n        [tree]="tree">\n\n        <div class="folding" (click)="tree.switchFoldingType()" [ngClass]="tree.foldingType.cssClass"></div>\n        <div class="node-value"\n          *ngIf="!shouldShowInputForTreeValue()"\n          [class.node-selected]="isSelected"\n          (click)="onNodeSelected($event)">\n            {{tree.value}}<span class="loading-children" *ngIf="tree.childrenAreBeingLoaded()"></span>\n        </div>\n\n        <input type="text" class="node-value"\n           *ngIf="shouldShowInputForTreeValue()"\n           [nodeEditable]="tree.value"\n           (valueChanged)="applyNewValue($event)"/>\n      </div>\n\n      <node-menu *ngIf="isMenuVisible" (menuItemSelected)="onMenuItemSelected($event)"></node-menu>\n\n      <template [ngIf]="tree.isNodeExpanded()">\n        <tree-internal *ngFor="let child of tree.childrenAsync | async" [tree]="child"></tree-internal>\n      </template>\n    </li>\n  </ul>\n  '
                } ]
            } ], TreeInternalComponent.ctorParameters = function() {
                return [ {
                    type: node_menu_service_1.NodeMenuService,
                    decorators: [ {
                        type: core_1.Inject,
                        args: [ node_menu_service_1.NodeMenuService ]
                    } ]
                }, {
                    type: tree_service_1.TreeService,
                    decorators: [ {
                        type: core_1.Inject,
                        args: [ tree_service_1.TreeService ]
                    } ]
                }, {
                    type: core_1.ElementRef,
                    decorators: [ {
                        type: core_1.Inject,
                        args: [ core_1.ElementRef ]
                    } ]
                } ];
            }, TreeInternalComponent.propDecorators = {
                tree: [ {
                    type: core_1.Input
                } ],
                settings: [ {
                    type: core_1.Input
                } ]
            }, TreeInternalComponent;
        })();
        exports.TreeInternalComponent = TreeInternalComponent;
    },
    /***/
    1502: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var core_1 = __webpack_require__(3), tree_component_1 = __webpack_require__(1484), tree_internal_component_1 = __webpack_require__(1501), common_1 = __webpack_require__(19), node_draggable_directive_1 = __webpack_require__(1498), node_draggable_service_1 = __webpack_require__(1473), node_editable_directive_1 = __webpack_require__(1499), node_menu_component_1 = __webpack_require__(1500), node_menu_service_1 = __webpack_require__(1475), tree_service_1 = __webpack_require__(1477), TreeModule = (function() {
            function TreeModule() {}
            return TreeModule.decorators = [ {
                type: core_1.NgModule,
                args: [ {
                    imports: [ common_1.CommonModule ],
                    declarations: [ node_draggable_directive_1.NodeDraggableDirective, tree_component_1.TreeComponent, node_editable_directive_1.NodeEditableDirective, node_menu_component_1.NodeMenuComponent, tree_internal_component_1.TreeInternalComponent ],
                    exports: [ tree_component_1.TreeComponent ],
                    providers: [ node_draggable_service_1.NodeDraggableService, node_menu_service_1.NodeMenuService, tree_service_1.TreeService ]
                } ]
            } ], TreeModule.ctorParameters = function() {
                return [];
            }, TreeModule;
        })();
        exports.TreeModule = TreeModule;
    },
    /***/
    1503: /***/
    function(module, exports) {
        module.exports = ".node-menu{position:relative;width:150px}.node-menu .node-menu-content{width:100%;padding:5px;position:absolute;border:1px solid #bdbdbd;border-radius:5%;box-shadow:0 0 5px #bdbdbd;background-color:#eee;color:#212121;font-family:\"Helvetica Neue\", Helvetica, Arial, sans-serif}.node-menu .node-menu-content li.node-menu-item{list-style:none;padding:3px}.node-menu .node-menu-content .node-menu-item:hover{border-radius:5%;opacity:unset;cursor:pointer;background-color:#bdbdbd;transition:background-color 0.2s ease-out}.node-menu .node-menu-content .node-menu-item .node-menu-item-icon{display:inline-block;width:16px}.node-menu .node-menu-content .node-menu-item .node-menu-item-icon.new-tag:before{content:'\\25CF'}.node-menu .node-menu-content .node-menu-item .node-menu-item-icon.new-folder:before{content:'\\25B6'}.node-menu .node-menu-content .node-menu-item .node-menu-item-icon.rename:before{content:'\\270E'}.node-menu .node-menu-content .node-menu-item .node-menu-item-icon.remove:before{content:'\\2716'}.node-menu .node-menu-content .node-menu-item .node-menu-item-value{margin-left:5px}tree-internal ul{padding:3px 0 3px 25px}tree-internal li{padding:0;margin:0;list-style:none}tree-internal .over-drop-target{border:4px solid #757575;transition:padding 0.2s ease-out;padding:5px;border-radius:5%}tree-internal .tree{box-sizing:border-box;font-family:\"Helvetica Neue\", Helvetica, Arial, sans-serif}tree-internal .tree li{list-style:none;cursor:default}tree-internal .tree li div{display:inline-block;box-sizing:border-box}tree-internal .tree .node-value{display:inline-block;color:#212121}tree-internal .tree .node-value:after{display:block;padding-top:-3px;width:0;height:2px;background-color:#212121;content:'';transition:width 0.3s}tree-internal .tree .node-value:hover:after{width:100%}tree-internal .tree .node-selected:after{width:100%}tree-internal .tree .folding{width:25px;display:inline-block;line-height:1px;padding:0 5px;font-weight:bold}tree-internal .tree .folding.node-collapsed{cursor:pointer}tree-internal .tree .folding.node-collapsed:before{content:'\\25B6';color:#757575}tree-internal .tree .folding.node-expanded{cursor:pointer}tree-internal .tree .folding.node-expanded:before{content:'\\25BC';color:#757575}tree-internal .tree .folding.node-leaf{color:#212121;text-align:center;font-size:0.89em}tree-internal .tree .folding.node-leaf:before{content:'\\25CF';color:#757575}tree-internal ul.rootless{padding:0}tree-internal div.rootless{display:none !important}tree-internal .loading-children:after{content:' loading ...';color:#6a1b9a;font-style:italic;font-size:0.9em;animation-name:loading-children;animation-duration:2s;animation-timing-function:ease-in-out;animation-iteration-count:infinite}@keyframes loading-children{0%{color:#f3e5f5}12.5%{color:#e1bee7}25%{color:#ce93d8}37.5%{color:#ba68c8}50%{color:#ab47bc}62.5%{color:#9c27b0}75%{color:#8e24aa}87.5%{color:#7b1fa2}100%{color:#6a1b9a}}.tree-demo-app{margin:auto;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content}.tree-demo-app .tree-container{float:left;vertical-align:top;width:500px}.tree-title{color:#40a070;font-size:2em}.notice{color:#e91e63;font-size:1.2em;font-style:italic}tree .tree .node-value.node-selected{color:red}\n";
    },
    /***/
    1508: /***/
    function(module, exports) {
        module.exports = '\r\n <h1 md-dialog-title>算法生成</h1>\r\n<div md-dialog-content>\r\n    <div class="row">\r\n        {{data.MapKey}}\r\n    </div>\r\n    <div class="row">\r\n    <md-select (change)="update(data,$event.value)"  placeholder="" [(ngModel)]="data.AlgorithmType">\r\n        <md-option *ngFor="let t of types; let i=index" [value]="i">{{ t }}</md-option>\r\n    </md-select>\r\n    </div>\r\n    <div *ngIf="data.AlgorithmProperties">\r\n    <div  *ngFor="let property of data.AlgorithmProperties">\r\n          {{properties[property.AlgPropertyType]}}\r\n        <div [ngSwitch]="property.ShowStyle">\r\n            <md-select *ngSwitchCase="1" placeholder="" [(ngModel)]="property.Values[0]">\r\n                <md-option *ngFor="let c of variables" [value]="c.VarId">{{ c.ReportCode }}</md-option>\r\n                 <md-option  [value]="">None</md-option>\r\n            </md-select>\r\n             <md-select multiple="true" *ngSwitchCase="0" placeholder="" [(ngModel)]="property.Values">\r\n                <md-option *ngFor="let c of variables" [value]="c.VarId">{{ c.ReportCode }}</md-option>\r\n                <md-option  [value]="">None</md-option>\r\n            </md-select>\r\n            <md-input-container *ngSwitchCase="2">\r\n                <input mdInput placeholder="Number" [(ngModel)]="property.Values[0]">\r\n            </md-input-container>\r\n            \r\n             <md-select *ngSwitchCase="3" placeholder="" [(ngModel)]="property.Values[0]">\r\n                <md-option *ngFor="let c of [\'Year\',\'Month\',\'Day\',\'Week\']" [value]="c">{{ c }}</md-option>\r\n            </md-select>\r\n        \r\n        </div>\r\n    </div>\r\n    </div>\r\n</div>\r\n<div md-dialog-actions>\r\n   <button md-raised-button  (click)="dialogRef.close(data)">生成</button>\r\n</div>';
    },
    /***/
    1509: /***/
    function(module, exports) {
        module.exports = '<div class=\'row\'>\r\n<div class="col-md-6">\r\n        <p class="tree-title">配置component</p>\r\n        <tree\r\n          [tree]="website"\r\n          (nodeRemoved)="onNodeRemoved($event)"\r\n          (nodeRenamed)="onNodeRenamed($event)"\r\n          (nodeSelected)="onNodeSelected($event)"\r\n          (nodeMoved)="onNodeMoved($event)"\r\n          (nodeCreated)="onNodeCreated($event)">\r\n        </tree>\r\n<button md-fab (click)="showTemplate()"><md-icon>add</md-icon></button>\r\n</div>\r\n  <div *ngIf="currentNode" class="col-md-6">\r\n<md-card class="example-card">\r\n  <md-card-header>\r\n    <div md-card-avatar class="example-header-image"></div>\r\n    <md-card-title>配置选项</md-card-title>\r\n  </md-card-header>\r\n  <md-card-content>\r\n      <form *ngIf="currentNode.node.component ">\r\n           <div class="row">\r\n            <md-checkbox name="componentShoe" [(ngModel)]="currentNode.node.component.Show">   是否显示</md-checkbox>\r\n           </div>\r\n        <div class="row">\r\n             <md-select class="col-xl-3 col-xlg-3"  placeholder="Type" name="componentType"  [(ngModel)]="currentNode.node.component.Type">\r\n                <md-option *ngFor="let c of componentTypes;let i = index" [value]="c">{{ c }}</md-option>\r\n            </md-select>\r\n        </div>\r\n        <div class="row">\r\n         <md-input-container class="col-xl-6 col-xlg-6" >\r\n            <input mdInput placeholder="标题："   name="componentText" [(ngModel)]="currentNode.node.component.ShowText">\r\n        </md-input-container>\r\n  \r\n        </div>\r\n        <div class="row">\r\n             <md-input-container class="col-xl-11 col-xlg-11" >\r\n            <input mdInput placeholder="Style：" name="componentStyle" [(ngModel)]="currentNode.node.component.Style">\r\n           </md-input-container>\r\n        </div>\r\n        <div class="form-group">\r\n          <label for="componentSchema">Schema:</label>\r\n          <textarea [style.height.px]="600"  (ngModelChange)="schemaChange($event)" [ngModel]="currentNode.node.component.Schema" class="form-control" name="componentSchema" id="componentSchema" placeholder="schema"></textarea>\r\n          <div *ngIf="currentNode.node.component.algorithms">\r\n          <button class="btn btn-primary" (click)="addTemp(currentNode.node.component.Schema)" md-raised-button>添加模板</button>\r\n          <div *ngFor="let a of currentNode.node.component.algorithms" >\r\n\r\n          <button (click)="showAlgorithm(a)" md-raised-button>{{a.MapKey}}</button>\r\n           <a md-mini-fab (click)="rmAlgorithm(a)"><md-icon>close</md-icon></a>\r\n          </div>\r\n          </div>\r\n        </div>\r\n         <div class="form-group">\r\n           <md-input-container  name="componentIndex" >\r\n            <input mdInput type="number" placeholder="Index:" name="componentIndex" [(ngModel)]="currentNode.node.component.Index">\r\n           </md-input-container>\r\n        </div>\r\n      </form>\r\n  </md-card-content>\r\n  <md-card-actions>\r\n    <button (click)="save(currentNode.node.component)" md-raised-button>保存</button>\r\n  </md-card-actions>\r\n</md-card>\r\n\r\n\r\n\r\n\r\n';
    }
});