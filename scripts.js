const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    //FileReader API para pré-visualizar imagens antes de enviá-las para o servidor
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ URL: leitor.result, nome: arquivo.name });
    };
    leitor.onerror = () => {
      reject("Erro ao ler o arquivo");
    };
    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".img-desc p");

inputUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];
  if (arquivo) {
    try {
      const conteudoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoArquivo.URL;
      nomeDaImagem.textContent = conteudoArquivo.nome;
    } catch (erro) {
      console.erro("Erro ao ler o arquivo: ", erro);
    }
  }
});

const listaTags = document.querySelector(".lista-tags");

const inputTags = document.getElementById("input-tags");
inputTags.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      const tagNova = document.createElement("li");
      tagNova.innerHTML = `<p>${tagTexto}</p> <img src='./img/close-black.svg' alt='close' class='remove-tag'>`;
      listaTags.appendChild(tagNova);
      inputTags.value = "";
    }
  }
});

listaTags.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-tag")) {
    const tagRemovida = event.target.parentElement;
    listaTags.removeChild(tagRemovida);
  }
});
