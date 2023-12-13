import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Title from "../../Components/Title/Title";
import Table from "./TableDeEv/TableDeEv";
import Container from "../../Components/Container/Container";
import {Select2} from "../../Components/FormComponents/FormComponents";
import Spinner from "../../Components/Spinner/Spinner";
import Modal from "../../Components/Modal/Modal";
import api from "../../Services/Service";

import { UserContext } from "../../Context/AuthContext";

const DetalhesEventoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: "1", text: "Todos os eventos" },
    { value: "2", text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [descricao, setDescricao] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [idEvento, setIdEvento] = useState("");

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  async function loadEventsType() {
    setShowSpinner(true);

    try {
      if (tipoEvento === "1") {
        const promise = await api.get("/Evento");
        const promiseEventos = await api.get(
          `/PresencasEvento/ListarMinhas/${userData.userId}`
        );

        const dadosMarcados = verificaPresenca(
          promise.data,
          promiseEventos.data
        );
        console.clear();
        console.log("DADOS MARCADOS");
        console.log(dadosMarcados);

        //setEventos(dadosMarcados);
      } else {
        let arrEventos = [];
        const promiseEventos = await api.get(
          `/PresencasEvento/ListarMinhas/${userData.userId}`
        );
        promiseEventos.data.forEach((element) => {
          arrEventos.push({
            ...element.evento,
            situacao: element.situacao,
            idPresencaEvento: element.idPresencaEvento,
          });
        });
       //setEventos(arrEventos);
        console.log(promiseEventos.data);
      }
    } catch (error) {
      console.log("Erro ao carregar os eventos");
      console.log(error);
    }

    setShowSpinner(false);
  }

  useEffect(() => {    
    loadEventsType();
  }, [tipoEvento, userData.userId]);


  const verificaPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.length; x++) {
      for (let i = 0; i < eventsUser.length; i++) {
        if (arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento) {
          arrAllEvents[x].situacao = true;

          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;

          break;
        }
      }
    }
    return arrAllEvents;
  };

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary(idComentary) {
    return "????";
  }

  async function postMyComentary(IdEvento, descricao) {
    return "????";
  }

  const commentaryRemove = async () => {
    alert("Remover o comentário");
  };

  const showHideModal = async () => {
    setShowModal(showModal ? false : true);
  };


  async function handleConnect(idEvent, whatTheFunction, idPresencaEvento = null) {
    if (whatTheFunction === "connect") {
      try {
        const promise = await api.post("/PresencasEvento", {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: idEvent,
        });

        if (promise.status === 201) {
          loadEventsType();
          alert("Presença confirmada");
        }
      } catch (error) {
        console.log("Erro ao conectar");
        console.log(error);
      }
      return;
    }

   
    try {
      const promiseDelete = await api.delete("/PresencasEvento/" + idPresencaEvento);
    if (promiseDelete.status = 204) {
      loadEventsType();
      alert("Desconectado do evento")
    }
    } catch (error) {
      alert("Erro")
    }
  }
  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} /> */}

      <MainContent>
        <Container>
          <Title titleText={"Eventos"} additionalClass="custom-title" />

          {/* <Select2
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            option={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          /> */}

          {/* <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          /> */}

        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {/* {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={loadMyComentary}
          fnPost={postMyComentary}
          fnDelete={commentaryRemove}
        />
      ) : null} */}
    </>
  );
};

export default DetalhesEventoPage;