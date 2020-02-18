import { MODAL_OPEN, MODAL_CLOSE } from "./modalConstants"

// modalType is technically the name of the modal file/name we want to use/call
export const openModal = (modalType, modalProps) => {
    return {
        type: MODAL_OPEN,
        payload: {
            modalType,
            modalProps
        }
    }
}

export const closeModal = () => {
    return {
        type: MODAL_CLOSE
    }
}