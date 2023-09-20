import {useState} from 'react'
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";


import MailIconComponent from './Icons/MailIconComponent';
import EyeFilledIconComponent from "./Icons/EyeFilledIconComponent";
import EyeSlashFilledIconComponent from "./Icons/EyeSlashFilledIconComponent";
  export default function LoginComponent() {
    const [isVisible, setIsVisible] = useState(false);
    const [selected, setSelected] = useState("login");
    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        

<div className="flex flex-col  items-center py-10 px-10">
<Card className="max-w-full max-h-full w-[340px] h-[400px]">
  <CardBody className="overflow-hidden">
    <Tabs
      fullWidth
      size="md"
      aria-label="Tabs form"
      selectedKey={selected}
      onSelectionChange={setSelected}
    >
      <Tab key="login" title="Login">
        <form className="flex flex-col gap-4">
        <Input
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    startContent={
                        <MailIconComponent className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    />
                    <Input
                    label="Password"
                    labelPlacement="outside"
                    placeholder="Enter your password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                            <EyeSlashFilledIconComponent className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        ) : (
                            <EyeFilledIconComponent className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    
                    />
          <p className="text-center text-small">
            Need to create an account?{" "}
            <Link size="sm" onPress={() => setSelected("sign-up")}>
              Sign up
            </Link>
          </p>
          <div className="flex gap-2 justify-end">
            <Button fullWidth color="primary">
              Login
            </Button>
          </div>
        </form>
      </Tab>
      <Tab key="sign-up" title="Sign up">
        <form className="flex flex-col gap-4 h-[300px]">
          <Input isRequired label="Name" placeholder="Enter your name" type="password" />
          <Input isRequired label="Email" placeholder="Enter your email" type="email" />
          <Input
            isRequired
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <p className="text-center text-small">
            Already have an account?{" "}
            <Link size="sm" onPress={() => setSelected("login")}>
              Login
            </Link>
          </p>
          <div className="flex gap-2 justify-end">
            <Button fullWidth color="primary">
              Sign up
            </Button>
          </div>
        </form>
      </Tab>
    </Tabs>
  </CardBody>
</Card>
</div>
    );
  }