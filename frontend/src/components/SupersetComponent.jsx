import {Dashboard, DefaultDataProvider} from "superset-dashboard-sdk";
const SupersetComponent = () => {


    const dataProvider = new DefaultDataProvider("http://20.84.101.7/", {
        username : "admin",
        password : "admin",
    });
    //050eb03d-5e1f-4d4b-bc5d-6fd7357e56ff
    //578fd9f2-c987-41de-b96b-18c393a40967

    console.log(dataProvider);

    return(
        <div>
            <Dashboard
            dataProvider={dataProvider}
            domain="http://20.84.101.7"
            uuid={"cbe78626-de2b-4f30-8d09-db207a78a1a9"}
            >
            </Dashboard>
        </div>
    );
}
export default SupersetComponent;