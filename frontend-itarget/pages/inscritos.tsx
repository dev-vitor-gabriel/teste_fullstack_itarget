import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable, { createTheme } from 'react-data-table-component';
import styled from 'styled-components';

type Inscrito = {
  id: number;
  id_evento_tbi: number;
  nome_inscricao_tbi: string;
  cpf_inscricao_tbi: string;
  email_inscricao_tbi: string;
};

type Event = {
  id: number;
  name: string;
};

// Criando um tema customizado para o DataTable
createTheme('custom', {
  text: {
    primary: '#212529',
    secondary: '#6c757d',
  },
  background: {
    default: '#f8f9fa',
  },
  context: {
    background: '#e9ecef',
    text: '#212529',
  },
  divider: {
    default: '#dee2e6',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #495057;
  font-size: 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Inscritos: React.FC = () => {
  const [inscritos, setInscritos] = useState<Inscrito[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchInscritos = async () => {
      try {
        const response = await axios.get('http://localhost/api/inscricao', {
          params: { search }
        });
        setInscritos(response.data);
      } catch (error) {
        console.error('Erro ao buscar inscritos:', error);
      }
    };

    fetchInscritos();
  }, [search]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://demo.ws.itarget.com.br/event.php');
        setEvents(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  const getEventName = (id: number) => {
    const event = events.find(event => event.id === id);
    return event ? event.name : 'Evento desconhecido';
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const columns = [
    {
      name: 'Nome',
      selector: (row: Inscrito) => row.nome_inscricao_tbi,
      sortable: true,
    },
    {
      name: 'CPF',
      selector: (row: Inscrito) => row.cpf_inscricao_tbi,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: Inscrito) => row.email_inscricao_tbi,
      sortable: true,
    },
    {
      name: 'Evento',
      selector: (row: Inscrito) => getEventName(row.id_evento_tbi),
      sortable: true,
    },
  ];

  const filteredInscritos = inscritos.filter(inscrito =>
    inscrito.nome_inscricao_tbi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Title>Lista de Inscritos</Title>
      <SearchInput
        type="text"
        placeholder="Buscar por nome"
        value={search}
        onChange={handleSearchChange}
      />
      <DataTable
        columns={columns}
        data={filteredInscritos}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        striped
        theme="custom"
      />
    </Container>
  );
};

export default Inscritos;
