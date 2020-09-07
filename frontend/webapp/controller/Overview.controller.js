sap.ui.define([
	"com/prello/controller/BaseController",
	"com/prello/model/formatter",
	"sap/ui/core/Fragment"
], function(BaseController, formatter, Fragment) {
	"use strict";

	return BaseController.extend("com.prello.controller.Overview", {

		formatter: formatter,

		onInit: function () {
			this.getView().byId("SPC1").setStartDate(new Date());
		},

		handleAppointmentSelect: function (oEvent) {
			var oAppointment = oEvent.getParameter("appointment"),
				oStartDate,
				oEndDate,
				oTrimmedStartDate,
				oTrimmedEndDate;

			if (oAppointment === undefined) {
				return;
			}

			oStartDate = oAppointment.getStartDate();
			oEndDate = oAppointment.getEndDate();
			oTrimmedStartDate = new Date(oStartDate);
			oTrimmedEndDate = new Date(oEndDate);

			if (!oAppointment.getSelected()) {
				this._oDetailsPopover.close();
				return;
			}

			this._setHoursToZero(oTrimmedStartDate);
			this._setHoursToZero(oTrimmedEndDate);

			if (!this._oDetailsPopover) {
				Fragment.load({
					id: "popoverFrag",
					name: "com.prello.fragments.AppointmentDetails",
					controller: this
				})
					.then(function(oPopoverContent){
						this._oDetailsPopover = oPopoverContent;
						this._oDetailsPopover.setBindingContext(oAppointment.getBindingContext());
						this.getView().addDependent(this._oDetailsPopover);
						this._oDetailsPopover.openBy(oAppointment);
					}.bind(this));
			} else {
				this._oDetailsPopover.setBindingContext(oAppointment.getBindingContext());
				this._oDetailsPopover.openBy(oAppointment);
			}
		}
	});
});