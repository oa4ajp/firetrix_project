export class Constants {
    public static get MESSAGE_ERROR(): string { return 'error'; }
    public static get MESSAGE_ERROR_LOGIN(): string { return 'error-login'; }
    public static get MESSAGE_WARNING(): string { return 'warning'; }
    public static get MESSAGE_SUCCESS(): string { return 'success'; }
    public static get MESSAGE_NO_RECORDS_FOUND(): string { return 'No Records Found'; }
    public static get MESSAGE_UNAUTHORIZE_USER(): string { return 'The username or password you entered is incorrect'; }
    public static get MESSAGE_USER_AND_PWD_REQUIRED(): string { return 'User and pwd are required'; }
    public static get MESSAGE_TMS_ERROR(): string { return 'Error Getting Information from the TMS'; }
    public static get MESSAGE_TMS_USER_INACTIVE(): string { return 'Please activate your User on the TMS System'; }
}

export class EmmitterConstants {
   public static get FLAG_CHANGE(): string { return 'FLAG_CHANGE'; }
}