import { OrderStep } from '@smt/page/Main/MainController';
import { SelectedPhoneData } from '@smt/page/PhoneSelector/SelectPhone';

// An interface for our actions
export enum MainActionType {
    SELECTED_PHONE = 'selected_phone',
    SET_CURRENT_STEP = "set_current_step"
}
interface MainAction extends MainState{
    type: MainActionType;
}

// An interface for our state
interface MainState {
    currentStep?: OrderStep;
    loading?: boolean;
    queueId?: string;
    error?: string;
    selectedPhoneData?: SelectedPhoneData;
}

export const initalMainState:MainState = {
    currentStep: 0,
    loading: false,
    error: "",
    queueId:"",
    selectedPhoneData: []
}

// Our reducer function that uses a switch statement to handle our actions
export function mainReducer(state: MainState, action: MainAction) {
    switch (action.type) {
        case MainActionType.SELECTED_PHONE:
            return {
                ...state,
                selectedPhoneData: action.selectedPhoneData
            };        

        case MainActionType.SET_CURRENT_STEP:
            return {
                ...state,
                currentStep: action.currentStep
            };
 
        default:
            return state;
    }
}