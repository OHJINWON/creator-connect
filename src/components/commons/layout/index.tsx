import LayoutHeader from "./header/LayoutHeader.index"
import styled from "@emotion/styled";
import LayoutNavigation from "./navigation/LayoutNavigation.container";
import LayoutBanner from "./banner/LayoutBanner.index";

const Body = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: red
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
        </>
    )
}