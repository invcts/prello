sap.ui.define([
	"com/prello/controller/BaseController",
	"../model/formatter"
], function(BaseController, formatter) {
	"use strict";

	return BaseController.extend("com.prello.controller.App", {

		formatter: formatter,

		onInit: function () {

		},

		onLogin: function () {
			var sUsername = this.byId("iUsername").getValue().trim();
			var sPassword = this.genMD5(this.byId("iPassword").getValue());
			var data = {
				username: sUsername,
				password: sPassword
			};

			console.log(data);
			
			console.log(this.getModel());

			// Reset Inputfields
			this.byId("iUsername").setValue("");
			this.byId("iPassword").setValue("");

			this.getRouter().navTo("overview");
		}
	});
});