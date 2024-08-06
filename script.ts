let day_input: number = 0;
let month_input: number = 0;
let year_input: number = 0;
let day_input_el: HTMLInputElement = document.getElementById("day") as HTMLInputElement;
let month_input_el: HTMLInputElement = document.getElementById("month") as HTMLInputElement;
let year_input_el: HTMLInputElement = document.getElementById("year") as HTMLInputElement;
let day_result: HTMLSpanElement = document.getElementById("days-result");
let month_result: HTMLSpanElement = document.getElementById("months-result");
let year_result: HTMLSpanElement = document.getElementById("years-result");
let calculate_btn: HTMLButtonElement = document.getElementById("submit-btn") as HTMLButtonElement;
let day_error: HTMLSpanElement = document.getElementById("day-error") as HTMLSpanElement;
let month_error: HTMLSpanElement = document.getElementById("month-error") as HTMLSpanElement;
let year_error: HTMLSpanElement = document.getElementById("year-error") as HTMLSpanElement;
let error_1: string = "This field is required";
let error_day: string = "Must be a valid day";
let error_month: string = "Must be a valid month";
let error_year: string = "Must be in the past";
let present_date = new Date(); // December 31, 2024
let user_date = new Date();
let number_of_days_in_months: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Event Handlers
day_input_el.addEventListener("input", () => {
  day_input = parseInt(day_input_el.value);
  updateUserDate();
});

month_input_el.addEventListener("input", () => {
  month_input = parseInt(month_input_el.value) - 1; // Months are 0-indexed
  updateUserDate();
});

year_input_el.addEventListener("input", () => {
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
  let temp: boolean = true;
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
  let temp: boolean = true;
  if (month_input < 0 || month_input > 11) {
    temp = false;
  }
  return temp;
}

function dayChecker() {
  let temp: boolean = true;
  let leap_year: boolean = false;
  // Check for leap year
  if ((year_input % 4 === 0 && year_input % 100 !== 0) || year_input % 400 === 0) {
    number_of_days_in_months[1] = 29;
  } else {
    number_of_days_in_months[1] = 28;
  }

  if (day_input < 1 || day_input > number_of_days_in_months[month_input]) {
    temp = false;
  }
  return temp;
}

function errorHandler() {
  let flag: boolean = true;
  if (day_input_el.value == "" || day_input_el.value == "0") {
    day_error.style.display = "block";
    day_error.innerText = error_1;
    flag = false;
  } else if (dayChecker() == false) {
    day_error.style.display = "block";
    day_error.innerText = error_day;
    flag = false;
  } else {
    day_error.style.display = "none";
  }
  if (month_input_el.value == "" || month_input_el.value == "0") {
    month_error.style.display = "block";
    month_error.innerText = error_1;
    flag = false;
  } else if (monthChecker() == false) {
    month_error.style.display = "block";
    month_error.innerText = error_month;
    flag = false;
  } else {
    month_error.style.display = "none";
  }
  if (year_input_el.value == "" || year_input_el.value == "0") {
    year_error.style.display = "block";
    year_error.innerText = error_1;
    flag = false;
  } else if (yearChecker() == false) {
    year_error.style.display = "block";
    year_error.innerText = error_year;
    flag = false;
  } else {
    year_error.style.display = "none";
  }
  return flag;
}

function calculateAge(birthDate: Date, currentDate: Date): { years: number, months: number, days: number } {
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  // Adjust days and months if necessary
  if (days < 0) {
    months--;
    days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}

function displayAge(age) {
  year_result.innerText = age.years.toString();
  month_result.innerText = age.months.toString();
  day_result.innerText = age.days.toString();
}

calculate_btn.addEventListener("click", () => {
  if (errorHandler() == true) {
    let age = calculateAge(user_date, present_date);
    displayAge(age);
    day_error.style.display = "none";
    month_error.style.display = "none";
    year_error.style.display = "none";
  }
});