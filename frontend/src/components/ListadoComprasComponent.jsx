import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Accordion, AccordionItem, Avatar} from "@nextui-org/react";
import VistaHistorial from './VistaHistorial'


const defaultContent =
<VistaHistorial></VistaHistorial>
const ListadoComprasComponent = () => (
    <div className="flex flex-col  items-center py-10 px-10">
        <Card className="max-w-full max-h-full w-[600px] h-[900px]">
            <CardHeader>
                Mi Lista De Compras:
            </CardHeader>
            
            <CardBody>
               
                <Accordion selectionMode="multiple">
                    <AccordionItem
                        key="1"
                        aria-label="Cancun"
                        startContent={
                        <Avatar
                            isBordered
                            color="primary"
                            radius="lg"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        />
                        }
                        subtitle="4 unread messages"
                        title="Cancun"
                    >
                        {defaultContent}
                        
                    </AccordionItem>
                   

                    <AccordionItem
                        key="2"
                        aria-label="Veracruz"
                        startContent={
                        <Avatar
                            isBordered
                            color="success"
                            radius="lg"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                        }
                        subtitle="3 incompleted steps"
                        title="Veracruz"
                    >
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem
                        key="3"
                        aria-label="Playa Del Carmen"
                        startContent={
                        <Avatar
                            isBordered
                            color="warning"
                            radius="lg"
                            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                        />
                        }
                        subtitle={
                        <p className="flex">
                            2 months ago<p className="text-primary ml-1">Reciente</p>
                        </p>
                        }
                        title="Playa Del Carmen"
                    >
                        {defaultContent}
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card>
    </div>
);

export default ListadoComprasComponent;