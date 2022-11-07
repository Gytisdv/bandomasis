import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Line({ line }) {
  const { aukos, setEditHistory, setDeleteHistory } = useContext(BackContext);
  const [approve, setApprove] = useState(line.status);
 
  const handleEdit = () => {
    const data = {
      id: line.id,
      status: approve ? 1 : 0,
    };
    setEditHistory(data);
  };

  let totalSum = 0;
  if (aukos) {
    aukos.map((a) => (a.ist_id === line.id ? (totalSum += a.sum) : null));
  }
  const handleDelete = () => {
    setDeleteHistory(line);
  };

  console.log(line);
  return (
    <li>

      <div className="flex-column fixed-width">
        {line.photo ? (
          <div className="photo">
            <img src={line.photo} alt="img" />
          </div>
        ) : null}
        <div className="istorija">
          <h2>{line.title}</h2>
          <p>{line.content}</p>
        </div>
        <div className="flex-column">
          <b>Reikiama suma: {line.max_sum} eu.</b>
          <b>Paaukota suma: {totalSum} eu.</b>
          {totalSum < line.max_sum ? (
            <b>
              Trūksta:{' '}
              <span style={{ color: 'red' }}>{line.max_sum - totalSum}</span>{' '}
              eu.
            </b>
          ) : null}
        </div>
      </div>
      <div className="aprovas">
        <b> Statusas: {approve ? 'Patvirtintas' : 'Laukia'}</b>
        <input
          className="checkbox"
          type="checkbox"
          checked={approve}
          onChange={() => setApprove((i) => (i === 0 ? 1 : 0))}
        />
        {/* </p> */}
        <button type="button" onClick={handleEdit}>
          Išsaugoti
        </button>
        <button type="button" onClick={handleDelete}>
          Ištrinti
        </button>
      </div>
    </li>
  );
}

export default Line;
