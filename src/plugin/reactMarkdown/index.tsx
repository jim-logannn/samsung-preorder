import React, { CSSProperties } from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

// const markdown = `Just a link: [here](https://reactjs.com).`
const StyledDiv = styled.div`
	ul {
		margin-top: 0;
		margin-bottom: 0;
		padding-left: 22px;
	}
	a {
		color: red;
	}
	blockquote {
		padding: 0;
		margin-left: 22px;
		margin-bottom: 0;
		border: none;
		font-size: 1em;
	}
	p {
		margin-top: 0;
		margin-bottom: 0;
	}
`

const MarkDownContent = React.forwardRef<HTMLDivElement ,{markdown: string, style?: CSSProperties, className ?: string}>((p, ref) => {
	const {markdown,style,className} = p;
	return <StyledDiv ref={ref} style={style}>
		<ReactMarkdown className={className} linkTarget="_blank" children={markdown}/>
	</StyledDiv>
})

export default MarkDownContent
// export default function MarkDownContent({markdown}: {markdown: string}) {
// 	return <ReactMarkdown ref={ref} linkTarget="_blank" children={markdown}/>
// }
