import React from 'react';
import { Fieldset } from '@smt/component/card';
import { Typography } from '@material-ui/core';
import { formatPrice } from '@smt/util/StringUtils';

type HandsetPriceProps = {
	title: string;
	handset: string;
	price: number;
}

const HandsetPrice: React.FC<HandsetPriceProps> = ({title, handset, price}) => {
	return <Fieldset title={title}>
	<Typography variant="h6" align="center">{handset}</Typography>
	<Typography variant="subtitle1" align="center"><small>HK$</small> {formatPrice(price)}</Typography>
</Fieldset>
}

export default HandsetPrice;