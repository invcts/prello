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
			console.log(this.genMD5("haha"));
			console.log(this.getModel());

			this.getRouter().navTo("overview");
		}
	});
});