export const URLS = {
	HOME: '/',
	MAIN: '/:roomId',

	ADMIN: '/admin/:roomId',
	USER: '/user/:roomId',
	PLANNING: '/planning/:roomId',

	RESULT: '/result/:roomId',
	ERROR: '*'
} as const;

export const EVENTS = {
	AGREE: 'AGREE',
	DELETE: 'DELETE',
	ADD_ISSUE: 'ADD_ISSUE',
	SUBSCRIBE: 'SUBSCRIBE',
	SET_START: 'SET_START',
	GET_RESULT: 'GET_RESULT',
	RESET_PLANNING: 'RESET_PLANNING',
	UNSUBSCRIBE: 'UNSUBSCRIBE',
	ADMIN_AGREE: 'ADMIN_AGREE',
	SELECT_CARD: 'SELECT_CARD',
	SEND_MESSAGE: 'SEND_MESSAGE',
	ADMIN_RUN_ROUND: 'RUN_ROUND',
	SELECT_ISSUE: 'SELECT_ISSUE',
	DELETE_ISSUE: 'DELETE_ISSUE',
	PLANNING_TIME_OFF: 'PLANNING_TIME_OFF',
	ADMIN_DISAGREE: 'ADMIN_DISAGREE',
	SET_NEXT_ISSUE: 'SET_NEXT_ISSUE'
} as const;

export const SOCKET_EVENTS = {
	CONNECT_ERROR: 'connect_error',
	CONNECT_TO_ROOM: 'event://connect_to_room',
	CONNECT_USER: 'event://connect_user',
	USER_CONNECT: 'event://user_connect',
	CONFIRM_CONNECT: 'event://confirm_connect',
	ADMIN_CONFIRM_CONNECT: 'event://admin_confirm_connect',
	CANCEL_CONNECT: 'event://cancel_connect',
	ADMIN_RUN_ROUND: 'event://admin_run_round',
	ROUND_START: 'event://round_status',
	DELETE: 'event://delete',
	SET_USERS_VOTE: 'event://set_users_vote',
	DELETE_USER: 'event://deleted_user',
	CONFIRM_DELETE: 'event://agree_delete',
	TIME_NOW: 'event://time_now',
	YOUR_PLANNING_DATA: 'event://your_planning_data',
	ADMIN_START_PLANNING: 'event://admin_start_planning',
	ADMIN_SELECT_ISSUE: 'event://admin_select_issue',
	ADMIN_ADD_ISSUE: 'event://admin_add_issue',
	ADD_ISSUE: 'event://add_issues',
	ADMIN_DELETE_ISSUE: 'event://admin_delete_issue',
	RESET_USERS_VOTE: 'event://reset_users_vote',
	YOUR_DATA: 'event://your_data',
	YOUR_ROOM_DATA: 'event://your_room_data',
	TIME: 'event://time',
	SELECT_CARD: 'event://select_card',
	SET_USER_CHOICE: 'event://set_user_choice',
	CLEAN_UP_NOTIFICATION: 'event://remove_all_notification',
	GET_RESULT: 'event://get_result',
	ERROR: 'event://error',
	SEND_RESULT: 'event://send_result',
	ADMIN_RESET_ROUND: 'event://admin_reset_round',
	PLANNING_TIME_OFF: 'event://planning_time_off',
	SET_NEXT_ISSUE: 'event://set_next_issue',
	CURRENT_ISSUE: 'event://current_issue',
	MESSAGE: 'event://message',
	DELETE_USER_MESSAGE: 'event://delete_user_message',
	NOTIFICATION: 'event://notification',
	MESSAGE_FROM_ADMIN: 'event://message_from_admin',
	MESSAGE_FROM_USER: 'event://message_from_user'
};
