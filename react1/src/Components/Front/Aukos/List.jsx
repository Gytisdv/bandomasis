import { useContext } from 'react';
import Line from './Line';
import FrontContext from '../FrontContext';

function List({ nr }) {
  const { aukos } = useContext(FrontContext);

  return (
    <>
      <div className="aukos">
        <h3>Aukojimo istorija: </h3>
        <ul>
          {aukos
            ? aukos.map((c, i) =>
                c.ist_id === nr ? <Line key={i} line={c}></Line> : null
              )
            : null}
        </ul>
      </div>
    </>
  );
}

export default List;
