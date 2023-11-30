let calcularIMC = () => {
    let peso = parseFloat(document.getElementById("peso").value);
    let alturaCm = parseFloat(document.getElementById("altura").value);
    // cm a m
    let alturaM = alturaCm / 100;
    // Función flecha como orden superior para calcular el IMC
    let calcular = (peso, altura) => peso / (altura ** 2);

    // Calcula el IMC
    let imc = calcular(peso, alturaM);

    // resultado
    mostrarR(imc);
};

// Función para mostrar el resultado del IMC
let mostrarR = imc => {
    let resultadoInput = document.getElementById("resultado");

    if (!isNaN(imc)) {
        resultadoInput.value = imc.toFixed(2);
    } else {
        resultadoInput.value = "Por favor, ingresa valores válidos.";
    }
};