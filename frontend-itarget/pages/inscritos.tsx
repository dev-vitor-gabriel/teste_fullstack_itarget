import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Inscrito = {
  id: number;
  id_evento_tbi: number;
  nome_inscricao_tbi: string;
  cpf_inscricao_tbi: string;
  email_inscricao_tbi: string;
};

type Event = {
  id: number; // Alterado para 'id' em vez de 'id_evento_tbi'
  name: string; // Alterado para 'name' em vez de 'nome_evento_tbi'
};

const Inscritos: React.FC = () => {
  const [inscritos, setInscritos] = useState<Inscrito[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchInscritos = async () => {
      try {
        const response = await axios.get('http://localhost/api/inscricao', {
          params: { page, search }
        });
        setInscritos(response.data);
      } catch (error) {
        console.error('Erro ao buscar inscritos:', error);
      }
    };

    fetchInscritos();
  }, [page, search]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://demo.ws.itarget.com.br/event.php');
        setEvents(response.data.data); // Atribuir response.data.data em vez de response.data
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  const getEventName = (id: number) => {
    const event = events.find(event => event.id === id); // Alterado para 'id' em vez de 'id_evento_tbi'
    return event ? event.name : 'Evento desconhecido'; // Alterado para 'name' em vez de 'nome_evento_tbi'
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // Voltar para a primeira página ao iniciar a busca
  };

  const filteredInscritos = inscritos.filter(inscrito =>
    inscrito.nome_inscricao_tbi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Lista de Inscritos</h1>
      <input
        type="text"
        placeholder="Buscar por nome"
        value={search}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredInscritos.map(inscrito => (
          <li key={inscrito.id}>
            {inscrito.nome_inscricao_tbi} - {inscrito.cpf_inscricao_tbi} - {inscrito.email_inscricao_tbi} - {getEventName(inscrito.id_evento_tbi)}
          </li>
        ))}
      </ul>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Anterior
      </button>
      <button onClick={() => setPage(page + 1)}>Próxima</button>
    </div>
  );
};

export default Inscritos;
