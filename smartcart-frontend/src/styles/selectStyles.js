
const customSelectStyles = {

    control: (provided, state) => ({

        ...provided,

        background: "rgba(255,255,255,0.08)",

        border: state.isFocused
            ? "1px solid #8b5cf6"
            : "1px solid rgba(255,255,255,0.1)",

        borderRadius: "16px",

        minHeight: "50px",

        height: "50px",

        boxShadow: state.isFocused
            ? "0 0 20px rgba(139,92,246,.35)"
            : "none",

        backdropFilter: "blur(20px)",

        cursor: "pointer"
    }),

    valueContainer: (provided) => ({

        ...provided,

        height: "50px",

        padding: "0 18px"
    }),

    indicatorsContainer: (provided) => ({

        ...provided,

        height: "50px",

        padding: "0 10px"
    }),

    menu: (provided) => ({

        ...provided,

        background: "#1a1635",

        borderRadius: "18px",

        overflow: "hidden",

        border: "1px solid rgba(255,255,255,.1)",

        zIndex: 9999
    }),

    menuPortal: (provided) => ({

        ...provided,

        zIndex: 9999
    }),

    menuList: (provided) => ({

        ...provided,

        padding: 0
    }),

    option: (provided, state) => ({

        ...provided,

        background: state.isFocused
            ? "#8b5cf6"
            : "#1a1635",

        color: "white",

        cursor: "pointer",

        padding: "14px 18px"
    }),

    singleValue: (provided) => ({

        ...provided,

        color: "white"
    }),

    placeholder: (provided) => ({

        ...provided,

        color: "#94a3b8"
    }),

    input: (provided) => ({

        ...provided,

        color: "white"
    }),

    dropdownIndicator: (provided) => ({

        ...provided,

        color: "#8b5cf6"
    }),

    indicatorSeparator: () => ({

        display: "none"
    })
};

export default customSelectStyles;