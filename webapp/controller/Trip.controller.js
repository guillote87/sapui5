sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    'sap/m/MessageToast',
     "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, MessageToast,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("project1.controller.Trip", {
            onInit: function () {
                           
            },
            createData: function () {
                var ID = this.getView().byId("Name").getValue();
                var Name = this.getView().byId("Description").getValue();
                var data = {
                    ID: ID,
                    Name: Name
                };
          
                var odataModel = this.getView().getModel("testing");
           
                odataModel.create("/Categories", data, {
                    success: function (data, response) {
                        MessageBox.success("Data successfully created");
                    },
                    error: function (error) {
                        MessageBox.error("Error while creating the data");
                    }
                });
            },
            updateData: function () {
                var list = this.getView().byId("List");
                var selItem = list.getSelectedItem();
                var title = selItem.getTitle();
                var description = selItem.getDescription();
                var Name = this.getView().byId("Description").getValue();
                var payload = {
                    ID: parseInt(title),
                    Name: Name
                };

                var path = "/Categories(" + title + ")";
                var odataModel = this.getView().getModel("testing");
                // @ts-ignore
                odataModel.update(path, payload, {
                    success: function (data, response) {
                        MessageBox.success("Successfully Updated");
                    },
                    error: function (error) {
                        MessageBox.error("Error while updating the data");
                    }
                });
            },
            deleteData: function () {
                var list = this.getView().byId("List");
                var selItem = list.getSelectedItem();
                var title = selItem.getTitle();
                var path = "/Categories(" + title + ")"; ///Categories(3);
                var odataModel = this.getView().getModel("testing");
                odataModel.remove(path, {
                    success: function (data, response) {
                        MessageBox.success("Deleted data");
                    },
                    error: function (error) {
                        MessageBox.error("Deletion failed");
                    }
                })
            },
            onPress: function (oEvent) {
               
                let oCtx = oEvent.getSource().getBindingContext();
               
                this.oView.byId("Name").setValue(oCtx.getProperty("Name"))
                this.oView.byId("Description").setValue(oCtx.getProperty("Description"))
            
            }
        })
    })
