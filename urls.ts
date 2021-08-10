const BASE_URL = 'https://hexagon-sm.herokuapp.com/';

// Auth endpoints
export const SIGN_IN_GOOGLE_URL = BASE_URL + 'auth/google';
export const SIGN_IN_URL = BASE_URL + 'auth/signin';
export const SIGNUP_URL = BASE_URL + 'auth/signup';
export const LOGOUT_URL = BASE_URL + 'auth/logout';
export const REFRESH_URL = BASE_URL + 'auth/refresh';
export const REQUEST_USER_VERIFY_CODE_URL = BASE_URL + 'auth/user/verification';
export const VERIFY_USER_ACCOUNT_URL = BASE_URL + 'auth/user/verify';
export const UPDATE_PASSWORD_URL = BASE_URL + 'auth/user/password';
export const REQUEST_PASSWORD_CODE_URL = BASE_URL + 'auth/user/password/code';
export const VERIFY_PASSWORD_CODE_URL = BASE_URL + 'auth/user/password/reset';

// Profile endpoints
export const ME_URL = BASE_URL + 'api/v1/me-profile';
export const PROFILES_WITH_MESSAGES_URL =
  BASE_URL + 'api/v1/me-profile/with-messages';
export const PROFILE_URL = BASE_URL + 'api/v1/profile';

// Follow endpoints
export const FOLLOW_URL = BASE_URL + 'api/v1/follow';

//File endpoints
export const FILE_URL = BASE_URL + 'api/v1/file-upload';

// Category endpoints
export const CATEGORY_URL = BASE_URL + 'api/v1/category';

// Post endpoints
export const TIMELINE_POSTS_URL = BASE_URL + 'api/v1/posts/timeline';
export const PROFILE_POSTS_URL = BASE_URL + 'api/v1/posts/profile';
export const CATEGORY_POSTS_URL = BASE_URL + 'api/v1/posts';
export const POST_URL = BASE_URL + 'api/v1/posts/post';

// Comments endpoints
export const COMMENT_URL = BASE_URL + 'api/v1/comment';

// Notifications endpoints
export const NOTIFICATIONS_URL = BASE_URL + 'api/v1/Notifications';

// Messages endpoints
export const MESSAGES_URL = BASE_URL + 'api/v1/messages';

// Interaction endpoints
export const INTERACTION_URL = BASE_URL + 'api/v1/interaction';
