sap.ui.define([
    "sap/ui/core/LocaleData",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (LocaleData,Controller,JSONModel, MessageBox,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("project1.controller.Crud", {
            _data : {
                "dtValue" : new Date()
            },
    
            onInit : function () {
                var oLocale = sap.ui.getCore().getConfiguration().getLocale(),
                    oLocaleData = new LocaleData(oLocale),
                    oModel;
    
                this._data["dtPattern"] = oLocaleData.getCombinedDateTimePattern("medium", "medium");
                oModel = new JSONModel(this._data);
                this.getView().setModel(oModel);
            },
            onSearch: function () {
                var oModel = this.getView().getModel("precios")
                var oDataFilter = new Array()
                var preciosList = this.byId("preciosList")

                oDataFilter.push(
                    new Filter("FechaVigencia", FilterOperator.EQ, this.getView().byId("fecha").getValue())
                )
                let oTemplate = new sap.m.StandardListItem({
                    title:"{Material}",
                    description:"{Clave}"
                })

                preciosList.setModel(oModel)
                preciosList.bindAggregation('items', {
                    path: "/PreciosSet",
                    filters: oDataFilter,
                    template: oTemplate
                 })

            },
        })
    })
