const colors = {
  accent: "#F72B2B",
  primary: "#c0283d",
  secondary: "#3A3232",
  tertiary: "#ED6004",
  black: "#000000",
  white: "#FFFFFF",
  gray: "#727272",
  gray2: "#727272",
  blue:'#6da5da',
  StatusColor : '#c0283d',
  darkGray:'#f4f4f4',
  theme:"#1A1A1A",
  text:"#D3D3D3"
};

const sizes = {
    base:12,
    font:12,
    border:12,

    // font sizes
    h1:32,
    h2:26,
    h3:18,
    body:12,
    title:16,
    caption:12,
    small:8,
};


const Height ={

    HeaderImageHeight : 150,
};

const fonts = {
    h1:{
        fontFamily: "baloobhai_regular", 
        fonstSize: sizes.h1,
    },
    h2:{
        fontFamily: "Roboto-Bold",
        fonstSize: sizes.h2,
        
    },
    h3:{
        fontFamily: "Roboto-Bold",
        fonstSize: sizes.h3,
        
    },
    body:{
        fontFamily: "Roboto-Bold", 
        fonstSize: sizes.body,
        
    },
    title:{
        fonstSize: sizes.title,
        
    },
    caption:{
        fonstSize: sizes.caption,
        
    },
    small:{
        fonstSize: sizes.small,
        
    },
    Bold: "roboto_bold",
    Meduim: "roboto_meduim",
    Regular: "roboto_regular",
    Thin: "roboto_thin",
    Light: "roboto_light",
    baloobhai: "baloobhai_regular"
};

export {colors,sizes,fonts,Height};