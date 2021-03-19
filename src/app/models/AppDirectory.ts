export class AppDirectory {
    ApplicationID!: number;
    AppName!: string;
    MainClass!: string;
    Controller!: string;
    Page!: string;
    Parameter!: string;
    Logo!: string;
    ActiveFlag!: boolean;
    Order!: number;
    ActionType!: string;
}

export class Profile {
    ProfileID!: number;
    AppName!: string;
    MainClass!: string;
    Controller!: string;
    Page!: string;
    Parameter!: string;
    Logo!: string;
}

export class Menu {
    MainClass!: string
    Directory: Profile[] = []
}