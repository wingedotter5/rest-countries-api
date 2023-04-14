import styled from 'styled-components'

interface BoxProps {
  padding: string
  margin: string
}
const Box = styled.div<Partial<BoxProps>>`
  padding: ${(props) => props.padding ?? ''};
  margin: ${(props) => props.margin ?? ''};
`
export default Box
