import { PixelRatio, StyleSheet } from "react-native";

let cache = null;

export default ( customStyles ) => {
    const scale = PixelRatio.getFontScale();
    if ( !customStyles && cache && cache.scale === scale )
        return cache.styles;

    const styles = StyleSheet.create( Object.assign( {
        container: {
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
        },

        picker: {
            height: 160 * scale,
        },

        date: {
            width: 130 * scale,
        },

        hours: {
            width: 35 * scale,
        },

        minutes: {
            width: 35 * scale
        },

        gap: {
            marginLeft: 10 * scale,
        },

        AM: {
            width: 35 * scale
        }

    }, customStyles || {} ) );

    cache = {
        scale,
        styles
    };

    return styles;
}
