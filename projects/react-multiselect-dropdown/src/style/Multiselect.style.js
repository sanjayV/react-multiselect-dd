import styled from "styled-components";

export default styled.div`
    width: ${props => props.inputWidth + "px" || "360px"};
    min-height: ${props => props.inputHeight + "px" || "40px"};
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: inherit;
    font-family: inherit;
    overflow: auto;
    position: relative;
    margin-left: 0px;
    text-align: left;

    .dropdown-inner {
        overflow: hidden;
        float: left;
        width: calc(100% - 25px);
        /* border-bottom: 1px solid lightgray; */
        box-sizing: border-box;
        padding: 0px 25px 0px 0px;
        margin: 0;
        border-radius: 5px 5px 0px 0px;
        background: transparent;

        /* background-image: linear-gradient(45deg, transparent 50%, gray 50%),
        linear-gradient(135deg, gray 50%, transparent 50%),
        linear-gradient(to right, #ccc, #ccc);
        background-position: calc(100% - 20px) calc(1em + -2px),
        calc(100% - 15px) calc(1em + -2px), calc(100% - 2.5em) 0.3em;
        background-size: 6px 7px, 5px 6px, 1px 1.5em;
        background-repeat: no-repeat; */
    }

    .dropdown-button-arrow {
        width: 25px;
        position: absolute;
        right: 0;
        height: auto;
    }

    .dropdown-button-arrow:after {
        content: '';
        position: absolute;
        border-top: 7px solid grey;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        top: 14px;
        right: 8px;
    }

    .dropdown-button-arrow.active:after {
        border-top: none;
        border-bottom: 7px solid grey;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
    }

    .pointer {
        cursor: pointer;
    }

    .show {
        display: block;
    }

    .hide {
        display: none;
    }
`;
