import LayoutHeader from "./header/LayoutHeader.index"
import styled from "@emotion/styled";
import LayoutNavigation from "./navigation/LayoutNavigation.container";
import LayoutBanner from "./banner/LayoutBanner.index";
import LayoutFooter from "./footer/LayoutFooter.index";

const Body = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

interface ILayoutProps {
    children: JSX.Element
}
export default function Layout(props: ILayoutProps) {
    return (
        <>
            <LayoutHeader/>
            <LayoutBanner/>
            <LayoutNavigation/>
            <Body>{props.children}</Body>
            <LayoutFooter/>
        </>
    )
}