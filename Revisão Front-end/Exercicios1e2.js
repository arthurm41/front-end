// exercício 1

function converter() {
    let c = document.getElementById("celsius").value;
    let f = c * 1.8 + 32;

    document.getElementById("resultado").innerText =
        `Resultado: ${f.toFixed(2)} °F`;

    if (f > 80) {
        document.body.style.backgroundColor = "coral";
    } else {
        document.body.style.backgroundColor = "lightskyblue";
    }
}


// exercício 2
const nomeInput = document.getElementById("nome");
const cargoInput = document.getElementById("cargo");
const corSelect = document.getElementById("cor");

nomeInput.oninput = function() {
    document.getElementById("previewNome").innerText =
        nomeInput.value || "Seu Nome";
}

cargoInput.oninput = function() {
    document.getElementById("previewCargo").innerText =
        cargoInput.value || "Seu Cargo";
}

corSelect.oninput = function() {
    document.documentElement.style.setProperty(
        "--cor-cartao",
        corSelect.value
    );
}
