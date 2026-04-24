//typewriter
document.addEventListener("DOMContentLoaded", function () {

    //console.log("Typewriter loaded!");

    const text = "Digital Imaging Engineer at ESIR - Université de Rennes.";
    const target = document.getElementById("typewriter");

    let i = 0;
    target.textContent = "";

    function type() {
        if (i < text.length) {
            target.textContent += text[i];
            i++;
            setTimeout(type, 80);
        }
    }

    type();
});
