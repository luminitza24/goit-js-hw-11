const limit = 40; 
let nrTotalPagini = false;
let paginaCurenta = 1;
let skip = 0;

const mergiLaPagina = nrPagina => {
  skip = limit * (nrPagina - 1);
  paginaCurenta = nrPagina;
  functieDeFetch();
};

const construiestePaginare = () => {
  const paginare = document.getElementById("pagination");
  paginare.innerHTML = "";
  const paginaPrecedenta = document.createElement("button");
  paginaPrecedenta.innerText = "<";
  paginaPrecedenta.addEventListener("click", () => {
    mergiLaPagina(paginaCurenta - 1);
  });
  if (paginaCurenta === 1) {
    paginaPrecedenta.disabled = true;
  }
  paginare.appendChild(paginaPrecedenta);

  for (let i = 1; i <= nrTotalPagini; i++) {
    const butonPagina = document.createElement("button");
    butonPagina.innerText = i;
    if (paginaCurenta === i) {
      butonPagina.classList.add("active");
    } else {
      butonPagina.addEventListener("click", () => {
        mergiLaPagina(i);
      });
    }

    paginare.appendChild(butonPagina);
  }

  const paginaUrmatoare = document.createElement("button");
  paginaUrmatoare.innerText = ">";
  paginaUrmatoare.addEventListener("click", () => {
    mergiLaPagina(paginaCurenta + 1);
  });
  if (paginaCurenta === nrTotalPagini) {
    paginaUrmatoare.disabled = true;
  }
  paginare.appendChild(paginaUrmatoare);
};

const construiesteListaProduse = produse => {
  const listaProduse = document.getElementById("lista-produse");
  listaProduse.innerHTML = "";
  produse.forEach(produs => {
    const elementProdus = document.createElement("div");
    elementProdus.innerHTML = `(${produs.id}) ${produs.title}`;
    listaProduse.appendChild(elementProdus);
  });
};

const functieDeFetch = () => {
  fetch("https://pixabay.com/api/?key=36867365-3643e28b2c6642941cb9e037d" + limit + "&skip=" + skip)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      construiesteListaProduse(products);
      if (nrTotalPagini === false) {
        nrTotalPagini = Math.ceil(total / limit); // 7.2 => 8, 6.9 => 7
      }
      construiestePaginare();
    });
};

functieDeFetch();