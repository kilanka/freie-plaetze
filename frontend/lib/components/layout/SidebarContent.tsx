import {Divider} from "@chakra-ui/react";
import React from "react";
import {BsHouseFill} from "react-icons/bs";
import {MdAddBox} from "react-icons/md";
import {useSelector} from "react-redux";

import {useMyInstitutionsQuery} from "../../api/generated";
import {selectUserId} from "../../store/auth";
import {SidebarItem, SidebarItemProps} from "./SidebarItem";

export const sidebarWidth = 60;

export const SidebarContent: React.FC = () => {
	const userId = useSelector(selectUserId);
	const {data: myInstitutions} = useMyInstitutionsQuery({variables: {userId}});

	return (
		<>
			{myInstitutions?.institutions?.map((institution) => (
				<SidebarItem key={institution.name} href="#" icon={BsHouseFill}>
					{institution.name}
				</SidebarItem>
			))}

			<SidebarItem href="#" icon={MdAddBox}>
				Einrichtung hinzufügen
			</SidebarItem>
			{/* <Divider /> */}
			{/* TODO Menu links on mobile */}
		</>
	);
};
