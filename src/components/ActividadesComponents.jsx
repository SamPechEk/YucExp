import {Card,CardFooter, CardHeader, CardBody, Image, Button} from "@nextui-org/react";
import { Modal , ModalContent , ModalHeader , ModalBody , ModalFooter, useDisclosure } from "@nextui-org/react" ; 
import ReactPlayer from "react-player";
import {Accordion, AccordionItem} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function ActividadesComponent() {
    const { isOpen , onOpen , onOpenChange } = useDisclosure ( ) ;
    const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    
  return (

    <div className="justify-center items-center py-10 px-10 dark:bg-[#1b263b]">
        <h4 className="font-bold text-large">¿Qué puedo hacer en los destino?</h4>
        <small className="text-default-500">Los mejores destino de Yucatan</small>


    <div className="gap-4 grid grid-cols-1 sm:grid-cols-4 py-5">
    <Card className='dark:bg-[#1b263b]'> 
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
        <h4 className="font-bold text-large">¿Quieres visitar ruinas arqueologicas?</h4>
        <small className="text-default-500">Los mejores destino de Yucatan</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://littlevisuals.co/images/red_dawn.jpg"
          width={270}
        />
      </CardBody>
      <CardFooter className="justify-between">
        <p className="text-tiny text-white/80">Precios desde: </p>
        <p className="text-default-500">$9999</p>
        <>
      <Button onPress={onOpen} className="justify-end bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg ">Conocer mas</Button>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Link to={`/ShoppingCart`}>
                <Button color="primary" onPress={onClose}>
                  Reservar
                </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
      </CardFooter>
    </Card>

    <Card className='dark:bg-[#1b263b]'>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
        <h4 className="font-bold text-large">Conoce los mejores cenotes del Estado.</h4>
        <small className="text-default-500">Los mejores destino de Yucatan</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://littlevisuals.co/images/red_dawn.jpg"
          width={270}
        />
      </CardBody>
      <CardFooter className="justify-between">
        <p className="text-tiny text-white/80">Precios desde: </p>
        <p className="text-default-500">$9999</p>
        <>
      <Button onPress={onOpen} className="justify-end bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Conocer mas</Button>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Link to={`/ShoppingCart`}>
                <Button color="primary" onPress={onClose}>
                  Reservar
                </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
      </CardFooter>
    </Card>

    <Card className='dark:bg-[#1b263b]'>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Los mejores restaurantes con la gastronomia tradicional.</h4>
        <small className="text-default-500">Los mejores destino de Yucatan</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://littlevisuals.co/images/red_dawn.jpg"
          width={270}
        />
      </CardBody>
      <CardFooter className="justify-between">
        <p className="text-tiny text-white/80">Precios desde: </p>
        <p className="text-default-500">$9999</p>
        <>
      <Button onPress={onOpen} className="justify-end bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Conocer mas</Button>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Link to={`/ShoppingCart`}>
                <Button color="primary" onPress={onClose}>
                  Reservar
                </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
      </CardFooter>
    </Card>

    <Card className='dark:bg-[#1b263b]'>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Descansas en las mejores habitaciones</h4>
        <small className="text-default-500">Los mejores destino de Yucatan</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://littlevisuals.co/images/red_dawn.jpg"
          width={270}
        />
      </CardBody>
      <CardFooter className="justify-between">
        <p className="text-tiny text-white/80">Precios desde: </p>
        <p className="text-default-500">$9999</p>
        <>
      <Button onPress={onOpen} className="justify-end bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Conocer mas</Button>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Link to={`/ShoppingCart`}>
                <Button color="primary" onPress={onClose}>
                  Reservar
                </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
      </CardFooter>
    </Card>

   </div>

   <div className="App px-10 py-10" style={{width:'100%', height:'100%', position:'relative'}}>
    <ReactPlayer 
    url='https://www.youtube.com/watch?v=dVBsTW2uOYk&pp=ygURc2t5ZGl2aW5nIHl1Y2F0YW4%3D'
    width='100%'
    height='100%'
    position='absolute'
    controls
    loop
    />
   </div>

 <Card className="justify-center items-center ">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
        <h4 className="font-bold text-large">Tipo de Reservaciones</h4>
        <small className="text-default-500">Reserva a tu gusto</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2 ">
    <Accordion variant="splitted" className="">
    <AccordionItem key="1" aria-label="Accordion 1" title=" 1" className="">
    {defaultContent}
    <div className="justify-end ">
    <Link to={`/ShoppingCart`}>
    <Button color="primary">
        Reservar
    </Button>
    </Link>
    </div>
    </AccordionItem>
    <AccordionItem key="2" aria-label="Accordion 2" title=" 2" className="">
    {defaultContent}
    <div className="justify-end">
    <Link to={`/ShoppingCart`}>
    <Button color="primary">
        Reservar
    </Button>
    </Link>
    </div>
    </AccordionItem>
    <AccordionItem key="3" aria-label="Accordion 3" title=" 3" className="">
    {defaultContent}
    <div className="justify-end">
    <Link to={`/ShoppingCart`}>
    <Link to={`/ShoppingCart`}>
    <Button color="primary">
        Reservar
    </Button>
    </Link>
    </Link>
    </div>
    </AccordionItem>
    </Accordion>
    </CardBody>
</Card>

 </div>
 
  );
}
