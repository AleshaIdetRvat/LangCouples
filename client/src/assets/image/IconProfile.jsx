import React from "react"
import PropTypes from "prop-types"

const IconProfile = ({ className }) => {
    return (
        <svg
            className={className}
            width="75"
            height="75"
            viewBox="0 0 75 75"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M46.1 31.1C51.3 25.8 50.7 16.1 44.9 11.8C35.9 5.1 23 12.4 24.4 23.4C25.7 34.1 38.5 38.6 46.1 31.1ZM50.6 66.8C65.2 59.2 65.7 53.6 52.4 48.9C42 45.2 29.3 45.6 18.5 49.9C11 53 10 57.3 15.8 61.8C23.5 67.9 27.8 69.4 37 69.4C44.2 69.4 46.3 69 50.6 66.8ZM37.5 75C58.2107 75 75 58.2107 75 37.5C75 16.7893 58.2107 0 37.5 0C16.7893 0 0 16.7893 0 37.5C0 58.2107 16.7893 75 37.5 75Z"
            />
        </svg>
    )
}

IconProfile.propTypes = { className: PropTypes.string }

export { IconProfile }
