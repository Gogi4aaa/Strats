export default function Links({ linksContainer = 'menu', linksContainerClass, links, children }) {
    const LinksContainer = linksContainer;

    return <>
        <LinksContainer className={ linksContainerClass }>{ links }</LinksContainer>
        { children }
    </>
}