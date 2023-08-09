import { RouterProvider } from 'react-router-dom';
import Loading from '../components/Loading';
import { routers } from './routers';

import '_assets/styles/global/global.scss';

const App = () => (
	<RouterProvider router={routers} fallbackElement={<Loading />} />
);

export default App;
