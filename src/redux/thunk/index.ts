import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { generatePath, matchPath } from 'react-router-dom';
import { io } from 'socket.io-client';

import { RootState } from './../store';

import { setResult } from '_redux/reducer/ResultReducer';
import { setLoading } from '_redux/reducer/loading';
import {
	addNotifications,
	addToKickModal,
	removeAllNotifications,
	setUserConnectModal
} from '_redux/reducer/modalReducer';
import {
	addIssue,
	deleteIssue,
	setActiveIssue,
	setPlanningData,
	setRunRoundStatus
} from '_redux/reducer/planningReducer';

import { routers } from 'src/app/routers';
import { ENDPOINT } from 'src/constants/API';
import { EVENTS, SOCKET_EVENTS, URLS } from 'src/constants/constRouter';
import { generateTime } from 'src/utils/timer';
import { DataTypes, IChatMessage } from './types';

import { ResultType } from '../reducer/ResultReducer/types';
import { addMessage } from '../reducer/chatReducer';
import { logoutAction } from '../reducer/loading/logoutAction';
import {
	selectPlanning,
	selectPlanningTimer,
	selectRoundStatus
} from '../reducer/planningReducer/selectors';
import {
	IPlanning,
	IssueType,
	TimerSettingsType
} from '../reducer/planningReducer/types';
import { removeUser, setUserData, setUsers } from '../reducer/userReducer';
import { selectUserData } from '../reducer/userReducer/selectors';
import { IUsers } from '../reducer/userReducer/types';
import {
	resetUsersVote,
	setUserVote,
	setUsersVote
} from '../reducer/usersVote';
import { RatingType } from '../reducer/usersVote/type';

const socket = io(ENDPOINT, { autoConnect: false });

const { HOME, ADMIN, USER, PLANNING, RESULT } = URLS;

const {
	UNSUBSCRIBE,
	SUBSCRIBE,
	SET_START,
	PLANNING_TIME_OFF,
	ADMIN_RUN_ROUND,
	RESET_PLANNING,
	SET_NEXT_ISSUE,
	SELECT_CARD,
	GET_RESULT,
	SEND_MESSAGE,
	ADMIN_AGREE,
	ADMIN_DISAGREE,
	DELETE,
	AGREE,
	ADD_ISSUE,
	SELECT_ISSUE,
	DELETE_ISSUE
} = EVENTS;

type DispatchTypes = ThunkDispatch<RootState, unknown, AnyAction>;

const socketCreator =
	(data: DataTypes): any =>
	(
		dispatch: DispatchTypes,
		getState: (cb?: (state: RootState) => void) => RootState
	) => {
		const { usersData, type, message, id, issue } = data;

		const getData = () => {
			const state = getState();
			const { roomId } = selectUserData(state);
			const planning = selectPlanning(state);
			return { roomId, planning };
		};

		const setUnsubscribe = () => {
			dispatch(logoutAction());
			socket.removeAllListeners();
			socket.offAny();
			socket.close();
			if (!matchPath(HOME, routers.state.location.pathname)) {
				routers.navigate(HOME, { replace: true });
			}
		};

		if (type === SUBSCRIBE) {
			if (socket.id) {
				socket.removeAllListeners();
				socket.close();
			}

			socket.connect();

			dispatch(setLoading(true));
			socket.emit(
				SOCKET_EVENTS.CONNECT_TO_ROOM,
				usersData,
				(res: { status: string }) =>
					res.status === 'ok' ? dispatch(setLoading(false)) : setUnsubscribe()
			);

			socket.on(SOCKET_EVENTS.CONNECT_ERROR, (err) => {
				socket.disconnect();
				dispatch(setLoading(false));
				dispatch(
					addNotifications({
						id: `${err.message}-${new Date()}`,
						isError: true,
						message: 'Oops, server problems, try again later'
					})
				);

				console.log(`connect_error due to ${err.message}`);
				socket.removeAllListeners();
			});

			socket.on('disconnect', () => setUnsubscribe());

			socket.on(SOCKET_EVENTS.YOUR_DATA, (userData) => {
				const isAdmin = usersData?.isAdmin;
				dispatch(setUserData(userData));

				routers.navigate(
					generatePath(isAdmin ? ADMIN : USER, {
						roomId: userData.data?.roomId
					})
				);
			});

			socket.on(SOCKET_EVENTS.YOUR_ROOM_DATA, (users) => {
				if (!users) {
					return setUnsubscribe();
				}
				dispatch(setUsers({ users }));
			});

			socket.on(SOCKET_EVENTS.DELETE_USER, (userId: string) => {
				dispatch(removeUser({ userId }));
			});

			socket.on(
				SOCKET_EVENTS.ROUND_START,
				(data: { timer: TimerSettingsType; isRunRound: boolean }) => {
					dispatch(setRunRoundStatus(data));
				}
			);
			socket.on(SOCKET_EVENTS.ADD_ISSUE, (issue: IssueType) =>
				dispatch(addIssue(issue))
			);

			socket.on(SOCKET_EVENTS.CURRENT_ISSUE, (issueId: string) =>
				dispatch(setActiveIssue({ issueId }))
			);

			socket.on(SOCKET_EVENTS.SET_USER_CHOICE, ({ userId, data }) => {
				return dispatch(setUserVote({ userId, data }));
			});

			socket.on(
				SOCKET_EVENTS.SET_USERS_VOTE,
				(data: Record<string, RatingType>) => {
					return dispatch(setUsersVote(data));
				}
			);

			socket.on(SOCKET_EVENTS.RESET_USERS_VOTE, () => {
				return dispatch(resetUsersVote());
			});

			socket.on(
				SOCKET_EVENTS.YOUR_PLANNING_DATA,
				(planningData: Partial<IPlanning>) => {
					if (!planningData) {
						return setUnsubscribe();
					}
					const { roomId } = getData();

					dispatch(setPlanningData(planningData));

					if (!matchPath(PLANNING, routers.state.location.pathname)) {
						routers.navigate(generatePath(PLANNING, { roomId }));
					}
				}
			);

			if (usersData?.isAdmin) {
				socket.on(SOCKET_EVENTS.USER_CONNECT, (user: IUsers) => {
					return dispatch(
						setUserConnectModal({
							player: `${user.firstName} ${user.lastName}`,
							id: user.id
						})
					);
				});
			} else {
				socket.on(SOCKET_EVENTS.ADMIN_CONFIRM_CONNECT, () =>
					socket.emit(SOCKET_EVENTS.CONNECT_USER)
				);
			}
			socket.on(SOCKET_EVENTS.TIME_NOW, (userId: string) => {
				const state = getState();
				const timer = selectPlanningTimer(state);
				socket.emit(SOCKET_EVENTS.TIME, timer, userId);
			});

			socket.on(SOCKET_EVENTS.MESSAGE_FROM_USER, (ms: IChatMessage) => {
				if (!ms) return;
				dispatch(addMessage(ms));
			});

			socket.on(SOCKET_EVENTS.MESSAGE_FROM_ADMIN, (ms: IChatMessage) => {
				if (!ms) return;
				dispatch(addMessage(ms));
			});

			socket.on(SOCKET_EVENTS.SEND_RESULT, (result: ResultType) => {
				dispatch(setResult(result));
				const { roomId } = getData();
				routers.navigate(generatePath(RESULT, { roomId }));
			});

			socket.on(SOCKET_EVENTS.DELETE_USER_MESSAGE, ({ user, userToDelete }) => {
				const player = `${user.firstName}  ${user.lastName}`;
				const playerKick = `${userToDelete.firstName} ${userToDelete.lastName}`;
				dispatch(
					addToKickModal({
						player,
						playerKick,
						id: userToDelete.id
					})
				);
			});

			socket.on(SOCKET_EVENTS.NOTIFICATION, (notification) =>
				dispatch(addNotifications(notification))
			);

			socket.on(SOCKET_EVENTS.CLEAN_UP_NOTIFICATION, () =>
				dispatch(removeAllNotifications())
			);

			socket.on(SOCKET_EVENTS.ERROR, (notification) => {
				setUnsubscribe();
				dispatch(addNotifications(notification));
			});
		}

		if (type === ADMIN_AGREE) {
			socket.emit(SOCKET_EVENTS.CONFIRM_CONNECT, id);
		}

		if (type === ADMIN_DISAGREE) {
			socket.emit(SOCKET_EVENTS.CANCEL_CONNECT, id);
		}

		if (type === DELETE) {
			socket.emit(SOCKET_EVENTS.DELETE, { userId: id });
		}

		if (type === AGREE) {
			socket.emit(SOCKET_EVENTS.CONFIRM_DELETE, id);
		}

		if (type === ADD_ISSUE) {
			socket.emit(SOCKET_EVENTS.ADMIN_ADD_ISSUE, issue);
		}

		if (type === SELECT_ISSUE) {
			socket.emit(SOCKET_EVENTS.ADMIN_SELECT_ISSUE, id);
		}

		if (type === DELETE_ISSUE) {
			if (matchPath(PLANNING, routers.state.location.pathname)) {
				socket.emit(SOCKET_EVENTS.ADMIN_DELETE_ISSUE, id);
			}
			if (matchPath(ADMIN, routers.state.location.pathname) && id) {
				dispatch(deleteIssue({ id }));
			}
		}

		if (type === SET_START) {
			const { planning } = getData();
			socket.emit(SOCKET_EVENTS.ADMIN_START_PLANNING, planning);
		}

		if (type === PLANNING_TIME_OFF) {
			socket.emit(SOCKET_EVENTS.PLANNING_TIME_OFF);
		}

		if (type === ADMIN_RUN_ROUND) {
			socket.emit(SOCKET_EVENTS.ADMIN_RUN_ROUND);
		}

		if (type === RESET_PLANNING) {
			const { planning } = getData();
			socket.emit(SOCKET_EVENTS.ADMIN_RESET_ROUND, planning);
		}

		if (type === SET_NEXT_ISSUE) {
			socket.emit(SOCKET_EVENTS.SET_NEXT_ISSUE);
		}

		if (type === SELECT_CARD) {
			const state = getState();
			const isRunRound = selectRoundStatus(state);
			isRunRound ? socket.emit(SOCKET_EVENTS.SELECT_CARD, id) : null;
		}

		if (type === GET_RESULT) {
			socket.emit(SOCKET_EVENTS.GET_RESULT);
		}

		if (type === SEND_MESSAGE) {
			const state = getState();
			const {
				avatar: icon,
				id: authorId,
				firstName,
				lastName
			} = selectUserData(state);

			socket.emit(SOCKET_EVENTS.MESSAGE, {
				message,
				author: { icon, authorId, firstName, lastName },
				date: generateTime()
			});
		}

		if (type === UNSUBSCRIBE) {
			setUnsubscribe();
		}
	};
export default socketCreator;
