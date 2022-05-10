import get from 'lodash/get';
import { REDUCERS_NAME } from '../../constants';

const reducerName = REDUCERS_NAME.USER;

export const selectUser = (state) => get(state, `${reducerName}.data`);
export const selectIsLoading = (state) => get(state, `${reducerName}.isLoading`);
export const selectLoadingError = (state) => get(state, `${reducerName}.loadingError`);
export const selectPolicyData = (state) => ({
  policyLink: get(state, `${reducerName}.data.policy_link`),
  policyVersionAccepted: get(state, `${reducerName}.data.policy_version_accepted`),
  requiredPolicy: get(state, `${reducerName}.data.required_policy`),
});
export const selectFavourites = (state) => {
  const favourites = get(state, `${reducerName}.favourites`);
  const convertedFavourites = [];

  if (favourites) {
    favourites.map((favourite) => (favourite.pages
      ? convertedFavourites.push({
        data: {
          id: favourite.chapter_id,
          title: favourite.chapter_title,
          storyId: favourite.story_id,
          items: favourite.pages,
        },
      })
      : null));
  }

  return convertedFavourites;
};
export const selectIsManager = (state) => get(state, `${reducerName}.data.is_manager`);
export const selectManagerTutorialSeen = (state) => get(state, `${reducerName}.data.manager_tutorial_seen`);
export const selectChatEnabled = (state) => get(state, `${reducerName}.data.chat_enabled`);
