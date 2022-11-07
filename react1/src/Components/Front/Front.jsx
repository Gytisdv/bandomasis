import Nav from './Nav';
import FrontContext from './FrontContext';
import Create from './Historys/Create';
import List from './Historys/List';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Front({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createHistory, setCreateHistory] = useState(null);
  const [historys, setHistorys] = useState(null);
  const [aukos, setAukos] = useState(null);
  const [createAuka, setCreateAuka] = useState(null);

  useEffect(() => {
    if (null === createHistory) return;
    axios.post('http://localhost:3003/create', createHistory).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [createHistory]);

  useEffect(() => {
    axios
      .get('http://localhost:3003/historys')
      .then((res) => setHistorys(res.data));
  }, [lastUpdate]);
  console.log(historys);

  useEffect(() => {
    if (null === createAuka) return;
    axios.post('http://localhost:3003/aukos', createAuka).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [createAuka]);

  useEffect(() => {
    axios.get('http://localhost:3003/aukos').then((res) => setAukos(res.data));
  }, [lastUpdate]);

  return (
    <FrontContext.Provider
      value={{ setCreateHistory, historys, aukos, setCreateAuka }}
    >
      {show === 'list' ? (
        <div className="front">
          <Nav />
          <List />
        </div>
      ) : show === 'create' ? (
        <div className="create">
          <Nav />
          <Create />
        </div>
      ) : null}
    </FrontContext.Provider>
  );
}

export default Front;
