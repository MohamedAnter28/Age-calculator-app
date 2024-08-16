const dayInput = document.querySelector('#dayInput');
const monthInput = document.querySelector('#monthInput');
const yearInput = document.querySelector('#yearInput');

const submitBtn = document.querySelector('#btn');

const currentYear = new Date().getFullYear();

const labels = document.querySelectorAll('label');
const alerts = document.querySelectorAll('.alert');

function checkValidation() {
  let hasError = false;

  labels.forEach((label) => label.classList.remove('error'));
  [dayInput, monthInput, yearInput].forEach((input) =>
    input.classList.remove('error')
  );
  alerts.forEach((alert) => {
    alert.innerHTML = '';
    alert.classList.remove('active');
  });

  if (dayInput.value === '') {
    labels[0].classList.add('error');
    dayInput.classList.add('error');
    alerts[0].innerHTML = 'This field is required';
    alerts[0].classList.add('active');
    hasError = true;
  } else if (parseInt(dayInput.value) > 31) {
    labels[0].classList.add('error');
    dayInput.classList.add('error');
    alerts[0].innerHTML = 'Must be a valid day';
    alerts[0].classList.add('active');
    hasError = true;
  }

  if (monthInput.value === '') {
    labels[1].classList.add('error');
    monthInput.classList.add('error');
    alerts[1].innerHTML = 'This field is required';
    alerts[1].classList.add('active');
    hasError = true;
  } else if (parseInt(monthInput.value) > 12) {
    labels[1].classList.add('error');
    monthInput.classList.add('error');
    alerts[1].innerHTML = 'Must be a valid month';
    alerts[1].classList.add('active');
    hasError = true;
  }

  if (yearInput.value === '') {
    labels[2].classList.add('error');
    yearInput.classList.add('error');
    alerts[2].innerHTML = 'This field is required';
    alerts[2].classList.add('active');
    hasError = true;
  } else if (parseInt(yearInput.value) > currentYear) {
    labels[2].classList.add('error');
    yearInput.classList.add('error');
    alerts[2].innerHTML = 'Must be a valid year';
    alerts[2].classList.add('active');
    hasError = true;
  }

  return !hasError;
}

function formatInput(event) {
  let value = event.target.value;
  if (event.target === dayInput || event.target === monthInput) {
    if (value.length > 2) {
      event.target.value = value.slice(0, 2);
    }
  } else if (event.target === yearInput) {
    if (value.length > 4) {
      event.target.value = value.slice(0, 4);
    }
  }
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (checkValidation()) {
    const day = parseInt(dayInput.value, 10);
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);

    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    document.querySelector('.yearRes p').innerHTML = `${ageYears}`;
    document.querySelector('.monthRes p').innerHTML = `${ageMonths}`;
    document.querySelector('.dayRes p').innerHTML = `${ageDays}`;

    setTimeout(() => {
      dayInput.value = '';
      monthInput.value = '';
      yearInput.value = '';
    }, 1500);

    console.log(
      `User is ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`
    );
  } else {
    document.querySelectorAll('.row p').forEach((e) => {
      e.innerHTML = '--';
    });

    dayInput.value = '';
    monthInput.value = '';
    yearInput.value = '';
    console.log('Form has errors. Please correct them before submitting.');
  }
});

dayInput.addEventListener('input', formatInput);
monthInput.addEventListener('input', formatInput);
yearInput.addEventListener('input', formatInput);
