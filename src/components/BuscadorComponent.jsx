import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import SearchIconComponent from "./SearchIconComponent";
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import {Switch} from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/react";


// import SearchIconComponent from "./components/SearchIconComponent";
const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const BuscadorComponent = () => (
    <div className="flex flex-col  items-center py-10 px-10">
        <Card className="max-w-full max-h-full w-[600px] h-[800px]">
            <CardBody>
                <Input
                    classNames={{
                    base: "max-w-full sm:max-w-[40rem] h-10",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<SearchIconComponent size={18} />}
                    type="search"
                />
                 <div>
                    <Switch Selected= "false" className="mt-3">
                        Paquete Completo
                    </Switch>
                    <CheckboxGroup
                    className="mx-0 mt-px"
                    label="Filtrar Por:"
                    orientation="horizontal"
                    color="secondary"
                    defaultValue={["destinos", "buenos-aires"]}
                    >
                    <Checkbox value="buenos-aires">Hoteles</Checkbox>
                    <Checkbox value="sydney">Restaurantes</Checkbox>
                    <Checkbox value="san-francisco">Transportes</Checkbox>
                    <Checkbox value="london">Guias</Checkbox>
                    <Checkbox value="destinos">Destinos</Checkbox>
                </CheckboxGroup>
                 </div>

                 <div>
                 <Accordion disabledKeys={["2"]} className="mt-3">
                    <AccordionItem key="1" 
                    aria-label="Hotel" 
                    subtitle="Press to expand" 
                    title="Cancun">
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem
                        key="2"
                        aria-label="Restaurante"
                        subtitle={
                        <span>
                            Este paquete no se podra modificar <strong>key 2</strong>
                        </span>
                        }
                        title="Paquete Completo"
                    >
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Destino" subtitle="Press to expand" title="Playa del carmen">
                        {defaultContent}
                    </AccordionItem>
                </Accordion>
                 </div>
            </CardBody>
        </Card>
    </div>
);
export default BuscadorComponent;