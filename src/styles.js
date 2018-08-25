import { PixelRatio, StyleSheet } from "react-native";

export default StyleSheet.create( {
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },

    picker: {
        height: 160 * PixelRatio.getFontScale(),
    },

    date: {
        width: 140 * PixelRatio.getFontScale(),
    },

    hours: {
        width: 40 * PixelRatio.getFontScale(),
    },

    minutes: {
        width: 40 * PixelRatio.getFontScale(),
    },

    gap: {
        marginLeft: 10 * PixelRatio.getFontScale(),
    },

    AM: {
        width: 40 * PixelRatio.getFontScale(),
    }

} );
