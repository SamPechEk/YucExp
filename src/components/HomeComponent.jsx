import { Hero,Companies, Courses, Achievement, Categories, Feedback, CTA, Footer } from './';
import {Divider} from "@nextui-org/react";
const HomeComponent = () => {
  return (
    <div className="">
        <Hero />
        <Divider className="my-4" />
        <Companies/> 
        <Divider className="my-4" />
        <Courses />
        <Divider className="my-4" />
        <Achievement />
        <Divider className="my-4" />
        {/* <Categories /> */}
        <Divider className="my-4" />
        <Feedback />
        <Divider className="my-4" />
        <CTA />
        <Divider className="my-4" />
        <Footer />
    </div>
  )
}

export default HomeComponent
