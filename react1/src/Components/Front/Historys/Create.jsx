import { useContext, useState, useRef } from 'react';
import FrontContext from '../FrontContext';
import getBase64 from '../../../Functions/getBase64';

function Create() {
  const { setCreateHistory } = useContext(FrontContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [maxSum, setMaxSum] = useState(0);
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
      });
  };

  const handleCreate = () => {
    const data = { title, content, maxSum, photo: photoPrint };
    setCreateHistory(data);
    setTitle('');
    setContent('');
    setMaxSum('0');
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  return (
    <div className="flex-column">
      <h2>Naujas prašymas</h2>
      <label>Prašymo pavadinimas: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Pavadinimas"
      />
      <label>Jūsų istorija: </label>
      <textarea
        rows="6"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Jūsų tekstas"
      ></textarea>
      <label>Reikiama suma eurais: </label>
      <input
        type="number"
        onChange={(e) => setMaxSum(e.target.value)}
        value={maxSum}
      />
      <label>Pridėkite nuotrauką: </label>
      <input
        className="photo-input"
        ref={fileInput}
        type="file"
        onChange={doPhoto}
      />
      {photoPrint ? (
        <div className="photo">
          <img src={photoPrint} alt="img" />
        </div>
      ) : null}
      <button type="button" onClick={handleCreate}>
        Sukurti
      </button>
    </div>
  );
}

export default Create;
