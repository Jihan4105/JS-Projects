const rangepickerDOM = document.getElementById("range-input-box")
const rangepicker = new DateRangePicker(rangepickerDOM, {
  format: "yyyy-mm-dd",
  maxDate: "2200-12-31",
  minDate: "1990-01-01"
}); 