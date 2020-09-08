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
					text: "Ello I bims a Beschreibung",
					type: CalendarDayType.Type01,
					startDate: new Date("2020", "8", "9", "5", "0"),
					endDate: new Date("2020", "8", "9", "6", "0")
				}]
			}
			var oModel = new JSONModel(data);
			oModel.setDefaultBindingMode("TwoWay");
			return oModel;
		},

		createSupportedMeetingTypes: function () {
			var data = {
				supportedAppointmentItems: [
					{
						type: "Type01",
						text: "Meeting"
					},
					{
						type: "Type02",
						text: "Meeting Remote"
					},
					{
						type: "Type05",
						text: "Deadline"
					},
					{
						type: "Type08",
						text: "Projekt"
					}
				]
			};

			var oModel = new JSONModel(data);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}
	};
});