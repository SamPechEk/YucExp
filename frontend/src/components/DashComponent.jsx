import { useEffect } from "react"
import { embedDashboard } from "@superset-ui/embedded-sdk"
// import "./App.css"
import axios from 'axios';
function DashComponent() {
   

    const getToken = async () => {
        try {
          const response = await axios.get('http://localhost:7000/api/usuarios/guest-token');
          const token = response.data;
          console.log(token);
          return token;
        } catch (error) {
          console.error('Error al obtener el token:', error);
          throw error; // Puedes manejar el error de acuerdo a tus necesidades
        }
      };
    

  useEffect(() => {
    const embed = async () => {
      await embedDashboard({
        id: "cbe78626-de2b-4f30-8d09-db207a78a1a9", // given by the Superset embedding UI
        supersetDomain: "http://20.84.101.7",
        mountPoint: document.getElementById("dashboard"), // html element in which iframe render
        fetchGuestToken: () => getToken(),
        dashboardUiConfig: {
          hideTitle: true
        },
      })
    }
    if (document.getElementById("dashboard")) {
      embed()
    }
  }, [])

  return (
    <div className="App">
      <h1>How to Embed Superset Dashboard into React</h1>
      <div id="dashboard"></div>
     
    </div>
  )
}

export default DashComponent