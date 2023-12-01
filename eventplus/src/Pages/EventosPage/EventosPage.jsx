import React, { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import "./EventosPage.css";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import MainContent from "../../Components/MainContent/MainContent";
import eventTypeImage from "../../assets/images/tipo-evento.svg";
import Container from "../../Components/Container/Container";
import { Input, Button, Select } from "../../Components/FormComponents/FormComponents";
import api from "../../Services/Service";
import Notification from "../../Components/Notification/Notification";
import Spinner from "../../Components/Spinner/Spinner";
import TableEv from "./TableEv/TableEv";

const EventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  const [titulo, setTitulo] = useState("");

  const [eventos, setEventos] = useState([]); //array mocado
  const [tEvento, setTEvento] = useState([]);

  const [notifyUser, setNotifyUser] = useState({});

  const [idTipoEvento, setIdTipoEvento] = useState(null);

  const [instituicao, setInstituicao] = useState([]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    //chamar a api
    async function getEventos() {
      setShowSpinner(true);
      try {
        const promise = await api.get("/Evento");
        const retorno = await api.get("/TiposEvento")
        const retornoInstituicao = await api.get("/Instituicao")
        console.log(promise.data);
        setEventos(promise.data);
        setInstituicao(retornoInstituicao.data[0].idInstituicao);
        setTEvento(retorno.data)
        

      } catch (error) {
        alert("Deu ruim na api");
      }
      setShowSpinner(false);
    }
    getEventos();
    console.log("A HOME FOI MONTADA!!!");
  }, []);

  async function handleSubmit(e) {
    //para o submit do formulario
    e.preventDefault();
    //validar pelo menos 3 caracteres
    if (nome.trim().length < 3) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `O titulo deve conter mais de 3 caracteres!`,
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
      return;
    }

    try {
      const retornoEvento = await api.post("/Evento", {
        dataEvento: data,
        nomeEvento: nome,
        descricao: descricao,
        idTipoEvento: tipoEvento,
        idInstituicao: instituicao,
      });
      const retornoGet = await api.get("/Evento");
      setEventos(retornoGet.data);
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      console.log(retornoEvento.data);
      setNome("");
      setDescricao("");
      setTipoEvento("");
      setData("");
      setInstituicao([]);
      // setTipoEventos([]);
    } catch (error) {
      console.log("deu ruim na api");
      console.log(error);
    }

   // chamar a api
 }


  async function handleUpdate(e) {
    e.preventDefault();
    try {
      //salvar os dados
      const retorno = await api.put("/Evento/" + idTipoEvento, {
        titulo: titulo,
      });

      //atualizar o state (api get)
      const retornoGet = await api.get("/Evento");
      setEventos(retornoGet.data);
      alert("Atualizado com sucesso!");
      //limpar o state do titulo e do idEvento
      //editActionAbort();
    } catch (error) {
      alert("Erro na atualização");
    }
  }

  async function handleDelete(idEvento) {
    //chamar a api
    try {
      const retorno = await api.delete(`/Evento/${idEvento}`);

      alert("Registro apagado");
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Deletado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
      const retornoGet = await api.get("/Evento");

      setEventos(retornoGet.data);
    } catch (error) {
      console.log("Deu ruim");
    }
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
      {showSpinner ? <Spinner /> : null}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Página de Eventos"} />

            <ImageIllustrator
              alterText={"?????"}
              imageRender={eventTypeImage}
            />

            <form
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                <>
                  <Input
                    type={"text"}
                    id={"nome"}
                    name={"nome"}
                    placeholder={"Nome"}
                    required={"required"}
                    value={nome}
                    manipulationFunction={(e) => {
                      setNome(e.target.value);
                    }}
                  />
                  <Input
                    type={"text"}
                    id={"descricao"}
                    name={"descricao"}
                    placeholder={"Descricao"}
                    required={"required"}
                    value={descricao}
                    manipulationFunction={(e) => {
                      setDescricao(e.target.value);
                    }}
                  />
                  {/*<Input
                    type={"text"}
                    id={"tipoEvento"}
                    name={"tipoEvento"}
                    placeholder={"TipoEvento"}
                    required={"required"}
                    value={tipoEvento}
                    manipulationFunction={(e) => {
                      setTipoEvento(e.target.value);
                    }}
                  />*/}
                  <Select
                  option={tEvento}
                  name={"tEvento"}
                  id={"tEvento"}
                  manipulationFunction={(e) => {
                    setTipoEvento(e.target.value)
                  }}
                  
                  
                  />
                  <Input
                    type={"date"}
                    id={"data"}
                    name={"data"}
                    placeholder={"Data"}
                    required={"required"}
                    value={data}
                    manipulationFunction={(e) => {
                      setData(e.target.value);
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
                    id="nome"
                    placeholder="nome"
                    name="nome"
                    type="text"
                    required="required"
                    value={nome}
                    manipulationFunction={(e) => {
                      setNome(e.target.value);
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
                      //manipulationFunction={editActionAbort}
                      additionalClass="button-component--middle"
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </Container>
      </section>

      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista de Eventos"} color="white" />
          <TableEv
            dados={eventos}
            //fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
          />
        </Container>
      </section>
    </MainContent>
  );
};


export default EventosPage;