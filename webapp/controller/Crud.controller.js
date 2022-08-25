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
            createData: function () {
                var that = this;
                this.getOwnerComponent().getModel("material")
                var odataModel = new sap.ui.model.odata.v2.ODataModel(material);
                odataModel.read("/MaterialesSet", {
                    success: function (oData, oResponse) {
                        MessageBox.success("Success");
                        console.log(oData)
                    },
                    error: function (oError) {
                        MessageBox.error("Error");
                    }
                });
                this.getView().setModel(odataModel);

            }, updateData: function () {
                var list = this.getView().byId("list");
                var selItem = list.getSelectedItem();
                var title = selItem.getTitle();
                var description = selItem.getDescription();
                var Name = this.getView().byId("nameinput").getValue();
                var payload = {
                    ID: parseInt(title),
                    Name: Name
                };

                var path = "/Categories(" + title + ")";
                var odataModel = this.getView().getModel();
                // @ts-ignore
                odataModel.update(path, payload, {
                    success: function (data, response) {
                        MessageBox.success("Successfully Updated");
                    },
                    error: function (error) {
                        MessageBox.error("Error while updating the data");
                    }
                });
            }, createData: function () {
                var ID = this.getView().byId("idinput").getValue();
                var Name = this.getView().byId("nameinput").getValue();
                var data = {
                    ID: parseInt(ID),
                    Name: Name
                };
                var odataModel = this.getView().getModel();
                odataModel.create("/Categories", data, {
                    success: function (data, response) {
                        MessageBox.success("Data successfully created");
                    },
                    error: function (error) {
                        MessageBox.error("Error while creating the data");
                    }
                });
            },

            deleteData: function () {
                var list = this.getView().byId("list");
                var selItem = list.getSelectedItem();
                var title = selItem.getTitle();
                var path = "/Categories(" + title + ")"; ///Categories(3);
                var odataModel = this.getView().getModel();
                odataModel.remove(path, {
                    success: function (data, response) {
                        MessageBox.success("Deleted data");
                    },
                    error: function (error) {
                        MessageBox.error("Deletion failed");
                    }
                })
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
