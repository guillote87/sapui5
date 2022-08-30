sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast',
    'sap/m/SearchField',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "project1/utils/formatter",
    "sap/ui/core/Fragment",
	"sap/ui/model/Sorter",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, SearchField, Filter, FilterOperator, JSONModel,Formatter,Fragment,Sorter) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            formatter: Formatter,
           
            onInit: function () {

            },
            onSearch: function () {
                var oModel = this.getView().getModel("ctacte")
                var oDataFilter = new Array()
                var salesOrderTable = this.byId("idProductsTable")

                oDataFilter.push(
                    new Filter("FechaVigencia", FilterOperator.EQ, this.getView().byId("idsap").getValue())
                )
                oDataFilter.push(
                    new Filter("I_TIPO_LISTADO", FilterOperator.EQ, this.getView().byId("idlistado").getValue())
                )


                let queryFilter = new Array(
                    new Filter({
                        filters: oDataFilter,
                        and: true
                    })
                )
                let oTemplate = new sap.m.ColumnListItem({
                    cells: [new sap.m.Text({
                        text: "{DOC_COMP}"
                    }), [new sap.m.Text({
                        text: "{FECHA_DOC}"
                    })], [new sap.m.Text({
                        text: "{CLIENTE}"
                    })], [new sap.m.Text({
                        text: "{NOMBRE}"
                    })], [new sap.m.Text({
                        text: "{ESTADO_DOCUMENTO}"
                    })]
                    ]
                })

                salesOrderTable.setModel(oModel)
                salesOrderTable.bindAggregation('items', {
                    path: "material/MaterialesSet",
                    filters: queryFilter,
                    template: oTemplate
                })

            },
            onPress: function () {
                var that = this
               
                var oModel = this.oView.getModel("ctacte")

                var oDataFilter = new Array()
               
                oDataFilter.push(
                    new Filter("ID_SAP", FilterOperator.EQ, this.getView().byId("idsap").getValue())
                )
                oDataFilter.push(
                    new Filter("I_TIPO_LISTADO", FilterOperator.EQ, this.getView().byId("idlistado").getValue())
                )

                let queryFilter = new Array(
                    new Filter({
                        filters: oDataFilter,
                        and: true
                    })
                )


                oModel.read("/ctascorrientesSet", {
                    filters: queryFilter,
                    success: function (data) {
                        MessageToast.show("Leyendo datos")
                        console.log(data.results)
                      
                        that.oView.setModel(new JSONModel(data.results), "datosVarios")
                        
                    },
                    error: function () {
                        MessageToast.show("No hay datos")
                    }
                })
           
            },
            onCrud: function(oEvent){
                MessageToast.show("Crud")
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Crud");
            },
             onTrip: function(oEvent){
                MessageToast.show("Trip")
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Trip");
            },

            handleLink: function (oEvent) {
                sap.m.URLHelper.redirect(oEvent.getSource().data("link"), true);
            },
            handleSortButtonPressed: function () {
                this.createViewSettingsDialog("SortDialog").open();
            },
            handleSortDialogConfirm: function (oEvent) {
                var oTable = this.byId("table2"),
                    mParams = oEvent.getParameters(),
                    oBinding = oTable.getBinding("items"),
                    sPath,
                    bDescending,
                    aSorters = [];
    
                sPath = mParams.sortItem.getKey();
                bDescending = mParams.sortDescending;
                aSorters.push(new Sorter(sPath, bDescending));
    
                // apply the selected sort and group settings
                oBinding.sort(aSorters);
            },
            createViewSettingsDialog: function (sDialogId) {
                var oView = this.getView();
    
                // Create dialog lazily
                if (!this.byId(sDialogId)) {
                    // load asynchronous XML fragment
                    Fragment.load({
                        id: oView.getId(),
                        name: `project1.fragments.${ sDialogId }`,
                        controller: this
                    }).then(function (oDialog) {
                        // connect dialog to the root view of this component (models, lifecycle)
                        oView.addDependent(oDialog);
                    });
                }
                return this.byId(sDialogId);
            }
        });
    });

