import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Baixa");
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // 🔹 Carregar do LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("@taskflow_data");
    if (saved) setTaskList(JSON.parse(saved));
  }, []);

  // 🔹 Salvar no LocalStorage
  useEffect(() => {
    localStorage.setItem("@taskflow_data", JSON.stringify(taskList));
  }, [taskList]);

  // 🔹 Adicionar tarefa
  const addTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: taskText,
      priority,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };

    setTaskList([newTask, ...taskList]);
    setTaskText("");
  };

  // 🔹 Concluir/Reabrir
  const toggleTask = (id) => {
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // 🔹 Deletar com confirmação
  const deleteTask = (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir?");
    if (!confirmDelete) return;

    setTaskList(taskList.filter(t => t.id !== id));
  };

  // 🔹 Iniciar edição
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  // 🔹 Salvar edição
  const saveEdit = (id) => {
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, text: editText } : t
    ));
    setEditingId(null);
    setEditText("");
  };

  // 🔹 Ordenação por prioridade
  const priorityOrder = {
    "Alta": 1,
    "Média": 2,
    "Baixa": 3
  };

  // 🔹 Filtrar + Buscar + Ordenar
  const filteredTasks = taskList
    .filter(t => {
      if (filter === "Pendentes") return !t.completed;
      if (filter === "Concluídas") return t.completed;
      return true;
    })
    .filter(t =>
      t.text.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <div className="app-container">
      <header>
        <h1>TaskFlow</h1>
        <p>Gestão de Produtividade</p>
      </header>

      {/* 🔹 FORM */}
      <section className="form-section">
        <form onSubmit={addTask}>
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Descrição da tarefa..."
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <button type="submit">Criar</button>
        </form>
      </section>

      {/* 🔹 BUSCA */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Buscar tarefa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* 🔹 FILTRO */}
      <section className="filter-section">
        {["Todas", "Pendentes", "Concluídas"].map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      {/* 🔹 LISTA */}
      <main className="task-grid">
        {filteredTasks.map(item => (
          <div
            key={item.id}
            className={`task-card ${item.priority.toLowerCase()} ${item.completed ? 'done' : ''}`}
          >
            <div className="task-content">
              {editingId === item.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(item.id)}>Salvar</button>
                </>
              ) : (
                <>
                  <h3>{item.text}</h3>
                  <span>Prioridade: {item.priority}</span>
                  <small>Criada em: {item.createdAt}</small>
                </>
              )}
            </div>

            <div className="task-actions">
              <button onClick={() => toggleTask(item.id)}>
                {item.completed ? "Reabrir" : "Concluir"}
              </button>

              <button onClick={() => startEdit(item)}>
                Editar
              </button>

              <button
                onClick={() => deleteTask(item.id)}
                className="delete"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;