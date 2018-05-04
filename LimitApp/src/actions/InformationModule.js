import * as InformationActionTypes from "../actionType/InformationModule"

export function GetInformation(payload) {
    return {
        type: InformationActionTypes.get_information,
        payload: payload
    }
}

export function UpdateInformationById(payload){
    return {
        type: InformationActionTypes.update_information,
        payload: payload
    }
}

export function DelectInformationById(payload){
    return {
        type: InformationActionTypes.delete_information,
        payload: payload
    }
}

export function SaveInformation(payload) {
    return {
        type: InformationActionTypes.save_information,
        payload: payload
    }
}