export class AppUser {
    UserID!: number;
    FullName!: string;
    UserName!: string;
    RoleID!: number;
    RoleName!: string;
    ActionType!: string;
    Status!: string;
    Token!: string;
    TokenCreationDate!: string;
    TokenExpiresMin!: number;
    Activities!: UserActivity[];
    ActiveFlag!: boolean;
}

export class Login {
    UserName!: string;
    Password!: string;
}

export class UserActivity {
    ActivityID!: number;
    Action!: string;
    TargetTable!: string;
    RoleAtTime!: string;
    User!: string;
    ActivityDate!: Date;
}

export class RequestUserActivityData {
    UserID!: number;
    StartDate?: Date;
    EndDate?: Date;
    Top?: number;
}

export class ActivityDetails {
    Field!: string;
    StartValue!: string;
    EndValue!: string;
    Change!: boolean;
}