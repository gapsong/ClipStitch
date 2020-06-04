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
    height: ${({ height, scale }) => height * scale}px;
    border: 1px solid;
    :hover {
        color: #ed1212;
        cursor: pointer;
    }
`
export const Col = styled.div`
    position: relative;
    width: 15px;
    display: inline-block;
    text-align: center;
    margin-right: 8px;
`

export const Line = styled.div`
    position: absolute;
    top: 50px;
    border-top: 1px solid red;
    width: 15px;
    height: ${({ height, scale }) => height * scale}px;
`
