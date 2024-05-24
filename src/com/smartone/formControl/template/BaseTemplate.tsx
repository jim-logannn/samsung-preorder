/**
* com/smartone/formControl/template/BaseTemplate
**/

import { useIntl } from "react-intl";

// get message when label is undefined
export function useMessageLabel(required?: boolean, label?: React.ReactNode, defaultLabelId?: string, defaultLabelOptionalId?: string): React.ReactNode | undefined {
	if(label !== undefined) {
		return label;
	}

	const intl = useIntl();
	if(intl && intl.formatMessage) {
		if(required) {
			if(defaultLabelId !== undefined) {
				return intl.formatMessage({ id: defaultLabelId });
			}
		} else {
			if(defaultLabelOptionalId !== undefined) {
				return intl.formatMessage({ id: defaultLabelOptionalId });
			}
		}
	}
	
	return undefined;
}