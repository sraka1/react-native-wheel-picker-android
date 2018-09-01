import WheelPicker from "../wheel-picker";
import React from "react";

export const titles = array => array.map( item => item.title );

export default ( { list, ...props } ) => (
    <WheelPicker
        data={ titles( list ) }
        isAtmospheric
        isCurved
        selectedItemTextColor={ "black" }
        visibleItemCount={7}
        { ...props }
    />
);
