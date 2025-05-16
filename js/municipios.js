const pueblosDeJaen = [
      "Albanchez de Mágina", "Alcalá la Real", "Alcaudete", "Aldeaquemada", "Andújar", "Arjona", "Arjonilla",
      "Arquillos", "Arroyo del Ojanco", "Baeza", "Bailén", "Baños de la Encina", "Beas de Segura", "Bedmar y Garcíez",
      "Begíjar", "Bélmez de la Moraleda", "Benatae", "Cabra del Santo Cristo", "Cambil", "Campillo de Arenas", "Canena",
      "Carboneros", "Cárcheles", "La Carolina", "Castellar", "Castillo de Locubín", "Cazalilla", "Cazorla", "Chiclana de Segura",
      "Chilluévar", "Escañuela", "Espelúy", "Frailes", "Fuensanta de Martos", "Fuerte del Rey", "Génave", "Guarromán",
      "Higuera de Calatrava", "Hinojares", "Hornos", "Huelma", "Huesa", "Ibros", "La Guardia de Jaén", "La Iruela",
      "Iznatoraf", "Jabalquinto", "Jaén", "Jamilena", "Jimena", "Jódar", "Larva", "Lahiguera", "Linares", "Lopera",
      "Lupión", "Mancha Real", "Marmolejo", "Martos", "Mengíbar", "Montizón", "Navas de San Juan", "Noalejo", "Orcera",
      "Peal de Becerro", "Pegalajar", "Porcuna", "Pozo Alcón", "Puente de Génave", "La Puerta de Segura", "Quesada",
      "Rus", "Sabiote", "Santa Elena", "Santiago de Calatrava", "Santiago-Pontones", "Santisteban del Puerto", "Santo Tomé",
      "Segura de la Sierra", "Siles", "Sorihuela del Guadalimar", "Torreblascopedro", "Torredelcampo", "Torredonjimeno",
      "Torreperogil", "Torres", "Torres de Albanchez", "Úbeda","Valdepeñas de Jaén", "Vilches", "Villacarrillo",
      "Villanueva de la Reina", "Villanueva del Arzobispo", "Villardompardo", "Los Villares", "Villatorres", "Villarrodrigo"
    ];

    function normalizarTexto(texto) {
      return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
    }

    function verificarPueblo() {
      const inputElement = document.getElementById("pueblo");
      const puebloOriginal = inputElement.value.trim();
      const normalizado = normalizarTexto(puebloOriginal);
      const resultado = document.getElementById("resultado");
      const imagenDiv = document.getElementById("imagen-localidad");

      const encontrado = pueblosDeJaen.some(
        p => normalizarTexto(p) === normalizado
      );

      if (encontrado) {
        resultado.textContent = "✅ El pueblo pertenece a la provincia de Jaén.";
        resultado.style.color = "white";
        resultado.style.backgroundColor="orange";

        const wikiAPI = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(puebloOriginal)}`;

        fetch(wikiAPI)
          .then(response => response.json())
          .then(data => {
            if (data.thumbnail && data.thumbnail.source) {
            imagenDiv.innerHTML = `<img src="${data.thumbnail.source}" alt="Imagen de ${puebloOriginal}">`;
            } else {
            imagenDiv.innerHTML = ""; // No hay imagen disponible
    }
  })
  .catch(error => {
    console.error("Error al obtener la imagen:", error);
    imagenDiv.innerHTML = ""; // Error en la carga
  });

      } else {
        resultado.textContent = "❌ El pueblo NO pertenece a la provincia de Jaén.";
        resultado.style.color = "red";
        imagenDiv.innerHTML = "";
      }

      inputElement.select();
    }

    function limpiarInput() {
      const input = document.getElementById("pueblo");
      input.value = "";
      document.getElementById("resultado").textContent = "";
      document.getElementById("imagen-localidad").innerHTML = "";
      input.focus();
    }

    document.getElementById("pueblo").addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        verificarPueblo();
      }
    });
