sap.ui.define([
	"sap/ui/core/format/NumberFormat"
], function (NumberFormat) {
	"use strict";
	return {
		stringToFloat: function (amount, currency) {
			var oCurrencyFormat = NumberFormat.getCurrencyInstance({ "currencyCode": false });
			//Move negative sign to left and cast to float
			var fAmount = parseFloat(amount.replace(/([\d\.]*)-/, "-$1"));
			return oCurrencyFormat.format(fAmount);
		},
		statusText: function (sStatus) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (sStatus) {
				case "PAGADO":
					return resourceBundle.getText("invoiceStatusA");
				case "B":
					return resourceBundle.getText("invoiceStatusB");
				case "C":
					return resourceBundle.getText("invoiceStatusC");
				default:
					return sStatus;
			}
		}
	}
})