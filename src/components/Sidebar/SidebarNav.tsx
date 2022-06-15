import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine, RiTimeLine } from "react-icons/ri";
import { BsSpeedometer2 } from "react-icons/bs";
import {BiBuilding} from "react-icons/bi";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav(){
    return (
        <Stack spacing="12" align="flex-start">
                <NavSection title="GENERAL">
                    <NavLink hrefs="/dashboard" icon={RiDashboardLine}>Dashboard</NavLink>
                    <NavLink hrefs="/schedule" icon={RiTimeLine}>Schedule</NavLink>
                    <NavLink hrefs="/users" icon={RiContactsLine}>Users</NavLink>
                    <NavLink hrefs="/administrators" icon={RiContactsLine}>Administrators</NavLink>
                    <NavLink hrefs="/companies" icon={BiBuilding}>Companies</NavLink>
                    <NavLink hrefs="/speedways" icon={BsSpeedometer2}>Speedways</NavLink>
                </NavSection>

                <NavSection title="REPORTS">
                    <NavLink hrefs="/Generate" icon={RiInputMethodLine}>Generate</NavLink>
                    <NavLink hrefs="/Events" icon={RiGitMergeLine}>Events</NavLink>
                </NavSection>
            </Stack>
    );
}