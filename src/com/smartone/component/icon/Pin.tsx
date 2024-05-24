import React from 'react';

const Pin = ({width=22, height=27}: {width?: number; height?:number}) => (
	<svg width={width} height={height} viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
	<circle cx="11.1731" cy="10.3537" r="3.54123" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round"
	 strokeLinejoin="round" />
	<path fillRule="evenodd" clipRule="evenodd"
		d="M10.8187 1.14648C5.90558 1.14648 1.96582 5.24122 1.96582 10.2406C1.96582 16.9064 10.8187 23.8104 10.8187 23.8104C10.8187 23.8104 19.6716 16.9064 19.6716 10.2406C19.7179 5.24122 15.6855 1.14648 10.8187 1.14648Z"
		stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	<path d="M14.5062 22.4492H17.9589L20.3528 25.8526H1.29395L3.64177 22.4492H7.14049" stroke="#FF0000" strokeWidth="1.5"
	 strokeLinecap="round" strokeLinejoin="round" />
</svg>

)

export default Pin;