import dynamic from 'next/dynamic'

import * as React from 'react';

import { MainLayout } from "../layouts/MainLayout";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Modal } from '../components/Modal';

const OwlCarousel = dynamic(() => import('react-owl-carousel') , {ssr: false})

export default function Home({ 
  contact, 
  build, 
  categories, 
  slider, 
  verify 
}) {

  return (
    <MainLayout address={contact.address} phone={contact.phone} email={contact.email}> 
      {slider.length !== 0 &&
      <OwlCarousel className='owl-theme row sliding' loop items={1} margin={10}>
        {slider.map((img, idx) => (
          <div className='item' key={idx}>
            <img src={"/media/" + img.img_path}/>
          </div>
        ))}
        
      </OwlCarousel>
      }
      {Object.keys(build).length !== 0 && 
      <section className="page wrap" id="build">
        <div className="container">
          <div className="page-title">
            <h1>О компании</h1>
          </div>
          <div className="page-descr" dangerouslySetInnerHTML={{__html: build.description}}></div>
        </div>
      </section>
      }

      { categories.length !== 0 &&
      <section className="page" id="service">
        <div className="container">
          <div className="page-title">
            <h1>Направления деятельности</h1>
          </div>
          <div className="page-items">
            {categories.map(category => (
              <div className="page-item" key={category.id}>
                <img src={'media/' + category.img_path}/>
                <p>{category.name}</p>

                {!category.callback &&
                  <Modal text="Оставить заявку" service={category.name} />
                }
              </div>
            ))}
          </div>
        </div>
      </section>
      }

      {verify.length !== 0 &&
      <section className="page" id="verify">
        <div className="page-title">
          <h1>Сертификаты</h1>
        </div>

        <OwlCarousel 
          className='owl-theme row sliding' 
          loop 
          dots={true}
          responsive={{
            0: {
              items: 1
            },
            768: {
              items: 2
            },
      
            1170: {
              items: 3
            }
          }} 
          margin={10}
        >

        {verify.map((img, idx) => (
          <div className='item' key={idx}>
            <img src={"/media/" + img.img_path}/>
          </div>
        ))}
        
      </OwlCarousel>

      </section>
      }

    <section className="page" id="callback">
      <div className="page-title">
        <h1>Контакты</h1>
      </div>

      <div className="callback">
        <div className="left">
          <div><span className="material-icons">call</span></div>

          <p>Адрес: <br/> <span>{contact.address}</span></p>
          <p>Телефон: <br/> <span><a href={'tel:' + contact.phone.replace(/[^\d|\+]/gm, '')}>{contact.phone}</a></span></p>
          <p>Email: <br/> <span><a href={'mailto:' + contact.email}>{contact.email}</a></span></p>
        </div>
        <div className="right page--bg-blue">
          <div className="input-field">
            <label htmlFor="first_name">Ваше имя:</label>
            <input id="first_name" type="text"  required/>
          </div>
          <div className="input-field">
            <label htmlFor="email">Ваш e-mail:</label>
            <input id="email" type="email" required/>
          </div>
          <div className="input-field">
            <label htmlFor="phone">Ваш телефон:</label>
            <input id="phone" type="text"/>
          </div>
          <div className="input-field">
            <label htmlFor="message">Вашe сообщение:</label>
            <textarea id="message" aria-required></textarea>
          </div>
          <div className="wrap">
            <button>
              Оставить заявку
            </button>
          </div>
        </div>


      </div>
    </section>

    </MainLayout>
  )
}

export async function getServerSideProps({query, req}) {
  const url = 'http://localhost:3000'
  const 
    contact     = await fetch(url + '/api/contact'),
    build       = await fetch(url + '/api/build'),
    categories  = await fetch(url + '/api/categories'),
    slider      = await fetch(url + '/api/slider'),
    verify      = await fetch(url + '/api/verify')

  return {props: 
    { 
      contact: await contact.json(),
      build: await build.json(), 
      categories: await categories.json(),
      slider: await slider.json(),
      verify: await verify.json()
    }
  }
}