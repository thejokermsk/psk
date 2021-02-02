import Head from 'next/head'

export function MainLayout({ children, address = '', phone = '', email = '' }) {
  return (
    <> 
      <Head>
        <meta charSet="utf-8" />
        <title>ПСК-Девелопмент</title>
        <base href="/" />
        <meta name="viewport" content="width=520, initial-scale=0" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <header className="header" id="home">
        <div className="header-top">
          <div className="container">
            <div className="left">
              <a className="header-top__link">Заказать звонок</a>
            </div>
            <div className="right">
              { address.length !== 0 && <p className="address">Адрес: <span> {address} </span></p> }
              { phone.length !== 0 && <p>Телефон: <span><a href={'tel:' + phone.replace(/[^\d|\+]/gm, '')}> { phone } </a></span></p>} 
            </div>
          </div>
        </div>
        <div className="header-bottom wrap">
          <div className="container">
            <div className="left">
              <div className="logo">
                <a href="/"><img src="images/logo.jpg"/></a>
              </div>
            </div>
            <div className="right">
              <nav>
                <a href="#build" className="anchor address">О Компании</a>
                <a href="#service" className="anchor">Направления деятельности</a>
                <a href="#verify" className="anchor address">Сертификаты</a>
                <a href="#callback" className="anchor address">Контакты</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      
      <main className="content wrap">
        <div className="container">
          {children}
        </div>
      </main>


      <footer>
        <div className="container">
          { address.length !== 0 && <p className="address">Адрес: <span> {address} </span></p> }
          { phone.length !== 0 && <p>Телефон: <span><a href={'tel:' + phone.replace(/[^\d|\+]/gm, '')}> { phone } </a></span></p>} 
          { email.length !== 0 && <p>Email: <span><a href={'mailto:' + email}>{ email }</a></span></p>} 
        </div>
      </footer>
    </>
  )
}