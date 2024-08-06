var day_input = 0;
var month_input = 0;
var year_input = 0;
var day_input_el = document.getElementById("day");
var month_input_el = document.getElementById("month");
var year_input_el = document.getElementById("year");
var day_result = document.getElementById("days-result");
var month_result = document.getElementById("months-result");
var year_result = document.getElementById("years-result");
var calculate_btn = document.getElementById("submit-btn");
var day_error = document.getElementById("day-error");
var month_error = document.getElementById("month-error");
var year_error = document.getElementById("year-error");
var error_1 = "This field is required";
var error_day = "Must be a valid day";
var error_month = "Must be a valid month";
var error_year = "Must be in the past";
var present_date = new Date(); // December 31, 2024
var user_date = new Date();
var number_of_days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Event Handlers
day_input_el.addEventListener("input", function () {
    day_input = parseInt(day_input_el.value);
    updateUserDate();
});
month_input_el.addEventListener("input", function () {
    month_input = parseInt(month_input_el.value) - 1; // Months are 0-indexed
    updateUserDate();
});
year_input_el.addEventListener("input", function () {
    year_input = parseInt(year_input_el.value);
    updateUserDate();
});
// Update user_date only after all inputs are validated
function updateUserDate() {
    if (yearChecker() && monthChecker() && dayChecker()) {
        user_date.setFullYear(year_input);
        user_date.setMonth(month_input);
        user_date.setDate(day_input);
    }
}
// Functions
function yearChecker() {
    var temp = true;
    if (!Number.isInteger(year_input)) {
        temp = false;
    }
    if (year_input < 1) {
        temp = false;
    }
    if (year_input > present_date.getFullYear()) {
        temp = false;
    }
    return temp;
}
function monthChecker() {
    var temp = true;
    if (month_input < 0 || month_input > 11) {
        temp = false;
    }
    return temp;
}
function dayChecker() {
    var temp = true;
    var leap_year = false;
    // Check for leap year
    if ((year_input % 4 === 0 && year_input % 100 !== 0) || year_input % 400 === 0) {
        number_of_days_in_months[1] = 29;
    }
    else {
        number_of_days_in_months[1] = 28;
    }
    if (day_input < 1 || day_input > number_of_days_in_months[month_input]) {
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
    else if (dayChecker() == false) {
        day_error.style.display = "block";
        day_error.innerText = error_day;
        flag = false;
    }
    else {
        day_error.style.display = "none";
    }
    if (month_input_el.value == "" || month_input_el.value == "0") {
        month_error.style.display = "block";
        month_error.innerText = error_1;
        flag = false;
    }
    else if (monthChecker() == false) {
        month_error.style.display = "block";
        month_error.innerText = error_month;
        flag = false;
    }
    else {
        month_error.style.display = "none";
    }
    if (year_input_el.value == "" || year_input_el.value == "0") {
        year_error.style.display = "block";
        year_error.innerText = error_1;
        flag = false;
    }
    else if (yearChecker() == false) {
        year_error.style.display = "block";
        year_error.innerText = error_year;
        flag = false;
    }
    else {
        year_error.style.display = "none";
    }
    return flag;
}
function calculateAge(birthDate, currentDate) {
    var years = currentDate.getFullYear() - birthDate.getFullYear();
    var months = currentDate.getMonth() - birthDate.getMonth();
    var days = currentDate.getDate() - birthDate.getDate();
    // Adjust days and months if necessary
    if (days < 0) {
        months--;
        days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    return { years: years, months: months, days: days };
}
function displayAge(age) {
    year_result.innerText = age.years.toString();
    month_result.innerText = age.months.toString();
    day_result.innerText = age.days.toString();
}
calculate_btn.addEventListener("click", function () {
    if (errorHandler() == true) {
        var age = calculateAge(user_date, present_date);
        displayAge(age);
        day_error.style.display = "none";
        month_error.style.display = "none";
        year_error.style.display = "none";
    }
});
