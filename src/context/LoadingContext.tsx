
import * as React from 'react';
import LoadingModal from '@/com/smartone/modal/LoadingModal';

export interface LoadingContextProps {
	loadingCount: number;
	showLoading: () => void;
	hideLoading: () => void;
}

export const LoadingContext = React.createContext<LoadingContextProps>({
	loadingCount: 0,
	showLoading: () => {},
	hideLoading: () => {},
});

export function LoadingModalProvider({children}: {children: React.ReactNode}) {

	const showLoading = () => {
		toggleLoading((prevState) => {
			return {
				...prevState,
				loadingCount: prevState.loadingCount + 1,
			};
		});
	};

	const hideLoading = () => {
		toggleLoading((prevState) => {
			return {
				...prevState,
				loadingCount: prevState.loadingCount > 0 ? prevState.loadingCount - 1 : 0,
			};
		});
	};

	const loadingState = {
		loadingCount: 0,
		showLoading,
		hideLoading,
	};

	const [loading, toggleLoading] = React.useState<LoadingContextProps>(loadingState);

	return <LoadingContext.Provider value={loading}>
		<LoadingModal open={loading.loadingCount > 0}/>
		{children}
	</LoadingContext.Provider>
}