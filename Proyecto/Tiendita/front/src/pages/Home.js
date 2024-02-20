import React, { useEffect } from "react";
import frutas from "../imagesHome/frutas.jpeg";
import verduras from "../imagesHome/verduras.jpeg";
import tienda from "../imagesHome/tienda.jpeg";
import { FaHome, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
const Home = () => {
  useEffect(() => {
    document.title = "HOME";
  });

  return (
    <>
      <div className="hero_area">
        {/* slider section */}
        <section className=" slider_section position-relative">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="slider_item-box">
                  <div className="slider_item-container">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="slider_item-detail">
                            <div>
                              <h1>
                                Bienvenido <br />A nuestra humilde tiendita
                              </h1>
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                              <div className="d-flex">
                                <a
                                  href="#nombreTienda"
                                  className="text-uppercase custom_orange-btn mr-3"
                                >
                                  Contacto
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="slider_img-box">
                            <div>
                              <img
                                src="images/orange.png"
                                alt=""
                                className=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* other carousel items */}
            </div>
            <div className="custom_carousel-control"></div>
          </div>
        </section>
        {/* end slider section */}
      </div>
      {/* MAS SECCIONES DE HOME */}
      <section className="section2">
        <div className="title-section2">
          <h2>PRODUCTOS</h2>
        </div>
        <div className="functionality-section2">
          <div className="functionality__col">
            <div className="col-img-cont">
              <img src={frutas} />
            </div>
            <div className="col-text-cont">
              <h5>Frutas</h5>
              <p>Frutas deliciosas</p>
            </div>
          </div>
          <div className="functionality__col">
            <div className="col-img-cont">
              <img src={verduras} />
            </div>
            <div className="col-text-cont">
              <h5>Verduras</h5>
              <p>Verduras deliciosas</p>
            </div>
          </div>
          <div className="functionality__col">
            <div className="col-img-cont">
              <img src={frutas} />
            </div>
            <div className="col-text-cont">
              <h5>Legumbres</h5>
              <p>Legumbres deliciosas</p>
            </div>
          </div>
          <div className="functionality__col">
            <div className="col-img-cont">
              <img src={verduras} />
            </div>
            <div className="col-text-cont">
              <h5>Lacteos</h5>
              <p>Lacteos Cremosos</p>
            </div>
          </div>
        </div>
      </section>
      <section id="nombreTienda" className="section3">
        <div className="text-section3">
          <h3>Tiendita</h3>
          <h4>Informacion de la tienda</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="img-section3">
          <img src={tienda} />
        </div>
      </section>
      \
      <section className="section4">
        <div className="section4-contenedores">
          <h5>Direccion</h5>
          <FaHome className="section4-icono"></FaHome>
          <p>
            Av.General Enriquez <br />y Ponciano - OE525
          </p>
        </div>
        <div className="section4-contenedores">
          <h5>Teléfono</h5>
          <FaPhoneAlt className="section4-icono"></FaPhoneAlt>
          <p>0965248634</p>
        </div>
        <div className="section4-contenedores">
          <h5>Correo</h5>
          <FaEnvelope className="section4-icono"></FaEnvelope>
          <p>tienda@gmail.com</p>
        </div>
      </section>
    </>
  );
};

export default Home;
