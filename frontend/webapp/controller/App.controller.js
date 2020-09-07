sap.ui.define([
	"com/prello/controller/BaseController",
	"com/prello/model/formatter"
], function(BaseController, formatter) {
	"use strict";

	return BaseController.extend("com.prello.controller.App", {

		formatter: formatter,

		onInit: function () {

		}
	});
});