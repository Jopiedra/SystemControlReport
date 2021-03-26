export class DLs {
    DLID!: number;
    RPTID!: number;
    FileName!: string;
    LogsFileName!: string;
    EmailSubjectName!: string;
    RecipientID!: number;
    FullName!: string;
    Email!: string;
    RecipientType!: string;
    Condition!: boolean;
    ActionType!: string;
}

export class DLsRequest {
    RPTID!: number;
    RecipientsDirect!: number[];
    RecipientsCC!: number[];
    RecipientsBCC!: number[];
}