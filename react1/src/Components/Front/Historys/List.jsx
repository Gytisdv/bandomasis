import { useContext } from 'react';
import Line from './Line';
import FrontContext from '../FrontContext';

function List() {
  const { historys } = useContext(FrontContext);

  return (
    <>
      <div className="list front-list">
        <h1>Istorijos ir idėjos</h1>
        <ul>
          {historys
            ? historys.map((c, i) =>
                c.status ? <Line key={i} line={c}></Line> : null
              )
            : null}
        </ul>
      </div>
    </>
  );
}

export default List;
