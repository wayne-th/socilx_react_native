export { default as reducer } from './reducer';

export { IPostData } from '@socialx/api-data';

export {
	IState,
	IAction,
	IProfile,
	IPostIdInput,
	IPostPathInput,
	IUsernameInput,
	IDateInput,
} from './Types';

export {
	getPostByPath,
	getPostPathsByUsername,
	getPublicPostsByDate,
	createPost,
	likePost,
	removePost,
	unlikePost,
} from './actions';
