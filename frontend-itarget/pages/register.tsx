import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Importa o useHistory

type Event = {
  id: number;
  name: string;
  status: boolean; // Adicione a propriedade 'status' ao tipo Event
};

type FormData = {
  id_evento_tbi: number;
  nome_inscricao_tbi: string;
  cpf_inscricao_tbi: string;
  email_inscricao_tbi: string;
};

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
//   const history = useHistory(); // Inicializa o useHistory

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://demo.ws.itarget.com.br/event.php');
        const eventsArray = Array.isArray(response.data.data) ? response.data.data : [];
        // Filtra apenas os eventos com status true
        const filteredEvents = eventsArray.filter((event: Event) => event.status === true);
        setEvents(filteredEvents);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        setError('Falha ao carregar eventos');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      await axios.post('http://localhost/api/inscricao', data);
      alert('Inscrição realizada com sucesso!');
      history.push('/inscritos'); // Redireciona para a página /inscritos após a inscrição
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao realizar inscrição.');
    }
  };

  return (
    <div>
      <h1>Inscrição para o Evento</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome:</label>
          <input {...register('nome_inscricao_tbi', { required: true })} />
          {errors.nome_inscricao_tbi && <span>Campo obrigatório</span>}
        </div>
        <div>
          <label>CPF:</label>
          <input {...register('cpf_inscricao_tbi', { required: true })} />
          {errors.cpf_inscricao_tbi && <span>Campo obrigatório</span>}
        </div>
        <div>
          <label>Email:</label>
          <input {...register('email_inscricao_tbi', { required: true })} />
          {errors.email_inscricao_tbi && <span>Campo obrigatório</span>}
        </div>
        <div>
          <label>Evento:</label>
          <select {...register('id_evento_tbi', { required: true })}>
            {loading ? (
              <option disabled>Carregando eventos...</option>
            ) : error ? (
              <option disabled>{error}</option>
            ) : (
              events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))
            )}
          </select>
          {errors.id_evento_tbi && <span>Campo obrigatório</span>}
        </div>
        <button type="submit">Inscrever</button>
      </form>
    </div>
  );
};

export default Register;
