import React, { useState } from 'react';
import WidgetBox from '../../buildingwidgets/buildingwidget';
import './Ticket.css';

const Ticket: React.FC = () => {
  const [name, setName] = useState('');
  const [StudNr, setStudNr] = useState<number | ''>('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:500/api/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, StudNr, email, subject, question }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('✅ Ticket submitted successfully!');
        setName('');
        setStudNr('');
        setEmail('');
        setSubject('');
        setQuestion('');
      } else {
        setMessage('❌ Error: ' + result.error);
      }
    } catch (err) {
      setMessage('❌ Submission failed.');
      console.error(err);
    }
  };

  return (
    <div className="Newticket-widgets">
      <WidgetBox className="ticket-widget">
        <h2 className='Newticket-text'><span className='parttext'>Nieuw</span> Ticket</h2>
        <form onSubmit={handleSubmit} className="ticket-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className='Name-input'
          />
          <input
            type="number"
            placeholder="StudNr"
            value={StudNr}
            onChange={e => {
              const value = e.target.value;
              setStudNr(value === '' ? '' : Number(value));
            }}
            required
            className='StudNr-input'
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className='Email-input'
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
            className='Subject-input'
          />
          <textarea
            placeholder="Your question"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            required
            className='Question-input'
          />

                  <button className="SubmitTicket" type="submit">Submit Ticket</button>
        </form>

        {message && <p>{message}</p>}
      </WidgetBox>
    </div>
  );
};




export default Ticket;