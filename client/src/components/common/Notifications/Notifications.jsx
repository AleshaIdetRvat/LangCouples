import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { deleteNotification } from "../../../redux/reducers/NoticeReducer"
import classNames from "classnames"
import "./Notifications.scss"

const Notice = ({ content, type, onClick }) => {
    const noticeStyles = classNames("notifications__item", "notice", {
        warning: type == "warning",
        success: type == "success",
    })

    return (
        <div onClick={onClick} className={noticeStyles}>
            {content}
        </div>
    )
}

Notice.propTypes = {
    content: PropTypes.node,
    type: PropTypes.oneOf(["warning", "success", null]),
    onClick: PropTypes.func,
}

const Notifications = ({ noticeList, deleteNotification }) => {
    return (
        <div className="notifications">
            <div className="notifications__container">
                <div className="notifications__row">
                    {noticeList.map((notice) => (
                        <Notice
                            key={notice.id}
                            content={notice.content}
                            type={notice.noticeType}
                            onClick={() => {
                                console.log("notice.id", notice.id)
                                deleteNotification(notice.id)
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    noticeList: state.Notice.notifications,
})

export default connect(mapStateToProps, { deleteNotification })(Notifications)
