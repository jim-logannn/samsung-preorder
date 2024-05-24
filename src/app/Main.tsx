import PlanReview from '@smt/page/OrderDetails/PlanReview';
import PlanSelector from '@smt/page/PlanSelector';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyleDevPanel = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	& button {
		background: black;
		color: green;
	}
`
const Main = () => {
	/**
	 * test only
	 */
	const [testComp, setTestComp] = useState('PlanReview');
	return <>
		<StyleDevPanel>
			<button onClick={() => setTestComp('PlanReview')}>
				PR
			</button>
			<button onClick={() => setTestComp('PlanSelector')}>
				PS
			</button>
		</StyleDevPanel>
		{testComp === 'PlanReview' && <PlanReview />}
		{testComp === 'PlanSelector' && <PlanSelector />}
	</>
}

export default Main;