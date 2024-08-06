var day_input = 0;
var month_input = 0;
var year_input = 0;
var day_input_el = document.getElementById("day");
var month_input_el = document.getElementById("month");
var year_input_el = document.getElementById("year");
var day_result = document.getElementById("days-result");
var month_result = document.getElementById("month-result");
var year_result = document.getElementById("years-result");
var calculate_btn = document.getElementById("submit-btn");
var day_error = document.getElementById("day-error");
var month_error = document.getElementById("month-error");
var year_error = document.getElementById("year-error");
var error_1 = "This field is required";
var error_day = "Must be a valid day";
var error_month = "Must be a valid day";
var error_year = "Must be in the past";
var present_year = 2024;
// Event Handlers
day_input_el.addEventListener("input", function () {
    day_input = parseInt(day_input_el.value);
});
month_input_el.addEventListener("input", function () {
    month_input = parseInt(month_input_el.value);
});
year_input_el.addEventListener("input", function () {
    year_input = parseInt(year_input_el.value);
});
// Functions
function yearChecker() {
    var temp = true;
    if (!Number.isInteger(year_input)) {
        temp = false;
    }
    if (year_input < 1) {
        temp = false;
    }
    if (year_input > present_year) {
        temp = false;
    }
    return temp;
}
function monthChecker() {
    var temp = true;
    if (!Number.isInteger(month_input) || month_input < 1 || month_input > 12) {
        temp = false;
    }
    return temp;
}
function dayChecker() {
    var number_of_days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var temp = true;
    var leap_year = false;
    // Check for leap year
    if ((year_input % 4 === 0 && year_input % 100 !== 0) || (year_input % 400 === 0)) {
        number_of_days_in_months[1] = 29;
    }
    if (number_of_days_in_months[month_input - 1] < day_input || day_input < 1) {
        temp = false;
    }
    return temp;
}
function errorHandler() {
    var flag = true;
    if (day_input_el.value == "" || day_input_el.value == "0") {
        day_error.style.display = "block";
        day_error.innerText = error_1;
        flag = false;
    }
    if (month_input_el.value == "" || month_input_el.value == "0") {
        month_error.style.display = "block";
        month_error.innerText = error_1;
        flag = false;
    }
    if (year_input_el.value == "" || year_input_el.value == "0") {
        year_error.style.display = "block";
        year_error.innerText = error_1;
        flag = false;
    }
    if (yearChecker() == false) {
        year_error.style.display = "block";
        year_error.innerText = error_year;
        flag = false;
    }
    if (monthChecker() == false) {
        month_error.style.display = "block";
        month_error.innerText = error_month;
        flag = false;
    }
    if (dayChecker() == false) {
        day_error.style.display = "block";
        day_error.innerText = error_day;
        flag = false;
    }
    return flag;
}
function calculateAge() {
    year_result.innerText = (year_input - present_year).toString();
    month_result.innerText = (month_input - 12).toString();
    day_result.innerText = (day_input - 31).toString();
}
calculate_btn.addEventListener("click", function () {
    if (errorHandler() == true) {
        calculateAge();
    }
});
