import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import BackContext from './BackContext';
import List from './Historys/List';

function Back() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [historys, setHistorys] = useState(null);
  const [editHistory, setEditHistory] = useState(null);
  const [deleteHistory, setDeleteHistory] = useState(null);

  const [aukos, setAukos] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3003/admin/historys', authConfig())
      .then((res) => setHistorys(res.data));
  }, [lastUpdate]);
  console.log(historys);

  useEffect(() => {
    axios
      .get('http://localhost:3003/admin/aukos', authConfig())
      .then((res) => setAukos(res.data));
  }, [lastUpdate]);

   useEffect(() => {
    if (null === editHistory) return;
    axios
      .put(
        'http://localhost:3003/admin/historys/' + editHistory.id,
        editHistory,
        authConfig()
      )
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [editHistory]);


  useEffect(() => {
    if (null === deleteHistory) return;
    axios
      .delete(
        'http://localhost:3003/admin/historys/' + deleteHistory.id,
        authConfig()
      )
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [deleteHistory]);

  return (
    <BackContext.Provider
      value={{ historys, aukos, setEditHistory, setDeleteHistory }}
    >
      <Link className="logout" to="/logout">
        Logout
      </Link>
      <List />
    </BackContext.Provider>
  );
}

export default Back;
