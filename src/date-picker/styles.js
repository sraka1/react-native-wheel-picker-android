import { PixelRatio, StyleSheet } from "react-native";

export default ( customStyles ) => {
    const scale = PixelRatio.getFontScale();

    const styles = {
        container: {
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
        },

        picker: {
            height: 160 * scale
        },

        date: {
            width: 130 * scale
        },

        hours: {
            width: 35 * scale
        },

        minutes: {
            width: 35 * scale
        },

        gap: {
            marginLeft: 10 * scale
        },

        AM: {
            width: 35 * scale
        }

    };
    if ( customStyles ) {
        Object
            .keys( styles )
            .forEach( key => {
                const customStyle = customStyles[ key ];
                if ( customStyle )
                    Object.assign( styles[ key ], customStyle );

            } )
        ;
    }

    return StyleSheet.create( styles );
}
