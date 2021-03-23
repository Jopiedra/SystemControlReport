export class Report {
    RPTID!: number;
    FileName!: string;
    LogsFileName!: string;
    EmailSubjectName!: string;
    FreqID!: number;
    Frequency!: string;
    RunningDay!: string;
    SpecificDay!: number;
    ComputerAssignedID!: number;
    ComputerAssigned!: string;
    DeliveryMethod!: string;
    DepID!: number;
    Department!: string;
    Status!: boolean;
    ServerAssignedID!: number;
    Server!: string;
    SharedFolderID?: number;
    SharedFolder!: string;
    Note!: string;
    BSID!: number;
    BusinessSponsor!: string;
    DLFlag!: boolean;
    SourceID!: number;
    SourcePath!: string;
    ExecutionStatus!: string;
    ActionType!: string;
}