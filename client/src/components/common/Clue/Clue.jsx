import React from "react"
import { CSSTransition } from "react-transition-group"
import "./Clue.scss"

const Clue = ({
    isTailPositionCenter = false,
    isStatic = false,
    className,
    children,
    isClose = false,
    ...props
}) => {
    const [isShow, setShow] = React.useState(true)

    const clueContainer = React.useRef()

    const [height, setHeight] = React.useState(0)

    React.useEffect(() => {
        clueContainer.current && setHeight(clueContainer.current.clientHeight)
    })

    const CluePure = (props) => (
        <div className={`clue ${className}`} {...props}>
            <div className='clue__container' ref={clueContainer}>
                <div className='clue__body'>
                    <span className='clue__msg'>{children}</span>
                </div>
                <div
                    className={`clue__tail ${
                        isTailPositionCenter && height > 40
                            ? "clue-tail-center"
                            : ""
                    }`}
                >
                    <svg
                        className='clue__tail-img'
                        width='50'
                        height='37'
                        viewBox='0 0 50 37'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M19.0446 11.5115C19.5293 10.9481 19.7716 10.6665 20.066 10.4577C20.3271 10.2726 20.6173 10.1303 20.9257 10.0361C21.2736 9.92988 21.6512 9.90753 22.4064 9.86283L33.7464 9.19158C37.3372 8.97903 39.1326 8.87275 40.031 9.52385C40.8108 10.089 41.2755 10.98 41.2828 11.9239C41.2911 13.0115 40.1388 14.3508 37.8342 17.0293L30.5559 25.4886C30.0712 26.0519 29.8289 26.3336 29.5344 26.5423C29.2734 26.7274 28.9832 26.8698 28.6748 26.9639C28.3269 27.0702 27.9493 27.0925 27.1941 27.1372L15.854 27.8085C12.2633 28.021 10.4679 28.1273 9.56949 27.4762C8.7897 26.911 8.32502 26.0201 8.31774 25.0761C8.30936 23.9885 9.46167 22.6492 11.7663 19.9707L19.0446 11.5115Z'
                            fill='#414141'
                        />
                        <path
                            d='M12.1012 19.2883L11 20.8482L30.6009 14.8007C31.4646 14.5342 31.542 13.3535 30.7218 12.9559L17.0001 6.30289C16.4953 10.9848 14.8108 15.45 12.1012 19.2883Z'
                            fill='#414141'
                        />
                    </svg>
                </div>
            </div>
        </div>
    )

    return (
        <CSSTransition
            in={isShow && !isClose}
            timeout={300}
            unmountOnExit
            classNames='clue'
        >
            <CluePure
                onClick={() => !isStatic && setShow(!isShow)}
                {...props}
            />
        </CSSTransition>
    )
}

export { Clue }
