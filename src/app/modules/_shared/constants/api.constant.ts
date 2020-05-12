export class ApiSettings {
    public static API_ENDPOINT = 'http://127.0.0.1:4000/';

    public static USER_API = ApiSettings.API_ENDPOINT + 'users';
    public static AUTHENTICATE_API = ApiSettings.USER_API + '/authenticate';
    public static USER_IMAGE_UPLOAD_URL = ApiSettings.API_ENDPOINT + 'upload';
    public static USER_COLUMN_JSON = '/assets/json/user-column.json';

    public static CATEGORY_COLUMN_JSON = '/assets/json/category-column.json';
    public static CATEGORY_API = ApiSettings.API_ENDPOINT + 'category';

    public static ADD_POST_API = ApiSettings.API_ENDPOINT + 'posts';

    public static REPLY_POST_API = ApiSettings.API_ENDPOINT + 'comments';
}
