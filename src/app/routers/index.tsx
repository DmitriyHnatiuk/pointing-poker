import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Loading from 'src/components/Loading';
import { URLS } from 'src/constants/constRouter';
import { Error404, MainPage } from 'src/pages';

import { Layout } from './Layout';
import ProtectedRoutes from './protectedRoutes';

const lazyRoute = (componentName: string) => {
	const LazyComponent = lazy(() => import(`../../pages/${componentName}`));

	return (
		<Suspense fallback={<Loading />}>
			<LazyComponent />
		</Suspense>
	);
};

const _routes = [
	{
		path: '/',
		element: <Layout />,
		errorElement: <Error404 />,
		children: [
			{ index: true, element: <MainPage /> },
			{ path: URLS.MAIN, element: <MainPage /> },
			{
				element: <ProtectedRoutes />,
				children: [
					{
						path: URLS.ADMIN,
						element: lazyRoute('AdminLobbyPage')
					},
					{
						path: URLS.USER,
						element: lazyRoute('TeamMembersPage')
					},
					{
						path: URLS.PLANNING,
						element: lazyRoute('PlanningPage')
					},
					{
						path: URLS.RESULT,
						element: lazyRoute('ResultPage')
					}
				]
			}
		]
	}
];

export const routers = createBrowserRouter(_routes);
