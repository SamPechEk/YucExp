import React, { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import  Swal  from 'sweetalert2';


export default function SelectComponent() {
  const [municipios, setMunicipios] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState(new Set([]));

  useEffect(() => {
    axios.get("https://yucexpback.onrender.com/api/usuarios/municipios")
      .then((response) => {
        const formattedMunicipios = response.data.map((municipio) => ({
          label: municipio.nombreMunicipio,
          value: municipio.idMunicipio.toString(),
          description: `Municipio ${municipio.nombreMunicipio}`,
        }));
        setMunicipios(formattedMunicipios);
      })
      .catch((error) => {
        console.error("Error al obtener municipios:", error);
      });
  }, []);

  const handleMunicipioChange = (e) => {
    setSelectedMunicipio(new Set([e]));
    // Almacenar el valor en localStorage
    localStorage.setItem("selectedMunicipio", e);
    Swal.fire('Municipio actualizado con exito', '', 'success')
    setTimeout(function() {
      window.location.reload();
    }, 3000);

  };

  useEffect(() => {
    const storedMunicipio = localStorage.getItem("selectedMunicipio");
    if (storedMunicipio) {
        setSelectedMunicipio(new Set([storedMunicipio]));
    }else{
        setSelectedMunicipio(new Set(["1"]));
    }
  }, []);

  return (
    <Select
      items={municipios}
      label="106 municipios"
      placeholder="Selecciona un municipio ..."
      className="max-w-xs"
      onChange={(e) => handleMunicipioChange(e.target.value)}
      selectedKeys={selectedMunicipio}
    >
      {(municipio) => (
        <SelectItem key={municipio.value}>
          {municipio.label}
        </SelectItem>
      )}
    </Select>
  );
}
