import React from 'react';

export {default as Table } from './Table';
export {default as TableHead } from './TableHead';
export {default as TableBody } from './TableBody';
export {default as TableFoot } from './TableFoot';
export {default as TableRow } from './TableRow';
export {default as TableCell } from './TableCell';

export const createTableCells = (Component: React.ElementType): React.FC => ({children}) => {
	return <Component>
		{children}
	</Component>
}

// const AmountCell = createTableCells(TableCell);

// const DataRow = [
// 	createTableCells(TableCell), createTableCells(TableCell), createTableCells(TableCell)
// ]

// const JSX = (body) => (
// 	body.map((item, index) => DataRow[index](item));
// )