sap.ui.define([], function () {
	"use strict";
	return {
		typeFormatter: function (sValue) {
			switch (sValue) {
				case "Type01":
					return "Meeting";
				case "Type02":
					return "Meeting Remote";
				case "Type05":
					return "Deadline";
				case "Type08":
					return "Projekt";
				default:
					return "Unbekannt";
			}
		},

		date: function (sValue) {
			var iDate = new Date(sValue);

			return iDate.toLocaleString();
		}
	};
});