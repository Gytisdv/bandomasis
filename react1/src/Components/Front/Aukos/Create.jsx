import { useContext, useState } from 'react';
import FrontContext from '../FrontContext';

function Create({ nr }) {
  const { setCreateAuka } = useContext(FrontContext);

  const [name, setName] = useState('');
  const [sum, setSum] = useState(0);

  const handleCreate = () => {
    const data = { name, sum, auk_id: nr };
    setCreateAuka(data);
    setName('');
    setSum(0);
  };

  return (
    <div className="auku-create flex-column">
      <h4>Aukoti galite čia: </h4>
      <label>Jūsų vardas: </label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Vardas"
      />
      <label>Aukojama suma: </label>
      <input
        type="number"
        onChange={(e) => setSum(e.target.value)}
        value={sum}
      />
      <button type="button" onClick={handleCreate}>
        Aukoti
      </button>
    </div>
  );
}

export default Create;
