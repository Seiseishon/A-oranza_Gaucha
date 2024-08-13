import React from 'react';
import '../styles/home.css'

function Home() {
    return (
     <div>
        <header className='title'>
          <div>
             <p>Añoranza Gaucha</p>
          </div>
        </header>
        <nav>
          <div className='navBar'>
              <span> <a href='#'> Nuestras Redes </a> </span>
              <span> <a href='#'> Cursos </a> </span>
              <span> <a href='#'> Sobre nosotros </a> </span>
              <span> <a href="#"> Como me inscribo? </a> </span>
            </div>
          </nav>
     </div>
    );
  }

export default Home;