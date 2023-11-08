import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Accordion, AccordionItem, Avatar} from "@nextui-org/react";
import VistaHistorial from './VistaHistorial'


const defaultContent =
<VistaHistorial></VistaHistorial>
const ListadoComprasComponent = () => (
    <div className="flex flex-col  items-center py-10 px-10">
        <Card className="max-w-full max-h-full w-[600px] h-[900px]">
            <CardHeader>
                Historial de compras:
            </CardHeader>
            
            <CardBody>
               
                <Accordion selectionMode="multiple">
                    <AccordionItem
                        key="1"
                        aria-label="Actividades"
                        startContent={
                        <Avatar
                            isBordered
                            color="primary"
                            radius="lg"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        />
                        }
                        title="Actividades"
                    >
                        {defaultContent}
                        
                    </AccordionItem>
                   

                    <AccordionItem
                        key="2"
                        aria-label="Restaurantes"
                        startContent={
                        <Avatar
                            isBordered
                            color="success"
                            radius="lg"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                        }
                        title="Restaurantes"
                    >
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem
                        key="3"
                        aria-label="Hoteles"
                        startContent={
                        <Avatar
                            isBordered
                            color="warning"
                            radius="lg"
                            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                        />
                        }
                        title="Hoteles"
                    >
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem
                        key="4"
                        aria-label="Transporte"
                        startContent={
                        <Avatar
                            isBordered
                            color="Danger"
                            radius="lg"
                            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                        />
                        }
                        title="Transporte"
                    >
                        {defaultContent}
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card>
    </div>
);

export default ListadoComprasComponent;