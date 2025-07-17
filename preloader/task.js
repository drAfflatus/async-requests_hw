const loadEl = document.querySelector("#loader");

function addHTML(response) {
  const items = document.querySelectorAll("div.item");
  if (items.length > 0) {
    Array.from(items).forEach((element) => element.remove());
  }
  for (let item in response) {
    let html = `<div class="item">
                <div class="item__code">${response[item].CharCode}</div>
                <div class="item__value">${response[item].Value}</div>
                <div class="item__currency">руб.</div>
            </div>`;
    document.getElementById("items").insertAdjacentHTML("afterbegin", html);
  }

  loadEl.classList.remove("loader_active");
}

function show(resp) {
  if (resp.length > 0) addHTML(JSON.parse(resp));
}

function runRequest(method, url, boolAsync) {
  const request = new XMLHttpRequest();
  request.open(method, url, true);
  request.send();
  return request;
}

runRequest(
  "GET",
  "https://students.netoservices.ru/nestjs-backend/slow-get-courses",
  true
).addEventListener("readystatechange", function () {
  if (this.status === 200 && this.readyState === 4) {
    let resp = JSON.parse(this.responseText)["response"].Valute;
    addHTML(resp);
    localStorage.setItem("courses", JSON.stringify(resp));
  }
});

show(localStorage.getItem("courses"));
