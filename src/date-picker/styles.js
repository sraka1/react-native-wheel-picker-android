import { PixelRatio, StyleSheet } from "react-native";

const scaleStyleProp = ( style, name, scale ) => {
    if ( style[ name ] )
        style[ name ] = style[ name ] * scale;
};

const scaleStyle = ( style, scale ) => {
    if ( scale === 1 )
        return;


    [
        "width",
        "height"
    ].forEach( name => scaleStyleProp( style, name, scale ) );

    [
        "margin",
        "padding"
    ].forEach( name => {
        [
            "",
            "Horizontal",
            "Left",
            "Right",
            "Vertical",
            "Top",
            "Bottom"
        ].forEach( specifier => scaleStyleProp( style, `${name}${specifier}`, scale ) );
    } );

};

export default ( styles ) => {
    const sizeScale = PixelRatio.getFontScale();
    const combinedStyles = {
        container: {
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
        },

        picker: {
            height: 160
        },

        date: {
            width: 130
        },

        hours: {
            width: 35
        },

        minutes: {
            width: 35
        },

        gap: {
            marginLeft: 10
        },

        AM: {
            width: 35
        }

    };

    Object
        .keys( combinedStyles )
        .forEach( key => {
            const customStyle = styles && styles[ key ];
            if ( customStyle )
                Object.assign( combinedStyles[ key ], customStyle );
            scaleStyle( combinedStyles[ key ], sizeScale );
        } )
    ;

    return StyleSheet.create( combinedStyles );
}
