import styled from 'styled-components'

interface FlexProps {
  justify: string
  align: string
  direction: string
  wrap: string
  gap: string
}
const Flex = styled.div<Partial<FlexProps>>`
  display: flex;
  justify-content: ${(props) => props.justify ?? 'flex-start'};
  align-items: ${(props) => props.align ?? 'stretch'};
  direction: ${(props) => props.direction ?? 'row'};
  flex-wrap: ${(props) => props.wrap ?? 'no-wrap'};
  gap: ${(props) => props.gap ?? '0'};
`
export default Flex
