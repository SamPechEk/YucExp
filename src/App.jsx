import { Hero, Navbar,Companies, Courses, Achievement, Categories, Feedback, CTA, Footer } from './components';
import FormularioAdminComponent from './components/FormularioAdminComponent';
import ActividadesComponent from './components/ActividadesComponents';

import './App.css'

const App = () => {
  return (
    <div>
            <ActividadesComponent />
      <Hero />
      <Companies/>
      <Courses />
      <Achievement />
      <Categories />
      <Feedback />
      <CTA />
      <Footer />
      <FormularioAdminComponent />

    </div>
  )};


export default App
