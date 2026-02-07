// Role Definitions
export interface Role {
    id: string;
    name: string;
    [key: string]: any; // Allow flexible properties for now
}

export interface RoleState {
    roles: Role[] | null;
    loading: boolean;
    error: string | null;
}

// MegaModel Definitions (Custom Data)
export interface DashboardModel {
    firstCard: any | null;
    secondCard: any | null;
    thirdCard: any | null;
    fourthCard: any | null;
}

export interface DocumentUploads {
    currentDocument: any | null;
    loadingState: any | null;
}

export interface CaseManagementModel {
    caseDetails: any | null;
    caseDashboard: any | null;
    documentUploads: DocumentUploads;
}

export interface MegaModel {
    dashboardModel: DashboardModel;
    caseManagementModel: CaseManagementModel;
    [key: string]: any; // Extensible for future modules
}

export interface CustomState {
    customData: MegaModel;
    status: 'idle' | 'success' | 'error';
    error: string | null;
}
