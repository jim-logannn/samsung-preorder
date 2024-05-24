/**
 * com/smartone/hook/InputHook
 **/
import React, { useState, useCallback, useEffect, useContext } from "react";
import { InputValidator } from "../validator/InputValidator";

/*
useInputWatcher:
whenever the value is changed => clear error and update "valid"
provide onBlur callback
when onBlur, set errror=true if needed
*/
type InputWatcherHook<T> = (validate: InputValidator<T>, required?: boolean, value?: T) => [ boolean, boolean, ()=>void ];

export function useInputWatcher<T>(validate: InputValidator<T>, required?: boolean, value?: T): [ boolean, boolean, ()=>void ] {
	const [ error, setError ] = useState<boolean>(false);
	const [ valid, setValid ] = useState<boolean>(false);
	
	const onBlur = useCallback(function() {
		if(!validate(required, value)) {
			setError(true);
		}
	}, [required, value, validate]);

	useEffect(function() {
		// clear error whenever changing the value
		setError(false);
		setValid(validate(required, value));
	}, [required, value, validate]);

	return [ error, valid, onBlur ];
}

export const FormWatcherContext = React.createContext({
	setError: (v: string) => {},
	removeError: (v: string) => {},
	resetErrorList: () => {},
	errorList: {} as Record<string,boolean|undefined>
})

export function FormWatcherProvider({children}: {children: React.ReactNode}) {

	const [errorList, setErrorList] = useState<Record<string,boolean|undefined>>({})

	const formControl = {
		setError: (v: string) => {
			setErrorList(prev => ({
				...prev,
				[v]: true
			}))
		},
		removeError: (v: string) => {
			setErrorList(prev => ({
				...prev,
				[v]: false
			}))
		},
		resetErrorList: () => {
			setErrorList({})
		},
		errorList
	}

	return <FormWatcherContext.Provider value={formControl}>
		{children}
	</FormWatcherContext.Provider>
}

export function useFormWatcher<T>(field: string, validate: InputValidator<T>, required?: boolean, value?: T, ): [ boolean, boolean, ()=>void ] {

	const [ error, valid, onBlur ] = useInputWatcher(validate, required, value);

	const {setError, removeError} = useContext(FormWatcherContext);

	useEffect(() => {
		if (!valid) {
			setError(field)
		} else {
			removeError(field)
		}
	}, [valid]);

	return [ error, valid, onBlur ];
}