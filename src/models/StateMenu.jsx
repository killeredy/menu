export const StatesMenu  = {
            open: "open",
            close: 'close',
            opening: "opening",
            closing: "closing",

            open3D: false,
            close3D: false,

}


export const animationSteps = {
    steps: 2,
    opening: {
        init: -1,
        final: 0.2,
    },

    closing:{
        init: 0.2,
        final: 1.5,
    }
}