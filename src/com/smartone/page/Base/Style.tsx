import styled from 'styled-components';

export const StyledPageWrapper = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
`

export const StyledPage = styled(StyledPageWrapper)<{ mb?: number }>`
  margin-bottom: ${(p) => p.mb || 0}px;
`

export const StylePageHeader = styled.header`
	margin: auto ${p => p.theme.spacing(2)}px;
	margin-top: ${p => p.theme.spacing(2)}px;
	margin-bottom: ${p => p.theme.spacing(2)}px;
  ${(p) => p.theme.breakpoints.up("md")} {
		margin-bottom: ${p => p.theme.spacing(3)}px;
	}
`

export const StyleBody = styled.div`
	position: relative;
`
export const StyleVoucher = styled.div`
	margin: 0 ${p => p.theme.spacing(2)}px ${p => p.theme.spacing(3)}px;	
	${(p) => p.theme.breakpoints.up('md')} {	
		margin: 0 0 ${p => p.theme.spacing(3)}px 0;	
	}
`
export const StyledFooter = styled.div`
`;

export const StyledStickyFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
	z-index: 30;
	padding: ${p => p.theme.spacing(1)}px ${p => p.theme.spacing(2)}px;
  background: white;
	box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.14902);
	${(p) => p.theme.breakpoints.up("md")} {
		padding: ${p => p.theme.spacing(2)}px 30px;
	}
`;

export const StyledDivider = styled.div`
margin-top: ${p => p.theme.spacing(3)}px;
margin-bottom: ${p => p.theme.spacing(3)}px;
	border-bottom: 1px solid ${p => p.theme.palette.divider};
  ${(p) => p.theme.breakpoints.up("md")} {
		margin-top: ${p => p.theme.spacing(6)}px;
		margin-bottom: ${p => p.theme.spacing(6)}px;
	}
`