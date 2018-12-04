import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	acceptFriend,
	addFriend,
	clearFriendResponse,
	getCurrentFriends,
	getCurrentProfile,
	getProfileByAlias,
	IAcceptFriendInput,
	IAddFriendInput,
	IClearFriendResponseInput,
	IFriends,
	IProfiles,
	IRejectFriendInput,
	IRemoveFriendInput,
	IUpdateProfileInput,
	rejectFriend,
	removeFriend,
	updateCurrentProfile,
} from '../../../store/data/profiles';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	profiles: IProfiles;
	friends: IFriends;
}

interface IActionProps {
	getCurrentProfile: () => void;
	getCurrentFriends: () => void;
	getProfileByAlias: (alias: string) => void;
	updateCurrentProfile: (updateProfileInput: IUpdateProfileInput) => void;
	addFriend: (addFriendInput: IAddFriendInput) => void;
	removeFriend: (removeFriendInput: IRemoveFriendInput) => void;
	acceptFriend: (acceptFriendInput: IAcceptFriendInput) => void;
	rejectFriend: (rejectFriendInput: IRejectFriendInput) => void;
	clearFriendResponse: (clearFriendResponseInput: IClearFriendResponseInput) => void;
}

type IProps = IDataProps & IActionProps;

interface IChildren {
	children: (props: IProps) => JSX.Element;
}

class Enhancer extends React.Component<IProps & IChildren> {
	render() {
		const { children, ...props } = this.props;
		return children(props);
	}
}

const selectProfiles = createSelector(
	(state: IApplicationState) => state.data.profiles.profiles,
	(profiles) => profiles,
);

const selectFriends = createSelector(
	(state: IApplicationState) => state.data.profiles.friends,
	(friends) => friends,
);

const mapStateToProps = (state: IApplicationState) => ({
	profiles: selectProfiles(state),
	friends: selectFriends(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	getCurrentProfile: () => dispatch(getCurrentProfile()),
	getCurrentFriends: () => dispatch(getCurrentFriends()),
	getProfileByAlias: (alias: string) => dispatch(getProfileByAlias(alias)),
	addFriend: (addFriendInput: IAddFriendInput) => dispatch(addFriend(addFriendInput)),
	removeFriend: (removeFriendInput: IRemoveFriendInput) =>
		dispatch(removeFriend(removeFriendInput)),
	acceptFriend: (acceptFriendInput: IAcceptFriendInput) =>
		dispatch(acceptFriend(acceptFriendInput)),
	rejectFriend: (rejectFriendInput: IRejectFriendInput) =>
		dispatch(rejectFriend(rejectFriendInput)),
	updateCurrentProfile: (updateProfileInput: IUpdateProfileInput) =>
		dispatch(updateCurrentProfile(updateProfileInput)),
	clearFriendResponse: (clearFriendResponseInput: IClearFriendResponseInput) =>
		dispatch(clearFriendResponse(clearFriendResponseInput)),
});

export const WithProfiles: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
