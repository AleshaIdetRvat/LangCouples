import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"

const HomePage = ({ langs, ...props }) => {
    return <div className="home-page">HOME PAGE</div>
}

const mapStateToProps = (state) => ({
    langs: state.PersonalData.langs,
})

export default connect(mapStateToProps, {})(HomePage)
