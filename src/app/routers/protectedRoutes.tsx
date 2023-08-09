import { Navigate, Outlet, generatePath, useParams } from 'react-router-dom';

import { useTypedSelector } from 'src/hooks/useTypedSelector';

import { selectUserData } from '_redux/reducer/userReducer/selectors';

import { URLS } from 'src/constants/constRouter';

const ProtectedRoutes = () => {
	const { roomId } = useParams();

	const { roomId: currentRoomId } = useTypedSelector(selectUserData);

	return currentRoomId === roomId ? (
		<Outlet />
	) : (
		<Navigate to={generatePath(URLS.MAIN, { roomId: roomId! })} />
	);
};

export default ProtectedRoutes;
