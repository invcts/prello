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
				}).then(function(oPopoverContent){
					this._oDetailsPopover = oPopoverContent;
					this._oDetailsPopover.setBindingContext(oAppointment.getBindingContext());
					this.getView().addDependent(this._oDetailsPopover);
					this._oDetailsPopover.openBy(oAppointment);
				}.bind(this));
			} else {
				this._oDetailsPopover.setBindingContext(oAppointment.getBindingContext());
				this._oDetailsPopover.openBy(oAppointment);
			}
		},

		handleEditButton: function () {
			this._oDetailsPopover.close();
			this.sPath = this._oDetailsPopover.getBindingContext().getPath();
			this._arrangeDialogFragment("Termin bearbeiten");
		},

		_arrangeDialogFragment: function (sTitle) {
			if (!this._oNewAppointmentDialog) {
				Fragment.load({
					id: "dialogFrag",
					name: "com.prello.fragments.AppointmentModify",
					controller: this
				})
					.then(function(oDialog){
						this._oNewAppointmentDialog = oDialog;
						this.getView().addDependent(this._oNewAppointmentDialog);
						this._arrangeDialog(sTitle);
					}.bind(this));
			} else {
				this._arrangeDialog(sTitle);
			}
		},

		_arrangeDialog: function (sTitle) {
			this._setValuesToDialogContent();
			this._oNewAppointmentDialog.setTitle(sTitle);
			this._oNewAppointmentDialog.open();
		},

		_setValuesToDialogContent: function () {
			var sStartDatePickerID = "DTPStartDate",
				sEndDatePickerID = "DTPEndDate",
				oTitleControl = Fragment.byId("dialogFrag", "appTitle"),
				oTextControl = Fragment.byId("dialogFrag", "moreInfo"),
				oTypeControl = Fragment.byId("dialogFrag", "appType"),
				oStartDateControl = Fragment.byId("dialogFrag", sStartDatePickerID),
				oEndDateControl = Fragment.byId("dialogFrag", sEndDatePickerID),
				oEmptyError = {errorState:false, errorMessage: ""},
				oContext,
				oContextObject,
				oSPCStartDate,
				sTitle,
				sText,
				oStartDate,
				oEndDate,
				sType;


			if (this.sPath) {
				oContext = this._oDetailsPopover.getBindingContext();
				oContextObject = oContext.getObject();
				sTitle = oContextObject.title;
				sText = oContextObject.text;
				oStartDate = oContextObject.startDate;
				oEndDate = oContextObject.endDate;
				sType = oContextObject.type;
			} else {
				sTitle = "";
				sText = "";
				if (this._oChosenDayData) {
					oStartDate = this._oChosenDayData.start;
					oEndDate = this._oChosenDayData.end;

					delete this._oChosenDayData;
				} else {
					oSPCStartDate = this.getView().byId("SPC1").getStartDate();
					oStartDate = new Date(oSPCStartDate);
					oStartDate.setHours(this._getDefaultAppointmentStartHour());
					oEndDate = new Date(oSPCStartDate);
					oEndDate.setHours(this._getDefaultAppointmentEndHour());
				}
				sType = "Type01";
			}

			oTitleControl.setValue(sTitle);
			oTextControl.setValue(sText);
			oStartDateControl.setDateValue(oStartDate);
			oEndDateControl.setDateValue(oEndDate);
			oTypeControl.setSelectedKey(sType);
			this._setDateValueState(oStartDateControl, oEmptyError);
			this._setDateValueState(oEndDateControl, oEmptyError);
			this._updateButtonEnabledState(oStartDateControl, oEndDateControl, this._oNewAppointmentDialog.getBeginButton());
		},

		_setDateValueState: function(oPicker, oErrorState) {
			if (oErrorState.errorState) {
				oPicker.setValueState("Error");
				oPicker.setValueStateText(oErrorState.errorMessage);
			} else {
				oPicker.setValueState("None");
			}
		},

		_updateButtonEnabledState: function (oDateTimePickerStart, oDateTimePickerEnd, oButton) {
			var bEnabled = oDateTimePickerStart.getValueState() !== "Error"
				&& oDateTimePickerStart.getValue() !== ""
				&& oDateTimePickerEnd.getValue() !== ""
				&& oDateTimePickerEnd.getValueState() !== "Error";

			oButton.setEnabled(bEnabled);
		},

		handleDialogCancelButton: function () {
			this.sPath = null;
			this._oNewAppointmentDialog.close();
		},

		handleDateTimePickerChange: function(oEvent) {
			var oDateTimePickerStart = Fragment.byId("dialogFrag", "DTPStartDate"),
				oDateTimePickerEnd = Fragment.byId("dialogFrag", "DTPEndDate"),
				oStartDate = oDateTimePickerStart.getDateValue(),
				oEndDate = oDateTimePickerEnd.getDateValue(),
				oErrorState = {errorState: false, errorMessage: ""};

			if (!oStartDate){
				oErrorState.errorState = true;
				oErrorState.errorMessage = "Bitte Datum auswählen!";
				this._setDateValueState(oDateTimePickerStart, oErrorState);
			} else if (!oEndDate){
				oErrorState.errorState = true;
				oErrorState.errorMessage = "Bitte Datum auswählen!";
				this._setDateValueState(oDateTimePickerEnd, oErrorState);
			} else if (!oEvent.getParameter("valid")){
				oErrorState.errorState = true;
				oErrorState.errorMessage = "Ungültiges Datum!";
				if (oEvent.oSource.sId === oDateTimePickerStart.sId){
					this._setDateValueState(oDateTimePickerStart, oErrorState);
				} else {
					this._setDateValueState(oDateTimePickerEnd, oErrorState);
				}
			} else if (oStartDate && oEndDate && (oEndDate.getTime() <= oStartDate.getTime())){
				oErrorState.errorState = true;
				oErrorState.errorMessage = "Begindatum muss vor dem Enddatum liegen!";
				this._setDateValueState(oDateTimePickerStart, oErrorState);
				this._setDateValueState(oDateTimePickerEnd, oErrorState);
			} else {
				this._setDateValueState(oDateTimePickerStart, oErrorState);
				this._setDateValueState(oDateTimePickerEnd, oErrorState);
			}

			this._updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, this._oNewAppointmentDialog.getBeginButton());
		},

		handleOpenLegend: function (oEvent) {
			var oSource = oEvent.getSource();

			if (!this._oLegendPopover) {
				Fragment.load({
					id: "LegendFrag",
					name: "com.prello.fragments.AppointmentLegend",
					controller: this
				}).then(function(oPopoverContent){
					this._oLegendPopover = oPopoverContent;
					this.getView().addDependent(this._oLegendPopover);
					this._oLegendPopover.openBy(oSource);
				}.bind(this));
			} else if (this._oLegendPopover.isOpen()) {
				this._oLegendPopover.close();
			} else {
				this._oLegendPopover.openBy(oSource);
			}
		},

		handleAppointmentCreate: function () {
			this._createInitialDialogValues(this.getView().byId("SPC1").getStartDate());
		},

		_createInitialDialogValues: function (oDate) {
			var oStartDate = new Date(oDate),
				oEndDate = new Date(oStartDate);

			oStartDate.setHours(this._getDefaultAppointmentStartHour());
			oEndDate.setHours(this._getDefaultAppointmentEndHour());
			oStartDate.setMinutes(0);
			oEndDate.setMinutes(0);
			oStartDate.setSeconds(0);
			oEndDate.setSeconds(0);
			this._oChosenDayData = {start: oStartDate, end: oEndDate };
			this.sPath = null;

			this._arrangeDialogFragment("Termin anlegen");
		},

		_getDefaultAppointmentStartHour: function() {
			return 9;
		},

		_getDefaultAppointmentEndHour: function() {
			return 10;
		},

		handleDialogOkButton: function () {
			var sStartDate = "DTPStartDate",
				sEndDate = "DTPEndDate",
				sTitle = Fragment.byId("dialogFrag", "appTitle").getValue(),
				sText = Fragment.byId("dialogFrag", "moreInfo").getValue(),
				sType = Fragment.byId("dialogFrag", "appType").getSelectedItem().getKey(),
				oStartDate = Fragment.byId("dialogFrag", sStartDate).getDateValue(),
				oEndDate = Fragment.byId("dialogFrag", sEndDate).getDateValue(),
				oModel = this.getView().getModel(),
				sAppointmentPath,
				oData;

			if (Fragment.byId("dialogFrag", sStartDate).getValueState() !== "Error"
				&& Fragment.byId("dialogFrag", sEndDate).getValueState() !== "Error") {
				
				// Build dataload
				oData = {
					title: sTitle,
					description: sText,
					type: sType,
					startDate: oStartDate,
					endDate: oEndDate
				}

				console.log(oData);

				if (this.sPath) {
					sAppointmentPath = this.sPath;
					oModel.setProperty(sAppointmentPath + "/title", sTitle);
					oModel.setProperty(sAppointmentPath + "/text", sText);
					oModel.setProperty(sAppointmentPath + "/type", sType);
					oModel.setProperty(sAppointmentPath + "/startDate", oStartDate);
					oModel.setProperty(sAppointmentPath + "/endDate", oEndDate);
				} else {
					oModel.getData().appointments.push({
						title: sTitle,
						text: sText,
						type: sType,
						startDate: oStartDate,
						endDate: oEndDate
					});
				}

				oModel.updateBindings();

				this._oNewAppointmentDialog.close();
			}
		},

		handlePopoverDeleteButton: function () {
			var oModel = this.getView().getModel(),
				oAppointments = oModel.getData().appointments,
				oAppointment = this._oDetailsPopover._getBindingContext().getObject();

			this._oDetailsPopover.close();

			oAppointments.splice(oAppointments.indexOf(oAppointment), 1);
			oModel.updateBindings();
		}
	});
});