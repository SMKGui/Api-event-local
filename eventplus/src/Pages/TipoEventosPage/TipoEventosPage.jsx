import React, { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import "./TipoEventosPage.css";
import MainContent from "../../Components/MainContent/MainContent";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/tipo-evento.svg";
import Container from "../../Components/Container/Container";
import { Input, Button } from "../../Components/FormComponents/FormComponents";
import api from "../../Services/Service";
import TableTp from "./TableTp/TableTp";
import Notification from "../../Components/Notification/Notification";
import Spinner from "../../Components/Spinner/Spinner";

const TipoEventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  const [titulo, setTitulo] = useState("");

  const [tipoEventos, setTipoEventos] = useState([]); //array mocado

  const [notifyUser, setNotifyUser] = useState({});

  const [idEvento, setIdEvento] = useState(null);

  useEffect(() => {
    //chamar a api
    async function getTipoEventos() {
      setShowSpinner(true); 
      try {
        const promise = await api.get("/TiposEvento");

        console.log(promise.data);
        setTipoEventos(promise.data);
      } catch (error) {
        alert("Deu ruim na api");
      }
      setShowSpinner(false); 
    }
    getTipoEventos();
    console.log("A HOME FOI MONTADA!!!");
  }, []);

  async function handleSubmit(e) {
    //parar o submit do formulario
    e.preventDefault();
    //validar pelo menos 3 caracteres
    if (titulo.trim().length < 3) {
      alert("O Título deve ter no mínimo 3 caracteres");
      return;
    }
    //chamar a api
    try {
      const retorno = await api.post("/TiposEvento", { titulo: titulo });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
      console.log(retorno.data);
      setTitulo(""); //limpa variável

      const retornoGet = await api.get("/TiposEvento");
      setTipoEventos(retornoGet.data);
    } catch (error) {
      console.log("Deu ruim na api:");
      console.log(error);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      //salvar os dados
      const retorno = await api.put("/TiposEvento/" + idEvento, {
        titulo: titulo,
      });

      //atualizar o state (api get)
      const retornoGet = await api.get("/TiposEvento");
      setTipoEventos(retornoGet.data);
      alert("Atualizado com sucesso!");
      //limpar o state do titulo e do idEvento
      editActionAbort();
    } catch (error) {
      alert("Erro na atualização");
    }
  }

  ///////////////////////////////////EDITAR CADASTRO////////////////////////////////////

  async function showUpdateForm(idElemento) {
    setFrmEdit(true);

    try {
      //fazer um get by id para pegar os dados
      const retorno = await api.get("/TiposEvento/" + idElemento);

      setTitulo(retorno.data.titulo);
      setIdEvento(retorno.data.idTipoEvento);
    } catch (error) {
      alert("Não foi possível mostrar a tela de edição, tente novamente");
    }
  }

  function editActionAbort() {
    setFrmEdit(false);
    setTitulo("");
    setIdEvento(null);
  }

  async function handleDelete(idEvento) {
    //chamar a api
    try {
      const retorno = await api.delete(`/TiposEvento/${idEvento}`);

      alert("Registro apagado");
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Deletado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
      const retornoGet = await api.get("/TiposEvento");

      setTipoEventos(retornoGet.data);
    } catch (error) {
      console.log("Deu ruim");
    }
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
      {showSpinner ? <Spinner /> : null}
      {/* CADASTRO DE TIPOS DE EVENTOS */}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Página Tipos de Eventos"} />
            <ImageIllustrator
              alterText={"??????"}
              imageRender={eventTypeImage}
            />

            <form
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                //Cadastrar
                <>
                  <Input
                    type={"text"}
                    id={"titulo"}
                    name={"titulo"}
                    placeholder={"Título"}
                    required={"required"}
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                  />
                  <Button
                    type={"submit"}
                    id={"cadastrar"}
                    name={"cadastrar"}
                    textButton={"Cadastrar"}
                  />
                </>
              ) : (
                <>
                  <Input
                    id="titulo"
                    placeholder="titulo"
                    name="titulo"
                    type="text"
                    required="required"
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                  />

                  <div className="buttons-editbox">
                    <Button
                      textButton="Atualizar"
                      id="atualizar"
                      name="atualizar"
                      type="submit"
                      additionalClass="button-component--middle"
                    />
                    <Button
                      textButton="Cancelar"
                      id="cancelar"
                      name="cancelar"
                      type="button"
                      manipulationFunction={editActionAbort}
                      additionalClass="button-component--middle"
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </Container>
      </section>

      {/* LISTAGEM DO TIPO DE EVENTOS */}
      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista Tipo de Eventos"} color="white" />

          <TableTp
            dados={tipoEventos}
            fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default TipoEventosPage;
