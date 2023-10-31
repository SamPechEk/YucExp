// export const Municipios = [
//   {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
//   {label: "Dog", value: "dog", description: "The most popular pet in the world"},
//   {label: "Elephant", value: "elephant", description: "The largest land animal"},
//   {label: "Lion", value: "lion", description: "The king of the jungle"},
//   {label: "Tiger", value: "tiger", description: "The largest cat species"},
//   {label: "Giraffe", value: "giraffe", description: "The tallest land animal"},
//   {
//     label: "Dolphin",
//     value: "dolphin",
//     description: "A widely distributed and diverse group of aquatic mammals",
//   },
//   {label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds"},
//   {label: "Zebra", value: "zebra", description: "A several species of African equids"},
//   {
//     label: "Shark",
//     value: "shark",
//     description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
//   },
//   {
//     label: "Whale",
//     value: "whale",
//     description: "Diverse group of fully aquatic placental marine mammals",
//   },
//   {label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
//   {label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
// ];
import axios from 'axios';

export const Municipios = async () => {
  try {
    const response = await axios.get('http://localhost:7000/api/usuarios/municipios'); // Reemplaza con la URL de tu servidor
    const municipios = response.data.map(item => ({
      label: item.nombreMunicipio,
      value: item.idMunicipio.toString(),
      description: `Descripción de ${item.nombreMunicipio}`,
    }));

    return municipios;
  } catch (error) {
    console.error('Error al obtener los municipios:', error);
    throw error;
  }
};
