import { Hero,Companies, Courses, Achievement, Categories, Feedback, CTA, Footer } from './';
import {Divider} from "@nextui-org/react";
const HomeComponent = () => {
  return (
    <div className="">
        <Hero />
        <Divider className="my-1" />
        <Companies/> 
        <Divider className="my-1" />
        <Courses />
        <Divider className="my-1" />
        <Achievement />
        <Divider className="my-1" />
        {/* <Categories /> */}
        <Divider className="my-1" />
        <Feedback />
        <Divider className="my-1" />
        <CTA />
        <Divider className="my-1" />
        
    </div>
  )
}

export default HomeComponent
