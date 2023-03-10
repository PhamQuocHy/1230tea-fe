/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        source: "#002d45",
        /* primary */
        primary0: "#000000",
        primary10: "#001e30",
        primary20: "#00344e",
        primary25: " #003f5f",
        primary30: "#004b70",
        primary35: "#005881",
        primary40: "#006493",
        primary50: "#037eb7",
        primary60: "#3998d3",
        primary70: "#5ab3ef",
        primary80: "#8ccdff",
        primary90: "#cae6ff",
        primary95: "#e6f2ff",
        primary98: "#f6f9ff",
        primary99: "#fcfcff",
        primary100: "#ffffff",
        /* secondary */
        secondary0: "#000000",
        secondary10: "#0c1d29",
        secondary20: "#22323f",
        secondary25: "#2d3d4a",
        secondary30: "#384956",
        secondary35: "#445462",
        secondary40: "#50606e",
        secondary50: "#687988",
        secondary60: "#8293a2",
        secondary70: "#9cadbd",
        secondary80: "#b7c9d9",
        secondary90: "#d3e5f5",
        secondary95: "#e6f2ff",
        secondary98: "#f6f9ff",
        secondary99: "#fcfcff",
        secondary100: "#ffffff",
        /* Tertiary */
        Tertiary0: "#000000",
        Tertiary10: " #2a1700",
        Tertiary20: " #472a00",
        Tertiary25: " #563400",
        Tertiary30: " #653e00",
        Tertiary35: " #754900",
        Tertiary40: " #855300",
        Tertiary50: " #a76a00",
        Tertiary60: " #ca8100",
        Tertiary70: " #ed9908",
        Tertiary80: " #ffb95f",
        Tertiary90: " #ffddb8",
        Tertiary95: " #ffeede",
        Tertiary98: " #fff8f4",
        Tertiary99: " #fffbff",
        Tertiary100: "#ffffff",
        /* neutral */
        neutral0: "#000000",
        neutral10: "#1a1c1e",
        neutral20: "#2e3133",
        neutral25: "#393c3e",
        neutral30: "#454749",
        neutral35: "#515255",
        neutral40: "#5d5e61",
        neutral50: "#75777a",
        neutral60: "#8f9193",
        neutral70: "#aaabae",
        neutral80: "#c6c6c9",
        neutral90: "#e2e2e5",
        neutral95: "#f0f0f3",
        neutral98: "#f9f9fc",
        neutral99: "#fcfcff",
        neutral100: "#ffffff",
        /* neutralVariant */
        neutralVariant0: "#000000",
        neutralVariant10: "#161c21",
        neutralVariant20: "#2b3137",
        neutralVariant25: "#363c42",
        neutralVariant30: "#41474d",
        neutralVariant35: "#4d5359",
        neutralVariant40: "#595f65",
        neutralVariant50: "#72787e",
        neutralVariant60: "#8b9198",
        neutralVariant70: "#a6acb3",
        neutralVariant80: "#c1c7ce",
        neutralVariant90: "#dde3ea",
        neutralVariant95: "#ecf1f9",
        neutralVariant98: "#f6f9ff",
        neutralVariant99: "#fcfcff",
        neutralVariant100: "#ffffff",
        /* error */
        error0: "#000000",
        error10: "#410002",
        error20: "#690005",
        error25: "#7e0007",
        error30: "#93000a",
        error35: "#a80710",
        error40: "#ba1a1a",
        error50: "#de3730",
        error60: "#ff5449",
        error70: "#ff897d",
        error80: "#ffb4ab",
        error90: "#ffdad6",
        error95: "#ffedea",
        error98: "#fff8f7",
        error99: "#fffbff",
        error100: "#ffffff",
        /* Light */
        PrimaryLight: "#006493",
        OnPrimaryLight: "#ffffff",
        PrimaryContainerLight: "#cae6ff",
        OnPrimaryContainerLight: " #001e30",
        SecondaryLight: "#50606e",
        OnSecondaryLight: "#ffffff",
        SecondaryContainerLight: "#d3e5f5",
        OnSecondaryContainerLight: " #0c1d29",
        TertiaryLight: "#855300",
        OnTertiaryLight: "#ffffff",
        TertiaryContainerLight: "#ffddb8",
        OnTertiaryContainerLight: " #2a1700",
        ErrorLight: "#ba1a1a",
        ErrorContainerLight: "#ffdad6",
        OnErrorLight: "#ffffff",
        OnErrorContainerLight: "#410002",
        BackgroundLight: "#fcfcff",
        OnBackgroundLight: " #1a1c1e",
        SurfaceLight: "#fcfcff",
        OnSurfaceLight: " #1a1c1e",
        SurfaceVariantLight: " #dde3ea",
        OnSurfaceVariantLight: "#41474d",
        OutlineLight: "#72787e",
        InverseOnSurfaceLight: "#f0f0f3",
        InverseSurfaceLight: "#2e3133",
        InversePrimaryLight: "#8ccdff",
        ShadowLight: "#000000",
        SurfaceTintLight: "#006493",
        OutlineVariantLight: " #c1c7ce",
        sCrimLight: "#000000",
        /* Dark */
        PrimaryDark: "#8ccdff",
        OnPrimaryDark: "#00344e",
        PrimaryContainerDark: "#004b70",
        OnPrimaryContainerDark: "#cae6ff",
        SecondaryDark: "#b7c9d9",
        OnSecondaryDark: "#22323f",
        SecondaryContainerDark: " #384956",
        OnSecondaryContainerDark: " #d3e5f5",
        TertiaryDark: " #ffb95f",
        OnTertiaryDark: "#472a00",
        TertiaryContainerDark: "#653e00",
        OnTertiaryContainerDark: "#ffddb8",
        ErrorDark: "#ffb4ab",
        ErrorContainerDark: "#93000a",
        OnErrorDark: "#690005",
        OnErrorContainerDark: "#ffdad6",
        BackgroundDark: "#1a1c1e",
        OnBackgroundDark: "#e2e2e5",
        SurfaceDark: "#1a1c1e",
        OnSurfaceDark: "#e2e2e5",
        SurfaceVariantDark: "#41474d",
        OnSurfaceVariantDark: " #c1c7ce",
        OutlineDark: " #8b9198",
        InverseOnSurfaceDark: " #1a1c1e",
        InverseSurfaceDark: "#e2e2e5",
        InversePrimaryDark: " #006493",
        ShadowDark: "#000000",
        SurfaceTintDark: "#8ccdff",
        OutlineVariantDark: "#41474d",
        CrimDark: "#000000",
        white: "#ffff",
        Libra: "#FCD163",
        Libra2: "#042042",
        color1230: "#002D45",

        // Background
        "background-blue-dark": "#002D45",
        "background-yelow": "#FAA31B",
      },
      textColor: {
        "color-yelow": "#FAA31B",
        "color-red": "#FF0000",
      },
      width: {
        "width-layout": "1140px",
      },
      maxWidth: {
        "width-layout": "1140px",
        "w-btn": "394px",
      },
      height: {
        "header-height": "74px",
        "mb-header-height": "64px",
      },
      margin: {
        "header-height": "74px",
        "mb-header-height": "64px",
      },
      lineHeight: {
        "header-lineHeight": "74px",
      },
      borderColor: {
        yelow: "#FAA31B",
        "blue-dark": "#002D45",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
