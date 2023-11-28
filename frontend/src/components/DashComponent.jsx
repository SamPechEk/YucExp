import { useEffect } from "react"
// import { embedDashboard } from "@superset-ui/embedded-sdk"
// import "./App.css"
import { embedDashboard } from "@preset-sdk/embedded";
import axios from 'axios';
function DashComponent() {
   

    const getToken = async () => {
        try {
          const response = await axios.get('https://yucexpback.onrender.com/api/usuarios/guest-token2');
          const token = response.data;
          console.log(response);
          return token;
        } catch (error) {
          console.error('Error al obtener el token:', error);
          throw error; // Puedes manejar el error de acuerdo a tus necesidades
        }
      };
    

  useEffect(() => {
    const embed = async () => {
      // await embedDashboard({
      //   id: "cbe78626-de2b-4f30-8d09-db207a78a1a9", // given by the Superset embedding UI
      //   supersetDomain: "http://20.84.101.7",
      //   mountPoint: document.getElementById("dashboard"), // html element in which iframe render
      //   fetchGuestToken: () => getToken(),
      //   dashboardUiConfig: {
      //     hideTitle: true
      //   },
      // })
      const myDashboard = await embedDashboard({
        id: "c17ccf6b-eb68-402e-b435-bc121350df89", // from the Embedded dialog
        supersetDomain: "https://b16d05ec.us2a.app.preset.io", // from the Embedded dialog
        mountPoint: document.getElementById("dashboard"), // any HTML element that can contain an iframe
        fetchGuestToken: () => getToken(), // function responsible to return a guest_token
        dashboardUiConfig: {
          // dashboard UI config: hideTitle, hideChartControls, filters.expanded (optional)
          hideTitle: false, // change it to `true` to hide the dashboard title
          hideChartControls: false, // change it to `true` to hide the chart controls (ellipses menu)
          filters: {
            expanded: true, // change it to `false` so that dashboard filters are collapsed (for vertical filter bar)
          },
        }, // dashboard UI configuration. Options: hideTitle, hideChartControls, filters.expanded (all optional)
    });
    const resizeHandler = () => {
      function setCss(css) {
        const el = document.getElementById("dashboard");
        el.querySelector(".embedded-superset iframe").style.cssText = css;
      }
      const { width, height } = myDashboard.getScrollSize();
      setCss(`
        
          width: 1000;
          height: 1000;
        
      `);
    };

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  };

  if (document.getElementById("dashboard")) {
    embed();
    //hack to make the view 100% in height and width 
    document.getElementById("dashboard").children[0].width="100%"; 
    document.getElementById("dashboard").children[0].height="100%"; 
  }
  }, [])

  return (
    <div className="App">
      <h1>How to Embed Superset Dashboard into React</h1>
      <div id="dashboard" style={{ width: "100vw", height: "100vh" }}></div>
     
    </div>
  )
}

export default DashComponent