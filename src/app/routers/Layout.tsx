import { Outlet } from 'react-router-dom';

import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Main from 'src/components/Main';

export const Layout = () => (
	<div className="content">
		<Header />
		<Main>
			<Outlet />
		</Main>
		<Footer />
	</div>
);
