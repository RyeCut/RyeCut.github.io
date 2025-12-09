document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("popup");
  const result = document.getElementById("result");
  const submitBtn = form.querySelector("button");

  const fields = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    address: document.getElementById("address"),
    q1: document.getElementById("q1"),
    q2: document.getElementById("q2"),
    q3: document.getElementById("q3")
  };

  submitBtn.disabled = true;

  function showError(input, message) {
    input.style.border = "2px solid red";
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-text")) {
      error = document.createElement("small");
      error.className = "error-text";
      input.after(error);
    }
    error.textContent = message;
  }

  function clearError(input) {
    input.style.border = "";
    const error = input.nextElementSibling;
    if (error && error.classList.contains("error-text")) {
      error.remove();
    }
  }

  function validateName(input) {
    const regex = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųū]+$/;
    if (!input.value.trim()) return showError(input, "Laukas tuščias");
    if (!regex.test(input.value)) return showError(input, "Tik raidės");
    clearError(input);
    return true;
  }

  function validateEmail(input) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.value.trim()) return showError(input, "Laukas tuščias");
    if (!regex.test(input.value)) return showError(input, "Neteisingas el. paštas");
    clearError(input);
    return true;
  }

  function validateAddress(input) {
    if (!input.value.trim()) return showError(input, "Laukas tuščias");
    clearError(input);
    return true;
  }

  function checkFormValidity() {
    const valid =
      validateName(fields.firstName) &&
      validateName(fields.lastName) &&
      validateEmail(fields.email) &&
      validatePhone(fields.phone) &&
      validateAddress(fields.address);

    submitBtn.disabled = !valid;
  }

  fields.firstName.addEventListener("input", () => {
    validateName(fields.firstName);
    checkFormValidity();
  });

  fields.lastName.addEventListener("input", () => {
    validateName(fields.lastName);
    checkFormValidity();
  });

  fields.email.addEventListener("input", () => {
    validateEmail(fields.email);
    checkFormValidity();
  });

  fields.address.addEventListener("input", () => {
    validateAddress(fields.address);
    checkFormValidity();
  });

  // ✅ TELEFONO FORMATAVIMAS REALIU LAIKU
  function formatPhone(value) {
    let digits = value.replace(/\D/g, "").substring(0, 11);
    let formatted = "+370 ";

    if (digits.length > 3) {
      formatted += digits.substring(3, 6);
    }
    if (digits.length > 6) {
      formatted += " " + digits.substring(6, 11);
    }

    return formatted;
  }

  function validatePhone(input) {
    const regex = /^\+370\s6\d{2}\s\d{5}$/;
    if (!regex.test(input.value)) {
      showError(input, "Formatas: +370 6xx xxxxx");
      return false;
    }
    clearError(input);
    return true;
  }

  fields.phone.addEventListener("input", (e) => {
    fields.phone.value = formatPhone(fields.phone.value);
    validatePhone(fields.phone);
    checkFormValidity();
  });

  // ✅ SUBMIT LOGIKA
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      firstName: fields.firstName.value,
      lastName: fields.lastName.value,
      email: fields.email.value,
      phone: fields.phone.value,
      address: fields.address.value,
      q1: Number(fields.q1.value),
      q2: Number(fields.q2.value),
      q3: Number(fields.q3.value)
    };

    console.log(data);

    const average = ((data.q1 + data.q2 + data.q3) / 3).toFixed(1);

    result.innerHTML = `
      <p><strong>Vardas:</strong> ${data.firstName}</p>
      <p><strong>Pavardė:</strong> ${data.lastName}</p>
      <p><strong>El. paštas:</strong> ${data.email}</p>
      <p><strong>Tel. numeris:</strong> ${data.phone}</p>
      <p><strong>Adresas:</strong> ${data.address}</p>
      <p><strong>${data.firstName} ${data.lastName}:</strong> ${average}</p>
    `;

    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 3000);
  });
});
