export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "somedeployedURL";

// export const imgUrl = "http://localhost:5000/images/";
export const hostUrl = "http://localhost:5000";
export const cliUrl = "http://localhost:3000";
//base url
//baseurl/predict
export const pythonUrl = "http://localhost:80";

export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";

export const POST_IMAGE_SUCCESS = "POST_IMAGE_SUCCESS";
export const POST_IMAGE_FAIL = "POST_IMAGE_FAIL";
export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";
