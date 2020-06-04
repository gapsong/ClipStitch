import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
`

export const Scrollview = styled.div`
    width: 100%;
    overflow: scroll;
    white-space: nowrap;
`

export const Bar = styled.div`
    color: blue;
    width: 15px;
    height: ${({ height }) => height * 800}px;
    border: 1px solid;
    :hover {
        color: #ed1212;
        cursor: pointer;
    }
`
export const Col = styled.div`
    display: inline-block;
    text-align: center;
    margin-right: 8px;
`

export const Line = styled.div`
    border-top: 1px solid red;
    width: 15px;
    height: ${({ height }) => height * 800}px;
`
