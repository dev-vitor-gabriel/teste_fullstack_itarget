import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useRouter } from 'next/router'; // Importa o useRouter do next/router
import '../index.css';

type Event = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  status: boolean;
};

type FormData = {
  id_evento_tbi: number;
  nome_inscricao_tbi: string;
  cpf_inscricao_tbi: string;
  email_inscricao_tbi: string;
};

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter(); // Inicializa o useRouter

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://demo.ws.itarget.com.br/event.php');
        const eventsArray = Array.isArray(response.data.data) ? response.data.data : [];
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

  const checkDateConflict = async (cpf: string, event: Event) => {
    try {
      const response = await axios.get('http://localhost/api/inscricao', {
        params: { cpf }
      });
      const existingRegistrations = response.data;
      const eventStartDate = new Date(event.start_date);
      const eventEndDate = new Date(event.end_date);

      for (const registration of existingRegistrations) {
        const registeredEvent = events.find(e => e.id === registration.id_evento_tbi);
        if (registeredEvent) {
          const registeredEventStartDate = new Date(registeredEvent.start_date);
          const registeredEventEndDate = new Date(registeredEvent.end_date);

          if (
            (eventStartDate <= registeredEventEndDate && eventEndDate >= registeredEventStartDate)
          ) {
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      console.error('Erro ao verificar conflito de datas:', error);
      return false;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async data => {
    setSubmitting(true);
    const selectedEvent = events.find(event => event.id === data.id_evento_tbi);
    if (selectedEvent) {
      const hasConflict = await checkDateConflict(data.cpf_inscricao_tbi, selectedEvent);
      if (hasConflict) {
        toast.error('Você já está inscrito em outro evento no mesmo período.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSubmitting(false);
        return;
      }
    }

    try {
      await axios.post('http://localhost/api/inscricao', data);
      toast.success('Inscrição realizada com sucesso!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Erro ao realizar inscrição.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewRegistrations = () => {
    router.push('/inscritos'); // Redireciona para a página de inscritos
  };

  const handleBackToHome = () => {
    router.push('/'); // Redireciona para a página inicial
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="back-to-home" onClick={handleBackToHome}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 19L3 12L10 5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 12H21" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Voltar para Home</span>
      </div>
      <h1>Inscrição para o Evento</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Nome:</label>
          <input {...register('nome_inscricao_tbi', { required: true })} />
          {errors.nome_inscricao_tbi && <span className="error-message">Campo obrigatório</span>}
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <InputMask
            mask="999.999.999-99"
            {...register('cpf_inscricao_tbi', { required: true })}
            onChange={(e) => setValue('cpf_inscricao_tbi', e.target.value)}
          />
          {errors.cpf_inscricao_tbi && <span className="error-message">Campo obrigatório</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input {...register('email_inscricao_tbi', { required: true })} />
          {errors.email_inscricao_tbi && <span className="error-message">Campo obrigatório</span>}
        </div>
        <div className="form-group">
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
          {errors.id_evento_tbi && <span className="error-message">Campo obrigatório</span>}
        </div>
        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? <div className="spinner"></div> : 'Inscrever'}
        </button>
        <button onClick={handleViewRegistrations} className="view-registrations-button">
          Ver Inscrições
        </button>
      </form>
    </div>
  );
};

export default Register;
