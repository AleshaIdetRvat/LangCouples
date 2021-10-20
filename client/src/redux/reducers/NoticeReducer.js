const ADD_NOTICE = "ADD_NOTICE"
const DELETE_NOTICE = "DELETE_NOTICE"

const ID = () => "_" + Math.random().toString(36).substr(2, 9)

const initState = {
    notifications: [
        // {
        //     content: "ADD_NOTICE ADD_NOTICE ADD_NOTICE",
        //     noticeType: null,
        //     id: 2,
        // },
    ],
}

const NoticeReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_NOTICE:
            const newNotice = {
                content: action.content,
                noticeType: action.noticeType,
                id: action.id,
            }

            return {
                ...state,
                notifications: [...state.notifications, newNotice],
            }
        case DELETE_NOTICE:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notice) => notice.id !== action.id
                ),
            }
        default:
            return state
    }
}

const addNotice = (content, noticeType, id) => ({
    type: ADD_NOTICE,
    content,
    noticeType,
    id,
})

export const deleteNotification = (id) => ({
    type: DELETE_NOTICE,
    id,
})

export const newNotice =
    (content, noticeType = null) =>
    async (dispatch) => {
        const newId = ID()

        dispatch(addNotice(content, noticeType, newId))

        setTimeout(() => {
            dispatch(deleteNotification(newId))
        }, 5000)
    }

export default NoticeReducer
