sap.ui.define([
	"com/prello/controller/BaseController",
	"../model/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(BaseController, formatter, JSONModel, MessageBox) {
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
			// establish DB connection
			var xhr = new XMLHttpRequest();
			var self = this;
			xhr.open('POST', "http://localhost:4000/login");
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF8");
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			xhr.send(JSON.stringify(data));
			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					var response = this.response;
					response = JSON.parse(response);

					// set User model
					self.getOwnerComponent().setModel(new JSONModel(response), "user");

					// Reset Inputfields
					self.byId("iUsername").setValue("");
					self.byId("iPassword").setValue("");

					self.getAppointments();

					self.getRouter().navTo("overview");
				}
				if (this.readyState == 4 && this.status == 401) {
					self.byId("iPassword").setValue("");

					MessageBox.error("Benutzername oder Password ist falsch!");
				}
			}	
		}
	});
});