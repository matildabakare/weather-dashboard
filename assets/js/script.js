var dateEl = document.querySelector("#current-date");


//Get current date and append it at te top of the page
var date = moment().format('MM/DD/YYYY ');
dateEl.textContent = date;