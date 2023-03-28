import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

function SidebarLayout() {
  const { collapseSidebar } = useProSidebar();

  return (
    <Container>
      <Sidebar>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()}>Collapse</button>
      </main>
    </Container>
  );
}

export default SidebarLayout;