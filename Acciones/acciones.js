const categorias = {
  alimento: {
    nombre: "Alimento",
    tituloPlanes: "Planes de alimentos",
    planes: [
      {
        id: "operacion-kilo",
        nombre: "Operación kilo",
        titulo: "Operación kilo",
        descripcion:
          "Campaña de recogida de productos no perecederos para reforzar la ayuda alimentaria del centro y responder a necesidades cercanas. ",
        centro: "Centro Ejemplo",
        foto: ""
      },
      {
        id: "cestas-urgentes",
        nombre: "Cestas urgentes",
        titulo: "Cestas urgentes",
        descripcion:
          "Plan de respuesta inmediata para preparar lotes de primera necesidad cuando aparece una situación urgente en una familia.",
        centro: "Centro Ejemplo",
        foto: ""
      },
      {
        id: "desayunos-compartidos",
        nombre: "Desayunos compartidos",
        titulo: "Desayunos compartidos",
        descripcion:
          "Iniciativa para garantizar un desayuno completo y saludable a alumnado que necesita un apoyo diario estable.",
        centro: "Centro Ejemplo",
        foto: ""
      }
      
    ]
  },
  hogar: {
    nombre: "Hogar",
    tituloPlanes: "Planes de hogar",
    planes: [
      {
        id: "hogar-digno",
        nombre: "Hogar digno",
        titulo: "Hogar digno",
        descripcion:
          "Recogida de ropa de cama, mantas y artículos esenciales para hacer más confortables los espacios de acogida y apoyo residencial.",
        centro: "Centro Ejemplo",
        foto: ""
      },
      {
        id: "reforma-solidaria",
        nombre: "Reforma solidaria",
        titulo: "Reforma solidaria",
        descripcion:
          "Pequeñas mejoras en viviendas vulnerables para resolver desperfectos básicos y aumentar la seguridad del espacio.",
        centro: "Centro Ejemplo",
        foto: ""
      },
      {
        id: "acompanamiento-cercano",
        nombre: "Acompañamiento cercano",
        titulo: "Acompañamiento cercano",
        descripcion:
          "Plan de seguimiento para personas y familias en procesos de autonomía, convivencia y acceso a recursos habitacionales.",
        centro: "Centro Ejemplo",
        foto: ""
      },
      
    ]
  },
  social: {
    nombre: "Social",
    tituloPlanes: "Planes sociales",
    planes: [
      {
        id: "compania-activa",
        nombre: "Compañía activa",
        titulo: "Compañía activa",
        descripcion:
          "Plan de visitas, escucha y acompañamiento para combatir la soledad no deseada y fortalecer vínculos comunitarios.",
        centro: "Centro Ejemplo",
        foto: ""
      },
      {
        id: "puertas-abiertas",
        nombre: "Puertas abiertas",
        titulo: "Puertas abiertas",
        descripcion:
          "Programa de acogida e integración para generar espacios seguros, abiertos y cercanos dentro de la comunidad.",
        centro: "Centro Ejemplo",
        foto: ""
      },
      {
        id: "red-de-apoyo",
        nombre: "Red de apoyo",
        titulo: "Red de apoyo",
        descripcion:
          "Coordinación entre voluntariado, centro y entorno cercano para responder mejor a necesidades sociales complejas.",
        centro: "Centro Ejemplo",
        foto: ""
      }
    ]
  },
  educacion: {
    nombre: "Educación",
    tituloPlanes: "Planes de educación",
    planes: [
      {
        id: "mochila-solidaria",
        nombre: "Mochila solidaria",
        titulo: "Mochila solidaria",
        descripcion:
          "Campaña para reunir material escolar y garantizar que el alumnado disponga de lo necesario desde el primer día.",
        centro: "Centro Ejemplo",
        foto: ""
      },
      {
        id: "refuerzo-compartido",
        nombre: "Refuerzo compartido",
        titulo: "Refuerzo compartido",
        descripcion:
          "Plan de acompañamiento académico para reforzar el estudio, la organización y los hábitos en alumnado con dificultades.",
        centro: "Centro Ejemplo",
        foto: ""
      },
      {
        id: "becas-que-impulsan",
        nombre: "Becas que impulsan",
        titulo: "Becas que impulsan",
        descripcion:
          "Acompañamiento para acceder a ayudas y becas que permitan mantener la continuidad escolar y abrir oportunidades.",
        centro: "Centro Ejemplo",
        foto: ""
      }
    ]
  }
};

const tituloPlanes = document.getElementById("titulo-planes");
const listaPlanes = document.getElementById("lista-planes");
const categoriaBtns = document.querySelectorAll(".categoria-btn");
const contenidoDinamico = document.querySelector(".contenido-dinamico");
const titulo = document.getElementById("titulo-seccion");
const descripcion = document.getElementById("descripcion-seccion");
const foto = document.getElementById("foto-seccion");

function animarPaneles() {
  if (contenidoDinamico) {
    contenidoDinamico.classList.add("en-transicion");
  }
}

function actualizarContenido(plan) {
  titulo.textContent = plan.titulo;
  descripcion.innerHTML = `${plan.descripcion}<br><br><strong>Centro de estudios:</strong> ${plan.centro}`;
  foto.src = plan.foto || "";
  foto.style.display = plan.foto ? "block" : "none";
  foto.classList.toggle("visible", Boolean(plan.foto));
  foto.alt = plan.titulo ? `Imagen de ${plan.titulo}` : "Imagen del plan";
}

function renderizarPlan(plan, animar = true) {
  if (!animar) {
    actualizarContenido(plan);
    return;
  }

  animarPaneles();
  window.setTimeout(() => {
    actualizarContenido(plan);
    if (contenidoDinamico) {
      contenidoDinamico.classList.remove("en-transicion");
    }
  }, 180);
}

function renderizarCategoria(categoriaId) {
  const categoria = categorias[categoriaId];
  if (!categoria) return;

  tituloPlanes.textContent = categoria.tituloPlanes;
  listaPlanes.innerHTML = "";

  categoria.planes.forEach((plan, indice) => {
    const item = document.createElement("li");
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "selector-plan";
    boton.textContent = plan.nombre;
    boton.addEventListener("click", () => {
      renderizarPlan(plan);
      document.querySelectorAll("#lista-planes button").forEach((btn) => {
        btn.classList.remove("activo");
      });
      boton.classList.add("activo");
    });

    if (indice === 0) {
      boton.classList.add("activo");
      renderizarPlan(plan, false);
    }

    item.appendChild(boton);
    listaPlanes.appendChild(item);
  });

  categoriaBtns.forEach((btn) => {
    btn.classList.toggle("activo", btn.dataset.categoria === categoriaId);
  });
}

categoriaBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    renderizarCategoria(btn.dataset.categoria);
  });
});

renderizarCategoria(document.body.dataset.seccionInicial || "alimento");
