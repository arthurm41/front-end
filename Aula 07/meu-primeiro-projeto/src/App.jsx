import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div>
      <h1>Olá, React!</h1>
      <p>Estou alterando meu primeiro componente.</p>

      <Saudacao />
      <Perfil />
      <Painel />

      <CardUsuario nome="Ramos Gamer" idade={25} cidade="São Paulo" />

      {/* Chamando o novo componente */}
      <Painel2 />
    </div>
  )
}

export default App

function Saudacao() {
  return (
    <div style={{ backgroundColor: 'black', padding: '20px', borderRadius: '5px', marginTop: '10px' }}>
      <h2 style={{ color: 'white' }}>Olá, Aluno!</h2>
      <p>Este componente foi criado separadamente.</p>
    </div>
  )
}

function Perfil() {
  return (
    <div style={{ backgroundColor: 'purple', padding: '20px', borderRadius: '5px', marginTop: '10px' }}>
      <h2 style={{ color: 'white' }}>Perfil do Usuário</h2>
      <p>Nome: Ramos Gamer</p>
      <p>Email: ramos.gamer@example.com</p>
    </div>
  )
}

function Painel() {
  return (
    <div style={{ backgroundColor: 'blue', padding: '20px', borderRadius: '5px', marginTop: '10px' }}>
      <h2 style={{ color: 'white' }}>Painel de Controle</h2>
      <p>Aqui você pode gerenciar suas configurações.</p>
    </div>
  )
}

function CardUsuario({ nome, idade, cidade }) {
  return (
    <div style={{ backgroundColor: '#222', color: 'white', padding: '20px', borderRadius: '5px', marginTop: '10px' }}>
      <h2>{nome}</h2>
      <p>Idade: {idade}</p>
      <p>Cidade: {cidade}</p>
    </div>
  )
}

function Painel2() {
  const [mensagem, setMensagem] = useState('')

  return (
    <div style={{ background: 'black', padding: '15px', border: '1px dashed #ffffff', marginTop: '20px' }}>
      <h4>Escreva uma mensagem:</h4>

      <input
        type="text"
        placeholder="Digite sua mensagem aqui..."
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      />

      <p>
        O que você digitou: <span style={{ color: 'red' }}>{mensagem}</span>
      </p>
    </div>
  )
}

function PlacarFutebol({ nomeTimeA, nomeTimeB }) {
  // Criamos duas "caixinhas de memória" (States)
  const [golsA, setGolsA] = useState(0);
  const [golsB, setGolsB] = useState(0);

  return (
    <div style={{
      border: '3px solid #2e7d32',
      borderRadius: '15px',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f1f8e9',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '400px',
      margin: '20px auto'
    }}>
      <h2 style={{ color: '#1b5e20' }}>⚽ Placar do Jogo</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

        {/* Lado do Time A */}
        <div>
          <h3>{nomeTimeA}</h3>
          <h1 style={{ fontSize: '48px', margin: '10px 0' }}>{golsA}</h1>
          <button onClick={() => setGolsA(golsA + 1)} style={botaoEstilo}>
            GOL!
          </button>
        </div>

        <h1 style={{ margin: '0 20px' }}>X</h1>

        {/* Lado do Time B */}
        <div>
          <h3>{nomeTimeB}</h3>
          <h1 style={{ fontSize: '48px', margin: '10px 0' }}>{golsB}</h1>
          <button onClick={() => setGolsB(golsB + 1)} style={botaoEstilo}>
            GOL!
          </button>
        </div>

      </div>

      <hr style={{ margin: '20px 0' }} />

      <button
        onClick={() => { setGolsA(0); setGolsB(0); }}
        style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Reiniciar Partida 🔄
      </button>
    </div>
  );
}

// Estilo simples para os botões de GOL
const botaoEstilo = {
  backgroundColor: '#2e7d32',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  fontWeight: 'bold'
};