export class Roles {
    RoleID!: number;
    RoleName!: string;
    RoleDescription!: string;
}

export class RightRole {
    ProfileID!: number;
    RoleID!: number;
    ApplicationID!: number;
    MainClass!: string;
    AppName!: string;    
    ReadRight!: boolean;
    WriteRight!: boolean;
}