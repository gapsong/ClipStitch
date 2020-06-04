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
    width: 40px;
    height: ${({ height }) => height}px;
    border: 1px solid;
    :hover {
        color: #ed1212;
        cursor: pointer;
    }
`
export const Col = styled.div`
    position: relative;
    width: 40px;
    display: inline-block;
    text-align: center;
    margin-right: 8px;
`

export const Line = styled.div`
    position: absolute;
    top: ${({ top }) => top}px;
    border-top: 1px solid ${({ color }) => color};
    width: 40px;
`
