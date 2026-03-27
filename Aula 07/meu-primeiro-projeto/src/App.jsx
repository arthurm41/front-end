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

