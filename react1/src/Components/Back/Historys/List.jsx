import { useContext } from 'react';
import Line from './Line';
import BackContext from '../BackContext';

function List() {
  const { historys } = useContext(BackContext);
  console.log(historys);
  return (
    <div className="back">
      <h2> Istorija</h2>
      <ul>
        {historys
          ? historys.map((c, i) => <Line key={i} line={c}></Line>)
          : null}
      </ul>
    </div>
  );
}

export default List;
