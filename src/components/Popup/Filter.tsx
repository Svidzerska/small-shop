import './filter.scss';

import { useDispatch} from 'react-redux';
import { setPopup } from '../../features/products/productSlice';

function Filter() {
   const dispatch = useDispatch();

   const closePopup = () => {
      dispatch(setPopup(false));
   }

   return (
      <div className="popup">
         <button onClick={closePopup}>close</button>
         <p>Filter</p>
      </div>
   )
}

export default Filter;