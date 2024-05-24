// import AlertDialog from 'com/smartone/dialog/AlertDialog';
// import ConfirmDialog from 'com/smartone/dialog/ConfirmDialog';

// import LoadingModal from 'com/smartone/modal/LoadingModal';
import * as React from 'react';
import { useCallback } from 'react';
import { useQueue } from '@/com/smartone/hook/state/useQueue';
import AlertDialog from '@/com/smartone/dialog/AlertDialog';
import ConfirmDialog from '@/com/smartone/dialog/ConfirmDialog';
import LoadingModal from '@/com/smartone/modal/LoadingModal';

const MODAL_TYPE_LOADING = 'LOADING';
const MODAL_TYPE_CONFIRM = 'CONFIRM';
const MODAL_TYPE_ALERT = 'ALERT';

export type MODAL_TYPE = typeof MODAL_TYPE_LOADING | typeof MODAL_TYPE_CONFIRM | typeof MODAL_TYPE_ALERT;

export type OPEN_MODAL_PROPS = OpenAlertProps | OpenConfirmProps | OpenLoadingProps;

export interface OpenAlertProps {
	id?: string;
	message?: string;
	onClose?: () => void;
	type: typeof MODAL_TYPE_ALERT;
}

export interface OpenConfirmProps {
	id?: string;
	title?: string;
	message?: string | React.ReactNode;
	onClose?: () => void;
	onYes?: () => void;
	onNo?: () => void;
	type: typeof MODAL_TYPE_CONFIRM;
}

export interface OpenLoadingProps {
	id?: string;
	type: typeof MODAL_TYPE_LOADING;
}

export interface ModalContextProps {
	showAlert: (props: Omit<OpenAlertProps, 'type'>) => string;
	showConfirm: (props: Omit<OpenConfirmProps, 'type'>) => string;
	showLoading: (props: Omit<OpenLoadingProps, 'type'>) => string;
	hideLoading: (queueId: string) => void;
}

export const ModalContext = React.createContext<ModalContextProps>({
	showAlert: () => '',
	showConfirm: () => '',
	showLoading: () => '',
	hideLoading: () => {}
});

export function ModalProvider({children}: {children: React.ReactNode}) {

	const {add, removeById, head: modalContent}  = useQueue<OPEN_MODAL_PROPS>();
	const closeModal = (queueId: string) => {
		removeById(queueId)
	};
	const showAlert = (props: Omit<OpenAlertProps, 'type'>) => {
		return add({type: MODAL_TYPE_ALERT, ...props})
	};
	const showConfirm = (props: Omit<OpenConfirmProps, 'type'>) => {
		return add({type: MODAL_TYPE_CONFIRM, ...props})
	};
	const showLoading = (props: Omit<OpenLoadingProps, 'type'>) => {
		return add({type: MODAL_TYPE_LOADING, ...props})
	};
	const onDialogClose = useCallback((event:string, reason: string) => {
		if (modalContent) {
			if ((modalContent.type === MODAL_TYPE_ALERT || modalContent.type === MODAL_TYPE_CONFIRM)) {
				modalContent['onClose']?.();
			}
			closeModal(modalContent.queueId);
		}		
	}, [ modalContent ]); 
	const onConfirmDialogAction = useCallback((cbName: 'onYes'|'onNo') => () => {
		if (modalContent) {
			if (modalContent.type === MODAL_TYPE_CONFIRM) {
				modalContent[cbName]?.();
			}
			closeModal(modalContent.queueId);
		}
	}, [modalContent])

	const modalContextState = {
		showAlert,
		showConfirm,
		showLoading,
		hideLoading: closeModal
	};

	return <ModalContext.Provider value={modalContextState}>
		{modalContent?.type === MODAL_TYPE_ALERT && (
			<AlertDialog open={true} onClose={onDialogClose}>
				{/* {modalContent?.message} */}
				System Busy, Please try again.
			</AlertDialog>
		)}
		{modalContent?.type === MODAL_TYPE_CONFIRM && (
			<ConfirmDialog 
				open={true}
				title={modalContent.title}
				onClose={onDialogClose}
				onYes={onConfirmDialogAction('onYes')}  
				onNo={onConfirmDialogAction('onNo')}>
				
				{modalContent?.message}
			</ConfirmDialog>
		)}
		{modalContent?.type === MODAL_TYPE_LOADING && (
			<LoadingModal open={true}/>
		)}
		{children} 
	</ModalContext.Provider>
}