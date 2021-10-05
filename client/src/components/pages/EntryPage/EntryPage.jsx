import e from "express"
import React from "react"
import "./EntryPage.scss"

const EntryPage = () => {
    return (
        <div class="entry-page">
            <div className="entry-page__container">
                <div className="entry-page__welcome">
                    <h1 className="entry-page__title">Hello dear friend, you can</h1>
                </div>
                <div className="entry-page__log-or-reg entry-log-or-reg">
                    <div className="entry-log-or-reg__"></div>
                </div>
            </div>
        </div>
    )
}

export { EntryPage }
