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

listaTags.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-tag")) {
    const tagRemovida = event.target.parentElement;
    listaTags.removeChild(tagRemovida);
  }
});

const tagsDisponiveis = [
  "front-end",
  "programação",
  "data Science",
  "full-stack",
  "HTML",
  "CSS",
  "javaScript",
];

async function verificaTags(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000);
  });
}

inputTags.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      try {
        const tagExite = await verificaTags(tagTexto);
        if (tagExite) {
          const tagNova = document.createElement("li");
          tagNova.innerHTML = `<p>${tagTexto}</p> <img src='./img/close-black.svg' alt='close' class='remove-tag'>`;
          listaTags.appendChild(tagNova);
          inputTags.value = "";
        } else {
          alert(
            "Tag não Tag não encontrada. Por favor, insira uma tag válida."
          );
          inputTags.value = "";
        }
      } catch (erro) {
        console.error("Erro ao verificar a tag: ", erro);
        alert(
          "Erro ao verificar a existência da tag. Verifique o console para mais detalhes."
        );
      }
    }
  }
});

const btnPublicarProj = document.querySelector(".publicar-proj");

async function publicarProjeto(nomeProjeto, dscricaoProjeto, tagsProjeto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deuCerto = Math.random() > 0.5;
      if (deuCerto) {
        resolve("Projeto publicado com sucesso!");
      } else {
        reject("Erro ao publicar o projeto.");
      }
    }, 2000);
  });
}

btnPublicarProj.addEventListener("click", async (evento) => {
  evento.preventDefault();
  const nomeProjeto = document.querySelector("#nome").value;
  const dscricaoProjeto = document.querySelector("#descricao").value;
  const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map(
    (tag) => tag.textContent
  );

  // console.log("Nome do Projeto:", nomeProjeto);
  // console.log("Descrição do Projeto:", dscricaoProjeto);
  // console.log("Tags do Projeto:", tagsProjeto);

  try {
    const resultado = await publicarProjeto(
      nomeProjeto,
      dscricaoProjeto,
      tagsProjeto
    );
    console.log(resultado);
    alert("Projeto publicado com sucesso!");
  } catch (erro) {
    console.error("Erro ao publicar o projeto: ", erro);
    alert(
      "Erro ao publicar o projeto. Verifique o console para mais detalhes."
    );
  }
});
