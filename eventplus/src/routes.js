import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventosPage from "./Pages/EventosPage/EventosPage";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import TipoEventosPage from "./Pages/TipoEventosPage/TipoEventosPage";
import TestesPage from "./Pages/TestePage/TestePage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { PrivateRoute } from "./Routes/PrivateRoute";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" exact />
        <Route
          path="/tipo-eventos"
          element={
            <PrivateRoute redirectTo="/">
              <TipoEventosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/eventos"
          element={
            <PrivateRoute redirectTo="/">
              <EventosPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/eventos-aluno"
          element={
            <PrivateRoute redirectTo="/">
              <EventosPage />
            </PrivateRoute>
          }
        />

        <Route element={<LoginPage />} path="/login" />
        <Route element={<TestesPage />} path="/testes" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;
