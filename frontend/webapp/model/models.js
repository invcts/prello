sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/unified/library"
], function(JSONModel, Device, unifiedLibrary) {
	"use strict";

	var CalendarDayType = unifiedLibrary.CalendarDayType;

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createMockData: function () {
			var data = {
				appointments: [{
					title: "Testermin 1",
					text: "Junge gar kein Bock mehr lul",
					type: CalendarDayType.Type01,
					startDate: new Date("2020", "8", "9", "5", "0"),
					endDate: new Date("2020", "8", "9", "6", "0")
				}],
				startDate: new Date()
			}
			var oModel = new JSONModel(data);
			oModel.setDefaultBindingMode("TwoWay");
			return oModel;
		}
	};
});