import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine, RiTimeLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav(){
    return (
        <Stack spacing="12" align="flex-start">
                <NavSection title="GENERAL">
                    <NavLink hrefs="/dashboard" icon={RiDashboardLine}>Dashboard</NavLink>
                    <NavLink hrefs="/schedule" icon={RiTimeLine}>Schedule</NavLink>
                    <NavLink hrefs="/users" icon={RiContactsLine}>Users</NavLink>
                </NavSection>

                <NavSection title="REPORTS">
                    <NavLink hrefs="/Generate" icon={RiInputMethodLine}>Generate</NavLink>
                    <NavLink hrefs="/Events" icon={RiGitMergeLine}>Events</NavLink>
                </NavSection>
            </Stack>
    );
}