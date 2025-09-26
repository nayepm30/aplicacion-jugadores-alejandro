function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-header">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          Liga MX
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#inicio">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#equipos">
                Equipos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#noticias">
                Noticias
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <h1>Bienvenido a la Liga MX</h1>
      
    </section>
  );
}

function EquipoCard({ nombre, ciudad, img, onEliminar }) {
  return (
    <div className="col-md-3 col-sm-6">
      <div className="card text-center m-3 shadow-sm">
        <img
          src={img}
          className="card-img-top p-3"
          alt={nombre}
          style={{ height: "160px", objectFit: "contain" }}
        />
        <div className="card-body">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text text-muted">{ciudad}</p>
          <button className="btn btn-danger btn-sm" onClick={onEliminar}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-white text-center p-3">
      <p className="mb-0">© 2025 Liga MX Fan Page | Desarrollado por Nayelli</p>
    </footer>
  );
}


const contarEquipos = (lista) => lista.length;
const formatearNombre = (nombre) => nombre.toUpperCase();


function App() {
  const [equipos, setEquipos] = React.useState([
    { nombre: "América", ciudad: "CDMX", img: "img/america.png" },
    { nombre: "Chivas", ciudad: "Guadalajara", img: "img/chivas.png" },
    { nombre: "León", ciudad: "León", img: "img/leon.png" },
    { nombre: "Tigres", ciudad: "Monterrey", img: "img/tigres.png" },
  ]);

  const [nuevoNombre, setNuevoNombre] = React.useState("");
  const [nuevaCiudad, setNuevaCiudad] = React.useState("");
  const [nuevaImg, setNuevaImg] = React.useState(null);

  const agregarEquipo = () => {
    if (nuevoNombre.trim() === "" || nuevaCiudad.trim() === "") return;

    setEquipos([
      ...equipos,
      {
        nombre: nuevoNombre,
        ciudad: nuevaCiudad,
        img: nuevaImg ? URL.createObjectURL(nuevaImg) : "img/default.png",
      },
    ]);

    setNuevoNombre("");
    setNuevaCiudad("");
    setNuevaImg(null);
    document.getElementById("fileInput").value = ""; 
  };

  const eliminarEquipo = (index) => {
    setEquipos(equipos.filter((_, i) => i !== index));
  };

  const total = contarEquipos(equipos);

  return (
    <div>
      <Header />
      <Hero />

      <div className="container my-5" id="equipos">
        <h2 className="text-center mb-4">Equipos de la Liga MX</h2>
        <p className="text-center text-muted">
          Total de equipos mostrados: {total}
        </p>

       
        <div className="row mb-4">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Nombre"
              className="form-control"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Ciudad"
              className="form-control"
              value={nuevaCiudad}
              onChange={(e) => setNuevaCiudad(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="file"
              id="fileInput"
              className="form-control"
              accept="image/*"
              onChange={(e) => setNuevaImg(e.target.files[0])}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-success w-100" onClick={agregarEquipo}>
              Agregar Equipo
            </button>
          </div>
        </div>

     
        <div className="row justify-content-center">
          {equipos.map((eq, i) => (
            <EquipoCard
              key={i}
              nombre={formatearNombre(eq.nombre)}
              ciudad={eq.ciudad}
              img={eq.img}
              onEliminar={() => eliminarEquipo(i)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
