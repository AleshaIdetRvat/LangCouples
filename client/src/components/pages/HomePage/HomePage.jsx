import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"

const HomePage = ({ langs, ...props }) => {
    return (
        <div className="home-page">
            <NavLink to="/start">GO TO START PAGE</NavLink>
            <h1>HOME PAGE</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({
    langs: state.PersonalData.langs,
})

export default connect(mapStateToProps, {})(HomePage)
