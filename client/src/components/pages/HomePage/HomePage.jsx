import React from "react"
import { connect } from "react-redux"

const HomePage = ({ langs, ...props }) => {
    return (
        <div className="home-page">
            <h1>HOME PAGE</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({
    langs: state.PersonalData.langs,
})

export default connect(mapStateToProps, {})(HomePage)
