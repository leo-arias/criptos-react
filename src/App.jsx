import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import ImagenCripto from './img/imagen-criptos.png'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    width: 90%;
    
    @media (min-width: 922px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
`

const Imagen = styled.img`
    max-width: 400px;
    width: 80%;
    margin: 100px auto 0 auto;
    display: block;
`

const Heading = styled.h1`
    font-family: 'Lato', sans-serif;
    color: #fff;
    text-align: center;
    font-weight: 700;
    margin-top: 80px;
    margin-bottom: 50px;
    font-size: 34px;

    &::after {
        content: '';
        width: 100px;
        height: 6px;
        background-color: #66A2FE;
        display: block;
        margin: 10px auto 0 auto;
    }
`

function App() {

    const [monedas, setMonedas] = useState({})
    const [resultado, setResultado] = useState({})
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        if(Object.keys(monedas).length > 0) {
            const cotizarCripto = async () => {
                setCargando(true)
                setResultado({})
                const { moneda, cripto } = monedas
                const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setResultado(resultado.DISPLAY[cripto][moneda])
                setCargando(false)
            }

            cotizarCripto()
        }
    }, [monedas])

    return (
        <Contenedor>
            <Imagen src={ImagenCripto} alt="Imagen de criptomonedas" />

            <div>
                <Heading>Cotiza criptomonedas al instante</Heading>

                <Formulario 
                    setMonedas={setMonedas}
                />

                {cargando && <Spinner />}
                {resultado.PRICE && <Resultado resultado={resultado} />}
            </div>

        </Contenedor>
    )
}

export default App
