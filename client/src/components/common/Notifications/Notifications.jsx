import React from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { deleteNotification } from "../../../redux/reducers/NoticeReducer"
import classNames from "classnames"
import "./Notifications.scss"

const Notice = ({ content, type, onClick, isDeletion }) => {
    const noticeStyles = classNames({
        notifications__item: true,
        notice: true,
        warning: type === "warning",
        success: type === "success",
        "--deletion": isDeletion,
    })

    return (
        <span onClick={onClick} className={noticeStyles}>
            {content}
        </span>
    )
}

Notice.propTypes = {
    content: PropTypes.node,
    type: PropTypes.oneOf(["warning", "success", null]),
    onClick: PropTypes.func,
    isDeletion: PropTypes.bool,
}

const Notifications = () => {
    const noticeList = useSelector((state) => state.Notice.notifications)
    const dispatch = useDispatch()

    return (
        <div className='notifications'>
            <div className='notifications__container'>
                <div className='notifications__row'>
                    {noticeList.map((notice) => (
                        <Notice
                            key={notice.id}
                            content={notice.content}
                            type={notice.noticeType}
                            isDeletion={notice.isDeletion}
                            onClick={() =>
                                dispatch(deleteNotification(notice.id))
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Notifications
