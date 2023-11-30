import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Title from "../../Components/Title/Title";
import MainContent from "../../Components/MainContent/MainContent";
import Banner from "../../Components/Banner/Banner";
import ContactSection from "../../Components/ContactSection/ContactSection";
import NextEvent from "../../Components/NextEvent/NextEvent";
import Container from "../../Components/Container/Container";
import VisionSection from "../../Components/VisionSection/VisionSection";
import axios from "axios";
import api from "../../Services/Service";
import { UserContext } from "../../Context/AuthContext";

const HomePage = () => {

  const [nextEvents, setNextEvents] = useState([]);

  useEffect(() => {
    //chamar a api
    async function getProximosEventos() {
      try {
        const promise = await api.get("/Evento/ListarProximos");

        console.log(promise.data);
        setNextEvents(promise.data);
      } 
      catch (error) {
        alert("Deu ruim na api");
      }
    }
    getProximosEventos();
    console.log("A HOME FOI MONTADA!!!");
  }, []);

  return (
    <MainContent>
      <Banner />

      {/* Próximos eventos */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos eventos"} />

          <div className="events-box">
            {nextEvents.map((e) => {
              return (
                <NextEvent
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvento={e.idEvento}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
