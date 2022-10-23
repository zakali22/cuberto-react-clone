
type Props = {
    children: React.ReactNode,
    fullwidth?: boolean,
    align?: string,
    direction?: "row" | "column"
    mobileColumn?: true
}

export const Container = ({children, fullwidth, align = "left", direction = "row", mobileColumn}: Props) => {
    return (
        <div className={`container ${fullwidth ? 'container--fullwidth' : ''} ${align ? `container--${align}` : 'container--left'} ${direction ? `container--${direction}` : ''} ${mobileColumn ? 'container--row-mobile-column' : ''}`}>
            {children}
        </div>
    )
} 