import React from "react";

export const Space = ({times}) => {

    const get = () => {
        if (times) {
            return [...Array(times)].reduce(((res) => {
                return res + '\u00A0';
            }), '');
        } else {
            return '\u00A0';
        }
    }

    return (
        <>
            {get()}
        </>
    );
}
