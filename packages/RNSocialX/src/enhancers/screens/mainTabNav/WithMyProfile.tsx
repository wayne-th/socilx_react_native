import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { ActionTypes as AggActionTypes } from '../../../store/aggregations/posts/Types';
import { ActionTypes as ProfileActionTypes } from '../../../store/data/profiles/Types';
import {
	ICurrentUser,
	IGlobal,
	INavigationParamsActions,
	IOptionsMenuProps,
	ITranslatedProps,
} from '../../../types';
import { getActivity, resetNavigationToRoute } from '../../helpers';

import { WithAggregations } from '../../connectors/aggregations/WithAggregations';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUserContent } from '../intermediary';

export interface IWithMyProfileEnhancedData {
	currentUser: ICurrentUser;
	loadingProfile: boolean;
	loadingPosts: boolean;
}

export interface IWithMyProfileEnhancedActions
	extends ITranslatedProps,
		IOptionsMenuProps,
		INavigationParamsActions {
	getPostsForUser: (userName: string) => void;
	logout: () => void;
	resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => void;
	setGlobal: (input: IGlobal) => void;
}

interface IWithMyProfileEnhancedProps {
	data: IWithMyProfileEnhancedData;
	actions: IWithMyProfileEnhancedActions;
}

interface IWithMyProfileProps {
	children(props: IWithMyProfileEnhancedProps): JSX.Element;
}

interface IWithMyProfileState {}

export class WithMyProfile extends React.Component<IWithMyProfileProps, IWithMyProfileState> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithNavigationParams>
						{({ setNavigationParams }) => (
							<WithGlobals>
								{({ setGlobal }) => (
									<WithOverlays>
										{({ showOptionsMenu }) => (
											<WithAccounts>
												{({ logout }) => (
													<WithActivities>
														{({ activities }) => (
															<WithAggregations>
																{({ getUserPosts }) => (
																	<WithCurrentUserContent>
																		{({ currentUser }) =>
																			this.props.children({
																				data: {
																					currentUser: currentUser!,
																					loadingProfile: getActivity(
																						activities,
																						ProfileActionTypes.GET_PROFILE_BY_USERNAME,
																					),
																					loadingPosts: getActivity(
																						activities,
																						AggActionTypes.GET_USER_POSTS,
																					),
																				},
																				actions: {
																					getPostsForUser: async (username: string) => {
																						await getUserPosts({ username });
																					},
																					showOptionsMenu: (items) => showOptionsMenu({ items }),
																					logout,
																					resetNavigationToRoute,
																					setNavigationParams,
																					setGlobal,
																					getText,
																				},
																			})
																		}
																	</WithCurrentUserContent>
																)}
															</WithAggregations>
														)}
													</WithActivities>
												)}
											</WithAccounts>
										)}
									</WithOverlays>
								)}
							</WithGlobals>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
