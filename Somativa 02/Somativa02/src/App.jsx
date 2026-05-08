import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'eventList'

function App() {
  const [eventList, setEventList] = useState(() => {
    try {
      const storageValue = window.localStorage.getItem(STORAGE_KEY)
      return storageValue ? JSON.parse(storageValue) : []
    } catch (error) {
      console.error('Falha ao carregar eventos do localStorage', error)
      return []
    }
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [showStyleModal, setShowStyleModal] = useState(false)
  const [editEventId, setEditEventId] = useState(null)
  const [formState, setFormState] = useState({
    title: '',
    type: 'Workshop',
    description: '',
    vagas: '10',
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(eventList))
  }, [eventList])

  const visibleEvents = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase()
    return eventList
      .map((event, index) => ({ ...event, originalIndex: index }))
      .sort((a, b) => {
        if (a.type === 'Workshop' && b.type !== 'Workshop') return -1
        if (a.type !== 'Workshop' && b.type === 'Workshop') return 1
        return a.originalIndex - b.originalIndex
      })
      .filter((event) => {
        const matchesTitle = event.title.toLowerCase().includes(normalized)
        const matchesStatus =
          statusFilter === 'Todos' ||
          (statusFilter === 'Agendado' && event.status === 'Agendado') ||
          (statusFilter === 'Em Andamento' && event.status === 'Em Andamento') ||
          (statusFilter === 'Encerrado' && event.status === 'Encerrado')
        return matchesTitle && matchesStatus
      })
  }, [eventList, searchTerm, statusFilter])

  function updateFormField(event) {
    const { name, value } = event.target
    setFormState((previous) => ({ ...previous, [name]: value }))
  }

  function handleAddEvent(event) {
    event.preventDefault()

    const title = formState.title.trim()
    if (!title) return

    if (editEventId) {
      setEventList((previous) =>
        previous.map((item) =>
          item.id === editEventId
            ? {
                ...item,
                title,
                type: formState.type,
                description: formState.description.trim(),
                vagas: Number(formState.vagas),
              }
            : item,
        ),
      )
      setEditEventId(null)
    } else {
      setEventList((previous) => [
        ...previous,
        {
          id: Date.now(),
          title,
          type: formState.type,
          status: 'Agendado',
          description: formState.description.trim(),
          vagas: Number(formState.vagas),
        },
      ])
    }

    setFormState({
      title: '',
      type: 'Workshop',
      description: '',
      vagas: '10',
    })
  }

  function handleEnroll(eventId) {
    setEventList((previous) =>
      previous.map((item) =>
        item.id === eventId ? { ...item, vagas: Math.max(0, item.vagas - 1) } : item,
      ),
    )
  }

  function handleToggleStatus(eventId) {
    setEventList((previous) =>
      previous.map((item) => {
        if (item.id !== eventId) return item
        const nextStatus =
          item.status === 'Agendado'
            ? 'Em Andamento'
            : item.status === 'Em Andamento'
            ? 'Encerrado'
            : 'Agendado'
        return { ...item, status: nextStatus }
      }),
    )
  }

  function handleEditEvent(eventId) {
    const eventToEdit = eventList.find((item) => item.id === eventId)
    if (!eventToEdit) return

    setEditEventId(eventId)
    setFormState({
      title: eventToEdit.title,
      type: eventToEdit.type,
      description: eventToEdit.description || '',
      vagas: String(eventToEdit.vagas),
    })
  }

  function handleCancelEdit() {
    setEditEventId(null)
    setFormState({
      title: '',
      type: 'Workshop',
      description: '',
      vagas: '10',
    })
  }

  function handleDeleteEvent(eventId) {
    setEventList((previous) => previous.filter((item) => item.id !== eventId))
  }

  function handleClearSchedule() {
    if (window.confirm('Tem certeza que deseja limpar todo o cronograma?')) {
      setEventList([])
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <span className="eyebrow">Somativa 02</span>
          <h1>Gerenciamento Acadêmico de Eventos</h1>
          <p className="subtitle">
            Controle inscrições, visualize workshops fixados e filtre por título em tempo real.
          </p>
        </div>
        <button type="button" className="danger-button" onClick={handleClearSchedule}>
          Limpar Cronograma
        </button>
      </header>

      <section className="hero-panel">
        <div className="search-box">
          <label htmlFor="search">Buscar eventos</label>
          <input
            id="search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Digite aqui o título do evento"
          />
        </div>

        <form className="event-form" onSubmit={handleAddEvent}>
          <h2>{editEventId ? 'Editar evento' : 'Adicionar novo evento'}</h2>

          <label>
            Título do evento
            <input
              name="title"
              type="text"
              value={formState.title}
              onChange={updateFormField}
              placeholder="Ex: Workshop de React"
            />
          </label>

          <label>
            Tipo
            <select name="type" value={formState.type} onChange={updateFormField}>
              <option value="Workshop">Workshop</option>
              <option value="Palestra">Palestra</option>
              <option value="Mesa-redonda">Mesa-redonda</option>
              <option value="Painel">Painel</option>
            </select>
          </label>

          <label>
            Vagas disponíveis
            <select name="vagas" value={formState.vagas} onChange={updateFormField}>
              <option value="10">10 vagas</option>
              <option value="30">30 vagas</option>
              <option value="50">50 vagas</option>
            </select>
          </label>

          <label>
            Descrição
            
            <textarea
              name="description"
              value={formState.description}
              onChange={updateFormField}
              placeholder="Descrição breve do evento"
              rows="3"
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="primary-button">
              {editEventId ? 'Salvar alterações' : 'Criar evento'}
            </button>
            {editEventId && (
              <button type="button" className="secondary-button" onClick={handleCancelEdit}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="status-bar">
        <div>
          <strong>{visibleEvents.length}</strong> evento(s) exibido(s)
        </div>
        <div>{searchTerm ? `Filtro aplicado: ${searchTerm}` : 'Pesquisa em tempo real ativa'}</div>
      </section>

      <section className="status-filter">
        {['Todos', 'Agendado', 'Em Andamento', 'Encerrado'].map((option) => (
          <button
            key={option}
            type="button"
            className={statusFilter === option ? 'active' : ''}
            onClick={() => setStatusFilter(option)}
          >
            {option}
          </button>
        ))}
      </section>

      <section className="event-grid">
        {visibleEvents.length === 0 ? (
          <div className="empty-state">Nenhum evento encontrado. Crie um novo evento ou limpe o filtro.</div>
        ) : (
          visibleEvents.map((event) => (
            <article
            key={event.id}
            className={`event-card ${event.type.toLowerCase()} ${event.status.toLowerCase().replace(' ', '-')}
              ${event.type === 'Workshop' ? 'pinned-workshop' : ''}`}
          >
              <div className="card-header">
                <h3>{event.title}</h3>
                <span className="chip">{event.type}</span>
              </div>
              <p className="event-description">{event.description || 'Sem descrição adicional.'}</p>
              <div className="event-status-row">
                <span className="status-badge">Status: {event.status}</span>
                <small>Registrado em: {event.date || 'não informado'}</small>
              </div>
              <div className="event-meta">
                <span>Vagas: {event.vagas}</span>
                <div className="event-actions">
                  <button
                    type="button"
                    className="status-btn"
                    onClick={() => handleToggleStatus(event.id)}
                  >
                    {event.status === 'Agendado'
                      ? 'Iniciar'
                      : event.status === 'Em Andamento'
                      ? 'Encerrar'
                      : 'Reiniciar'}
                  </button>
                  <button
                    type="button"
                    className="enroll-button"
                    disabled={event.vagas <= 0}
                    onClick={() => handleEnroll(event.id)}
                  >
                    {event.vagas > 0 ? 'Inscrever Aluno' : 'Esgotado'}
                  </button>
                  <button
                    type="button"
                    className="secondary-button edit-button"
                    onClick={() => handleEditEvent(event.id)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="secondary-button delete-button"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      <button className="fab" type="button" onClick={() => setShowStyleModal(true)} aria-label="Abrir modal de estilo">
        <img src="/favicon.svg" alt="Ícone de estilo" />
      </button>

      {showStyleModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card">
            <header className="modal-header">
              <h2>Alterações de estilo aplicadas</h2>
              <button className="close-modal" type="button" onClick={() => setShowStyleModal(false)}>
                ×
              </button>
            </header>
            <div className="modal-body">
              <p>O site agora inclui as seguintes alterações visuais marcantes:</p>
              <ul>
                <li>Fundo gradiente amplo com cards em blocos sólidos e sombra acentuada.</li>
                <li>Grid responsivo para eventos e formulário de criação integrados à interface.</li>
                <li>Botão flutuante redondo no canto inferior direito com o favicon do projeto.</li>
              </ul>
            </div>
            <button className="secondary-button" type="button" onClick={() => setShowStyleModal(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
